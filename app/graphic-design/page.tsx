import FadeIn from "../components/FadeIn";
import Marquee from "../components/Marquee";

const PROJECTS = [
  {
    number: 1,
    title: "Dead Billiards",
    subtitle: "Logo and Merchandise",
    date: "Current",
  },
  {
    number: 2,
    title: "Baby Delgado at The Sultan Room",
    subtitle: "Merchandise",
    date: "February 2025",
  },
  {
    number: 3,
    title: "Ridiculous Bitch at NUBLU",
    subtitle: "Flyers · Posters",
    date: "February 2025",
  },
];

export const metadata = {
  title: "Graphic Design — Kai McAdams",
  description:
    "Identity, merchandise, and print work for venues, artists, and brands.",
};

export default function GraphicDesignPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-20">
        <FadeIn className="max-w-3xl">
          <p className="label mb-8">Nº 002 / Practice</p>
          <h1
            className="font-display tracking-tight leading-[0.95] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Graphic <span className="italic">Design</span>
          </h1>
          <p className="text-2xl md:text-3xl italic text-[var(--bone-dim)] leading-snug max-w-2xl">
            Identity, merchandise, and print work for venues, artists, and
            brands.
          </p>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-[4/5] bg-[var(--ink-3)] border border-[var(--rule)] overflow-hidden transition-colors group-hover:border-[var(--cinema-deep)]">
                  <span className="absolute top-4 left-4 label-sm">
                    Nº {String(project.number).padStart(3, "0")}
                  </span>
                  <span className="absolute top-4 right-4 label-sm">
                    {project.date}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display italic text-[var(--muted)]/30 text-6xl select-none">
                      ✕
                    </span>
                  </div>
                  <span className="absolute bottom-4 left-4 label-sm text-[var(--muted)]">
                    Plates Forthcoming
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-2xl tracking-tight leading-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 label">{project.subtitle}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <Marquee items={["Identity", "Merchandise", "Print", "Posters"]} slow />
    </>
  );
}
