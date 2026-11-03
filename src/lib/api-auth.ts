import { getEditorSession } from './supabase-server';

export class ApiError extends Error { constructor(message: string, public status = 400) { super(message); } }
export const privateJson = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0' } });
export function apiError(error: unknown) {
  return privateJson({ error: error instanceof ApiError ? error.message : '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.' }, error instanceof ApiError ? error.status : 500);
}
export function checkOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new ApiError('이 홈페이지에서 다시 시도해 주세요.', 403);
}
export async function requireEditor(request?: Request) {
  if (request) checkOrigin(request);
  const session = await getEditorSession();
  if (!session.user) throw new ApiError('로그인이 필요합니다.', 401);
  if (!session.isEditor) throw new ApiError('선생님 전용 작성 권한이 필요합니다.', 403);
  return { db: session.db, user: session.user };
}
export async function readJson(request: Request) {
  const body = await request.text();
  if (body.length > 400000) throw new ApiError('입력 내용이 너무 깁니다.', 413);
  try { return JSON.parse(body); } catch { throw new ApiError('올바른 형식으로 다시 시도해 주세요.'); }
}
