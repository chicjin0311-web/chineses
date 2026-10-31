import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import './style.css';

export const metadata: Metadata = {
  title: '이중언어교육',
  description: '이중언어 교재 공동 개발과 대만 여행 실용서를 만드는 클래스랩 프로젝트. 언어와 문화가 만나는 배움을 기록합니다.',
  alternates: { canonical: 'https://chineses.vercel.app/bilingual' },
};

export default function BilingualPage() {
  return <div className="page bilingual-page">
    <Link href="/" className="back-link">← 전체 폴더로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">두 언어로 함께 배우기</p><h1>이중언어교육</h1><p>일상에서 시작하는 언어, 서로를 이해하는 문화.<br />교재를 만들고 배움을 나누는 과정을 기록합니다.</p></header>
    <section className="bilingual-feature" aria-labelledby="feature-title">
      <div><span className="bilingual-label">교재 공동 개발 · 2026</span><h2 id="feature-title">말하고, 노래하고, 놀며<br />배우는 중국어</h2><p>전남 여수의 국제교육원에서 초등팀과 중등팀이 함께 만드는 초등학교 고학년 대상 이중언어 교재. 회화와 활동, 중국 문화 이야기를 한 권에 담습니다.</p><Link className="button primary" href="/bilingual/textbook-development">교재 개발 이야기 읽기 <ArrowRight size={17} aria-hidden="true" /></Link></div>
      <div className="bilingual-cover" aria-label="회화, 확장 연습, 노래와 놀이, 문화 이해로 이어지는 교재 구성"><span>함께 만드는 배움</span><strong>말하기<br />노래와 놀이<br />문화 이해</strong><span lang="zh-CN">一起学习 · 함께 배워요</span></div>
    </section>
    <div className="bilingual-areas">
      <section><BookOpen size={24} aria-hidden="true" /><h2>이중언어 교재 제작</h2><p>기초 중국어 표현부터 다문화 감수성까지. 두 팀의 전문성을 모아 교재를 구성한 과정을 소개합니다.</p><Link className="text-button" href="/bilingual/textbook-development">공동 개발 기록 보기 →</Link></section>
      <section><Users size={24} aria-hidden="true" /><h2>클래스랩 운영</h2><p>직접 엮은 소책자에 대만의 정보와 여행 회화를 담습니다. 영상 제작까지 진행한 2학기 프로젝트 수업을 소개합니다.</p><Link className="text-button" href="/bilingual/classlab-taiwan-guide">대만 여행 실용서 제작 이야기 →</Link></section>
    </div>
    <section className="bilingual-records" aria-labelledby="records-title"><h2 id="records-title">교재와 수업의 기록</h2><Link href="/bilingual/classlab-taiwan-guide"><div><span>2026. 10. 31. · 클래스랩 · 진행 중</span><h3>내 손으로 엮는 대만 여행 실용서</h3><p>오침안정법 소책자에서 테마별 여행 회화와 영상까지</p></div><ArrowRight size={22} aria-hidden="true" /></Link><Link href="/bilingual/textbook-development"><div><span>2026. 10. 31. · 공동 개발</span><h3>말하고, 노래하고, 놀며 배우는 중국어</h3><p>초등팀과 중등팀의 협업으로 완성을 앞둔 이중언어 교재 이야기</p></div><ArrowRight size={22} aria-hidden="true" /></Link></section>
  </div>;
}
