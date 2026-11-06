"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const SWIPE_THRESHOLD_PX = 40;

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden bg-silver-100">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-xs uppercase tracking-[0.2em] text-silver-500">No image yet</span>
        </div>
      </div>
    );
  }

  const hasMultiple = images.length > 1;
  const goTo = (i: number) => setActive((i + images.length) % images.length);
  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden bg-silver-100"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta > SWIPE_THRESHOLD_PX) goPrev();
          else if (delta < -SWIPE_THRESHOLD_PX) goNext();
          touchStartX.current = null;
        }}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-paper/80 text-ink opacity-0 transition-opacity hover:bg-paper group-hover:opacity-100 focus-visible:opacity-100"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-paper/80 text-ink opacity-0 transition-opacity hover:bg-paper group-hover:opacity-100 focus-visible:opacity-100"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-ink" : "w-1.5 bg-line hover:bg-ink-soft"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
