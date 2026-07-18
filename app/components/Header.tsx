"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DrawerMenu from "./DrawerMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.6 : 40;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const showWordmark = !isHome || scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          // Black at the top fading to transparent, ending 20px past the menu
          // row (pt-5 = 20px + h-14 = 56px, so the row ends at 76px).
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0) 100%)",
          height: "116px",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-20 pt-5">
          <div className="relative flex items-center justify-between h-14">
            <Link
              href="/"
              aria-label="Kai McAdams — home"
              className="shrink-0 -ml-5 pointer-events-auto"
            >
              <Image
                src="/gorehound-grindhouse-wordmark.png"
                alt="Gorehound Grindhouse"
                width={713}
                height={104}
                priority
                className="w-auto"
                sizes="(min-width: 768px) 288px, 233px"
                // Art is light grey (avg 213); this forces it to pure white.
                // Fluid height: ~28px on the smallest phones (so it clears the
                // Menu at 320px) up to 42px on desktop.
                style={{
                  filter: "brightness(0) invert(1)",
                  height: "clamp(28px, 5.5vw, 42px)",
                  width: "auto",
                }}
              />
            </Link>
            {/* Centered on the header itself, so the badge and Menu widths
                don't pull it off-center */}
            {/* Redundant with the wordmark, and collides with it until the row
                is genuinely wide — the wordmark tail and this title only clear
                each other from lg up, so it stays hidden below that. */}
            <Link
              href="/"
              className={`hidden lg:block absolute left-1/2 -translate-x-1/2 text-base md:text-lg font-semibold tracking-tight text-[var(--bone)] hover:text-[var(--cinema)] transition-all duration-500 ${
                showWordmark
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              aria-hidden={!showWordmark}
            >
              Kai McAdams
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="label pointer-events-auto transition-colors hover:opacity-70"
              // .label is unlayered, so it beats Tailwind's text-* utilities —
              // size and colour have to be set here to take effect. clamp keeps
              // the 36px desktop size but scales it down on phones so it doesn't
              // crowd the wordmark (down to 20px on a 320px screen).
              style={{ fontSize: "clamp(20px, 5.5vw, 36px)", color: "#ffffff" }}
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <DrawerMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
