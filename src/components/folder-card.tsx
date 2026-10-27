import Link from 'next/link';
import { ArrowUpRight, FolderClosed } from 'lucide-react';
import type { ReactNode } from 'react';

type FolderCardProps = {
  href: string;
  title: string;
  description: string;
  meta: string;
  icon?: ReactNode;
  heading?: 'h2' | 'h3';
  compact?: boolean;
};

export function FolderCard({ href, title, description, meta, icon, heading: Heading = 'h3', compact = false }: FolderCardProps) {
  return (
    <Link href={href} className={`classroom-folder${compact ? ' compact' : ''}`}>
      <span className="folder-tab" aria-hidden="true" />
      <div className="folder-surface">
        <div className="folder-topline">
          <span className="folder-symbol" aria-hidden="true">{icon ?? <FolderClosed size={24} strokeWidth={1.6} />}</span>
          <span className="folder-meta">{meta}</span>
        </div>
        <Heading>{title}</Heading>
        <p>{description}</p>
        <span className="folder-open">폴더 열기 <ArrowUpRight size={16} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
