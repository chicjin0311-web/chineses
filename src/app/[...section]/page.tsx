import { notFound } from 'next/navigation';
import { SectionPage } from '@/components/section-page';
import { classroomSections } from '@/lib/site';

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return classroomSections.map(item => ({ section: item.path.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string[] }> }) {
  const { section } = await params;
  const item = classroomSections.find(item => item.path === section.join('/'));
  return { title: item?.title ?? '폴더를 찾을 수 없어요', description: item?.description };
}

export default async function Collection({ params }: { params: Promise<{ section: string[] }> }) {
  const { section } = await params;
  const item = classroomSections.find(item => item.path === section.join('/'));
  if (!item) notFound();
  return <SectionPage section={item} />;
}
