/**
 * Canvas helper para secuencias de imagen / visuals de alto rendimiento.
 * Usa requestAnimationFrame + drawImage; anima solo vía frame index
 * (sin layout thrashing). Listo para montar cuando haya frames en /public.
 */

export type CanvasSequenceOptions = {
  canvas: HTMLCanvasElement;
  /** URLs o ImageBitmaps ya cargados */
  frames: (string | HTMLImageElement | ImageBitmap)[];
  /** DPR cap (default 2) */
  maxDpr?: number;
};

export class CanvasSequence {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frames: (HTMLImageElement | ImageBitmap)[] = [];
  private frame = 0;
  private dpr: number;
  private ready = false;

  constructor(opts: CanvasSequenceOptions) {
    const ctx = opts.canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Canvas 2D no disponible');
    this.canvas = opts.canvas;
    this.ctx = ctx;
    this.dpr = Math.min(opts.maxDpr ?? 2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    void this.load(opts.frames);
  }

  private async load(sources: (string | HTMLImageElement | ImageBitmap)[]) {
    this.frames = await Promise.all(
      sources.map(async (src) => {
        if (typeof src !== 'string') return src;
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        await img.decode();
        return img;
      }),
    );
    this.ready = this.frames.length > 0;
    if (this.ready) this.draw(0);
  }

  /** progress 0–1 → frame; pensado para ScrollTrigger scrub */
  setProgress(progress: number) {
    if (!this.ready) return;
    const i = Math.min(
      this.frames.length - 1,
      Math.max(0, Math.round(progress * (this.frames.length - 1))),
    );
    if (i === this.frame) return;
    this.frame = i;
    this.draw(i);
  }

  private draw(i: number) {
    const img = this.frames[i];
    if (!img) return;
    const w = 'naturalWidth' in img ? img.naturalWidth : img.width;
    const h = 'naturalHeight' in img ? img.naturalHeight : img.height;
    const { canvas, ctx, dpr } = this;
    const cssW = canvas.clientWidth || w;
    const cssH = canvas.clientHeight || h;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img as CanvasImageSource, 0, 0, cssW, cssH);
  }

  destroy() {
    this.frames = [];
    this.ready = false;
  }
}
