'use client';
import Link from 'next/link';
import {questionAudioUrl} from '@/lib/speaking-audio';
import { useEffect,useRef,useState } from 'react';
import { Headphones,Mic,Check,ArrowRight,Volume2,Square,ShieldCheck,BookOpen,Download,ExternalLink } from 'lucide-react';
type Q={text:string;instruction:string;image?:string;cue?:string};
type Attempt={id:string;title:string;student_no:string;student_name:string;questions:Q[];answers:{question_no:number}[];submitted_at:string|null;is_open:boolean};
async function api(body:Record<string,unknown>|FormData){const res=await fetch('/api/speaking',{method:'POST',headers:body instanceof FormData?{}:{'Content-Type':'application/json'},body:body instanceof FormData?body:JSON.stringify(body)});const data=await res.json();if(!res.ok)throw new Error(data.error||'저장하지 못했습니다.');return data;}
function pendingStore(mode:'get'|'put'|'delete',key:string,value?:unknown):Promise<any>{return new Promise((resolve,reject)=>{const open=indexedDB.open('speaking-pending',1);open.onupgradeneeded=()=>open.result.createObjectStore('audio');open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result;const tx=db.transaction('audio',mode==='get'?'readonly':'readwrite'),s=tx.objectStore('audio');const op=mode==='get'?s.get(key):mode==='put'?s.put(value,key):s.delete(key);let result:unknown;op.onsuccess=()=>{result=op.result;};tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=()=>{db.close();reject(tx.error);};};});}
export function SpeakingStudent(){
 const [attempt,setAttempt]=useState<Attempt|null>(null),[code,setCode]=useState(''),[no,setNo]=useState(''),[name,setName]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[phase,setPhase]=useState('ready'),[seconds,setSeconds]=useState(20),[blob,setBlob]=useState<Blob|null>(null),[duration,setDuration]=useState(0),[replays,setReplays]=useState(0);
 const questionPlayer=useRef<HTMLAudioElement|null>(null),playTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const recorder=useRef<MediaRecorder|null>(null),stream=useRef<MediaStream|null>(null),timer=useRef<ReturnType<typeof setInterval>|null>(null),stopping=useRef(false),started=useRef(0),mounted=useRef(true),utterance=useRef<SpeechSynthesisUtterance|null>(null);
 const index=attempt?.questions.findIndex((_,i)=>!attempt.answers.some(a=>a.question_no===i))??0;
 const question=attempt&&index>=0?attempt.questions[index]:null;
 const key=attempt?`${attempt.id}:${index}`:'';
 async function restore(){try{setAttempt(await api({action:'attempt'}));}catch{/* No active attempt is an ordinary initial state. */}}
 useEffect(()=>{mounted.current=true;void restore();return()=>{mounted.current=false;stopping.current=true;recorder.current?.state==='recording'&&recorder.current.stop();stream.current?.getTracks().forEach(t=>t.stop());if(timer.current)clearInterval(timer.current);questionPlayer.current?.pause();if(playTimer.current)clearTimeout(playTimer.current);window.speechSynthesis?.cancel();};},[]);
 useEffect(()=>{if(!key||index<0)return;setBlob(null);setPhase('ready');setReplays(0);setSeconds(20);let active=true;pendingStore('get',key).then(v=>{if(active&&v?.blob){setBlob(v.blob);setDuration(v.duration);setPhase('recorded');setError('아직 제출되지 않은 녹음이 있습니다. 저장을 다시 시도하세요.');}}).catch(()=>{});return()=>{active=false;};},[key,index]);
 useEffect(()=>{const prevent=(e:BeforeUnloadEvent)=>{if(phase==='recording'||blob){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',prevent);return()=>window.removeEventListener('beforeunload',prevent);},[phase,blob]);
 async function join(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{await api({action:'join',code,student_no:no,student_name:name});await restore();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 async function acquire(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw new Error('이 브라우저는 녹음을 지원하지 않습니다. Safari 또는 Chrome에서 링크를 직접 열어 주세요.');if(!stream.current||stream.current.getTracks().every(t=>t.readyState==='ended'))stream.current=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});}
 async function listen(){
  setError('');setBusy(true);setPhase('listening');
  const done=()=>{if(playTimer.current)clearTimeout(playTimer.current);if(!mounted.current)return;setPhase('heard');setReplays(v=>v+1);setBusy(false);};
  const fail=(message:string)=>{if(playTimer.current)clearTimeout(playTimer.current);if(!mounted.current)return;questionPlayer.current?.pause();setPhase('ready');setBusy(false);setError(message);};
  try{
   const url=questionAudioUrl(question!.text);
   if(url){
    questionPlayer.current?.pause();const player=new Audio(url);questionPlayer.current=player;
    player.onended=done;player.onerror=()=>fail('질문 음원을 불러오지 못했습니다. 인터넷 연결을 확인하고 다시 눌러 주세요.');
    playTimer.current=setTimeout(()=>fail('질문 재생이 지연되었습니다. 다시 눌러 주세요.'),20000);
    await player.play();return;
   }
   if(!window.speechSynthesis)throw new Error('이 수정 문항의 질문 음원이 아직 준비되지 않았습니다. 선생님께 알려 주세요.');
   const findVoice=()=>speechSynthesis.getVoices().find(v=>/^zh[-_]CN/i.test(v.lang));
   let voice=findVoice();
   if(!voice){await new Promise<void>(resolve=>{const onVoices=()=>{if(findVoice())finish();};const finish=()=>{clearTimeout(t);speechSynthesis.removeEventListener('voiceschanged',onVoices);resolve();};const t=setTimeout(finish,1500);speechSynthesis.addEventListener('voiceschanged',onVoices);});voice=findVoice();}
   if(!mounted.current)return;
   if(!voice)throw new Error('이 수정 문항은 별도 음원 준비가 필요합니다. 선생님께 알려 주세요. 기본 10문항은 기기 음성 설치 없이 재생됩니다.');
   const u=new SpeechSynthesisUtterance(question!.text);utterance.current=u;u.lang='zh-CN';u.voice=voice;u.rate=.85;u.onend=done;u.onerror=()=>fail('질문이 재생되지 않았습니다. 다시 눌러 주세요.');speechSynthesis.cancel();speechSynthesis.speak(u);
   playTimer.current=setTimeout(()=>{speechSynthesis.cancel();fail('질문 재생이 지연되었습니다. 다시 눌러 주세요.');},30000);
  }catch(e){fail((e as Error).message);}
 }

 function stop(){if(stopping.current)return;stopping.current=true;if(timer.current)clearInterval(timer.current);if(recorder.current?.state==='recording')recorder.current.stop();}
 async function record(){setError('');try{await acquire();stopping.current=false;const type=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported(t));const r=new MediaRecorder(stream.current!,{...(type?{mimeType:type}:{}),audioBitsPerSecond:48000});recorder.current=r;const chunks:BlobPart[]=[];r.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};r.onerror=()=>{setError('녹음 중 문제가 생겼습니다. 선생님께 재응시를 요청하세요.');stop();};r.onstop=async()=>{stream.current?.getTracks().forEach(t=>t.stop());if(!mounted.current)return;const b=new Blob(chunks,{type:r.mimeType});const d=Math.min(65,(Date.now()-started.current)/1000);setBlob(b);setDuration(d);setPhase('recorded');try{await pendingStore('put',key,{blob:b,duration:d});}catch{setError('기기 임시 저장을 사용할 수 없습니다. 페이지를 닫지 말고 바로 저장하세요.');}};r.start(250);started.current=Date.now();setSeconds(20);setPhase('recording');timer.current=setInterval(()=>{const left=Math.max(0,20-Math.floor((Date.now()-started.current)/1000));setSeconds(left);if(left===0)stop();},200);
  }catch(e){setError((e as Error).message);}}
 async function save(){if(!blob)return;setBusy(true);setError('');try{const f=new FormData();f.set('audio',blob,'answer');f.set('question_no',String(index));f.set('duration',String(duration));await api(f);await pendingStore('delete',key).catch(()=>{});setBlob(null);await restore();}catch(e){setError((e as Error).message+' 녹음은 유지됩니다. 다시 저장하세요.');}finally{setBusy(false);}}
 async function finish(){setBusy(true);setError('');try{await api({action:'submit'});await restore();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 return <div className="sp page"><div className="sp-top"><Link href="/tools">← 수업 도구</Link><Link href="/tools/speaking/teacher"><ShieldCheck size={16}/> 교사 관리</Link></div><div className="sp-heading"><span className="sp-badge">CHINESE SPEAKING · 4 · 5 · 6</span><h1>듣고, 생각하고,<br/><em>중국어로 말해요.</em></h1><p>교과서 속 질문과 간화자로 진행하는 말하기 평가</p></div>
 <section className="sp-card sp-student-handbook" aria-labelledby="student-handbook-title">
 <div className="sp-row"><h2 id="student-handbook-title"><BookOpen size={21} aria-hidden="true"/>학생 안내서</h2><div className="sp-handbook-links"><a href="/speaking/student-guide.pdf?v=final-10" target="_blank" rel="noopener noreferrer"><ExternalLink size={15} aria-hidden="true"/>PDF 열기<span className="sp-sr-only"> (새 탭)</span></a><a href="/speaking/student-guide.pdf?v=final-10" download="중국어_말하기평가_학생안내서.pdf" target="_blank" rel="noopener noreferrer"><Download size={15} aria-hidden="true"/>PDF 내려받기</a></div></div>
 <p>4·5·6단원 10문항 말하기 평가 안내서입니다. 참여코드는 선생님이 안내한 코드를 사용하세요.</p>
 <details><summary>화면에서 안내서 읽기</summary><div className="sp-handbook-content">
 <h3>접속과 학번 입력</h3><p>학생 계정이나 이메일 인증 없이 참여코드·학번·이름을 입력합니다. 휴대전화의 Chrome·Safari에서 이 페이지를 직접 여세요.</p><p><strong>학번은 학년 1자리 + 반 1자리 + 번호 2자리입니다.</strong><br/>2학년 1반 1번 → 2101 · 2학년 1반 12번 → 2112 · 2학년 2반 1번 → 2201<br/>번호가 한 자리이면 앞에 0을 붙이세요.</p>
 <h3>문항 구성과 평가 준비</h3><p>1~2번은 구매, 3번은 가격, 4번은 결제, 5번은 계획, 6~8번은 듣고 반응하기, 9~10번은 음식·음료 문항입니다. 1번과 2번에서는 각각 세 후보 중 하나를 제시합니다.</p><p>4·5·6단원의 질문과 관련 표현을 익히고, 단어·가격이 달라져도 답할 수 있도록 준비하세요. 휴대전화와 이어폰을 준비하고 인터넷 연결·배터리·소리 크기를 확인하세요. 별도 연습 문항 없이 바로 평가합니다.</p>
 <h3>듣고 녹음하고 저장하기</h3><ol><li>먼저 「답변 안내」를 확인하세요. 키워드가 있으면 제시된 간화자·숫자를 활용하고, 키워드가 없는 문항은 질문을 듣고 질문에 맞게 중국어로 답하세요. 키워드는 학생마다 다를 수 있습니다.</li><li>「질문 듣기」를 누르세요. 문항마다 <strong>최대 2회</strong> 들을 수 있습니다.</li><li>질문 재생이 끝나면 「답변 녹음하기」를 누르고 마이크 사용을 허용하세요. 중국어로 답한 뒤 「녹음 마치기」를 누르세요. <strong>최대 20초</strong> 후 자동 종료됩니다.</li><li>「녹음 저장하고 다음으로」를 누르고 다음 문항이 나올 때까지 기다리세요. 다시 녹음하는 버튼은 없으며 저장한 답변은 바꿀 수 없습니다.</li></ol>
 <h3>마지막 제출 확인</h3><p>기본 평가는 10문항입니다. 모든 문항의 녹음을 저장한 뒤 <strong>「평가 제출 완료하기」</strong>를 누르세요. <strong>「평가 제출이 완료되었어요」</strong>와 전체 문항의 녹음 제출 완료 표시를 확인한 뒤 종료하세요.</p>
 <h3>평가 기준과 오류 안내</h3><p>선생님이 녹음을 듣고 질문을 이해하여 그에 맞게 반응했는지를 종합적으로 평가합니다. 짧은 답변도 필요한 의미를 전달하면 인정하며 정답 수를 점수로 단순 환산하지 않습니다.</p><p>질문 파악 및 반응 50점 만점: 50 적절하게 · 40 비교적 적절하게 · 30 대체적으로 · 20 부분적으로 · 10 제한적으로 반응. 세부 오류나 일부 미흡한 점이 있으면 해당 수준 점수에서 5점 감점할 수 있습니다.</p><p>소리가 안 들리거나 녹음·저장이 안 되면 즉시 선생님께 알리세요. 저장 오류가 나면 페이지를 닫지 말고 다시 저장하세요. 임의로 새로고침하거나 다른 학번으로 재접속하지 마세요. 녹음 중에는 현재 화면을 유지하세요.</p>
 </div></details></section>
 {error&&<div role="alert" className="sp-alert">{error}</div>}
 {!attempt?<div className="sp-entry"><section className="sp-card"><div className="sp-card-title"><Headphones/><h2>평가에 참여하기</h2></div><p>선생님이 알려 준 참여코드와 학생 정보를 입력하세요.</p><form onSubmit={join}><label>평가 참여코드<input required maxLength={8} autoCapitalize="characters" placeholder="8자리 코드" value={code} onChange={e=>setCode(e.target.value.toUpperCase().replace(/\s/g,''))}/></label><p id="student-number-guide" className="sp-auth-help">학번은 학년 1자리 + 반 1자리 + 번호 2자리로 입력하세요. 예: 2학년 1반 1번 → 2101, 2학년 1반 12번 → 2112</p><div className="sp-two"><label>학번<input required maxLength={20} placeholder="예: 2101" aria-describedby="student-number-guide" value={no} onChange={e=>setNo(e.target.value)}/></label><label>이름<input required maxLength={30} autoComplete="name" placeholder="이름" value={name} onChange={e=>setName(e.target.value)}/></label></div><button className="sp-primary" disabled={busy}>{busy?'연결 중…':'평가 시작하기'}<ArrowRight size={18}/></button></form></section><aside className="sp-guide"><BookOpen size={30}/><h2>준비한 만큼,<br/>차분하게 답하세요.</h2><ol><li>질문은 중국어 음성으로 들려요.</li><li>답변 안내를 확인하고 질문에 맞게 답해요.</li><li>짧아도 의미가 분명하면 괜찮아요.</li><li>녹음을 저장한 후 다음 문항으로 넘어가요.</li></ol><small>이어폰을 사용하세요. 답변 녹음 시 마이크 권한이 필요합니다.<br/>녹음은 담당 교사만 확인하며, 실제 응답 내용은 자동 채점하지 않습니다.</small></aside></div>
 :attempt.submitted_at?<section className="sp-card sp-done"><span className="sp-complete"><Check size={36}/></span><h2>평가 제출이 완료되었어요.</h2><p>{attempt.student_no} {attempt.student_name} · {attempt.title}</p><strong>{attempt.questions.length}개 중 {attempt.answers.length}개 녹음 제출 완료</strong><p>이제 페이지를 닫아도 괜찮아요.</p></section>
 :<section className="sp-card sp-exam"><div className="sp-exam-header"><span>{attempt.title}</span><span>{attempt.student_no} {attempt.student_name}</span></div><div className="sp-progress">{attempt.questions.map((_,i)=><span key={i} className={attempt.answers.some(a=>a.question_no===i)?'saved':i===index?'current':''}/>)}</div>
 {question?<><p className="sp-count">QUESTION {String(index+1).padStart(2,'0')} <span>/ {attempt.questions.length}</span></p><h2>질문을 듣고 중국어로 답하세요.</h2><div className="sp-answer-instruction"><strong>답변 안내</strong><p>{question.instruction}</p></div><div className="sp-stimulus">{question.image?<img src={question.image} alt="답변에 사용할 교과서 그림"/>:question.cue?<strong>{question.cue}</strong>:<div className="sp-sound"><Headphones size={58}/><span>질문을 듣고, 질문에 맞게 중국어로 답하세요.</span></div>}</div>
 {!attempt.is_open?<div className="sp-alert">평가가 닫혀 있습니다. 선생님께 문의하세요.</div>:<><div className="sp-actions"><button disabled={busy||phase==='recording'||!!blob||replays>=2} onClick={listen}><Volume2 size={18}/>{phase==='listening'?'질문 재생 중…':replays===0?'질문 듣기':`다시 듣기 (${Math.max(0,2-replays)}회)`}</button>{phase==='recording'?<button className="sp-recording" onClick={stop}><Square size={18}/>녹음 마치기 · {seconds}초</button>:<button className="sp-primary" disabled={busy||phase!=='heard'||!!blob} onClick={record}><Mic size={18}/>답변 녹음하기</button>}</div>{blob&&<div className="sp-save"><p>녹음이 끝났어요. 저장 후에는 답변을 바꿀 수 없습니다.</p><button className="sp-primary" disabled={busy} onClick={save}>{busy?'서버에 저장 중…':'녹음 저장하고 다음으로'}<ArrowRight size={18}/></button></div>}</>}
 <small>질문 음성은 합성 음성입니다. · 질문 최대 2회 듣기 · 답변 최대 20초 · 저장된 녹음 {attempt.answers.length}/{attempt.questions.length}<br/>별도 연습 문항 없이 바로 평가합니다. 기기 오류는 교사에게 알려 주세요.</small></>:<div className="sp-done"><Check size={36}/><h2>모든 문항의 녹음이 저장되었어요.</h2><p>마지막으로 제출 완료 버튼을 눌러 주세요.</p><button className="sp-primary" disabled={busy} onClick={finish}>평가 제출 완료하기</button></div>}
 </section>}
 <footer className="sp-footer">차곡차곡 중국어 교실 · 질문 파악 및 반응 평가</footer></div>;
}
