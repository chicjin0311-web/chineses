import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { askAndLearn } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${askAndLearn.title} — 논어`, description: `${askAndLearn.chinese} ${askAndLearn.meaning} 귀여운 3D 친구들과 배우는 질문하는 용기.` };

export default function AskAndLearn() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 08 · 논어</p><h1>{askAndLearn.title}</h1><p>종이접기를 잘하는 어린 친구에게 배우는 토끼의 이야기.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 한국어 이야기와 중국어 명문장</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={askAndLearn.poster} aria-label="토끼가 고슴도치에게 배우며 명문장을 두 번 읽는 영상" aria-describedby="video-description"><source src={askAndLearn.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-ask-and-learn.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">모르는 접는 방법을 물어보는 토끼. 중국어 문장을 듣고 두 번째 읽기에 맞춰 함께 따라 해 보세요.</figcaption></figure>
    <a className="text-button" href={askAndLearn.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{askAndLearn.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{askAndLearn.pinyin}</p><p className="classic-meaning">{askAndLearn.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>토끼는 종이배를 접다가 모르는 부분을 만나요. 자신보다 어린 고슴도치가 잘하는 것을 보고, 부끄러워하지 않고 알려 달라고 부탁합니다.</p><p>‘하문(下问)’은 자신보다 지위가 낮거나 나이가 어린 사람에게 묻는다는 뜻이에요. 이 표현은 상대를 낮춰 보라는 말이 아니라, 배울 점이 있다면 나이나 지위 때문에 질문을 주저하지 않는 겸손한 태도를 이야기합니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">不 · bù</dt><dd>~하지 않다</dd></div><div><dt lang="zh-CN">耻 · chǐ</dt><dd>부끄럽게 여기다</dd></div><div><dt lang="zh-CN">下 · xià</dt><dd>여기서는 자신보다 아래의 지위나 어린 나이를 가리킴</dd></div><div><dt lang="zh-CN">问 · wèn</dt><dd>묻다</dd></div></dl></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>나보다 어린 친구나 동생에게 배울 수 있는 것은 무엇인가요?</p><p>잘하는 놀이, 새로운 앱 사용법, 종이접기처럼 서로 다른 장점을 떠올리고 ‘어떻게 하는지 알려 줄래?’라고 물어보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{askAndLearn.source} — 공자의 말씀</p><p>원문 중 발췌: <span lang="zh-CN">“敏而好学，不耻下问，是以谓之文也。”</span></p><p>공자가 공문자의 배움을 좋아하고 겸손하게 질문하는 태도를 설명한 대목입니다. 영상의 종이배 이야기는 문장의 뜻을 보여 주기 위해 창작했습니다.</p><a className="text-button" href={askAndLearn.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
