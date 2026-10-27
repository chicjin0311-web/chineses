'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, SearchX } from 'lucide-react';
import type { Resource } from '@/lib/types';
import { useSaved } from './interactive';
export function ResourceLibrary({resources,query='',savedOnly=false}:{resources:Resource[];query?:string;savedOnly?:boolean}){
 const [category,setCategory]=useState('전체');const {saved}=useSaved();
 const filtered=resources.filter(r=>(category==='전체'||r.category===category)&&(!savedOnly||saved.includes(r.slug))&&(!query||`${r.title} ${r.description} ${r.symbol} ${r.category} ${r.lines.map(l=>`${l.chinese} ${l.pinyin} ${l.korean}`).join(' ')}`.toLowerCase().includes(query.toLowerCase())));
 return <>{query&&<p className="search-results">“{query}” 검색 결과 <Link href="/resources" className="text-button">검색 지우기</Link></p>}<div className="filters" aria-label="자료 분야">{['전체','회화','발음','어휘','한자','문화'].map(c=><button className={`filter-button ${c===category?'selected':''}`} key={c} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</button>)}<span className="filter-count">{filtered.length}개의 자료</span></div>{filtered.length?<div className="resource-grid">{filtered.map(r=><Link className="resource-card" key={r.slug} href={`/resources/${r.slug}`}><div className={`resource-art ${r.accent}`}><small>{r.category}</small><span lang="zh-CN">{r.symbol}</span></div><div className="resource-body"><h2>{r.title}</h2><p>{r.description}</p><div className="resource-body-bottom"><span>{r.level} · {r.minutes}분</span><ArrowUpRight size={18}/></div></div></Link>)}</div>:<div className="empty-state"><SearchX size={32}/><h2>{savedOnly?'아직 담아 둔 자료가 없어요':'찾는 자료가 아직 없어요'}</h2><p>{savedOnly?'자료를 열고 ‘자료 담기’를 눌러 보세요.':'다른 검색어 또는 분야로 다시 찾아보세요.'}</p><Link className="button primary" href="/resources">자료 전체 보기</Link></div>}</>;
}
