import type { Metadata } from 'next';
import Link from 'next/link';
import './exchange.css';

export const metadata: Metadata = {
  title: '국제교류 기록',
  description: '2025년 중국 두 학교와의 교류에서 2026년 대만 교류까지. 온라인과 대면으로 이어지는 만남과 배움의 기록입니다.',
};

const series = [
  { year: '2025', school: '동북육재학교', context: '교육부 한중고교생교류사업', description: '온라인 만남과 방중·방한을 한 흐름으로 돌아봅니다.' },
  { year: '2025', school: '샤먼과학기술고등학교', context: '학교 자체 추진 국제교류', description: '서로의 나라를 오간 교류와 홈스테이·호텔 숙박의 경험을 정리합니다.' },
  { year: '2026', school: '대만 교류', context: '온라인에서 다음 만남으로', description: '1차 온라인 교류 → 사전답사 → 2차 온라인 교류', href: '/exchange/taiwan-2026' },
];

export default function ExchangePage() {
  return <div className="page exchange-page">
    <Link href="/" className="back-link">← 전체 폴더로 돌아가기</Link>
    <header className="collection-heading">
      <div className="page-intro"><p className="eyebrow">만남이 이어지는 교실</p><h1>국제교류 기록</h1><p>화면으로 만나고, 서로의 학교를 찾고, 다시 안부를 나눕니다.<br />함께한 학교와 연도를 따라 교류의 이야기를 모읍니다.</p></div>
      <Link href="/write?category=exchange" className="button soft">초안 쓰기</Link>
    </header>
    <section aria-labelledby="exchange-start-title" className="exchange-feature">
      <p className="eyebrow">첫 번째 이야기 · 2025–2026</p>
      <h2 id="exchange-start-title"><Link href="/exchange/our-first-story">중국에서 대만으로, 이어지는 우리 교실의 국제교류</Link></h2>
      <p>동북육재학교와 샤먼과학기술고등학교에서 시작된 만남.<br />지난해의 경험을 올해 대만 교류로 이어 가며, 그 이야기를 남겨 봅니다.</p>
      <div className="exchange-tags" aria-label="이 글에 담긴 교류 방식"><span>온라인 교류</span><span>대면 교류</span></div>
      <Link className="text-button" href="/exchange/our-first-story">첫 이야기 읽기 →</Link>
    </section>
    <section className="exchange-series" aria-labelledby="exchange-series-title">
      <h2 id="exchange-series-title">차례로 남길 이야기</h2>
      <p className="exchange-muted">학교별 이야기는 준비되는 대로 한 편씩 이어 갑니다.</p>
      <ol>{series.map(item => <li key={item.school}>
        <span className="exchange-year">{item.year}</span>
        <div><p className="exchange-context">{item.context}</p><h3>{item.href ? <Link href={item.href}>{item.school}</Link> : item.school}</h3><p>{item.description}</p></div>
        <span className="exchange-status">{item.href ? <Link href={item.href}>첫 글 읽기 →</Link> : '준비 중'}</span>
      </li>)}</ol>
    </section>
  </div>;
}
