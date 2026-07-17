import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/app/components/FadeIn";
import Poster from "@/app/components/Poster";
import { getList, lists, profileUrl } from "@/lib/letterboxd";

export function generateStaticParams() {
  return lists.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = getList(slug);
  return {
    title: list ? `${list.title} · Letterboxd · Kai McAdams` : "List",
    description: list?.description ?? undefined,
    robots: { index: false },
  };
}

export default async function ListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = getList(slug);
  if (!list) notFound();

  const listUrl = `${profileUrl}list/${list.slug}/`;
  const isRanked = /ranked/.test(list.slug);

  return (
    <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-32 md:pt-44 pb-28">
      <FadeIn>
        <p className="label mb-5">
          <Link
            href="/cinema-journalism"
            className="hover:text-[var(--cinema)] transition-colors"
          >
            ← Cinema Journalism
          </Link>
        </p>
        <a
          href={listUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <h1
            className="font-bold tracking-tight leading-[1.0] text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)" }}
          >
            {list.title}
          </h1>
        </a>
        <p className="label mt-5">
          {list.count} films · A list by{" "}
          <span className="text-[var(--bone-dim)]">@vampiriczombie ↗</span>
        </p>
        {list.description && (
          <p className="mt-6 max-w-2xl text-lg text-[var(--bone-dim)] leading-relaxed">
            {list.description}
          </p>
        )}
      </FadeIn>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-12">
        {list.films.map((film, i) => (
          <FadeIn key={film.slug} delay={(i % 5) * 0.05}>
            <Poster
              film={film}
              rank={isRanked ? i + 1 : undefined}
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
