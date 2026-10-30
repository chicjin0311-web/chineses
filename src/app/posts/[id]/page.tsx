import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { getPublishedAttachments, getPublishedPost, getPublishedPosts } from '@/lib/published-posts';
import '@/components/published-posts.css';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPublishedPost((await params).id);
  return { title: post?.title ?? '자료를 찾을 수 없어요', description: post?.summary };
}
export default async function PublishedLesson({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPublishedPost((await params).id);
  if (!post) notFound();
  const [files, siblings] = await Promise.all([getPublishedAttachments(post.id), getPublishedPosts(post.category)]);
  const index = siblings.findIndex(item => item.id === post.id);
  const previous = siblings[index - 1];
  const next = siblings[index + 1];
  const paragraphs = post.content.split('\n\n');
  return <div className="page"><article className="published-article">
    <Link className="back-link" href="/lessons/language"><ArrowLeft size={15} aria-hidden="true" />언어 수업으로 돌아가기</Link>
    <header><p className="eyebrow">중국어 수업 · 언어트랙</p><h1>{post.title}</h1><p className="published-meta">{post.target} · {post.duration} · {post.record_date}</p><p className="post-intro">{post.summary}</p></header>
    <div className="post-body">{paragraphs.filter(text => text !== post.summary).map((text, i) => {
      const [heading, ...lines] = text.split('\n');
      if (lines.length && ['주요 활동', '자료 활용'].includes(heading)) return <section key={i}><h2>{heading}</h2>{lines.every(line => line.startsWith('• ')) ? <ul>{lines.map((line, j) => <li key={j}>{line.slice(2)}</li>)}</ul> : <p>{lines.join('\n')}</p>}</section>;
      return <p key={i}>{text}</p>;
    })}</div>
    <section className="post-files" aria-labelledby="files-title"><h2 id="files-title">첨부파일</h2><p>수업안내서와 학생 활동지를 각각 내려받으세요. Word에서 수업에 맞게 편집할 수 있습니다.</p>{files.map(file => <a className="post-download" key={file.id} href={`/api/materials/${file.id}`}><span><strong>{file.kind === 'guide' ? '수업안내서' : file.kind === 'worksheet' ? '학생 활동지' : '참고 자료'}</strong><small>{file.file_name} · {(file.size_bytes / 1024 / 1024).toFixed(1)} MB</small></span><Download size={20} aria-hidden="true" /></a>)}</section>
    <nav className="post-neighbours" aria-label="다른 차시">{previous && <Link href={`/posts/${previous.id}`}>← {previous.title}</Link>}{next && <Link href={`/posts/${next.id}`}>{next.title} →</Link>}</nav>
  </article></div>;
}
