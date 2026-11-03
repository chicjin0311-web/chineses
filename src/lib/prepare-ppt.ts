import type {PreparedMaterial} from './prepare-worksheet';
function xml(text:string){if(/<!DOCTYPE/i.test(text))throw new Error('특수 XML이 포함된 PPTX는 첨부할 수 없습니다.');const doc=new DOMParser().parseFromString(text,'application/xml');if(doc.querySelector('parsererror'))throw new Error('PPTX 내부 문서를 읽지 못했습니다.');return doc;}
const omit= /^(docProps\/|customXml\/|ppt\/(notesSlides\/|notesMasters\/|printerSettings\/|comments\/|threadedComments\/|commentAuthors\.xml|authors\.xml|persons\/|tags\/))/i;
function targetPath(part:string,target:string){const parts=(target.startsWith('/')?target.slice(1):`${part.slice(0,part.lastIndexOf('/')+1)}${target}`).split('/'),out:string[]=[];for(const p of parts){if(p==='..')out.pop();else if(p&&p!=='.')out.push(p);}return out.join('/');}
export async function preparePpt(file:File):Promise<PreparedMaterial>{
 if(!/\.pptx$/i.test(file.name))throw new Error('PPT는 PowerPoint에서 .pptx로 저장한 뒤 선택해 주세요. 매크로 파일은 첨부하지 않습니다.');
 if(!file.size||file.size>20*1024*1024)throw new Error('20MB 이하의 PPTX를 선택해 주세요.');
 const {default:JSZip}=await import('jszip');const zip=await JSZip.loadAsync(await file.arrayBuffer());
 if(!zip.file('ppt/presentation.xml')||!zip.file('[Content_Types].xml'))throw new Error('올바른 PPTX 파일이 아닙니다.');
 const names=Object.keys(zip.files);if(names.length>3000)throw new Error('슬라이드를 나누어 더 작은 PPTX로 저장해 주세요.');
 if(names.some(n=>!omit.test(n)&&/embeddings\/|vbaProject|\.bin$|ppt\/media\/.*\.(mp[34]|wav|wma|wmv|avi|mov|m4a|ogg)$/i.test(n)))throw new Error('동영상·음성·삽입 문서가 포함되어 있습니다. PowerPoint에서 해당 항목을 뺀 공유용 사본을 선택해 주세요.');
 let total=0;
 for(const name of names){const entry=zip.file(name);if(!entry)continue;if(omit.test(name)){zip.remove(name);continue;}
  if(/\.(xml|rels)$/i.test(name)){
   const text=await entry.async('string');total+=text.length;if(total>10000000)throw new Error('PPTX 내부 문서가 너무 큽니다. 파일을 나누어 주세요.');const doc=xml(text);
   if(doc.documentElement.localName==='sld'&&['0','false'].includes(doc.documentElement.getAttribute('show')??''))throw new Error('숨김 슬라이드가 있습니다. PowerPoint에서 삭제한 공유용 사본을 선택해 주세요.');
   for(const node of Array.from(doc.getElementsByTagName('*'))){
    if(node.localName==='cNvPr'){if(['1','true'].includes(node.getAttribute('hidden')??''))throw new Error('숨긴 개체가 있습니다. PowerPoint에서 제거한 공유용 사본을 선택해 주세요.');node.removeAttribute('descr');node.removeAttribute('title');node.setAttribute('name',`Shape ${node.getAttribute('id')??''}`);}
    if(node.localName==='srcRect'&&['l','t','r','b'].some(attr=>Number(node.getAttribute(attr)??0)!==0))throw new Error('잘라낸 그림의 원본 영역이 남아 있습니다. PowerPoint의 그림 압축에서 ‘잘려진 그림 영역 삭제’를 적용한 공유용 사본을 선택해 주세요.');
    if(['hlinkClick','hlinkHover','notesMasterIdLst','printerSettings'].includes(node.localName))node.parentNode?.removeChild(node);
    if(node.localName==='Relationship'){const part=name==='_rels/.rels'?'':name.replace(/_rels\//,'').replace(/\.rels$/,'');if(node.getAttribute('TargetMode')==='External'||omit.test(targetPath(part,node.getAttribute('Target')??'')))node.parentNode?.removeChild(node);}
    if(node.localName==='Override'&&omit.test((node.getAttribute('PartName')??'').replace(/^\//,'')))node.parentNode?.removeChild(node);
   }
   zip.file(name,new XMLSerializer().serializeToString(doc));
  }
 }
 // Keep only package parts reachable from the root relationships; removed notes may have private media.
 const reachable=new Set<string>(['[Content_Types].xml']);
 async function visit(part:string){if(part){if(reachable.has(part))return;reachable.add(part);}const slash=part.lastIndexOf('/'),rels=part?`${part.slice(0,slash+1)}_rels/${part.slice(slash+1)}.rels`:'_rels/.rels';const entry=zip.file(rels);if(!entry)return;reachable.add(rels);const doc=xml(await entry.async('string'));for(const rel of Array.from(doc.getElementsByTagName('*')).filter(n=>n.localName==='Relationship'))await visit(targetPath(part,rel.getAttribute('Target')??''));}
 await visit('');for(const name of Object.keys(zip.files))if(!zip.files[name].dir&&!reachable.has(name))zip.remove(name);
 // Re-encode supported pictures locally so camera/author metadata is not retained.
 for(const name of Object.keys(zip.files).filter(n=>n.startsWith('ppt/media/')&&!zip.files[n].dir)){
  if(!/\.(png|jpe?g|webp)$/i.test(name))throw new Error('특수 그림 형식이 있습니다. 해당 그림을 PNG/JPG로 바꾼 공유용 PPTX를 선택해 주세요.');
  const bytes=await zip.file(name)!.async('uint8array');const bitmap=await createImageBitmap(new Blob([new Uint8Array(bytes).buffer]));try{if(bitmap.width*bitmap.height>40000000)throw new Error('PPTX 그림 해상도가 너무 큽니다. 그림을 압축해 주세요.');const canvas=document.createElement('canvas');canvas.width=bitmap.width;canvas.height=bitmap.height;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('그림 처리를 할 수 없습니다.');ctx.drawImage(bitmap,0,0);const type=/\.jpe?g$/i.test(name)?'image/jpeg':/\.webp$/i.test(name)?'image/webp':'image/png';const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('그림 처리에 실패했습니다.')),type,.95));zip.file(name,await blob.arrayBuffer());canvas.width=canvas.height=1;}finally{bitmap.close();}
 }
 const types=xml(await zip.file('[Content_Types].xml')!.async('string'));for(const node of Array.from(types.getElementsByTagName('*')))if(node.localName==='Override'&&!zip.file((node.getAttribute('PartName')??'').slice(1)))node.parentNode?.removeChild(node);zip.file('[Content_Types].xml',new XMLSerializer().serializeToString(types));
 const download=new Blob([await zip.generateAsync({type:'arraybuffer',compression:'DEFLATE'})],{type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
 if(download.size>20*1024*1024)throw new Error('공유용 PPTX가 20MB를 넘습니다. 그림을 압축해 주세요.');
 return {kind:'ppt',download,pages:[],note:'발표자 노트·댓글·문서 속성·외부 연결을 제거하고 그림 메타데이터를 정리했습니다. 슬라이드에 보이는 글·그림·QR은 자동 익명화하지 않습니다. 공유용 사본을 내려받아 PowerPoint에서 모든 슬라이드와 공유 권한을 확인한 뒤 업로드해 주세요.'};
}
