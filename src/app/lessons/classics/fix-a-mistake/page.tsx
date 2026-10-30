import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { fixMistake } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${fixMistake.title} — 논어`, description: `${fixMistake.chinese} ${fixMistake.meaning} 귀여운 3D 토끼와 배우는 잘못을 고치는 용기.` };

export default function FixAMistake() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 06 · 논어</p><h1>{fixMistake.title}</h1><p>작은 실수를 알아차리고 다시 그려 보는 토끼의 용기.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 잘못을 고치는 태도</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={fixMistake.poster} aria-label="토끼가 잘못 그린 선을 고치며 이야기하는 영상" aria-describedby="video-description"><source src={fixMistake.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-fix-a-mistake.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">잘못 그린 선을 발견한 토끼. 지우고 다시 그리며, 잘못을 고치는 일을 두려워하지 않아요.</figcaption></figure>
    <a className="text-button" href={fixMistake.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{fixMistake.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{fixMistake.pinyin}</p><p className="classic-meaning">{fixMistake.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>토끼는 그림에서 잘못 그린 부분을 발견해요. 모른 척하거나 포기하지 않고, 직접 고쳐 봅니다. 고슴도치는 그런 토끼를 따뜻하게 응원해요.</p><p>이 문장은 잘못을 알게 되었을 때 고치기를 두려워하거나 꺼리지 말라는 뜻이에요. 영상은 그 태도를 작은 그림 실수로 보여 줍니다. 생활 속에서 잘못된 행동을 인정하고 바로잡는 일에도 연결할 수 있어요.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">过 · guò</dt><dd>잘못하다, 허물을 범하다</dd></div><div><dt lang="zh-CN">则 · zé</dt><dd>그러면, ~하면</dd></div><div><dt lang="zh-CN">勿惮 · wù dàn</dt><dd>두려워하거나 꺼리지 말라</dd></div><div><dt lang="zh-CN">改 · gǎi</dt><dd>고치다</dd></div></dl></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>내가 고칠 수 있는 작은 실수나 잘못된 행동은 무엇인가요?</p><p>틀린 글자를 다시 쓰기, 잘못 전한 정보를 바로잡기, 친구에게 한 말을 사과하기처럼 지금 할 수 있는 일을 떠올려 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{fixMistake.source} — 공자의 말씀</p><p>원문 중 발췌: <span lang="zh-CN">“过则勿惮改。”</span></p><p>영상 속 동물 친구들과 그림을 고치는 이야기는 문장의 뜻을 설명하기 위해 창작했습니다.</p><a className="text-button" href={fixMistake.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
