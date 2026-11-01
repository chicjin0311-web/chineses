import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readingBooks, readingStatus } from '@/lib/reading';
import '../reading.css';

export function generateStaticParams() { return readingBooks.map(book => ({ id: book.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = readingBooks.find(b => b.id === id);
  return { title: book ? `${book.title} · 독서록` : '독서록을 찾을 수 없어요', description: book ? `${book.author || ''}의 ${book.title}. 책에서 만난 문장과 읽으며 남긴 기록.` : undefined };
}
function RecordText({ text }: { text: string }) {
  return <div className="reading-prose">{text.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph.replace(/^#{1,6}\s+/gm, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>)}</div>;
}
export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = readingBooks.find(b => b.id === id);
  if (!book) notFound();
  const hasRecord = Boolean(book.scrap || book.notes || book.reflection);
  return <article className="page reading-page reading-detail">
    <Link className="back-link" href="/reading">← 독서록 책장으로</Link>
    <header className="reading-detail-header"><div className="reading-detail-cover"><img src={`/reading-covers/${book.id}.jpg`} alt={`${book.title} 표지`} width="200" height="290" /></div><div><p className="eyebrow">{book.categories.join(' · ') || '나의 책장'}</p><h1>{book.title}</h1><p className="reading-detail-author">{book.author || '저자 미기록'}</p><dl><div><dt>독서 상태</dt><dd>{readingStatus(book.status)}</dd></div>{book.finish && <div><dt>{book.status === '다읽은책' ? '완독일' : '기록된 독서일'}</dt><dd>{book.finish}</dd></div>}{book.rating > 0 && <div><dt>나의 별점</dt><dd aria-label={`5점 중 ${book.rating}점`}>{'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}</dd></div>}</dl></div></header>
    {book.highlight && <section className="reading-highlight" aria-labelledby="highlight-title"><p className="eyebrow" id="highlight-title">기억하고 싶은 문장</p><blockquote>{book.highlight}</blockquote><p className="reading-caption">독서록에 남겨 둔 발췌에서 · 쪽수 미기록</p></section>}
    <nav className="reading-detail-nav" aria-label="이 책의 기록">{book.scrap && <a href="#scrap">책 스크랩</a>}{book.notes && <a href="#notes">발췌와 메모</a>}{book.reflection && <a href="#reflection">읽으며 떠오른 생각</a>}</nav>
    {book.scrap && <section className="reading-record" id="scrap"><h2>책 스크랩</h2><RecordText text={book.scrap} /></section>}
    {book.notes && <section className="reading-record" id="notes"><h2>발췌와 독서 메모</h2><RecordText text={book.notes} /></section>}
    {book.reflection && <section className="reading-record" id="reflection"><h2>읽으며 떠오른 생각</h2><RecordText text={book.reflection} /></section>}
    {!hasRecord && <section className="reading-empty"><h2>다음 문장을 기다리는 책.</h2><p>책 정보가 먼저 기록되어 있습니다. 기억하고 싶은 문장과 생각을 차곡차곡 남겨 보세요.</p></section>}
    <footer className="reading-record-footer"><p>발췌와 메모는 기존 독서록을 바탕으로 옮겼습니다. 표지는 검색된 판본으로, 읽은 책의 판본과 다를 수 있습니다.</p>{book.coverSource && <a href={book.coverSource} target="_blank" rel="noreferrer">표지 출처 ↗</a>}<Link className="button soft" href="/write?category=reading">새 문장과 생각을 초안으로 남기기</Link><small>새 초안은 이 브라우저에 비공개로 저장됩니다.</small></footer>
  </article>;
}
