'use client';
import {useState} from 'react';
import Link from 'next/link';
import {archiveKinds,archiveTimeLabel,type ArchiveDocument} from '@/lib/archive-catalog';
export function ArchiveLibrary({documents}:{documents:ArchiveDocument[]}){
 const [query,setQuery]=useState(''),[kind,setKind]=useState(''),[field,setField]=useState(''),[year,setYear]=useState(''),[semester,setSemester]=useState(''),[sort,setSort]=useState('recent');
 const fields=[...new Set(documents.flatMap(d=>d.tags))].sort((a,b)=>a.localeCompare(b,'ko')),years=[...new Set(documents.map(d=>d.year).filter(Boolean))].sort().reverse(),term=query.trim().toLowerCase();
 const filtered=documents.filter(d=>(!kind||d.kind===kind)&&(!field||d.tags.includes(field))&&(!year||(year==='unknown'?!d.year:d.year===year))&&(!semester||d.semester===semester)&&(!term||[d.title,d.summary,d.subject,d.target,...d.tags].join(' ').toLowerCase().includes(term))).sort((a,b)=>{
  if(sort==='title')return a.title.localeCompare(b.title,'ko');if(sort==='updated')return (b.updatedAt??'').localeCompare(a.updatedAt??'')||a.title.localeCompare(b.title,'ko');
  if(!a.year||!b.year)return Number(!a.year)-Number(!b.year)||a.title.localeCompare(b.title,'ko');const ta=`${a.year}${a.semester||'0'}${a.lessonDate}`,tb=`${b.year}${b.semester||'0'}${b.lessonDate}`;return (sort==='oldest'?ta.localeCompare(tb):tb.localeCompare(ta))||a.title.localeCompare(b.title,'ko');});
 function reset(){setQuery('');setKind('');setField('');setYear('');setSemester('');setSort('recent');}
 return <section className="archive-records" aria-labelledby="archive-library-title"><div className="section-heading"><h2 id="archive-library-title">수업 자료 찾기</h2><Link className="button soft" href="/studio">글 작성·수정</Link></div>
 <div className="archive-kind-tabs" aria-label="수업 유형">{['',...archiveKinds].map(k=><button key={k} aria-pressed={kind===k} onClick={()=>setKind(k)}>{k||'전체'} <span>{documents.filter(d=>!k||d.kind===k).length}</span></button>)}</div>
 <div className="archive-filters"><label>수업 찾기<input type="search" placeholder="제목, 핵심어, 교과, 대상" value={query} onChange={e=>setQuery(e.target.value)}/></label>
 <label>분야<select value={field} onChange={e=>setField(e.target.value)}><option value="">모든 분야</option>{fields.map(f=><option key={f}>{f}</option>)}</select></label>
 <label>수업 연도<select value={year} onChange={e=>{setYear(e.target.value);if(e.target.value==='unknown')setSemester('');}}><option value="">모든 연도</option>{years.map(y=><option key={y} value={y}>{y}년</option>)}<option value="unknown">시기 확인 중</option></select></label>
 <label>학기<select value={semester} disabled={year==='unknown'} onChange={e=>setSemester(e.target.value)}><option value="">모든 학기</option><option value="1">1학기</option><option value="2">2학기</option></select></label>
 <label>정렬<select value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">최근 수업 시기순</option><option value="oldest">오래된 수업 시기순</option><option value="title">제목순</option><option value="updated">최근 수정순</option></select></label></div>
 <div className="archive-filter-results"><p role="status">{filtered.length}개의 수업·자료</p><button className="button soft" onClick={reset}>필터 초기화</button></div><p className="expression-origin">날짜는 확인된 경우만 표시합니다. 학기까지만 확인된 자료는 학기로 정렬하며, 수업 시기 미확인 자료는 시기 정렬의 마지막에 표시합니다.</p>
 <div className="project-record-grid">{filtered.map(d=><article className="archive-card" key={d.slug}><span className="archive-label">{d.kind} · {archiveTimeLabel(d)}</span><h3><Link href={d.href}>{d.title}</Link></h3><p className="archive-label">{d.subject} · {d.target}</p><p>{d.summary}</p><p className="archive-tags">{d.tags.map(t=><span key={t}>{t}</span>)}</p>{d.kind==='공유용 참고자료'&&<p className="expression-origin">AI 재구성 참고 자료 · 선생님의 원본 학습지 아님</p>}<Link className="button soft" href={d.href}>수업 내용 보기</Link></article>)}</div>{!filtered.length&&<p>조건에 맞는 수업이 없습니다. 필터를 바꾸거나 초기화해 주세요.</p>}</section>;
}
