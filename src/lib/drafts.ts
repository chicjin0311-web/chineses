export type Draft = {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
  updatedAt: string;
};

export const draftStorageKey = 'classroom-drafts-v1';

// Refuse malformed data instead of replacing a user's existing drafts with an empty list.
export function parseDrafts(raw: string | null, categoryIds: string[]): Draft[] {
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error('Invalid draft collection');
  const ids = new Set<string>();
  for (const draft of value) {
    if (typeof draft !== 'object' || draft === null ||
      typeof draft.id !== 'string' || !draft.id || ids.has(draft.id) ||
      typeof draft.category !== 'string' || !categoryIds.includes(draft.category) ||
      typeof draft.title !== 'string' || typeof draft.date !== 'string' ||
      typeof draft.content !== 'string' || typeof draft.updatedAt !== 'string') {
      throw new Error('Invalid draft data');
    }
    ids.add(draft.id);
  }
  return value as Draft[];
}

export function draftToText(draft: Draft, categoryTitle: string): string {
  return `${draft.title.trim() || '제목 없는 초안'}\n${categoryTitle} · ${draft.date}\n\n${draft.content}\n`;
}
