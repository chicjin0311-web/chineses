-- Recoverable student removal. Apply after speaking-resume.sql, as one transaction.
begin;
alter table speaking_private.attempts add column if not exists deleted_at timestamptz;
alter table speaking_private.attempts add column if not exists deleted_by uuid references auth.users(id);
create unique index if not exists speaking_active_student on speaking_private.attempts(room_id,student_no) where deleted_at is null;
alter table speaking_private.attempts drop constraint if exists attempts_room_id_student_no_key;

do $trash$
declare definition text;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('elsif p_action=''trash_list'' then' in definition)>0 then return; end if;
 if position('''resume_supported'',true' in definition)=0 or position('raw bytea;' in definition)=0 then raise exception 'Apply the resume update first; no change applied.'; end if;
 definition=replace(definition,'raw bytea;','raw bytea; target_ids uuid[];');
 definition=replace(definition,'''audio'',''history'',''history_audio'') then','''audio'',''history'',''history_audio'',''trash_list'',''trash'',''restore'') then');
 definition=replace(definition,'''resume_supported'',true);','''resume_supported'',true,''trash_supported'',true);');
 definition=replace(definition,'where aa.room_id=rr.id','where aa.room_id=rr.id and aa.deleted_at is null');
 definition=replace(definition,'where aa.room_id=r.id) x;','where aa.room_id=r.id and aa.deleted_at is null) x;');
 definition=replace(definition,'where room_id=r.id and student_no=p->>''student_no'' for update;','where room_id=r.id and student_no=p->>''student_no'' and deleted_at is null for update;');
 definition=replace(definition,'where room_id=r.id)>=200','where room_id=r.id and deleted_at is null)>=200');
 definition=replace(definition,'where token_hash=encode(extensions.digest(p->>''token'',''sha256''),''hex'') for update;','where token_hash=encode(extensions.digest(p->>''token'',''sha256''),''hex'') and deleted_at is null for update;');
 definition=replace(definition,'where a0.id=(p->>''id'')::uuid and r0.owner_id=auth.uid()','where a0.id=(p->>''id'')::uuid and a0.deleted_at is null and r0.owner_id=auth.uid()');
 definition=replace(definition,'aa.student_no=canonical and aa.id<>a.id','aa.student_no=canonical and aa.deleted_at is null and aa.id<>a.id');
 definition=replace(definition,'elsif p_action=''join'' then',
 $branches$
 elsif p_action='trash_list' then
   select * into r from speaking_private.rooms where id=(p->>'id')::uuid and owner_id=auth.uid();
   if r.id is null then raise exception '평가를 찾을 수 없습니다.'; end if;
   select coalesce(jsonb_agg(to_jsonb(x) order by x.deleted_at desc),'[]') into result from
    (select aa.id,aa.student_no,aa.student_name,aa.deleted_at,aa.submitted_at,aa.score,aa.reviewed_at,
      jsonb_array_length(aa.questions) as question_count,
      (select count(*) from speaking_private.answers b where b.attempt_id=aa.id) as saved_count
     from speaking_private.attempts aa where aa.room_id=r.id and aa.deleted_at is not null) x;
   return result;
 elsif p_action in ('trash','restore') then
   select * into r from speaking_private.rooms where id=(p->>'id')::uuid and owner_id=auth.uid();
   if r.id is null then raise exception '평가를 찾을 수 없습니다.'; end if;
   if jsonb_typeof(p->'attempt_ids') is distinct from 'array' then raise exception '학생을 선택하세요.'; end if;
   if jsonb_array_length(p->'attempt_ids') not between 1 and 200 then raise exception '학생을 1~200명 선택하세요.'; end if;
   select array_agg(distinct value::uuid) into target_ids from jsonb_array_elements_text(p->'attempt_ids');
   perform aa.id from speaking_private.attempts aa where aa.room_id=r.id and aa.id=any(target_ids) order by aa.id for update;
   if (select count(*) from speaking_private.attempts aa where aa.room_id=r.id and aa.id=any(target_ids))<>cardinality(target_ids) then raise exception '이 평가의 학생만 선택할 수 있습니다.'; end if;
   if p_action='trash' then
    update speaking_private.attempts set deleted_at=now(),deleted_by=auth.uid() where room_id=r.id and id=any(target_ids) and deleted_at is null;
   else
    if exists(select 1 from speaking_private.attempts t join speaking_private.attempts active on active.room_id=t.room_id and active.student_no=t.student_no and active.id<>t.id and active.deleted_at is null where t.id=any(target_ids) and t.deleted_at is not null)
    or exists(select 1 from speaking_private.attempts t where t.id=any(target_ids) group by student_no having count(*)>1) then raise exception '같은 학번의 응시가 이미 있습니다. 현재 응시를 확인한 뒤 복원하세요.'; end if;
    update speaking_private.attempts set deleted_at=null,deleted_by=null where room_id=r.id and id=any(target_ids);
   end if;
   return jsonb_build_object('ok',true,'count',cardinality(target_ids));
 elsif p_action='join' then$branches$);
 if position('''trash_supported'',true' in definition)=0 or position('''history_audio'',''trash_list'',''trash'',''restore''' in definition)=0 then raise exception 'Trash patch incomplete; no change applied.'; end if;
 execute definition;
end $trash$;
commit;
