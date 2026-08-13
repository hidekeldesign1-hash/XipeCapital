'use client';

import SideBorderGreca from '@/components/SideBorderGreca';

/** Laterales de ornamento dorado — viven detrás del contenido (z-1). */
export default function SiteGlyphRails() {
  return (
    <>
      <SideBorderGreca side="left" />
      <SideBorderGreca side="right" />
    </>
  );
}
