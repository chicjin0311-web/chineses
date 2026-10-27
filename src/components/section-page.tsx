import Link from 'next/link';
import { ArrowLeft, ArrowRight, FilePenLine, FolderOpen } from 'lucide-react';
import { FolderCard } from './folder-card';
import { ResourceLibrary } from './resource-library';
import { getProjects, getResources } from '@/lib/catalog';
import { writingCategories, type ClassroomSection } from '@/lib/site';

function EmptyRecords({ category, title }: { category: string; title: string }) {
  return <section className="record-empty" aria-label={`${title} 기록`}>
    <span className="record-empty-icon" aria-hidden="true"><FolderOpen size={28} strokeWidth={1.4} /></span>
    <div><h2>아직 공개된 기록이 없어요.</h2><p>이 폴더에 {title} 기록을 차곡차곡 모을 예정입니다.</p></div>
    <Link href={`/write?category=${category}`} className="button soft"><FilePenLine size={16} aria-hidden="true" />초안 쓰기</Link>
  </section>;
}

export async function SectionPage({ section }: { section: ClassroomSection }) {
  const category = writingCategories.find(item => item.id === section.category);
  const children = section.children?.map(id => writingCategories.find(item => item.id === id)!);
  const resources = section.kind === 'language' || section.kind === 'culture' ? (await getResources()).filter(item => (item.category === '문화') === (section.kind === 'culture')) : [];
  const projects = section.kind === 'activities' ? await getProjects() : [];
  const siblings = section.parent ? writingCategories.filter(item => item.href.startsWith(`${section.parent}/`)) : [];

  return <div className="page collection-page">
    <Link href={section.parent ?? '/'} className="back-link"><ArrowLeft size={15} aria-hidden="true" />{section.parent ? `${section.eyebrow}으로 돌아가기` : '전체 폴더로 돌아가기'}</Link>
    <header className="collection-heading">
      <div className="page-intro"><p className="eyebrow">{section.eyebrow}</p><h1>{section.title}</h1><p>{section.description}</p></div>
      {category && <Link className="button primary" href={`/write?category=${category.id}`}><FilePenLine size={17} aria-hidden="true" />초안 쓰기</Link>}
    </header>
    {siblings.length > 0 && <nav className="section-tabs" aria-label={`${section.eyebrow} 세부 폴더`}>{siblings.map(item => <Link key={item.id} href={item.href} aria-current={item.id === category?.id ? 'page' : undefined}>{item.title}</Link>)}</nav>}

    {children && <>
      <div className={`collection-grid ${children.length === 3 ? 'three' : ''}`}>{children.map((item, index) => <FolderCard key={item.id} href={item.href} title={item.title} description={item.description} meta={section.path === 'research' ? `0${index + 1}` : section.title} heading="h2" />)}</div>
      {section.path === 'research' && <aside className="research-note"><span className="research-note-mark" aria-hidden="true">↗</span><div><h2>한 번의 수업이 다음 수업의 시작이 되도록.</h2><p>기존 자료에서 남길 것을 찾고, 학생들의 반응을 돌아본 뒤, 새 수업안에 연결해 보세요. 각 폴더에 맞는 질문으로 초안을 시작할 수 있어요.</p></div></aside>}
      {section.path === 'exchange' && <p className="collection-footnote">교류를 준비하는 과정부터 만남 이후의 성찰까지, 진행한 방식에 맞는 폴더에 담아요.</p>}
    </>}

    {(section.kind === 'language' || section.kind === 'culture') && <>
      <p className="collection-footnote">현재 자료는 입문 수업 예시입니다. 실제 수업 자료를 이 분류에 맞춰 추가할 예정이에요.</p>
      <ResourceLibrary key={section.kind} resources={resources} categories={section.kind === 'language' ? ['전체', '회화', '발음', '어휘', '한자'] : ['전체', '문화']} />
    </>}

    {section.kind === 'activities' && <>
      <EmptyRecords category="activities" title="학생 활동" />
      <section className="activity-examples" aria-labelledby="examples-title">
        <div className="section-heading"><h2 id="examples-title">활동을 준비할 때 참고해요</h2><span className="section-hint">프로젝트 예시</span></div>
        <div className="project-folder-grid">{projects.map(project => <FolderCard key={project.slug} href={`/projects/${project.slug}`} title={project.title} description={project.description} meta={`${project.category} · ${project.duration}`} />)}</div>
      </section>
    </>}

    {section.kind === 'record' && category && <>
      <EmptyRecords category={category.id} title={category.title} />
      <section className="writing-guide" aria-labelledby="guide-title"><div><p className="eyebrow">기록의 시작</p><h2 id="guide-title">이런 내용을 담아 보세요.</h2></div><ol>{category.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ol></section>
      {section.parent === '/research' && <Link className="text-button research-back" href="/research">수업 연구의 전체 흐름 보기 <ArrowRight size={15} aria-hidden="true" /></Link>}
    </>}
  </div>;
}
