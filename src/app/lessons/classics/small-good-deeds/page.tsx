import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { smallGoodDeeds as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '내 자리가 아니어도 — 명심보감', description: '勿以善小而不为。 통로를 막은 의자 하나를 정리하는 윤서의 선택에서 작은 선행의 의미를 생각해 봅니다.' };

export default function SmallGoodDeeds() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 14 · 명심보감 01</p><h1>{lesson.title}</h1><p>도서관을 나가려던 윤서가 통로에 나온 의자 앞에서 멈춥니다. “우리 자리도 아닌데, 그냥 가자.” 그 말을 듣고도 윤서가 돌아선 이유는 무엇일까요?</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 명심보감의 윤서</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="도서관 통로를 막은 의자를 정리하는 윤서의 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/mingxin-small-good.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">윤서가 의자를 정리하자 책을 든 학생이 지나갈 길이 열립니다. 중국어 문장을 두 번 듣고, 더 느린 두 번째 낭독에 맞춰 따라 읽어 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>작은 행동의 크기는 누가 정할까요?</h2><p>내가 사용하지 않은 의자라면 그냥 지나치기 쉽습니다. 하지만 책을 든 사람에게는 그 의자가 길을 막는 장애물입니다. 윤서는 잠깐 손을 써서 다음 사람이 편하게 지나갈 공간을 만듭니다.</p><p>내가 들이는 수고는 작아도 누군가의 불편은 실제로 줄어듭니다. 공용 공간을 살피고, 지금 내가 할 수 있는 작은 행동을 선택하는 것. 이 문장은 그런 실천을 가볍게 여기지 말라고 권합니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">勿 · wù</dt><dd>~하지 말라. 어떤 행동을 삼가라는 말.</dd></div><div><dt lang="zh-CN">以 · yǐ</dt><dd>여기서는 ~때문에, ~라는 이유로.</dd></div><div><dt lang="zh-CN">善小 · shàn xiǎo</dt><dd>선한 일이 작음. 눈에 잘 띄지 않는 작은 선행.</dd></div><div><dt lang="zh-CN">而不为 · ér bù wéi</dt><dd>그리하여 하지 않다. 为는 여기서 ‘행하다’라는 뜻으로 wéi(2성)로 읽습니다.</dd></div></dl></section>
    <section className="classic-question"><h2>우리 학교에서 찾는 작은 선행</h2><p>내가 사용한 자리가 아니더라도 잠깐 손보면 누군가 편해지는 곳이 있나요? 다음 사람이 겪을 불편과 내가 할 수 있는 행동을 하나씩 짝지어 적어 보세요.</p><p>예를 들어 공용 물품을 제자리에 놓기, 빠진 준비물을 친구에게 알려 주기, 조별 자료의 찾기 어려운 파일 이름을 정리하기가 있습니다. 오늘 하나를 실천한 뒤 무엇이 달라졌는지 이야기해 봅시다.</p></section>
    <section className="classic-text"><h2>명심보감의 고정 주인공, 윤서</h2><p>짧은 검은 머리, 남색 재킷, 호박색 가방의 윤서는 일상에서 고민하고 행동하며 성장하는 학생입니다. 솔직함과 행동력, 담백한 유머를 지닌 윤서와 함께 명심보감의 문장을 학교생활 속 선택에 연결합니다. 앞으로 이 책의 영상은 같은 주인공으로 이어갑니다.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source}</p><p>계선편에는 유비가 아들 유선에게 당부한 말로 실려 있습니다. 작은 선행을 소홀히 하지 말고 작은 악행도 삼가라는 대목에서, 이번 영상은 선행에 관한 구절을 발췌했습니다.</p><p>도서관의 윤서 이야기는 문장의 뜻을 오늘날 학생의 경험으로 표현한 창작입니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">명심보감 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a><p><a href="https://dict.revised.moe.edu.tw/dictView.jsp?ID=159882" target="_blank" rel="noreferrer">독음 참고: 교육부 국어사전</a></p></section>
  </article></div>;
}

