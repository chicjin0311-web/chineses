import Link from 'next/link';
import { ArrowUpRight, Paperclip } from 'lucide-react';
import { getPublishedPosts } from '@/lib/published-posts';
import './published-posts.css';

export async function PublishedPostList({ category }: { category: string }) {
  const posts = await getPublishedPosts(category);
  if (!posts.length) return null;
  return <section className="published-lessons" aria-labelledby="published-title">
    <div className="section-heading"><h2 id="published-title">차시별 수업자료</h2><span className="section-hint">{posts.length}개의 수업 기록</span></div>
    <div className="published-grid">{posts.map(post => <Link key={post.id} href={`/posts/${post.id}`} className="published-card">
      <span className="published-meta">{post.target} · {post.duration}</span>
      <h3>{post.title}</h3><p>{post.summary}</p>
      <span className="published-card-footer"><span><Paperclip size={14} aria-hidden="true" /> 수업 설명과 자료 보기</span><ArrowUpRight size={20} aria-hidden="true" /></span>
    </Link>)}</div>
  </section>;
}
