import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';

export const metadata: Metadata = { title: '이번에는 우리 지역을 소개합니다 — 2차 온라인 교류', description: '2026년 10월 29일 대만과의 두 번째 온라인 교류. 지역 소개와 학생 후기, 학교 방문 때 함께할 지역 탐방으로 이어지는 이야기.' };

const steps = [
  { title: '회의 접속 먼저 확인하기', text: '양교 실무자가 미리 회의를 열어 소리와 화면 공유를 확인한다. 이번 후기에서 나온 끊김과 주변 소음도 점검할 부분이다.' },
  { title: '소그룹 매칭과 입장 안내 준비하기', text: '학생별 그룹과 접속할 방을 미리 정리한다. 실무자 사전 점검에서는 학생이 없으므로 소그룹 활동은 구성과 안내를 준비해 둔다.' },
  { title: '자료는 각 학교에서, 질문도 함께 준비하기', text: '큰 주제를 정한 뒤 각 학교가 자료와 사전교육을 준비한다. 발표는 짧게 하고, 학생마다 상대에게 물어볼 질문을 하나씩 준비하도록 한다.' },
  { title: '구글폼 후기를 다음 활동에 반영하기', text: '만족도뿐 아니라 대화 시간, 접속 문제, 말문이 막혔던 순간을 살핀다. 이번에는 더 이야기할 시간과 대화를 시작할 질문이 다음 준비의 과제로 남았다.' },
];

export default function SecondOnlineExchange() {
  return <div className="page exchange-page">
    <Link href="/exchange/taiwan-2026" className="back-link">← 2026 대만 국제교류 · 허우쭝고등학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2026 대만 국제교류 · 허우쭝고등학교 · 세 번째 이야기</p><h1>이번에는 우리 지역을 소개합니다</h1><p className="exchange-muted">온라인 교류 2차 · 활동일 2026년 10월 29일</p></header>
      <div className="exchange-prose">
        <p>5월에 처음 인사를 나눴던 대만 허우쭝고등학교 친구들과 다시 만났다. 9월 사전답사를 다녀온 뒤 이어진 두 번째 온라인 교류였다. 이번에는 서로가 살고 있는 지역을 소개하며, 12월에 만날 친구들의 일상에 조금 더 가까이 다가가 보기로 했다.</p>
        <p>학생들은 광양·순천·여수의 명소를 조사하고 발표 자료를 준비했다. 구봉산과 이순신대교, 여수 해상케이블카처럼 익숙한 장소도 다른 지역의 친구에게 소개하려니 새롭게 살펴볼 것이 많았다. 짧은 중국어 대본과 사진을 준비하면서, 무엇을 보여 주고 어떻게 설명하면 좋을지 생각하도록 했다.</p>
        <p className="exchange-key"><strong>다른 지역을 알아가는 일이,<br />우리 지역을 다시 보는 일이 되었다.</strong></p>
        <p>구글미트로 만난 학생들은 소그룹에서 서로의 지역 명소를 소개했다. 활동지에는 자신이 소개할 장소와 맡은 역할을 적고, 대만 친구들의 발표를 들으며 특징과 느낀 점을 기록하도록 했다.</p>
        <p>교류 후 구글폼 후기를 읽어 보니, 학생들은 장소의 이름만 기억하고 있지 않았다. 대만 친구가 좋아하는 음식을 신나게 소개하던 모습, 발표 자료에 한국어를 넣어 준 배려도 마음에 남아 있었다. 우리에게 익숙한 장소가 다른 친구에게는 매력적인 여행지가 될 수 있다는 발견도 있었다.</p>
        <p>두 번째 만남이라 더 가까워졌다는 이야기도 반가웠다. 앞선 교류 이후 나누었던 관심사 이야기를 다시 꺼내며 친밀감을 느낀 학생도 있었다. 화면 속 친구가 조금씩 ‘다른 나라의 학생’에서 ‘다시 만나고 싶은 친구’가 되어 가고 있었다.</p>
        <p className="exchange-key"><strong>학생들이 더 원했던 것은,<br />서로 이야기할 시간이었다.</strong></p>
        <p>학생 후기 23건에서 만족도는 ‘매우 만족’ 17명, ‘만족’ 6명이었다. 가장 좋았던 활동으로는 12명이 ‘외국 친구와의 대화’를 골랐다.</p>
        <p>하지만 아쉬움도 분명했다. 더 오래 이야기하고 싶었다는 의견과 함께, 자유시간에 무엇을 물어봐야 할지 몰라 망설였다는 이야기가 있었다. 인터넷 연결이나 주변 소음 때문에 준비한 발표와 대화가 원활하지 않았다는 의견도 나왔다.</p>
        <p>후기를 읽으며 다음에는 발표만큼 질문할 시간을 남겨 두어야겠다고 생각했다. “그곳에서 가장 좋아하는 음식은 뭐야?”, “주말에는 무엇을 해?”처럼 쉽게 꺼낼 수 있는 질문도 함께 준비하면 좋겠다. 자유롭게 이야기하라는 안내에 작은 시작점을 더해 주는 것이다.</p>
        <p className="exchange-key"><strong>화면으로 소개받은 지역을,<br />학교 방문 때 학생들과 함께 둘러보기로 했다.</strong></p>
        <p>이번에 소개한 지역은 학교 방문 때 학생들과 함께 방문하기로 양교가 최종 합의했다. 온라인에서 나눈 이야기가 실제로 함께 걷고 이야기하는 경험으로 이어지게 된 것이다.</p>
        <p>이번 교류는 지역을 소개하는 시간이면서, 다음 만남을 기다리는 시간이기도 했다. 12월에는 화면으로 들었던 이야기를 떠올리며 학생들이 먼저 말을 걸 수 있기를 바란다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="next-preparation-title">
        <p className="eyebrow">온라인 교류를 준비하는 분께</p><h2 id="next-preparation-title">다음 온라인 교류를 준비하며 남겨 둘 네 가지</h2>
        <ol>{steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>
      <footer className="exchange-article-footer"><p><Link href="/exchange/taiwan-2026/site-visit">← 이전 이야기: 학생들과 함께 걸을 길을 먼저 살펴보다</Link></p><Link href="/exchange/taiwan-2026" className="text-button">대만 교류 연재 목록 →</Link></footer>
    </article>
  </div>;
}
