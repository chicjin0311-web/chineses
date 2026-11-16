-- Apply as one transaction after speaking-edit.sql and speaking-attempt-context.sql.
-- Preserve the current gateway's authorization, room ownership and rate limits.
begin;
alter table speaking_private.attempts add column if not exists revision integer not null default 0;
alter table speaking_private.attempts add column if not exists resume_allowed boolean not null default false;
alter table speaking_private.attempts add column if not exists restart_from integer;
create table if not exists speaking_private.attempt_history (
 id uuid primary key default gen_random_uuid(),
 attempt_id uuid not null references speaking_private.attempts(id),
 restart_from integer not null, snapshot jsonb not null,
 teacher_id uuid not null references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists speaking_private.answer_history (
 history_id uuid not null references speaking_private.attempt_history(id), question_no integer not null,
 audio bytea not null, mime text not null, duration numeric not null, created_at timestamptz not null,
 rating text, note text not null default '', primary key(history_id,question_no)
);
create index if not exists speaking_history_attempt on speaking_private.attempt_history(attempt_id);
alter table speaking_private.attempt_history enable row level security;
alter table speaking_private.answer_history enable row level security;
revoke all on speaking_private.attempt_history,speaking_private.answer_history from public,anon,authenticated;

do $migration$
declare definition text; original text;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('speaking_private.attempt_history' in definition)>0 then return; end if;
 original=definition;
 if position('raw bytea;' in definition)=0
 or position('if exists(select 1 from speaking_private.attempts where room_id=r.id and student_no=p->>''student_no'') then' in definition)=0
 or position('elsif p_action=''reset'' then' in definition)=0
 or position('if a.submitted_at is not null then' in definition)=0
 or position('''rooms'',''create'',''update'',''room'',''toggle'',''review'',''reset'',''audio''' in definition)=0 then
  raise exception 'Unexpected gateway definition; no change applied.';
 end if;
 definition=replace(definition,'raw bytea;','raw bytea; historyid uuid; canonical text;');
 definition=replace(definition,'''review'',''reset'',''audio'') then', '''review'',''reset'',''audio'',''history'',''history_audio'') then');
 definition=replace(definition,'aa.reviewed_at,aa.created_at,','aa.reviewed_at,aa.created_at,aa.revision,aa.resume_allowed,');
 definition=replace(definition,'''attempts'',result);','''attempts'',result,''resume_supported'',true);');
 definition=replace(definition,'''is_open'',r.is_open);','''is_open'',r.is_open,''revision'',a.revision,''restart_from'',a.restart_from);');
 definition=replace(definition,
  'if exists(select 1 from speaking_private.attempts where room_id=r.id and student_no=p->>''student_no'') then',
  $join$
   select * into a from speaking_private.attempts where room_id=r.id and student_no=p->>'student_no' for update;
   if a.id is not null and a.resume_allowed and a.student_name=p->>'student_name' then
    update speaking_private.attempts set token_hash=encode(extensions.digest(p->>'token','sha256'),'hex'),resume_allowed=false where id=a.id;
    return jsonb_build_object('id',a.id,'resumed',true);
   end if;
   if a.id is not null then$join$);
 -- Old browser tabs and in-flight uploads must not overwrite a teacher's retry.
 definition=replace(definition,'if a.submitted_at is not null then',
  $revision$
   if coalesce((p->>'revision')::integer,0)<>a.revision then raise exception '선생님이 재응시를 설정했습니다. 저장 상태·재응시 확인을 누른 뒤 현재 문항을 확인하세요.'; end if;
   if coalesce(p->>'attempt_id','')<>a.id::text and (p_action='answer' or a.revision>0) then raise exception '응시 정보가 변경되었습니다. 저장 상태를 확인해 주세요.'; end if;
   if a.submitted_at is not null then$revision$);
 definition=replace(definition,'insert into speaking_private.answers(attempt_id,question_no,audio,mime,duration)',
  'update speaking_private.attempts set resume_allowed=false where id=a.id;'||E'\n     insert into speaking_private.answers(attempt_id,question_no,audio,mime,duration)');
 -- Historical recordings remain teacher-only, under the same room ownership.
 definition=replace(definition,'elsif p_action in (''review'',''reset'',''audio'',''history'',''history_audio'') then',
  $history$
 elsif p_action in ('history','history_audio') then
   if p_action='history' then
    select aa.* into a from speaking_private.attempts aa join speaking_private.rooms rr on rr.id=aa.room_id where aa.id=(p->>'id')::uuid and rr.owner_id=auth.uid();
    if a.id is null then raise exception '제출물을 찾을 수 없습니다.'; end if;
    select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]') into result from
     (select h.id,h.created_at,h.restart_from,h.snapshot,
       (select coalesce(jsonb_agg(jsonb_build_object('question_no',b.question_no,'duration',b.duration,'mime',b.mime,'rating',b.rating,'note',b.note) order by b.question_no),'[]') from speaking_private.answer_history b where b.history_id=h.id) as answers
      from speaking_private.attempt_history h where h.attempt_id=a.id) x;
    return result;
   end if;
   select jsonb_build_object('audio',encode(b.audio,'base64'),'mime',b.mime) into result
    from speaking_private.answer_history b join speaking_private.attempt_history h on h.id=b.history_id
    join speaking_private.attempts aa on aa.id=h.attempt_id join speaking_private.rooms rr on rr.id=aa.room_id
    where h.id=(p->>'id')::uuid and b.question_no=(p->>'question_no')::integer and rr.owner_id=auth.uid();
   if result is null then raise exception '이전 녹음을 찾을 수 없습니다.'; end if;
   return result;
 elsif p_action in ('review','reset','audio') then$history$);
 definition=regexp_replace(definition,'elsif p_action=''reset'' then.*?end if;',
  $reset$elsif p_action='reset' then
     n=(p->>'restart_from')::integer;
     if n is null or n<0 or n>=jsonb_array_length(a.questions) then raise exception '재응시 시작 문항을 선택하세요.'; end if;
     if exists(select 1 from generate_series(0,n-1) i where not exists(select 1 from speaking_private.answers b where b.attempt_id=a.id and b.question_no=i)) then raise exception '저장되지 않은 앞 문항부터 재응시를 허용하세요.'; end if;
     canonical=regexp_replace(a.student_no,' \(이전 응시 .*$','');
     if exists(select 1 from speaking_private.attempts aa where aa.room_id=a.room_id and aa.student_no=canonical and aa.id<>a.id) then raise exception '같은 학번의 다른 응시가 있습니다. 현재 응시를 먼저 확인하세요.'; end if;
     insert into speaking_private.attempt_history(attempt_id,restart_from,snapshot,teacher_id)
      values(a.id,n,to_jsonb(a)-'token_hash'-'resume_allowed',auth.uid()) returning id into historyid;
     insert into speaking_private.answer_history(history_id,question_no,audio,mime,duration,created_at,rating,note)
      select historyid,question_no,audio,mime,duration,created_at,rating,note from speaking_private.answers where attempt_id=a.id;
     -- Only the active suffix is cleared; the complete previous recording stays in history.
     delete from speaking_private.answers where attempt_id=a.id and question_no>=n;
     update speaking_private.attempts set student_no=canonical,revision=revision+1,restart_from=n,resume_allowed=true,submitted_at=null,reviewed_at=null,score=null,comment='' where id=a.id;
     return jsonb_build_object('ok',true,'restart_from',n,'revision',a.revision+1);
   end if;$reset$,'s');
 if definition=original or position('''resume_supported'',true' in definition)=0
 or position('elsif p_action in (''history'',''history_audio'')' in definition)=0
 or position('historyid uuid;' in definition)=0 then raise exception 'Gateway patch incomplete; no change applied.'; end if;
 execute definition;
end $migration$;
commit;
