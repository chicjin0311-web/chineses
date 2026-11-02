// Match text, not question ID: edited questions must never play stale audio.
export const questionAudio:Record<string,string>={
 '你要买什么':'buy','需要塑料袋吗':'bag','多少钱':'price','您怎么付':'pay',
 '咱们出去吃还是叫外卖':'choice','出去吃面怎么样':'suggest',
 '你想吃什么':'food','你想喝什么':'drink',
 '想吃什么':'food-short','你吃过牛肉面吗':'experience',
};
export function questionAudioUrl(text:string){
 const key=text.replace(/[\s，,。.!！?？]/g,'');
 const name=questionAudio[key];return name?`/speaking/audio/${name}.mp3`:null;
}
