'use client';
import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabase-browser';
export function TeacherLogin({ expired = false }: { expired?: boolean }) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(expired ? '로그인 링크가 만료되었거나 같은 브라우저에서 열리지 않았어요. 새 링크를 받아 주세요.' : '');
  async function send(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage('');
    try {
      const db = getBrowserSupabase();
      const { error } = await db.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback` } });
      if (error) {
        setMessage(error.status === 429 ? '메일 발송 간격 또는 발송 한도에 도달했어요. 잠시 후 다시 시도해 주세요.' : '로그인 메일을 보내지 못했어요. 등록된 선생님 이메일인지 확인해 주세요. 반복되면 인증 메일 설정 확인이 필요합니다.');
      } else { setSent(true); setMessage('로그인 메일을 보냈어요. 이 브라우저에서 메일의 로그인 링크를 열어 주세요.'); }
    } catch { setMessage('네트워크 연결을 확인한 뒤 다시 시도해 주세요.'); }
    finally { setBusy(false); }
  }
  return <form className="teacher-login" onSubmit={send}>
    <span className="login-symbol"><Mail size={26} strokeWidth={1.4} aria-hidden="true" /></span>
    <h2>선생님 로그인</h2><p>등록한 이메일로 로그인 링크를 받아요.<br />글과 자료는 선생님만 작성할 수 있습니다.</p>
    <label htmlFor="teacher-email">로그인 이메일</label><input id="teacher-email" type="email" autoComplete="email" required value={email} onChange={event => { setEmail(event.target.value); setSent(false); }} placeholder="이메일 주소" disabled={busy} />
    <button type="submit" className="button primary" disabled={busy || sent}>{busy ? '메일 보내는 중…' : sent ? '메일함을 확인해 주세요' : '로그인 링크 받기'}<ArrowRight size={17} aria-hidden="true" /></button>
    <p className="form-message" role="status">{message}</p>
    {sent && <button type="button" className="text-button" onClick={() => setSent(false)}>메일을 받지 못했어요</button>}
    <small>이름과 이메일은 공개 글에 표시하지 않습니다.</small>
  </form>;
}
