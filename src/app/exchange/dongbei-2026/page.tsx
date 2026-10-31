import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';

export const metadata: Metadata = { title: '2026 중국 국제교류 · 동북육재학교', description: '작년의 만남을 올해 하반기 헬로우이프렌즈로 이어 갑니다. 온라인 교류와 응원, 앞으로 준비할 소포와 엽서의 기록.' };

export default function DongbeiSeries() {
  return <div className="page exchange-page">
    <Link href="/exchange" className="back-link">← 국제교류 기록으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">2026 · 중국 동북육재학교</p><h1>2026 중국 국제교류 · 동북육재학교</h1><p>작년에 만난 친구들과 올해도 안부를 나누고, 서로를 응원합니다.</p></header>
    <section className="exchange-series" aria-label="동북육재학교 교류 연재 순서"><ol>
      <li><span className="exchange-year">01</span><div><p className="exchange-context">2026년 하반기 · 헬로우이프렌즈</p><h2><Link href="/exchange/dongbei-2026/continuing-friendship">작년에 만난 친구에게, 올해의 응원을</Link></h2><p>희망 학생들과 이어 가는 온라인 교류. 받은 수능 응원영상과 앞으로 준비할 답례 영상·소포·엽서 이야기.</p></div><Link className="exchange-status" href="/exchange/dongbei-2026/continuing-friendship">읽기 →</Link></li>
    </ol></section>
  </div>;
}
