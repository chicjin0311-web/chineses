'use client';
import {createClient,type SupabaseClient} from '@supabase/supabase-js';

let client:SupabaseClient|null=null;
// One browser client prevents concurrent URL/session processing during remounts.
export function teacherAuth(){
 if(typeof window==='undefined')throw new Error('브라우저에서 로그인해 주세요.');
 if(client)return client;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new Error('로그인 연결 설정을 확인하세요.');
 client=createClient(url,key,{auth:{storageKey:'speaking-teacher-auth',flowType:'implicit',detectSessionInUrl:true,persistSession:true,autoRefreshToken:true}});
 return client;
}

export function authErrorMessage(error:unknown){
 const text=error instanceof Error?error.message:String(error);
 if(/rate.limit|too many|over_email_send_rate_limit/i.test(text))return '인증 메일 발송 한도에 도달했습니다. 재발송을 반복하지 마세요. 아직 사용하지 않은 메일이 있으면 아래에 입력할 수 있습니다. 이미 인증 링크를 눌렀다면 인증 후 열린 페이지의 전체 주소로 로그인을 복구할 수 있습니다.';
 if(/expired|invalid.*token|otp_expired|invalid.*otp/i.test(text))return '이 인증 링크는 만료되었거나 이미 사용됐습니다. 이미 링크를 눌렀다면 인증 후 열린 페이지의 전체 주소(# 뒤 내용 포함)를 아래에 붙여 넣어 보세요. 해당 주소를 닫았다면 새 인증 메일이 필요합니다.';
 return text;
}

export type AuthInput = {kind:'otp';token:string}|{kind:'hash';token:string;type:'email'|'signup'|'magiclink'}|{kind:'session';access_token:string;refresh_token:string};
export function parseAuthInput(input:string,projectUrl:string,siteOrigin:string):AuthInput{
 const value=input.trim();
 if(/^\d{6,10}$/.test(value))return {kind:'otp',token:value};
 let link:URL;try{link=new URL(value);}catch{throw new Error('이메일의 인증번호 또는 인증 링크 전체를 입력하세요.');}
 const project=new URL(projectUrl);
 if(link.origin===project.origin&&link.pathname==='/auth/v1/verify'){
  const token=link.searchParams.get('token')||link.searchParams.get('token_hash'),type=link.searchParams.get('type');
  if(token&&(type==='email'||type==='signup'||type==='magiclink'))return {kind:'hash',token,type};
 }
 const allowedOrigins=[siteOrigin,'https://chineses.vercel.app','http://localhost:3000','http://127.0.0.1:3000'];
 if(allowedOrigins.includes(link.origin)){
  const hash=new URLSearchParams(link.hash.slice(1));
  if(hash.has('error'))throw new Error('해당 주소는 인증 실패 화면입니다. 새 인증 메일이 필요합니다.');
  const access_token=hash.get('access_token'),refresh_token=hash.get('refresh_token');
  if(access_token&&refresh_token)return {kind:'session',access_token,refresh_token};
 }
 throw new Error('인증 정보가 없는 주소입니다. 이메일의 인증 링크 또는 인증 직후 열린 페이지의 전체 주소를 입력하세요.');
}

export async function verifyTeacherInput(input:string,email:string){
 const c=teacherAuth(),parsed=parseAuthInput(input,process.env.NEXT_PUBLIC_SUPABASE_URL!,location.origin);
 const result=parsed.kind==='otp'?await c.auth.verifyOtp({email,token:parsed.token,type:'email'}):parsed.kind==='hash'?await c.auth.verifyOtp({token_hash:parsed.token,type:parsed.type}):await c.auth.setSession({access_token:parsed.access_token,refresh_token:parsed.refresh_token});
 if(result.error)throw result.error;
 const {data,error}=await c.auth.getUser();
 if(error||!data.user)throw error||new Error('로그인 정보를 확인하지 못했습니다.');
 if(data.user.email?.toLowerCase()!==email.trim().toLowerCase()){
  await c.auth.signOut({scope:'local'});throw new Error('입력한 이메일과 인증 링크의 계정이 다릅니다. 본인 이메일의 인증 링크를 사용하세요.');
 }
 return result.data.session;
}
