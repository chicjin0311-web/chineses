# 차곡차곡 중국어 교실

한국 학생을 위한 중국어 수업과 교사의 기록 공간. 수업 자료, 학생 활동, 국제교류, 독서록, 일기, 수업 연구를 같은 폴더 디자인 위에서 확장하는 Next.js 애플리케이션입니다.

## 서비스 구성
- 운영 사이트: https://chineses.vercel.app
- GitHub: https://github.com/chicjin0311-web/chineses
- Vercel 프로젝트: chineses. 서버 함수 지역은 서울 `icn1`.
- Supabase 프로젝트: chineses (`iqsfimlxilzcmvpffzje`). 데이터베이스 지역은 서울 `ap-northeast-2`.
- 프레임워크: Next.js App Router, React, TypeScript. CSS 디자인 토큰과 Lucide 아이콘.

## 시작하기
Node.js 24와 pnpm 11.25.0을 사용합니다.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
# Vercel 프로젝트가 연결된 환경에서는 vercel env pull .env.local 로 공개 설정을 동기화합니다.
pnpm dev
```

필수 환경 변수는 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`입니다. Supabase의 publishable key만 사용하며 service role key는 이 앱에 필요하지 않습니다. `.env.local`과 `.vercel`은 Git에 포함되지 않습니다.

```sh
pnpm typecheck
pnpm build
```

## 현재 기능
- 홈: 중국어 수업, 학생 활동, 국제교류, 독서록, 일기, 수업 연구 노트의 여섯 폴더.
- 중국어 수업: 언어 수업(회화·발음·어휘·한자)과 문화 수업으로 분리.
- 국제교류: 온라인 교류와 대면교류 폴더. 실제 기록이 등록되기 전에는 빈 상태를 표시.
- 수업 연구 노트: 기존 자료 정리 → 수업 성찰 → 새 수업안. 분야별 작성 질문 제공.
- 나의 초안: 열 가지 세부 분야별 여러 초안, 브라우저 자동 저장, 제목·날짜·본문 편집, UTF-8 텍스트 다운로드. 공개 발행이나 클라우드 동기화는 하지 않음.
- 학습 자료: Supabase의 공개 자료 조회, 분야별 필터, 검색, 상세 읽기, 인쇄, 즐겨찾기.
- 단어 카드: 자료별 카드 전환, 뜻 뒤집기, 이전/다음, 음성 읽기.
- 발음 연습: 문장 입력과 기기의 중국어 TTS. 녹음·채점 기능은 포함하지 않습니다.
- 타이머: 1/3/5/10/15분, 일시 정지·재개·초기화, 완료 알림. 탭이 닫히면 중지됩니다.
- 랜덤 뽑기: 항목 입력, 중복 제외, 결과 표시, 초기화. 추첨은 Web Crypto를 사용합니다.
- 프로젝트: 3개의 활동 가이드, 활용 표현, 아이디어 노트.
- 학습 노트·자료 담기: 현재 브라우저의 localStorage에 저장됩니다. 기기간 동기화는 하지 않습니다.
- `/api/health`: 실제 Supabase 공개 자료 조회를 통한 연결 확인. 비밀 값은 응답하지 않습니다.

## 구조와 확장
`src/app`은 페이지/라우트, `src/components`는 공유 UI와 상호작용, `src/lib`는 타입·데이터 조회·도구 목록입니다. 브랜드·폴더·작성 질문은 `src/lib/site.ts`, 지정된 폴더 라우트는 `src/app/[...section]/page.tsx`에서 관리합니다. 색상과 그림자·반응형 규칙은 `src/app/globals.css`, `workspace.css`, `collections.css`, 디자인 방향과 조사한 원본은 `docs/design.md`에 있습니다.

새 수업 도구: `src/lib/tools.ts`에 등록하고 `src/app/tools/[slug]/page.tsx`에 컴포넌트를 연결합니다. 새 학습 자료: Supabase `resources`에 구조에 맞춰 입력합니다. 새 프로젝트: `project_templates`에 입력합니다.

관리자 로그인, 교사 공개 발행, 학생 계정, 실시간 모둠 활동, 파일 업로드는 다음 단계에서 추가할 기능입니다. 현재 초안 편집기는 브라우저에만 저장하며 공개 콘텐츠를 수정하지 않습니다. 로그인과 클라우드 노트 연결을 추가할 때 사용할 `workspace_items` 테이블에는 소유자별 RLS가 미리 적용되어 있습니다.

초안은 `classroom-drafts-v1`에 저장합니다. 잘못된 형식의 저장 데이터는 덮어쓰지 않으며, 저장 실패 시 파일 다운로드로 보관할 수 있습니다. 기존 학습 메모와 즐겨찾기의 저장 키는 이전 기록 보존을 위해 유지합니다.

## 데이터베이스
`supabase/schema.sql`은 초기 구조와 교육 예시 데이터의 기록입니다. 원격 프로젝트에는 `classroom_foundation` 마이그레이션으로 적용되어 있습니다. 이미 운영 중인 DB에 이 파일을 다시 실행하지 마세요.

- `resources`, `project_templates`: 공개(`published=true`) 행만 익명/로그인 사용자에게 읽기 허용. 클라이언트 수정 권한 없음.
- `workspace_items`: 로그인 사용자가 본인 소유 행만 읽기·쓰기 가능. 익명 접근 차단.
- 모든 public 테이블에 RLS 적용. `user_metadata`를 권한 판단에 사용하지 않습니다.
- 현재 콘텐츠에는 학생 개인정보가 포함되지 않습니다.

## 배포
GitHub `main` 브랜치와 Vercel 프로젝트를 연결합니다. Vercel의 production/preview/development 환경에 두 공개 설정을 등록합니다. `vercel.json`의 `regions: ["icn1"]`을 유지합니다.

Vercel의 함수 실행 지역과 Supabase DB는 서울입니다. Vercel 정적 파일 CDN, 플랫폼 로그·계정 정보까지 전부 한국에만 보관되는 데이터 주권 보장은 별도 범위입니다.

## 검증
초기 구현에서 Next.js production build, TypeScript 검사, DB 조회와 Supabase 보안 advisor를 확인했습니다. 실제 브라우저 검수 결과와 배포 검증은 `docs/verification.md`에 기록합니다.
