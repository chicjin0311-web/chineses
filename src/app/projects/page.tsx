import { FolderCard } from '@/components/folder-card';
import { getProjects } from '@/lib/catalog';

export const metadata = { title: '함께 만드는 프로젝트' };
export const revalidate = 60;

export default async function Projects() {
  const projects = await getProjects();
  return <div className="page">
    <div className="page-intro"><p className="eyebrow">함께 만드는 중국어 활동</p><h1>프로젝트 폴더</h1><p>마음에 드는 폴더를 열고, 활동 안내와 함께 시작해 보세요.</p></div>
    <div className="project-folder-grid">{projects.map(project => <FolderCard key={project.slug} href={`/projects/${project.slug}`} title={project.title} description={project.description} meta={`${project.category} · ${project.duration}`} heading="h2" />)}</div>
    {!projects.length && <div className="empty-state"><h2>새로운 프로젝트를 준비하고 있어요.</h2><p>곧 함께 만들 활동을 이곳에서 만날 수 있어요.</p></div>}
  </div>;
}
