import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { learningJoy } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${learningJoy.title} — 논어`, description: `${learningJoy.chinese} ${learningJoy.meaning} 귀여운 3D 친구들과 배우는 배움의 즐거움.` };

export default function JoyOfLearning() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 03 · 논어</p><h1>{learningJoy.title}</h1><p>토끼·곰·고슴도치와 함께 만나는 배우고 익히는 기쁨.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 배움과 연습</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={learningJoy.poster} aria-label="토끼가 배운 리듬을 연습하며 기뻐하는 이야기" aria-describedby="video-description"><source src={learningJoy.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-joy-of-learning.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">새로운 리듬을 배우는 토끼. 배운 것을 직접 되풀이하면서 연주의 즐거움을 느껴요.</figcaption></figure>
    <a className="text-button" href={learningJoy.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{learningJoy.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{learningJoy.pinyin}</p><p className="classic-meaning">{learningJoy.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>토끼는 곰이 들려주는 리듬을 보고 배워요. 처음에는 낯설지만, 직접 연주하고 다시 익히면서 점점 즐거워집니다.</p><p>새로운 것을 아는 데서 한 걸음 더 나아가, 배운 것을 되풀이하고 생활 속에서 실천할 때 느끼는 기쁨을 말하는 문장이에요. 영상은 그 뜻을 학생들에게 익숙한 악기 연습으로 풀어낸 이야기입니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">学 · xué</dt><dd>배우다</dd></div><div><dt lang="zh-CN">时习之 · shí xí zhī</dt><dd>때때로 그것을 익히다</dd></div><div><dt lang="zh-CN">不亦…乎 · bù yì…hū</dt><dd>또한 …하지 않은가?</dd></div><div><dt lang="zh-CN">说 · yuè</dt><dd>기쁘다 — 여기서는 ‘悦’의 뜻</dd></div></dl><p className="classic-note">이 문장의 ‘说’는 shuō가 아니라 yuè로 읽습니다. 병음은 기본 성조로 표기했으며, ‘不亦’의 ‘不’는 실제 발음에서 뒤의 4성 앞에서 bú로 바뀝니다.</p></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>처음에는 어려웠지만 다시 연습해서 즐거워진 일이 있나요?</p><p>중국어 한 문장을 소리 내어 읽기, 악기 연주, 운동 동작처럼 오늘 다시 익힐 수 있는 것을 한 가지 골라 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{learningJoy.source} — 공자의 말씀</p><p>원문: <span lang="zh-CN">子曰：“学而时习之，不亦说乎？”</span></p><p>『논어』의 첫 장에 나오는 첫 구절입니다. 영상 속 동물 친구들과 실로폰 이야기는 문장의 뜻을 설명하기 위해 창작했습니다.</p><a className="text-button" href={learningJoy.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
