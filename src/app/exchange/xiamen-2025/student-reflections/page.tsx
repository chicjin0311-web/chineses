import type { Metadata } from 'next';
import Link from 'next/link';
import { ExchangeTags } from '@/components/exchange-tags';
import '../../exchange.css';

const title = '함께 지낸 며칠, 학생들의 일기에 남은 것들';
const description = '2025 중국 국제교류 · 샤먼과학기술고등학교 네 번째 이야기. 5월 방한 홈스테이 소감문과 사진일기에 남은 일상, 우정과 학생 기록 활동.';
const url = 'https://chineses.vercel.app/exchange/xiamen-2025/student-reflections';
export const metadata: Metadata = {
  title: `샤먼 국제교류 학생 소감문 | ${title}`, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article', locale: 'ko_KR' },
};

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange/xiamen-2025">← 2025 중국 국제교류 · 샤먼과학기술고등학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2025 중국 국제교류 · 샤먼과학기술고등학교 · 네 번째 이야기 · 5월 방한의 학생 기록</p><h1>{title}</h1></header>
      <div className="exchange-prose">
        <p>2025년 5월, 샤먼 친구들은 우리 학생들의 집에 머물렀다. 그때의 소감문과 사진일기를 다시 보니, 공식 일정 사이에 있던 일상들이 눈에 들어왔다. 함께 먹은 저녁, 보드게임, 집으로 돌아가며 나눈 이야기들이었다.</p>
        <p>한 학생은 중국 친구와 김밥을 만들었던 과정을 자세히 남겼다. 재료를 준비하고 김밥을 말며 웃었던 시간이 서로 가까워지는 계기가 됐다고 했다. 다른 학생은 중국 친구에게 춤을 배우며 함께 무대를 준비했던 순간을 기억했다.</p>
        <p className="exchange-key"><strong>함께 무언가를 해 보는 시간이,<br />어색했던 첫 만남을 바꾸고 있었다.</strong></p>
        <p>사진일기에는 전주에서 함께한 전통놀이와 식사, 마지막 날 받은 편지, 새벽의 작별 인사도 남아 있었다. 학생들이 골라 놓은 장면을 보니, 교류가 각자의 생활 속으로 들어왔다는 것이 느껴졌다.</p>
        <p>소감문에는 만나기 전의 걱정이나 선입견이 달라졌다는 이야기도 있었다. 모든 학생이 같은 경험을 한 것은 아니지만, 함께 지내며 상대를 알아 갈 기회가 생겼다는 점은 소중했다.</p>
        <p>다음에도 학생들에게 기록할 시간을 주고 싶다. 잘 쓴 소감문 한 편보다, 자신이 기억하고 싶은 장면과 그 이유를 솔직하게 남길 수 있도록.</p>
        <p className="exchange-small">2025년 5월 방한 홈스테이 소감문과 사진일기를 바탕으로 재구성했습니다. 12월 방중 후기와는 구분한 기록입니다. 이름·학번·얼굴과 개인적인 내용은 공개하지 않고, 학생들의 경험을 요약했습니다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="diary-preparation-title">
        <p className="eyebrow">학생 기록을 준비한다면</p><h2 id="diary-preparation-title">짧게 남기고, 함께 돌아보기</h2>
        <ol>
          <li><h3>하루 한 장면</h3><p>기억에 남은 장면 하나와 그 이유를 짧게 적도록 한다. 사진이 없어도 글만으로 충분하다.</p></li>
          <li><h3>솔직하게 쓸 수 있는 질문</h3><p>즐거웠던 일뿐 아니라 말이 통하지 않았던 순간, 아쉬웠던 점도 편하게 남기도록 한다.</p></li>
          <li><h3>기록과 공개를 구분하기</h3><p>공개할 내용과 범위를 먼저 확인한다. 이름·학번·얼굴뿐 아니라 본문과 편지 속 친구 이름, 연락처, 개인적인 이야기도 살핀다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/xiamen-2025/our-first-story">5월 방한부터 12월 방중까지, 처음 이야기로 →</Link></footer>
      <ExchangeTags tags={['중국국제교류', '샤먼과학기술고등학교', '학생소감문', '홈스테이']} />
    </article>
  </div>;
}
