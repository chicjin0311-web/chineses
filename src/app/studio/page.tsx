import {redirect} from 'next/navigation';
import {getEditorSession} from '@/lib/supabase-server';
import {editableArchiveDocuments} from '@/lib/archive-editing';
import {ArchiveStudio,type StudioRecord} from '@/components/archive-studio';
import {studioPath} from '@/lib/studio-path';
import '@/components/archive-records.css';
export const metadata={title:'수업 기록 작업실',robots:{index:false,follow:false}};
export default async function Studio({searchParams}:{searchParams:Promise<{slug?:string}>}){
 const params=await searchParams;
 const session=await getEditorSession();if(!session.user)redirect(`/login?next=${encodeURIComponent(studioPath(params.slug?`/studio?slug=${params.slug}`:null))}`);
 if(!session.isEditor)return <div className="page"><h1>선생님 전용 작업실</h1><p>등록된 작성 권한이 필요합니다.</p></div>;
 const {data,error}=await session.db.from('archive_documents').select('slug,revision,document,updated_at');
 if(error)throw new Error('저장한 글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
 const entries=new Map<string,StudioRecord>(editableArchiveDocuments().map(document=>[document.slug,{document,updatedAt:null,published:true}]));
 for(const row of (data??[]).filter(r=>r.revision==='published'))entries.set(row.slug,{document:row.document,updatedAt:null,published:true});
 for(const row of (data??[]).filter(r=>r.revision==='draft'))entries.set(row.slug,{document:row.document,updatedAt:row.updated_at,published:entries.get(row.slug)?.published??false});
 return <ArchiveStudio records={[...entries.values()]} initialSlug={params.slug}/>;
}
