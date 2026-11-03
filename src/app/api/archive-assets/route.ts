import {getServerSupabase} from '@/lib/supabase-server';
import {ApiError,apiError,privateJson,readJson,requireEditor} from '@/lib/api-auth';
import {validAssetId} from '@/lib/archive-assets';
export async function GET(request:Request){try{
 const ids=(new URL(request.url).searchParams.get('ids')??'').split(',').filter(Boolean);
 if(ids.length>30||ids.some(id=>!validAssetId(id)))throw new ApiError('첨부 목록을 확인해 주세요.');
 if(!ids.length)return privateJson({assets:[]});
 const db=await getServerSupabase();const {data,error}=await db.from('archive_assets').select('id,slug,kind,label,preview_paths,size_bytes').in('id',ids);
 if(error)throw error;
 return privateJson({assets:(data??[]).sort((a,b)=>ids.indexOf(a.id)-ids.indexOf(b.id)).map(a=>({id:a.id,slug:a.slug,kind:a.kind,label:a.label,pages:a.preview_paths.length,size:a.size_bytes}))});
 }catch(error){return apiError(error);}}
export async function POST(request:Request){try{
 const {db}=await requireEditor(request);const input=await readJson(request);
 if(!input||typeof input.slug!=='string'||!/^[a-z0-9][a-z0-9-]{0,99}$/.test(input.slug)||!['worksheet','ppt'].includes(input.kind)||typeof input.label!=='string'||!input.label.trim()||input.label.length>120||!Number.isInteger(input.size)||input.size<1||input.size>20971520||!Number.isInteger(input.pages)||input.pages<0||input.pages>30||(input.kind==='worksheet'?input.pages===0:input.pages!==0)||input.reviewed!==true)throw new ApiError('자료 종류·크기·공개 전 확인 항목을 확인해 주세요.');
 const id=crypto.randomUUID(),prefix=`${input.slug}/${id}`;
 const row={id,slug:input.slug,kind:input.kind,label:input.label.trim(),download_path:`${prefix}/${input.kind==='worksheet'?'worksheet.pdf':'slides.pptx'}`,preview_paths:Array.from({length:input.pages},(_,i)=>`${prefix}/page-${i+1}.jpg`),size_bytes:input.size};
 const {error}=await db.from('archive_assets').insert(row);if(error)throw error;
 return privateJson({asset:{id,slug:row.slug,kind:row.kind,label:row.label,pages:input.pages,size:row.size_bytes},downloadPath:row.download_path,previewPaths:row.preview_paths});
 }catch(error){return apiError(error);}}
