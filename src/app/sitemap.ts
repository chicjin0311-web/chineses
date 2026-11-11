import type { MetadataRoute } from 'next';
import bilingual from './bilingual/sitemap';
import exchange from './exchange/sitemap';
import reading from './reading/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/lessons', '/lessons/overview', '/lessons/classics', '/resources', '/tools'];
  return [
    ...paths.map(path => ({ url: `https://chineses.vercel.app${path}` })),
    ...exchange(),
    ...bilingual(),
    ...reading(),
  ];
}
