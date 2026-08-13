/** Control mínimo de Lenis para bloquear el scroll durante el intro. */

type LenisLike = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | string, options?: { immediate?: boolean }) => void;
};

let instance: LenisLike | null = null;
let held = false;

export function setLenisInstance(lenis: LenisLike | null) {
  instance = lenis;
  if (lenis && held) lenis.stop();
}

export function holdLenis() {
  held = true;
  instance?.stop();
}

export function releaseLenis() {
  held = false;
  instance?.start();
}

export function lenisJumpToTop() {
  instance?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}
