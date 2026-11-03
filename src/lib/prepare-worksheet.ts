export type PreparedMaterial={kind:'worksheet'|'ppt';download:Blob;pages:Blob[];note:string};
const max=20*1024*1024;
function jpeg(canvas:HTMLCanvasElement){return new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('이미지 변환에 실패했습니다.')),'image/jpeg',.92));}
export async function prepareWorksheet(file:File,progress:(s:string)=>void):Promise<PreparedMaterial>{
 if(!file.size||file.size>max)throw new Error('20MB 이하의 파일을 선택해 주세요.');
 const {PDFDocument}=await import('pdf-lib');
 const output=await PDFDocument.create();output.setAuthor('');output.setCreator('');output.setProducer('');
 const pages:Blob[]=[];
 async function add(canvas:HTMLCanvasElement,width:number,height:number){const blob=await jpeg(canvas);pages.push(blob);const image=await output.embedJpg(await blob.arrayBuffer());output.addPage([width,height]).drawImage(image,{x:0,y:0,width,height});canvas.width=canvas.height=1;}
 if(/\.pdf$/i.test(file.name)){
  const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc='/pdfjs/pdf.worker.min.mjs';
  const task=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),cMapUrl:'/pdfjs/cmaps/',cMapPacked:true,standardFontDataUrl:'/pdfjs/standard_fonts/',wasmUrl:'/pdfjs/wasm/'});
  task.onPassword=()=>{void task.destroy();};
  const pdf=await task.promise;
  try{if(pdf.numPages>30)throw new Error('학습지는 한 파일당 30쪽까지 첨부할 수 있습니다. 파일을 나누어 주세요.');
   for(let n=1;n<=pdf.numPages;n++){progress(`${n}/${pdf.numPages}쪽 이미지 준비 중…`);const page=await pdf.getPage(n),base=page.getViewport({scale:1});if(!base.width||!base.height||base.height/base.width>8||base.width/base.height>8)throw new Error('일반적인 문서 비율의 PDF를 사용해 주세요.');const viewport=page.getViewport({scale:Math.min(2.5,1800/Math.max(base.width,base.height))});const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);const ctx=canvas.getContext('2d');if(!ctx)throw new Error('이 브라우저에서 이미지 변환을 사용할 수 없습니다.');await page.render({canvas,canvasContext:ctx,viewport,annotationMode:pdfjs.AnnotationMode.DISABLE,background:'white'}).promise;await add(canvas,base.width,base.height);page.cleanup();}
  }finally{await task.destroy();}
 }else if(/\.(png|jpe?g|webp)$/i.test(file.name)){
  const bitmap=await createImageBitmap(file);try{if(bitmap.width*bitmap.height>40000000)throw new Error('사진 해상도가 너무 큽니다. 크기를 줄인 뒤 선택해 주세요.');const scale=Math.min(1,1800/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);const ctx=canvas.getContext('2d');if(!ctx)throw new Error('이미지를 열 수 없습니다.');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);await add(canvas,canvas.width*.5,canvas.height*.5);}finally{bitmap.close();}
 }else throw new Error('학습지는 PDF, JPG, PNG, WebP를 선택해 주세요. 한글·Word 파일은 PDF로 저장한 뒤 첨부할 수 있습니다.');
 const bytes=await output.save();const download=new Blob([new Uint8Array(bytes).buffer],{type:'application/pdf'});
 if(download.size>max||pages.some(p=>p.size>max))throw new Error('변환한 공유본이 20MB를 넘습니다. 파일을 나누어 주세요.');
 return {kind:'worksheet',download,pages,note:'원래 쪽의 모습을 이미지와 공유용 PDF로 변환했습니다. 문서 속성·숨은 텍스트·첨부·링크·주석·입력폼은 공유본에 포함하지 않습니다. 보이는 개인정보·얼굴·QR·저작권 자료는 미리보기에서 확인해 주세요.'};
}
