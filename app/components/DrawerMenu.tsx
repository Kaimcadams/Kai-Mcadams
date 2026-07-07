"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/reel", label: "Reel" },
  { href: "/film", label: "Film" },
  { href: "/graphic-design", label: "Graphic Design" },
  { href: "/cinematic-analysis", label: "Cinematic Analysis" },
  { href: "/cv", label: "CV" },
  { href: "/about", label: "About" },
];

const SOCIALS = [
  { href: "https://kaimcadams.substack.com", label: "Substack" },
  { href: "https://www.instagram.com/kaimcadams", label: "Instagram" },
  { href: "https://www.linkedin.com/in/kaimcadams", label: "LinkedIn" },
  { href: "mailto:McAdamsxK@gmail.com", label: "Email" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DrawerMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-[rgba(5,4,3,0.75)] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full sm:w-[440px] bg-[var(--ink-2)] border-l border-[var(--rule)] flex flex-col"
            role="dialog"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--rule)]">
              <span className="label">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="label hover:text-[var(--cinema)] transition-colors"
              >
                Close ✕
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-8 py-10 flex flex-col">
              <ul className="space-y-5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group block"
                    >
                      <span className="text-3xl md:text-4xl font-bold leading-none tracking-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-12">
                <p className="label mb-4">Connect</p>
                <ul className="space-y-3">
                  {SOCIALS.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="label-sm hover:text-[var(--cinema)] transition-colors block"
                      >
                        → {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://kaimcadams.substack.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block label border border-[var(--cinema)] text-[var(--cinema)] px-5 py-3 hover:bg-[var(--cinema)] hover:text-[var(--bone)] transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
