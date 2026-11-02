"""One-time asset generation. Requires edge-tts; no runtime TTS service dependency."""
import asyncio
from pathlib import Path
import edge_tts

QUESTIONS = {
    'buy': '你要买什么？', 'bag': '需要塑料袋吗？', 'price': '多少钱？',
    'pay': '您怎么付？', 'choice': '咱们出去吃还是叫外卖？',
    'suggest': '出去吃面，怎么样？', 'food': '你想吃什么？',
    'drink': '你想喝什么？', 'food-short': '想吃什么？',
    'experience': '你吃过牛肉面吗？',
}

async def main():
    folder=Path(__file__).resolve().parents[1]/'public/speaking/audio'
    folder.mkdir(parents=True,exist_ok=True)
    for name,text in QUESTIONS.items():
        await edge_tts.Communicate(text,'zh-CN-XiaoxiaoNeural',rate='-15%').save(str(folder/f'{name}.mp3'))
        print(name,(folder/f'{name}.mp3').stat().st_size,flush=True)

if __name__=='__main__':
    asyncio.run(main())
