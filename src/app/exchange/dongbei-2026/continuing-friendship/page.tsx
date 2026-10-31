import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';

export const metadata: Metadata = { title: '작년에 만난 친구에게, 올해의 응원을', description: '2026년 하반기 동북육재학교와의 헬로우이프렌즈 교류. 고3 희망 학생들의 온라인 만남과 수능 응원, 앞으로 준비할 영상과 소포·엽서.' };

export default function ContinuingFriendship() {
  return <div className="page exchange-page">
    <Link href="/exchange/dongbei-2026" className="back-link">← 2026 중국 국제교류 · 동북육재학교로 돌아가기</Link>
    <article className="exchange-article">
      <header><p className="eyebrow">2026 중국 국제교류 · 동북육재학교 · 첫 번째 이야기</p><h1>작년에 만난 친구에게, 올해의 응원을</h1><p className="exchange-muted">2026년 하반기 · 헬로우이프렌즈</p></header>
      <div className="exchange-prose">
        <p>작년 한중고교생교류사업으로 만났던 동북육재학교와 올해도 인연을 이어 가고 있다. 서로의 학교를 오가며 시작한 만남이, 올해 하반기에는 헬로우이프렌즈 온라인 교류로 이어졌다.</p>
        <p>참여한 학생들은 작년 교류에 함께했던 학생 중 희망자들이다. 이제 고3이고, 교류가 하반기에 시작된 만큼 학업과 입시 준비를 고려해야 했다. 다시 교류하고 싶은 학생들이 참여하도록 했다.</p>
        <p className="exchange-key"><strong>고3의 일상 속에서도,<br />친구와의 인연을 이어 가기.</strong></p>
        <p>온라인 교류에서는 책을 대화의 소재로 삼았다. 우리 쪽에서는 『어린 왕자』를 바탕으로 ‘나에게 소중한 존재’와 ‘서로에게 특별해지는 과정’을 이야기할 수 있도록 자료를 준비했다. 중국 쪽 발표 자료에는 『서유기』의 인물과 모험, 우정과 성장에 관한 이야기가 담겼다.</p>
        <p>서로 다른 책을 통해 각자가 중요하게 생각하는 것을 나눌 수 있는 만남을 준비한 것이다. 작년에 알게 된 친구들과 올해는 조금 다른 이야기를 이어 가고 싶었다.</p>
        <p>그리고 최근에는 동북육재학교 학생들이 우리 학생들을 위한 수능 응원영상을 보내왔다. 입시를 앞둔 시기에, 멀리 있는 친구들이 보내온 응원이라 더욱 의미 있게 느껴졌다.</p>
        <figure className="exchange-figure"><video controls playsInline preload="metadata" poster="/videos/exchange/dongbei-2026/cheering-intro.jpg" width="1280" height="720" aria-label="응원영상 도입부 7.5초: 종이비행기와 편지 애니메이션. 소리 없음."><source src="/videos/exchange/dongbei-2026/cheering-intro.mp4" type="video/mp4" />브라우저에서 영상을 재생할 수 없습니다.</video><figcaption>응원영상 도입부 · 7.5초 · 무음. 종이비행기가 날아가고 편지가 열리는 장면입니다. 학생 얼굴과 이름이 없는 부분만 담았습니다.</figcaption></figure>
        <p className="exchange-key"><strong>작년의 만남이,<br />올해 서로를 응원하는 사이로 이어지고 있다.</strong></p>
        <p>우리 학생들도 중국 친구들에게 응원영상을 만들어 보낼 생각이다. 소포도 준비할 예정이고, 그 안에는 학생들이 마음을 적은 엽서를 함께 넣으려 한다. 온라인에서 전한 인사가 영상과 손글씨로도 이어지기를 바란다.</p>
        <p>올해 교류는 아직 진행 중이다. 온라인으로 만나고, 응원을 받고, 이제 우리가 보낼 마음을 준비하고 있다. 작년의 교류가 한 번의 방문으로 끝나지 않고 이렇게 이어지고 있다는 점을 기록해 두고 싶다.</p>
      </div>
      <section className="exchange-checklist" aria-labelledby="continuing-checklist-title">
        <p className="eyebrow">교류를 이어 가며</p><h2 id="continuing-checklist-title">이번 교류에서 기억해 둘 것</h2>
        <ol>
          <li><h3>참여는 학생의 상황에 맞게</h3><p>고3 하반기인 만큼 희망자를 중심으로 진행하고, 준비 부담을 살핀다.</p></li>
          <li><h3>실시간 만남과 다른 방식 함께 활용하기</h3><p>온라인 대화에 응원영상과 엽서를 더해 서로의 시간에 맞춰 마음을 전한다.</p></li>
          <li><h3>진행 상황 구분하기</h3><p>온라인 교류를 진행했고, 중국 측 수능 응원영상은 받았다. <strong>우리 측 응원영상 제작·발송과 소포·엽서 준비는 앞으로 진행할 예정이다.</strong></p></li>
        </ol>
      </section>
      <footer className="exchange-article-footer"><Link href="/exchange/dongbei-2026" className="text-button">동북육재학교 교류 연재 목록 →</Link></footer>
    </article>
  </div>;
}
