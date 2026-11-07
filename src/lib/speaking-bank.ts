export type Variant = { id: string; image?: string; cue?: string; expected: string; source: string };
export type Question = { id: string; text: string; title: string; instruction: string; variants: Variant[] };
export type AssignedQuestion = Omit<Question, 'variants'> & Variant;
export const speakingBank: Question[] = [
  {
    "id": "buy-daily",
    "title": "구매 품목 1",
    "text": "你要买什么？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "milk",
        "source": "교과서 65쪽",
        "cue": "牛奶 · 1",
        "expected": "我要买一瓶牛奶。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      },
      {
        "id": "fruit",
        "source": "교과서 65쪽",
        "cue": "水果 · 一些",
        "expected": "我要买一些水果。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      },
      {
        "id": "red-clothes",
        "source": "교과서 68쪽",
        "cue": "红色 · 衣服 · 1",
        "expected": "我要买一件红色的衣服。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      }
    ]
  },
  {
    "id": "buy-items",
    "title": "구매 품목 2",
    "text": "你要买什么？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "tablet",
        "source": "교과서 69쪽",
        "cue": "平板电脑 · 1",
        "expected": "我要买一台平板电脑。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      },
      {
        "id": "skirts",
        "source": "교과서 69쪽",
        "cue": "裙子 · 2",
        "expected": "我要买两条裙子。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      },
      {
        "id": "apples",
        "source": "교과서 69쪽",
        "cue": "苹果 · 3斤",
        "expected": "我要买三斤苹果。 질문에 맞는 구매 의사가 전달되는지도 함께 판단합니다. 양사·수량 오류는 전달 정도와 함께 관찰합니다."
      }
    ]
  },
  {
    "id": "price",
    "title": "가격",
    "text": "多少钱？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요. 당신은 계산원입니다. 표시된 합계 금액을 말하세요.",
    "variants": [
      {
        "id": "180",
        "source": "교과서 67쪽",
        "cue": "¥180",
        "expected": "一共一百八十块。 / 一百八十块。"
      },
      {
        "id": "27",
        "source": "교과서 70쪽",
        "cue": "¥27",
        "expected": "一共二十七块。 / 二十七块。"
      }
    ]
  },
  {
    "id": "pay",
    "title": "결제 방법",
    "text": "您怎么付？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "qr",
        "source": "교과서 67쪽",
        "cue": "二维码",
        "expected": "我扫一下二维码。 / 扫一下二维码。 / 扫码。"
      }
    ]
  },
  {
    "id": "plan",
    "title": "토요일 계획",
    "text": "这个星期六你打算做什么？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "park",
        "source": "교과서 81쪽 · 회화 1",
        "cue": "颐和园",
        "expected": "我打算去颐和园。"
      },
      {
        "id": "video",
        "source": "교과서 83쪽 · 바꿔 말하기",
        "cue": "视频",
        "expected": "我打算拍视频。"
      },
      {
        "id": "language",
        "source": "교과서 83쪽 · 바꿔 말하기",
        "cue": "外语",
        "expected": "我打算学外语。"
      },
      {
        "id": "hsk",
        "source": "교과서 83쪽 · 바꿔 말하기",
        "cue": "HSK",
        "expected": "我打算考HSK。"
      }
    ]
  },
  {
    "id": "choice",
    "title": "식사 방식",
    "text": "咱们出去吃还是叫外卖？",
    "instruction": "질문을 듣고, 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "free",
        "source": "교과서 95쪽",
        "expected": "出去吃。 / 咱们出去吃吧。 / 叫外卖。 / 咱们叫外卖吧。 질문에 맞는 선택 의사가 전달되면 짧은 답변도 인정합니다."
      }
    ]
  },
  {
    "id": "drink-choice",
    "title": "음료 선택 반응",
    "text": "你想喝可乐还是咖啡？",
    "instruction": "질문을 듣고, 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "free",
        "source": "교과서 98쪽 · 还是 선택 질문",
        "expected": "可乐。 / 我想喝可乐。 / 咖啡。 / 我想喝咖啡。 질문에 맞는 선택 의사가 전달되면 짧은 답변도 인정합니다."
      }
    ]
  },
  {
    "id": "meat-choice",
    "title": "고기 선택 반응",
    "text": "您要吃鸡肉还是牛肉？",
    "instruction": "질문을 듣고, 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "free",
        "source": "교과서 98쪽 · 还是 선택 질문",
        "expected": "鸡肉。 / 我要吃鸡肉。 / 牛肉。 / 我要吃牛肉。 질문에 맞는 선택 의사가 전달되면 짧은 답변도 인정합니다."
      }
    ]
  },
  {
    "id": "food",
    "title": "먹고 싶은 음식",
    "text": "你想吃什么？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "knife",
        "source": "교과서 101쪽",
        "cue": "刀削面",
        "expected": "我想吃刀削面。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "noodles",
        "source": "교과서 101쪽",
        "cue": "炸酱面",
        "expected": "我想吃炸酱面。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "beef",
        "source": "교과서 97·101쪽",
        "cue": "牛肉面",
        "expected": "我想吃牛肉面。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "fried",
        "source": "교과서 101쪽",
        "cue": "炒面",
        "expected": "我想吃炒面。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      }
    ]
  },
  {
    "id": "drink",
    "title": "마시고 싶은 음료",
    "text": "你想喝什么？",
    "instruction": "제시된 키워드를 활용하여 질문에 맞게 중국어로 답하세요.",
    "variants": [
      {
        "id": "water",
        "source": "교과서 101쪽",
        "cue": "矿泉水",
        "expected": "我想喝矿泉水。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "tea",
        "source": "교과서 101쪽",
        "cue": "红茶",
        "expected": "我想喝红茶。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "juice",
        "source": "교과서 101쪽",
        "cue": "果汁",
        "expected": "我想喝果汁。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      },
      {
        "id": "cola",
        "source": "교과서 101쪽",
        "cue": "可乐",
        "expected": "我想喝可乐。 짧게 해당 음식·음료 이름으로 답해도 의미가 분명하면 인정합니다."
      }
    ]
  }
];

export function validateBank(value: unknown): value is Question[] {
  if(!Array.isArray(value)||value.length<1||value.length>20) return false;
  return value.every(q=> q && typeof q.id==='string' && typeof q.text==='string' && q.text.trim().length>0 && q.text.length<=300 && typeof q.title==='string' && typeof q.instruction==='string' && Array.isArray(q.variants) && q.variants.length>0 && q.variants.length<=10 && q.variants.every((v: Variant)=>typeof v.id==='string' && typeof v.expected==='string' && typeof v.source==='string' && (!v.image || (typeof v.image==='string' && (/^\/speaking\/[a-z-]+\.png$/.test(v.image) || (v.image.length<=160000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(v.image))))) && (!v.cue || v.cue.length<=100)));
}
