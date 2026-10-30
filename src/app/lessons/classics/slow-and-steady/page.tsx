import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { slowAndSteady } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${slowAndSteady.title} — 논어`, description: `${slowAndSteady.chinese} ${slowAndSteady.meaning} 귀여운 3D 토끼와 배우는 차근차근 해내는 태도.` };

export default function SlowAndSteady() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 07 · 논어</p><h1>{slowAndSteady.title}</h1><p>서두르던 토끼가 발견한 차근차근 해내는 힘.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 한국어 이야기와 중국어 명문장</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={slowAndSteady.poster} aria-label="토끼가 블록을 차근차근 쌓으며 명문장을 두 번 읽는 영상" aria-describedby="video-description"><source src={slowAndSteady.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-slow-and-steady.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">서두르다 무너진 블록을 다시 쌓는 토끼. 중국어 문장을 두 번 듣고 함께 따라 읽어 보세요.</figcaption></figure>
    <a className="text-button" href={slowAndSteady.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{slowAndSteady.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{slowAndSteady.pinyin}</p><p className="classic-meaning">{slowAndSteady.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>토끼는 블록을 빨리 쌓으려다 무너뜨리고 말아요. 잠깐 멈추고 하나씩 차근차근 쌓으니 더 안정적으로 만들 수 있습니다.</p><p>이 문장은 빨리 끝내려는 마음에 필요한 과정이나 확인을 건너뛰면 오히려 목표를 이루기 어려워진다는 뜻이에요. 무조건 느리게 하라는 말보다는, 조급함 때문에 중요한 과정을 놓치지 말라는 뜻으로 이해해 보세요.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">欲 · yù</dt><dd>~하려고 하다, 바라다</dd></div><div><dt lang="zh-CN">速 · sù</dt><dd>빠르다</dd></div><div><dt lang="zh-CN">则 · zé</dt><dd>그러면, ~하면</dd></div><div><dt lang="zh-CN">不达 · bù dá</dt><dd>도달하지 못하다, 이루지 못하다</dd></div></dl></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>빨리 끝내려고 하다가 오히려 다시 해야 했던 일이 있나요?</p><p>중국어 글자의 획을 확인하기, 문제를 끝까지 읽기처럼 서두르지 않고 지킬 순서를 하나 정해 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{slowAndSteady.source} — 공자의 말씀</p><p>원문 중 발췌: <span lang="zh-CN">“欲速则不达；见小利则大事不成。”</span></p><p>자하가 정치를 묻자 공자가 조급함과 작은 이익에 치우치지 말라고 답한 대목입니다. 영상은 앞 구절의 뜻을 블록 쌓기 이야기로 풀어낸 창작 장면입니다.</p><a className="text-button" href={slowAndSteady.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
