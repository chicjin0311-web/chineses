import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';

export const metadata: Metadata = { title: '우리 집에서 시작해, 친구의 학교로 이어진 만남', description: '2025 샤먼과학기술고등학교 교류 첫 번째 이야기. 5월 방한 홈스테이와 12월 방중의 기록.' };

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange/xiamen-2025">← 2025 샤먼과학기술고등학교 교류로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2025 샤먼과학기술고등학교 교류 · 첫 번째 이야기</p><h1>우리 집에서 시작해, 친구의 학교로 이어진 만남</h1></header>
      <div className="exchange-prose">
        <p>2025년에는 학교 자체로 추진한 샤먼과학기술고등학교와의 교류도 있었다. 국제교육원 사업으로 참여했던 동북육재학교 교류와는 별개의 만남이었다.</p>
        <p className="exchange-key"><strong>5월에는 중국 친구들을 맞이하고,<br />12월에는 우리가 샤먼을 찾아갔다.</strong></p>
        <p>5월에는 중국 학생들이 우리 학생들의 집에 머물렀다. 국제교류에 선발된 학생들은 그 주를 샤먼 친구들과 함께 보내며 학교 수업부터 가정생활까지 다양한 활동을 나눴다.</p>
        <p>아침이면 한국의 부모님들이 김밥을 비롯해 다양한 한국식 아침밥을 차려 주셨다. 저녁에는 학생들끼리 모여 놀이를 하고, 한국음식 만들기도 함께 체험했다. 학교에서 만난 친구가 우리 집 손님이 되어 일상을 나누는 시간이었다.</p>
        <p className="exchange-key"><strong>함께 먹는 아침밥과 저녁 놀이도<br />국제교류의 한 장면이 되었다.</strong></p>
        <p>전주에서는 한복을 입고 한옥마을을 둘러봤고, 광양에서는 두부 만들기와 자개공예를 체험했다. 학생회가 준비한 무대와 ‘무엇이든 물어보세요’ 시간에는 서로의 학교와 생활에 대한 궁금증을 나눴다. 포토북과 패들렛 미션으로 함께한 시간을 기록하고, 편지를 쓰며 마음을 전하기도 했다.</p>
        <p>12월에는 우리가 친구들의 학교를 찾아갔다. 샤먼에서는 서예·미술·체육 수업에 함께 참여하고, 로봇코딩·목공·해양과학 수업을 참관했다. 우리 학교를 소개하던 학생들이 이번에는 친구들의 배움과 일상을 들여다보는 사람이 됐다.</p>
        <p>12월 방중 때는 숙박 방식이 호텔로 바뀌었다. 5월의 홈스테이와 운영 방식은 달랐지만, 서로의 학교를 오가며 만남을 이어 갔다는 점은 같았다.</p>
        <p>돌아보면 이 교류는 학교와 가정이 함께 준비한 시간이었다. 학생들을 맞아 준 가정의 협조, 수업을 열어 준 선생님들, 활동을 준비한 학생들이 있었기에 가능한 만남이었다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="xiamen-preparation-title">
        <p className="eyebrow">교류를 준비한다면</p><h2 id="xiamen-preparation-title">먼저 맞출 세 가지</h2>
        <ol>
          <li><h3>방문 순서와 숙박 방식</h3><p>초청과 방문 시기, 홈스테이·호텔 여부를 양교가 먼저 정한다.</p></li>
          <li><h3>가정과 학교의 역할</h3><p>홈스테이는 식사·등하교·저녁 활동과 비상 연락 방법까지 보호자와 공유한다. 음식 알레르기와 생활상 주의사항도 미리 확인한다.</p></li>
          <li><h3>함께할 활동과 기록</h3><p>공동수업과 문화 체험에 편지·포토북 같은 기록 활동을 더한다. 함께한 경험을 학생들의 말로 남기도록 한다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/xiamen-2025/welcome-and-farewell">다음 이야기: 처음의 환영 인사가, 함께한 시간을 돌아보는 인사로 →</Link></footer>
    </article>
  </div>;
}
