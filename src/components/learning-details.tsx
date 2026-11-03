type Learning = {
  language: string[]; culture: string[];
  expressions: { zh: string; pinyin: string; meaning: string; usage: string; origin: string }[];
  standards: { domain: string; curriculum: string; codes: string[]; focus: string; connection: string; url: string }[];
  checks: string[]; note: string; status: string;
};

export function LearningDetails({ learning }: { learning: Learning }) {
  return <>
    <section aria-labelledby="learning-goals-title"><h2 id="learning-goals-title">학생의 배움과 학습목표</h2>
      <h3>언어</h3><ul>{learning.language.map(goal => <li key={goal}>{goal}</li>)}</ul>
      <h3>문화</h3><ul>{learning.culture.map(goal => <li key={goal}>{goal}</li>)}</ul>
    </section>
    <section aria-labelledby="core-expressions-title"><h2 id="core-expressions-title">중국어 핵심 표현</h2>
      {learning.expressions.length ? <div className="expression-list">{learning.expressions.map(expression => <article className="expression-item" key={expression.zh}>
        <p className="expression-chinese" lang="zh-Hans">{expression.zh}</p><p className="expression-pinyin">{expression.pinyin}</p>
        <p>{expression.meaning}</p><p><strong>이렇게 사용해요</strong> · {expression.usage}</p><p className="expression-origin">{expression.origin}</p>
      </article>)}</div> : <p>원자료에서 이 차시에 사용한 중국어 문장을 확인하지 못했습니다. 실제 사용 표현을 확인한 뒤 추가하며, 임의의 회화문을 당시 수업 내용으로 넣지 않았습니다.</p>}
    </section>
    <section aria-labelledby="standards-title"><h2 id="standards-title">언어·문화 성취기준과의 연결</h2>
      {learning.standards.map(standard => <article className="standard-item" key={standard.domain}>
        <h3>{standard.domain}</h3><p className="expression-origin">{standard.curriculum}</p>
        {standard.codes.length > 0 && <p className="standard-codes">{standard.codes.map(code => <span key={code}>[{code}] </span>)}</p>}
        <p><strong>기준의 초점</strong> · {standard.focus}</p><p><strong>수업에서의 연결</strong> · {standard.connection}</p>
        <a className="text-button" href={standard.url} target="_blank" rel="noopener noreferrer">교육과정 확인 자료 (새 창)</a>
      </article>)}<p className="archive-scope">{learning.note}</p>
    </section>
    <section><h2>배움을 확인하는 장면</h2><ul>{learning.checks.map(check => <li key={check}>{check}</li>)}</ul><p className="expression-origin">{learning.status}</p></section>
  </>;
}
