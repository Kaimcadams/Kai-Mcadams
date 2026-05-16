import FadeIn from "../components/FadeIn";
import Marquee from "../components/Marquee";

const SCREENINGS = [
  { presenter: "Fangoria", title: "Invitee", date: "April 2025" },
  { presenter: "Letterboxd × NEON", title: "Hell of a Summer", date: "April 2025" },
  { presenter: "Letterboxd", title: "Locked", date: "March 2025" },
  { presenter: "Screening Squad", title: "NDA Title", date: "November 2024" },
  { presenter: "Letterboxd × NEON", title: "Longlegs", date: "July 2024" },
  { presenter: "Bloody Disgusting", title: "The Strangers: Chapter 1", date: "May 2024" },
  { presenter: "Final Destination Bloodlines", title: "Invitee", date: "—" },
];

export const metadata = {
  title: "About — Kai McAdams",
  description:
    "Kai McAdams is a New York–based filmmaker, editor, and critic working across cinema, criticism, and graphic design.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-16">
        <FadeIn>
          <p className="label mb-8">About</p>
          <h1
            className="font-display tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            A working
            <br />
            <span className="italic">index.</span>
          </h1>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeIn className="md:col-span-4">
            <p className="label">Nº 001 — Statement</p>
            <div className="w-12 h-px bg-[var(--cinema)] mt-6" />
          </FadeIn>
          <div className="md:col-span-8">
            <FadeIn>
              <div className="space-y-7 text-xl md:text-2xl leading-[1.55] text-[var(--bone-dim)]">
                <p>
                  Kai McAdams is a filmmaker, editor, and critic based in New
                  York. Their practice spans direction and editing, graphic
                  design, and film criticism — centered on the abject,
                  queerness, and Latinx identity, often filtered through horror,
                  the macabre, and their adjacent genres.
                </p>
                <p>
                  A graduate of The New School with a BA in Screen Studies and
                  minors in Film Production and Culture & Media (Dean&apos;s
                  List), they currently serve as Production Creative Director at
                  Chambiar AI and as Co-Founder and Digital Media Supervisor of
                  Dead Billiards. Recent directorial and editorial work includes{" "}
                  <em>Chambiar AI Demo</em>,{" "}
                  <em>Ridiculous Bitch at NUBLU</em>,{" "}
                  <em>Halloween Manor</em>,{" "}
                  <em>Haunted City: Morris-Jumel Mansion</em>, and{" "}
                  <em>The Night of the Reaper</em>.
                </p>
                <p>
                  As a critic, McAdams writes{" "}
                  <em>Gorehound Grindhouse</em> — a midnight digest of media and
                  the macabre — alongside film essays, reviews, and themed
                  studies on the zombie, folk horror, and the genre&apos;s
                  quieter terrains.
                </p>
                <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-[var(--muted)] pt-4">
                  Fluent in English &amp; Spanish.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SCREENINGS */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeIn className="md:col-span-4">
            <p className="label">Nº 002 — Industry Screenings</p>
            <h2 className="font-display text-4xl md:text-5xl italic mt-6 tracking-tight leading-tight">
              By invitation.
            </h2>
            <div className="w-12 h-px bg-[var(--cinema)] mt-6" />
          </FadeIn>
          <div className="md:col-span-8">
            <ul className="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
              {SCREENINGS.map((s, i) => (
                <li key={i} className="py-6 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-2 label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-6 font-display text-xl md:text-2xl tracking-tight leading-tight">
                    {s.title}
                  </span>
                  <span className="col-span-4 label text-right">
                    {s.presenter}
                    <br />
                    <span className="text-[var(--muted)]">{s.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeIn className="md:col-span-4">
            <p className="label">Nº 003 — Education</p>
            <div className="w-12 h-px bg-[var(--cinema)] mt-6" />
          </FadeIn>
          <FadeIn className="md:col-span-8">
            <div className="border-t border-[var(--rule)] pt-8">
              <p className="label mb-3">2024</p>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight italic leading-tight">
                The New School
              </h3>
              <p className="mt-4 text-[var(--bone-dim)] text-lg leading-relaxed max-w-xl">
                BA in Screen Studies. Minors in Film Production and Culture
                &amp; Media. Dean&apos;s List.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeIn className="md:col-span-4">
            <p className="label">Nº 004 — Contact</p>
            <div className="w-12 h-px bg-[var(--cinema)] mt-6" />
          </FadeIn>
          <FadeIn className="md:col-span-8">
            <h2
              className="font-display tracking-tight leading-[1.02]"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
            >
              <a
                href="mailto:McAdamsxK@gmail.com"
                className="text-[var(--bone)] hover:text-[var(--cinema)] transition-colors italic"
              >
                McAdamsxK@gmail.com
              </a>
            </h2>
            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href="https://substack.com/@KaiMcAdams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-[var(--cinema)] transition-colors"
                >
                  → Substack
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kaimcadams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-[var(--cinema)] transition-colors"
                >
                  → Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kaimcadams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-[var(--cinema)] transition-colors"
                >
                  → LinkedIn
                </a>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      <Marquee items={["Filmmaker", "Editor", "Critic", "New York"]} slow />
    </>
  );
}
