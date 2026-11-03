import { NextResponse, type NextRequest } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';
import {studioPath} from '@/lib/studio-path';
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  let savedNext='';try{savedNext=decodeURIComponent(request.cookies.get('archive-next')?.value??'');}catch{}
  const next=studioPath(savedNext);
  if (code) {
    const db = await getServerSupabase();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) {const response=NextResponse.redirect(new URL(next, request.url), { headers: { 'Cache-Control': 'private, no-store' } });response.cookies.delete('archive-next');return response;}
  }
  return NextResponse.redirect(new URL(`/login?error=expired&next=${encodeURIComponent(next)}`, request.url), { headers: { 'Cache-Control': 'private, no-store' } });
}
