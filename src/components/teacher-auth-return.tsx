'use client';
import {useEffect} from 'react';
import {teacherAuth} from '@/lib/teacher-auth';

// Supabase can fall back to Site URL (/). Capture its callback before navigation
// so opening the teacher page does not discard the one-time session fragment.
export function TeacherAuthReturn(){
 useEffect(()=>{
  if(location.pathname==='/tools/speaking/teacher')return;
  const hash=new URLSearchParams(location.hash.slice(1));
  if(!hash.has('access_token')&&!hash.has('error_description'))return;
  let active=true;
  const c=teacherAuth();
  c.auth.getSession().then(({data,error})=>{
   if(!active)return;
   const failure=error||hash.has('error_description')||!data.session;
   history.replaceState(null,'',location.pathname+location.search);
   location.replace('/tools/speaking/teacher'+(failure?'?auth_error=expired':''));
  }).catch(()=>{if(active)location.replace('/tools/speaking/teacher?auth_error=expired');});
  return()=>{active=false;};
 },[]);
 return null;
}
