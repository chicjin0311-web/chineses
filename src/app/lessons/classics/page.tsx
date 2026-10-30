import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { caigentan } from '@/lib/classics';
import './style.css';

export const metadata = { title: '고전 한 문장', description: '귀여운 2D 애니메이션으로 배우는 중국 고전 명문장. 간화자, 한어병음, 한국어 뜻과 출전을 함께 확인하세요.' };

export default function Classics() {
  return <div className="page classics-page">
    <Link className="back-link" href="/lessons"><ArrowLeft size={15} aria-hidden="true" />중국어 수업으로 돌아가기</Link>
    <header className="page-intro"><p className="eyebrow">중국어 수업 · 보고 읽고 생각하기</p><h1>고전 한 문장</h1><p>짧은 이야기로 뜻을 만나고, 중국어 한 문장을 일상으로 가져와요.</p></header>
    <nav className="section-tabs" aria-label="중국어 수업 세부 폴더"><Link href="/lessons/language">언어 수업</Link><Link href="/lessons/culture">문화 수업</Link><Link href="/lessons/classics" aria-current="page">고전 한 문장</Link></nav>
    <Link className="classic-card" href={caigentan.href}>
      <div className="classic-thumbnail"><img src={caigentan.poster} alt="좁은 꽃길에서 만난 토끼와 고슴도치" width={960} height={540} /><span className="classic-play"><Play size={24} aria-hidden="true" />영상 보기</span></div>
      <div className="classic-card-copy"><p className="eyebrow">01 · 채근담 · 양보와 배려</p><h2>{caigentan.title}</h2><p className="classic-chinese" lang="zh-CN">{caigentan.chinese}</p><p>좁은 길에서 마주친 토끼와 고슴도치. 둘 다 지나가려면 어떻게 해야 할까요?</p><span className="classic-card-link">영상과 문장 함께 보기 <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link>
  </div>;
}
