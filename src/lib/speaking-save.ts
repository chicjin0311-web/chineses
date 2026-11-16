type SavedAttempt = {id:string;revision?:number;answers:{question_no:number}[]};

// An upload acknowledgement is sufficient to advance. A second request or local
// IndexedDB cleanup must never turn a successful upload into a blocked screen.
export async function saveAnswerWithRecovery<T extends SavedAttempt>(
 attempt:T, question:number, upload:()=>Promise<{submitted?:boolean}>, read:()=>Promise<T>
):Promise<T>{
 try{
  const result=await upload();
  if(result.submitted){
   const current=await read();
   if(current.id!==attempt.id||(current.revision??0)!==(attempt.revision??0))throw new Error('응시 정보가 변경되었습니다. 저장 상태를 확인해 주세요.');
   return current;
  }
 }catch(error){
  // The connection can fail after the database has committed the recording.
  // Confirm the exact attempt and revision before acknowledging that answer.
  try{
   const current=await read();
   if(current.id===attempt.id&&(current.revision??0)===(attempt.revision??0)&&current.answers.some(a=>a.question_no===question))return current;
  }catch{/* Keep the original error and the local recording. */}
  throw error;
 }
 return {...attempt,answers:attempt.answers.some(a=>a.question_no===question)?attempt.answers:[...attempt.answers,{question_no:question}]};
}
