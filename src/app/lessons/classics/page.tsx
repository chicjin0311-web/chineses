import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { caigentan, analects, learningJoy, reviewNew, kindness, fixMistake, slowAndSteady, askAndLearn, standTogether, harmony, keepingPromises, learningThinking, honestKnowing, smallGoodDeeds } from '@/lib/classics';
import './style.css';

export const metadata = { title: '고전 한 문장', description: '일상 속 이야기로 생각해 보는 중국 고전 명문장. 간화자, 한어병음, 한국어 뜻과 출전을 함께 확인하세요.' };

export default function Classics() {
  return <div className="page classics-page">
    <Link className="back-link" href="/lessons"><ArrowLeft size={15} aria-hidden="true" />중국어 수업으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">중국어 수업 · 보고 읽고 생각하기</p><h1>고전 한 문장</h1><p>짧은 이야기로 뜻을 만나고, 중국어 한 문장을 일상으로 가져와요.</p></header>
    <nav className="section-tabs" aria-label="중국어 수업 세부 폴더"><Link href="/lessons/language">언어 수업</Link><Link href="/lessons/culture">문화 수업</Link><Link href="/lessons/classics" aria-current="page">고전 한 문장</Link></nav>
    <Link className="classic-card" href={smallGoodDeeds.href}>
      <div className="classic-thumbnail"><img src={smallGoodDeeds.poster} alt="도서관에서 통로를 막은 의자를 살펴보는 남색 재킷의 윤서" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">14 · 명심보감 01 · 작은 선행 · 3D</p><h2>{smallGoodDeeds.title}</h2><p className="classic-chinese" lang="zh-CN">{smallGoodDeeds.chinese}</p><p>“우리 자리도 아닌데?” 의자 하나를 정리하는 작은 선택이 다음 사람의 길을 열어요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={honestKnowing.href}>
      <div className="classic-thumbnail"><img src={honestKnowing.poster} alt="통계 자료의 출처를 확인하기 위해 노트북을 연 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">13 · 논어 · 아는 것과 모르는 것 · 3D</p><h2>{honestKnowing.title}</h2><p className="classic-chinese" lang="zh-CN">{honestKnowing.chinese}</p><p>그럴듯한 그래프, 출처는 확인했을까? 아직 모른다고 인정하는 데서 확인이 시작돼요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={learningThinking.href}>
      <div className="classic-thumbnail"><img src={learningThinking.poster} alt="교과서의 원리와 문제를 함께 살펴보는 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">12 · 논어 · 배움과 생각 · 3D</p><h2>{learningThinking.title}</h2><p className="classic-chinese" lang="zh-CN">{learningThinking.chinese}</p><p>외운 답도, 근거 없는 추측도 막혔다면? 교과서의 원리와 내 생각을 연결해 봐요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={keepingPromises.href}>
      <div className="classic-thumbnail"><img src={keepingPromises.poster} alt="조별 과제 자료를 전달하는 토끼와 기다리는 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">11 · 논어 · 약속과 신뢰 · 3D</p><h2>{keepingPromises.title}</h2><p className="classic-chinese" lang="zh-CN">{keepingPromises.chinese}</p><p>“다 했다”는 말을 믿고 기다린 조원. 사실을 말하고, 맡은 일을 행동으로 마무리해요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={harmony.href}>
      <div className="classic-thumbnail"><img src={harmony.poster} alt="서로 다른 발표 자료를 살펴보는 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">10 · 논어 · 화이부동 · 3D</p><h2>{harmony.title}</h2><p className="classic-chinese" lang="zh-CN">{harmony.chinese}</p><p>통계와 인터뷰, 어떤 근거로 발표할까? 의견이 다른 조원과 함께 답을 찾아요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={standTogether.href}>
      <div className="classic-thumbnail"><img src={standTogether.poster} alt="앉아 있는 고슴도치가 일어나도록 손을 내미는 토끼" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">09 · 논어 · 함께 성장하기 · 3D</p><h2>{standTogether.title}</h2><p className="classic-chinese" lang="zh-CN">{standTogether.chinese}</p><p>먼저 일어난 토끼가 친구에게 손을 내밀어요. 나와 친구가 함께 잘되도록 도와요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={askAndLearn.href}>
      <div className="classic-thumbnail"><img src={askAndLearn.poster} alt="어린 고슴도치에게 종이접기를 배우는 토끼" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">08 · 논어 · 질문하는 용기 · 3D</p><h2>{askAndLearn.title}</h2><p className="classic-chinese" lang="zh-CN">{askAndLearn.chinese}</p><p>어린 친구에게도 배울 점이 있어요. 토끼와 함께 종이배 접는 법을 물어볼까요?</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={slowAndSteady.href}>
      <div className="classic-thumbnail"><img src={slowAndSteady.poster} alt="블록을 차근차근 쌓는 토끼와 응원하는 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">07 · 논어 · 차근차근 해내기 · 3D</p><h2>{slowAndSteady.title}</h2><p className="classic-chinese" lang="zh-CN">{slowAndSteady.chinese}</p><p>너무 빨리 쌓으면 와르르! 토끼와 함께 차근차근 다시 해 볼까요?</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={fixMistake.href}>
      <div className="classic-thumbnail"><img src={fixMistake.poster} alt="잘못 그린 선을 고치며 웃는 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">06 · 논어 · 잘못을 고치는 용기 · 3D</p><h2>{fixMistake.title}</h2><p className="classic-chinese" lang="zh-CN">{fixMistake.chinese}</p><p>앗, 잘못 그렸네! 토끼는 어떻게 할까요? 작은 실수를 고치는 용기를 만나 보세요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={kindness.href}>
      <div className="classic-thumbnail"><img src={kindness.poster} alt="함께 그림을 그리며 서로를 배려하는 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">05 · 논어 · 친구의 입장 생각하기 · 3D</p><h2>{kindness.title}</h2><p className="classic-chinese" lang="zh-CN">{kindness.chinese}</p><p>내가 불편했다면 친구도 그럴 수 있어요. 그림을 그리는 친구들의 작은 배려를 만나 보세요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={reviewNew.href}>
      <div className="classic-thumbnail"><img src={reviewNew.poster} alt="블록 다리를 살펴보고 새 다리를 만드는 토끼와 친구들" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">04 · 논어 · 온고지신 · 3D</p><h2>{reviewNew.title}</h2><p className="classic-chinese" lang="zh-CN">{reviewNew.chinese}</p><p>전에 배운 것을 다시 살펴보면 어떤 새로운 생각이 떠오를까요? 토끼의 블록 다리 교실로 놀러 오세요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={learningJoy.href}>
      <div className="classic-thumbnail"><img src={learningJoy.poster} alt="실로폰을 배우고 연습하는 토끼와 곰, 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">03 · 논어 · 배우고 익히는 기쁨 · 3D</p><h2>{learningJoy.title}</h2><p className="classic-chinese" lang="zh-CN">{learningJoy.chinese}</p><p>처음에는 서툴러도 괜찮아요. 배운 것을 되풀이하며 토끼가 발견한 기쁨을 만나 보세요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={analects.href}>
      <div className="classic-thumbnail"><img src={analects.poster} alt="함께 길을 걷는 토끼와 곰과 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">02 · 논어 · 배움과 겸손 · 3D</p><h2>{analects.title}</h2><p className="classic-chinese" lang="zh-CN">{analects.chinese}</p><p>함께 걷는 친구에게서 무엇을 배울 수 있을까요? 세 친구의 산책을 따라가 보세요.</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
    <Link className="classic-card" href={caigentan.href}>
      <div className="classic-thumbnail"><img src={caigentan.poster} alt="좁은 꽃길에서 만난 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">01 · 채근담 · 양보와 배려</p><h2>{caigentan.title}</h2><p className="classic-chinese" lang="zh-CN">{caigentan.chinese}</p><p>좁은 길에서 마주친 토끼와 고슴도치. 둘 다 지나가려면 어떻게 해야 할까요?</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
  </div>;
}
