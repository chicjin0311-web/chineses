import type { Metadata } from 'next';
import Link from 'next/link';
import { ExchangeTags } from '@/components/exchange-tags';
import '../../exchange.css';

const title = '학생들의 소감문에서 다시 만난 중국 교류';
const description = '2025 중국 국제교류 · 동북육재학교 세 번째 이야기. 학생들의 방중 소감문에서 돌아본 친구와의 만남, 달라진 생각과 다음 교류 준비.';
const url = 'https://chineses.vercel.app/exchange/dongbei-2025/student-reflections';
export const metadata: Metadata = {
  title: `동북육재학교 학생 소감문 | ${title}`, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article', locale: 'ko_KR' },
};

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange/dongbei-2025">← 2025 중국 국제교류 · 동북육재학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2025 중국 국제교류 · 동북육재학교 · 세 번째 이야기 · 학생 소감문</p><h1>{title}</h1></header>
      <div className="exchange-prose">
        <p>교류를 마치고 학생들의 소감문을 읽었다. 같은 일정에 함께했지만, 마음에 남은 장면은 조금씩 달랐다. 학교를 안내해 준 친구, 함께 만든 만두, 헤어지며 건넨 선물. 내가 준비했던 일정이 학생들에게는 각자의 이야기로 남아 있었다.</p>
        <p>특히 눈에 들어온 것은 처음의 걱정이 달라졌다는 이야기였다. 중국에 대해 막연하게 생각했던 모습과 직접 만난 친구들의 모습은 달랐다고 했다. 좋아하는 음악과 취미를 이야기하다 보니, 어느새 자신과 비슷한 또래 친구로 느껴졌다는 소감도 있었다.</p>
        <p className="exchange-key"><strong>낯선 나라에 대한 생각이,<br />한 친구와의 만남을 통해 달라지고 있었다.</strong></p>
        <p>물론 대화가 처음부터 편했던 것은 아니다. 준비한 말을 꺼내기 어려웠다는 학생도 있었고, 번역기를 사용하며 이야기를 이어 간 학생도 있었다. 그래도 끝까지 설명해 주고 기다려 준 친구의 배려는 오래 기억에 남았다.</p>
        <p>학교에서 함께한 시간이 짧아 아쉬웠다는 이야기도 마음에 남았다. 다음 교류에서는 방문할 곳을 더 늘리기보다, 친구와 이야기하고 함께 움직일 시간을 조금 더 넉넉하게 마련하고 싶다.</p>
        <p className="exchange-small">2025년 한·중 고교생 교류 방중연수 학생 소감문과 학교방문행사 운영결과보고서를 바탕으로 재구성했습니다. 학생 개인의 경험을 요약한 글이며, 전체 참가자의 동일한 변화나 학습 효과를 측정한 결과는 아닙니다. 이름·학번과 개인적인 내용은 제외했습니다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="reflection-preparation-title">
        <p className="eyebrow">다음 교류를 준비한다면</p><h2 id="reflection-preparation-title">친구와의 시간을 남기는 세 가지 준비</h2>
        <ol>
          <li><h3>대화를 이어 갈 질문</h3><p>자기소개 다음에 이어 갈 질문을 학생마다 몇 가지 준비한다. 취미·학교생활처럼 서로 답하기 쉬운 주제로 시작한다.</p></li>
          <li><h3>짝과 함께할 시간</h3><p>함께 만드는 활동과 자유롭게 대화할 시간을 일정에 넣는다. 말이 막힐 때 쓸 표현과 번역 도구 사용 방법도 안내한다.</p></li>
          <li><h3>세 가지 질문으로 돌아보기</h3><p>기억에 남은 장면, 달라진 생각, 아쉬웠던 점을 남긴다. 좋은 경험과 어려움을 함께 읽고 다음 운영에 반영한다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/dongbei-2025/visit-china">방중 이야기 다시 읽기 →</Link><br /><Link href="/exchange/dongbei-2026/continuing-friendship">올해로 이어진 친구들의 만남 →</Link></footer>
      <ExchangeTags tags={['중국국제교류', '동북육재학교', '학생소감문', '국제교류준비']} />
    </article>
  </div>;
}
