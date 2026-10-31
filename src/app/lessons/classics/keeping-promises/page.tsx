import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { keepingPromises as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '약속은 말보다 행동으로 — 논어', description: '人而无信，不知其可也。 조별 과제에서 말과 행동의 일치를 생각하는 3D 이야기.' };

export default function KeepingPromises() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 11 · 논어</p><h1>{lesson.title}</h1><p>“자료 다 했어.” 그 말을 믿고 기다리던 조원. 아직 끝내지 못했다면, 지금 무엇부터 해야 할까요?</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 논어의 두 친구</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="조별 과제 자료를 마무리해 전달하는 토끼와 고슴도치 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-trust.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">자료를 기다리는 친구에게 사실을 말하고, 맡은 일을 마무리하는 토끼. 중국어 명문장은 두 번 듣고, 느린 두 번째 읽기에 맞춰 따라 해 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>왜 친구가 기다리고 있었을까요?</h2><p>고슴도치는 토끼의 자료를 받아야 발표를 준비할 수 있습니다. 토끼가 끝내지 않은 일을 “다 했다”고 말하면, 친구는 남은 일을 판단하거나 다른 계획을 세울 기회를 잃습니다. 조별 과제에서 정확한 진행 상황을 알려 주는 것도 서로에 대한 책임입니다.</p><p>토끼는 사실을 인정한 뒤, 남은 부분을 작성하고 자료를 전달합니다. 사과 한마디로 신뢰가 모두 회복되는 것은 아닙니다. 다음 약속을 지키고, 늦어질 때 미리 알리는 행동이 쌓여야 다시 믿고 함께 일할 수 있습니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">人 · rén</dt><dd>사람</dd></div><div><dt lang="zh-CN">而 · ér</dt><dd>여기서는 ‘~인데도, ~로서’</dd></div><div><dt lang="zh-CN">无信 · wú xìn</dt><dd>신의가 없다. 말과 행동을 믿기 어렵다.</dd></div><div><dt lang="zh-CN">不知其可也 · bù zhī qí kě yě</dt><dd>그가 어떻게 제대로 해 나갈 수 있을지 알 수 없다.</dd></div></dl></section>
    <section className="classic-question"><h2>우리 조라면?</h2><p>제출 하루 전, 맡은 자료를 약속한 시간까지 끝내기 어렵다는 걸 알게 되었습니다. 언제, 어떤 내용을 알려야 친구도 다음 계획을 세울 수 있을까요?</p><p>“현재 어디까지 했는지 → 무엇이 남았는지 → 언제 전달할 수 있는지”를 담아 말해 보세요. 단순히 늦었다는 이유로 사람 전체를 평가하기보다, 다음 행동을 구체적으로 정하는 데 집중해 봅시다.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source} — 공자의 말씀</p><p>원문은 신의가 없는 사람을 연결 부품이 없어 움직일 수 없는 수레에 비유하며, 사람 사이의 신뢰가 얼마나 중요한지 설명합니다.</p><p>영상은 원문의 뜻을 조별 과제 상황에 연결한 창작입니다. 『논어』 시리즈는 청록색 조끼 토끼와 보라색 옷 고슴도치를 고정 캐릭터로 이어갑니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
