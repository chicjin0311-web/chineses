import { getEditorSession } from '@/lib/supabase-server';
import { privateJson } from '@/lib/api-auth';
export async function GET() {
  const { user, isEditor } = await getEditorSession();
  return privateJson({ signedIn: !!user, isEditor });
}
