import FadeIn from "../components/FadeIn";

export const metadata = {
  title: "CV — Kai McAdams",
  description:
    "Curriculum vitae of Kai McAdams — filmmaker, editor, and critic. Productions, editorial credits, graphic design, screenings, and education.",
};

type Credit = {
  title: string;
  role: string;
  org?: string;
  date: string;
};

const EXPERIENCE: Credit[] = [
  {
    title: "Production Creative Director",
    role: "Direction · Editorial · Brand Storytelling",
    org: "Chambiar AI",
    date: "2025 — Present",
  },
  {
    title: "Co-Founder · Digital Media Supervisor",
    role: "Creative Direction · Identity · Content Systems",
    org: "Dead Billiards",
    date: "2024 — Present",
  },
];

const DIRECTION: Credit[] = [
  { title: "Chambiar AI Demo", role: "Director · Editor", date: "March 2025" },
  { title: "Ridiculous Bitch at NUBLU", role: "Director · Editor", date: "February 2025" },
  { title: "Haunted City: Morris-Jumel Mansion", role: "Editor", date: "December 2024" },
  { title: "Halloween Manor", role: "Director · Editor", date: "October 2024" },
  { title: "Ring Me at Seven", role: "Director · Editor", date: "April 2023" },
  { title: "The Night of the Reaper", role: "Director · Writer · Editor", date: "October 2022" },
];

// Productions Kai has crewed / assisted on. Add credits here as they come in —
// format: { title, role, org (optional), date }.
const ASSISTED: Credit[] = [
  // e.g. { title: "Feature Title", role: "Assistant Editor", org: "Studio / Prod. Co.", date: "2024" },
];

const DESIGN: Credit[] = [
  { title: "Dead Billiards", role: "Logo · Merchandise", date: "Current" },
  { title: "Baby Delgado at The Sultan Room", role: "Merchandise", date: "February 2025" },
  { title: "Ridiculous Bitch at NUBLU", role: "Flyers · Posters", date: "February 2025" },
];

const SCREENINGS: Credit[] = [
  { title: "Fangoria — Invitee", role: "Fangoria", date: "April 2025" },
  { title: "Hell of a Summer", role: "Letterboxd × NEON", date: "April 2025" },
  { title: "Locked", role: "Letterboxd", date: "March 2025" },
  { title: "Screening Squad", role: "Screening Squad", date: "November 2024" },
  { title: "Longlegs", role: "Letterboxd × NEON", date: "July 2024" },
  { title: "The Strangers: Chapter 1", role: "Bloody Disgusting", date: "May 2024" },
  { title: "Final Destination Bloodlines — Invitee", role: "—", date: "—" },
];

function CreditList({ items }: { items: Credit[] }) {
  return (
    <ul className="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
      {items.map((c, i) => (
        <li key={i} className="py-5 grid grid-cols-12 gap-4 items-baseline">
          <span className="col-span-12 md:col-span-6 text-lg md:text-xl font-semibold tracking-tight text-[var(--bone)]">
            {c.title}
          </span>
          <span className="col-span-8 md:col-span-4 label">
            {c.org ? `${c.org} · ${c.role}` : c.role}
          </span>
          <span className="col-span-4 md:col-span-2 label text-right text-[var(--muted)]">
            {c.date}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-14 md:py-16">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-[var(--bone)]">
          {title}
        </h2>
        {children}
      </FadeIn>
    </section>
  );
}

export default function CVPage() {
  return (
    <>
      {/* HEADER */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-10">
        <FadeIn className="max-w-3xl">
          <p className="label mb-6">Curriculum Vitae</p>
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Kai McAdams
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            Filmmaker, editor, and critic based in New York. Direction and
            editorial across narrative, music, and brand — centered on horror,
            the macabre, and the queer Latinx imaginary.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <a
              href="mailto:McAdamsxK@gmail.com"
              className="label hover:text-[var(--cinema)] transition-colors"
            >
              → McAdamsxK@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/kaimcadams"
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-[var(--cinema)] transition-colors"
            >
              → LinkedIn
            </a>
            <a
              href="https://kaimcadams.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-[var(--cinema)] transition-colors"
            >
              → Gorehound Grindhouse
            </a>
          </div>
        </FadeIn>
      </section>

      <Section title="Experience">
        <CreditList items={EXPERIENCE} />
      </Section>

      <Section title="Direction & Editorial">
        <CreditList items={DIRECTION} />
      </Section>

      {ASSISTED.length > 0 && (
        <Section title="Assisted Productions">
          <CreditList items={ASSISTED} />
        </Section>
      )}

      <Section title="Graphic Design">
        <CreditList items={DESIGN} />
      </Section>

      <Section title="Criticism">
        <div className="border-t border-b border-[var(--rule)] py-6 max-w-3xl">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--bone)]">
            Gorehound Grindhouse
          </h3>
          <p className="mt-2 text-[var(--bone-dim)] leading-relaxed">
            Writer &amp; editor — a midnight digest of media and the macabre.
            Film essays, reviews, and themed studies on the zombie, folk horror,
            and the genre&apos;s quieter terrains.
          </p>
        </div>
      </Section>

      <Section title="Industry Screenings">
        <CreditList items={SCREENINGS} />
      </Section>

      <Section title="Education">
        <div className="border-t border-[var(--rule)] pt-8 max-w-2xl">
          <p className="label mb-3">2024</p>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-[var(--bone)]">
            The New School
          </h3>
          <p className="mt-3 text-[var(--bone-dim)] text-base md:text-lg leading-relaxed">
            BA in Screen Studies. Minors in Film Production and Culture &amp;
            Media. Dean&apos;s List.
          </p>
        </div>
      </Section>

      <Section title="Skills & Languages">
        <div className="border-t border-b border-[var(--rule)] py-6 max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Craft</span>
            Direction · Editing · Cinematography · Graphic Design · Criticism ·
            Film Programming &amp; Curation
          </p>
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Languages</span>
            English · Spanish (fluent)
          </p>
        </div>
      </Section>

      <div className="h-24" />
    </>
  );
}
