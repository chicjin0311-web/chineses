import { ExchangeTags } from '@/components/exchange-tags';
import type { Metadata } from 'next';
import Link from 'next/link';
import '../../exchange.css';
export const metadata: Metadata = { title: "중국 국제교류 방한 | 이번에는 우리가 친구들을 맞이할 차례", description: '2025 중국 국제교류 · 동북육재학교 · 두 번째 이야기 · 방중 이후 이어진 방한' , alternates: { canonical: "https://chineses.vercel.app/exchange/dongbei-2025/visit-korea" }, openGraph: { title: "중국 국제교류 방한 | 이번에는 우리가 친구들을 맞이할 차례", description: "2025 중국 국제교류 · 동북육재학교 · 두 번째 이야기 · 방중 이후 이어진 방한", url: "https://chineses.vercel.app/exchange/dongbei-2025/visit-korea", type: "article", locale: "ko_KR" }};
export default function Story() { return <div className="page exchange-page"><Link className="back-link" href="/exchange/dongbei-2025">← 2025 중국 국제교류 · 동북육재학교로 돌아가기</Link><article className="exchange-article"><header><p className="eyebrow">2025 중국 국제교류 · 동북육재학교 · 두 번째 이야기 · 방한</p><h1>이번에는 우리가 친구들을 맞이할 차례</h1></header><div className="exchange-prose">
<p>우리가 먼저 중국 동북육재학교를 방문한 뒤, 이번에는 중국 친구들이 우리 학교를 찾았다. 중국에서 함께 만두를 만들고 다도 수업에 참여했다면, 이제는 우리의 수업과 일상을 소개할 차례였다.</p>
<p className="exchange-key"><strong>국제교류는 학교가 함께<br />준비하는 일이었다.</strong></p>
<p>방한 일정을 짜면서 가장 중요했던 것은 다른 교과 선생님들과의 협력이었다. 수업 시간과 교실을 정하고, 활동에 따라 학생들을 어떻게 나눌지도 함께 의논해야 했다.</p>
<p>음악과 미술은 학생들을 10명씩 나누어 진행했고, 중국어 수업은 합반으로 운영했다. 정보 시간에는 드론 수업을 하고, 체육 시간에는 함께 몸을 움직였다. 교과마다 다른 방식으로 친구들과 어울리는 시간이 만들어졌다.</p>
<p>학생회가 준비한 한국문화 체험도 이어졌다. 봉숭아 물들이기, 투호, 케이팝 댄스 배우기. 우리에게 익숙한 활동을 중국 친구들에게 소개하면서, 학생들도 교류를 이끄는 역할을 맡았다.</p>
<p className="exchange-key"><strong>우리의 평범한 학교생활이<br />교류의 내용이 되었다.</strong></p>
<p>돌아보면 특별한 프로그램을 마련하는 것만큼, 평소의 수업과 학생 활동을 함께 나누는 일이 의미 있었다. 여러 교과 선생님들과 학생회가 참여했기에 가능한 일정이었다.</p>
<p>온라인에서 인사를 나누고, 서로의 학교를 방문하며 이어 온 만남. 작년의 경험은 올해 희망 학생들이 참여하는 온라인 교류로 다시 이어지고 있다.</p>
</div><section className="exchange-checklist" aria-labelledby="school-title"><p className="eyebrow">학교 전체가 함께 준비할 사항</p><h2 id="school-title">방문 전에 함께 맞출 세 가지</h2><ol><li><h3>교과별 시간과 담당 교사</h3><p>음악·미술·중국어·정보·체육 등 참여 교과와 수업 시간을 학교 전체 일정에서 먼저 맞춘다.</p></li><li><h3>분반·합반과 이동 안내</h3><p>그룹별 학생 수, 사용할 교실, 이동을 안내할 담당자를 정한다. 드론·체육 등 활동별 준비물과 안전 안내도 확인한다.</p></li><li><h3>학생회 역할과 준비물</h3><p>문화 체험별 진행 학생과 지원 교사를 정하고, 재료·공간·진행 시간을 함께 점검한다.</p></li></ol></section><footer className="exchange-article-footer"><p><Link href="/exchange/dongbei-2025/visit-china">← 이전 이야기: 화면으로 만난 친구의 학교를 찾아가다</Link></p><Link href="/exchange/dongbei-2026">올해로 이어진 인연: 2026 중국 국제교류 · 동북육재학교 →</Link></footer><ExchangeTags tags={["중국국제교류", "동북육재학교", "공동수업"]} /></article></div>; }
