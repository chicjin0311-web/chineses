import data from '@/data/reading-books.json';

export const readingBooks = data;
export type ReadingBook = (typeof data)[number];
export type BookCard = Omit<ReadingBook, 'scrap' | 'notes' | 'reflection' | 'sourceFile' | 'coverUrl' | 'coverSource'> & { hasNotes: boolean };
export function readingStatus(status: string) {
  return ({ '다읽은책': '다 읽은 책', '읽고있는책': '읽고 있는 책', '읽고싶은책': '읽고 싶은 책' } as Record<string, string>)[status] ?? (status || '상태 미기록');
}
export const bookCards: BookCard[] = data.map(({ scrap, notes, reflection, sourceFile, coverUrl, coverSource, ...book }) => ({ ...book, hasNotes: Boolean(scrap || notes || reflection) }));
