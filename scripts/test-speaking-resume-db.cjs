// Isolated PostgreSQL (WASM) regression test; never connects to the school DB.
// Install pinned QA dependency: pnpm add --dir qa/resume-db @electric-sql/pglite@0.5.16
const {PGlite}=require('../qa/resume-db/node_modules/@electric-sql/pglite');
const fs=require('node:fs'),assert=require('node:assert/strict');
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
  for(const file of ['speaking-assessment.sql','speaking-gateway-fix.sql','speaking-edit.sql','speaking-attempt-context.sql','speaking-capacity.sql','speaking-resume.sql','speaking-resume.sql'])await db.exec(fs.readFileSync('supabase/'+file,'utf8'));
  await db.query("insert into speaking_private.config(secret_hash) values(encode(extensions.digest('fixture','sha256'),'hex'))");
  const identity=async id=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);
  const call=async(action,p={})=>(await db.query('select speaking_private.gateway($1,$2,$3::jsonb) as data',['fixture',action,JSON.stringify(p)])).rows[0].data;
  await identity(teacher);
  const questions=Array.from({length:10},(_,i)=>({id:'q'+i,text:'问题'+i,instruction:'안내',variants:[{id:'a',cue:'甲',expected:'例子'},{id:'b',cue:'乙',expected:'例子'}]}));
  const room=await call('create',{title:'QA only',code:'QA111111',questions});
  await identity('');
  const first=await call('join',{code:room.code,student_no:'2512',student_name:'QA학생',token:'original',rate_key:'qa'});
  const upload=(token,revision,i)=>call('answer',{token,attempt_id:first.id,revision,question_no:i,mime:'audio/webm',duration:2,audio:Buffer.alloc(180,i+1).toString('base64')});
  for(let i=0;i<10;i++)await upload('original',0,i);
  await call('submit',{token:'original',attempt_id:first.id,revision:0});
  const before=await call('attempt',{token:'original'});
  await identity(teacher);
  await call('review',{id:first.id,score:40,comment:'QA 종합 판단',answers:questions.map((_,i)=>({question_no:i,rating:'충분',note:'QA'}))});
  await db.query("update speaking_private.attempts set student_no='2512 (이전 응시 abe5a299) (이전 응시 abe5a299)' where id=$1",[first.id]);
  assert.equal((await call('room',{id:room.id})).resume_supported,true);
  assert.equal((await call('reset',{id:first.id,restart_from:4})).revision,1);
  const history=await call('history',{id:first.id});assert.equal(history.length,1);assert.equal(history[0].answers.length,10);assert.equal(history[0].snapshot.score,40);assert.equal(history[0].snapshot.token_hash,undefined);
  for(let i=0;i<10;i++){const audio=await call('history_audio',{id:history[0].id,question_no:i});assert.equal(Buffer.from(audio.audio,'base64').compare(Buffer.alloc(180,i+1)),0);}
  await identity(other);await assert.rejects(call('reset',{id:first.id,restart_from:0}),/찾을/);await assert.rejects(call('history',{id:first.id}),/찾을/);await assert.rejects(call('history_audio',{id:history[0].id,question_no:0}),/찾을/);
  await identity('');await assert.rejects(call('history',{id:first.id}),/교사/);
  const retry=await call('attempt',{token:'original'});assert.equal(retry.student_no,'2512');assert.equal(retry.answers.length,4);assert.deepEqual(retry.questions,before.questions);assert.equal(retry.submitted_at,null);assert.equal(retry.restart_from,4);
  await assert.rejects(upload('original',0,4),/재응시/);await assert.rejects(call('submit',{token:'original',attempt_id:first.id,revision:0}),/재응시/);
  const wrong=await call('join',{code:room.code,student_no:'2512',student_name:'다른이름',token:'wrong',rate_key:'qa'});assert.ok(wrong.error);
  const resumed=await call('join',{code:room.code,student_no:'2512',student_name:'QA학생',token:'resumed',rate_key:'qa'});assert.equal(resumed.id,first.id);assert.equal(resumed.resumed,true);
  await assert.rejects(call('attempt',{token:'original'}),/응시 정보/);
  for(let i=4;i<10;i++)await upload('resumed',1,i);
  await upload('resumed',1,4); // Safe duplicate after a lost acknowledgement.
  await call('submit',{token:'resumed',attempt_id:first.id,revision:1});
  const final=await call('attempt',{token:'resumed'});assert.equal(final.answers.length,10);assert.ok(final.submitted_at);
  await identity(teacher);const actual=(await call('room',{id:room.id})).attempts[0];assert.equal(actual.score,null);assert.equal(actual.reviewed_at,null);
  await call('reset',{id:first.id,restart_from:8});assert.equal((await call('history',{id:first.id})).length,2);
  await assert.rejects(call('reset',{id:first.id,restart_from:9}),/앞 문항/);assert.equal((await call('history',{id:first.id})).length,2,'failed retry is atomic');
  assert.equal((await call('audio',{id:first.id,question_no:0})).audio,(await call('history_audio',{id:history[0].id,question_no:0})).audio);
  console.log('PASS: PostgreSQL retry from selected question, byte-identical history/prefix, fixed random cues, legacy number repair, token recovery, stale upload/submit rejection, owner authorization, idempotent migration/upload, final submission, atomic rollback');
 }finally{await db.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
