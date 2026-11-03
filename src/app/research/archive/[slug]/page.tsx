import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import records from '@/data/archive-records.json';
import '@/components/archive-records.css';

export function generateStaticParams() { return records.map(record => ({ slug: record.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = records.find(item => item.id === slug);
  return { title: record ? `${record.semester} ${record.title}` : '자료를 찾을 수 없어요', description: record?.summary };
}
export default async function ArchiveRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = records.find(item => item.id === slug);
  if (!record) notFound();
  return <article className="page archive-detail">
    <Link className="back-link" href="/research/archive">← 기존 자료 정리</Link>
    <header className="page-intro"><p className="eyebrow">{record.semester} · 학습 활동 기록</p><h1>{record.title}</h1><p>{record.summary}</p></header>
    <section aria-labelledby="worksheet-preview-title">
      <h2 id="worksheet-preview-title">AI 재구성 참고 활동지</h2>
      <p>이 이미지와 PDF는 AI가 일부 수업 내용을 새 양식으로 재구성한 자료입니다. 선생님이 제작한 원본 학습지의 사진이 아닙니다. 원본은 별도 첨부 후 확인하여 반영합니다.</p>
      <figure className="archive-preview">
        <a href={record.file.replace('.pdf', '.webp')} target="_blank" rel="noopener noreferrer" aria-label={`${record.title} 학습지 이미지 확대 보기 (새 창)`}>
          <Image src={record.file.replace('.pdf', '.webp')} alt={`${record.title} 공개용 학습지 1쪽. 주요 활동과 기록 공간을 담은 익명화 발췌본.`} width={1191} height={1684} sizes="(max-width: 850px) 100vw, 780px" unoptimized />
        </a>
        <figcaption>이미지를 누르면 크게 볼 수 있습니다. 인쇄할 때는 아래 PDF를 이용하세요.</figcaption>
      </figure>
    </section>
    <section><h2>주요 활동</h2><ol>{record.activities.map(activity => <li key={activity}>{activity}</li>)}</ol></section>
    <section><h2>자료 활용</h2><p>학습 활동 PDF에는 위 활동에 맞는 질문과 기록 공간을 담았습니다. 수업 중 배부하거나 필요한 활동만 골라 활용할 수 있습니다.</p><a className="button primary" href={record.file} download>학습 활동 PDF 내려받기 · 1쪽</a></section>
    <section><h2>공개본에 담은 범위</h2><p>{record.note}</p><p>원본 일부를 발췌·재구성한 자료이며, 당시의 배부본 전체와 동일하지 않습니다.</p></section>
    <section className="archive-provenance"><h2>자료 출처와 시기</h2><p>{record.source}</p><p>{record.evidence}</p><p>공개용 발췌·재구성: {record.publicDate} · 원본은 별도 보존</p></section>
  </article>;
}
