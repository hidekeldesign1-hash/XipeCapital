'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/animations';
import { trackEvent, trackOnce } from '@/lib/tracking';
import { holdLenis, lenisJumpToTop, releaseLenis } from '@/lib/lenis-control';

/** 10s nativos → ~13.3s a 0.75x para un loop más pausado */
const INTRO_PLAYBACK_RATE = 0.75;

/**
 * Puerta de entrada al sitio.
 * Fondo: video en loop suave (public/videos/intro-loop.mp4).
 */
export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [locking, setLocking] = useState(true);
  const entered = useRef(false);

  const enter = useCallback((from: 'cta' | 'click' | 'scroll') => {
    if (entered.current) return;
    entered.current = true;
    trackEvent('intro_enter_click', { from });
    lenisJumpToTop();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!locking) return;

    holdLenis();
    lenisJumpToTop();

    const html = document.documentElement;
    const body = document.body;
    html.classList.add('is-locked');
    body.classList.add('is-locked');
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    let touchY = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 8 || Math.abs(e.deltaX) > 8) enter('scroll');
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? touchY;
      if (Math.abs(y - touchY) > 36) enter('scroll');
    };
    const onKey = (e: KeyboardEvent) => {
      if ([' ', 'Spacebar', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        enter('scroll');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);

    return () => {
      html.classList.remove('is-locked');
      body.classList.remove('is-locked');
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [locking, enter]);

  useEffect(() => {
    if (visible) trackOnce('intro_viewed');
  }, [visible]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const v = videoRef.current;
    if (!v) return;

    const arm = () => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', 'true');
      v.setAttribute('webkit-playsinline', 'true');
      v.playbackRate = INTRO_PLAYBACK_RATE;
    };

    const play = () => {
      arm();
      const attempt = v.play();
      if (attempt) {
        void attempt
          .then(() => setVideoReady(true))
          .catch(() => {
            /* iOS Low Power / políticas: reintento en el siguiente gesto */
          });
      }
    };

    arm();
    play();

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'] as const;
    events.forEach((ev) => v.addEventListener(ev, play));
    const onVis = () => {
      if (document.visibilityState === 'visible') play();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pageshow', play);
    window.addEventListener('touchstart', play, { passive: true, once: true });
    window.addEventListener('click', play, { once: true });

    return () => {
      events.forEach((ev) => v.removeEventListener(ev, play));
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pageshow', play);
      window.removeEventListener('touchstart', play);
      window.removeEventListener('click', play);
    };
  }, [visible, reduced]);

  return (
    <>
      <div aria-hidden={visible || undefined} className={visible ? 'pointer-events-none select-none' : undefined}>
        {children}
      </div>

      <AnimatePresence
        onExitComplete={() => {
          setLocking(false);
          lenisJumpToTop();
          releaseLenis();
        }}
      >
        {visible && (
          <motion.div
            key="intro"
            role="dialog"
            aria-modal="true"
            aria-label="Bienvenida a Xipe Capital Group"
            className="fixed inset-0 z-[180] flex flex-col items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            onClick={() => enter('click')}
          >
            <div className="pointer-events-none absolute inset-0" data-intro-bg aria-hidden>
              {!reduced && (
                <video
                  ref={videoRef}
                  className={`intro-video absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    videoReady ? 'opacity-100' : 'opacity-0'
                  }`}
                  src="/videos/intro-loop.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  onPlaying={() => setVideoReady(true)}
                  aria-hidden
                />
              )}
              {/* Sombra entre video y contenido: atenúa el fondo sin apagarlo */}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,5,.35)_0%,rgba(5,6,5,.55)_42%,rgba(5,6,5,.82)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: EASE }}
                className="mb-8"
              >
                <Image
                  src="/xipe-logo.png"
                  alt="Xipe Capital Group"
                  width={264}
                  height={271}
                  priority
                  className="mx-auto h-auto w-[min(52vw,200px)]"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: EASE }}
                className="t-label mb-6 flex items-center justify-center gap-2 text-gold"
              >
                <span aria-hidden>→</span>
                Arquitectura patrimonial
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.75, ease: EASE }}
                className="t-display t-h2 mb-10 max-w-[14ch] text-text sm:max-w-[16ch]"
              >
                Tu patrimonio necesita una <span className="t-glow">arquitectura</span>.
              </motion.p>

              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  enter('cta');
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="intro-cta group relative inline-flex min-h-[64px] items-center justify-center gap-3 overflow-hidden rounded-sm bg-gold px-10 text-[14px] font-semibold uppercase tracking-[.14em] text-black transition-colors duration-200 hover:bg-gold-light sm:text-[15px]"
              >
                <span className="relative z-10">Diseñar mi arquitectura</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
