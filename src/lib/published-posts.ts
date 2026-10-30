import { createClient } from '@supabase/supabase-js';

export type PublishedPost = { id: string; title: string; summary: string; content: string; target: string; duration: string; record_date: string; category: string };
export type PublishedAttachment = { id: string; kind: string; file_name: string; size_bytes: number };
const columns = 'id,title,summary,content,target,duration,record_date,category';

export function publicPostClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('수업 자료 연결 설정을 확인해 주세요.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) } });
}

export async function getPublishedPosts(category: string): Promise<PublishedPost[]> {
  const { data, error } = await publicPostClient().from('classroom_posts').select(columns).eq('status', 'published').eq('category', category).order('record_date', { ascending: false }).order('title');
  if (error) throw new Error('수업 자료를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
  const titleOrder = new Intl.Collator('ko', { numeric: true });
  return (data ?? []).sort((a, b) => b.record_date.localeCompare(a.record_date) || titleOrder.compare(a.title, b.title));
}

export async function getPublishedPost(id: string): Promise<PublishedPost | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data, error } = await publicPostClient().from('classroom_posts').select(columns).eq('id', id).eq('status', 'published').maybeSingle();
  if (error) throw new Error('수업 자료를 불러오지 못했어요.');
  return data;
}

export async function getPublishedAttachments(postId: string): Promise<PublishedAttachment[]> {
  const { data, error } = await publicPostClient().from('classroom_attachments').select('id,kind,file_name,size_bytes').eq('post_id', postId).order('kind');
  if (error) throw new Error('첨부파일을 불러오지 못했어요.');
  return data ?? [];
}

