import { publicPostClient } from './published-posts';
import type { ArchiveDocument } from './archive-catalog';
export async function publishedArchiveDocuments():Promise<ArchiveDocument[]> {
 const {data,error}=await publicPostClient().from('archive_documents').select('slug,document,updated_at').eq('revision','published');
 if(error) throw new Error('수업 기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
 return (data??[]).map(row=>({...row.document,slug:row.slug,updatedAt:row.updated_at} as ArchiveDocument));
}
export async function publishedArchiveDocument(slug:string){
 const {data,error}=await publicPostClient().from('archive_documents').select('slug,document,updated_at').eq('revision','published').eq('slug',slug).maybeSingle();
 if(error)throw new Error('수업 기록을 불러오지 못했습니다.');
 return data?{...data.document,slug:data.slug,updatedAt:data.updated_at} as ArchiveDocument:null;
}
