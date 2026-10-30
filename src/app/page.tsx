import Link from 'next/link';
import { ArrowRight, ArrowUpRight, AudioLines, BookOpen, BookMarked, FileText, FolderOpen, Globe2, Layers, LibraryBig, NotebookPen, Shuffle, Timer } from 'lucide-react';
import { FolderCard } from '@/components/folder-card';
import { getResources } from '@/lib/catalog';
import { classroomTools } from '@/lib/tools';
import { homeFolders, site } from '@/lib/site';
import './lessons/classics/style.css';

export const revalidate = 60;
const toolIcons = [Layers, AudioLines, Timer, Shuffle];
const folderIcons = { lessons: BookOpen, activities: FolderOpen, exchange: Globe2, reading: BookMarked, diary: NotebookPen, research: LibraryBig };

export default async function Home() {
  const resources = await getResources();
  return (
    <div className="page home-page">
      <header className="workspace-heading">
        <div>
          <p className="workspace-caption">{site.name}</p>
          <h1>수업도, 기록도. 차곡차곡.</h1>
          <p>함께 배운 시간과 일상의 생각을 모아, 다음 수업으로 이어 갑니다.</p>
        </div>
        <Link href="/write" className="button primary">새 초안 쓰기 <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </header>

      <section className="workspace-folders" aria-labelledby="folders-heading">
        <div className="section-heading"><h2 id="folders-heading">배움과 기록의 폴더</h2><span className="section-hint">차곡차곡 쌓아 가는 여섯 공간</span></div>
        <div className="home-folder-grid">
          {homeFolders.map(folder => { const Icon = folderIcons[folder.icon]; return <FolderCard key={folder.href} {...folder} icon={<Icon size={25} strokeWidth={1.6} />} />; })}
        </div>
      </section>

      <Link href="/lessons/classics" className="classic-home-link"><div><strong>고전 한 문장 · 채근담</strong><p>토끼와 고슴도치의 이야기로 배우는 ‘한 걸음 양보하기’</p></div><ArrowRight size={20} aria-hidden="true" /></Link>
      <div className="home-content-grid">
        <section aria-labelledby="materials-heading">
          <div className="section-heading"><h2 id="materials-heading">수업 자료 둘러보기</h2><Link href="/lessons">언어 · 문화 <ArrowRight size={15} aria-hidden="true" /></Link></div>
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

      <Link href="/research" className="research-strip"><LibraryBig size={25} strokeWidth={1.5} aria-hidden="true" /><div><h2>지난 수업에서, 다음 수업으로.</h2><p>기존 자료 정리 <span aria-hidden="true">→</span> 수업 성찰 <span aria-hidden="true">→</span> 새 수업안</p></div><ArrowUpRight size={20} aria-hidden="true" /></Link>
    </div>
  );
}
