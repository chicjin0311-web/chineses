import projects from '@/data/project-records.json';
import records from '@/data/archive-records.json';
import learning from '@/data/learning-details.json';
import archiveLearning from '@/data/archive-learning-details.json';
import rubrics from '@/data/china-speed-rubrics.json';
import {staticArchiveDocuments} from './archive-catalog';
import {careerReadingBody} from './career-reading';

function section(title:string,text:string|string[]){return `## ${title}\n\n${Array.isArray(text)?text.map(s=>`- ${s}`).join('\n'):text}`;}
export function editableArchiveDocuments(){return staticArchiveDocuments().map(d=>{
 const p=projects.find(p=>p.id===d.slug),r=records.find(r=>r.id===d.slug);
 const l= p?learning[p.id as keyof typeof learning]:archiveLearning[d.slug as keyof typeof archiveLearning];
 const blocks:string[]=[];
 if(p)blocks.push(section('수업 시기·목표',`${p.period}\n${p.goal}`));
 if(r)blocks.push(section('공유 자료 안내','AI가 수업 활동을 바탕으로 재구성한 참고 자료입니다. 선생님이 만든 원본 학습지가 아닙니다.'));
 if(l){blocks.push(section('언어 학습목표',l.language),section('문화 학습목표',l.culture));
 blocks.push(section('중국어 핵심표현',l.expressions.map(e=>`${e.zh}\n${e.pinyin}\n${e.meaning}\n활용: ${e.usage}\n근거: ${e.origin}`).join('\n\n')));
 blocks.push(section('언어·문화 성취기준과 연결',l.standards.map(s=>`${s.domain} · ${s.curriculum}\n${s.codes.join(' / ')}\n${s.focus}\n활동 연결: ${s.connection}\n기준 출처: ${s.url}`).join('\n\n')));
 blocks.push(section('배움 확인',l.checks),l.note,l.status);}
 if(p)blocks.push(section('수업의 흐름',p.steps),section('결과물',p.outcomes));
 if(r)blocks.push(section('활동',r.activities));
 if(d.slug==='china-career')blocks.push(careerReadingBody);
 if(d.slug==='china-speed'){
 blocks.push(section('서·논술형 채점기준표','2026년 2학기 중국문화 자료의 두 영역을 전사했습니다. 평가계획 전체는 공개하지 않았습니다.'));
 for(const rubric of rubrics)blocks.push(section(rubric.title,`| 채점 요소 | 수행 특성 | 점수 |\n| --- | --- | --- |\n${rubric.rows.map(r=>`| ${r.criterion} | ${r.description} | ${r.score} |`).join('\n')}`));
 blocks.push('원문에 없는 점수 구간은 추가하지 않았습니다. 학습지는 논술 500자 내외로 안내하지만 채점표는 글의 완결성을 400자 이상 10점 / 300자 이상 5점으로 기재합니다. 실제 적용 전에 확인해야 합니다. 미참여·미제출 및 학적 변동 처리는 포함하지 않았습니다.');}
 if(p)blocks.push(section('학습지와 수업자료','원본 학습지는 선생님이 첨부할 예정입니다. 현재 대체 학습지는 연결하지 않았습니다.'),section('정리 근거와 확인 범위',`${p.source}\n${p.evidence}\n${p.notes}`));
 if(r)blocks.push(section('정리 근거와 확인 범위',`${r.source}\n${r.evidence}\n${r.note}`));
 return {...d,body:blocks.filter(Boolean).join('\n\n')};
 });}
