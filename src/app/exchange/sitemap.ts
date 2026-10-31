import type { MetadataRoute } from 'next';
import { exchangePosts } from '@/lib/exchange-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/exchange', '/exchange/topics', '/exchange/dongbei-2025', '/exchange/dongbei-2026', '/exchange/xiamen-2025', '/exchange/taiwan-2026', ...exchangePosts.map(post => post.href)];
  return paths.map(path => ({ url: `https://chineses.vercel.app${path}` }));
}
