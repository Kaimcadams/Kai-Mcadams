import Image from "next/image";

export type Film = {
  title: string;
  role: string;
  date: string;
  number: number;
  /** Stand-in art until real stills exist; falls back to the ✕ frame. */
  thumb?: string;
};

export default function FilmCard({ film }: { film: Film }) {
  return (
    <article className="group">
      <div className="relative aspect-video w-full bg-[var(--ink-3)] border border-[var(--rule)] overflow-hidden transition-colors group-hover:border-[var(--cinema-deep)]">
        {film.thumb ? (
          <Image
            src={film.thumb}
            alt=""
            fill
            sizes="(min-width: 768px) 600px, 100vw"
            className="object-cover opacity-70 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--muted)]/40 text-7xl font-light select-none">
              ✕
            </span>
          </div>
        )}
        <span className="absolute top-3 right-4 label-sm z-10">{film.date}</span>
      </div>
      <div className="mt-5">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
          {film.title}
        </h3>
        <p className="mt-2 label">{film.role}</p>
      </div>
    </article>
  );
}
