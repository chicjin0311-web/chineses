import Link from 'next/link';
import projects from '@/data/project-records.json';

export function ProjectRecords() {
  return <section className="archive-records" aria-labelledby="project-records-title">
    <div className="section-heading"><h2 id="project-records-title">프로젝트 수업 기록</h2><span className="section-hint">{projects.length}개의 수업</span></div>
    <p className="archive-intro">교과와 대상, 수업의 흐름과 결과물을 함께 살펴봅니다. 사용 시기가 확인되지 않은 수업은 학기를 임의로 정하지 않았습니다.</p>
    <div className="project-record-grid">{projects.map(project => <article key={project.id} className="archive-card">
      <span className="archive-label">{project.subject} · {project.target}</span>
      <h3><Link href={`/research/projects/${project.id}`}>{project.title}</Link></h3>
      <p>{project.summary}</p><p className="archive-label">{project.period}</p>
      <Link className="button soft" href={`/research/projects/${project.id}`}>수업 기록{project.id === 'china-speed' ? '과 채점기준표' : ''} 보기</Link>
    </article>)}</div>
  </section>;
}
