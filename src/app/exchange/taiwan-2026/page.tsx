import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';

export const metadata: Metadata = { title: '2026 대만 국제교류 · 허우쭝고등학교', description: '첫 온라인 만남부터 사전답사와 두 번째 온라인 교류까지, 대만 교류를 준비하고 이어 간 기록.' };

export default function TaiwanSeries() {
  return <div className="page exchange-page">
    <Link href="/exchange" className="back-link">← 국제교류 기록으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">2026 · 대만 허우쭝고등학교</p><h1>2026 대만 국제교류 · 허우쭝고등학교</h1><p>온라인에서 먼저 인사하고, 다음 만남을 준비하는 이야기.</p></header>
    <section className="exchange-series" aria-label="대만 교류 연재 순서"><ol>
      <li><span className="exchange-year">01</span><div><p className="exchange-context">2026. 5. 29. · 온라인 교류 1차</p><h2><Link href="/exchange/taiwan-2026/online-1">대만 친구들과 처음 인사한 날</Link></h2><p>사전교육과 활동지, 소그룹 대화로 준비한 첫 만남. 운영자를 위한 준비 절차도 함께 정리했습니다.</p></div><Link className="exchange-status" href="/exchange/taiwan-2026/online-1">읽기 →</Link></li>
      <li><span className="exchange-year">02</span><div><p className="exchange-context">2026. 9. 21.–9. 23. · 사전답사</p><h2><Link href="/exchange/taiwan-2026/site-visit">학생들과 함께 걸을 길을 먼저 살펴보다</Link></h2><p>자매학교와 문화탐방지에서 살펴본 이동 동선과 집결지, 화장실·안전 확인 사항.</p></div><Link className="exchange-status" href="/exchange/taiwan-2026/site-visit">읽기 →</Link></li>
      <li><span className="exchange-year">03</span><div><p className="exchange-context">2026. 10. 29. · 온라인 교류 2차</p><h2><Link href="/exchange/taiwan-2026/online-2">이번에는 우리 지역을 소개합니다</Link></h2><p>지역 소개와 학생 후기, 학교 방문 때 함께할 지역 탐방으로 이어지는 이야기.</p></div><Link className="exchange-status" href="/exchange/taiwan-2026/online-2">읽기 →</Link></li>
    </ol></section>
  </div>;
}
