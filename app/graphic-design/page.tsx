import FadeIn from "../components/FadeIn";

const PROJECTS = [
  {
    title: "Dead Billiards",
    subtitle: "Logo and Merchandise",
    date: "Current",
  },
  {
    title: "Baby Delgado at The Sultan Room",
    subtitle: "Merchandise",
    date: "February 2025",
  },
  {
    title: "Ridiculous Bitch at NUBLU",
    subtitle: "Flyers · Posters",
    date: "February 2025",
  },
];

export const metadata = {
  title: "Graphic Design · Kai McAdams",
  description:
    "Identity, merchandise, and print work for venues, artists, and brands.",
};

export default function GraphicDesignPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-20">
        <FadeIn className="max-w-3xl">
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Graphic Design
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
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
                  <span className="absolute top-4 right-4 label-sm">
                    {project.date}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[var(--muted)]/30 text-6xl font-light select-none">
                      ✕
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 label">{project.subtitle}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

    </>
  );
}
