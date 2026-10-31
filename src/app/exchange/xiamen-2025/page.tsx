import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';

export const metadata: Metadata = { title: '2025 샤먼과학기술고등학교 교류', description: '학교 자체로 추진한 샤먼과학기술고등학교 교류. 5월 방한과 홈스테이에서 12월 방중으로 이어진 기록.' };

export default function Xiamen2025() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange">← 국제교류 기록으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">2025 · 중국 샤먼과학기술고등학교 · 학교 자체 교류</p><h1>2025 샤먼과학기술고등학교 교류</h1><p>5월에는 중국 친구들을 한국 가정으로 맞이하고, 12월에는 우리가 샤먼을 찾았습니다.</p></header>
    <section className="exchange-series" aria-label="2025 샤먼과학기술고등학교 교류 이야기"><ol>
      <li><span className="exchange-year">01</span><div><p className="exchange-context">5월 방한·홈스테이 → 12월 방중·호텔 숙박</p><h2><Link href="/exchange/xiamen-2025/our-first-story">우리 집에서 시작해, 친구의 학교로 이어진 만남</Link></h2><p>학교와 가정이 함께 준비한 교류, 아침밥과 놀이와 수업으로 나눈 일상.</p></div><Link className="exchange-status" href="/exchange/xiamen-2025/our-first-story">읽기 →</Link></li>
    </ol></section>
  </div>;
}
