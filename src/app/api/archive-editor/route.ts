import {ApiError,apiError,privateJson,readJson,requireEditor} from '@/lib/api-auth';
import {archiveKinds,staticArchiveDocuments,type ArchiveDocument} from '@/lib/archive-catalog';
import {validAssetId} from '@/lib/archive-assets';

function validate(value:unknown):ArchiveDocument{
 if(!value||typeof value!=='object')throw new ApiError('글 내용을 확인해 주세요.');
 const v=value as Record<string,unknown>;
 function str(key:string,max:number,required=false){const s=v[key];if(typeof s!=='string'||s.length>max||(required&&!s.trim()))throw new ApiError(`${key} 입력을 확인해 주세요.`);return s.trim();}
 const slug=str('slug',100,true);
 if(!/^[a-z0-9][a-z0-9-]{0,99}$/.test(slug))throw new ApiError('글 주소를 확인해 주세요.');
 const base=staticArchiveDocuments().find(d=>d.slug===slug);
 if(!base&&!/^lesson-[0-9a-f-]{36}$/.test(slug))throw new ApiError('새 글은 새 글 쓰기에서 시작해 주세요.');
 const kind=str('kind',30);if(!archiveKinds.includes(kind as ArchiveDocument['kind']))throw new ApiError('수업 유형을 선택해 주세요.');
 const year=str('year',4),semester=str('semester',1),lessonDate=str('lessonDate',10);
 if(year&&!/^20\d{2}$/.test(year)||semester&&!['1','2'].includes(semester)||semester&&!year)throw new ApiError('연도·학기를 확인해 주세요.');
 if(lessonDate&&(!/^20\d{2}-\d{2}-\d{2}$/.test(lessonDate)||!Number.isFinite(Date.parse(lessonDate))||new Date(lessonDate).toISOString().slice(0,10)!==lessonDate||!year||lessonDate.slice(0,4)!==year))throw new ApiError('수업일과 연도를 확인해 주세요.');
 if(!Array.isArray(v.tags)||v.tags.length>12||v.tags.some(t=>typeof t!=='string'||!t.trim()||t.length>40))throw new ApiError('분야는 40자 이내로 최대 12개 입력해 주세요.');
 const document:ArchiveDocument={slug,title:str('title',160,true),summary:str('summary',600),subject:str('subject',120),target:str('target',120),year,semester,lessonDate,kind:kind as ArchiveDocument['kind'],tags:[...new Set((v.tags as string[]).map(t=>t.trim()))],body:str('body',80000,true),href:base?.href??`/research/entries/${slug}`,attachment:base?.attachment??''};
 if(v.assetIds!==undefined&&(!Array.isArray(v.assetIds)||v.assetIds.length>30||v.assetIds.some(id=>typeof id!=='string'||!validAssetId(id))))throw new ApiError('첨부 목록을 확인해 주세요.');
 document.assetIds=[...new Set((v.assetIds??[]) as string[])];
 if(new TextEncoder().encode(JSON.stringify(document)).length>250000)throw new ApiError('본문이 너무 깁니다.',413);
 return document;
}
export async function POST(request:Request){try{
 const {db}=await requireEditor(request);const input=await readJson(request);
 const document=validate(input.document);
 if(document.assetIds?.length){const {data:assets,error}=await db.from('archive_assets').select('id,slug,download_path,preview_paths').in('id',document.assetIds);if(error)throw error;if(assets?.length!==document.assetIds.length||assets.some(a=>a.slug!==document.slug))throw new ApiError('이 글에 첨부한 자료인지 확인해 주세요.');
 const checks=await Promise.all(assets.map(async asset=>{const prefix=asset.download_path.slice(0,asset.download_path.lastIndexOf('/'));const {data:files,error:listError}=await db.storage.from('archive-files').list(prefix,{limit:40});return !listError&&[asset.download_path,...asset.preview_paths].every(path=>files?.some(f=>f.name===path.slice(prefix.length+1)));}));if(checks.some(ok=>!ok))throw new ApiError('첨부 업로드가 끝나지 않았습니다. 파일을 다시 첨부해 주세요.');}
 if(typeof input.publish!=='boolean'||(input.expectedUpdatedAt!==null&&(typeof input.expectedUpdatedAt!=='string'||!Number.isFinite(Date.parse(input.expectedUpdatedAt)))))throw new ApiError('저장 요청을 확인해 주세요.');
 const {data,error}=await db.rpc('save_archive_document',{p_slug:document.slug,p_document:document,p_expected:input.expectedUpdatedAt,p_publish:input.publish});
 if(error){if(error.code==='40001')throw new ApiError('다른 화면에서 글이 수정됐습니다. 입력 내용을 복사한 뒤 새로고침해 주세요.',409);if(error.code==='42501')throw new ApiError('작성 권한이 없습니다.',403);throw error;}
 return privateJson({updatedAt:data,document});
 }catch(error){return apiError(error);}}
