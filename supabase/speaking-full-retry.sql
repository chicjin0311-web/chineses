-- Apply after speaking-resume.sql and speaking-trash.sql.
-- Changes future teacher-authorized retries only; does not update any attempt now.
begin;
do $full_retry$
declare definition text; reset_start integer; reset_end integer;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('''full_retry_supported'',true' in definition)>0 then return; end if;
 if position('''trash_supported'',true' in definition)=0 or position('historyid uuid;' in definition)=0 then raise exception 'Apply resume and trash updates first; no change applied.'; end if;
 definition=replace(definition,'raw bytea;','raw bytea; choices jsonb; oldq jsonb;');
 definition=replace(definition,'''trash_list'',''trash'',''restore'') then','''trash_list'',''trash'',''restore'',''retry_info'') then');
 definition=replace(definition,'''resume_supported'',true,','''resume_supported'',true,''full_retry_supported'',true,');
 definition=replace(definition,'elsif p_action in (''history'',''history_audio'') then',
 $info$elsif p_action='retry_info' then
   select aa.* into a from speaking_private.attempts aa join speaking_private.rooms rr on rr.id=aa.room_id
    where aa.id=(p->>'id')::uuid and aa.deleted_at is null and rr.owner_id=auth.uid();
   if a.id is null then raise exception '제출물을 찾을 수 없습니다.'; end if;
   return jsonb_build_object('full_retry_supported',true);
 elsif p_action in ('history','history_audio') then$info$);
 -- Replace exactly the reset body, including its nested conditions.
 reset_start=position('elsif p_action=''reset'' then' in definition);
 reset_end=position('if a.submitted_at is null then raise exception ''최종 제출 후 점수를 확정할 수 있습니다.'';' in substring(definition from reset_start));
 if reset_start=0 or reset_end=0 then raise exception 'Reset branch not found; no change applied.'; end if;
 definition=substring(definition from 1 for reset_start-1)||$reset$
   elsif p_action='reset' then
     if p->>'retry_mode' is distinct from 'full_random' or coalesce((p->>'restart_from')::integer,0)<>0 then raise exception '재응시는 새 랜덤 자료로 1번부터 시작해야 합니다.'; end if;
     select * into r from speaking_private.rooms where id=a.room_id and owner_id=auth.uid();
     if r.id is null then raise exception '평가를 찾을 수 없습니다.'; end if;
     if not r.is_open then raise exception '평가를 다시 연 뒤 재응시를 허용하세요.'; end if;
     canonical=regexp_replace(a.student_no,' \(이전 응시 .*$','');
     if exists(select 1 from speaking_private.attempts aa where aa.room_id=a.room_id and aa.student_no=canonical and aa.deleted_at is null and aa.id<>a.id) then raise exception '같은 학번의 다른 응시가 있습니다. 현재 응시를 먼저 확인하세요.'; end if;
     selected='[]'::jsonb;
     for q,n in select value,ordinality::integer-1 from jsonb_array_elements(r.questions) with ordinality loop
       oldq=a.questions->n;
       -- Compare what students actually see, not variant IDs (which teachers can edit).
       select jsonb_agg(value) into choices from jsonb_array_elements(q->'variants')
        where oldq is null or q->>'text' is distinct from oldq->>'text'
          or coalesce(value->>'cue','')<>coalesce(oldq->>'cue','')
          or coalesce(value->>'image','')<>coalesce(oldq->>'image','');
       -- Fixed questions/cues keep their sole textbook option.
       choices=coalesce(choices,q->'variants');
       if jsonb_array_length(choices)=0 then raise exception '문항의 랜덤 후보를 확인하세요.'; end if;
       v=choices->floor(random()*jsonb_array_length(choices))::integer;
       selected=selected||jsonb_build_array((q-'variants')||v);
     end loop;
     insert into speaking_private.attempt_history(attempt_id,restart_from,snapshot,teacher_id)
      values(a.id,0,to_jsonb(a)-'token_hash'-'resume_allowed',auth.uid()) returning id into historyid;
     insert into speaking_private.answer_history(history_id,question_no,audio,mime,duration,created_at,rating,note)
      select historyid,question_no,audio,mime,duration,created_at,rating,note from speaking_private.answers where attempt_id=a.id;
     delete from speaking_private.answers where attempt_id=a.id;
     update speaking_private.attempts set student_no=canonical,questions=selected,revision=revision+1,restart_from=0,resume_allowed=true,submitted_at=null,reviewed_at=null,score=null,comment='' where id=a.id;
     return jsonb_build_object('ok',true,'restart_from',0,'revision',a.revision+1,'retry_mode','full_random');
   end if;
   $reset$||substring(definition from reset_start+reset_end-1);
 if position('''full_retry_supported'',true' in definition)=0 or position('''restore'',''retry_info''' in definition)=0 then raise exception 'Full retry patch incomplete; no change applied.'; end if;
 execute definition;
end $full_retry$;
commit;
