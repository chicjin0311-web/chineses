import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { learningThinking as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '답만 외웠는데, 왜 막힐까? — 논어', description: '学而不思则罔，思而不学则殆。 시험 공부에서 만나는 배움과 생각의 관계를 귀여운 3D 이야기로 살펴봅니다.' };

export default function LearningThinking() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 12 · 논어</p><h1>{lesson.title}</h1><p>답을 외운 토끼도, 감으로 풀던 고슴도치도 멈췄습니다. 조건이 바뀐 문제 앞에서 두 친구는 공부 방법을 돌아봅니다.</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 논어의 두 친구</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="교과서 원리와 문제를 비교하며 공부하는 토끼와 고슴도치 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-learning-thinking.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">교과서를 펼치고, 그림 속 원리와 문제를 비교하는 두 친구. 중국어 문장을 두 번 듣고, 더 느린 두 번째 낭독에 맞춰 따라 읽어 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>두 친구는 왜 막혔을까요?</h2><p>토끼는 답을 기억했지만, 왜 그렇게 푸는지는 충분히 따져 보지 않았습니다. 그래서 문제의 조건이 바뀌자 적용하기 어렵습니다. 고슴도치도 배운 원리를 확인하지 않은 채 감으로만 풀고 있었다는 것을 깨닫습니다.</p><p>친구들은 교과서를 펼쳐 원리를 확인하고, 그 원리가 문제에 어떻게 적용되는지 함께 설명해 보기로 합니다. 배운 내용을 스스로 따져 이해하고, 내 생각의 근거를 배움으로 채워 가는 과정입니다. 영상은 그 출발을 보여 줍니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">学 · xué</dt><dd>배우다. 지식과 경험을 익히다.</dd></div><div><dt lang="zh-CN">思 · sī</dt><dd>생각하다. 배운 내용과 이유를 따져 보다.</dd></div><div><dt lang="zh-CN">则 · zé</dt><dd>그러면, ~하면</dd></div><div><dt lang="zh-CN">罔 · wǎng / 殆 · dài</dt><dd>罔은 사리에 어둡고 갈피를 잡지 못하는 상태, 殆는 위태로운 상태를 뜻합니다.</dd></div></dl></section>
    <section className="classic-question"><h2>내 공부에 적용한다면?</h2><p>최근 틀린 문제 하나를 골라 보세요. 어떤 개념을 더 배워야 하는지, 이미 배운 내용 중 어떤 이유를 설명하지 못하는지 나누어 적어 봅시다.</p><p>교과서에서 근거를 찾은 뒤 “이 조건 때문에 이 원리를 적용했어”라고 친구에게 설명해 보세요. 조건 하나를 바꾸면 풀이도 달라지는지 함께 확인해 보아도 좋습니다.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source} — 공자의 말씀</p><p>배움과 생각이 서로를 보완해야 한다는 뜻을 담고 있습니다. 영상 속 시험 공부 장면은 원문의 의미를 오늘날 학생의 경험에 연결한 창작입니다.</p><p>『논어』 시리즈는 청록색 조끼 토끼와 보라색 옷 고슴도치를 고정 캐릭터로 이어갑니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
