import { redirect } from 'next/navigation';
import { getEditorSession } from '@/lib/supabase-server';
import { TeacherLogin } from '@/components/teacher-login';
import '@/components/archive-records.css';
export const metadata = { title: '선생님 로그인', robots: { index: false, follow: false } };
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [{ isEditor }, params] = await Promise.all([getEditorSession(), searchParams]);
  if (isEditor) redirect('/studio');
  return <div className="page login-page"><header className="page-intro"><p className="eyebrow">차곡차곡 기록 작업실</p><h1>수업과 기록을 올리는 공간.</h1><p>로그인하면 수업 글 작성·수정, 임시저장, 공개 게시를 할 수 있어요.</p></header><TeacherLogin expired={params.error === 'expired'} /></div>;
}
