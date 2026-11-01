import type { MetadataRoute } from 'next';
import { readingBooks } from '@/lib/reading';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://chineses.vercel.app/reading' }, ...readingBooks.map(b => ({ url: `https://chineses.vercel.app/reading/${b.id}` }))];
}
