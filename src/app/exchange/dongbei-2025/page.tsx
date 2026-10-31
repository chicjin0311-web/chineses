import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';
export const metadata: Metadata = { title: '2025 동북육재학교 교류', description: '국제교육원 공모 선정으로 시작한 동북육재학교 교류. 온라인 만남 이후 방중, 방한 순서로 이어진 기록.' };
export default function Dongbei2025() {
 return <div className="page exchange-page"><Link className="back-link" href="/exchange">← 국제교류 기록으로 돌아가기</Link><header className="page-intro"><p className="eyebrow">2025 · 중국 랴오닝성 동북육재학교</p><h1>2025 동북육재학교 교류</h1><p>온라인으로 먼저 인사하고, 우리가 중국을 찾은 뒤 중국 친구들을 한국으로 맞이했습니다.</p></header><section className="exchange-series" aria-label="2025 동북육재학교 교류 순서"><ol>
 <li><span className="exchange-year">01</span><div><p className="exchange-context">방중 · 먼저 중국으로</p><h2><Link href="/exchange/dongbei-2025/visit-china">화면으로 만난 친구의 학교를 찾아가다</Link></h2><p>공모 선정과 온라인 만남, 랴오닝성에서 경험한 학교와 문화 이야기.</p></div><Link className="exchange-status" href="/exchange/dongbei-2025/visit-china">읽기 →</Link></li>
 <li><span className="exchange-year">02</span><div><p className="exchange-context">방한 · 이번에는 우리 학교에서</p><h2><Link href="/exchange/dongbei-2025/visit-korea">학교가 함께 준비한 친구들의 방문</Link></h2><p>교과별 수업과 학생회 문화 체험, 학교 전체가 함께 준비할 사항.</p></div><Link className="exchange-status" href="/exchange/dongbei-2025/visit-korea">읽기 →</Link></li>
 </ol></section><p><Link href="/exchange/dongbei-2026">올해로 이어진 인연: 2026 동북육재학교 교류 →</Link></p></div>;
}
