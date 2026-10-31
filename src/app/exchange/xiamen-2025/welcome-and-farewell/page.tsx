import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';

export const metadata: Metadata = {
  title: '처음의 환영 인사가, 함께한 시간을 돌아보는 인사로',
  description: '2025 중국 국제교류 · 샤먼과학기술고등학교 두 번째 이야기. 5월 방한의 환영식과 송별식, 학생들의 활동 기록과 교사 준비 사항.',
};

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange/xiamen-2025">← 2025 중국 국제교류 · 샤먼과학기술고등학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2025 중국 국제교류 · 샤먼과학기술고등학교 · 두 번째 이야기 · 5월 방한</p><h1>처음의 환영 인사가, 함께한 시간을 돌아보는 인사로</h1></header>
      <div className="exchange-prose">
        <p>2025년 5월, 샤먼과학기술고등학교 학생들을 우리 학교로 맞이했다. 이번 만남은 학교에서의 수업뿐 아니라 한국 가정에서의 홈스테이로 이어지는 교류였다.</p>
        <p>환영식 자료에는 두 학교의 이름과 행사 순서를 한국어와 중국어로 함께 담았다. 양교의 인사와 학생들의 축사로 만남을 시작하고, 앞으로 함께할 일정과 홈스테이 생활을 안내했다.</p>
        <p className="exchange-key"><strong>첫날에는 앞으로 함께할 시간을<br />소개했다.</strong></p>
        <p>환영식이 끝난 뒤 학생들은 홈스테이 가정으로 향했다. 다음 날부터는 부모님들이 차려 주신 아침밥을 먹고, 함께 수업을 듣고, 저녁에는 모여 놀이를 했다. 한국음식을 만들고 지역을 둘러보며 나눈 시간도 차곡차곡 쌓였다.</p>
        <p>처음에는 일정표에 적혀 있던 활동들이, 며칠 뒤에는 함께 돌아볼 이야기가 됐다.</p>
        <p className="exchange-key"><strong>마지막 인사는 학생들의 소감과<br />함께한 기록으로 채웠다.</strong></p>
        <p>송별식에서는 양교 대표 교사와 학생들이 인사를 나누고, 교류 기간에 수행한 미션을 공유했다. 포토북과 패들렛에 남긴 기록, 편지를 쓰며 돌아본 순간들이 만남을 정리하는 재료가 됐다.</p>
        <p>교사가 준비한 순서로 시작한 교류를 학생들의 소감과 기록으로 마무리한다는 점이 의미 있었다. 무엇을 했는지에 더해, 무엇이 기억에 남았는지를 함께 나누는 시간이었다.</p>
        <p>교류를 준비하며 가장 힘들었던 일 중 하나는 새벽 이동이었다. 입국 때는 학생들을 맞으러 인천공항으로 가야 했고, 귀국 날에는 중국 인솔교사들을 호텔에서 픽업해 학교로 모시는 일도 맡았다. 출발 시간에 맞추려고 호텔에 일찍 도착했지만, 중국 인솔교사들이 약속한 시간보다 늦게 나오면서 학교 도착도 늦어졌다. 다행히 학생들은 모두 잘 모여 있었지만, 내가 호텔에서 기다리는 동안 학교의 학생 집결까지 직접 챙길 수는 없었다.</p>
        <p className="exchange-key"><strong>학생들을 맞는 담당자와<br />방문 교사 이동 담당자를 나누기.</strong></p>
        <p>다음에는 학생 집결 담당자와 방문 교사 이동 담당자를 나누고 싶다. 전날 픽업 시간을 다시 확인하고, 출발이 지연될 때의 연락과 대체 이동 방법도 미리 정해 두려 한다.</p>
        <p>5월의 마지막 인사 뒤에는 12월 샤먼 방문이 기다리고 있었다. 이번에는 우리가 친구들의 학교를 찾아갈 차례였다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="ceremony-preparation-title">
        <p className="eyebrow">환영식과 송별식을 준비한다면</p><h2 id="ceremony-preparation-title">첫 만남부터 마지막 인사까지</h2>
        <ol>
          <li><h3>첫날 안내는 짧고 분명하게</h3><p>양교 언어로 행사 순서와 이후 일정, 홈스테이 인계 방법을 안내한다.</p></li>
          <li><h3>새벽 집결과 교사 이동은 나누어 담당</h3><p>학교 집결 담당자와 호텔·공항 이동 담당자를 지정한다. 전날 집결 시간을 다시 확인하고, 지연 시 연락할 사람과 대체 이동 방법을 정한다.</p></li>
          <li><h3>기록은 첫날부터</h3><p>사진과 짧은 교류 일기를 조금씩 남기면 마지막 날 나눌 이야기가 풍성해진다.</p></li>
          <li><h3>마지막에는 학생의 목소리를</h3><p>대표 소감과 활동 공유 시간을 확보한다. 행사에서 사용할 자료와 홈페이지에 공개할 자료를 구분하고, 공개 자료에는 학생 얼굴·이름·학번 등 개인정보가 드러나지 않도록 확인한다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><p><Link href="/exchange/xiamen-2025/our-first-story">← 첫 번째 이야기: 우리 집에서 시작해, 친구의 학교로 이어진 만남</Link></p><Link href="/exchange/xiamen-2025/visit-china">다음 이야기: 우리 집에 왔던 친구의 학교를 찾아가다 →</Link></footer>
    </article>
  </div>;
}
