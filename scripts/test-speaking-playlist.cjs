const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const moduleContext={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/speaking-playlist.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,moduleContext);
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup(load=async n=>`audio-${n}`){
 const states=[];
 const player={src:'',currentTime:0,onended:null,onerror:null,playing:false,blocked:false,
  async play(){if(this.blocked)throw new Error('NotAllowedError');this.playing=true;},pause(){this.playing=false;},load(){},removeAttribute(){this.src='';}};
 const controller=moduleContext.exports.createAnswerPlaylist(player,load,s=>states.push(s));
 return {player,controller,last:()=>states.at(-1),states};
}
(async()=>{
 const a=setup();a.controller.start([7,0,3,3]);await flush();assert.equal(a.player.src,'audio-0');assert.equal(a.last().total,3);
 a.player.currentTime=1.2;a.controller.pause();assert.equal(a.player.playing,false);assert.equal(a.last().phase,'paused');
 a.controller.resume();await flush();assert.equal(a.player.currentTime,1.2);assert.equal(a.last().phase,'playing');
 a.player.onended();await flush();assert.equal(a.player.src,'audio-3');assert.equal(a.last().position,2);
 a.player.onended();await flush();assert.equal(a.player.src,'audio-7');a.player.onended();assert.equal(a.last().phase,'ended');
 a.controller.start([]);assert.equal(a.last().phase,'idle');
 let complete;
 const b=setup(()=>new Promise(resolve=>complete=resolve));b.controller.start([0]);b.controller.pause();complete('delayed');await flush();assert.equal(b.player.playing,false);assert.equal(b.last().phase,'paused');b.controller.resume();await flush();assert.equal(b.last().phase,'playing');
 const c=setup(()=>new Promise(resolve=>complete=resolve));c.controller.start([0]);c.controller.stop();complete('stale');await flush();assert.equal(c.player.src,'');assert.equal(c.last().phase,'idle');
 const d=setup();d.player.blocked=true;d.controller.start([0]);await flush();assert.equal(d.last().phase,'paused');d.player.blocked=false;d.controller.resume();await flush();assert.equal(d.last().phase,'playing');
 let failed=true;const e=setup(async()=>{if(failed)throw new Error('network');return 'retried';});e.controller.start([4]);await flush();assert.equal(e.last().phase,'error');failed=false;e.controller.resume();await flush();assert.equal(e.player.src,'retried');assert.equal(e.last().question,4);
 e.player.onerror();assert.equal(e.last().phase,'error');assert.equal(e.player.playing,false);
 const f=setup(()=>new Promise(resolve=>complete=resolve));f.controller.start([1]);const count=f.states.length;f.controller.dispose();complete('disposed');await flush();assert.equal(f.states.length,count);assert.equal(f.player.onended,null);assert.equal(f.player.src,'');
 console.log('PASS: ordered playback, missing recordings skipped, pause/resume, completion, blocked playback retry, load/media errors, stale load cancellation, dispose');
})().catch(error=>{console.error(error);process.exitCode=1;});
