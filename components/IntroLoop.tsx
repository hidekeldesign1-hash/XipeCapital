'use client';

import { useEffect, useRef } from 'react';

const PLAYBACK_RATE = 0.75;
const SRC = '/videos/intro-loop.mp4';
const POSTER = '/videos/intro-poster.jpg';

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sw: number,
  sh: number,
  cw: number,
  ch: number,
) {
  if (!sw || !sh) return;
  const scale = Math.max(cw / sw, ch / sh);
  const w = sw * scale;
  const h = sh * scale;
  ctx.drawImage(source, (cw - w) / 2, (ch - h) / 2, w, h);
}

/**
 * Loop de fondo sin controles nativos.
 * En iOS el botón de play es una capa nativa: el video se reproduce
 * oculto y el canvas es lo único visible.
 */
export default function IntroLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let alive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };

    const poster = new Image();
    poster.src = POSTER;
    const paintPoster = () => {
      if (!poster.naturalWidth) return;
      drawCover(ctx, poster, poster.naturalWidth, poster.naturalHeight, canvas.width, canvas.height);
    };
    poster.onload = paintPoster;

    const paint = () => {
      if (!alive) return;
      if (video.readyState >= 2 && video.videoWidth) {
        drawCover(ctx, video, video.videoWidth, video.videoHeight, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(paint);
    };

    const arm = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.controls = false;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.playbackRate = PLAYBACK_RATE;
    };

    const play = () => {
      if (!alive) return;
      arm();
      void video.play().catch(() => {});
    };

    resize();
    paintPoster();
    arm();
    play();
    raf = requestAnimationFrame(paint);

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing'] as const;
    events.forEach((ev) => video.addEventListener(ev, play));
    window.addEventListener('resize', resize);
    const onVis = () => {
      if (document.visibilityState === 'visible') play();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pageshow', play);

    const kick = window.setInterval(() => {
      if (video.paused) play();
    }, 700);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearInterval(kick);
      events.forEach((ev) => video.removeEventListener(ev, play));
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pageshow', play);
      video.pause();
    };
  }, []);

  return (
    <div className="intro-video-wrap absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="intro-video intro-video-engine"
        src={SRC}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden
      />
      <canvas ref={canvasRef} className="intro-video-canvas" aria-hidden />
    </div>
  );
}
