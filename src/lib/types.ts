export type LessonLine = { chinese: string; pinyin: string; korean: string };
export type Resource = {
  slug: string; title: string; description: string; category: string;
  level: string; minutes: number; accent: string; symbol: string;
  lines: LessonLine[]; activity: string; published: boolean;
};
export type Project = {
  slug: string; title: string; description: string; category: string;
  duration: string; color: string; symbol: string; steps: string[];
  phrases: LessonLine[]; published: boolean;
};
