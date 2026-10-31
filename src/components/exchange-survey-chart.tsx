// Source: 온라인교류 만족도 조사(Hello e-friends).pdf, pp. 1–20, question 6.
// Counts transcribed from the checked answers; one response on each page.
const satisfaction = [
  { label: '매우 만족', count: 14, tone: 'positive' },
  { label: '만족', count: 4, tone: 'positive' },
  { label: '보통', count: 1, tone: 'neutral' },
  { label: '불만족', count: 0, tone: 'negative' },
  { label: '매우 불만족', count: 1, tone: 'negative' },
];
const total = satisfaction.reduce((sum, item) => sum + item.count, 0);

export function ExchangeSurveyChart() {
  return <figure className="exchange-survey" id="online-survey" aria-labelledby="survey-chart-title">
    <figcaption>
      <p className="eyebrow">Hello, e-Friends! · 온라인 교류 만족도</p>
      <h3 id="survey-chart-title">학생 20명의 응답을 돌아보며</h3>
      <p className="exchange-survey-lead"><strong>18명 · 90%</strong><span>‘매우 만족’ 또는 ‘만족’으로 응답</span></p>
    </figcaption>
    <ul className="exchange-survey-bars" aria-label="만족도 분포: 전체 20명 기준">
      {satisfaction.map(item => <li key={item.label}>
        <div className="exchange-survey-label"><span>{item.label}</span><strong>{item.count}명 · {item.count / total * 100}%</strong></div>
        <div className="exchange-survey-track" aria-hidden="true"><span className={`exchange-survey-fill ${item.tone}`} style={{ width: `${item.count / total * 100}%` }} /></div>
      </li>)}
    </ul>
    <p className="exchange-survey-note">자료: 「온라인교류 만족도 조사(Hello e-friends)」 응답지 20부의 6번 문항. 막대는 전체 20명(100%)을 기준으로 표시했습니다. 무응답은 없으며, 불만족 응답도 포함했습니다.</p>
    <p className="exchange-survey-note">설문 본문에는 2025년, 제목에는 6기로 표기돼 있습니다. 이 자료의 응답만 집계했으며, 학교별 비교나 2026년 교류 전체의 결과로 해석하지 않습니다.</p>
  </figure>;
}
