import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes, createHash } from 'node:crypto';
import ExcelJS from 'exceljs';
import {sortByStudentNo,koreaTime} from '@/lib/speaking-results';
import { speakingBank, validateBank, type AssignedQuestion } from '@/lib/speaking-bank';

export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=30;
const cache={'Cache-Control':'private, no-store'};
const cookie='speaking_attempt';
const allowed=['rooms','create','update','room','toggle','review','reset','audio','export','join','attempt','answer','submit'];
const studentActions=['join','attempt','answer','submit'];
function respond(data:unknown,status=200){return NextResponse.json(data,{status,headers:cache});}

export async function POST(req:NextRequest){
 try{
  const requestOrigin=req.headers.get('origin');
  const requestHost=req.headers.get('host')||new URL(req.url).host;
  if(!requestOrigin||new URL(requestOrigin).host!==requestHost) return respond({error:'다른 사이트에서는 요청할 수 없습니다.'},403);
  if(Number(req.headers.get('content-length')||0)>3_500_000) return respond({error:'녹음 파일이 너무 큽니다.'},413);
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,secret=process.env.SPEAKING_GATEWAY_SECRET;
  if(!url||!key||!secret) return respond({error:'평가 저장소 설정이 아직 완료되지 않았습니다.'},503);
  const contentType=req.headers.get('content-type')||'';
  let body:Record<string,any>;
  if(contentType.includes('multipart/form-data')){
   const f=await req.formData(),file=f.get('audio');
   if(!(file instanceof File)||file.size<100||file.size>1_800_000||!/^audio\/(webm|mp4|ogg|wav|mpeg)(;.*)?$/.test(file.type))return respond({error:'지원되는 녹음 파일이 아닙니다.'},400);
   body={action:'answer',attempt_id:f.get('attempt_id'),question_no:Number(f.get('question_no')),duration:Number(f.get('duration')),mime:file.type,audio:Buffer.from(await file.arrayBuffer()).toString('base64')};
  }else {const text=await req.text();if(text.length>3_300_000)return respond({error:'요청이 너무 큽니다.'},413);body=JSON.parse(text);}
  const action=body.action;
  if(!allowed.includes(action))return respond({error:'지원하지 않는 요청입니다.'},400);
  const authorization=req.headers.get('authorization');
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:authorization?{Authorization:authorization}:{}}});
  if(!studentActions.includes(action)){
   if(!authorization?.startsWith('Bearer '))return respond({error:'교사 로그인이 필요합니다.'},401);
   const {data,error}=await db.auth.getUser(authorization.slice(7));
   if(error||!data.user)return respond({error:'로그인이 만료되었습니다. 다시 로그인해 주세요.'},401);
  }
  const invoke=async(method:string,p:Record<string,unknown>)=>{
   const {data,error}=await db.rpc('speaking_gateway',{p_secret:secret,p_action:method,p});
   if(error)throw new Error(error.message);
   if(data?.error)throw new Error(data.error);
   return data;
  };
  let token=req.cookies.get(cookie)?.value||'';
  let p:Record<string,unknown>={};
  if(action==='join'){
   if(!/^[A-Z0-9]{8}$/.test(String(body.code).toUpperCase())||!/^[\p{L}\p{N} -]{1,20}$/u.test(body.student_no)||typeof body.student_name!=='string'||!body.student_name.trim()||body.student_name.length>30)return respond({error:'참여코드, 학번, 이름을 확인하세요.'},400);
   token=randomBytes(32).toString('hex');
   p={code:String(body.code).toUpperCase(),student_no:body.student_no.trim(),student_name:body.student_name.trim(),token,rate_key:createHash('sha256').update(secret+(req.headers.get('x-vercel-forwarded-for')||req.headers.get('x-forwarded-for')||'local').split(',')[0]).digest('hex')};
  } else if(action==='create'||action==='update'){
   const questions=body.questions??speakingBank;
   if(!validateBank(questions)||typeof body.title!=='string'||!body.title.trim()||body.title.length>80)return respond({error:'평가 이름과 문항을 확인하세요.'},400);
   p={id:body.id,title:body.title.trim(),questions,code:randomBytes(4).toString('hex').toUpperCase()};
  } else if(action==='answer'){
   if(typeof body.attempt_id!=='string'||!body.attempt_id.trim()||body.attempt_id.length>64)return respond({error:'평가 문항이 갱신되었습니다. 새로고침한 뒤 현재 문항을 다시 확인해 주세요.'},409);
   if(!Number.isInteger(body.question_no)||!Number.isFinite(body.duration)||body.duration<0.1||body.duration>65)return respond({error:'녹음 정보를 확인하세요.'},400);
   p={token,attempt_id:body.attempt_id,question_no:body.question_no,duration:body.duration,mime:body.mime,audio:body.audio};
  } else if(action==='attempt'||action==='submit'){p={token};}
  else if(action==='review'){
   if(!Array.isArray(body.answers)||body.answers.length>20||!Number.isInteger(body.score)||![10,15,20,25,30,35,40,45,50].includes(body.score)||typeof body.comment!=='string'||body.comment.length>2000)return respond({error:'채점 내용을 확인하세요.'},400);
   p={id:body.id,score:body.score,comment:body.comment,answers:body.answers};
  } else {p={id:body.id,question_no:body.question_no,open:body.open};}
  const data=await invoke(action==='export'?'room':action,p);
  if(action==='join'){const out=respond({ok:true});out.cookies.set(cookie,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/api/speaking',maxAge:60*60*24*7});return out;}
  if(action==='attempt'){
   data.questions=data.questions.map(({expected,source,title,...q}:AssignedQuestion)=>q);
   return respond(data);
  }
  if(action==='audio')return new NextResponse(Buffer.from(data.audio,'base64'),{headers:{...cache,'Content-Type':data.mime,'Content-Disposition':'inline'}});
  if(action==='room'||action==='export')data.attempts=sortByStudentNo(data.attempts);
  if(action==='export'){
   if(body.attempt_id!==undefined){
    data.attempts=data.attempts.filter((a:any)=>a.id===body.attempt_id);
    if(!data.attempts.length)return respond({error:'이 평가에서 해당 학생의 응시를 찾을 수 없습니다.'},404);
   }
   const book=new ExcelJS.Workbook();book.creator='차곡차곡 중국어 교실';book.created=new Date();
   const summary=book.addWorksheet('성적'),detail=book.addWorksheet('문항별 기록'),guide=book.addWorksheet('평가 안내');
   summary.columns=[{header:'학번',key:'no',width:24},{header:'이름',key:'name',width:16},{header:'저장 문항',key:'saved',width:13},{header:'제출 상태',key:'state',width:15},{header:'최종 점수(50)',key:'score',width:17},{header:'종합 판단·감점 근거',key:'comment',width:60},{header:'제출 시각(한국)',key:'submitted',width:25},{header:'채점 시각(한국)',key:'reviewed',width:25},{header:'학생 답변 모아보기',key:'student_link',width:30}];
   detail.columns=[{header:'학번',key:'no',width:24},{header:'이름',key:'name',width:16},{header:'문항',key:'question',width:8},{header:'중국어 질문',key:'text',width:40},{header:'제시 자료',key:'cue',width:35},{header:'인정 답변 예시',key:'expected',width:50},{header:'출처',key:'source',width:32},{header:'판단',key:'rating',width:15},{header:'교사 메모',key:'note',width:45},{header:'녹음 초',key:'duration',width:12},{header:'학생 답변(음원 링크)',key:'link',width:30},{header:'답변 저장 상태',key:'answer_state',width:20},{header:'최종 제출 시각(한국)',key:'submitted',width:25}];
   const date=koreaTime;
   for(const a of data.attempts){
    const studentUrl=new URL('/tools/speaking/teacher',req.url);studentUrl.searchParams.set('room',data.room.id);studentUrl.searchParams.set('attempt',a.id);
    const studentLink={text:'학생 답변 모아보기 (교사 로그인)',hyperlink:studentUrl.href};
    summary.addRow({no:a.student_no,name:a.student_name,saved:`${a.answers.length}/${a.questions.length}`,state:a.reviewed_at?'채점 완료':a.submitted_at?'채점 대기':'응시 중',score:a.score??null,comment:a.comment,submitted:date(a.submitted_at),reviewed:date(a.reviewed_at),student_link:studentLink});
    a.questions.forEach((q:AssignedQuestion,i:number)=>{const b=a.answers.find((x:any)=>x.question_no===i);detail.addRow({no:a.student_no,name:a.student_name,question:i+1,text:q.text,cue:q.cue||(q.image?.startsWith('data:')?'교사 업로드 사진':q.image)||'자유 응답',expected:q.expected,source:q.source,rating:b?.rating||'미채점',note:b?.note||'',duration:b?.duration??null,link:b?{text:`${i+1}번 답변 듣기 (학생 모아보기)`,hyperlink:studentUrl.href}:'녹음 없음',answer_state:b?'음원 저장됨':'녹음 없음',submitted:date(a.submitted_at)});});
   }
   guide.addRows([['평가',data.room.title],['채점','음원을 듣고 교사가 확정한 점수입니다. 자동 음성 채점은 하지 않습니다.'],['점수','50·40·30·20·10점을 기본으로, 별도 미흡함은 근거를 적고 5점 감점할 수 있습니다.'],['중복 감점','등급 하향에 사용한 동일한 오류를 다시 감점하지 않습니다.'],['학생 답변','학생의 실제 답변은 음원입니다. 자동 받아쓰기는 제공하지 않으며, 인정 답변 예시는 학생이 말한 내용이 아닙니다.'],['음원','학생 답변(음원 링크)을 누르면 교사 로그인 후 해당 학생의 모든 답변을 듣습니다. 음원 파일은 엑셀에 포함되지 않습니다.'],['제출 시각','모든 문항 녹음을 마친 후 최종 제출한 시각이며 Asia/Seoul(한국 시간)로 표시합니다. 미제출은 빈칸입니다.'],['제시 자료','현재 기본 10문항은 그림 없이 간화자 핵심어·양사·금액을 제시합니다. 6~8번은 별도 핵심어 없이 듣고 반응합니다. 이전 응시의 제시 자료는 문항별 기록에서 확인합니다.']]);
   guide.getColumn(1).width=20;guide.getColumn(2).width=100;
   for(const s of [summary,detail]){s.views=[{state:'frozen',ySplit:1}];s.autoFilter={from:{row:1,column:1},to:{row:1,column:s.columnCount}};s.getRow(1).font={bold:true,color:{argb:'FFFFFFFF'}};s.getRow(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF28584B'}};s.eachRow(r=>{r.alignment={vertical:'top',wrapText:true};});}
   const buffer=await book.xlsx.writeBuffer();return new NextResponse(new Uint8Array(buffer),{headers:{...cache,'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Content-Disposition':`attachment; filename="speaking-results.xlsx"`}});
  }
  return respond(data);
 }catch(error){return respond({error:error instanceof Error?error.message:'처리하지 못했습니다. 다시 시도해 주세요.'},400);}
}
