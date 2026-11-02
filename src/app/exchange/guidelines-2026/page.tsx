import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
        <section id="print-checklist" aria-labelledby="print-checklist-title">
          <h2 id="print-checklist-title">출력해서 쓰는 A4 한 장 체크리스트</h2>
          <p>준비 순서와 담당자, 확인할 서류를 한 장에 모았다. 교류명·일정과 실제 담당자를 적고, 준비를 마친 단계에 체크하며 사용하면 된다. 온라인 교류는 해당 회차에 맞게 준비한다.</p>
          <p><a className="text-button" href="/exchange/forms/2026-exchange-one-page-checklist.pdf" download>국제교류 담당자 체크리스트 PDF 내려받기 ↓</a></p>
          <p><a href="/exchange/forms/2026-exchange-one-page-checklist.pdf" target="_blank" rel="noopener noreferrer">체크리스트 열기·인쇄 (새 창) →</a></p>
          <p className="exchange-small">A4 세로 1쪽 · 흑백 출력 가능 · 인쇄 설정은 ‘A4 / 용지에 맞춤’. 공식 지침을 참고해 만든 실무용 요약이며 공식 서식은 아니다. 학교의 업무분장과 교류 유형에 맞게 사용한다.</p>
        </section>
        <h2>먼저 열어 볼 공식 자료</h2>
        <ul>
          <li><a href="https://www.jne.go.kr/jinro/na/ntt/selectNttInfo.do?mi=817&nttSn=5170417">2026 현장체험학습 운영 매뉴얼 — 전남교육청 공식 게시글</a><br />2026. 3. 10. 등록 · PDF와 한글 원문 제공. 교육정보모두 → 진로진학지원센터 → 진로정보 → 창체자료실에서 찾을 수 있다.</li>
          <li><a href="https://www.jne.go.kr/upload/main/na/bbs_124/ntt_5168750/doc_e0cf1c96-3e8e-4d45-a364-6dcbb2beccf41771a8939b75126.pdf#page=138">2026 교육공무원 인사실무 — 공무국외출장</a><br />책자 130쪽부터(PDF 138쪽). 허가권자와 추진 절차, 사후관리를 함께 확인한다.</li>
          <li><a href="https://www.law.go.kr/ordinInfoP.do?ordinId=217642">전라남도교육청 공무국외출장 규정 — 국가법령정보센터</a><br />확인한 본문은 2025. 9. 1. 시행본이다. 계획을 세울 때 현행 조문과 서식을 다시 확인한다.</li>
        </ul>
        <p className="exchange-small">자료 확인: 2026. 11. 2. 학교에 수신된 매뉴얼 탑재 안내 공문 대신 공개된 공식 원문으로 연결했다. 별도로 받은 「글로컬 전남 국제교육교류 길라잡이」는 파일명이 ‘최종안’이므로 확정 지침으로 재게시하지 않았다. 이후 개정 공문과 해당 사업의 별도 안내도 함께 확인한다.</p>
        <section id="types-table" aria-labelledby="types-table-title">
          <h2 id="types-table-title">숙박형·1일형, 한눈에 보는 준비 절차</h2>
          <p>공식 매뉴얼의 ‘유형별 실천사항’ 표다. <strong>학교운영위원회 심의는 숙박형과 1일형 모두 체크되어 있다.</strong> ‘현장체험학습위원회 구성·운영’의 학교자율 표시와 구분해서 보면 된다.</p>
          <figure className="exchange-figure">
            <a href="/exchange/forms/2026-jeonnam-types-table.png" target="_blank" rel="noopener noreferrer" aria-label="유형별 실천사항 표 원본 크게 보기 (새 창)">
              <Image src="/exchange/forms/2026-jeonnam-types-table.png" width={1225} height={1718} sizes="(max-width: 760px) 92vw, 720px" style={{ width: '100%', height: 'auto' }} alt="2026 현장체험학습 유형별 실천사항. 숙박형의 수학여행·수련활동·기타와 비숙박형 1일형을 비교한 표. 학교운영위원회 심의, 학부모 동의, 사전 안전교육, 불참학생 지도 계획은 모든 유형에 체크되어 있다. 하단에는 사전답사 생략 조건, 안전요원 대체 조건, 국외 체험학습의 국외 수학여행 절차 준용 주석이 있다." />
            </a>
            <figcaption>출처: 전라남도교육청 「2026. 현장체험학습 매뉴얼」 PDF 7쪽. 원본 페이지와 하단 주석을 그대로 수록했다. 표를 누르면 크게 볼 수 있다.</figcaption>
          </figure>
          <p className="exchange-small">표에서 ‘학교자율’로 표시한 항목과 필수 확인 항목을 구분하고, 예외 조건은 하단 주석과 매뉴얼 본문을 함께 확인한다.</p>
        </section>
        <section id="overseas-flow" aria-labelledby="overseas-flow-title">
          <h2 id="overseas-flow-title">국외 교류 준비 순서, 한눈에 보기</h2>
          <p>공식 매뉴얼의 ‘국외 수학여행 흐름도’다. 국외 체험학습을 준비할 때 계획부터 사후관리까지 어떤 일이 이어지는지 먼저 살펴보면 좋다.</p>
          <p className="exchange-key"><strong>계획·컨설팅 → 사전답사·운영위 심의 → 출국 준비 → 운영 → 평가·보고</strong></p>
          <figure className="exchange-figure">
            <a href="/exchange/forms/2026-jeonnam-overseas-flow.png" target="_blank" rel="noopener noreferrer" aria-label="국외 수학여행 흐름도 원본 크게 보기 (새 창)">
              <Image src="/exchange/forms/2026-jeonnam-overseas-flow.png" width={1225} height={1718} sizes="(max-width: 760px) 92vw, 720px" style={{ width: '100%', height: 'auto' }} alt="국외 수학여행 흐름도. 기본계획 수립 및 현장체험학습위원회 구성, 컨설팅, 사전답사, 학교운영위원회 심의, 계약 및 여행자보험, 감염병 예방접종, 공무국외여행 허가 신청, 사전교육활동, 출국준비, 프로그램 운영, 평가 및 결과 활용 순서." />
            </a>
            <figcaption>출처: 전라남도교육청 「2026. 현장체험학습 매뉴얼」 PDF 6쪽. 원본 페이지를 그대로 수록했다. 흐름도를 누르면 크게 볼 수 있다.</figcaption>
          </figure>
          <p><strong>사전답사는 학교운영위원회 안건 제출 전에 준비</strong>하도록 안내되어 있다. 출장 허가와 제출 기한도 계획 단계부터 확인해 두면 준비가 뒤로 밀리지 않는다.</p>
          <p className="exchange-small">국외 체험학습의 절차를 확인하는 자료다. 온라인·초청 교류에는 활동에 맞는 항목을 적용하고, 사업별 별도 지침과 허가권자 안내를 함께 확인한다.</p>
          <p><a href="#workflow-title">아래에서 담당자별 준비 사항 체크하기 ↓</a></p>
        </section>
        <section id="forms" aria-labelledby="forms-title">
          <h2 id="forms-title">준비할 때 꺼내 쓰는 공식 양식</h2>
          <p>공개 매뉴얼에서 필요한 서식을 골라 15쪽으로 묶었다. 원문 내용과 쪽수는 그대로이며, PDF는 확인·인쇄용이다. 내용을 편집하려면 아래 한글 원문에서 해당 서식을 찾아 사용하면 된다.</p>
          <p><a className="text-button" href="/exchange/forms/2026-jeonnam-exchange-forms.pdf" download>공식 서식 모음 PDF 내려받기 (약 3.5MB) ↓</a></p>
          <p><a href="https://www.jne.go.kr/upload/jinro/na/bbs_394/ntt_5170417/doc_5c89e85a-0fc7-4895-9d97-d0f7d3cefb1f1773a1208b55642.hwp">편집 가능한 공식 매뉴얼 전체 한글(HWP) 원문 ↓</a></p>
          <ul>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=1">참가 준비 — 학부모 동의·희망 조사 예시</a><br />서식 2 · 원문 76–77쪽 · 모음 1–2쪽</li>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=3">답사 현장 — 사전답사 점검 항목</a><br />서식 6-2 · 원문 85–86쪽 · 모음 3–4쪽</li>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=5">답사 후 — 사전답사 결과 보고</a><br />서식 6-3 · 원문 87–89쪽 · 모음 5–7쪽</li>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=8">인솔자 출장 — 승인 신청·계획서 예시</a><br />서식 14·14-1 · 원문 107–110쪽 · 모음 8–11쪽</li>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=12">사전교육 — 안전교육·연수 실시확인서</a><br />서식 15 · 원문 111–112쪽 · 모음 12–13쪽</li>
            <li><a href="/exchange/forms/2026-jeonnam-exchange-forms.pdf#page=14">활동 후 — 학생·인솔교원 설문지</a><br />서식 20·21 · 원문 119–120쪽 · 모음 14–15쪽</li>
          </ul>
          <p className="exchange-small">출처: 전라남도교육청 「2026. 현장체험학습 매뉴얼」(2026. 3. 10. 공개). 예시의 국가·일정·인원·금액·수신처는 우리 학교의 교류 기록이나 확정 기준이 아니다. 해당 사업과 최신 지침에 맞게 수정한다. 작성한 동의서·명단·서명은 홈페이지에 공개하지 않는다. PDF 페이지 이동이 지원되지 않는 환경에서는 ‘모음 쪽수’로 찾아보면 된다.</p>
        </section>
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
