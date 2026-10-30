import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { analects } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${analects.title} — 논어`, description: `${analects.chinese} ${analects.meaning} 세 친구의 3D 애니메이션으로 배우는 논어.` };

export default function ThreeFriends() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 02 · 논어</p><h1>{analects.title}</h1><p>토끼·곰·고슴도치가 함께 발견하는 배움.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 배움과 겸손</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={analects.poster} aria-label="세 친구가 함께 걸으며 서로에게 배우는 이야기" aria-describedby="video-description"><source src={analects.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-three-friends.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">함께 길을 걷는 세 친구. 친구가 하는 일을 눈여겨보면 새로운 것을 배울 수 있어요.</figcaption></figure>
    <a className="text-button" href={analects.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{analects.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{analects.pinyin}</p><p className="classic-meaning">{analects.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>함께 걷는 친구는 나와 다른 것을 잘하거나, 내가 놓친 것을 알아차릴 수 있어요. 친구를 눈여겨보고 좋은 점을 따라 배우면, 평범한 산책도 배움의 시간이 됩니다.</p><p>이 문장은 주변 사람에게서 배울 점을 찾는 겸손한 태도를 말해요. 뒤에 이어지는 구절에서는 다른 사람의 좋은 점을 따르고, 좋지 않은 점을 보면 나에게도 그런 점이 있는지 돌아보라고 합니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">三人行 · sān rén xíng</dt><dd>세 사람이 함께 길을 가다</dd></div><div><dt lang="zh-CN">必有 · bì yǒu</dt><dd>반드시 있다</dd></div><div><dt lang="zh-CN">我师 · wǒ shī</dt><dd>나의 스승</dd></div><div><dt lang="zh-CN">焉 · yān</dt><dd>여기서는 ‘그 가운데에’라는 뜻</dd></div></dl></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>오늘 친구에게서 배우고 싶은 좋은 점 한 가지는 무엇인가요?</p><p>문제를 푸는 방법, 친구의 말을 끝까지 듣는 태도, 작은 것을 관찰하는 습관을 떠올려 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{analects.source} — 공자의 말씀</p><p>이어지는 구절: <span lang="zh-CN">三人行，必有我师焉。择其善者而从之，其不善者而改之。</span></p><p>그들의 좋은 점을 골라 따르고, 좋지 않은 점을 보고는 자신을 고친다는 뜻입니다. 영상 속 동물 친구들의 이야기는 문장의 뜻을 설명하기 위해 창작했습니다.</p><a className="text-button" href={analects.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
