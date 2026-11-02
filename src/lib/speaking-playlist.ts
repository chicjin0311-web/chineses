export type PlaylistState={phase:'idle'|'loading'|'playing'|'paused'|'ended'|'error';question:number|null;position:number;total:number;message?:string};
type Player=Pick<HTMLAudioElement,'src'|'currentTime'|'play'|'pause'|'load'|'removeAttribute'|'onended'|'onerror'>;

// Reuse one media element across answers; never concatenate encoded audio bytes.
export function createAnswerPlaylist(player:Player,load:(question:number)=>Promise<string>,notify:(state:PlaylistState)=>void){
 let queue:number[]=[],index=0,version=0,wanted=false,loading=false,ready=false,disposed=false;
 const emit=(phase:PlaylistState['phase'],message?:string)=>{if(!disposed)notify({phase,question:queue[index]??null,position:queue.length?index+1:0,total:queue.length,message});};
 async function playReady(run:number){
  try{await player.play();if(run===version&&wanted)emit('playing');}
  catch{if(run===version){wanted=false;emit('paused','재생을 시작하지 못했습니다. 이어서 재생을 눌러 주세요.');}}
 }
 async function open(){
  const run=++version;ready=false;loading=true;player.pause();emit('loading');
  try{
   const url=await load(queue[index]);
   if(run!==version)return;
   player.src=url;player.currentTime=0;ready=true;loading=false;
   if(wanted)await playReady(run);else emit('paused');
  }catch{
   if(run===version){loading=false;wanted=false;emit('error','이 답변을 불러오지 못했습니다. 이어서 재생으로 다시 시도해 주세요.');}
  }
 }
 function stop(){version++;wanted=false;loading=false;ready=false;queue=[];index=0;player.pause();player.removeAttribute('src');player.load();emit('idle');}
 player.onended=()=>{
  if(!wanted||!queue.length)return;
  if(index+1<queue.length){index++;void open();}
  else{wanted=false;emit('ended');}
 };
 player.onerror=()=>{
  if(!queue.length)return;
  version++;loading=false;ready=false;wanted=false;player.pause();emit('error','음원을 재생하지 못했습니다. 이어서 재생으로 다시 시도해 주세요.');
 };
 return {
  start(questions:number[]){stop();queue=[...new Set(questions)].filter(n=>Number.isInteger(n)&&n>=0).sort((a,b)=>a-b);if(queue.length){wanted=true;void open();}},
  pause(){if(!queue.length||!wanted)return;wanted=false;player.pause();emit('paused');},
  resume(){if(!queue.length)return;wanted=true;if(loading){emit('loading');return;}if(ready)void playReady(version);else void open();},
  stop,
  dispose(){disposed=true;stop();player.onended=null;player.onerror=null;},
 };
}
