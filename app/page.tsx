import Link from "next/link";
import StreetlampHero from "./components/StreetlampHero";
import Marquee from "./components/Marquee";
import FadeIn from "./components/FadeIn";
import PostCard from "./components/PostCard";
import FilmCard from "./components/FilmCard";
import { getPosts } from "@/lib/substack";

export const revalidate = 900;

// `thumb` values are placeholders drawn from art already on the site — they are
// NOT stills from these films. Swap each for a real frame when available.
const SELECTED_WORK = [
  { number: 1, title: "Chambiar AI Demo", role: "Director · Editor", date: "March 2025", thumb: "/city-night.png" },
  { number: 2, title: "Ridiculous Bitch at NUBLU", role: "Director · Editor", date: "February 2025", thumb: "/streetlamp.png" },
  { number: 3, title: "Haunted City: Morris-Jumel Mansion", role: "Editor", date: "December 2024", thumb: "/theater.png" },
  { number: 4, title: "Halloween Manor", role: "Director · Editor", date: "October 2024", thumb: "/about.jpeg" },
];

export default async function Home() {
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 3);

  return (
    <>
      <StreetlampHero />

      {/* Marquee on solid theater-red, flush against the hero */}
      <div style={{ background: "var(--cinema)" }}>
        <Marquee tone="cinema" slow />
      </div>

      {/* Red → ink wash, after the marquee */}
      <div
        aria-hidden
        className="h-[18vh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, var(--cinema) 0%, var(--ink) 100%)",
        }}
      />

      {/* INTRO */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-8 pb-0">
        <FadeIn>
          <p className="text-2xl md:text-4xl font-medium leading-[1.25] tracking-tight text-[var(--bone)] max-w-3xl">
            Kai McAdams is a New York–based film programmer &amp; maker, editor,
            and critic working across cinema, criticism, and graphic design.
            Kai&apos;s work lives in horror, the macabre, and queer Latine
            themes. They&apos;re the founder of Gorehound Grindhouse, a
            publication for the genre-obsessed.
          </p>
          <Link
            href="/about"
            className="inline-block mt-10 label hover:text-[var(--cinema)] transition-colors"
            // .label is unlayered CSS, so it wins over Tailwind's text-*
            // utilities — the 2x size has to be set here to stick.
            style={{ fontSize: "24px" }}
          >
            Read more →
          </Link>
        </FadeIn>
      </section>

      {/* SELECTED WORK */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-[100px] pb-20 md:pb-28">
        <FadeIn className="flex items-baseline justify-between mb-16 pb-6 border-b border-[var(--rule)]">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected Film Works
          </h2>
          <Link
            href="/cinematography"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            View All Work →
          </Link>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {SELECTED_WORK.map((film, i) => (
            <FadeIn key={film.title} delay={i * 0.08}>
              <FilmCard film={film} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* GOREHOUND GRINDHOUSE - FEATURED PUBLICATION */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-20 md:py-28 mt-12">
        <FadeIn className="mb-12 pb-8 border-b border-[var(--rule)]">
          <p className="label mb-4">Latest Post · The Publication</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tight leading-[0.95] text-[var(--bone)]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
              >
                Gorehound Grindhouse
              </h2>
              <p className="mt-3 text-lg md:text-2xl font-medium text-[var(--cinema)] tracking-tight">
                A Midnight Digest of Media and the Macabre.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <a
                href="https://kaimcadams.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-[var(--cinema)] text-[var(--cinema)] px-5 py-3 hover:bg-[var(--cinema)] hover:text-[var(--bone)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </a>
              <Link
                href="/cinema-journalism"
                className="label hover:text-[var(--cinema)] transition-colors whitespace-nowrap"
              >
                Read All →
              </Link>
            </div>
          </div>
        </FadeIn>

        {featured ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <FadeIn>
                <PostCard post={featured} variant="featured" />
              </FadeIn>
            </div>
            <div className="md:col-span-4 flex flex-col">
              {rest.map((post, i) => (
                <FadeIn key={post.link} delay={(i + 1) * 0.08}>
                  <PostCard post={post} variant="compact" />
                </FadeIn>
              ))}
              {rest.length === 0 && (
                <p className="label text-[var(--muted)] mt-8">
                  More dispatches forthcoming.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="label text-[var(--muted)] py-12">
            The feed is dim. Check back after dark.
          </p>
        )}
      </section>

    </>
  );
}
