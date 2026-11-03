import {cp,mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
const require=createRequire(import.meta.url);
const base=path.dirname(require.resolve('pdfjs-dist/package.json'));
await mkdir('public/pdfjs',{recursive:true});
for(const name of ['cmaps','standard_fonts','wasm','LICENSE'])await cp(path.join(base,name),path.join('public/pdfjs',name),{recursive:true});
await cp(path.join(base,'build/pdf.worker.min.mjs'),'public/pdfjs/pdf.worker.min.mjs');
