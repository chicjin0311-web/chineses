import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { sameStandard as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '내 책상은 예외일까? — 명심보감', description: '以责人之心责己，恕己之心恕人。 조별 과제 중 친구를 지적하던 윤서가 자신의 행동을 돌아봅니다.' };

export default function SameStandard() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 15 · 명심보감 02</p><h1>{lesson.title}</h1><p>조별 과제를 준비하던 윤서가 민재의 어질러진 자료를 지적합니다. 그런데 민재가 가리킨 곳은 윤서의 책상! 같은 행동인데, 나는 사정이 있고 친구는 잘못한 걸까요?</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 명심보감의 윤서</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="친구를 지적하던 윤서가 자기 자료부터 정리하는 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/mingxin-same-standard.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">윤서가 자기 자료를 돌아보고, 민재와 함께 정리를 시작합니다. 중국어를 두 번 듣고, 더 느린 두 번째 낭독에 맞춰 따라 읽어 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>친구에게 들이댄 기준을 나에게도</h2><p>내가 자료를 어질러 놓으면 “바빠서 그랬어”라고 생각하면서, 친구가 그러면 “왜 이렇게 무책임해?”라고 판단할 때가 있습니다. 행동은 비슷한데 설명이 달라지는 순간입니다.</p><p>윤서는 친구의 지적을 되받아치기보다 자신의 자료를 봅니다. 자기 몫을 정리하고 함께하자고 말하면서, 누가 더 잘못했는지를 따지던 상황을 함께 해결하는 상황으로 바꿉니다.</p><p>자기를 돌아본다는 것은 무조건 자기 탓을 하라는 뜻이 아닙니다. 남에게 요구한 기준을 나도 지키고, 내가 이해받고 싶은 사정이 다른 사람에게도 있을 수 있음을 생각해 보자는 뜻입니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">以 · yǐ</dt><dd>~으로, ~을 가지고.</dd></div><div><dt lang="zh-CN">责 · zé</dt><dd>꾸짖다, 잘못을 따지다.</dd></div><div><dt lang="zh-CN">己 · jǐ</dt><dd>자기 자신.</dd></div><div><dt lang="zh-CN">恕 · shù</dt><dd>상대의 사정을 헤아려 용서하다.</dd></div><div><dt lang="zh-CN">之心 · zhī xīn</dt><dd>~하는 마음. 앞의 행동과 ‘마음’을 연결합니다.</dd></div></dl></section>
    <section className="classic-question"><h2>입장을 바꾸면 설명도 바뀌나요?</h2><p>답장을 늦게 한 일, 조별 자료를 늦게 올린 일, 준비물을 잊은 일 중 하나를 골라 보세요. 내가 그랬을 때 떠올린 이유와 친구가 그랬을 때 내린 판단을 나란히 적어 봅시다.</p><p>친구에게 확인할 질문 하나와 내가 먼저 바꿀 행동 하나를 정해 보세요. 잘못을 없던 일로 만드는 대신, 서로의 사정을 확인하고 같은 기준으로 해결할 방법을 찾습니다.</p></section>
    <section className="classic-text"><h2>명심보감의 주인공, 윤서</h2><p>검은 단발, 남색 재킷, 호박색 가방의 윤서는 완벽한 모범생이 아닙니다. 먼저 말해 버리기도 하지만 자신의 행동을 돌아보고 고칠 줄 아는 학생입니다. 같은 윤서의 이야기로 명심보감의 문장을 계속 만납니다.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source}</p><p>존심편에서 범충선공이 자제들에게 당부한 대목의 일부입니다. 남의 잘못을 보는 데는 밝으면서 자신의 잘못에는 관대해지기 쉽다는 설명에 이어 나오는 말입니다.</p><p>조별 과제 장면은 이 문장의 뜻을 학교생활에 연결한 창작입니다. 원문을 간화자로 옮기고 구두점을 넣었습니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">명심보감 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a></section>
  </article></div>;
}

