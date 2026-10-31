import type { Metadata } from 'next';
import Link from 'next/link';
import '../style.css';

const title = '내 손으로 엮는 대만 여행 실용서';
const description = '오침안정법으로 만든 소책자에 대만의 정보와 테마별 회화를 담는 이중언어 클래스랩. 영상 제작까지 진행한 2026년 2학기 프로젝트 수업 기록입니다.';
export const metadata: Metadata = {
  title: `${title} — 이중언어 클래스랩`, description,
  alternates: { canonical: 'https://chineses.vercel.app/bilingual/classlab-taiwan-guide' },
  openGraph: { title, description, type: 'article', url: 'https://chineses.vercel.app/bilingual/classlab-taiwan-guide', publishedTime: '2026-10-31T00:00:00+09:00' },
};

const parts = [
  ['대만의 기본정보', '여행과 교류를 준비하며 알아두어야 할 대만의 기본적인 정보를 살펴봅니다.'],
  ['먹거리', '대만의 음식과 먹거리를 알아보고, 자신이 소개하고 싶은 내용을 고릅니다.'],
  ['볼거리', '관심 있는 장소와 볼거리를 살펴보며 여행의 모습을 그려 봅니다.'],
  ['살거리', '여행에서 만나게 될 물건과 쇼핑 상황을 생각하며 필요한 정보를 정리합니다.'],
];

export default function ClasslabTaiwanGuidePage() {
  return <div className="page bilingual-page"><article className="bilingual-article">
    <Link href="/bilingual" className="back-link">← 이중언어교육으로 돌아가기</Link>
    <header className="bilingual-article-header"><p className="eyebrow">이중언어교육 · 클래스랩 수업 기록</p><h1>{title}</h1><p className="bilingual-deck">오침안정법으로 만든 작은 책에<br />대만의 정보와 나만의 여행 회화를 담습니다.</p><p className="bilingual-meta"><time dateTime="2026-10-31">2026. 10. 31.</time> · 2학기 프로젝트 수업 · 진행 중</p></header>
    <div className="bilingual-facts"><dl><div><dt>수업</dt><dd>이중언어 클래스랩</dd></div><div><dt>운영 시기</dt><dd>2026학년도 2학기</dd></div><div><dt>제작 주제</dt><dd>대만 여행 실용서</dd></div><div><dt>소책자 만들기</dt><dd>오침안정법 활용</dd></div><div><dt>현재까지</dt><dd>여행 회화 영상 제작</dd></div><div><dt>다음 단계</dt><dd>QR코드 배부·연결</dd></div></dl></div>
    <section className="bilingual-prose"><h2>교류를 준비하는 배움, 프로젝트 수업으로</h2><p>올해 하반기 도교육청의 이중언어 클래스랩 사업 공모를 계기로, 2학기 수업을 대만 여행 실용서 제작 프로젝트로 진행하고 있습니다.</p><p>본교는 대만 학교와 국제교류를 이어가고 있습니다. 내년에 우리 학교를 방문할 대만 학생들을 이해하고, 앞으로 대만을 방문할 우리 후배들의 준비에도 도움이 되는 배움을 만들고 싶었습니다. 대만을 알아보고 여행 상황에서 필요한 말을 준비하는 일을 수업의 주제로 삼았습니다.</p><p>학생들은 대만에 관한 정보를 배우고, 자신이 관심 있는 내용을 선별하며 각자의 실용서를 만들어 가고 있습니다. 실제로 사용할 장면을 떠올리며 언어와 문화를 함께 배우는 수업입니다.</p></section>
    <section className="bilingual-prose"><h2>첫 시작은 내 손으로 엮는 작은 책</h2><p>먼저 오침안정법을 이용해 소책자를 만들었습니다. 직접 엮은 책은 이후 수업에서 배운 내용과 학생 각자의 관심을 담아 갈 바탕이 되었습니다.</p><p>대만의 기본정보, 먹거리, 볼거리, 살거리에 대한 기본 수업을 진행한 뒤, 학생들이 필요한 내용을 골라 소책자에 정리하고 꾸미는 활동으로 이어 갔습니다.</p><div className="bilingual-culture-grid">{parts.map(([heading, copy]) => <section key={heading}><h3>{heading}</h3><p>{copy}</p></section>)}</div></section>
    <section className="bilingual-prose"><h2>내가 고른 테마에 필요한 회화 세 문장</h2><p>실용서는 학생 각자의 흥미에 맞는 테마를 중심으로 구성합니다. 공통 수업에서 배운 내용을 바탕으로 자신만의 주제를 선택하고, 그 주제에 맞는 여행 정보와 대만 여행 상황에서 사용할 회화 문장 세 개를 담는 것이 과제입니다.</p><p>정보를 많이 모으는 것만큼, 어떤 상황에서 누구에게 어떤 말을 해야 할지 생각하는 과정도 중요합니다. 학생이 고른 정보와 표현이 하나의 여행 장면으로 연결되도록 실용서를 만들어 가고 있습니다.</p><div className="bilingual-flow" aria-label="실용서 구성 흐름"><span>대만 이해</span><span aria-hidden="true">→</span><span>관심 테마 선택</span><span aria-hidden="true">→</span><span>정보 선별</span><span aria-hidden="true">→</span><span>회화 세 문장</span></div></section>
    <section className="bilingual-prose"><h2>想으로 말해 보는 여행, 부스에서 만나다</h2><p>대만 여행의 볼거리·살거리·먹거리와 관련된 회화문을 배우며, 동사 <span lang="zh-Hant">想</span>(xiǎng, ~하고 싶다)을 활용해 자신의 바람을 표현하는 연습을 했습니다.</p><p>교실에는 부스를 꾸며 학생들이 배운 회화문을 직접 활용해 말할 수 있는 활동을 진행했습니다. 보고 싶은 것, 사고 싶은 것, 먹고 싶은 것을 여행 상황과 연결하며 표현을 사용했습니다.</p><p>활동 상품으로는 대만의 누가크래커와 한국의 전통과자를 준비했습니다. 대만과 한국의 먹거리가 함께한 회화 활동이었습니다.</p></section>
    <section className="bilingual-prose"><h2>오늘은 내가 강사, 친구에게 전하는 미니 수업</h2><p>각자 구상한 회화문을 친구에게 설명하는 수업도 진행했습니다. 학생들은 자신이 강사가 되어 미니 수업을 설계하고, 회화문에서 중요한 구문을 친구에게 설명했습니다.</p><p>내가 만든 문장이 어떤 상황에서 쓰이는지, 중요한 표현을 어떻게 설명하면 좋을지 생각하며 수업을 준비하는 활동이었습니다. 회화문을 만드는 경험에 더해, 그 안의 표현을 다른 사람의 배움으로 연결해 보는 시간을 가졌습니다.</p></section>
    <section className="bilingual-prose"><h2>종이책에서 소리와 영상으로</h2><p>실용서에는 글뿐 아니라 듣고 볼 수 있는 자료도 연결하려고 합니다. 자신이 작성한 테마별 회화문을 직접 녹음한 음원과, 해당 회화 상황을 보여주는 영상을 QR코드로 제시하는 방식입니다.</p><p>현재는 힉스필드(Higgsfield)를 활용한 회화 영상 제작까지 진행했습니다. 영상은 여행 상황과 표현을 학습하기 위해 제작한 자료이며, 실제 대만 현장 촬영 영상과는 구분됩니다.</p><p><strong>QR코드는 아직 학생들에게 배부하기 전입니다.</strong> 음원과 영상을 실용서에 연결하는 작업은 앞으로 이어 갈 단계입니다.</p></section>
    <section className="bilingual-prose"><h2>지금까지와 앞으로를 구분해서 기록합니다</h2><ol className="bilingual-steps"><li><span className="bilingual-step-number" aria-hidden="true">01</span><div><span className="bilingual-label">진행한 수업</span><h3>소책자 제작과 대만 이해</h3><p>오침안정법으로 소책자를 만들고, 대만의 기본정보·먹거리·볼거리·살거리를 배우며 학생별 정보 선별과 책 꾸미기로 이어 갔습니다.</p></div></li><li><span className="bilingual-step-number" aria-hidden="true">02</span><div><span className="bilingual-label">진행한 수업</span><h3>부스 회화 활동과 학생 강사 미니 수업</h3><p>想을 활용한 여행 회화를 부스에서 사용하고, 각자 설계한 미니 수업에서 친구에게 회화문의 중요한 구문을 설명했습니다.</p></div></li><li><span className="bilingual-step-number" aria-hidden="true">03</span><div><span className="bilingual-label">현재 진행 상황</span><h3>테마별 실용서 구성과 회화 영상 제작</h3><p>각자의 테마에 맞는 정보와 회화 세 문장을 담는 실용서를 제작하고 있습니다. 회화 영상은 제작했으며, QR코드는 아직 배부하지 않았습니다.</p></div></li><li><span className="bilingual-step-number" aria-hidden="true">04</span><div><span className="bilingual-label">앞으로의 계획</span><h3>실용서와 음원·영상 연결</h3><p>학생의 회화 녹음과 제작 영상을 QR코드로 연결해, 종이책을 읽으며 표현을 듣고 상황을 볼 수 있도록 할 계획입니다.</p></div></li></ol></section>
    <section className="bilingual-prose"><h2>12월 대만 교류와 연결해 보고 싶은 활동</h2><p>다음 활동으로는 올해 12월 대만 국제교류에 참여하는 학생들이 공통 키링을 활용해 간단한 현장 영상을 촬영하는 방안을 구상하고 있습니다. 교실에서 준비한 실용서가 실제 대만의 장소와 경험으로 이어지는 모습을 남기려는 생각입니다.</p><p>이 활동은 아직 실시하지 않은 계획입니다. 현장 활동을 어떻게 수업과 연결할지 구체화하면서, 이후의 진행 과정도 차례로 기록하려고 합니다.</p></section>
    <section className="bilingual-prose"><h2>우리가 만든 책이 다음 만남의 길잡이가 되기를</h2><p>이번 클래스랩에서는 학생들이 배우는 사람인 동시에, 다른 사람이 활용할 자료를 만드는 사람이 됩니다. 자신이 고른 정보와 직접 준비한 표현이 후배들의 여행과 교류를 돕는 작은 길잡이가 되기를 바랍니다.</p><p>종이책에 담긴 배움이 목소리와 영상으로 이어지고, 다시 실제 만남에서 쓰이는 것. 대만 여행 실용서 프로젝트가 향하는 방향입니다.</p></section>
    <footer className="bilingual-article-footer"><p>2026년 10월 31일 기준의 수업 진행 기록입니다. QR코드 배부와 12월 현장 활동은 이후 계획입니다.</p><Link className="text-button" href="/bilingual">이중언어교육 기록으로 돌아가기 →</Link></footer>
  </article></div>;
}
