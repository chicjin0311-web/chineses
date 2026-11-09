// Match text, not question ID: edited questions must never play stale audio.
export const questionAudio:Record<string,string>={
 '你要买什么':'buy','需要塑料袋吗':'bag','多少钱':'price','您怎么付':'pay',
 '咱们出去吃还是叫外卖':'choice','出去吃面怎么样':'suggest',
 '你想吃什么':'food','你想喝什么':'drink',
 '这个星期六你打算做什么':'plan','你打算做什么':'plan-short',
 '你想喝可乐还是咖啡':'drink-choice','您要吃鸡肉还是牛肉':'meat-choice',
 '你想喝咖啡还是红茶':'coffee-tea-choice',
 '想吃什么':'food-short','你吃过牛肉面吗':'experience',
};
export function questionAudioUrl(text:string){
 const key=text.replace(/[\s，,。.!！?？]/g,'');
 const name=questionAudio[key];return name?`/speaking/audio/${name}.mp3`:null;
}
