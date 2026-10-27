import Link from 'next/link';
import { ArrowRight, ArrowUpRight, AudioLines, BookOpen, FileText, FolderOpen, Layers, NotebookPen, Shapes, Shuffle, Timer } from 'lucide-react';
import { FolderCard } from '@/components/folder-card';
import { getResources, getProjects } from '@/lib/catalog';
import { classroomTools } from '@/lib/tools';

export const revalidate = 60;
const toolIcons = [Layers, AudioLines, Timer, Shuffle];

export default async function Home() {
  const [resources, projects] = await Promise.all([getResources(), getProjects()]);
  return (
    <div className="page home-page">
      <header className="workspace-heading">
        <div>
          <p className="workspace-caption">혜진 선생님의 중국어 교실</p>
          <h1>중국어 수업, 한곳에.</h1>
          <p>배울 자료를 찾고, 수업 도구를 꺼내고, 함께 만들어 보세요.</p>
        </div>
        <Link href="/resources" className="button primary">학습 자료 찾기 <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </header>

      <section className="workspace-folders" aria-labelledby="folders-heading">
        <div className="section-heading"><h2 id="folders-heading">수업 폴더</h2><span className="section-hint">필요한 공간을 바로 열어 보세요</span></div>
        <div className="home-folder-grid">
          <FolderCard href="/resources" title="학습 자료" description="발음 · 회화 · 어휘 · 한자 · 문화" meta={`${resources.length}개 자료`} icon={<BookOpen size={25} strokeWidth={1.6} />} />
          <FolderCard href="/tools" title="수업 도구" description="카드부터 타이머까지, 수업의 도구함" meta={`${classroomTools.length}개 도구`} icon={<Shapes size={25} strokeWidth={1.6} />} />
          <FolderCard href="/projects" title="프로젝트" description="친구들과 함께 만드는 중국어 활동" meta={`${projects.length}개 활동`} icon={<FolderOpen size={25} strokeWidth={1.6} />} />
          <FolderCard href="/notebook" title="나의 학습 노트" description="오늘 배운 표현과 아이디어를 기록해요" meta="개인 기록" icon={<NotebookPen size={25} strokeWidth={1.6} />} />
        </div>
      </section>

      <div className="home-content-grid">
        <section aria-labelledby="materials-heading">
          <div className="section-heading"><h2 id="materials-heading">학습 자료 둘러보기</h2><Link href="/resources">전체 보기 <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className="document-list">
            {resources.slice(0, 4).map(resource => (
              <Link href={`/resources/${resource.slug}`} className="document-row" key={resource.slug}>
                <span className="document-icon" aria-hidden="true"><FileText size={21} strokeWidth={1.5} /></span>
                <div className="document-copy"><h3>{resource.title}</h3><p>{resource.category} · {resource.level}</p></div>
                <span className="document-duration">{resource.minutes}분</span><ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
            {!resources.length && <p className="list-empty">새로운 학습 자료를 준비하고 있어요.</p>}
          </div>
        </section>
        <section aria-labelledby="tools-heading">
          <div className="section-heading"><h2 id="tools-heading">바로 쓰는 수업 도구</h2><Link href="/tools">전체 보기 <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className="shortcut-list">
            {classroomTools.map((tool, index) => {
              const Icon = toolIcons[index];
              return <Link href={`/tools/${tool.slug}`} className="shortcut-row" key={tool.slug}><span className="shortcut-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span><span>{tool.title}</span><ArrowUpRight size={16} aria-hidden="true" /></Link>;
            })}
          </div>
        </section>
      </div>

      {projects.length > 0 && <section className="home-projects" aria-labelledby="projects-heading">
        <div className="section-heading"><h2 id="projects-heading">함께 만드는 프로젝트</h2><Link href="/projects">전체 보기 <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="home-project-grid">{projects.slice(0, 3).map(project => <FolderCard key={project.slug} href={`/projects/${project.slug}`} title={project.title} description={project.description} meta={`${project.category} · ${project.duration}`} compact />)}</div>
      </section>}
    </div>
  );
}
