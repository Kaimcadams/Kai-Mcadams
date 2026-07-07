const LINKS = [
  { href: "https://kaimcadams.substack.com", label: "Substack" },
  { href: "https://www.instagram.com/kaimcadams", label: "Instagram" },
  { href: "https://www.linkedin.com/in/kaimcadams", label: "LinkedIn" },
  { href: "mailto:McAdamsxK@gmail.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-32 border-t border-[var(--rule)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 py-20 flex flex-col items-center gap-8 text-center">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight">
          Kai McAdams
        </div>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="label hover:text-[var(--cinema)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="label-sm">© {year} Kai McAdams · All rights reserved</p>
      </div>
    </footer>
  );
}
