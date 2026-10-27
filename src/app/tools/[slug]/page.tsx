import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { classroomTools } from '@/lib/tools';
import { getResources } from '@/lib/catalog';
import { Flashcards, FocusTimer, RandomPicker, Pronunciation } from '@/components/classroom-tools';
export const revalidate=60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:classroomTools.find(t=>t.slug===slug)?.title??'수업 도구'};}
export default async function ToolPage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{lesson?:string}>}){const [{slug},query]=await Promise.all([params,searchParams]);const tool=classroomTools.find(t=>t.slug===slug);if(!tool)notFound();return <div className="page"><Link className="back-link" href="/tools"><ArrowLeft size={15}/>수업 도구로 돌아가기</Link><div className="page-intro"><h1>{tool.title}</h1><p>{tool.description}</p></div>{slug==='flashcards'?<Flashcards resources={await getResources()} initialLesson={query.lesson}/>:slug==='timer'?<FocusTimer/>:slug==='random'?<RandomPicker/>:<Pronunciation/>}</div>;}
