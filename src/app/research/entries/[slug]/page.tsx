import {notFound} from 'next/navigation';
import {publishedArchiveDocument} from '@/lib/archive-persistence';
import {ArchiveDocumentView} from '@/components/archive-document';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const d=await publishedArchiveDocument(slug);return {title:d?.title??'수업 기록',description:d?.summary};}
export default async function Entry({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const d=await publishedArchiveDocument(slug);if(!d)notFound();return <ArchiveDocumentView document={d}/>;}
