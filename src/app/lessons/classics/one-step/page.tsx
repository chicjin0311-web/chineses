import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { caigentan } from '@/lib/classics';
import '../style.css';

export const metadata = { title: `${caigentan.title} — 채근담`, description: `${caigentan.chinese} ${caigentan.meaning} 토끼와 고슴도치의 2D 애니메이션으로 배우는 양보.` };

export default function OneStep() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 01 · 채근담</p><h1>{caigentan.title}</h1><p>토끼와 고슴도치가 알려주는 작은 양보의 힘.</p><p className="classic-meta">2026. 10. 30. · 2D 애니메이션 · 양보와 배려</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={caigentan.poster} aria-label="토끼와 고슴도치가 좁은 길에서 양보하는 이야기" aria-describedby="video-description"><source src={caigentan.video} type="video/mp4" /><track kind="captions" src="/media/classics/caigentan-one-step.vtt" srcLang="ko" label="한국어 설명과 중국어 문장" />브라우저에서 영상을 재생할 수 없습니다. 아래 영상 파일을 이용해 주세요.</video><figcaption id="video-description">좁은 길에서 만난 두 친구. 토끼가 자리를 내어 주자 고슴도치도, 토끼도 길을 지나갈 수 있게 됩니다.</figcaption></figure>
    <a className="text-button" href={caigentan.video} download>영상 파일 내려받기</a>
    <section className="classic-quote" aria-labelledby="quote-heading"><p className="eyebrow" id="quote-heading">오늘의 명문장</p><h2 lang="zh-CN">{caigentan.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{caigentan.pinyin}</p><p className="classic-meaning">{caigentan.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>서로 먼저 지나가려고 하면 좁은 길에서 모두 멈추게 돼요. 토끼는 한 걸음 물러나 친구가 지나갈 공간을 만들어 줍니다. 그 작은 양보 덕분에 두 친구 모두 다시 길을 갈 수 있어요.</p><p>이 문장은 길에서의 양보를 통해, 일상에서도 다른 사람의 자리를 생각하며 행동하라는 뜻을 전해요.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">径路 · jìng lù</dt><dd>길, 오솔길</dd></div><div><dt lang="zh-CN">窄处 · zhǎi chù</dt><dd>좁은 곳</dd></div><div><dt lang="zh-CN">留一步 · liú yī bù</dt><dd>한 걸음을 남겨 두다, 양보하다</dd></div><div><dt lang="zh-CN">与人行 · yǔ rén xíng</dt><dd>다른 사람이 지나가도록 하다</dd></div></dl><p className="classic-note">병음은 기본 성조로 표기했습니다. ‘一步’의 ‘一’는 실제 발음에서 뒤의 4성 앞에서 yí로 바뀝니다.</p></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>오늘 내가 다른 사람에게 ‘한 걸음’을 양보할 수 있는 순간은 언제일까요?</p><p>복도에서 마주칠 때, 친구와 이야기할 때, 함께 물건을 쓸 때를 떠올려 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{caigentan.source}</p><p>전체 구절: <span lang="zh-CN">径路窄处，留一步与人行；滋味浓的，减三分让人嗜。</span></p><p>영상에서는 첫 구절을 사용했습니다. 장면은 문장의 뜻을 설명하기 위해 창작한 이야기입니다. 항 번호는 명각본 전집 기준으로, 판본에 따라 다를 수 있습니다.</p><a className="text-button" href={caigentan.sourceUrl} target="_blank" rel="noreferrer">채근담 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
