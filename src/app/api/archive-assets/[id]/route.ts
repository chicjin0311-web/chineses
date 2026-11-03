import {getServerSupabase} from '@/lib/supabase-server';
import {validAssetId} from '@/lib/archive-assets';
export const dynamic='force-dynamic';
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const missing=()=>Response.json({error:'파일을 찾을 수 없거나 공개되지 않았습니다.'},{status:404,headers:{'Cache-Control':'private, no-store'}});
 const {id}=await params;if(!validAssetId(id))return missing();
 const db=await getServerSupabase();const {data,error}=await db.from('archive_assets').select('download_path,preview_paths,kind').eq('id',id).maybeSingle();if(error||!data)return missing();
 const page=new URL(request.url).searchParams.get('page');let path=data.download_path;
 if(page!==null){if(!/^[1-9]\d?$/.test(page)||!data.preview_paths[Number(page)-1])return missing();path=data.preview_paths[Number(page)-1];}
 const {data:signed,error:signError}=await db.storage.from('archive-files').createSignedUrl(path,30,page?undefined:{download:data.kind==='worksheet'?'worksheet.pdf':'slides.pptx'});
 if(signError||!signed)return missing();
 return new Response(null,{status:303,headers:{Location:signed.signedUrl,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex'}});
}
