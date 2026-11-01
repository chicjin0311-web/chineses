import Link from 'next/link';
import { bookCards, readingBooks } from '@/lib/reading';
import { ReadingLibrary } from './reading-library';
import './reading.css';

export const metadata = { title: '독서록', description: '책에서 만난 문장과 나의 생각. 교육, 육아, 중국, 문학과 일상을 잇는 143권의 독서 기록.' };

export default function ReadingPage() {
  return <div className="page reading-page">
    <Link href="/" className="back-link">← 전체 폴더로 돌아가기</Link>
    <header className="collection-heading">
      <div className="page-intro"><p className="eyebrow">읽고 생각하기</p><h1>책장을 덮어도,<br />남아 있는 것들.</h1><p>마음에 머문 문장, 읽으며 떠오른 생각.<br />한 권씩 쌓아 온 배움을 수업과 일상으로 이어 갑니다.</p></div>
      <Link href="/write?category=reading" className="button soft">새 독서록 초안 쓰기</Link>
    </header>
    <div className="reading-stats"><span><strong>{readingBooks.length}</strong> 권의 책</span><span><strong>{readingBooks.filter(b => b.status === '다읽은책').length}</strong> 권 완독</span><span><strong>{bookCards.filter(b => b.hasNotes).length}</strong> 편의 발췌·메모</span></div>
    <ReadingLibrary books={bookCards} />
  </div>;
}
