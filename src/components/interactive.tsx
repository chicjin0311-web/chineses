'use client';
import { useEffect, useRef, useState } from 'react';
import { Bookmark, Check, Volume2, RotateCcw, Printer } from 'lucide-react';
export function useSaved() {
  const [saved,setSaved]=useState<string[]>([]);
  useEffect(()=>{try{const value=JSON.parse(localStorage.getItem('hyejin-saved')||'[]');if(Array.isArray(value))setSaved(value.filter(x=>typeof x==='string'));}catch{}},[]);
  function toggle(slug:string){setSaved(prev=>{const next=prev.includes(slug)?prev.filter(s=>s!==slug):[...prev,slug];try{localStorage.setItem('hyejin-saved',JSON.stringify(next));}catch{}return next;});}
  return {saved,toggle};
}
export function SaveButton({slug}:{slug:string}) {
  const {saved,toggle}=useSaved(); const active=saved.includes(slug);
  return <button className={`button soft ${active?'is-saved':''}`} aria-pressed={active} onClick={()=>toggle(slug)}>{active?<Check size={16}/>:<Bookmark size={16}/>} {active?'담아 두었어요':'자료 담기'}</button>;
}
export function SpeakButton({text,label='발음 듣기'}:{text:string;label?:string}) {
  const [message,setMessage]=useState('');
  useEffect(()=>()=>{if('speechSynthesis' in window) window.speechSynthesis.cancel();},[]);
  function speak(){
    if(!('speechSynthesis' in window)){setMessage('이 브라우저는 음성 읽기를 지원하지 않아요.');return;}
    window.speechSynthesis.cancel(); const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-CN';utterance.rate=.75;
    const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('zh')); if(voice)utterance.voice=voice;
    utterance.onerror=()=>setMessage('중국어 음성을 사용할 수 없어요. 기기의 음성 설정을 확인해 주세요.');
    utterance.onend=()=>setMessage(''); window.speechSynthesis.speak(utterance);
  }
  return <span className="speech-control"><button className="icon-button" aria-label={label} title={label} onClick={speak}><Volume2 size={18}/></button>{message&&<span className="speech-message" role="status">{message}</span>}</span>;
}
export function DailyCard(){
  const [flipped,setFlipped]=useState(false);
  return <div className="daily-card"><div className="daily-card-top"><span>오늘의 한마디</span><SpeakButton text="慢慢来"/></div><div className="daily-expression" lang="zh-CN">慢慢来</div><p className="pinyin">Màn man lái</p><p className="daily-meaning">천천히 해도 괜찮아.</p><div className="daily-line"/><p className="daily-foot">작은 한마디가 쌓여<br/>더 넓은 세상으로 이어져요.</p><button className="text-button" onClick={()=>setFlipped(!flipped)}><RotateCcw size={13}/>{flipped?'설명 접기':'어떻게 쓰나요?'}</button>{flipped&&<p className="daily-tip">서두르지 말라고 다정하게 말할 때 써요. 두 번째 慢은 보통 가볍게 읽어요.</p>}</div>;
}
export function PrintButton(){return <button className="button soft" onClick={()=>window.print()}><Printer size={16}/>인쇄하기</button>;}
export function NoteEditor({storageKey='general',label='오늘 배운 한마디',placeholder='기억하고 싶은 중국어, 궁금한 점을 자유롭게 적어 보세요.'}:{storageKey?:string;label?:string;placeholder?:string}) {
  const [value,setValue]=useState('');const [status,setStatus]=useState('');
  useEffect(()=>{try{setValue(localStorage.getItem(`hyejin-note-${storageKey}`)||'');}catch{}},[storageKey]);
  function save(){try{localStorage.setItem(`hyejin-note-${storageKey}`,value);setStatus('이 기기의 브라우저에 저장했어요.');}catch{setStatus('저장 공간을 사용할 수 없어요. 내용을 복사해 보관해 주세요.');}}
  return <div className="note-editor"><label htmlFor={`note-${storageKey}`}>{label}</label><textarea id={`note-${storageKey}`} value={value} placeholder={placeholder} onChange={e=>{setValue(e.target.value);setStatus('아직 저장하지 않은 내용이 있어요.');}} rows={8}/><div className="note-actions"><span className="muted" role="status">{status || '노트는 이 기기에만 저장됩니다.'}</span><button className="button primary" onClick={save}><Check size={16}/>노트 저장</button></div></div>;
}
