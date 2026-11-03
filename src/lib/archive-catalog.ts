import projects from '@/data/project-records.json';
import records from '@/data/archive-records.json';
export const archiveKinds=['프로젝트 수업','차시·주제 수업','공유용 참고자료'] as const;
export type ArchiveKind=typeof archiveKinds[number];
export type ArchiveDocument={slug:string;title:string;summary:string;subject:string;target:string;year:string;semester:string;lessonDate:string;kind:ArchiveKind;tags:string[];body:string;href:string;attachment:string;updatedAt?:string};
const topics:Record<string,string[]>={
 'china-career':['언어','문화','기업·경제','진로'],'namdo-food':['언어','문화','음식','홍보·제작'],'taiwan-guide':['언어','문화','여행','홍보·제작'],'china-business-trip':['언어','문화','여행','진로'],
 'favorite-food-poster':['언어','음식','홍보·제작'],'introduce-my-photo':['언어','자기표현'],'introduce-my-favorite':['언어','자기표현'],'china-speed':['문화','기업·경제','진로','읽기·논술'],
 '2024-1-taste':['언어','문화','음식'],'2024-2-jigsaw':['문화','기업·경제'],'2025-1-known-words':['언어','어휘·발음'],'2025-2-travel':['언어','문화','여행','진로'],'2026-2-reflection':['문화','진로','읽기·논술'],'2025-1-festivals':['문화','명절'],'2025-1-dates':['언어','어휘·발음'],'2026-2-eating-mindmap':['언어','음식'],'2026-1-marketing-questions':['문화','기업·경제','읽기·논술']};
const times:Record<string,[string,string,string]>={'china-career':['2024','2','2024-09-06'],'namdo-food':['2024','1','2024-05-08'],'taiwan-guide':['2026','2',''],'china-business-trip':['2025','2',''],'china-speed':['2026','2','']};
export function staticArchiveDocuments():ArchiveDocument[]{return [
 ...projects.map(p=>{const t=times[p.id]??['','',''];return {slug:p.id,title:p.title,summary:p.summary,subject:p.subject,target:p.target,year:t[0],semester:t[1],lessonDate:t[2],kind:(['introduce-my-photo','introduce-my-favorite','favorite-food-poster','china-speed'].includes(p.id)?'차시·주제 수업':'프로젝트 수업') as ArchiveKind,tags:topics[p.id]??[],body:'',href:`/research/projects/${p.id}`,attachment:''};}),
 ...records.map(r=>({slug:r.id,title:r.title,summary:r.summary,subject:'공유용 재구성 참고자료',target:'고등학교 중국어 수업',year:r.semester.slice(0,4),semester:r.semester.includes('1학기')?'1':'2',lessonDate:'',kind:'공유용 참고자료' as ArchiveKind,tags:topics[r.id]??[],body:'',href:`/research/archive/${r.id}`,attachment:r.file}))];}
export function archiveTimeLabel(d:ArchiveDocument){return d.lessonDate||(d.year?`${d.year}년${d.semester?` ${d.semester}학기`:''}`:'수업 시기 확인 중');}
