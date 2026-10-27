import { NotebookPen } from 'lucide-react';
import { NoteEditor } from '@/components/interactive';
export const metadata={title:'나의 학습 노트'};
export default function Notebook(){return <div className="page"><div className="page-intro"><p className="eyebrow">한마디씩, 내 것으로</p><h1>오늘의 배움을 남겨요.</h1><p>새로 배운 단어, 기억하고 싶은 표현, 다음 시간에 물어볼 것까지.</p></div><div className="notebook-banner"><NotebookPen size={23}/><span>이 노트는 현재 브라우저에만 저장돼요. 다른 기기와 공유되지 않으니, 중요한 내용은 따로 복사해 두세요.</span></div><NoteEditor/></div>;}
