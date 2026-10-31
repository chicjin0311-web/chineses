import Link from 'next/link';

export function ExchangeTags({ tags }: { tags: string[] }) {
  return <nav className="exchange-tags" aria-label="관련 주제로 글 찾기">
    {tags.map(tag => <Link key={tag} href={`/exchange/topics#${encodeURIComponent(tag)}`}>#{tag}</Link>)}
  </nav>;
}
