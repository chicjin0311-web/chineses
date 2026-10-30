import type { Metadata } from 'next';
import Link from 'next/link';
import lessons from '@/lib/course-overview.json';
import './overview.css';

export const metadata: Metadata = {
  title: '언어·문화트랙 1~20차시 전체 구성',
  description: '중국어 언어트랙과 문화트랙 각 20차시의 주제, 핵심 활동, 수업자료 바로가기를 한눈에 살펴보세요.',
};

export default function CourseOverview() {
  return <div className="page course-overview">
    <Link href="/lessons" className="back-link">← 수업 폴더로 돌아가기</Link>
    <header className="page-intro">
      <p className="eyebrow">전체 수업 구성 · 각 20차시</p>
      <h1>언어와 문화, 배움의 흐름</h1>
      <p>차시별 주제와 핵심 활동을 나란히 살펴보세요. 주제를 누르면 상세 설명과 수업안내서·학생 활동지로 이동합니다.</p>
    </header>
    <div className="course-directions">
      <section><h2><Link href="/lessons/language">언어트랙 ↗</Link></h2><p>소리와 문장 기초 → 생활 표현 → 친구와 대화 → 함께 계획하기</p><small>1~5차시 · 6~10차시 · 11~14차시 · 15~20차시</small></section>
      <section><h2><Link href="/lessons/culture">문화트랙 ↗</Link></h2><p>인상과 근거 → 생활과 관계 → 기술과 마케팅 → 탐구와 돌아보기</p><small>1~5차시 · 6~10차시 · 11~15차시 · 16~20차시</small></section>
    </div>
    <p className="course-note">같은 행은 차시 번호를 비교하기 위한 배치입니다. 두 트랙을 반드시 같은 날 짝지어 진행할 필요는 없습니다.</p>
    <nav className="course-jumps" aria-label="차시 구간 바로가기">
      {[1, 6, 11, 16].map(start => <a key={start} href={`#lessons-${start}`}>{start}~{start + 4}차시</a>)}
    </nav>
    {[1, 6, 11, 16].map(start => <section className="course-block" key={start} id={`lessons-${start}`} aria-labelledby={`heading-${start}`}>
      <h2 id={`heading-${start}`}>{start}~{start + 4}차시</h2>
      <table className="course-table">
        <caption className="course-sr-only">{start}~{start + 4}차시 언어·문화 주제와 핵심 활동</caption>
        <thead><tr><th scope="col">차시</th><th scope="col">언어트랙</th><th scope="col">문화트랙</th></tr></thead>
        <tbody>{Array.from({ length: 5 }, (_, i) => start + i).map(n => <tr key={n}>
          <th scope="row">{n}차시</th>
          {['language', 'culture'].map(track => {
            const lesson = lessons.find(item => item.n === n && item.track === track)!;
            return <td key={track}>
              <span className="course-mobile-label" aria-hidden="true">{track === 'language' ? '언어트랙' : '문화트랙'}</span>
              <Link href={`/posts/${lesson.id}`} prefetch={false}>{lesson.title}<span aria-hidden="true"> ↗</span></Link>
              <p>{lesson.activity}</p>
            </td>;
          })}
        </tr>)}</tbody>
      </table>
    </section>)}
    <p className="course-note">공개된 수업자료 40개를 기준으로 정리했습니다. 문화트랙은 짧은 자료와 짝 활동, 언어트랙은 듣기·말하기와 상황 대화를 중심으로 구성했습니다.</p>
    <Link href="/lessons" className="text-button">수업 폴더에서 자료 둘러보기 →</Link>
  </div>;
}
