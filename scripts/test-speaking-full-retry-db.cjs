// Isolated PostgreSQL (WASM); never connects to the school's live database.
// QA dependency: pnpm add --dir qa/resume-db @electric-sql/pglite@0.5.16
const {PGlite}=require('../qa/resume-db/node_modules/@electric-sql/pglite');
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm'),ts=require('typescript');
const bankModule={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/speaking-bank.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,bankModule);
const questions=JSON.parse(JSON.stringify(bankModule.exports.speakingBank));
(async()=>{
 const db=new PGlite();
 try{
  const teacher='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222';
  await db.exec(`create role anon; create role authenticated; create schema auth; create schema extensions; create schema classroom_private;
   create table auth.users(id uuid primary key);
   create function auth.uid() returns uuid language sql as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
   create function classroom_private.is_teacher() returns boolean language sql as $$ select auth.uid() is not null $$;
   create function extensions.digest(text,text) returns bytea language sql as $$ select sha256(convert_to($1,'UTF8')) $$;
   insert into auth.users values('${teacher}'),('${other}');`);
  const apply=async file=>db.exec(fs.readFileSync('supabase/'+file,'utf8'));
  for(const file of ['speaking-assessment.sql','speaking-gateway-fix.sql','speaking-edit.sql','speaking-attempt-context.sql','speaking-capacity.sql','speaking-resume.sql','speaking-trash.sql'])await apply(file);
  await db.query("insert into speaking_private.config(secret_hash) values(encode(extensions.digest('fixture','sha256'),'hex'))");
  const identity=async id=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);
  const call=async(action,p={})=>(await db.query('select speaking_private.gateway($1,$2,$3::jsonb) as data',['fixture',action,JSON.stringify(p)])).rows[0].data;
  const upload=(id,token,revision,i)=>call('answer',{token,attempt_id:id,revision,question_no:i,mime:'audio/webm',duration:2,audio:Buffer.alloc(180,i+1).toString('base64')});
  const snapshot=async id=>(await db.query("select to_jsonb(a) as attempt,(select jsonb_agg(to_jsonb(b)-'audio'||jsonb_build_object('bytes',encode(b.audio,'hex')) order by question_no) from speaking_private.answers b where b.attempt_id=a.id) as recordings from speaking_private.attempts a where id=$1",[id])).rows[0];
  await identity(teacher);const room=await call('create',{title:'QA only',code:'QA111111',questions});
  await identity('');
  const completedFive=await call('join',{code:room.code,student_no:'2501',student_name:'완료한5반QA',token:'class-five',rate_key:'qa'});
  for(let i=0;i<10;i++)await upload(completedFive.id,'class-five',0,i);
  await call('submit',{token:'class-five'});await identity(teacher);
  await call('review',{id:completedFive.id,score:50,comment:'기존 완료 기록 보존',answers:questions.map((_,i)=>({question_no:i,rating:'충분',note:'보존'}))});
  await identity('');
  const first=await call('join',{code:room.code,student_no:'2101',student_name:'재응시QA',token:'original',rate_key:'qa'});
  for(let i=0;i<10;i++)await upload(first.id,'original',0,i);
  await call('submit',{token:'original'});const before=await call('attempt',{token:'original'});
  await identity(teacher);await call('review',{id:first.id,score:40,comment:'이전 응시 채점',answers:questions.map((_,i)=>({question_no:i,rating:'충분',note:'QA'}))});
  const fiveSnapshot=await snapshot(completedFive.id),firstSnapshot=await snapshot(first.id);
  await apply('speaking-full-retry.sql');await apply('speaking-full-retry.sql');
  assert.deepEqual(await snapshot(completedFive.id),fiveSnapshot,'migration never changes completed fifth-class results');
  assert.deepEqual(await snapshot(first.id),firstSnapshot,'no attempt changes until the teacher explicitly allows retry');
  assert.equal((await call('room',{id:room.id})).full_retry_supported,true);
  assert.equal((await call('retry_info',{id:first.id})).full_retry_supported,true);
  await assert.rejects(call('reset',{id:first.id,retry_mode:'full_random',restart_from:4}),/1번/);
  await assert.rejects(call('reset',{id:first.id,restart_from:0}),/1번/);
  assert.deepEqual(await snapshot(first.id),firstSnapshot,'invalid mode/partial retries do not mutate records');
  const retry=()=>call('reset',{id:first.id,retry_mode:'full_random',restart_from:0});
  assert.equal((await retry()).revision,1);
  const history=await call('history',{id:first.id});assert.equal(history.length,1);assert.equal(history[0].answers.length,10);assert.equal(history[0].snapshot.score,40);assert.equal(history[0].snapshot.token_hash,undefined);assert.deepEqual(history[0].snapshot.questions,before.questions);
  for(let i=0;i<10;i++){const audio=await call('history_audio',{id:history[0].id,question_no:i});assert.equal(Buffer.from(audio.audio,'base64').compare(Buffer.alloc(180,i+1)),0);}
  await identity(other);await assert.rejects(retry(),/찾을/);await assert.rejects(call('retry_info',{id:first.id}),/찾을/);await assert.rejects(call('history_audio',{id:history[0].id,question_no:0}),/찾을/);
  await identity('');await assert.rejects(call('retry_info',{id:first.id}),/교사/);
  let current=await call('attempt',{token:'original'});assert.equal(current.answers.length,0);assert.equal(current.submitted_at,null);assert.equal(current.restart_from,0);
  function changed(previous,next){
   assert.equal(next.length,10);
   questions.forEach((q,i)=>{
    assert.equal(next[i].text,q.text);
    assert.ok(q.variants.some(v=>v.cue===next[i].cue&&v.expected===next[i].expected),'assigned cue and answer must come from the same textbook candidate');
    if(q.variants.length>1)assert.notEqual(next[i].cue,previous[i].cue,`question ${i+1} must exclude its previous visible cue`);
    else assert.equal(next[i].cue,previous[i].cue,'single candidate/free response stays fixed');
   });
  }
  changed(before.questions,current.questions);
  await assert.rejects(upload(first.id,'original',0,0),/재응시/);await assert.rejects(call('submit',{token:'original',attempt_id:first.id,revision:0}),/재응시/);
  const wrong=await call('join',{code:room.code,student_no:'2101',student_name:'다른이름',token:'wrong',rate_key:'qa'});assert.ok(wrong.error);
  const resumed=await call('join',{code:room.code,student_no:'2101',student_name:'재응시QA',token:'resumed',rate_key:'qa'});assert.equal(resumed.id,first.id);
  await assert.rejects(call('attempt',{token:'original'}),/응시 정보/);
  await identity(teacher);
  for(let round=0;round<10;round++){
   const previous=current.questions;await retry();await identity('');current=await call('attempt',{token:'resumed'});changed(previous,current.questions);await identity(teacher);
  }
  await call('toggle',{id:room.id,open:false});await assert.rejects(retry(),/다시 연/);await call('toggle',{id:room.id,open:true});
  await identity('');
  for(let i=0;i<10;i++)await upload(first.id,'resumed',current.revision,i);
  await upload(first.id,'resumed',current.revision,0);await call('submit',{token:'resumed',attempt_id:first.id,revision:current.revision});
  await identity(teacher);let actual=(await call('room',{id:room.id})).attempts.find(a=>a.id===first.id);assert.equal(actual.answers.length,10);assert.ok(actual.submitted_at);assert.equal(actual.score,null);assert.equal(actual.reviewed_at,null);
  assert.deepEqual(await snapshot(completedFive.id),fiveSnapshot,'other class stays byte-identical through all retries');
  await identity(other);await assert.rejects(call('trash',{id:room.id,attempt_ids:[first.id]}),/평가/);
  await identity('');await assert.rejects(call('trash',{id:room.id,attempt_ids:[first.id]}),/교사/);
  await identity(teacher);await assert.rejects(call('trash',{id:room.id,attempt_ids:[first.id,'33333333-3333-4333-8333-333333333333']}),/이 평가/);
  assert.equal((await call('trash_list',{id:room.id})).length,0);
  await call('trash',{id:room.id,attempt_ids:[first.id]});
  assert.equal((await call('room',{id:room.id})).attempts.length,1);assert.equal((await call('trash_list',{id:room.id}))[0].saved_count,10);
  await identity('');await assert.rejects(call('attempt',{token:'resumed'}),/응시 정보/);
  const replacement=await call('join',{code:room.code,student_no:'2101',student_name:'재응시QA',token:'replacement',rate_key:'qa'});
  await identity(teacher);await assert.rejects(call('restore',{id:room.id,attempt_ids:[first.id]}),/같은 학번/);
  await call('trash',{id:room.id,attempt_ids:[replacement.id]});await call('restore',{id:room.id,attempt_ids:[first.id]});
  actual=(await call('room',{id:room.id})).attempts.find(a=>a.id===first.id);assert.equal(actual.answers.length,10);assert.equal((await call('history',{id:first.id})).length,11);assert.equal((await call('rooms'))[0].students,2);
  assert.deepEqual(await snapshot(completedFive.id),fiveSnapshot,'practice-record deletion does not alter fifth-class results');
  console.log('PASS: full retry from question 1; six random cues differ on every retry; fixed questions retained; old audio/cues/grades archived; completed fifth-class records unchanged; old revisions rejected; re-entry/final submission; owner checks and idempotent migration');
  console.log('PASS: recoverable student deletion, preserved audio/history, roster counts, blocked deleted session, same-number re-entry, restore conflicts and atomic batch ownership');
 }finally{await db.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
