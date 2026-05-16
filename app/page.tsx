import Link from "next/link";
import HeroName from "./components/HeroName";
import Marquee from "./components/Marquee";
import FadeIn from "./components/FadeIn";
import PostCard from "./components/PostCard";
import FilmCard from "./components/FilmCard";
import SubscribeForm from "./components/SubscribeForm";
import { getSubstackPosts } from "@/lib/substack";

export const revalidate = 900;

const SELECTED_WORK = [
  { number: 1, title: "Chambiar AI Demo", role: "Director · Editor", date: "March 2025" },
  { number: 2, title: "Ridiculous Bitch at NUBLU", role: "Director · Editor", date: "February 2025" },
  { number: 3, title: "Haunted City: Morris-Jumel Mansion", role: "Editor", date: "December 2024" },
  { number: 4, title: "Halloween Manor", role: "Director · Editor", date: "October 2024" },
];

export default async function Home() {
  const posts = await getSubstackPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col">
        <div className="flex-1 flex items-end pt-32 pb-12 px-6 md:px-20 max-w-[1280px] mx-auto w-full">
          <div className="w-full">
            <p className="label mb-8 text-[var(--cinema)]">
              ✕ Est. New York · A Working Index
            </p>
            <HeroName mode="hero" />
            <div className="mt-10 max-w-xl">
              <p className="font-mono uppercase text-[11px] tracking-[0.32em] text-[var(--bone-dim)] leading-relaxed">
                Filmmaker
                <span className="mx-3 text-[var(--cinema)]">·</span>
                Editor
                <span className="mx-3 text-[var(--cinema)]">·</span>
                Critic
                <span className="mx-3 text-[var(--cinema)]">·</span>
                New York
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Marquee />
        </div>
      </section>

      {/* INTRO */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-32 md:py-44">
        <FadeIn className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="label">Nº 001 — The Index</p>
            <div className="w-12 h-px bg-[var(--cinema)] mt-6" />
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <p className="font-display italic text-3xl md:text-5xl leading-[1.15] tracking-tight text-[var(--bone)]">
              A New York–based filmmaker, editor, and critic working across
              cinema, criticism, and graphic design — with a focus on horror,
              the macabre, and the queer Latinx imaginary.
            </p>
            <Link
              href="/about"
              className="inline-block mt-10 label hover:text-[var(--cinema)] transition-colors"
            >
              Read the full statement →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* SELECTED WORK */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-20 md:py-28">
        <FadeIn className="flex items-baseline justify-between mb-16 pb-6 border-b border-[var(--rule)]">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            Selected <span className="italic">Work</span>
          </h2>
          <Link
            href="/film"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            View All Film →
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

      {/* LATEST DISPATCH */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-20 md:py-28 mt-12">
        <FadeIn className="flex items-baseline justify-between mb-12 pb-6 border-b border-[var(--rule)]">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            Latest <span className="italic">Dispatch</span>
          </h2>
          <Link
            href="/cinematic-analysis"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            Gorehound Grindhouse →
          </Link>
        </FadeIn>

        {featured ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <FadeIn>
                <PostCard post={featured} index={0} variant="featured" />
              </FadeIn>
            </div>
            <div className="md:col-span-4 flex flex-col">
              {rest.map((post, i) => (
                <FadeIn key={post.link} delay={(i + 1) * 0.08}>
                  <PostCard post={post} index={i + 1} />
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

      {/* SUBSCRIBE */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-24 md:py-32">
        <FadeIn>
          <SubscribeForm />
        </FadeIn>
      </section>

      {/* MARQUEE STRIP */}
      <Marquee
        items={["Filmmaker", "Editor", "Critic", "New York"]}
        slow
      />
    </>
  );
}
