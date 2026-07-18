"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import FadeIn from "./FadeIn";

type Item = { src: string; width: number; height: number };

type Props = {
  images: Item[];
};

export default function GraphicDesignGallery({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Masonry via CSS columns so square merch and the taller flyer both
          show uncropped. The break-inside-avoid wrapper carries no transform
          (the FadeIn's transform lives inside it) so items never split across
          columns. */}
      <div className="columns-2 md:columns-3 gap-4 md:gap-5">
        {images.map((img, i) => (
          <div key={img.src} className="mb-4 md:mb-5 break-inside-avoid">
            <FadeIn delay={(i % 8) * 0.05}>
              <button
                onClick={() => setIndex(i)}
                aria-label={`Open image ${i + 1} of ${images.length}`}
                className="group relative block w-full overflow-hidden border border-[var(--rule)] bg-[var(--ink-3)] transition-colors hover:border-[var(--cinema)] cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={`Graphic design work ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </FadeIn>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[rgba(5,4,3,0.94)] backdrop-blur-sm flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              onClick={close}
              aria-label="Close viewer"
              className="absolute top-6 right-8 z-10 label hover:text-[var(--cinema)] transition-colors"
            >
              Close ✕
            </button>

            <span className="absolute top-6 left-8 z-10 label-sm text-[var(--muted)]">
              {index + 1} / {images.length}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 z-10 h-14 w-14 flex items-center justify-center text-3xl text-[var(--bone)] hover:text-[var(--cinema)] transition-colors cursor-pointer"
            >
              ‹
            </button>

            {/* Stop propagation so clicking the image doesn't close the viewer */}
            <motion.div
              key={images[index].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-[88vw] md:w-[72vw]"
            >
              <Image
                src={images[index].src}
                alt={`Graphic design work ${index + 1}`}
                fill
                sizes="(min-width: 768px) 72vw, 88vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 md:right-6 z-10 h-14 w-14 flex items-center justify-center text-3xl text-[var(--bone)] hover:text-[var(--cinema)] transition-colors cursor-pointer"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
