"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StreetlampHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[140vh] bg-[var(--ink)]"
      aria-label="Hero — Kai McAdams"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* 1. Streetlamp image — wrapped twice: outer handles scroll-fade, inner handles flicker */}
        <motion.div
          aria-hidden
          style={{ opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <div className="flicker absolute inset-0">
            <img
              src="/streetlamp.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* 2. Title block — same scroll fade + flicker pattern */}
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div
            className="flicker text-center"
            style={{ transform: "translateY(8vh)" }}
          >
            <h1
              className="text-white"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 7vw, 6rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.0,
              }}
            >
              KAI MCADAMS
            </h1>
            <p
              className="mt-4 uppercase"
              style={{
                fontWeight: 500,
                fontSize: "clamp(11px, 1.1vw, 13px)",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Filmmaker · Editor · Critic — New York
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
