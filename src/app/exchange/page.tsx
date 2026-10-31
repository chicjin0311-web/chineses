import type { Metadata } from 'next';
import Link from 'next/link';
import './exchange.css';

export const metadata: Metadata = {
  title: '국제교류 기록',
  description: '동북육재학교, 샤먼과학기술고등학교, 대만 교류를 학교와 연도별로 나눈 만남과 배움의 기록입니다.',
};

const series = [
  { year: '2026', school: '동북육재학교', context: '하반기 헬로우이프렌즈', description: '작년의 인연을 온라인 만남과 응원으로 이어 갑니다.', href: '/exchange/dongbei-2026' },
  { year: '2025', school: '동북육재학교', context: '국제교육원 공모 선정 · 한중고교생교류사업', description: '온라인 만남 이후 방중 → 방한으로 이어진 기록.', href: '/exchange/dongbei-2025' },
  { year: '2025', school: '샤먼과학기술고등학교', context: '학교 자체 교류 · 가정과 학교가 함께한 만남', description: '5월 방한·홈스테이 → 12월 방중·호텔 숙박으로 이어진 기록.', href: '/exchange/xiamen-2025' },
  { year: '2026', school: '대만 교류', context: '온라인에서 다음 만남으로', description: '1차 온라인 교류 → 사전답사 → 2차 온라인 교류', href: '/exchange/taiwan-2026' },
];

export default function ExchangePage() {
  return <div className="page exchange-page">
    <Link href="/" className="back-link">← 전체 폴더로 돌아가기</Link>
    <header className="collection-heading">
      <div className="page-intro"><p className="eyebrow">만남이 이어지는 교실</p><h1>국제교류 기록</h1><p>화면으로 만나고, 서로의 학교를 찾고, 다시 안부를 나눕니다.<br />함께한 학교와 연도를 따라 교류의 이야기를 모읍니다.</p></div>
      <Link href="/write?category=exchange" className="button soft">초안 쓰기</Link>
    </header>
    <section aria-labelledby="exchange-start-title" className="exchange-feature"><p className="eyebrow">지금 이어 가는 이야기 · 2026</p><h2 id="exchange-start-title"><Link href="/exchange/dongbei-2026/continuing-friendship">작년에 만난 친구에게, 올해의 응원을</Link></h2><p>올해 동북육재학교와 이어 가는 온라인 교류를 먼저 소개합니다.<br />지난해 기록은 방중, 방한 순서로 읽을 수 있습니다.</p><Link className="text-button" href="/exchange/dongbei-2026/continuing-friendship">올해 이야기 읽기 →</Link></section>
    <section className="exchange-series" aria-labelledby="exchange-series-title">
      <h2 id="exchange-series-title">차례로 남길 이야기</h2>
      <p className="exchange-muted">학교별 이야기는 준비되는 대로 한 편씩 이어 갑니다.</p>
      <ol>{series.map(item => <li key={`${item.year}-${item.school}`}>
        <span className="exchange-year">{item.year}</span>
        <div><p className="exchange-context">{item.context}</p><h3>{item.href ? <Link href={item.href}>{item.school}</Link> : item.school}</h3><p>{item.description}</p></div>
        <span className="exchange-status">{item.href ? <Link href={item.href}>첫 글 읽기 →</Link> : '준비 중'}</span>
      </li>)}</ol>
    </section>
  </div>;
}
