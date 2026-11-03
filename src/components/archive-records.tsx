import { ArchiveLibrary } from './archive-library';
import { staticArchiveDocuments } from '@/lib/archive-catalog';
import { publishedArchiveDocuments } from '@/lib/archive-persistence';
import './archive-records.css';
export async function ArchiveRecords() { const entries=new Map(staticArchiveDocuments().map(d=>[d.slug,d]));for(const d of await publishedArchiveDocuments())entries.set(d.slug,d);return <ArchiveLibrary documents={[...entries.values()]} />; }
