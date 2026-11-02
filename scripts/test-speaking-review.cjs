const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const compile=path=>ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const results={exports:{}};vm.runInNewContext(compile('src/lib/speaking-results.ts'),results);
const review={exports:{},require:id=>{assert.equal(id,'./speaking-results');return results.exports;}};
vm.runInNewContext(compile('src/lib/speaking-review.ts'),review);
const saveReviewAndResolve=review.exports.saveReviewAndResolve;
const row=(no,reviewed=false,submitted=true)=>({id:no,student_no:no,submitted_at:submitted?'2026-11-02T00:00:00Z':null,reviewed_at:reviewed?'2026-11-02T01:00:00Z':null});
(async()=>{
 const rows=[row('2201'),row('2112'),row('2102'),row('2101',true),row('2103',true),row('2104',false,false)];
 const events=[];
 const first=await saveReviewAndResolve('2101',async()=>events.push('save'),async()=>{events.push('reload');return rows;});
 assert.deepEqual(events,['save','reload']);assert.equal(first.next.id,'2102');assert.equal(first.remaining,3);
 rows.find(a=>a.id==='2102').reviewed_at='saved';
 const second=await saveReviewAndResolve('2102',async()=>{},async()=>rows);
 assert.equal(second.next.id,'2112'); // Two-digit student numbers precede the next class.
 rows.find(a=>a.id==='2112').reviewed_at='saved';
 const third=await saveReviewAndResolve('2112',async()=>{},async()=>rows);
 assert.equal(third.next.id,'2201');
 rows.find(a=>a.id==='2201').reviewed_at='saved';
 const done=await saveReviewAndResolve('2201',async()=>{},async()=>rows);
 assert.equal(done.next,null);assert.equal(done.remaining,0); // Unsubmitted students do not block completion.
 let reloads=0;
 await assert.rejects(saveReviewAndResolve('2101',async()=>{throw new Error('save failed');},async()=>{reloads++;return rows;}),/save failed/);
 assert.equal(reloads,0);
 await assert.rejects(saveReviewAndResolve('2101',async()=>{},async()=>{throw new Error('offline');}),/점수는 저장했지만/);
 await assert.rejects(saveReviewAndResolve('2101',async()=>{},async()=>[row('2101')]),/저장 결과를 확인하지 못해/);
 await assert.rejects(saveReviewAndResolve('2101',async()=>{},async()=>[]),/저장 결과를 확인하지 못해/);
 // Reloaded results exclude a student another teacher just finished and include a new submission.
 const fresh=await saveReviewAndResolve('2101',async()=>{},async()=>[row('2101',true),row('2102',true),row('2105'),row('2201')]);
 assert.equal(fresh.next.id,'2105');assert.equal(fresh.remaining,2);
 console.log('PASS: confirmed-save sequencing, four-digit class/number order, fresh pending-only queue, final completion, failure stays on current student');
})().catch(e=>{console.error(e);process.exitCode=1;});
