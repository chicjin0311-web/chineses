import Link from 'next/link';
import { ArrowUpRight, Layers, AudioLines, Timer, Shuffle, Mic } from 'lucide-react';
import { classroomTools } from '@/lib/tools';
export const metadata={title:'수업 도구'};
const icons=[Mic,Layers,AudioLines,Timer,Shuffle];
export default function Tools(){return <div className="page"><div className="page-intro"><p className="eyebrow">배움에 재미를 더하는</p><h1>우리 수업의 작은 도구함.</h1><p>혼자 연습할 때도, 친구들과 함께할 때도. 필요한 도구를 꺼내 보세요.</p></div><div className="tool-grid">{classroomTools.map((t,i)=>{const Icon=icons[i];return <Link href={`/tools/${t.slug}`} className="tool-card" key={t.slug}><span className={`tool-icon ${t.color}`}><Icon/></span><div><h2>{t.title}</h2><p>{t.description}</p></div><ArrowUpRight size={21}/></Link>;})}</div></div>;}
