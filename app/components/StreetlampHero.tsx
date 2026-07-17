"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Window rows detected off city-night.png (1672x941) by scanning for warm, lit
// blobs and chaining horizontally-adjacent ones into rows — chaining lets each
// row follow its building's perspective slope. Coords are % of the image, and
// the light layer shares the image's box (see IMAGE_BOX below), so they stay
// locked to their windows at any crop. Each entry: [left%, top%, width%, height%].
const WINDOW_ROWS: [number, number, number, number][][] = [
  [[22.91,9.14,1.67,2.23],[20.69,9.78,1.26,1.49],[18.48,10.2,1.73,2.34],[16.21,11.16,1.2,1.06],[13.94,11.48,1.79,2.34],[16.93,12.43,0.84,0.64],[11.66,12.11,1.79,2.34],[9.39,12.75,1.79,2.34],[7.06,13.18,1.85,2.55],[17.64,10.95,0.36,1.17]],
  [[47.55,25.29,0.42,1.59],[48.15,25.93,0.36,1.59],[49.22,26.25,0.42,2.23],[50,26.99,0.42,2.44],[50.54,28.48,0.18,1.28],[51.2,27.95,0.36,1.17]],
  [[49.22,16.26,0.36,2.66],[50,17.11,0.42,2.66],[51.02,17.96,0.54,2.87],[52.03,18.81,0.36,2.87]],
  [[42.64,45.48,0.36,2.76],[43.18,46.65,0.36,1.06],[40.49,45.7,0.66,1.91],[38.76,46.65,0.42,0.85],[39.23,46.23,0.24,1.91]],
  [[72.01,52.6,0.6,2.23],[72.67,53.35,0.36,1.91],[73.92,53.67,0.6,2.87],[73.44,55.15,0.24,1.38],[75.3,55.37,0.66,2.87],[76.08,55.79,0.6,2.98]],
  [[94.56,40.28,0.36,1.06],[94.5,41.23,0.42,1.06],[93.84,40.81,0.48,0.96],[95.1,40.28,0.72,1.49]],
  [[15.79,84.27,1.67,2.55],[13.64,85.23,1.67,2.44],[11.48,86.18,1.73,2.34],[9.27,87.04,1.73,2.44],[7,87.99,1.79,2.44],[4.78,88.95,1.79,2.34]],
  [[30.32,78.43,1.56,2.44],[33.31,78.85,0.48,1.81],[33.97,78.96,0.48,1.81],[32.72,78.75,0.48,1.59]],
  [[67.58,64.19,0.78,2.76],[66.57,65.67,0.66,0.96],[66.63,66.74,0.78,0.64],[64.71,67.48,0.48,0.74],[63.7,66.1,0.78,1.91],[61.72,66.52,0.84,2.87],[60.71,67.06,0.84,2.76],[66.81,64.72,0.6,1.17]],
  [[79.31,71.84,0.66,1.59],[80.02,72.69,0.66,1.38],[80.8,73.75,0.42,0.74],[82.12,74.18,0.66,1.81],[82.89,73.86,0.72,1.59]],
  [[64.29,97.77,0.84,2.23],[66.15,99.15,0.78,0.53],[63.34,98.51,0.78,1.49],[61.42,99.15,0.84,0.85],[60.53,99.57,0.72,0.43],[58.49,98.94,0.48,1.06]],
  [[9.21,7.12,1.79,2.23],[6.88,7.76,1.85,2.44],[4.49,8.29,1.91,2.55],[2.03,9.25,1.97,2.13],[0,9.88,1.56,2.13]],
];

// Box that covers the viewport while holding the image's 1672:941 ratio. The
// photo and the light layer both live in it, so they crop as one unit — lights
// positioned against the *container* would slide off their windows on reframe.
const IMAGE_BOX = "absolute left-1/2 top-1/2 w-[max(100vw,177.68vh)] aspect-[1672/941]";

// Deterministic per-row timing. Math.random() here would differ between the
// server and client render and trip a hydration mismatch.
function seeded(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

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
      aria-label="Hero, Kai McAdams"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* 1. City at night + the window lights, sharing one aspect-locked box */}
        <motion.div
          aria-hidden
          style={{ opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <div className={`${IMAGE_BOX} -translate-x-1/2 -translate-y-1/2`}>
            <img
              src="/city-night.png"
              alt=""
              className="absolute inset-0 h-full w-full grayscale"
            />
            {/* Each row darkens as a unit — an office floor cutting its lights */}
            {WINDOW_ROWS.map((row, i) => (
              <div
                key={i}
                className="windows-blink absolute inset-0"
                style={
                  {
                    "--blink-dur": `${(5 + seeded(i) * 4).toFixed(1)}s`,
                    "--blink-delay": `${(seeded(i + 91) * 6).toFixed(1)}s`,
                  } as React.CSSProperties
                }
              >
                {row.map(([l, t, w, h], j) => (
                  <span
                    key={j}
                    className="absolute bg-[#0b0c10]"
                    style={{
                      left: `${l}%`,
                      top: `${t}%`,
                      width: `${w}%`,
                      height: `${h}%`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. Title block: same scroll fade + flicker pattern */}
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="absolute inset-0 flex items-center justify-start pointer-events-none px-6 md:px-20"
        >
          {/* w-fit sizes this to the h1; the subline below is w-0 min-w-full so
              it fills that width and wraps there instead of running past it */}
          <div
            className="relative w-fit text-left"
            style={{ transform: "translateY(8vh)" }}
          >
            {/* Dark scrim behind the type — the city behind it is busy and
                bright in places, so a soft pool of black keeps it readable */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[18%] -inset-y-[55%] -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 42%, rgba(0,0,0,0.45) 66%, rgba(0,0,0,0) 82%)",
              }}
            />
            <h1
              className="text-white"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 7vw, 6rem)",
                letterSpacing: "0.18em",
                lineHeight: 1.0,
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.7)",
              }}
            >
              KAI MCADAMS
            </h1>
            <p
              className="mt-4 w-0 min-w-full uppercase"
              style={{
                fontWeight: 700,
                fontSize: "clamp(12px, 1.25vw, 15px)",
                letterSpacing: "0.18em",
                color: "#ffffff",
                textShadow:
                  "0 3px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.75)",
              }}
            >
              New York City ✦ Cabo San Lucas,
              <br />
              Filmmaker &amp; Programmer, Journalist, Artist
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
