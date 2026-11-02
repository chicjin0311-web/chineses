export type Variant = { id: string; image?: string; cue?: string; expected: string; source: string };
export type Question = { id: string; text: string; title: string; instruction: string; variants: Variant[] };
export type AssignedQuestion = Omit<Question, 'variants'> & Variant;
export const speakingBank: Question[] = [
  {id:'buy', title:'구매 품목',text:'你要买什么？',instruction:'화면에 제시된 물건을 사려고 합니다. 질문에 맞게 중국어로 답하세요. 수량은 말하지 않아도 됩니다.',variants:[
    {id:'tablet',cue:'平板电脑',expected:'平板电脑 / 我要买一台平板电脑。',source:'교과서 69쪽 · 지도서 193쪽'},
    {id:'skirts',cue:'裙子',expected:'裙子 / 我要买两条裙子。',source:'교과서 69쪽 · 지도서 193쪽'},
    {id:'apples',cue:'苹果',expected:'苹果 / 我要买三斤苹果。',source:'교과서 69쪽 · 지도서 193쪽'}]},
  {id:'bag',title:'봉투 필요 여부',text:'需要塑料袋吗？',instruction:'화면에 제시된 표현의 뜻에 맞게 봉투가 필요한지 중국어로 답하세요.',variants:[
    {id:'need',cue:'需要',expected:'需要 / 我需要塑料袋。 등 봉투가 필요하다는 반응. 짧은 답변도 인정합니다.',source:'교과서 66·67쪽 · 需要는 본문 질문의 표현'},
    {id:'no-need',cue:'不用',expected:'不用 / 不用，我们带了环保袋。 등 봉투가 필요 없다는 반응. 짧은 답변도 인정합니다.',source:'교과서 67쪽 · 본문 답변'}]},
  {id:'price',title:'가격',text:'多少钱？',instruction:'당신은 계산원입니다. 표시된 합계 금액을 말하세요.',variants:[
    {id:'180',cue:'¥180',expected:'一百八十块 / 一共一百八十块。',source:'교과서 67쪽'},
    {id:'27',cue:'¥27',expected:'二十七块 / 一共二十七块。',source:'교과서 70쪽'}]},
  {id:'pay',title:'결제 방법',text:'您怎么付？',instruction:'화면의 힌트에 맞게 QR 코드로 결제하겠다고 중국어로 답하세요.',variants:[
    {id:'qr-word',cue:'二维码',expected:'我扫一下二维码 / 扫一下二维码 / 扫码。 등 QR 결제 의사가 전달되는 반응. 두 힌트의 인정 기준은 같습니다.',source:'교과서 66·67쪽 · QR 결제 힌트(단어)'},
    {id:'qr-action',cue:'扫一下二维码',expected:'我扫一下二维码 / 扫一下二维码 / 扫码。 등 QR 결제 의사가 전달되는 반응. 두 힌트의 인정 기준은 같습니다.',source:'교과서 67쪽 · QR 결제 힌트(본문 구절)'}]},
  {id:'choice',title:'식사 방식',text:'咱们出去吃还是叫外卖？',instruction:'화면에 제시된 식사 방식을 선택하여 중국어로 답하세요.',variants:[
    {id:'eat-out',cue:'出去吃',expected:'出去吃 / 出去吃面 / 咱们出去吃吧。 등 나가서 먹겠다는 반응.',source:'교과서 95·100쪽 · 본문 질문·답변의 표현'},
    {id:'delivery',cue:'叫外卖',expected:'叫外卖 / 咱们叫外卖吧。 등 배달 음식을 시키겠다는 반응.',source:'교과서 94·95·100쪽 · 본문 질문의 표현'}]},
  {id:'suggest',title:'제안에 반응',text:'出去吃面，怎么样？',instruction:'화면에 제시된 동의 표현을 활용하여 제안에 중국어로 답하세요.',variants:[
    {id:'hao-a',cue:'好啊',expected:'好啊 / 好的 / 行。 등 제안에 동의하는 반응. 제시된 단어와 달라도 같은 동의 의미이면 인정합니다.',source:'교과서 65·95쪽 · 본문 동의 표현'},
    {id:'hao-de',cue:'好的',expected:'好啊 / 好的 / 行。 등 제안에 동의하는 반응. 제시된 단어와 달라도 같은 동의 의미이면 인정합니다.',source:'교과서 97쪽 · 본문 동의 표현'},
    {id:'xing',cue:'行',expected:'好啊 / 好的 / 行。 등 제안에 동의하는 반응. 제시된 단어와 달라도 같은 동의 의미이면 인정합니다.',source:'교과서 67쪽 · 본문 동의 표현'}]},
  {id:'food',title:'음식 선택',text:'你想吃什么？',instruction:'화면에 제시된 음식을 먹고 싶습니다. 질문에 맞게 중국어로 답하세요.',variants:[
    {id:'noodles',cue:'炸酱面',expected:'炸酱面 / 我想吃炸酱面。',source:'교과서 101쪽 · 지도서 267쪽'},
    {id:'fried-noodles',cue:'炒面',expected:'炒面 / 我想吃炒面。',source:'교과서 101쪽 · 지도서 267쪽'}]},
  {id:'drink',title:'음료 선택',text:'你想喝什么？',instruction:'화면에 제시된 음료를 마시고 싶습니다. 질문에 맞게 중국어로 답하세요.',variants:[
    {id:'water',cue:'矿泉水',expected:'矿泉水 / 我想喝矿泉水。',source:'교과서 101쪽 · 지도서 267쪽'},
    {id:'tea',cue:'红茶',expected:'红茶 / 我想喝红茶。',source:'교과서 101쪽 · 지도서 267쪽'},
    {id:'juice',cue:'果汁',expected:'果汁 / 我想喝果汁。',source:'교과서 101쪽 · 지도서 267쪽'},
    {id:'cola',cue:'可乐',expected:'可乐 / 我想喝可乐。',source:'교과서 101쪽 · 지도서 267쪽'}]},
];

export function validateBank(value: unknown): value is Question[] {
  if(!Array.isArray(value)||value.length<1||value.length>20) return false;
  return value.every(q=> q && typeof q.id==='string' && typeof q.text==='string' && q.text.trim().length>0 && q.text.length<=300 && typeof q.title==='string' && typeof q.instruction==='string' && Array.isArray(q.variants) && q.variants.length>0 && q.variants.length<=10 && q.variants.every((v: Variant)=>typeof v.id==='string' && typeof v.expected==='string' && typeof v.source==='string' && (!v.image || (typeof v.image==='string' && (/^\/speaking\/[a-z-]+\.png$/.test(v.image) || (v.image.length<=160000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(v.image))))) && (!v.cue || v.cue.length<=100)));
}
