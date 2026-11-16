// Opt-in live test, limited to 30 synthetic students in a teacher-created QA room.
// Example: node scripts/test-speaking-concurrency.mjs --code QA123456 --title "기능점검 전용..."
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url),ts=require('typescript');
const args=Object.fromEntries(process.argv.slice(2).reduce((pairs,v,i,a)=>v.startsWith('--')?[...pairs,[v.slice(2),a[i+1]]]:pairs,[]));
if(!/^[A-F0-9]{8}$/.test(args.code||'')||!args.title?.startsWith('기능점검 전용'))throw new Error('A dedicated QA participation code and exact QA title are required.');
const origin='https://chineses.vercel.app',count=30,questionCount=10,duration=20;
const output=args.output||'qa/concurrency-30-20261116.json';
const audioModule={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/speaking-audio.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,audioModule);
const clients=Array.from({length:count},(_,i)=>({no:String(9001+i),name:`동시접속점검${String(i+1).padStart(2,'0')}`,cookie:'',attempt:null}));
const report={started_at:new Date().toISOString(),origin,title:args.title,concurrency:count,questions:questionCount,audio_seconds:duration,audio_format:'8kHz 8-bit mono PCM WAV',test_type:'30 independent API sessions; synthetic audio; no physical microphone/Wi-Fi test',stages:[],failures:[],audio_hashes:[],complete:false};
function persist(){fs.mkdirSync('qa',{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2));}
function wav(student,question){
 const rate=8000,samples=rate*duration,b=Buffer.alloc(44+samples);
 b.write('RIFF');b.writeUInt32LE(36+samples,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate,28);b.writeUInt16LE(1,32);b.writeUInt16LE(8,34);b.write('data',36);b.writeUInt32LE(samples,40);
 const frequency=180+student*5+question*2;
 for(let n=0;n<samples;n++)b[44+n]=128+Math.round(16*Math.sin(2*Math.PI*frequency*n/rate));
 return b;
}
async function request(client,body){
 const form=body instanceof FormData;
 const res=await fetch(origin+'/api/speaking',{method:'POST',headers:{Origin:origin,...(form?{}:{'Content-Type':'application/json'}),...(client.cookie?{Cookie:client.cookie}:{})},body:form?body:JSON.stringify(body),signal:AbortSignal.timeout(35000)});
 const data=await res.json().catch(()=>{throw new Error(`Non-JSON response: HTTP ${res.status}`);});
 if(!res.ok)throw new Error(`HTTP ${res.status}: ${data.error||'request failed'}`);
 if(body.action==='join'){
  const cookie=res.headers.getSetCookie().find(v=>v.startsWith('speaking_attempt='));
  if(!cookie)throw new Error('Missing independent student session cookie');
  client.cookie=cookie.split(';')[0];
 }
 return data;
}
function distribution(values){const sorted=[...values].sort((a,b)=>a-b);return {min_ms:Math.round(sorted[0]),median_ms:Math.round(sorted[Math.floor(sorted.length/2)]),p95_ms:Math.round(sorted[Math.ceil(sorted.length*.95)-1]),max_ms:Math.round(sorted.at(-1))};}
async function stage(name,operation){
 const started=performance.now(),latencies=[];
 const results=await Promise.allSettled(clients.map(async(client,i)=>{const t=performance.now();try{await operation(client,i);}finally{latencies.push(performance.now()-t);}}));
 const failures=results.flatMap((r,i)=>r.status==='rejected'?[{stage:name,student_no:clients[i].no,error:String(r.reason?.message||r.reason)}]:[]);
 const result={name,requests:count,passed:count-failures.length,failed:failures.length,wall_ms:Math.round(performance.now()-started),...distribution(latencies)};
 report.stages.push(result);report.failures.push(...failures);persist();console.log(JSON.stringify(result));
 if(failures.length)throw new Error(`${name}: ${failures.length} failed; stop further load and inspect ${output}`);
}
try{
 const health=await fetch(origin+'/api/health',{signal:AbortSignal.timeout(35000)});report.health_before={http_status:health.status,...await health.json()};
 if(!health.ok)throw new Error('Site health check failed before load test');
 await stage('student_page_30',async()=>{const res=await fetch(origin+'/tools/speaking',{signal:AbortSignal.timeout(35000)});const html=await res.text();if(!res.ok||!html.includes('말하기 평가'))throw new Error(`Student page HTTP ${res.status}`);});
 await stage('join_30_same_origin_and_ip',async client=>{await request(client,{action:'join',code:args.code,student_no:client.no,student_name:client.name});});
 await stage('assigned_questions_30',async client=>{
  const a=await request(client,{action:'attempt'});
  if(a.title!==args.title||a.questions?.length!==questionCount||a.answers?.length!==0||a.student_no!==client.no||!a.is_open)throw new Error('Wrong QA room, identity, question count, or room state; refusing audio uploads');
  if(a.questions.some(q=>q.expected!==undefined||q.source!==undefined))throw new Error('Teacher-only answers were exposed');
  client.attempt=a;
 });
 if(new Set(clients.map(c=>c.attempt.id)).size!==count)throw new Error('Student attempts are not isolated');
 if(new Set(clients.map(c=>c.cookie)).size!==count)throw new Error('Student sessions are not isolated');
 for(let q=0;q<questionCount;q++){
  await stage(`question_${q+1}_audio_30`,async client=>{
   const path=audioModule.exports.questionAudioUrl(client.attempt.questions[q].text);if(!path)throw new Error('No prerecorded question audio');
   const res=await fetch(origin+path,{signal:AbortSignal.timeout(35000)}),bytes=await res.arrayBuffer();
   if(!res.ok||bytes.byteLength<1000||!res.headers.get('content-type')?.includes('audio'))throw new Error(`Question audio HTTP ${res.status}`);
  });
  await stage(`question_${q+1}_save_30`,async(client,i)=>{
   const bytes=wav(i,q),form=new FormData();form.set('audio',new Blob([bytes],{type:'audio/wav'}),`qa-${client.no}-${q+1}.wav`);form.set('attempt_id',client.attempt.id);form.set('revision',String(client.attempt.revision??0));form.set('question_no',String(q));form.set('duration',String(duration));
   const data=await request(client,form);if(data.ok!==true)throw new Error('Upload was not acknowledged');
   report.audio_hashes.push({student_no:client.no,question:q+1,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
  });
  await stage(`question_${q+1}_saved_state_30`,async client=>{
   const a=await request(client,{action:'attempt'});
   if(a.id!==client.attempt.id||a.student_no!==client.no||a.answers.length!==q+1||JSON.stringify(a.questions)!==JSON.stringify(client.attempt.questions))throw new Error('Saved audio count, assigned cues or student isolation changed');
   for(let i=0;i<=q;i++)if(!a.answers.some(v=>v.question_no===i&&Number(v.duration)===duration))throw new Error('Missing/wrong question recording metadata');
  });
 }
 await stage('final_submit_30',async client=>{const data=await request(client,{action:'submit',attempt_id:client.attempt.id,revision:client.attempt.revision??0});if(data.ok!==true)throw new Error('Submission not acknowledged');});
 await stage('final_persisted_state_30',async client=>{const a=await request(client,{action:'attempt'});if(!a.submitted_at||a.answers.length!==questionCount||a.student_no!==client.no||new Set(a.answers.map(v=>v.question_no)).size!==questionCount)throw new Error('Final submission or recordings missing');});
 const healthAfter=await fetch(origin+'/api/health',{signal:AbortSignal.timeout(35000)});report.health_after={http_status:healthAfter.status,...await healthAfter.json()};if(!healthAfter.ok)throw new Error('Site health check failed after load test');
 report.complete=true;report.ended_at=new Date().toISOString();report.recordings=count*questionCount;report.uploaded_bytes=report.audio_hashes.reduce((n,a)=>n+a.bytes,0);report.failed_requests=report.failures.length;report.request_count=report.stages.reduce((n,s)=>n+s.requests,0);
 persist();console.log(JSON.stringify({complete:true,students:count,recordings:report.recordings,requests:report.request_count,failures:report.failed_requests,report:output}));
}catch(e){report.error=e.message;report.ended_at=new Date().toISOString();persist();console.error(e.message);process.exitCode=1;}
