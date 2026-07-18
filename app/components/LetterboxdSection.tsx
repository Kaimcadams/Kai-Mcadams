import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { getFollowerCount, lists } from "@/lib/letterboxd";

function ListCard({
  slug,
  title,
  count,
  posters,
}: {
  slug: string;
  title: string;
  count: number;
  posters: string[];
}) {
  return (
    <Link href={`/letterboxd/list/${slug}`} className="poster-card group block">
      <div className="flex gap-1.5 mb-4">
        {posters.slice(0, 5).map((src, i) => (
          <div
            key={i}
            className="relative aspect-[2/3] flex-1 overflow-hidden border border-[var(--rule)] bg-[var(--ink-2)]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors">
        {title}
      </h3>
      <p className="label mt-2">{count} films</p>
    </Link>
  );
}

export default async function LetterboxdSection() {
  if (!lists.length) return null;

  // Live off the profile; null when the scrape misses, in which case the count
  // is hidden rather than shown stale.
  const followers = await getFollowerCount();

  return (
    <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-32 md:pt-44 pb-16 border-b border-[var(--rule)]">
      <FadeIn className="text-center">
        <h2
          className="font-bold tracking-tight text-[var(--bone)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Letterboxd
        </h2>
        {followers !== null && (
          <p className="label mt-3">
            {followers.toLocaleString("en-US")} Followers
          </p>
        )}
      </FadeIn>

      {lists.length > 0 && (
        <div className="mt-16">
          <FadeIn>
            <p className="label mb-6">Curated Lists</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {lists.map((l) => (
              <FadeIn key={l.slug}>
                <ListCard
                  slug={l.slug}
                  title={l.title}
                  count={l.count}
                  posters={l.films
                    .map((f) => f.poster)
                    .filter((p): p is string => Boolean(p))}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
