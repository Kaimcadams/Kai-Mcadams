"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  mode?: "hero" | "compact";
};

export default function HeroName({ mode = "hero" }: Props) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.18]);
  const y = useTransform(scrollY, [0, 600], [0, -220]);
  const opacity = useTransform(scrollY, [380, 720], [1, 0]);

  if (mode === "compact") {
    return (
      <div className="font-display text-2xl md:text-3xl tracking-tight leading-none">
        Kai McAdams
      </div>
    );
  }

  return (
    <motion.div
      style={{ scale, y, opacity }}
      className="origin-top flex flex-col items-start gap-2 md:gap-4 pointer-events-none select-none"
    >
      <h1
        className="font-display tracking-tight leading-[0.88] text-[var(--bone)]"
        style={{ fontSize: "clamp(3.25rem, 14vw, 13rem)" }}
      >
        Kai
        <br />
        <span className="italic text-[var(--bone)]">McAdams</span>
      </h1>
    </motion.div>
  );
}
