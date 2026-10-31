import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: ['https://chineses.vercel.app/exchange/sitemap.xml', 'https://chineses.vercel.app/bilingual/sitemap.xml'] };
}
