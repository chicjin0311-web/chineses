import type { Metadata } from 'next';
import Link from 'next/link';
import '../style.css';

const title = '말하고, 노래하고, 놀며 배우는 중국어';
const description = '전남 여수의 국제교육원에서 초등팀과 중등팀이 함께 만드는 초등 고학년 대상 이중언어 교재의 개발 이야기입니다.';
export const metadata: Metadata = {
  title: `${title} — 이중언어 교재 공동 개발`, description,
  alternates: { canonical: 'https://chineses.vercel.app/bilingual/textbook-development' },
  openGraph: { title, description, type: 'article', url: 'https://chineses.vercel.app/bilingual/textbook-development', publishedTime: '2026-10-31T00:00:00+09:00' },
};

const steps = [
  ['01', '중등팀', '말할 내용 만들기', '각 과의 기초 회화문과 확장 연습을 구성했습니다. 학생들이 일상에서 어떤 말을 할 수 있을지 생각하며 표현과 대화의 흐름을 마련했습니다.'],
  ['02', '초등팀', '노래와 놀이로 연결하기', '회화문과 확장 연습을 바탕으로 노래와 놀이를 개발했습니다. 배운 표현을 리듬에 맞춰 부르고 친구들과 활동하며 반복할 수 있도록 구성했습니다.'],
  ['03', '중등팀', '문화 이야기로 마무리하기', '중국 문화를 소개하는 내용으로 단원을 마무리했습니다. 언어를 배우는 활동이 문화의 차이를 이해하고 존중하는 배움으로 이어지도록 했습니다.'],
];
const cultures = [
  ['인사와 관계', '전통 인사법, 감사의 몸짓, 체면과 배려, 애칭을 통해 사람 사이의 마음을 표현하는 방식을 살펴봅니다.'],
  ['생활과 음식', '장수면, 아침 식사, 짜장면, 학교생활 등 친숙한 소재를 통해 우리의 일상과 중국의 일상을 비교합니다.'],
  ['다양한 문화의 의미', '민족의 다양성, 숫자와 색의 상징, 선물에 담긴 뜻을 알아보며 한 가지 기준으로 문화를 판단하지 않는 태도를 생각합니다.'],
  ['변화하는 오늘의 중국', '공유 보조배터리, 숫자로 전하는 온라인 메시지, 반려로봇, 드론 배송과 새로운 결제 방식 등 현대 생활문화를 만납니다.'],
];

export default function TextbookDevelopmentPage() {
  return <div className="page bilingual-page"><article className="bilingual-article">
    <Link href="/bilingual" className="back-link">← 이중언어교육으로 돌아가기</Link>
    <header className="bilingual-article-header"><p className="eyebrow">이중언어교육 · 교재 공동 개발</p><h1>{title}</h1><p className="bilingual-deck">초등팀과 중등팀의 전문성을 모아,<br />기초 중국어와 문화 이해를 한 권에 담습니다.</p><p className="bilingual-meta"><time dateTime="2026-10-31">2026. 10. 31.</time> · 교재 개발 기록</p></header>
    <div className="bilingual-facts"><dl><div><dt>제작</dt><dd>전남 여수의 국제교육원</dd></div><div><dt>협업</dt><dd>초등팀 · 중등팀</dd></div><div><dt>학습 대상</dt><dd>초등학교 고학년</dd></div><div><dt>활용</dt><dd>방과후 수업 등</dd></div><div><dt>개발 기간</dt><dd>2026년 초~12월</dd></div><div><dt>작성일 기준</dt><dd>교재 완성을 앞둔 단계</dd></div></dl></div>
    <section className="bilingual-prose"><h2>기초 표현에서 시작하는 함께 배우기</h2><p>기초 중국어를 배우는 즐거움과 다른 문화를 이해하는 경험을 한 권의 교재에 담고 있습니다.</p><p>전남 여수의 국제교육원에서 추진하는 이번 이중언어 교재 개발은 초등팀과 중등팀의 협업으로 이루어지고 있습니다. 2026년 초부터 12월까지 이어지는 개발 일정 속에서 내용을 다듬어 왔으며, 현재 교재 완성을 앞두고 있습니다.</p><p>대상은 초등학교 고학년입니다. 방과후 수업에서도 활용할 수 있도록, 일상에서 사용할 수 있는 기초 중국어 표현과 중국 문화 이해를 통한 다문화 감수성 함양을 함께 고려했습니다.</p></section>
    <section className="bilingual-prose"><h2>회화에 노래와 놀이를 더한 협업</h2><p>교재 제작은 두 팀의 전문성을 연결하는 과정이었습니다. 하나의 회화문이 확장 연습과 노래, 놀이로 이어지고, 문화 이야기를 통해 배움의 폭을 넓히도록 구성했습니다.</p><ol className="bilingual-steps">{steps.map(([number, team, heading, copy]) => <li key={number}><span className="bilingual-step-number" aria-hidden="true">{number}</span><div><span className="bilingual-label">{team}</span><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol></section>
    <section className="bilingual-prose"><h2>한 단원 안에서 이어지는 배움</h2><p>인사와 감사, 이름, 음식, 감정, 장소 등 학생들에게 친숙한 주제에서 출발합니다. 짧은 대화를 읽는 데 그치지 않고, 표현을 바꾸어 말하고 노래와 놀이 속에서 다시 사용합니다.</p><div className="bilingual-flow" aria-label="단원 학습 흐름"><span>회화</span><span aria-hidden="true">→</span><span>확장 연습</span><span aria-hidden="true">→</span><span>노래와 놀이</span><span aria-hidden="true">→</span><span>문화 이해</span></div><p>‘친구와 함께 대화해 봐요!’에서 핵심 표현을 익히고, ‘실력이 쑥쑥’에서 낱말을 바꾸어 연습합니다. ‘도레미 교실’과 ‘신나는 놀이터’에서는 배운 표현을 즐겁게 반복합니다. 마지막으로 문화 이야기를 읽으며 자신의 경험과 연결해 생각합니다.</p></section>
    <section className="bilingual-prose"><h2>중국의 일상에서 출발하는 문화 이야기</h2><p>문화 파트에서는 중국의 전통과 현대를 함께 다룹니다. 문화 지식을 알아보는 데서 한 걸음 더 나아가, 우리의 경험과 다른 나라의 사례를 함께 살펴보며 공통점과 차이를 발견하도록 구성했습니다.</p><div className="bilingual-culture-grid">{cultures.map(([heading, copy]) => <section key={heading}><h3>{heading}</h3><p>{copy}</p></section>)}</div><blockquote>인사의 모습은 달라도 상대를 존중하는 마음이 담겨 있고,<br />생일 음식은 달라도 소중한 사람의 행복을 바라는 마음이 담겨 있습니다.</blockquote><p>학생들이 같은 마음도 서로 다른 방식으로 표현할 수 있음을 이해하고, 다양한 문화를 존중하는 태도를 기르기를 바랍니다.</p></section>
    <section className="bilingual-prose"><h2>교실에서 함께 펼칠 날을 준비하며</h2><p>이번 공동 개발은 언어를 가르치는 관점과 초등학생의 배움을 설계하는 관점을 모으는 작업이었습니다. 회화문과 활동, 문화 이야기를 연결하며 학생들이 직접 말하고 참여할 수 있는 교재를 만들고자 했습니다.</p><p>완성을 앞둔 교재가 방과후 교실에서 새로운 언어를 만나는 즐거움과 서로의 문화를 이해하는 대화의 출발점이 되기를 기대합니다.</p></section>
    <footer className="bilingual-article-footer"><p>2026년 10월 31일 기준의 교재 공동 개발 기록입니다.</p><Link className="text-button" href="/bilingual">이중언어교육의 다른 이야기 보기 →</Link></footer>
  </article></div>;
}
