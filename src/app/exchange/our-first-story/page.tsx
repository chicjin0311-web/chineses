import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';

export const metadata: Metadata = {
  title: '중국에서 대만으로, 이어지는 우리 교실의 국제교류',
  description: '2025년 동북육재학교·샤먼과학기술고등학교와의 교류, 그리고 2026년 대만 교류로 이어지는 교실 이야기.',
};

export default function FirstExchangeStory() {
  return <div className="page exchange-page">
    <Link href="/exchange" className="back-link">← 국제교류 기록으로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">국제교류 기록 01 · 2025–2026</p><h1>중국에서 대만으로,<br />이어지는 우리 교실의 국제교류</h1>
        <div className="exchange-tags" aria-label="교류 방식"><span>온라인 교류</span><span>대면 교류</span></div>
      </header>
      <div className="exchange-prose">
        <p>2025년에는 중국의 두 학교와 국제교류를 진행했다. 동북육재학교, 그리고 샤먼과학기술고등학교. 두 교류 모두 중국을 방문하고, 중국 학생들을 한국으로 맞이하는 시간이 있었다. 다만 시작된 배경과 운영 방식은 달랐다.</p>
        <h2>같은 중국 교류, 서로 다른 두 이야기</h2>
        <p>동북육재학교와는 교육부가 추진한 한중고교생교류사업으로 만났다. 온라인 교류와 대면 교류를 함께 진행하며, 화면 속 만남을 서로의 학교를 방문하는 경험으로 이어 갔다.</p>
        <p>샤먼과학기술고등학교와의 교류는 학교가 자체적으로 추진했다. 5월에는 중국 학생들이 우리 학생들의 집에 머무는 홈스테이로 함께했다. 12월부터는 숙박 방식이 호텔로 바뀌었다. 같은 학교와의 교류 안에서도 만남을 준비하는 방식은 달라졌다.</p>
        <p>그래서 지난해의 이야기는 학교별로 나누어 남기려 한다. 어떻게 준비했고, 학생들은 무엇을 함께했는지. 다시 교류를 준비할 때 꺼내 볼 수 있는 기록이 되었으면 한다.</p>
        <h2>올해는 대만 친구들과</h2>
        <p>2026년에는 대만 교류로 이야기가 이어지고 있다. 온라인으로 만나기 전에는 서로의 문화를 이해하고, 어떤 이야기를 나눌지 준비하는 시간을 가졌다.</p>
        <p>학생들은 학교와 지역을 소개할 자료를 만들고 발표를 준비했다. 우리에게 익숙한 장소를 다른 나라 친구에게 설명하려면, 무엇을 보여 주고 어떻게 말할지 다시 생각하게 된다. 교류를 준비하는 과정도 하나의 배움이 된다.</p>
        <h2>만남 사이의 시간도 기록하기</h2>
        <p>헬로우 이프렌즈와 패들렛에는 온라인 교류 장면과 엽서, 학생들이 준비한 자료가 남아 있다. 직접 만난 날뿐 아니라, 만나기 위해 준비하고 이후의 안부를 나누는 시간도 함께 기록하고 싶다.</p>
        <p>이 공간에는 그 과정을 한 편씩 담으려 한다. 지난해 중국 두 학교와의 이야기부터 올해 대만 교류까지. 우리 교실의 만남이 어떻게 이어지는지 차곡차곡 남겨 본다.</p>
      </div>
      <footer className="exchange-article-footer"><p>다음 기록에서는 2025년 동북육재학교와의 교류를 돌아봅니다.</p><Link className="text-button" href="/exchange">다른 교류 이야기 살펴보기 →</Link></footer>
    </article>
  </div>;
}
