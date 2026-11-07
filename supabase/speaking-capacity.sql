-- Allow 120 students across five classes plus test/retry headroom.
-- Preserve the current gateway body, authorization, IP rate limit and grants.
do $capacity$
declare definition text;
begin
 select pg_get_functiondef('speaking_private.gateway(text,text,jsonb)'::regprocedure) into definition;
 if position('where room_id=r.id)>=100' in definition)=0 and position('where room_id=r.id)>=200' in definition)=0 then
  raise exception 'Unexpected assessment capacity condition; no change applied.';
 end if;
 execute replace(definition,'where room_id=r.id)>=100','where room_id=r.id)>=200');
end
$capacity$;
