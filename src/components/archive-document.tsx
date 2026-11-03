import Link from 'next/link';
import { archiveTimeLabel,type ArchiveDocument } from '@/lib/archive-catalog';
import './archive-records.css';
export function ArchiveBody({body}:{body:string}){
 const blocks=body.split(/\n\s*\n/).filter(Boolean);
 return <div className="archive-body">{blocks.map((block,index)=>{
  const lines=block.split('\n');
  if(lines.length===1&&/^#{1,3} /.test(block))return <h2 key={index} id={block.includes('서·논술형 채점기준표')?'rubrics':undefined}>{block.replace(/^#{1,3} /,'')}</h2>;
  if(lines.every(line=>/^[-*] /.test(line)))return <ul key={index}>{lines.map((line,i)=><li key={i}>{line.slice(2)}</li>)}</ul>;
  if(lines.length>1&&lines.every(line=>line.startsWith('|'))){const rows=lines.map(line=>line.split('|').slice(1,-1).map(c=>c.trim())).filter(row=>!row.every(c=>/^[-: ]+$/.test(c)));return <div className="rubric-scroll" key={index}><table className="rubric-table"><thead><tr>{rows[0]?.map((c,i)=><th key={i} scope="col">{c}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>;}
  return <p key={index} style={{whiteSpace:'pre-wrap'}}>{block}</p>;
 })}</div>;
}
export function ArchiveDocumentView({document:d}:{document:ArchiveDocument}){return <article className="page archive-detail"><Link className="back-link" href="/research/archive">← 기존 자료 정리</Link><header className="page-intro"><p className="eyebrow">{d.kind} · {archiveTimeLabel(d)}</p><h1>{d.title}</h1><p>{d.summary}</p><p className="archive-label">{d.subject} · {d.target}</p></header><Link className="button soft" href={`/studio?slug=${encodeURIComponent(d.slug)}`}>이 글 수정</Link><ArchiveBody body={d.body}/>{d.attachment&&<section><h2>연결된 자료</h2><a className="button soft" href={d.attachment} download>PDF 내려받기</a></section>}</article>;}
