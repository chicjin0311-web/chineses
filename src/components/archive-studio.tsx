'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {archiveKinds,type ArchiveDocument} from '@/lib/archive-catalog';
import {ArchiveBody} from './archive-document';
import {getBrowserSupabase} from '@/lib/supabase-browser';
export type StudioRecord={document:ArchiveDocument;updatedAt:string|null;published:boolean};
export function ArchiveStudio({records,initialSlug}:{records:StudioRecord[];initialSlug?:string}){
 const [items,setItems]=useState(records),[current,setCurrent]=useState(records.find(r=>r.document.slug===initialSlug)??records[0]);
 const [dirty,setDirty]=useState(false),[preview,setPreview]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const d=current.document;
 useEffect(()=>{const stop=(event:BeforeUnloadEvent)=>{if(dirty){event.preventDefault();event.returnValue='';}};window.addEventListener('beforeunload',stop);return()=>window.removeEventListener('beforeunload',stop);},[dirty]);
 function edit<K extends keyof ArchiveDocument>(key:K,value:ArchiveDocument[K]){setCurrent(c=>({...c,document:{...c.document,[key]:value}}));setDirty(true);setMessage('');}
 function change(slug:string){if(dirty&&!window.confirm('저장하지 않은 내용이 있습니다. 다른 글로 이동할까요?'))return;const next=items.find(r=>r.document.slug===slug);if(next)setCurrent(next);setDirty(false);setPreview(false);setMessage('');}
 function create(){if(dirty&&!window.confirm('저장하지 않은 내용이 있습니다. 새 글을 시작할까요?'))return;const slug=`lesson-${crypto.randomUUID()}`;const next:StudioRecord={document:{slug,title:'',summary:'',subject:'',target:'',year:'',semester:'',lessonDate:'',kind:'차시·주제 수업',tags:[],body:'',href:`/research/entries/${slug}`,attachment:''},updatedAt:null,published:false};setItems(i=>[next,...i]);setCurrent(next);setDirty(false);setPreview(false);setMessage('');}
 async function save(publish:boolean){setBusy(true);setMessage('');try{
 const response=await fetch('/api/archive-editor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({document:d,expectedUpdatedAt:current.updatedAt,publish})});
 const result=await response.json();if(!response.ok)throw new Error(result.error??'저장하지 못했습니다.');
 const next={document:result.document as ArchiveDocument,updatedAt:result.updatedAt as string,published:publish||current.published};setCurrent(next);setItems(i=>i.map(r=>r.document.slug===d.slug?next:r));setDirty(false);setMessage(publish?'공개 게시했습니다. 아래 링크에서 확인할 수 있습니다.':'임시저장했습니다. 공개된 글은 바뀌지 않습니다.');
 }catch(error){setMessage(error instanceof Error?error.message:'저장하지 못했습니다. 입력 내용을 복사해 보관해 주세요.');}finally{setBusy(false);}}
 async function logout(){if(dirty&&!window.confirm('저장하지 않은 내용이 있습니다. 로그아웃할까요?'))return;await getBrowserSupabase().auth.signOut();window.location.assign('/login');}
 return <div className="page archive-studio"><header className="page-intro"><p className="eyebrow">선생님 전용</p><h1>수업 기록 작업실</h1><p>수업 글을 쓰고, 미리 본 뒤 공개합니다.</p></header>
 <div className="studio-actions"><Link className="button soft" href="/research/archive">자료 목록</Link><button className="button soft" onClick={logout} disabled={busy}>로그아웃</button></div>
 <div className="studio-picker"><label>수정할 글<select value={d.slug} onChange={e=>change(e.target.value)} disabled={busy}>{items.map(r=><option key={r.document.slug} value={r.document.slug}>{r.document.title||'새 글'}{r.updatedAt?' · 저장본':''}</option>)}</select></label><button className="button primary" onClick={create} disabled={busy}>새 글 쓰기</button></div>
 <p className="archive-scope">{current.published?'공개 글이 있습니다. 임시저장은 비공개로 보관하고, 공개 게시를 누르면 반영됩니다.':'아직 공개되지 않은 글입니다.'} {current.updatedAt&&`마지막 저장: ${new Date(current.updatedAt).toLocaleString('ko-KR')}`}</p>
 <div className="studio-actions"><button className="button soft" aria-pressed={!preview} onClick={()=>setPreview(false)}>내용 편집</button><button className="button soft" aria-pressed={preview} onClick={()=>setPreview(true)}>미리보기</button></div>
 {!preview?<div className="studio-form"><label>제목<input value={d.title} maxLength={160} onChange={e=>edit('title',e.target.value)} disabled={busy}/></label><label>짧은 소개<textarea rows={3} maxLength={600} value={d.summary} onChange={e=>edit('summary',e.target.value)} disabled={busy}/></label>
 <div className="studio-fields"><label>교과<input value={d.subject} maxLength={120} onChange={e=>edit('subject',e.target.value)} disabled={busy}/></label><label>대상<input value={d.target} maxLength={120} onChange={e=>edit('target',e.target.value)} disabled={busy}/></label><label>수업 유형<select value={d.kind} onChange={e=>edit('kind',e.target.value as ArchiveDocument['kind'])} disabled={busy}>{archiveKinds.map(k=><option key={k}>{k}</option>)}</select></label>
 <label>수업 연도<input inputMode="numeric" placeholder="미확인 시 빈칸" maxLength={4} value={d.year} onChange={e=>{edit('year',e.target.value);if(!e.target.value){edit('semester','');edit('lessonDate','');}}} disabled={busy}/></label><label>학기<select value={d.semester} onChange={e=>edit('semester',e.target.value)} disabled={busy||!d.year}><option value="">미확인</option><option value="1">1학기</option><option value="2">2학기</option></select></label><label>수업일 (선택)<input type="date" value={d.lessonDate} onChange={e=>{edit('lessonDate',e.target.value);if(e.target.value)edit('year',e.target.value.slice(0,4));}} disabled={busy}/></label></div>
 <label>분야 (쉼표로 구분)<input defaultValue={d.tags.join(', ')} key={d.slug} onBlur={e=>edit('tags',e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} disabled={busy}/></label>
 <label>본문<textarea className="studio-body-input" rows={24} value={d.body} onChange={e=>edit('body',e.target.value)} disabled={busy}/></label><p className="expression-origin">소제목은 ## 제목, 목록은 - 항목으로 입력합니다. 문단은 빈 줄로 구분합니다. 기존 글의 핵심표현·성취기준·채점표도 함께 불러옵니다.</p></div>:<article className="archive-detail studio-preview"><p className="eyebrow">미리보기 · {d.kind}</p><h2>{d.title||'제목 없음'}</h2><p>{d.summary}</p><p>{d.subject} · {d.target}</p><ArchiveBody body={d.body}/>{d.attachment&&<p>기존 PDF 첨부가 유지됩니다.</p>}</article>}
 <div className="studio-save"><p>공개 전에 이름·학생 식별정보·사진·연락처와 자료의 출처·공유 권한을 확인해 주세요. 파일 첨부 기능은 아직 제공하지 않습니다.</p><div className="studio-actions"><button className="button soft" disabled={busy||!d.title.trim()||!d.body.trim()} onClick={()=>save(false)}>{busy?'저장 중…':'임시저장'}</button>{preview?<button className="button primary" disabled={busy||!d.title.trim()||!d.body.trim()} onClick={()=>save(true)}>공개 게시</button>:<button className="button primary" onClick={()=>setPreview(true)}>미리보기로 확인</button>}</div><p role="status" aria-live="polite">{message}{dirty?' · 저장하지 않은 변경사항이 있습니다.':''}</p>{current.published&&<Link className="back-link" href={d.href} target="_blank" rel="noopener">공개 글 확인 ↗</Link>}</div>
 </div>;
}
