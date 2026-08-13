'use client';

import { useEffect, useRef } from 'react';

const POSTER = '/videos/intro-poster.jpg';
const SRC_FULL = '/videos/intro-loop.mp4';
const SRC_MOBILE = '/videos/intro-loop-720.mp4';

/**
 * Fondo en loop. El <video> tiene que ser visible para que iOS lo decodifique.
 * Sin playbackRate en móvil (rompe autoplay) y sin canvas (el video oculto no corre).
 */
export default function IntroLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let alive = true;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    const src = mobile ? SRC_MOBILE : SRC_FULL;

    const arm = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.controls = false;
      video.disablePictureInPicture = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      if (!mobile) video.playbackRate = 0.75;
    };

    const play = () => {
      if (!alive) return;
      arm();
      void video.play().catch(() => {});
    };

    const onError = () => {
      if (video.src.includes('intro-loop-720')) {
        video.src = SRC_FULL;
        video.load();
        play();
      }
    };
    video.addEventListener('error', onError);

    video.src = src;
    video.load();

    arm();
    play();

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing'] as const;
    events.forEach((ev) => video.addEventListener(ev, play));
    const onVis = () => {
      if (document.visibilityState === 'visible') play();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pageshow', play);

    const kick = window.setInterval(() => {
      if (alive && video.paused) play();
    }, 400);

    return () => {
      alive = false;
      window.clearInterval(kick);
      events.forEach((ev) => video.removeEventListener(ev, play));
      video.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pageshow', play);
    };
  }, []);

  return (
    <div className="intro-video-wrap absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="intro-video absolute inset-0 h-full w-full object-cover"
        poster={POSTER}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
}
