import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { reviewNew } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${reviewNew.title} — 논어`, description: `${reviewNew.chinese} ${reviewNew.meaning} 귀여운 3D 친구들과 배우는 온고지신.` };

export default function OldAndNew() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 04 · 논어</p><h1>{reviewNew.title}</h1><p>배운 것을 다시 살펴보고 새로운 생각을 나누는 토끼와 친구들.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 온고지신</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={reviewNew.poster} aria-label="토끼가 배운 것을 되짚어 새 블록 다리를 만드는 이야기" aria-describedby="video-description"><source src={reviewNew.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-old-and-new.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">익숙한 블록 다리를 다시 살펴보는 토끼. 배운 것을 바탕으로 새로운 다리를 만들고 친구와 생각을 나눠요.</figcaption></figure>
    <a className="text-button" href={reviewNew.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{reviewNew.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{reviewNew.pinyin}</p><p className="classic-meaning">{reviewNew.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>토끼는 전에 배운 블록 다리의 구조를 다시 살펴봐요. 익숙한 방법을 바탕으로 새 다리를 만들고, 알게 된 것을 고슴도치에게 알려 줍니다.</p><p>‘온고지신’은 옛날에 배운 것을 다시 익혀 새로운 깨달음을 얻는다는 뜻이에요. 단순히 외운 것을 반복하는 데서 나아가, 그 안의 뜻을 이해하고 새로운 상황에 적용하는 배움을 떠올려 보세요.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">温故 · wēn gù</dt><dd>전에 배운 것을 다시 익히다</dd></div><div><dt lang="zh-CN">知新 · zhī xīn</dt><dd>새로운 것을 알다</dd></div><div><dt lang="zh-CN">可以为师 · kě yǐ wéi shī</dt><dd>스승이 될 수 있다</dd></div><div><dt lang="zh-CN">矣 · yǐ</dt><dd>문장 끝에서 판단이나 변화를 나타내는 어조사</dd></div></dl><p className="classic-note">여기서 ‘为’는 ‘되다’라는 뜻으로 wéi라고 읽습니다. ‘温故知新’은 한국어의 ‘온고지신’으로도 익숙한 표현이에요.</p></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>전에 배운 중국어 문장을 새로운 상황에서 바꿔 말할 수 있나요?</p><p>익숙한 문장 속 인물이나 장소를 바꿔 보고, 그 방법을 친구에게 설명해 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{reviewNew.source} — 공자의 말씀</p><p>원문: <span lang="zh-CN">子曰：“温故而知新，可以为师矣。”</span></p><p>영상 속 동물 친구들과 블록 다리 이야기는 문장의 뜻을 설명하기 위해 창작했습니다.</p><a className="text-button" href={reviewNew.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
