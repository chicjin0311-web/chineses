import fs from 'node:fs';
const books = JSON.parse(fs.readFileSync('src/data/reading-books.json', 'utf8'));
fs.mkdirSync('public/reading-covers', { recursive: true });
const failures = [];
let next = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (next < books.length) {
    const book = books[next++];
    const file = `public/reading-covers/${book.id}.jpg`;
    if (fs.existsSync(file)) continue;
    try {
      const response = await fetch(book.coverUrl.replace(/^http:/, 'https:'), { signal: AbortSignal.timeout(25000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${response.status} ${response.headers.get('content-type')}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1500) throw new Error(`Suspiciously small cover: ${bytes.length}`);
      fs.writeFileSync(file, bytes);
    } catch (error) { failures.push({ title: book.title, id: book.id, url: book.coverUrl, error: String(error) }); }
  }
}));
console.log(JSON.stringify({ saved: fs.readdirSync('public/reading-covers').length, failures }, null, 2));
fs.writeFileSync('cover-download-report.json', JSON.stringify(failures, null, 2));
