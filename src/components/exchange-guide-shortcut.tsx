import Link from 'next/link';
import styles from './exchange-guide-shortcut.module.css';

export function ExchangeGuideShortcut() {
  return <section className={styles.panel} aria-label="국제교류 담당자 준비 자료 바로가기">
    <p className={styles.eyebrow}>국제교류 담당 선생님을 위한 자료</p>
    <h2><Link href="/exchange/guidelines-2026">2026 국제교류 준비 자료</Link></h2>
    <p>현장체험학습·공무국외출장 지침, 준비 흐름도와 양식을 바로 확인하세요.</p>
    <div className={styles.links}>
      <Link href="/exchange/guidelines-2026" className="button primary">지침·준비 순서 보기 →</Link>
      <Link href="/exchange/guidelines-2026#forms" className="button soft">공식 양식</Link>
      <a href="/exchange/forms/2026-exchange-one-page-checklist.pdf" download className="button soft">체크리스트 PDF ↓</a>
      <a href="/exchange/forms/2026-exchange-one-page-checklist.docx" download className="button soft">수정용 워드 ↓</a>
    </div>
  </section>;
}
