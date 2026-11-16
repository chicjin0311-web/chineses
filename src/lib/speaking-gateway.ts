type GatewayResult={data:any;error:{message:string;code?:string}|null;status?:number};
type Options={timeoutMs?:number;pause?:(ms:number)=>Promise<void>;onRetry?:(event:{action:string;status:number;code:string})=>void};

// Only operations already made idempotent by the database may be repeated.
// In particular, joining/creating/resetting must never be retried blindly.
const repeatable=new Set(['attempt','answer','submit','room','rooms','audio','history','history_audio','retry_info','trash_list']);
export async function speakingGateway(action:string,send:(signal:AbortSignal)=>PromiseLike<GatewayResult>,options:Options={}){
 const limit=options.timeoutMs??10000;
 for(let run=0;run<2;run++){
  const signal=AbortSignal.timeout(limit);
  let result:GatewayResult;
  try{result=await send(signal);}catch(e){result={data:null,error:{message:e instanceof Error?e.message:String(e),code:signal.aborted?'TIMEOUT':'FETCH_ERROR'},status:0};}
  if(!result.error){if(result.data?.error)throw new Error(result.data.error);return result.data;}
  const status=result.status??0,code=result.error.code??'';
  const temporary=signal.aborted||['TIMEOUT','FETCH_ERROR','57014','40001','40P01'].includes(code)||status>=500||status===429||status===0&&/fetch|network|abort|timeout/i.test(result.error.message);
  if(run===0&&repeatable.has(action)&&temporary){
   options.onRetry?.({action,status,code:signal.aborted?'TIMEOUT':code});
   await (options.pause??(ms=>new Promise(resolve=>setTimeout(resolve,ms))))(200+Math.floor(Math.random()*300));
   continue;
  }
  if(temporary)throw new Error('저장소 연결이 지연되었습니다. 녹음은 화면에 유지되니 잠시 후 다시 저장해 주세요.');
  throw new Error(result.error.message);
 }
 throw new Error('저장소 연결을 확인해 주세요.');
}
