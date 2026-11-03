create table public.archive_documents (
 slug text not null check (slug ~ '^[a-z0-9][a-z0-9-]{0,99}$'),
 revision text not null check (revision in ('draft','published')),
 document jsonb not null check (jsonb_typeof(document) = 'object' and octet_length(document::text) <= 300000),
 updated_at timestamptz not null default now(),
 primary key (slug,revision)
);
alter table public.archive_documents enable row level security;
revoke all on public.archive_documents from anon,authenticated;
grant select on public.archive_documents to anon,authenticated;
grant insert,update on public.archive_documents to authenticated;
create policy archive_visible on public.archive_documents for select to anon,authenticated using (revision='published' or (select public.is_classroom_editor()));
create policy archive_editor_insert on public.archive_documents for insert to authenticated with check ((select public.is_classroom_editor()));
create policy archive_editor_update on public.archive_documents for update to authenticated using ((select public.is_classroom_editor())) with check ((select public.is_classroom_editor()));
create function public.save_archive_document(p_slug text,p_document jsonb,p_expected timestamptz,p_publish boolean)
returns timestamptz language plpgsql security invoker set search_path='' as $$
declare v_current timestamptz; v_next timestamptz:=clock_timestamp();
begin
 if not public.is_classroom_editor() then raise exception 'editor_required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended('archive:'||p_slug,0));
 select updated_at into v_current from public.archive_documents where slug=p_slug and revision='draft';
 if v_current is distinct from p_expected then raise exception 'revision_conflict' using errcode='40001'; end if;
 insert into public.archive_documents(slug,revision,document,updated_at) values(p_slug,'draft',p_document,v_next)
 on conflict(slug,revision) do update set document=excluded.document,updated_at=excluded.updated_at;
 if p_publish then
 insert into public.archive_documents(slug,revision,document,updated_at) values(p_slug,'published',p_document,v_next)
 on conflict(slug,revision) do update set document=excluded.document,updated_at=excluded.updated_at;
 end if;
 return v_next;
end; $$;
revoke all on function public.save_archive_document(text,jsonb,timestamptz,boolean) from public,anon;
grant execute on function public.save_archive_document(text,jsonb,timestamptz,boolean) to authenticated;
