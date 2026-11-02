const studentNumbers=new Intl.Collator('ko',{numeric:true,sensitivity:'base'});

export function sortByStudentNo<T extends {student_no:string;id:string}>(attempts:T[]):T[]{
 return [...attempts].sort((a,b)=>studentNumbers.compare(a.student_no,b.student_no)||a.student_no.localeCompare(b.student_no)||a.id.localeCompare(b.id));
}

export function koreaTime(value:string|null|undefined){
 if(!value)return '';
 const date=new Date(value);
 if(Number.isNaN(date.getTime()))return '';
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date);
 const part=(type:string)=>parts.find(p=>p.type===type)?.value||'';
 return `${part('year')}-${part('month')}-${part('day')} ${part('hour')}:${part('minute')}:${part('second')}`;
}
