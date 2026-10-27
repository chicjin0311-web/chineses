# 검증 기록

## 2026-10-27 초기 구현
- Next.js 16.4.3 production build 성공.
- TypeScript 검사 통과.
- Supabase: resources 6행, project_templates 3행 확인.
- 모든 public 테이블 RLS 활성화.
- Supabase security advisor: 경고 0개.
- 브라우저 검수: 로컬 미리보기는 접근 승인 후에도 저장된 origin 차단 설정으로 실행 불가. 운영 사이트 브라우저 접근 역시 승인 도구에서 거절되었습니다. 화면, 모바일 레이아웃, 실제 클릭·키보드·음성 동작은 브라우저로 검증하지 못했습니다.
- 운영 배포: https://chineses.vercel.app, production READY, Vercel 실행 지역 icn1 확인.
- `/api/health`: HTTP 200, database connected, resources 6. 응답 헤더의 실제 실행 위치에도 icn1 확인.
- 홈, 자료 검색, 자료 상세, 프로젝트 상세, 4개 수업 도구, 학습 노트의 HTTP 200 및 예상 서버 렌더링 콘텐츠 확인.
- 존재하지 않는 자료는 안내 페이지를 출력합니다. Next.js 스트리밍 응답에서는 안내 페이지가 HTTP 200으로 전달될 수 있습니다.
- 익명 역할은 공개 자료 INSERT 불가, 개인 workspace_items SELECT 불가 확인.
- 초기 운영 배포의 error/fatal 로그 조회: 해당 조건의 로그 없음.

## 수동 검수 동선
1. 홈 → 첫 수업 → 자료 담기 → 담아 둔 자료에서 확인.
2. 자료실 분야 필터와 검색, 잘못된 검색어의 빈 결과 안내.
3. 카드 뒤집기, 자료 바꾸기, 이전/다음.
4. 타이머 시작·일시 정지·재개·초기화와 완료 알림.
5. 랜덤 뽑기 중복 제외, 모든 항목 사용 후 안내, 다시 섞기.
6. 프로젝트 아이디어/학습 노트 저장 후 새로고침.
7. 1440px/768px/390px에서 가로 넘침, 겹침, 키보드 포커스 확인.
