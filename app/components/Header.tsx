"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DrawerMenu from "./DrawerMenu";

function todayLabel() {
  return new Date()
    .toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [date, setDate] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setDate(todayLabel());
    const onScroll = () => setScrolled(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div className="flex items-center justify-between h-12 label">
            <span className="hidden sm:inline">{date}</span>
            <span className="sm:hidden">{date.split(",")[0]}</span>
            <span className="hidden md:inline tracking-[0.4em]">
              VOL. I · NEW YORK
            </span>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-2 hover:text-[var(--cinema)] transition-colors"
            >
              <span className="inline-block w-5 h-px bg-current relative before:absolute before:inset-x-0 before:-top-1.5 before:h-px before:bg-current after:absolute after:inset-x-0 after:top-1.5 after:h-px after:bg-current" />
              <span>Menu</span>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showWordmark ? "max-h-14 opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!showWordmark}
          >
            <Link
              href="/"
              className="block py-3 font-display tracking-tight text-lg md:text-xl text-[var(--bone)] hover:text-[var(--cinema)] transition-colors"
            >
              Kai McAdams
            </Link>
          </div>
        </div>
      </header>
      <DrawerMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
