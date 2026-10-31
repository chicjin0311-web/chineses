-- Update only the room template; assigned questions and recordings stay immutable.
do $migration$
declare definition text;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('elsif p_action=''update'' then' in definition)=0 then
  definition := replace(definition,'''rooms'',''create'',''room''','''rooms'',''create'',''update'',''room''');
  definition := replace(definition,'elsif p_action=''create'' then', $branch$
 elsif p_action='update' then
   if jsonb_typeof(p->'questions') is distinct from 'array' then raise exception '문항을 확인하세요.'; end if;
   if jsonb_array_length(p->'questions') not between 1 and 20 or length(trim(coalesce(p->>'title',''))) not between 1 and 80 then raise exception '평가 이름과 문항을 확인하세요.'; end if;
   update speaking_private.rooms set title=p->>'title',questions=p->'questions'
    where id=(p->>'id')::uuid and owner_id=auth.uid() returning * into r;
   if r.id is null then raise exception '평가를 찾을 수 없습니다.'; end if;
   return to_jsonb(r);
 elsif p_action='create' then$branch$);
  execute definition;
 end if;
end $migration$;
