import Link from 'next/link';
import records from '@/data/archive-records.json';
import './archive-records.css';
import { ProjectRecords } from './project-records';

const semesters = ['2024년 1학기', '2024년 2학기', '2025년 1학기', '2025년 2학기', '2026년 1학기', '2026년 2학기'];

export function ArchiveRecords() {
  return <><ProjectRecords /><section className="archive-records" aria-labelledby="archive-records-title">
    <div className="section-heading"><h2 id="archive-records-title">학기별 수업 기록</h2><span className="section-hint">학습 활동 {records.length}편 · PDF {records.length}개</span></div>
    <p className="archive-intro">아래 9편의 PDF와 이미지는 AI가 수업자료의 일부 내용을 새 양식으로 재구성한 참고 활동지입니다. 선생님이 제작한 원본 학습지와는 다릅니다. 원본 학습지는 별도 첨부 후 확인하여 반영합니다.</p>
    <nav className="archive-semesters" aria-label="학기 바로가기">{semesters.map((semester, index) => <a key={semester} href={`#semester-${index}`}>{semester}</a>)}</nav>
    {semesters.map((semester, index) => {
      const items = records.filter(record => record.semester === semester);
      return <section key={semester} id={`semester-${index}`} className="archive-semester" aria-labelledby={`semester-title-${index}`}>
        <h3 id={`semester-title-${index}`}>{semester}</h3>
        {items.length ? items.map(record => <article key={record.id} className="archive-card">
          <span className="archive-label">공유용 학습지 · AI 재구성 참고 자료</span>
          <h4><Link href={`/research/archive/${record.id}`}>{record.title}</Link></h4>
          <p>{record.summary}</p>
          <div className="archive-actions"><Link className="button soft" href={`/research/archive/${record.id}`}>수업 내용 보기</Link><a className="button soft" href={record.file} download>학습 활동 PDF 내려받기</a></div>
        </article>) : <p className="archive-pending">학기를 확정할 근거와 공개 가능한 자료를 함께 확인하지 못해 이번 정리에는 첨부하지 않았습니다.</p>}
      </section>;
    })}
    <p className="archive-scope">평가계획은 공개 대상에서 제외했습니다. PPT와 나머지 원본도 공개 적합성이 확인되지 않아 첨부하지 않았습니다. 최근 추가: 2026.11.03.</p>
  </section></>;
}
