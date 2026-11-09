-- Reject audio from an old browser view after its attempt has been replaced.
do $context$
declare definition text;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('p->>''attempt_id''' in definition)>0 then return; end if;
 if position('if p_action=''answer'' then' in definition)=0 then raise exception 'Answer branch not found; no change applied.'; end if;
 execute replace(definition,'if p_action=''answer'' then','if p_action=''answer'' then'||E'\n     if coalesce(p->>''attempt_id'','''')<>a.id::text then raise exception ''응시 정보가 변경되었습니다. 새로고침한 뒤 새 문항을 확인해 주세요.''; end if;');
end
$context$;
