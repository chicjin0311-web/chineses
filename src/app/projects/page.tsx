import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '@/lib/catalog';
export const metadata={title:'함께 만드는 프로젝트'};
export const revalidate=60;
export default async function Projects(){const projects=await getProjects();return <div className="page"><div className="page-intro"><p className="eyebrow">함께라서 더 재미있는</p><h1>우리의 중국어, 우리의 이야기.</h1><p>배운 표현을 써 보고, 새로운 것을 만들어요. 우리 반 프로젝트를 시작할 작은 아이디어들입니다.</p></div><div className="project-grid">{projects.map(p=><Link className="project-card" href={`/projects/${p.slug}`} key={p.slug}><div className={`project-card-art ${p.color}`}><span lang="zh-CN">{p.symbol}</span></div><div className="resource-body"><span className="eyebrow">{p.category}</span><h2>{p.title}</h2><p>{p.description}</p><div className="resource-body-bottom"><span>{p.duration} · 활동 가이드</span><ArrowUpRight size={18}/></div></div></Link>)}</div></div>;}
