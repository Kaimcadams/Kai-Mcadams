import FadeIn from "../components/FadeIn";

export const metadata = {
  title: "CV · Kai McAdams",
  description:
    "Curriculum vitae of Kai McAdams, filmmaker, editor, and critic. Productions, editorial credits, graphic design, screenings, and education.",
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
    role: "Direction · Editing · Brand Storytelling",
    org: "Chambiar AI",
    date: "Mar 2025 to Present",
  },
  {
    title: "Digital Media Supervisor · Co-Founder",
    role: "Creative Direction · Identity · Marketing",
    org: "Dead Billiards",
    date: "Jan 2025 to Present",
  },
  {
    title: "Associate Supervisor",
    role: "Operations · Guest Experience",
    org: "AMC Theatres",
    date: "Jun 2022 to Apr 2023",
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

// Productions Kai has crewed / assisted on. Add credits here as they come in.
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
  { title: "Evil Dead Burn", role: "Invitee", date: "2026" },
  { title: "Final Destination Bloodlines", role: "Fangoria · Invitee", date: "April 2025" },
  { title: "Hell of a Summer", role: "Letterboxd × NEON · Invitee", date: "April 2025" },
  { title: "Locked", role: "Letterboxd · Invitee", date: "March 2025" },
  { title: "NDA", role: "Screening Squad · Invitee", date: "November 2024" },
  { title: "Longlegs", role: "Letterboxd × NEON · Invitee", date: "July 2024" },
  { title: "The Strangers: Chapter 1", role: "Bloody Disgusting · Invitee", date: "May 2024" },
];

function CreditList({ items }: { items: Credit[] }) {
  return (
    <ul className="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
      {items.map((c, i) => (
        <li key={i} className="py-5 grid grid-cols-12 gap-x-4 gap-y-1.5 items-baseline">
          <span className="col-span-12 md:col-span-6 text-lg md:text-xl font-semibold tracking-tight text-[var(--bone)]">
            {c.title}
          </span>
          {/* On phones each field takes its own full-width line so long roles
              and dates never get crushed into a narrow column; md restores the
              inline 6/4/2 grid. */}
          <span className="col-span-12 md:col-span-4 label">
            {c.org ? `${c.org} · ${c.role}` : c.role}
          </span>
          <span className="col-span-12 md:col-span-2 label text-left md:text-right text-[var(--muted)]">
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
            editorial across narrative, music, and brand, centered on horror,
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
            Writer &amp; editor, a midnight digest of media and the macabre.
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
            Media. GPA 3.9 · Dean&apos;s List Honor Student.
          </p>
        </div>
      </Section>

      <Section title="Skills & Languages">
        <div className="border-t border-b border-[var(--rule)] py-6 max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Craft</span>
            Direction · Editing · Videography · Cinematography · Pre-Production ·
            Graphic &amp; Web Design · Film Programming &amp; Curation · Criticism
          </p>
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Tools</span>
            DaVinci Resolve · Adobe Premiere Pro · After Effects · Adobe Creative
            Suite · Photoshop · Canva
          </p>
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Strategy</span>
            Creative &amp; Campaign Strategy · Social Media Marketing · Project
            Management (Asana) · Google Analytics · HubSpot
          </p>
          <p className="text-[var(--bone-dim)]">
            <span className="label block mb-1">Languages</span>
            English · Spanish, Bilingual
          </p>
        </div>
      </Section>

      <div className="h-24" />
    </>
  );
}
