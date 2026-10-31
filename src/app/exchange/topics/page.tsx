import type { Metadata } from 'next';
import Link from 'next/link';
import { exchangePosts, exchangeTopics } from '@/lib/exchange-posts';
import { ExchangeTags } from '@/components/exchange-tags';
import '../exchange.css';

export const metadata: Metadata = {
  title: '국제교류 주제별 글 찾기 | 온라인 교류·홈스테이·방중·방한 준비',
  description: '국제교류가 궁금한 선생님을 위한 실제 운영 기록. 중국·대만 온라인 교류, 공동수업, 홈스테이, 사전답사와 방문 준비 사례를 주제별로 찾아보세요.',
  alternates: { canonical: 'https://chineses.vercel.app/exchange/topics' },
};

export default function Topics() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange">← 국제교류 기록</Link>
    <header className="page-intro"><p className="eyebrow">궁금한 주제부터 읽어 보세요</p><h1>국제교류 주제별 글 찾기</h1><p>온라인 만남은 어떻게 준비할까요? 홈스테이와 학교 방문은 무엇을 챙겨야 할까요? 직접 운영하며 남긴 경험을 모았습니다.</p></header>
    <ExchangeTags tags={exchangeTopics} />
    {exchangeTopics.map(topic => <section key={topic} id={topic} className="exchange-series exchange-topic"><h2>#{topic}</h2><ul>{exchangePosts.filter(post => post.tags.includes(topic)).map(post => <li key={post.href}><div><h3><Link href={post.href}>{post.title}</Link></h3><p>{post.description}</p></div></li>)}</ul></section>)}
  </div>;
}
