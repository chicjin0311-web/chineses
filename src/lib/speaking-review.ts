import {sortByStudentNo} from './speaking-results';

type ReviewAttempt={id:string;student_no:string;submitted_at:string|null;reviewed_at:string|null};

// Use the latest saved records, never a filtered or stale list from the screen.
export async function saveReviewAndResolve<T extends ReviewAttempt>(
 currentId:string,
 save:()=>Promise<unknown>,
 reload:()=>Promise<T[]>,
){
 await save();
 let attempts:T[];
 try{attempts=await reload();}
 catch{throw new Error('점수는 저장했지만 학생 목록을 새로 불러오지 못했습니다. 현재 화면에서 새로고침 후 다시 확인해 주세요.');}
 const saved=attempts.find(a=>a.id===currentId);
 if(!saved?.reviewed_at)throw new Error('저장 결과를 확인하지 못해 다음 학생으로 이동하지 않았습니다. 새로고침 후 채점 상태를 확인해 주세요.');
 const pending=sortByStudentNo(attempts.filter(a=>a.id!==currentId&&!!a.submitted_at&&!a.reviewed_at));
 return {saved,next:pending[0]??null,remaining:pending.length};
}
