-- Additive schema. Access only through the application-scoped gateway below.
create schema if not exists speaking_private;
revoke all on schema speaking_private from public;
create table speaking_private.config (id boolean primary key default true check(id), secret_hash text not null);
create table speaking_private.rooms (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id),
 title text not null, code text unique not null, questions jsonb not null,
 is_open boolean not null default true, created_at timestamptz not null default now()
);
create table speaking_private.attempts (
 id uuid primary key default gen_random_uuid(), room_id uuid not null references speaking_private.rooms(id),
 student_no text not null, student_name text not null, token_hash text not null,
 questions jsonb not null, submitted_at timestamptz, created_at timestamptz not null default now(),
 score integer check(score between 10 and 50 and score%5=0), comment text not null default '',
 reviewed_at timestamptz, unique(room_id,student_no)
);
create table speaking_private.answers (
 attempt_id uuid not null references speaking_private.attempts(id), question_no integer not null,
 audio bytea not null, mime text not null, duration numeric not null, created_at timestamptz not null default now(),
 rating text check(rating in ('충분','부분','미확인','재확인 필요')), note text not null default '',
 primary key(attempt_id,question_no)
);
create table speaking_private.ratelimits (key text primary key, count integer not null default 1, until_at timestamptz not null);
alter table speaking_private.config enable row level security;
alter table speaking_private.rooms enable row level security;
alter table speaking_private.attempts enable row level security;
alter table speaking_private.answers enable row level security;
alter table speaking_private.ratelimits enable row level security;
create index speaking_room_owner on speaking_private.rooms(owner_id);
create index speaking_attempt_room on speaking_private.attempts(room_id);

create or replace function speaking_private.gateway(p_secret text,p_action text,p jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare r speaking_private.rooms; a speaking_private.attempts; selected jsonb; q jsonb; v jsonb; result jsonb; n integer; lim integer; own boolean; raw bytea;
begin
 if not exists(select 1 from speaking_private.config where secret_hash=encode(extensions.digest(p_secret,'sha256'),'hex')) then raise exception '접근할 수 없습니다.'; end if;
 -- Teacher identity is checked against the existing verified-account allowlist.
 if p_action in ('rooms','create','room','toggle','review','reset','audio') then
   if auth.uid() is null or not classroom_private.is_teacher() then raise exception '등록된 교사 계정으로 로그인해 주세요.'; end if;
 end if;
 if p_action='rooms' then
   select coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]') into result from
   (select rr.*, (select count(*) from speaking_private.attempts aa where aa.room_id=rr.id) as students,
   (select count(*) from speaking_private.attempts aa where aa.room_id=rr.id and aa.submitted_at is not null) as submitted
   from speaking_private.rooms rr where rr.owner_id=auth.uid()) x; return result;
 elsif p_action='create' then
   insert into speaking_private.rooms(owner_id,title,code,questions) values(auth.uid(),p->>'title',p->>'code',p->'questions') returning * into r;
   return to_jsonb(r);
 elsif p_action in ('room','toggle') then
   select * into r from speaking_private.rooms where id=(p->>'id')::uuid and owner_id=auth.uid();
   if r.id is null then raise exception '평가를 찾을 수 없습니다.'; end if;
   if p_action='toggle' then update speaking_private.rooms set is_open=(p->>'open')::boolean where id=r.id returning * into r; return to_jsonb(r); end if;
   select coalesce(jsonb_agg(to_jsonb(x) order by x.student_no),'[]') into result from
   (select aa.id,aa.student_no,aa.student_name,aa.questions,aa.submitted_at,aa.score,aa.comment,aa.reviewed_at,aa.created_at,
     (select coalesce(jsonb_agg(jsonb_build_object('question_no',b.question_no,'duration',b.duration,'mime',b.mime,'rating',b.rating,'note',b.note) order by b.question_no),'[]') from speaking_private.answers b where b.attempt_id=aa.id) as answers
    from speaking_private.attempts aa where aa.room_id=r.id) x;
   return jsonb_build_object('room',to_jsonb(r),'attempts',result);
 elsif p_action='join' then
   insert into speaking_private.ratelimits(key,until_at) values(p->>'rate_key',now()+interval '10 minutes')
   on conflict(key) do update set count=case when speaking_private.ratelimits.until_at<now() then 1 else speaking_private.ratelimits.count+1 end,
   until_at=case when speaking_private.ratelimits.until_at<now() then now()+interval '10 minutes' else speaking_private.ratelimits.until_at end returning count into lim;
   if lim>100 then return jsonb_build_object('error','잠시 후 다시 시도해 주세요.'); end if;
   select * into r from speaking_private.rooms where code=upper(p->>'code') and is_open;
   if r.id is null then return jsonb_build_object('error','참여코드를 확인하세요. 평가가 닫혀 있을 수도 있습니다.'); end if;
   perform 1 from speaking_private.rooms where id=r.id for update;
   if exists(select 1 from speaking_private.attempts where room_id=r.id and student_no=p->>'student_no') then return jsonb_build_object('error','이미 시작한 학번입니다. 원래 기기에서 이어 하거나 선생님께 재응시를 요청하세요.'); end if;
   if (select count(*) from speaking_private.attempts where room_id=r.id)>=100 then return jsonb_build_object('error','평가 참여 인원이 가득 찼습니다.'); end if;
   selected='[]'::jsonb;
   for q in select value from jsonb_array_elements(r.questions) loop
     v=(q->'variants')->floor(random()*jsonb_array_length(q->'variants'))::integer;
     selected=selected || jsonb_build_array((q-'variants') || v);
   end loop;
   insert into speaking_private.attempts(room_id,student_no,student_name,token_hash,questions)
    values(r.id,p->>'student_no',p->>'student_name',encode(extensions.digest(p->>'token','sha256'),'hex'),selected) returning * into a;
   return jsonb_build_object('id',a.id);
 elsif p_action in ('attempt','answer','submit') then
   select * into a from speaking_private.attempts where token_hash=encode(extensions.digest(p->>'token','sha256'),'hex') for update;
   if a.id is null then raise exception '응시 정보가 없습니다. 참여코드를 입력해 주세요.'; end if;
   select * into r from speaking_private.rooms where id=a.room_id;
   if p_action='attempt' then
     select coalesce(jsonb_agg(jsonb_build_object('question_no',question_no,'duration',duration)),'[]') into result from speaking_private.answers where attempt_id=a.id;
     return jsonb_build_object('id',a.id,'title',r.title,'student_no',a.student_no,'student_name',a.student_name,'questions',a.questions,'answers',result,'submitted_at',a.submitted_at,'is_open',r.is_open);
   end if;
   if a.submitted_at is not null then return jsonb_build_object('ok',true,'submitted',true); end if;
   if not r.is_open then raise exception '선생님이 평가를 닫았습니다.'; end if;
   if p_action='answer' then
     n=(p->>'question_no')::integer;
     if n<0 or n>=jsonb_array_length(a.questions) then raise exception '문항 번호 오류'; end if;
     if exists(select 1 from speaking_private.answers where attempt_id=a.id and question_no=n) then return jsonb_build_object('ok',true); end if;
     raw=decode(p->>'audio','base64');
     if octet_length(raw)<100 or octet_length(raw)>1800000 or (p->>'duration')::numeric not between 0.1 and 65 then raise exception '녹음 파일을 확인해 주세요.'; end if;
     insert into speaking_private.answers(attempt_id,question_no,audio,mime,duration) values(a.id,n,raw,p->>'mime',(p->>'duration')::numeric);
     return jsonb_build_object('ok',true);
   end if;
   if (select count(*) from speaking_private.answers where attempt_id=a.id)<>jsonb_array_length(a.questions) then raise exception '모든 문항의 녹음이 저장되어야 제출할 수 있습니다.'; end if;
   update speaking_private.attempts set submitted_at=now() where id=a.id;
   return jsonb_build_object('ok',true);
 elsif p_action in ('review','reset','audio') then
   select a0.* into a from speaking_private.attempts a0 join speaking_private.rooms r0 on r0.id=a0.room_id where a0.id=(p->>'id')::uuid and r0.owner_id=auth.uid() for update of a0;
   if a.id is null then raise exception '제출물을 찾을 수 없습니다.'; end if;
   if p_action='audio' then
     select jsonb_build_object('audio',encode(audio,'base64'),'mime',mime) into result from speaking_private.answers where attempt_id=a.id and question_no=(p->>'question_no')::integer;
     if result is null then raise exception '녹음이 없습니다.'; end if; return result;
   elsif p_action='reset' then
     -- Explicit teacher action: keep recordings but release student number for a new attempt.
     update speaking_private.attempts set student_no=student_no||' (이전 응시 '||left(id::text,8)||')' where id=a.id;
     return jsonb_build_object('ok',true);
   end if;
   if a.submitted_at is null then raise exception '최종 제출 후 점수를 확정할 수 있습니다.'; end if;
   for v in select value from jsonb_array_elements(p->'answers') loop
     update speaking_private.answers set rating=v->>'rating',note=left(coalesce(v->>'note',''),1000) where attempt_id=a.id and question_no=(v->>'question_no')::integer;
   end loop;
   if exists(select 1 from speaking_private.answers where attempt_id=a.id and (rating is null or rating='재확인 필요')) then raise exception '모든 문항의 판단을 완료하세요. 재확인 문항은 점수 확정 전에 확인해야 합니다.'; end if;
   if (p->>'score')::integer not in (10,15,20,25,30,35,40,45,50) then raise exception '점수 범위를 확인하세요.'; end if;
   if coalesce(length(trim(p->>'comment')),0)=0 then raise exception '종합 판단 및 감점 근거를 적어 주세요.'; end if;
   update speaking_private.attempts set score=(p->>'score')::integer,comment=left(p->>'comment',2000),reviewed_at=now() where id=a.id;
   return jsonb_build_object('ok',true);
 end if;
 raise exception '지원하지 않는 요청입니다.';
end $$;
revoke all on function speaking_private.gateway(text,text,jsonb) from public;
grant usage on schema speaking_private to anon,authenticated;
grant execute on function speaking_private.gateway(text,text,jsonb) to anon,authenticated;
create function public.speaking_gateway(p_secret text,p_action text,p jsonb) returns jsonb
language sql security invoker set search_path='' as $$ select speaking_private.gateway(p_secret,p_action,p); $$;
revoke all on function public.speaking_gateway(text,text,jsonb) from public;
grant execute on function public.speaking_gateway(text,text,jsonb) to anon,authenticated;
