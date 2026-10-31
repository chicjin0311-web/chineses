'use client';
// Store a bounded, decoded raster copy, never the uploaded file or SVG markup.
export async function prepareSpeakingImage(file:File):Promise<string>{
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10_000_000)throw new Error('10MB 이하 JPG·PNG·WebP 사진을 선택하세요.');
 const image=await createImageBitmap(file);
 try{
  const ratio=Math.min(1,900/Math.max(image.width,image.height));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*ratio));canvas.height=Math.max(1,Math.round(image.height*ratio));
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('사진을 처리할 수 없습니다.');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  for(const quality of [.9,.75,.6,.4]){const data=canvas.toDataURL('image/jpeg',quality);if(data.length<=160000)return data;}
  throw new Error('사진이 너무 복잡합니다. 필요한 부분을 잘라서 다시 선택하세요.');
 }finally{image.close();}
}
