import FadeIn from "../components/FadeIn";

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
          <h1
            className="font-bold tracking-tight leading-[1.0]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            About
          </h1>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-12">
        <FadeIn className="max-w-3xl">
          <div className="space-y-6 text-lg md:text-xl leading-[1.6] text-[var(--bone-dim)]">
            <p>
              Kai McAdams is a filmmaker, editor, and critic based in New York.
              Their practice spans direction and editing, graphic design, and
              film criticism — centered on the abject, queerness, and Latinx
              identity, often filtered through horror, the macabre, and their
              adjacent genres.
            </p>
            <p>
              A graduate of The New School with a BA in Screen Studies and
              minors in Film Production and Culture & Media (Dean&apos;s List),
              they currently serve as Production Creative Director at Chambiar
              AI and as Co-Founder and Digital Media Supervisor of Dead
              Billiards. Recent directorial and editorial work includes{" "}
              <em>Chambiar AI Demo</em>, <em>Ridiculous Bitch at NUBLU</em>,{" "}
              <em>Halloween Manor</em>,{" "}
              <em>Haunted City: Morris-Jumel Mansion</em>, and{" "}
              <em>The Night of the Reaper</em>.
            </p>
            <p>
              As a critic, McAdams writes <em>Gorehound Grindhouse</em> — a
              midnight digest of media and the macabre — alongside film essays,
              reviews, and themed studies on the zombie, folk horror, and the
              genre&apos;s quieter terrains.
            </p>
            <p className="text-[var(--muted)] pt-2">
              Fluent in English &amp; Spanish.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* SCREENINGS */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-20 md:py-28">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">
            Industry Screenings
          </h2>
        </FadeIn>
        <ul className="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
          {SCREENINGS.map((s, i) => (
            <li
              key={i}
              className="py-5 grid grid-cols-12 gap-4 items-baseline"
            >
              <span className="col-span-6 md:col-span-7 text-lg md:text-xl font-semibold tracking-tight">
                {s.title}
              </span>
              <span className="col-span-3 label">{s.presenter}</span>
              <span className="col-span-3 md:col-span-2 label text-right text-[var(--muted)]">
                {s.date}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* EDUCATION */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-16">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">
            Education
          </h2>
          <div className="border-t border-[var(--rule)] pt-8 max-w-2xl">
            <p className="label mb-3">2024</p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              The New School
            </h3>
            <p className="mt-3 text-[var(--bone-dim)] text-base md:text-lg leading-relaxed">
              BA in Screen Studies. Minors in Film Production and Culture
              &amp; Media. Dean&apos;s List.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-20 md:py-28">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">
            Contact
          </h2>
          <a
            href="mailto:McAdamsxK@gmail.com"
            className="inline-block text-2xl md:text-4xl font-semibold tracking-tight text-[var(--bone)] hover:text-[var(--cinema)] transition-colors"
          >
            McAdamsxK@gmail.com
          </a>
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
      </section>

    </>
  );
}
