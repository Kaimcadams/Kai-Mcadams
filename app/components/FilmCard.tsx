export type Film = {
  title: string;
  role: string;
  date: string;
  number: number;
};

export default function FilmCard({ film }: { film: Film }) {
  return (
    <article className="group">
      <div className="relative aspect-video w-full bg-[var(--ink-3)] border border-[var(--rule)] overflow-hidden transition-colors group-hover:border-[var(--cinema-deep)]">
        <span className="absolute top-3 left-4 label-sm">
          Nº {String(film.number).padStart(3, "0")}
        </span>
        <span className="absolute top-3 right-4 label-sm">{film.date}</span>
        <span className="absolute bottom-3 left-4 label-sm text-[var(--muted)]">
          16:9
        </span>
        <span className="absolute bottom-3 right-4 label-sm text-[var(--muted)]">
          Still Forthcoming
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display italic text-[var(--muted)]/40 text-7xl select-none">
            ✕
          </span>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
          {film.title}
        </h3>
        <p className="mt-2 label">{film.role}</p>
      </div>
    </article>
  );
}
