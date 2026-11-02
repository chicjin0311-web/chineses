import type { Metadata } from 'next';
import Link from 'next/link';
import { ExchangeTags } from '@/components/exchange-tags';
import '../exchange.css';

const title = '2026 국제교류 준비, 지침과 담당자 체크리스트';
const description = '전남 현장체험학습 매뉴얼과 공무국외출장 자료를 바탕으로 살펴보는 국제교류 운영 흐름, 사전답사·안전교육·허가·결과보고 준비.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://chineses.vercel.app/exchange/guidelines-2026' },
  openGraph: { title, description, url: 'https://chineses.vercel.app/exchange/guidelines-2026', type: 'article', locale: 'ko_KR' },
};

const steps = [
  { title: '계획의 출발점 정하기', role: '교류 담당 · 관리자', tasks: ['상대 학교와 목적·큰 주제·일정·참가 대상을 협의한다.', '활동 유형과 적용 지침, 컨설팅·심의·허가 일정을 확인한다.'] },
  { title: '학교 안에서 역할 나누기', role: '관리자 · 참여 교과 · 행정실', tasks: ['수업 시간표·공간·학생회 활동과 행정 업무 담당자를 정한다.', '학생 집결 담당과 방문 교사 이동 담당을 나누고, 지연 시 연락 방법을 정한다.'] },
  { title: '답사와 안전대책 준비하기', role: '답사팀 · 안전 담당', tasks: ['학교·숙소·이동 경로의 위험 구간, 화장실, 비상집결지와 병원을 확인한다.', '답사 결과를 계획에 반영하고, 해당 컨설팅·학교운영위원회 심의 및 결재를 준비한다.'] },
  { title: '참가·출국 서류 확인하기', role: '교류 담당 · 복무 담당 · 행정실', tasks: ['참가 동의, 여권·입국 요건, 계약·보험과 비상연락망을 확인한다.', '인솔자의 공무국외출장 허가권자·심사 여부·신청 기한을 확인하고 복무를 처리한다.'] },
  { title: '학생과 인솔자 준비하기', role: '교류 담당 · 인솔자', tasks: ['교류 전에 문화·안전·개인정보 교육을 하고, 이동·숙박·비상시 행동을 안내한다.', '온라인은 양교 실무자가 접속·음성·화면을 확인하고, 학생 소그룹 매칭과 입장 안내를 준비한다.'] },
  { title: '현장에서 함께 확인하기', role: '인솔자 · 현지 담당', tasks: ['이동 때마다 인원과 건강 상태를 확인하고, 매일 학생의 안전을 점검한다.', '일정 변경이나 지연이 생기면 담당자끼리 공유하고 학생 인계 여부를 확인한다.'] },
  { title: '기록하고 다음 교류로 잇기', role: '교류 담당 · 출장자', tasks: ['학생 후기·만족도와 실제 활동을 정리하고 다음 운영의 개선점을 남긴다.', '결과보고·제출·공개 기한을 각각 확인하고, 공개 자료의 개인정보를 제거한다.'] },
];

export default function Guidelines() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange">← 국제교류 기록으로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">국제교류 준비와 운영 · 2026 자료 안내</p><h1>{title}</h1></header>
      <div className="exchange-prose">
        <p>교류를 준비하다 보면 수업과 체험활동만큼 챙겨야 할 절차도 많다. 함께 수업할 선생님, 학생을 인솔할 선생님, 행정 업무를 맡을 분들과 일찍 이야기해야 하는 이유다. 다음 교류를 준비할 때 다시 펼쳐 볼 수 있도록 공식 자료와 확인할 일을 모았다.</p>
        <p className="exchange-key"><strong>좋은 활동을 준비하는 일과<br />안전하게 운영할 준비는 함께 간다.</strong></p>
        <h2>먼저 열어 볼 공식 자료</h2>
        <ul>
          <li><a href="https://www.jne.go.kr/jinro/na/ntt/selectNttInfo.do?mi=817&nttSn=5170417">2026 현장체험학습 운영 매뉴얼 — 전남교육청 공식 게시글</a><br />2026. 3. 10. 등록 · PDF와 한글 원문 제공. 교육정보모두 → 진로진학지원센터 → 진로정보 → 창체자료실에서 찾을 수 있다.</li>
          <li><a href="https://www.jne.go.kr/upload/main/na/bbs_124/ntt_5168750/doc_e0cf1c96-3e8e-4d45-a364-6dcbb2beccf41771a8939b75126.pdf#page=138">2026 교육공무원 인사실무 — 공무국외출장</a><br />책자 130쪽부터(PDF 138쪽). 허가권자와 추진 절차, 사후관리를 함께 확인한다.</li>
          <li><a href="https://www.law.go.kr/ordinInfoP.do?ordinId=217642">전라남도교육청 공무국외출장 규정 — 국가법령정보센터</a><br />확인한 본문은 2025. 9. 1. 시행본이다. 계획을 세울 때 현행 조문과 서식을 다시 확인한다.</li>
        </ul>
        <p className="exchange-small">자료 확인: 2026. 11. 2. 학교에 수신된 매뉴얼 탑재 안내 공문 대신 공개된 공식 원문으로 연결했다. 별도로 받은 「글로컬 전남 국제교육교류 길라잡이」는 파일명이 ‘최종안’이므로 확정 지침으로 재게시하지 않았다. 이후 개정 공문과 해당 사업의 별도 안내도 함께 확인한다.</p>
        <h2>현장체험학습 매뉴얼에서 먼저 확인할 것</h2>
        <p>2026 매뉴얼은 숙박형 기타 활동 중 <strong>국외 체험학습에도 국외 수학여행 절차를 준용</strong>하도록 안내한다. 국제교류라는 이름만으로 절차를 생략하지 않고, 우리 활동의 유형과 사업별 안내를 먼저 확인해야 한다.</p>
        <p>국외 수학여행은 학부모 동의율 90% 이상과 컨설팅을 조건으로 한다. 숙박형 활동의 사전답사, 안전요원 배치, 여행자보험 기준도 계획 단계에서 살펴본다. 학교운영위원회에는 답사 결과와 안전대책을 함께 설명할 수 있도록 준비한다.</p>
        <details className="exchange-details"><summary>매뉴얼에서 찾아볼 항목 펼치기</summary>
          <ul>
            <li>앞부분 ‘주요 내용·국외 수학여행 흐름도·유형별 실천사항’: 적용 유형과 절차 확인.</li>
            <li>숙박형 및 고위험활동: 사전답사 1회 이상. 숙박형 안전요원은 50명당 1명 이상 배치 기준과 자격 요건 확인.</li>
            <li>여행자보험: 숙박형 등의 의무가입 대상과 학생·교직원·교육활동 참여자의 가입 범위 확인.</li>
            <li>‘국외 수학여행 자체점검표’: 숙소·의료지원·비상연락망 및 국제교류 홈스테이 항목 확인.</li>
            <li>‘제출 및 홈페이지 공개사항’: 사전계획 제출과 결과 공개의 대상·기한 확인.</li>
          </ul>
        </details>
        <h2>인솔 교사의 공무국외출장도 함께 준비하기</h2>
        <p className="exchange-key"><strong>심사 대상에서 제외되더라도,<br />허가 절차까지 생략하는 것은 아니다.</strong></p>
        <p>2026 인사실무는 학교 추진 출장의 경우 실시 전에 허가권자에게 계획서를 제출해 허가 신청하면 허가받은 것으로 간주한다고 안내한다. 학교 소속 교원은 원칙적으로 학교장이 허가하지만, 학교장 동행이나 여러 기관의 공동 출장은 허가 경로를 따로 확인해야 한다.</p>
        <details className="exchange-details"><summary>출장 담당자가 확인할 절차 펼치기</summary>
          <ul>
            <li>계획: 목적·방문기관·일정과 출장자를 정하고, 심사 대상 및 허가권자를 확인한다.</li>
            <li>신청: 인사실무의 일반 추진표는 출국 40일 전까지 신청을 안내한다. 학교 추진 특례와 관할기관 안내를 함께 확인해 실제 제출일을 정한다.</li>
            <li>출발 전: 인솔자 교육·서약서, 여행자보험, NEIS 국외출장 처리를 확인한다. 인원·기간·국가 변경 시 재허가 여부를 확인한다.</li>
            <li>귀국 후: 결과보고서는 30일 이내 내부결재·제출, 등록은 제출 후 15일 이내가 안내되어 있다. 학교 국외 현장체험학습은 등록 예외 항목이므로 해당 여부를 확인한다. 등록 예외와 내부 보고 생략을 혼동하지 않는다.</li>
          </ul>
          <p className="exchange-small">근거: 위 「2026 교육공무원 인사실무」 공무국외출장 절. 현장체험학습 결과 공개와 공무국외출장 결과보고서 등록은 서로 다른 절차다.</p>
        </details>
        <p>실제로 샤먼 교류 때는 방문 교사를 호텔에서 픽업하는 동안 학생 집결까지 직접 챙기기 어려웠다. 다음에는 담당자를 나누고 지연 시 연락 방법까지 정해 두려 한다. 아래 역할 분담은 이런 경험을 더한 운영 예시이며, 학교의 업무분장에 맞게 조정하면 된다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="workflow-title">
        <p className="eyebrow">협의 → 계획·답사·심의 → 허가·준비 → 운영 → 보고</p>
        <h2 id="workflow-title">담당자와 함께 확인할 일</h2>
        <p>필요한 항목을 체크하며 확인하세요. 체크 상태는 저장되지 않습니다. 온라인·초청·방문 교류에 맞게 적용하며, 심의와 허가 일정은 미리 병행해 준비합니다.</p>
        <ol>{steps.map(step => <li key={step.title}><h3>{step.title}</h3><p><strong>함께할 담당: {step.role}</strong></p>{step.tasks.map(task => <label key={task} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline', margin: '0.7rem 0', lineHeight: 1.8 }}><input type="checkbox" /> <span>{task}</span></label>)}</li>)}</ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/preparing-next-exchange">실제 경험에서 정리한 다음 교류 준비 이야기 →</Link></footer>
      <ExchangeTags tags={['국제교류준비', '현장체험학습', '공무국외출장', '사전답사', '안전교육']} />
    </article>
  </div>;
}
