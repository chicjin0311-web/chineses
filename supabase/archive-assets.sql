create table public.archive_assets (
 id uuid primary key,
 slug text not null check(slug ~ '^[a-z0-9][a-z0-9-]{0,99}$'),
 kind text not null check(kind in ('worksheet','ppt')),
 label text not null check(length(label) between 1 and 120),
 download_path text unique not null,
 preview_paths text[] not null default '{}',
 size_bytes integer not null check(size_bytes between 1 and 20971520),
 created_at timestamptz not null default now(),
 check(cardinality(preview_paths)<=30)
);
alter table public.archive_assets enable row level security;
revoke all on public.archive_assets from anon,authenticated;
grant select on public.archive_assets to anon,authenticated;
grant insert on public.archive_assets to authenticated;
create policy archive_asset_read on public.archive_assets for select to anon,authenticated using (
 (select public.is_classroom_editor()) or exists(select 1 from public.archive_documents d where d.slug=archive_assets.slug and d.revision='published' and d.document->'assetIds' ? archive_assets.id::text)
);
create policy archive_asset_insert on public.archive_assets for insert to authenticated with check ((select public.is_classroom_editor()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('archive-files','archive-files',false,20971520,array['application/pdf','image/jpeg','application/vnd.openxmlformats-officedocument.presentationml.presentation']);
create policy archive_file_read on storage.objects for select to anon,authenticated using (
 bucket_id='archive-files' and exists(select 1 from public.archive_assets a where a.download_path=name or name=any(a.preview_paths))
);
create policy archive_file_insert on storage.objects for insert to authenticated with check (
 bucket_id='archive-files' and (select public.is_classroom_editor()) and exists(select 1 from public.archive_assets a where a.download_path=name or name=any(a.preview_paths))
);
