import { ExchangeTags } from '@/components/exchange-tags';
import type { Metadata } from 'next';
import Link from 'next/link';
import '../exchange.css';

export const metadata: Metadata = {
  title: "국제교류 준비와 운영 | 국제교류를 준비하며, 다음에는 이렇게 하고 싶다",
  description: '중국·대만 국제교류를 준비하며 배운 접속 확인, 학교와 가정의 협력, 새벽 이동 역할 분담과 다음 교류를 위한 준비 사항.',
 alternates: { canonical: "https://chineses.vercel.app/exchange/preparing-next-exchange" }, openGraph: { title: "국제교류 준비와 운영 | 국제교류를 준비하며, 다음에는 이렇게 하고 싶다", description: "중국·대만 국제교류를 준비하며 배운 접속 확인, 학교와 가정의 협력, 새벽 이동 역할 분담과 다음 교류를 위한 준비 사항.", url: "https://chineses.vercel.app/exchange/preparing-next-exchange", type: "article", locale: "ko_KR" }};

export default function Story() {
  return <div className="page exchange-page">
    <Link className="back-link" href="/exchange">← 국제교류 기록으로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">중국·대만 국제교류 · 담당 교사의 운영 기록</p><h1>국제교류를 준비하며, 다음에는 이렇게 하고 싶다</h1></header>
      <div className="exchange-prose">
        <p>중국과 대만의 학교들과 교류하며 느낀 것은, 좋은 활동을 준비하는 것만큼 그 활동이 무리 없이 진행될 수 있도록 챙기는 일이 중요하다는 점이었다.</p>
        <p className="exchange-key"><strong>온라인 교류는<br />접속 확인부터 시작하고 싶다.</strong></p>
        <p>중국과의 교류에서는 줌을 준비했지만 연결이 잘되지 않아 부브로 바꿨고, 대만과는 구글미트로 만났다. 다음에도 양교 실무자가 실제 사용할 환경에서 회의를 열고 소리와 화면을 먼저 확인하려 한다. 학생들이 없는 사전 점검에서 소그룹 활동까지 모두 해볼 수는 없으니, 학생 매칭과 방 배정, 입장 안내를 준비해 두는 것이 필요했다.</p>
        <p>큰 주제를 정한 뒤에는 각 학교가 자기 학생들에게 맞게 자료를 준비하면 됐다. 모든 활동을 똑같이 맞추기보다, 학생들이 서로 나눌 이야기를 충분히 준비하는 것이 중요했다.</p>
        <p className="exchange-key"><strong>학교 안의 교류는<br />함께 준비할수록 풍성해졌다.</strong></p>
        <p>동북육재학교 학생들이 왔을 때는 음악·미술 분반 수업, 중국어 합반 수업, 드론과 체육 활동이 이어졌다. 학생회도 한국문화 체험을 맡았다. 다음에는 참여 교과와 학생회가 시간표와 공간, 역할을 더 일찍 함께 정하고 싶다.</p>
        <p>샤먼 학생들의 홈스테이에서는 부모님들이 차려 주신 아침밥과 학생들의 저녁 놀이도 교류의 일부가 됐다. 그만큼 가정에서 맡아야 할 일도 있었다. 식사와 등하교, 저녁 활동과 연락 방법은 보호자에게 구체적으로 안내할 필요가 있었다.</p>
        <p className="exchange-key"><strong>담당 교사 한 사람이<br />모든 이동을 맡지 않았으면 한다.</strong></p>
        <p>샤먼 교류 때는 새벽 공항 이동에 더해, 중국 인솔교사들을 호텔에서 픽업해 학교로 모시는 일도 맡았다. 귀국 날에는 출발 시간에 맞추려고 호텔에 일찍 도착했지만, 중국 인솔교사들이 약속한 시간보다 늦게 나오면서 학교 도착도 늦어졌다. 다행히 학생들은 모두 잘 모여 있었지만, 내가 호텔에서 기다리는 동안 학교의 학생 집결까지 직접 챙길 수는 없었다.</p>
        <p>다음에는 학생 집결 담당자와 방문 교사 이동 담당자를 나누고 싶다. 전날 픽업 시간을 다시 확인하고, 출발이 지연될 때의 연락과 대체 이동 방법도 미리 정해 두려 한다. 담당자가 학생들과의 만남에 집중할 여유도 준비의 한 부분이기 때문이다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="next-preparation-title">
        <p className="eyebrow">다음 교류를 준비한다면</p><h2 id="next-preparation-title">먼저 챙길 네 가지</h2>
        <ol>
          <li><h3>접속</h3><p>양교 실무자의 회의 접속·음성·화면을 확인하고, 연결 실패 시 대안을 마련한다.</p></li>
          <li><h3>학생 준비</h3><p>소그룹 매칭과 입장 안내를 준비하고, 온라인 교류 전에 사전교육을 실시한다.</p></li>
          <li><h3>역할 분담</h3><p>교과·학생회·홈스테이 가정의 역할을 정한다. 학생 집결 담당자와 방문 교사 이동 담당자는 나누고, 지연 시 연락·대체 이동 방법도 정해 둔다.</p></li>
          <li><h3>마무리</h3><p>활동 후 구글폼으로 후기를 받고, 다음에 바꿀 점을 기록한다.</p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange">중국·대만 국제교류 이야기 목록으로 →</Link></footer>
    <ExchangeTags tags={["국제교류준비", "온라인국제교류", "홈스테이", "방한준비"]} /></article>
  </div>;
}
