export type Variant = { id: string; image?: string; cue?: string; expected: string; source: string };
export type Question = { id: string; text: string; title: string; instruction: string; variants: Variant[] };
export type AssignedQuestion = Omit<Question, 'variants'> & Variant;
export const speakingBank: Question[] = [
  {id:'buy', title:'구매 품목',text:'你要买什么？',instruction:'그림 속 물건을 사려고 합니다. 물건 이름을 말하세요. 수량은 말하지 않아도 됩니다.',variants:[
    {id:'tablet',image:'/speaking/tablet.png',expected:'平板电脑 / 我要买一台平板电脑。',source:'교과서 69쪽 · 지도서 193쪽'},
    {id:'skirts',image:'/speaking/skirts.png',expected:'裙子 / 我要买两条裙子。',source:'교과서 69쪽 · 지도서 193쪽'},
    {id:'apples',image:'/speaking/apples.png',expected:'苹果 / 我要买三斤苹果。',source:'교과서 69쪽 · 지도서 193쪽'}]},
  {id:'bag',title:'봉투 필요 여부',text:'需要塑料袋吗？',instruction:'자신의 생각에 따라 답하세요.',variants:[{id:'free',expected:'需要 / 不用 / 不用，我们带了环保袋。',source:'교과서 67쪽'}]},
  {id:'price',title:'가격',text:'多少钱？',instruction:'당신은 계산원입니다. 표시된 합계 금액을 말하세요.',variants:[
    {id:'180',cue:'¥180',expected:'一百八十块 / 一共一百八十块。',source:'교과서 67쪽'},
    {id:'27',cue:'¥27',expected:'二十七块 / 一共二十七块。',source:'교과서 70쪽'}]},
  {id:'pay',title:'결제 방법',text:'您怎么付？',instruction:'교과서에서 배운 결제 방법으로 답하세요.',variants:[{id:'qr',expected:'我扫一下二维码 / 扫码。',source:'교과서 67쪽'}]},
  {id:'choice',title:'식사 방식',text:'咱们出去吃还是叫外卖？',instruction:'자신이 원하는 방식 하나를 골라 답하세요.',variants:[{id:'free',expected:'出去吃 / 出去吃面 / 叫外卖。',source:'교과서 95·100쪽'}]},
  {id:'suggest',title:'제안에 반응',text:'出去吃面，怎么样？',instruction:'자신의 생각에 따라 답하세요.',variants:[{id:'free',expected:'好啊 / 好的 / 我不想吃面。',source:'교과서 95쪽'}]},
  {id:'food',title:'음식 선택',text:'想吃什么？',instruction:'그림 속 음식을 먹고 싶습니다. 음식 이름을 말하세요.',variants:[
    {id:'noodles',image:'/speaking/noodles.png',expected:'炸酱面 / 我想吃炸酱面。',source:'교과서 101쪽 · 지도서 267쪽'},
    {id:'fried-noodles',image:'/speaking/fried-noodles.png',expected:'炒面 / 我想吃炒面。',source:'교과서 101쪽 · 지도서 267쪽'}]},
  {id:'experience',title:'음식 경험',text:'你吃过牛肉面吗？',instruction:'자신의 경험에 따라 답하세요.',variants:[{id:'free',expected:'吃过 / 没吃过 / 我还没吃过牛肉面。',source:'교과서 97쪽 경험 표현을 질문으로 변형'}]},
];

export function validateBank(value: unknown): value is Question[] {
  if(!Array.isArray(value)||value.length<1||value.length>20) return false;
  return value.every(q=> q && typeof q.id==='string' && typeof q.text==='string' && q.text.trim().length>0 && q.text.length<=300 && typeof q.title==='string' && typeof q.instruction==='string' && Array.isArray(q.variants) && q.variants.length>0 && q.variants.length<=10 && q.variants.every((v: Variant)=>typeof v.id==='string' && typeof v.expected==='string' && typeof v.source==='string' && (!v.image || (typeof v.image==='string' && (/^\/speaking\/[a-z-]+\.png$/.test(v.image) || (v.image.length<=160000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(v.image))))) && (!v.cue || v.cue.length<=100)));
}
