import Link from 'next/link';
import { notFound } from 'next/navigation';
import projects from '@/data/project-records.json';
import rubrics from '@/data/china-speed-rubrics.json';
import learningDetails from '@/data/learning-details.json';
import { LearningDetails } from '@/components/learning-details';
import '@/components/archive-records.css';

export function generateStaticParams() { return projects.map(project => ({ slug: project.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.id === slug);
  return { title: project?.title ?? '수업 기록', description: project?.summary };
}
export default async function ProjectRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.id === slug);
  if (!project) notFound();
  const learning = learningDetails[project.id as keyof typeof learningDetails];
  return <article className="page archive-detail">
    <Link className="back-link" href="/research/archive">← 기존 자료 정리</Link>
    <header className="page-intro"><p className="eyebrow">프로젝트 수업 기록</p><h1>{project.title}</h1><p>{project.summary}</p></header>
    <dl className="project-facts"><div><dt>교과</dt><dd>{project.subject}</dd></div><div><dt>대상</dt><dd>{project.target}</dd></div><div><dt>시기·차시</dt><dd>{project.period}</dd></div></dl>
    <section><h2>수업 목표</h2><p>{project.goal}</p></section>
    <LearningDetails learning={learning} />
    <section><h2>수업의 흐름</h2><ol>{project.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
    <section><h2>결과물</h2><p>{project.outcomes}</p></section>
    {project.id === 'china-speed' && <section id="rubrics" aria-labelledby="rubrics-title">
      <h2 id="rubrics-title">서·논술형 채점기준표</h2>
      <p>2026년 2학기 중국문화 자료에서 해당 두 영역의 수준별 설명과 점수를 그대로 옮겼습니다. 평가계획 전체는 공개하지 않았습니다.</p>
      {rubrics.map(rubric => <div className="rubric-section" key={rubric.title}><h3>{rubric.title}</h3><div className="rubric-scroll" role="region" aria-label={`${rubric.title} 채점기준표`} tabIndex={0}><table className="rubric-table"><caption>{rubric.title} · 원문 전사</caption><thead><tr><th scope="col">채점 요소</th><th scope="col">수행 특성</th><th scope="col">점수</th></tr></thead><tbody>{rubric.rows.map((row, index) => <tr key={`${row.criterion}-${index}`}><th scope="row">{row.criterion}</th><td>{row.description}</td><td>{row.score}</td></tr>)}</tbody></table></div></div>)}
      <p className="archive-scope">원문에 없는 점수 구간이나 조건은 추가하지 않았습니다. 학습지는 논술을 ‘500자 내외’로 안내하지만, 채점표의 글의 완결성은 ‘400자 이상 10점 / 300자 이상 5점’으로 기재되어 있습니다. 실제 적용 전 안내와 기준의 일치 여부를 확인해야 합니다. 미참여·미제출 및 학적 변동 관련 처리는 이 표에 포함하지 않았습니다.</p>
    </section>}
    <section><h2>학습지와 수업자료</h2><p>선생님이 첨부할 원본 학습지는 개인정보와 공개 범위를 확인한 뒤 이 기록에 연결합니다. 현재 이 게시글에는 새로 만든 대체 학습지를 첨부하지 않았습니다.</p></section>
    <section className="archive-provenance"><h2>정리 근거와 확인 범위</h2><p>{project.source}</p><p>{project.evidence}</p><p>{project.notes}</p></section>
  </article>;
}
