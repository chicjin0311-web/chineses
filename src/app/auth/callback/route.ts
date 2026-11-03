import { NextResponse, type NextRequest } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';
import {studioPath} from '@/lib/studio-path';
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const next=studioPath(request.nextUrl.searchParams.get('next'));
  if (code) {
    const db = await getServerSupabase();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url), { headers: { 'Cache-Control': 'private, no-store' } });
  }
  return NextResponse.redirect(new URL(`/login?error=expired&next=${encodeURIComponent(next)}`, request.url), { headers: { 'Cache-Control': 'private, no-store' } });
}
