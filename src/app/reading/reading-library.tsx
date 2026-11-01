'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BookCard } from '@/lib/reading';

const statuses: Record<string, string> = { '다읽은책': '다 읽은 책', '읽고있는책': '읽고 있는 책', '읽고싶은책': '읽고 싶은 책' };

export function ReadingLibrary({ books }: { books: BookCard[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('recent');
  const [view, setView] = useState('books');
  const [limit, setLimit] = useState(24);
  const categories = [...new Set(books.flatMap(b => b.categories))].sort((a, b) => a.localeCompare(b, 'ko'));
  const years = [...new Set(books.map(b => b.finish.slice(0, 4)).filter(Boolean))].sort().reverse();
  const term = query.trim().toLocaleLowerCase();
  const filtered = books.filter(b => (!category || b.categories.includes(category)) && (!status || b.status === status) && (!year || (year === 'undated' ? !b.finish : b.finish.startsWith(year))) && (!month || b.finish.slice(5, 7) === month) && (rating === '' || b.rating === Number(rating)) && (!term || [b.title, b.author, ...b.categories].join(' ').toLocaleLowerCase().includes(term)) && (view !== 'quotes' || b.highlight)).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating || b.finish.localeCompare(a.finish);
    if (sort === 'title') return a.title.localeCompare(b.title, 'ko');
    if (!a.finish || !b.finish) return Number(!a.finish) - Number(!b.finish) || a.title.localeCompare(b.title, 'ko');
    return (sort === 'oldest' ? a.finish.localeCompare(b.finish) : b.finish.localeCompare(a.finish)) || a.title.localeCompare(b.title, 'ko');
  });
  function reset() { setQuery(''); setCategory(''); setStatus(''); setYear(''); setMonth(''); setRating(''); setLimit(24); }
  return <section className="reading-library" aria-label="독서록 찾기">
    <div className="reading-tabs"><button aria-pressed={view === 'books'} onClick={() => { setView('books'); setLimit(24); }}>책장</button><button aria-pressed={view === 'quotes'} onClick={() => { setView('quotes'); setLimit(24); }}>기억하고 싶은 문장 <span>{books.filter(b => b.highlight).length}</span></button></div>
    <div className="reading-filters">
      <label className="reading-search">책 찾기<input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(24); }} placeholder="책 제목, 저자, 분야 검색" /></label>
      <label>분야<select value={category} onChange={e => { setCategory(e.target.value); setLimit(24); }}><option value="">모든 분야</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>독서 상태<select value={status} onChange={e => { setStatus(e.target.value); setLimit(24); }}><option value="">모든 상태</option>{Object.entries(statuses).map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>
      <label>독서 연도<select value={year} onChange={e => { setYear(e.target.value); if (e.target.value === 'undated') setMonth(''); setLimit(24); }}><option value="">모든 연도</option>{years.map(y => <option key={y} value={y}>{y}년</option>)}<option value="undated">날짜 미기록</option></select></label>
      <label>독서 월<select value={month} disabled={year === 'undated'} onChange={e => { setMonth(e.target.value); setLimit(24); }}><option value="">모든 월</option>{Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}월</option>)}</select></label>
      <label>나의 별점<select value={rating} onChange={e => { setRating(e.target.value); setLimit(24); }}><option value="">모든 별점</option>{[5,4,3,2,1].map(r => <option key={r} value={String(r)}>{'★'.repeat(r)} ({r}점)</option>)}<option value="0">별점 미기록</option></select></label>
      <label>정렬<select value={sort} onChange={e => setSort(e.target.value)}><option value="recent">최근 독서일순</option><option value="oldest">오래된 독서일순</option><option value="rating">별점 높은 순</option><option value="title">제목순</option></select></label>
    </div>
    <div className="reading-results"><p role="status">{filtered.length}{view === 'books' ? '권의 책' : '개의 문장'}{(category || year || month || rating) && <span className="reading-active-filters"> · {[category, year === 'undated' ? '날짜 미기록' : year ? `${year}년` : '', month ? `${Number(month)}월` : '', rating === '0' ? '별점 미기록' : rating ? `별점 ${rating}점` : ''].filter(Boolean).join(' · ')}</span>}</p>{(query || category || status || year || month || rating) && <button onClick={reset}>필터 초기화</button>}</div>
    {view === 'quotes' && <p className="reading-caption">남겨 둔 발췌에서 다시 읽고 싶은 문장을 골랐습니다. 문장을 누르면 책의 전체 기록으로 이어집니다.</p>}
    <div className={view === 'quotes' ? 'reading-quote-grid' : 'reading-book-grid'}>
      {filtered.slice(0, limit).map(book => view === 'quotes' ? <Link key={book.id} className="reading-quote-card" href={`/reading/${book.id}`} prefetch={false}><span className="reading-quote-mark" aria-hidden="true">“</span><blockquote>{book.highlight}</blockquote><div><strong>{book.title}</strong><span>{book.author || '저자 미기록'} · 기록 보기 →</span></div></Link> : <Link className="reading-book-card" key={book.id} href={`/reading/${book.id}`} prefetch={false}>
        <div className="reading-cover"><img src={`/reading-covers/${book.id}.jpg`} alt={`${book.title} 표지`} width="160" height="230" loading="lazy" /></div>
        <div className="reading-card-copy"><p className="reading-card-category">{book.categories.slice(0, 2).join(' · ') || '분야 미기록'}</p><h2>{book.title}</h2><p className="reading-author">{book.author || '저자 미기록'}</p>{book.rating > 0 && <p className="reading-rating" aria-label={`별점 5점 중 ${book.rating}점`}>{'★'.repeat(book.rating)}<span>{'☆'.repeat(5 - book.rating)}</span></p>}<div className="reading-card-bottom"><span>{statuses[book.status] || book.status || '상태 미기록'}</span><span>{book.finish || '날짜 미기록'}</span></div><p className="reading-note-status">{book.hasNotes ? '발췌·메모 읽기 ↗' : '책 정보 보기 ↗'}</p></div>
      </Link>)}
    </div>
    {!filtered.length && <div className="reading-empty"><h2>조건에 맞는 기록이 없어요.</h2><p>검색어나 분야를 바꾸어 다시 찾아보세요.</p><button className="button soft" onClick={reset}>필터 초기화</button></div>}
    {filtered.length > limit && <button className="button soft reading-more" onClick={() => setLimit(limit + 24)}>24권 더 보기 ({Math.min(limit, filtered.length)} / {filtered.length})</button>}
  </section>;
}
