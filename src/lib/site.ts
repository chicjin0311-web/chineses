export const site = {
  name: '차곡차곡 중국어 교실',
  description: '중국어 수업과 학생 활동, 국제교류의 경험을 모으고 읽고 쓰며 다음 수업을 준비하는 공간입니다.',
};

export type WritingCategory = {
  id: string;
  title: string;
  group: string;
  href: string;
  description: string;
  prompts: string[];
};

export const writingCategories: WritingCategory[] = [
  { id: 'language', title: '언어 수업', group: '중국어 수업', href: '/lessons/language', description: '발음, 어휘, 회화, 한자를 배우는 수업 자료를 모아요.', prompts: ['수업 주제와 대상', '학습 목표와 핵심 표현', '수업 흐름과 활동', '활용한 자료와 참고 링크'] },
  { id: 'culture', title: '문화 수업', group: '중국어 수업', href: '/lessons/culture', description: '음식과 생활, 예술과 문화를 함께 탐구해요.', prompts: ['함께 탐구할 문화 주제', '수업 목표와 질문', '비교하고 체험하는 활동', '활용한 자료와 참고 링크'] },
  { id: 'activities', title: '학생 활동', group: '학생 활동', href: '/activities', description: '학생들과 함께 만든 과정과 결과를 기록해요.', prompts: ['활동 주제와 대상', '학생들이 참여한 과정', '활동 결과와 학생 반응', '다음 활동에 이어 갈 점'] },
  { id: 'online', title: '온라인 교류', group: '국제교류', href: '/exchange/online', description: '화상 만남과 편지, 공동 과제로 서로의 일상을 나눠요.', prompts: ['교류 주제와 일정', '함께한 학교와 참여 대상', '사전 준비와 온라인 활동', '나눈 이야기와 다음 만남'] },
  { id: 'in-person', title: '대면교류', group: '국제교류', href: '/exchange/in-person', description: '직접 만나 함께 배우고 경험한 순간을 남겨요.', prompts: ['교류 주제와 장소, 일정', '함께한 학교와 참여 대상', '방문 준비와 현장 활동', '인상 깊은 장면과 배운 점'] },
  { id: 'reading', title: '독서록', group: '읽고 쓰는 일상', href: '/reading', description: '책에서 만난 문장과 생각을 수업과 일상으로 이어 가요.', prompts: ['책 제목과 저자', '기억하고 싶은 문장과 쪽수', '읽으며 떠오른 생각', '수업이나 일상에 연결할 점'] },
  { id: 'diary', title: '일기', group: '읽고 쓰는 일상', href: '/diary', description: '오늘의 장면과 마음, 작지만 잊고 싶지 않은 일을 적어요.', prompts: ['오늘 기억에 남는 장면', '그때의 생각과 마음', '내일의 나에게 남기는 말'] },
  { id: 'archive', title: '기존 자료 정리', group: '수업 연구 노트', href: '/research/archive', description: '그동안의 수업 자료를 주제와 시기별로 다시 펼쳐 봐요.', prompts: ['자료 이름과 수업 시기', '수업 대상과 주제', '자료 내용과 원본 파일 위치 또는 링크', '다시 활용할 부분과 보완할 부분'] },
  { id: 'reflection', title: '수업 성찰', group: '수업 연구 노트', href: '/research/reflection', description: '학생의 배움과 수업의 장면을 돌아보며 다음 질문을 찾아요.', prompts: ['돌아볼 수업과 관련 자료', '기대했던 배움과 실제 학생 반응', '잘된 점과 아쉬운 점', '다음 수업에서 바꿀 점'] },
  { id: 'plans', title: '새 수업안', group: '수업 연구 노트', href: '/research/plans', description: '성찰에서 얻은 생각을 새로운 수업의 흐름으로 만들어요.', prompts: ['수업 주제와 대상, 차시', '이전 수업 성찰에서 가져온 질문', '학습 목표와 준비물', '도입 → 전개 → 정리', '평가와 피드백 계획'] },
];

export type ClassroomSection = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  kind: 'group' | 'language' | 'culture' | 'activities' | 'record';
  children?: string[];
  parent?: string;
  category?: string;
};

export const classroomSections: ClassroomSection[] = [
  { path: 'lessons', title: '중국어 수업', description: '말을 익히고, 문화를 이해해요. 수업 자료를 두 갈래로 모았습니다.', eyebrow: '언어와 문화가 만나는 교실', kind: 'group', children: ['language', 'culture'] },
  { path: 'exchange', title: '국제교류', description: '화면 너머에서, 그리고 같은 공간에서. 서로의 일상과 배움을 나눕니다.', eyebrow: '만나고 나누며 넓어지는 세상', kind: 'group', children: ['online', 'in-person'] },
  { path: 'research', title: '수업 연구 노트', description: '그동안의 자료를 정리하고, 수업을 돌아보고, 새로운 수업안을 만듭니다.', eyebrow: '지난 수업에서 다음 수업으로', kind: 'group', children: ['archive', 'reflection', 'plans'] },
  ...writingCategories.map((category): ClassroomSection => ({
    path: category.href.slice(1), title: category.title, description: category.description, eyebrow: category.group,
    kind: category.id === 'language' || category.id === 'culture' || category.id === 'activities' ? category.id : 'record',
    parent: category.href.includes('/lessons/') ? '/lessons' : category.href.includes('/exchange/') ? '/exchange' : category.href.includes('/research/') ? '/research' : undefined,
    category: category.id,
  })),
];

export const homeFolders = [
  { href: '/lessons', title: '중국어 수업', description: '언어 수업 · 문화 수업', meta: '배움의 자료실', icon: 'lessons' },
  { href: '/activities', title: '학생 활동', description: '함께한 활동과 프로젝트의 과정', meta: '함께 만드는 교실', icon: 'activities' },
  { href: '/exchange', title: '국제교류', description: '온라인 교류 · 대면교류', meta: '서로의 세상을 만나요', icon: 'exchange' },
  { href: '/reading', title: '독서록', description: '책에서 만난 문장과 나의 생각', meta: '읽고 생각하기', icon: 'reading' },
  { href: '/diary', title: '일기', description: '기억하고 싶은 하루의 장면들', meta: '일상의 기록', icon: 'diary' },
  { href: '/research', title: '수업 연구 노트', description: '자료 정리 → 수업 성찰 → 새 수업안', meta: '다음 수업을 준비해요', icon: 'research' },
] as const;
