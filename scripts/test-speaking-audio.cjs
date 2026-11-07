const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
function load(path){const s={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,s);return s.exports;}
const {questionAudioUrl}=load('src/lib/speaking-audio.ts');
const {speakingBank}=load('src/lib/speaking-bank.ts');
for(const q of speakingBank){const url=questionAudioUrl(q.text);assert.ok(url,q.text);assert.ok(fs.statSync('public'+url).size>1000);}
assert.equal(questionAudioUrl('出去吃面, 怎么样?'),'/speaking/audio/suggest.mp3');
assert.equal(questionAudioUrl('你想吃什么？'),'/speaking/audio/food.mp3');
assert.equal(questionAudioUrl('你想吃饺子吗？'),null,'edited question must not reuse old recording');
console.log('PASS: all default questions have audio assets; punctuation normalization; edited text cannot play stale audio');

assert.equal(speakingBank.length,10,'final assessment has ten questions');
assert.deepEqual(Array.from(speakingBank.slice(0,2),q=>q.variants.length),[3,3]);
assert.equal(speakingBank[0].variants[1].cue,'水果 · 一些');
assert.ok(!JSON.stringify(speakingBank).includes('一点儿'));
assert.ok(speakingBank.every(q=>q.variants.every(v=>!v.image)));
assert.ok(speakingBank.slice(5,8).every(q=>q.variants.length===1&&!q.variants[0].cue));
assert.ok(speakingBank[4].variants.length===4);
console.log('PASS: final ten-question structure, separate purchase pools, textbook fruit wording, text-only cues, cue-free listening questions');

assert.equal(speakingBank[0].variants[0].cue,'牛奶 · 一瓶');
assert.equal(speakingBank[0].variants[2].cue,'红色 · 衣服 · 一件');
assert.deepEqual(Array.from(speakingBank[1].variants,v=>v.cue),['平板电脑 · 一台','裙子 · 两条','苹果 · 三斤']);
