import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { honestKnowing as lesson } from '@/lib/classics';
import '../style.css';

export const metadata = { title: '모르는 건, 모른다고 말하기 — 논어', description: '知之为知之，不知为不知，是知也。 조별 발표 자료의 출처를 확인하는 두 친구와 함께 아는 것과 모르는 것을 구분해 봅니다.' };

export default function HonestKnowing() {
  return <div className="page classics-page"><article className="classic-article">
    <Link className="back-link" href="/lessons/classics"><ArrowLeft size={15} aria-hidden="true" />고전 한 문장으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">고전 한 문장 13 · 논어</p><h1>{lesson.title}</h1><p>그럴듯한 그래프를 발표에 넣으려던 토끼. “출처 확인했어?”라는 질문에 잠시 멈춥니다. 아직 모른다는 사실을 솔직히 말할 수 있을까요?</p><p className="classic-meta">2026. 10. 31. · 중고등학생을 위한 3D 이야기 · 논어의 두 친구</p></header>
    <figure className="classic-video"><video controls playsInline preload="metadata" poster={lesson.poster} aria-label="확인되지 않은 자료의 출처를 살펴보는 토끼와 고슴도치 이야기" aria-describedby="video-description"><source src={lesson.video} type="video/mp4" /><track kind="captions" src="/media/classics/analects-honest-knowing.vtt" srcLang="zh" label="간화자와 한어병음" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption id="video-description">자료 사용을 보류하고 노트북을 열어 원문 확인을 시작하는 두 친구. 중국어 문장을 두 번 듣고, 더 느린 두 번째 낭독에 맞춰 따라 읽어 보세요.</figcaption></figure>
    <a className="text-button" href={lesson.video} download>영상 파일 내려받기</a>
    <section className="classic-quote"><p className="eyebrow">오늘의 명문장</p><h2 lang="zh-CN">{lesson.chinese}</h2><p className="classic-pinyin" lang="zh-Latn">{lesson.pinyin}</p><p className="classic-meaning">{lesson.meaning}</p></section>
    <section className="classic-text"><h2>“아직 몰라”는 무책임한 말일까요?</h2><p>토끼는 통계의 출처를 확인하지 않았지만, 확실한 정보처럼 말하려 했습니다. 친구의 질문을 듣고 자신이 아는 범위를 인정합니다. 두 친구는 그 자료를 발표에 바로 쓰지 않고, 노트북을 열어 원문부터 찾아보기로 합니다.</p><p>확인되지 않았다는 이유만으로 자료가 틀렸다고 단정할 수도 없습니다. 지금 아는 것, 아직 확인하지 못한 것, 앞으로 확인할 방법을 구분하는 태도가 필요합니다. 영상은 확인을 시작하는 장면이며, 자료가 옳다는 결론을 내린 장면은 아닙니다.</p></section>
    <section className="classic-text"><h2>말뜻을 살펴봐요</h2><dl className="classic-words"><div><dt lang="zh-CN">知 · zhī</dt><dd>알다. 앞부분의 知는 모두 zhī로 읽습니다.</dd></div><div><dt lang="zh-CN">为 · wéi</dt><dd>여기서는 ~로 여기다, ~라고 인정하다.</dd></div><div><dt lang="zh-CN">不知 · bù zhī</dt><dd>알지 못하다. 모르는 부분을 솔직하게 인정하기.</dd></div><div><dt lang="zh-CN">是知也 · shì zhì yě</dt><dd>이것이 지혜이다. 마지막 知는 智와 통하는 글자로, zhì(4성)로 읽습니다.</dd></div></dl></section>
    <section className="classic-question"><h2>우리 조 발표에 적용한다면?</h2><p>인터넷에서 찾은 숫자에 출처가 없다면 어떻게 말할까요? “이 숫자가 맞아”라고 단정하기 전에, 확인한 사실과 아직 확인하지 못한 부분을 나누어 적어 보세요.</p><p>누가 조사했는지, 언제 조사했는지, 누구를 대상으로 했는지 찾아보세요. 확인이 끝나지 않았다면 발표에서 보류하거나, 확인의 한계를 분명하게 설명하는 방법도 있습니다.</p></section>
    <section className="classic-text classic-source"><h2>문장의 출처</h2><p>{lesson.source} — 공자가 제자 자로에게 한 말씀</p><p>자신이 아는 것과 모르는 것을 분명하게 구분하는 지혜를 말합니다. 영상 속 조별 발표 상황은 원문의 의미를 오늘날 학생의 경험에 연결한 창작입니다.</p><p>『논어』 시리즈는 청록색 조끼 토끼와 보라색 옷 고슴도치를 고정 캐릭터로 이어갑니다.</p><a className="text-button" href={lesson.sourceUrl} target="_blank" rel="noreferrer">논어 원문 확인 <ExternalLink size={14} aria-hidden="true" /></a><p><a href="https://www.tup.com.cn/upload/books/yz/079321-01.pdf" target="_blank" rel="noreferrer">독음 참고: 칭화대학출판사 『중국문화경전독본』</a></p></section>
  </article></div>;
}

