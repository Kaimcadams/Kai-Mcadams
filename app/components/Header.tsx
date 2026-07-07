"use client";

import Link from "next/link";
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
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled || !isHome
            ? "bg-[rgba(10,8,7,0.78)] backdrop-blur-md border-b border-[var(--rule)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className={`text-base md:text-lg font-semibold tracking-tight text-[var(--bone)] hover:text-[var(--cinema)] transition-all duration-500 ${
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
              className="label hover:text-[var(--cinema)] transition-colors flex items-center gap-2"
            >
              <span
                className="inline-block w-5 h-px bg-current relative before:absolute before:inset-x-0 before:-top-1.5 before:h-px before:bg-current after:absolute after:inset-x-0 after:top-1.5 after:h-px after:bg-current"
                aria-hidden
              />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>
      <DrawerMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
