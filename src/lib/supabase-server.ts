import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(values) {
        try { values.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); }
        catch { /* Server component cookies are refreshed by proxy.ts. */ }
      },
    },
  });
}

export async function getEditorSession() {
  const db = await getServerSupabase();
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) return { db, user: null, isEditor: false };
  const { data, error: roleError } = await db.rpc('is_classroom_editor');
  return { db, user, isEditor: !roleError && data === true };
}
