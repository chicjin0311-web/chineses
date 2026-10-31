'use client';

import { useRef, useState } from 'react';

type Props = { src: string; browserSrc?: string; poster: string; captions: string; label: string; descriptionId: string };

export default function LessonVideo({ src, browserSrc, poster, captions, label, descriptionId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');

  async function playWithSound() {
    const video = videoRef.current;
    if (!video) return;
    setError('');
    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;
    try {
      await video.play();
    } catch {
      setError('재생을 시작하지 못했습니다. 영상의 재생 버튼을 눌러 주세요.');
    }
  }

  return <>
    <video ref={videoRef} controls playsInline preload="metadata" poster={poster} aria-label={label} aria-describedby={descriptionId}>
      {browserSrc ? <source src={browserSrc} type='video/mp4; codecs="avc1.640028, opus"' /> : null}
      <source src={src} type="video/mp4" />
      <track kind="captions" src={captions} srcLang="zh" label="간화자와 한어병음" />
      브라우저에서 영상을 재생할 수 없습니다.
    </video>
    <div style={{ padding: '12px 0 4px' }}>
      <button className="text-button" type="button" onClick={playWithSound}>소리 켜고 처음부터 재생</button>
      {error ? <p role="alert">{error}</p> : null}
    </div>
  </>;
}


