import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { harmony as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '의견이 달라도, 같은 팀 — 논어', description: '君子和而不同。 조별 발표에서 의견이 다른 두 친구의 선택으로 배우는 화이부동.' };

export default function Harmony() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 10 · 논어</p><h1>{lesson.title}</h1><p>조별 발표에서 의견이 다른 두 친구. 상대를 설득하기 전에, 서로의 이유부터 들어 봅니다.</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 논어의 두 친구</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="의견이 다른 토끼와 고슴도치의 조별 발표 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-harmony.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">통계 자료와 인터뷰 자료를 두고 생각이 다른 친구들. 중국어 명문장은 두 번 듣고, 느린 두 번째 읽기에 맞춰 따라 해 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>왜 의견이 달랐을까요?</h2><p>토끼는 통계를 근거로 발표하자고 합니다. 고슴도치는 숫자만으로 담기 어려운 경험을 보여 주려면 인터뷰도 필요하다고 말합니다. 둘의 차이는 단순한 취향이 아니라, 어떤 근거가 문제를 더 잘 설명하는지에 대한 판단 차이입니다.</p><p>‘화이부동’은 갈등을 피하려고 무조건 동의하라는 말이 아닙니다. 상대의 이유를 듣고 자신의 판단도 유지하면서 협력하는 태도입니다. 두 자료를 함께 살펴보는 선택은 그 한 가지 예이지, 모든 의견을 무조건 절반씩 섞어야 한다는 뜻은 아닙니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">君子 · jūnzǐ</dt><dd>인격과 덕을 갖추려 노력하는 사람</dd></div><div><dt lang="zh-CN">和 · hé</dt><dd>조화를 이루다</dd></div><div><dt lang="zh-CN">而 · ér</dt><dd>여기서는 ‘그러나, ~하되’</dd></div><div><dt lang="zh-CN">不同 · bù tóng</dt><dd>무조건 같아지거나 맹목적으로 따르지 않다</dd></div></dl></section>
    <section className="classic-question"><h2>우리 조라면?</h2><p>친구의 자료에 오류가 있다면, 사이좋게 지내기 위해 그대로 넣어야 할까요?</p><p>“네 의견에서 이런 점은 도움이 돼. 다만 이 근거는 함께 확인해 보자.”처럼 상대 존중과 근거 검토를 함께 담은 말을 만들어 보세요.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source} — 공자의 말씀</p><p>전체 문장: <span lang="zh-CN">“君子和而不同，小人同而不和。”</span></p><p>영상은 원문의 뜻을 조별 발표 상황에 연결한 창작입니다. 『논어』 시리즈는 청록색 조끼 토끼와 보라색 옷 고슴도치를 고정 캐릭터로 이어갑니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}
