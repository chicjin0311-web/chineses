'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { BookOpen, BookMarked, House, Shapes, FolderOpen, Search, ArrowUpRight, Bookmark, X, NotebookPen, ChevronRight, Globe2, LibraryBig, Menu, FilePenLine } from 'lucide-react';
import { site, classroomSections } from '@/lib/site';

const links = [
  { href: '/', name: '전체 폴더', icon: House },
  { href: '/lessons', name: '중국어 수업', icon: BookOpen },
  { href: '/activities', name: '학생 활동', icon: FolderOpen },
  { href: '/exchange', name: '국제교류', icon: Globe2 },
  { href: '/bilingual', name: '이중언어교육', icon: BookOpen },
  { href: '/reading', name: '독서록', icon: BookMarked },
  { href: '/diary', name: '일기', icon: NotebookPen },
  { href: '/research', name: '수업 연구 노트', icon: LibraryBig },
];
const utilities = [
  { href: '/write', name: '나의 초안', icon: FilePenLine },
  { href: '/tools', name: '수업 도구', icon: Shapes },
  { href: '/notebook', name: '학습 메모', icon: NotebookPen },
  { href: '/resources?saved=1', name: '담아 둔 자료', icon: Bookmark },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const info = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const active = (href: string) => path === href || (href !== '/' && path.startsWith(`${href}/`)) || (href === '/lessons' && path.startsWith('/resources')) || (href === '/activities' && path.startsWith('/projects'));
  const currentTitle = classroomSections.find(item => `/${item.path}` === path)?.title ?? [...links, ...utilities].find(item => active(item.href))?.name ?? '중국어 교실';
  const moreActive = !links.slice(0, 4).some(item => active(item.href));

  return <div className="app-shell">
    <a href="#main" className="skip-link">본문 바로가기</a>
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label={`${site.name} 홈`}><span className="brand-mark" lang="zh-CN">中<span>。</span></span><span><strong>차곡차곡</strong><small>중국어 교실 · 배움의 기록</small></span></Link>
      <div className="sidebar-label">배움과 기록</div>
      <nav aria-label="주 메뉴">{links.map(({ href, name, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${active(href) ? 'active' : ''}`} aria-current={active(href) ? 'page' : undefined}><Icon size={18} aria-hidden="true" /><span>{name}</span>{active(href) && <span className="nav-dot" />}</Link>)}</nav>
      <div className="nav-separator" />
      <nav aria-label="수업과 기록 도구">{utilities.map(({ href, name, icon: Icon }) => <Link key={href} href={href} className={`nav-item utility-item ${path === href ? 'active' : ''}`} aria-current={path === href ? 'page' : undefined}><Icon size={17} aria-hidden="true" /><span>{name}</span></Link>)}</nav>
      <div className="sidebar-bottom"><button className="teacher-profile" onClick={() => info.current?.showModal()} aria-haspopup="dialog"><span className="avatar" lang="zh-CN">中</span><span><strong>차곡차곡의 이야기</strong><small>배움이 쌓이는 공간</small></span><ChevronRight size={16} aria-hidden="true" /></button></div>
    </aside>
    <div className="main-column">
      <header className="topbar"><div className="breadcrumb">차곡차곡 <ChevronRight size={13} aria-hidden="true" /><span>{currentTitle}</span></div><form className="search-box" action="/resources" onSubmit={event => { event.preventDefault(); router.push(`/resources?q=${encodeURIComponent(query.trim())}`); }}><Search size={17} aria-hidden="true" /><input aria-label="수업 자료 검색" name="q" placeholder="수업 자료 검색" value={query} onChange={event => setQuery(event.target.value)} /><button type="submit" aria-label="검색"><ChevronRight size={16} aria-hidden="true" /></button></form><Link href="/write" className="top-note" aria-label="나의 초안 열기"><FilePenLine size={17} aria-hidden="true" /><span>나의 초안</span></Link></header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer"><span>{site.name}</span><span>수업과 일상을 차곡차곡 <span lang="zh-CN">学无止境</span></span></footer>
    </div>
    <nav className="mobile-nav" aria-label="모바일 주 메뉴">{links.slice(0, 4).map(({ href, name, icon: Icon }) => <Link key={href} href={href} className={active(href) ? 'active' : ''} aria-current={active(href) ? 'page' : undefined}><Icon size={20} aria-hidden="true" /><span>{name}</span></Link>)}<button className={moreActive ? 'active' : ''} onClick={() => menu.current?.showModal()} aria-haspopup="dialog"><Menu size={20} aria-hidden="true" /><span>전체 메뉴</span></button></nav>
    <dialog ref={menu} className="modal menu-modal" aria-labelledby="menu-title" onClick={event => { if (event.target === event.currentTarget) menu.current?.close(); }}><button aria-label="메뉴 닫기" className="close-button" onClick={() => menu.current?.close()}><X /></button><h2 id="menu-title">배움과 기록</h2><nav aria-label="전체 메뉴">{[...links, ...utilities].map(({ href, name, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${active(href) ? 'active' : ''}`} onClick={() => menu.current?.close()}><Icon size={18} aria-hidden="true" />{name}</Link>)}</nav></dialog>
    <dialog ref={info} className="modal" aria-labelledby="about-title" onClick={event => { if (event.target === event.currentTarget) info.current?.close(); }}><button aria-label="닫기" className="close-button" onClick={() => info.current?.close()}><X /></button><div className="modal-symbol" lang="zh-CN">一起</div><p className="eyebrow">{site.name}</p><h2 id="about-title">배우고, 돌아보고,<br />다음 수업을 그려요.</h2><p>언어와 문화를 배우는 수업, 학생들과 함께한 활동, 국경을 넘어 나눈 만남을 모읍니다. 책과 일상에서 얻은 생각도 이곳에 차곡차곡 남겨 갑니다.</p><p className="muted">현재 수업 자료와 프로젝트는 입문 학습 예시입니다. 실제 수업과 교류의 기록으로 조금씩 채워 갈 공간이에요.</p><Link className="button primary" href="/research" onClick={() => info.current?.close()}>수업 연구 노트 열기 <ArrowUpRight size={17} aria-hidden="true" /></Link></dialog>
  </div>;
}
