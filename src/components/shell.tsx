'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { BookOpen, House, Shapes, FolderOpen, Search, ArrowUpRight, Bookmark, X, NotebookPen, Sprout, ChevronRight } from 'lucide-react';
const links = [
  { href: '/', name: '교실 홈', icon: House },
  { href: '/resources', name: '학습 자료', icon: BookOpen },
  { href: '/tools', name: '수업 도구', icon: Shapes },
  { href: '/projects', name: '프로젝트', icon: FolderOpen },
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const info = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  return <div className="app-shell">
    <a href="#main" className="skip-link">본문 바로가기</a>
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="혜진의 중국어 교실 홈"><span className="brand-mark" lang="zh-CN">中<span>。</span></span><span><strong>혜진의 중국어 교실</strong><small>조금씩, 함께 배우는 중국어</small></span></Link>
      <div className="sidebar-label">우리의 배움 공간</div>
      <nav aria-label="주 메뉴">{links.map(({href,name,icon:Icon})=><Link key={href} href={href} className={`nav-item ${path === href || (href !== '/' && path.startsWith(href)) ? 'active' : ''}`} aria-current={path === href || (href !== '/' && path.startsWith(href)) ? 'page' : undefined}><Icon size={19}/><span>{name}</span>{(path === href || (href !== '/' && path.startsWith(href))) && <span className="nav-dot"/>}</Link>)}</nav>
      <div className="nav-separator"/>
      <Link href="/notebook" className={`nav-item ${path === '/notebook' ? 'active' : ''}`}><NotebookPen size={19}/><span>나의 학습 노트</span></Link>
      <Link href="/resources?saved=1" className="nav-item"><Bookmark size={19}/><span>담아 둔 자료</span></Link>
      <div className="sidebar-bottom"><div className="class-note"><Sprout size={25} strokeWidth={1.4}/><p>틀려도 괜찮아요.<br/>한마디씩, 함께 해요.</p><span lang="zh-CN">慢慢来，我们一起。</span></div><button className="teacher-profile" onClick={()=>info.current?.showModal()}><span className="avatar">혜</span><span><strong>혜진 선생님의 교실</strong><small>교실 이야기</small></span><ChevronRight size={16}/></button></div>
    </aside>
    <div className="main-column"><header className="topbar"><div className="breadcrumb">우리의 배움 공간 <ChevronRight size={13}/><span>{links.find(l=>l.href === path || (l.href !== '/' && path.startsWith(l.href)))?.name ?? '나의 학습 노트'}</span></div><form className="search-box" action="/resources" onSubmit={e=>{e.preventDefault();router.push(`/resources?q=${encodeURIComponent(query.trim())}`);}}><Search size={17}/><input aria-label="학습 자료 검색" name="q" placeholder="어떤 것을 배워 볼까요?" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit" aria-label="검색"><ChevronRight size={16}/></button></form><Link href="/notebook" className="top-note"><NotebookPen size={17}/><span>나의 노트</span></Link></header>
    <main id="main" tabIndex={-1}>{children}</main><footer className="site-footer"><span>혜진의 중국어 교실</span><span>배움이 쌓이는 우리만의 공간 <span lang="zh-CN">学无止境</span></span></footer></div>
    <nav className="mobile-nav" aria-label="모바일 주 메뉴">{links.map(({href,name,icon:Icon})=><Link key={href} href={href} className={path === href || (href !== '/' && path.startsWith(href)) ? 'active' : ''}><Icon size={20}/><span>{name}</span></Link>)}</nav>
    <dialog ref={info} className="modal" onClick={e=>{if(e.target===e.currentTarget) info.current?.close();}}><button aria-label="닫기" className="close-button" onClick={()=>info.current?.close()}><X/></button><div className="modal-symbol" lang="zh-CN">一起</div><p className="eyebrow">우리 교실에 오신 것을 환영해요</p><h2>조금씩 배우고,<br/>함께 넓어지는 세상.</h2><p>중국어 한마디로 새로운 세상을 만나는 공간입니다. 자료를 읽고, 수업 도구로 연습하고, 친구들과 프로젝트에 도전해 보세요.</p><p className="muted">처음 준비된 자료는 입문 학습 예시입니다. 혜진 선생님의 수업에 맞추어 이 공간을 차근차근 채워 나갑니다.</p><Link className="button primary" href="/resources" onClick={()=>info.current?.close()}>자료 둘러보기 <ArrowUpRight size={17}/></Link></dialog>
  </div>;
}
