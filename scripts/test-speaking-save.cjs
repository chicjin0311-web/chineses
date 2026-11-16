const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const context={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/speaking-save.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
const {saveAnswerWithRecovery:save}=context.exports;
(async()=>{
 const a={id:'student',revision:1,answers:[{question_no:0}],questions:['preserved']};
 let reads=0;
 const next=await save(a,1,async()=>({ok:true}),async()=>{reads++;throw Error('refresh offline');});
 assert.equal(reads,0,'acknowledged upload must not depend on a second fetch');
 assert.equal(next.answers.length,2);assert.equal(a.answers.length,1,'snapshot is immutable');assert.equal(next.questions,a.questions);
 const committed={...a,answers:[...a.answers,{question_no:1}]};
 assert.equal(await save(a,1,async()=>{throw Error('connection lost after commit');},async()=>committed),committed);
 for(const current of [{...committed,id:'other'},{...committed,revision:2},a]){
  await assert.rejects(save(a,1,async()=>{throw Error('upload lost');},async()=>current),/upload lost/);
 }
 await assert.rejects(save(a,1,async()=>{throw Error('upload lost');},async()=>{throw Error('also offline');}),/upload lost/);
 const duplicate=await save(committed,1,async()=>({ok:true}),async()=>committed);assert.equal(duplicate.answers.length,2);
 console.log('PASS: acknowledged upload advances without refresh, lost acknowledgement recovered, local answer retained on failure, old revision rejected, idempotent retries');
})().catch(e=>{console.error(e);process.exitCode=1;});
