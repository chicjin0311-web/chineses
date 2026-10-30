import { publicPostClient } from '@/lib/published-posts';

export const dynamic = 'force-dynamic';
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const missing = () => Response.json({ error: '파일을 찾을 수 없어요.' }, { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
  if (!/^[0-9a-f-]{36}$/i.test(id)) return missing();
  const db = publicPostClient();
  const { data: file, error } = await db.from('classroom_attachments').select('storage_path,file_name,classroom_posts!inner(status)').eq('id', id).eq('classroom_posts.status', 'published').maybeSingle();
  if (error || !file) return missing();
  const { data, error: signError } = await db.storage.from('classroom-files').createSignedUrl(file.storage_path, 30, { download: file.file_name });
  if (signError || !data) return missing();
  return new Response(null, { status: 303, headers: { Location: data.signedUrl, 'Cache-Control': 'private, no-store' } });
}
