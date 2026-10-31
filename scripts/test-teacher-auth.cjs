const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const project='https://fixture.supabase.co',origin='https://chineses.vercel.app';
let created=0,last,signedOut=false,userEmail='teacher@example.com';
const session={access_token:'fixture-access',refresh_token:'fixture-refresh'};
const auth={verifyOtp:async input=>(last=input,{data:{session},error:null}),setSession:async input=>(last=input,{data:{session},error:null}),getUser:async()=>({data:{user:{email:userEmail}},error:null}),signOut:async()=>{signedOut=true;}};
const sandbox={exports:{},require:()=>({createClient:()=>{created++;return {auth};}}),window:{},location:{origin},process:{env:{NEXT_PUBLIC_SUPABASE_URL:project,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'fixture'}},URL,URLSearchParams,Error};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/teacher-auth.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,sandbox);
const api=sandbox.exports;
(async()=>{
 assert.equal(api.teacherAuth(),api.teacherAuth());assert.equal(created,1);
 await api.verifyTeacherInput('123456','teacher@example.com');assert.equal(last.type,'email');assert.equal(last.token,'123456');
 await api.verifyTeacherInput(project+'/auth/v1/verify?token=fixture-hash&type=signup','teacher@example.com');assert.equal(last.token_hash,'fixture-hash');assert.equal(last.type,'signup');
 await api.verifyTeacherInput('http://localhost:3000/#access_token=fixture-access&refresh_token=fixture-refresh','teacher@example.com');assert.equal(last.refresh_token,'fixture-refresh');
 assert.throws(()=>api.parseAuthInput('https://evil.invalid/#access_token=a&refresh_token=b',project,origin));
 assert.throws(()=>api.parseAuthInput(project+'/auth/v1/verify?token=x&type=recovery',project,origin));
 assert.throws(()=>api.parseAuthInput(origin,project,origin));
 assert.match(api.authErrorMessage(new Error('email rate limit exceeded')),/발송 한도/);
 userEmail='other@example.com';await assert.rejects(api.verifyTeacherInput('123456','teacher@example.com'),/계정이 다릅니다/);assert.equal(signedOut,true);
 for(const success of [true,false]){
  let destination,cleaned=false;
  const callback={exports:{},require:id=>id==='react'?{useEffect:fn=>fn()}:{teacherAuth:()=>({auth:{getSession:async()=>({data:{session:success?session:null},error:null})}})},location:{pathname:'/',search:'',hash:'#access_token=fixture-access',replace:path=>destination=path},history:{replaceState:()=>cleaned=true},URLSearchParams};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/components/teacher-auth-return.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,callback);
  callback.exports.TeacherAuthReturn();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(cleaned,true);assert.equal(destination,'/tools/speaking/teacher'+(success?'':'?auth_error=expired'));
 }
 console.log('PASS: singleton, OTP/link/session recovery, foreign URL and recovery-token rejection, email mismatch logout, callback success/failure and URL cleanup');
})().catch(e=>{console.error(e);process.exitCode=1;});
