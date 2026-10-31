import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import '../../exchange.css';

export const metadata: Metadata = { title: '대만 친구들과 처음 인사한 날 — 1차 온라인 교류', description: '2026년 5월 29일 대만 허우쭝고등학교와의 첫 온라인 교류. 패들렛 학교소개와 활동지, 학생 소그룹 매칭과 구글미트 접속 준비를 돌아봅니다.' };

const steps = [
  { title: '일정·큰 주제·회의 접속 확인', text: '양교 실무자가 일정과 큰 주제, 사용할 플랫폼을 정한다. 실무자끼리 회의를 열어 서로 접속되는지, 소리와 화면 공유가 되는지 확인한다.' },
  { title: '학생 매칭과 소그룹 준비', text: '참여 학생을 소그룹으로 매칭하고 그룹별 접속 방법을 준비한다. 사전 점검에는 학생이 없어 소그룹 이동을 직접 해 보지는 못했다. 대신 방 구성과 학생 배정, 안내할 내용을 미리 정리했다.' },
  { title: '각 학교 자료 준비와 사전교육', text: '큰 주제가 정해지면 활동과 자료는 각 학교가 준비한다. 우리 학교는 패들렛 학교소개 페이지와 활동지를 마련하고, 온라인 교류 전에 사진·중국어 표현·접속 방법·교류 예절을 지도했다.' },
  { title: '교류 후 구글폼 후기', text: '활동을 마친 뒤 학생들이 구글폼으로 후기를 작성하도록 했다.' },
];

export default function FirstOnlineExchange() {
  return <div className="page exchange-page">
    <Link href="/exchange/taiwan-2026" className="back-link">← 2026 대만 국제교류 · 허우쭝고등학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2026 대만 국제교류 · 허우쭝고등학교 · 첫 번째 이야기</p><h1>대만 친구들과 처음 인사한 날</h1><p className="exchange-muted">온라인 교류 1차 · 활동일 2026년 5월 29일</p></header>
      <div className="exchange-prose">
        <p>2026년 5월 29일, 대만 허우쭝고등학교와 첫 온라인 교류를 진행했다. 우리 학교 학생 25명과 대만 학생 35명이 화면으로 만났다. 12월 대면 교류를 앞두고, 서로를 알아 가는 첫 시간이었다.</p>
        <p>첫 만남을 준비하는 일은 접속 링크를 만드는 것보다 훨씬 앞에서 시작됐다. 온라인 교류에 앞서 5월 12일 사전교육을 실시했다. 대만 문화와 온라인 교류 예절, 화상회의 접속 방법을 안내했다. 학생별 발표 주제를 정하고 자기소개 대본도 함께 점검했다.</p>
        <p className="exchange-key"><strong>학생들이 대화를 시작할 수 있는 활동지를 준비했다.</strong></p>
        <p>인사와 자기소개에 필요한 질문·답변을 넣고, 중국어 문장에 병음과 한글 발음, 뜻을 함께 적었다. 처음부터 모든 말을 외우기보다, 필요한 표현을 찾아보며 말을 건넬 수 있도록 준비했다.</p>
        <figure className="exchange-figure"><a href="/images/exchange/taiwan-2026/worksheet-1.png" target="_blank" rel="noopener noreferrer"><Image src="/images/exchange/taiwan-2026/worksheet-1.png" alt="1차 온라인 교류 활동지의 인사와 자기소개 질문·답변 예시. 학생이 작성하기 전의 빈 양식" width={893} height={1263} sizes="(max-width: 760px) 100vw, 720px" /></a><figcaption>말을 건넬 때 참고하도록 준비한 자기소개 활동지. 이미지를 누르면 크게 볼 수 있습니다.</figcaption></figure>
        <p>학교 소개를 위해 패들렛에 학생들이 우리 학교를 소개할 수 있는 페이지를 만들어 공유했다. 학생들이 직접 학교 사진을 찍고, 사진 속 장소와 사물의 중국어 명칭을 익히도록 지도했다.</p>
        <p>체육관(体育馆, tǐyùguǎn), 급식실(食堂, shítáng), 교실(教室, jiàoshì), 운동장(操场, cāochǎng), 교복(校服, xiàofú)처럼 매일 마주하는 것들이 소개할 거리가 되었다.</p>
        <p className="exchange-muted exchange-small">위 어휘는 간화자와 한어병음으로 적었다. 아래 활동지는 대만 학생들과의 교류를 위해 번체자를 사용한 원본이다.</p>
        <figure className="exchange-figure"><a href="/images/exchange/taiwan-2026/worksheet-3.png" target="_blank" rel="noopener noreferrer"><Image src="/images/exchange/taiwan-2026/worksheet-3.png" alt="급식·교복·학교 시설·축제 소개와 상대방 반응 표현을 담은 학교소개 활동지" width={893} height={1263} sizes="(max-width: 760px) 100vw, 720px" /></a><figcaption>사진을 보여 주며 학교생활을 소개하도록 준비한 활동지. 학생 개인정보가 기입되지 않은 양식입니다.</figcaption></figure>
        <p className="exchange-key"><strong>학생들이 자기 말로 설명할 수 있는 소재부터.</strong></p>
        <p>교류를 준비하는 분들께도 학생들의 일상에서 대화 주제를 골라 보시라고 권하고 싶다. 당일에는 양교 학교장 인사와 학교 소개로 문을 열고, 소회의실을 활용한 그룹별 활동으로 이어 갔다. 학생들은 자기소개와 학교소개를 하고, 준비한 시청각 자료를 활용해 서로의 문화를 나누며 자유롭게 소통했다.</p>
        <p>대만과는 구글미트로 교류했다. 앞서 중국과 교류할 때는 줌으로 준비했지만 연결이 잘되지 않아 부브로 진행한 경험이 있었다. 그래서 플랫폼을 정하는 것만큼, 양교 실무자가 미리 회의를 열어 접속되는지 확인하는 일을 중요하게 생각했다.</p>
        <p>교류를 마친 뒤에는 학생들이 구글폼으로 후기를 작성하도록 했다. 화면에서 나눈 인사와 학교 이야기가 다음 만남으로 이어지기를 바라며 첫 교류를 마무리했다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="preparation-title">
        <p className="eyebrow">온라인 교류를 준비하는 분께</p><h2 id="preparation-title">준비 절차, 이렇게 정리해 두기</h2>
        <p>실제로 준비하고 진행한 일을 네 가지로 줄여 보았다.</p>
        <p className="exchange-key"><strong>회의는 실무자끼리 미리 열어 보고,<br />학생 소그룹은 매칭과 접속 안내를 준비하기.</strong></p>
        <ol>{steps.map((step, index) => <li key={step.title} className={index === 0 ? 'exchange-critical-step' : undefined}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>
      <footer className="exchange-article-footer"><p><Link href="/exchange/taiwan-2026/site-visit">다음 이야기: 학생들과 함께 걸을 길을 먼저 살펴보다 →</Link></p><Link href="/exchange/taiwan-2026" className="text-button">대만 교류 연재 목록 →</Link></footer>
    </article>
  </div>;
}
