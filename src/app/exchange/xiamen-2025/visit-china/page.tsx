import { ExchangeTags } from '@/components/exchange-tags';
import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';

export const metadata: Metadata = { title: "샤먼 국제교류 방중 수업 | 우리 집에 왔던 친구의 학교를 찾아가다", description: '2025 중국 국제교류 · 샤먼과학기술고등학교 세 번째 이야기. 12월 방중에서 함께한 수업과 문화 경험.' , alternates: { canonical: "https://chineses.vercel.app/exchange/xiamen-2025/visit-china" }, openGraph: { title: "샤먼 국제교류 방중 수업 | 우리 집에 왔던 친구의 학교를 찾아가다", description: "2025 중국 국제교류 · 샤먼과학기술고등학교 세 번째 이야기. 12월 방중에서 함께한 수업과 문화 경험.", url: "https://chineses.vercel.app/exchange/xiamen-2025/visit-china", type: "article", locale: "ko_KR" }};

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange/xiamen-2025">← 2025 중국 국제교류 · 샤먼과학기술고등학교</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2025 중국 국제교류 · 샤먼과학기술고등학교 · 세 번째 이야기 · 12월 방중</p><h1>우리 집에 왔던 친구의 학교를 찾아가다</h1></header>
      <div className="exchange-prose">
        <p>5월에는 샤먼 친구들이 우리 학교와 가정을 찾아왔다. 그리고 12월, 이번에는 우리가 샤먼과학기술고등학교를 방문했다. 함께 밥을 먹고 일상을 나눴던 친구들이 어떤 곳에서 배우고 생활하는지 직접 만나는 시간이었다.</p>
        <p className="exchange-key"><strong>이번에는 친구들의 교실이<br />우리의 배움터가 되었다.</strong></p>
        <p>현지 학교에서는 서예·미술·체육 수업에 함께 참여했다. 말로 설명하는 것뿐 아니라 함께 쓰고 만들고 몸을 움직이는 활동으로 교류가 이어졌다.</p>
        <p>로봇코딩·목공·해양과학 수업도 참관했다. 학생들에게는 친구들의 학교생활을 들여다보는 시간이었고, 교사인 나에게는 다른 학교의 수업과 교육환경을 살펴볼 기회였다.</p>
        <p>학교 밖에서 접하는 음식과 거리의 풍경도 배움의 일부였다. 교실에서 익힌 중국어를 실제 상황에서 사용하면서, 언어가 사람과 생활을 연결한다는 것을 경험하는 여행이었다.</p>
        <p className="exchange-key"><strong>서로의 학교를 방문하니,<br />교류의 이야기가 이어졌다.</strong></p>
        <p>12월에는 호텔에서 숙박하며 교류를 진행했다. 한국 가정에서 함께 지냈던 5월과 숙박 방식은 달랐지만, 친구들의 일상에 한 걸음 가까이 다가간다는 의미는 같았다.</p>
        <p>우리 학교를 소개하던 학생들이 이제는 친구들의 학교를 둘러보고 수업에 참여했다. 두 번의 만남을 돌아보면, 국제교류는 서로를 초대하고 찾아가며 이해를 쌓아 가는 과정이었다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="visit-preparation-title">
        <p className="eyebrow">방중을 준비한다면</p><h2 id="visit-preparation-title">먼저 확인할 세 가지</h2>
        <ol>
          <li><h3>참여 수업과 참관 수업 구분</h3><p>학생들이 직접 할 활동, 필요한 준비물, 통역이 필요한 부분을 현지 학교와 확인한다.</p></li>
          <li><h3>숙박과 이동 담당 나누기</h3><p>학생 집결 확인, 인솔교사 이동, 차량 연락을 누가 맡을지 정한다. 출발 전날에는 집결 장소와 시간을 다시 공유한다.</p></li>
          <li><h3>짧게라도 학생 기록 남기기</h3><p>인상적인 수업, 새롭게 알게 된 문화, 실제로 사용한 중국어를 그날그날 적도록 한다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/xiamen-2025/welcome-and-farewell">← 두 번째 이야기: 처음의 환영 인사가, 함께한 시간을 돌아보는 인사로</Link></footer>
    <ExchangeTags tags={["중국국제교류", "샤먼과학기술고등학교", "공동수업", "방중준비"]} /></article>
  </div>;
}
