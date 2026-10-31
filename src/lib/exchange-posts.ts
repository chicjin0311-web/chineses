export const exchangePosts = [
  {
    "href": "/exchange/dongbei-2025/visit-china",
    "title": "화면으로 만난 친구의 학교를 찾아가다",
    "description": "2025 중국 국제교류 · 동북육재학교 · 첫 번째 이야기 · 방중",
    "tags": [
      "중국국제교류",
      "동북육재학교",
      "방중준비"
    ]
  },
  {
    "href": "/exchange/dongbei-2025/visit-korea",
    "title": "이번에는 우리가 친구들을 맞이할 차례",
    "description": "2025 중국 국제교류 · 동북육재학교 · 두 번째 이야기 · 방중 이후 이어진 방한",
    "tags": [
      "중국국제교류",
      "동북육재학교",
      "공동수업"
    ]
  },
  {
    "href": "/exchange/dongbei-2026/continuing-friendship",
    "title": "작년에 만난 친구에게, 올해의 응원을",
    "description": "2026년 하반기 동북육재학교와의 헬로우이프렌즈 교류. 고3 희망 학생들의 온라인 만남과 수능 응원, 앞으로 준비할 영상과 소포·엽서.",
    "tags": [
      "중국국제교류",
      "동북육재학교",
      "온라인국제교류"
    ]
  },
  {
    "href": "/exchange/taiwan-2026/online-1",
    "title": "대만 친구들과 처음 인사한 날 — 1차 온라인 교류",
    "description": "2026년 5월 29일 대만 허우쭝고등학교와의 첫 온라인 교류. 패들렛 학교소개와 활동지, 학생 소그룹 매칭과 구글미트 접속 준비를 돌아봅니다.",
    "tags": [
      "대만국제교류",
      "허우쭝고등학교",
      "온라인국제교류"
    ]
  },
  {
    "href": "/exchange/taiwan-2026/site-visit",
    "title": "학생들과 함께 걸을 길을 먼저 살펴보다 — 대만 사전답사",
    "description": "2026년 9월 대만 사전답사. 자매학교와 문화탐방지에서 확인한 집결지, 화장실 안내, 안전 주의 구간과 마지막 점검 절차.",
    "tags": [
      "대만국제교류",
      "허우쭝고등학교",
      "사전답사"
    ]
  },
  {
    "href": "/exchange/taiwan-2026/online-2",
    "title": "이번에는 우리 지역을 소개합니다 — 2차 온라인 교류",
    "description": "2026년 10월 29일 대만과의 두 번째 온라인 교류. 지역 소개와 학생 후기, 학교 방문 때 함께할 지역 탐방으로 이어지는 이야기.",
    "tags": [
      "대만국제교류",
      "허우쭝고등학교",
      "온라인국제교류"
    ]
  },
  {
    "href": "/exchange/xiamen-2025/our-first-story",
    "title": "우리 집에서 시작해, 친구의 학교로 이어진 만남",
    "description": "2025 중국 국제교류 · 샤먼과학기술고등학교 첫 번째 이야기. 5월 방한 홈스테이와 12월 방중의 기록.",
    "tags": [
      "중국국제교류",
      "샤먼과학기술고등학교",
      "홈스테이"
    ]
  },
  {
    "href": "/exchange/xiamen-2025/welcome-and-farewell",
    "title": "처음의 환영 인사가, 함께한 시간을 돌아보는 인사로",
    "description": "2025 중국 국제교류 · 샤먼과학기술고등학교 두 번째 이야기. 5월 방한의 환영식과 송별식, 학생들의 활동 기록과 교사 준비 사항.",
    "tags": [
      "중국국제교류",
      "샤먼과학기술고등학교",
      "방한준비"
    ]
  },
  {
    "href": "/exchange/xiamen-2025/visit-china",
    "title": "우리 집에 왔던 친구의 학교를 찾아가다",
    "description": "2025 중국 국제교류 · 샤먼과학기술고등학교 세 번째 이야기. 12월 방중에서 함께한 수업과 문화 경험.",
    "tags": [
      "중국국제교류",
      "샤먼과학기술고등학교",
      "공동수업",
      "방중준비"
    ]
  },
  {
    "href": "/exchange/preparing-next-exchange",
    "title": "국제교류를 준비하며, 다음에는 이렇게 하고 싶다",
    "description": "중국·대만 국제교류를 준비하며 배운 접속 확인, 학교와 가정의 협력, 새벽 이동 역할 분담과 다음 교류를 위한 준비 사항.",
    "tags": [
      "국제교류준비",
      "온라인국제교류",
      "홈스테이",
      "방한준비"
    ]
  }
];
export const exchangeTopics = [...new Set(exchangePosts.flatMap(post => post.tags))];
