import { DraftWorkspace } from '@/components/draft-workspace';
import { writingCategories } from '@/lib/site';

export const metadata = { title: '나의 초안', robots: { index: false, follow: false } };

export default async function Write({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const category = writingCategories.find(item => item.id === params.category)?.id ?? 'reflection';
  return <div className="page"><header className="page-intro"><p className="eyebrow">나의 기록 작업실</p><h1>생각을 글로, 차곡차곡.</h1><p>수업 자료와 성찰, 교류의 경험과 일상의 이야기를 초안으로 정리해요.</p></header><DraftWorkspace key={category} initialCategory={category} /></div>;
}
