import Link from 'next/link';
export default function NotFound(){return <div className="error-page"><p className="eyebrow">길을 잠깐 벗어났네요</p><h1>이 페이지는 아직 없어요.</h1><p>교실 홈에서 다시 시작해 볼까요?</p><Link href="/" className="button primary">교실 홈으로</Link></div>;}
