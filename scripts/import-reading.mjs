import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Run with the directory containing the original Notion Markdown export.
const source = process.argv[2];
if (!source) throw new Error('Provide the original reading export directory.');
const keys = 'Finish|상태|이미지|저자|평점|책스크랩|카테고리';
const books = [];
const skipped = [];
const covers = [...JSON.parse(fs.readFileSync('src/data/reading-covers.json', 'utf8')), ...JSON.parse(fs.readFileSync('src/data/reading-extra-covers.json', 'utf8'))];
const selected = {
  '베이비브레인': '감정은 선택이 아니지만 행동은 선택이라는 것을 안다.',
  '토마스 고든': '가르치는 것은 교사지만 배우는 것은 학생이다.',
  '학교라는 괴물': '배움은 삶을 공유하는 것이며, 경험을 확장하는 것이다.',
  '성격이란 무엇인가': '사람들은 타인의 행동을 설명할 때 성격에서 원인을 찾는 반면에 자신의 행동은 자신이 처한 상황으로 설명하려 한다는 점이다.',
  '상처받지 않는 영혼': '세속적이라는 것은 돈이 많다거나 신분이 높은 것을 뜻하는 게 아니라 내부 문제의 해결책이 외부에 있다고 생각하는 것을 말한다.',
  '에이번리의 앤': '학생들을 가르치면서 가장 어렵고도 가장 흥미로운 일은 학생들이 어떤 생각을 갖고 있는지 자기 생각을 털어놓게 하는 일인 것 같아.',
  '나는 북경': '다들 자신만의 스트레스와 고충에 빠져 있어서 다른 사람을 돌볼 여력이 없었다.',
  '긴긴밤': '같이 있으면 그런 건 큰 문제가 아니야.',
  '정의란 무엇인가': '내 자질은, 내 능력은, 나아가 내 노력은 온전히 나의 것일까?',
  '0~5세': '아기들은 재미있다고 느껴질 때만 열심히 배우지요.',
  '몰입 두번째': '‘내가 좋아하는 일을 함으로써 행복을 추구하지 말고, 내가 해야 할 일을 좋아함으로써 행복을 추구하라’는 것이다.',
  '항상나를가로막는나에게': '진실이 위험하다고 느끼지 않는다면 인간은 거짓말을 하지 않는다.',
};
for (const file of fs.readdirSync(source).filter(f => f.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(source, file), 'utf8').replace(/\r\n/g, '\n');
  const title = raw.match(/^# (.+)/)?.[1].trim();
  if (!title || (title === '제목 없음' && raw.trim() === '# 제목 없음')) { skipped.push(file); continue; }
  const fields = {};
  const matches = [...raw.matchAll(new RegExp(`^(${keys}):[ \\t]*(.*)$`, 'gm'))];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    fields[m[1]] = m[1] === '책스크랩' ? raw.slice(m.index + m[0].indexOf(':') + 1, matches[i + 1]?.index ?? raw.length).trim() : m[2].trim();
  }
  const last = matches.at(-1);
  let notes = last && last[1] !== '책스크랩' ? raw.slice(last.index + last[0].length).trim() : '';
  // Remove copied Notion interface text, keeping the actual bilingual notes.
  if (title === '밝은밤') notes = notes.split('\nAdd icon')[0].trim();
  if (title === '내가 틀릴 수도 있습니다') notes = notes.split('\n**Add icon**')[0].trim();
  notes = notes.replace(/\*?\*?Add icon\*?\*?[\s\S]*?\nChoi\n/g, '');
  let scrap = fields['책스크랩'] ?? '';
  const categories = (fields['카테고리'] ?? '').split(',').map(s => s.trim()).filter(Boolean);
  if (categories.includes(scrap)) scrap = '';
  const highlight = Object.entries(selected).find(([name]) => title.includes(name))?.[1] ?? '';
  if (highlight) assert(raw.includes(highlight), `Quote must be verbatim: ${title}`);
  const id = file.match(/([a-f0-9]{32})\.md$/)?.[1];
  assert(id, `Missing id: ${file}`);
  const cover = covers.find(c => c.id === id);
  const isbn = fields['이미지']?.match(/(?:[mlx])?(97[89]\d{10})/i)?.[1];
  const coverUrl = cover?.imageUrl ?? (isbn ? `https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/${isbn}.jpg` : (fields['이미지'] ?? '').replace(/^http:/, 'https:'));
  const coverSource = cover?.url ?? fields['이미지'] ?? '';
  let reflection = '';
  if (title === '긴긴밤') {
    const marker = '노든은 평화롭고 행복한 우리에서';
    const split = notes.indexOf(marker);
    if (split >= 0) { reflection = notes.slice(split); notes = notes.slice(0, split).trim(); }
  }
  if (title === '밝은밤') { reflection = notes; notes = ''; }
  books.push({ id, title, author: title.startsWith('달러구트') ? '이미예' : (fields['저자'] ?? ''), finish: (fields.Finish ?? '').replaceAll('/', '-'), status: fields['상태'] ?? '', rating: (fields['평점'] ?? '').split('★').length - 1, categories, scrap, notes, reflection, highlight, coverUrl, coverSource, sourceFile: file });
}
books.sort((a, b) => b.finish.localeCompare(a.finish) || a.title.localeCompare(b.title, 'ko'));
assert.equal(new Set(books.map(b => b.id)).size, books.length);
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/reading-books.json', JSON.stringify(books, null, 2) + '\n');
console.log(JSON.stringify({ books: books.length, withNotes: books.filter(b => b.scrap || b.notes || b.reflection).length, highlights: books.filter(b => b.highlight).length, skipped }, null, 2));
