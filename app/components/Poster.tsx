import Image from "next/image";
import { type LbFilm } from "@/lib/letterboxd";

type Props = {
  film: LbFilm;
  rank?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * A single Letterboxd film poster: 2:3 cover that bounces on hover,
 * with a caption beneath. Display only — does not link out to Letterboxd.
 */
export default function Poster({ film, rank, sizes, priority }: Props) {
  return (
    <div className="poster-card group block">
      <div className="relative aspect-[2/3] w-full overflow-hidden border border-[var(--rule)] bg-[var(--ink-2)]">
        {film.poster ? (
          <Image
            src={film.poster}
            alt={film.title}
            fill
            sizes={sizes ?? "(min-width: 768px) 240px, 40vw"}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="label-sm leading-snug">{film.title}</span>
          </div>
        )}
        {rank != null && (
          <span className="absolute left-0 top-0 bg-[var(--cinema)] text-[var(--bone)] label px-2 py-1">
            {rank}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="label text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors leading-snug">
          {film.title}
        </div>
        {film.year && <div className="label-sm mt-1">{film.year}</div>}
      </div>
    </div>
  );
}
