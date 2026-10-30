import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { standTogether as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '친구야, 함께 일어나자! — 논어', description: '己欲立而立人。 나와 친구의 성장을 함께 돕는 마음을 귀여운 3D 이야기로 배워요.' };

export default function StandTogether() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 09 · 논어</p><h1>{lesson.title}</h1><p>먼저 일어난 토끼가 친구에게 손을 내미는 이야기.</p><p className="classic-meta">2026. 10. 30. · 3D 애니메이션 · 한국어 이야기와 중국어 명문장</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="토끼가 고슴도치의 손을 잡고 일으켜 주는 영상" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-stand-together.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">먼저 일어난 토끼가 앉아 있는 친구에게 손을 내밀어요. 중국어 명문장은 두 번 듣고, 느린 두 번째 읽기에 맞춰 따라 해 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>영상으로 이해해요</h2><p>풀밭에 앉아 있던 토끼가 먼저 일어나요. 아직 앉아 있는 고슴도치를 보고 손을 내밀고, 친구가 일어서도록 도와줍니다.</p><p>원문의 ‘立’은 단순히 몸을 일으키는 것보다 넓은 뜻으로, 사람으로서 바로 서고 성장하는 것을 말해요. 영상은 이를 쉽게 떠올리도록 ‘친구를 일으켜 주는 행동’으로 표현한 비유입니다. 나만 잘되는 데 그치지 않고 다른 사람도 성장하도록 돕는 마음이 핵심이에요.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">己 · jǐ</dt><dd>자기 자신</dd></div><div><dt lang="zh-CN">欲 · yù</dt><dd>~하고자 하다</dd></div><div><dt lang="zh-CN">立 · lì</dt><dd>바로 서다, 자리 잡다</dd></div><div><dt lang="zh-CN">而 · ér</dt><dd>그리고, 이어서</dd></div><div><dt lang="zh-CN">立人 · lì rén</dt><dd>다른 사람도 바로 서도록 돕다</dd></div></dl></section>
    <section className="classic-question"><h2>내 일상에 연결해요</h2><p>내가 먼저 이해한 문제를 친구도 이해하도록 돕는다면 어떨까요? 답만 알려 주기보다 풀이 방법을 함께 생각해 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source} — 공자의 말씀</p><p>원문: <span lang="zh-CN">“夫仁者，己欲立而立人，己欲达而达人。”</span></p><p>자공이 인(仁)에 관해 묻자 공자가 답한 대목입니다. 영상의 토끼와 고슴도치 이야기는 이해를 돕기 위한 창작입니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
