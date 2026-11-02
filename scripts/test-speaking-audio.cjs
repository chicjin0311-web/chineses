const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
function load(path){const s={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,s);return s.exports;}
const {questionAudioUrl}=load('src/lib/speaking-audio.ts');
const {speakingBank}=load('src/lib/speaking-bank.ts');
for(const q of speakingBank){const url=questionAudioUrl(q.text);assert.ok(url,q.text);assert.ok(fs.statSync('public'+url).size>1000);}
assert.equal(questionAudioUrl('出去吃面, 怎么样?'),'/speaking/audio/suggest.mp3');
assert.equal(questionAudioUrl('你想吃什么？'),'/speaking/audio/food.mp3');
assert.equal(questionAudioUrl('你想吃饺子吗？'),null,'edited question must not reuse old recording');
console.log('PASS: all default questions have audio assets; punctuation normalization; edited text cannot play stale audio');
