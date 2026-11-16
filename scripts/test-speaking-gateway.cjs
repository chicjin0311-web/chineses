const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const context={exports:{},AbortSignal,setTimeout,Math,Error};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/speaking-gateway.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
const call=context.exports.speakingGateway,ok={data:{ok:true},error:null,status:200};
(async()=>{
 for(const action of ['answer','attempt','submit','room']){
  let n=0;assert.deepEqual(await call(action,async()=>++n===1?{data:null,error:{message:'upstream unavailable'},status:503}:ok,{pause:async()=>{}}),ok.data);assert.equal(n,2);
 }
 for(const action of ['join','create','reset','review','trash','restore']){
  let n=0;await assert.rejects(call(action,async()=>{n++;return {data:null,error:{message:'network fetch failed'},status:0};},{pause:async()=>{}}),/연결/);assert.equal(n,1,'non-idempotent actions are not blindly repeated');
 }
 let attempts=0,events=[];
 assert.deepEqual(await call('answer',signal=>{attempts++;if(attempts===2)return Promise.resolve(ok);return new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new Error('deadline exceeded'))));},{timeoutMs:15,pause:async()=>{},onRetry:e=>events.push(e)}),ok.data);assert.equal(attempts,2);assert.equal(events[0].code,'TIMEOUT');
 for(const error of [{message:'권한 없음',code:'42501'},{message:'선생님이 재응시를 설정했습니다.',code:'P0001'}]){
  let n=0;await assert.rejects(call('answer',async()=>{n++;return {data:null,error,status:400};},{pause:async()=>{}}),new RegExp(error.message));assert.equal(n,1);
 }
 let n=0;await assert.rejects(call('answer',async()=>{n++;return {data:null,error:{message:'connection reset'},status:502};},{pause:async()=>{}}),/연결/);assert.equal(n,2,'retries are bounded');
 n=0;await assert.rejects(call('attempt',async()=>{n++;return {data:{error:'응시 정보가 없습니다.'},error:null,status:200};}),/응시 정보/);assert.equal(n,1);
 console.log('PASS: bounded per-request deadline, safe read/upload/submit retries, no replay of join/reset/grading/deletion, domain/auth errors preserved, at most two attempts');
})().catch(e=>{console.error(e);process.exitCode=1;});
// Keep Node alive while testing an unref'ed AbortSignal.timeout timer.
const keepAlive=setTimeout(()=>{},1000);process.on('beforeExit',()=>clearTimeout(keepAlive));
