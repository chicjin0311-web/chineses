import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/bilingual', '/bilingual/textbook-development', '/bilingual/classlab-taiwan-guide'].map(path => ({ url: `https://chineses.vercel.app${path}` }));
}
