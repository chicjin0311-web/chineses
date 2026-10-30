import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { kindness } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${kindness.title} — 논어`, description: `${kindness.chinese} ${kindness.meaning} 귀여운 3D 친구들과 배우는 배려.` };

export default function ThinkOfOthers() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 05 · 논어</p><h1>{kindness.title}</h1><p>내가 느낀 불편함을 떠올리며 친구를 배려하는 토끼.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 배려와 공감</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={kindness.poster} aria-label="토끼가 친구의 입장을 생각하며 배려하는 이야기" aria-describedby="video-description"><source src={kindness.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-think-of-others.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">함께 그림을 그리는 친구들. 내가 겪은 불편함을 친구에게 주지 않으려면 어떻게 행동하면 좋을까요?</figcaption></figure>
    <a className="text-button" href={kindness.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{kindness.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{kindness.pinyin}</p><p className="classic-meaning">{kindness.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>그림을 그리다가 방해를 받으면 속상할 수 있어요. 토끼는 자신의 마음을 떠올리고, 그림을 그리는 친구도 편안할 수 있도록 조심스럽게 행동합니다.</p><p>이 문장은 내가 싫어하는 일을 다른 사람에게도 하지 말라는 뜻이에요. 행동하기 전에 ‘내가 친구의 입장이라면 어떨까?’ 하고 생각해 보는 것이 배려의 시작입니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">己 · jǐ</dt><dd>자기 자신</dd></div><div><dt lang="zh-CN">所不欲 · suǒ bù yù</dt><dd>원하지 않는 것</dd></div><div><dt lang="zh-CN">勿施 · wù shī</dt><dd>행하지 말라, 가하지 말라</dd></div><div><dt lang="zh-CN">于人 · yú rén</dt><dd>다른 사람에게</dd></div></dl><p className="classic-note">병음은 기본 성조로 표기했습니다. ‘不欲’의 ‘不’는 실제 발음에서 뒤의 4성 앞에서 bú로 바뀝니다.</p></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>내가 싫어하는 장난이나 말은 무엇인가요?</p><p>친구의 그림을 건드리기, 말하는 도중 끼어들기처럼 일상의 행동을 떠올려 보고, 대신 할 수 있는 배려를 이야기해 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{kindness.source} — 공자의 말씀</p><p>자공이 평생 실천할 만한 한마디를 묻자 공자는 ‘서(恕)’, 곧 다른 사람의 마음을 헤아리는 태도를 말하며 이 구절을 들려줍니다.</p><p>원문 중 발췌: <span lang="zh-CN">“其恕乎！己所不欲，勿施于人。”</span></p><p>영상 속 동물 친구들과 그림 그리기 이야기는 문장의 뜻을 설명하기 위해 창작했습니다.</p><a className="text-button" href={kindness.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
