import FadeIn from "../components/FadeIn";
import Marquee from "../components/Marquee";
import PostCard from "../components/PostCard";
import SubscribeForm from "../components/SubscribeForm";
import { getSubstackPosts } from "@/lib/substack";

export const revalidate = 900;

export const metadata = {
  title: "Cinematic Analysis — Kai McAdams",
  description:
    "Gorehound Grindhouse: a midnight digest of media and the macabre. Essays, reviews, and dispatches.",
};

export default async function CinematicAnalysisPage() {
  const posts = await getSubstackPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* MASTHEAD */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-12">
        <FadeIn className="max-w-4xl">
          <p className="label mb-8">Nº 003 / Practice · The Column</p>
          <h1
            className="font-display italic tracking-tight leading-[0.92] mb-8 text-[var(--bone)]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)" }}
          >
            Gorehound
            <br />
            Grindhouse
          </h1>
          <p className="font-display text-2xl md:text-4xl italic text-[var(--cinema)] leading-tight tracking-tight">
            A Midnight Digest of Media and the Macabre.
          </p>
          <div className="mt-10 max-w-2xl text-lg md:text-xl text-[var(--bone-dim)] leading-relaxed">
            <p>
              Essays, reviews, and dispatches from the dim corners of horror —
              and the genres adjacent. New issues posted regularly.
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="px-6 md:px-20 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-6 py-12">
          <span className="label">★</span>
          <div className="flex-1 h-px bg-[var(--rule)]" aria-hidden />
          <span className="label">★</span>
          <div className="flex-1 h-px bg-[var(--rule)]" aria-hidden />
          <span className="label">★</span>
        </div>
      </div>

      {/* FEATURED + LIST */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-20">
        {featured ? (
          <>
            <div className="mb-2 label">Now Playing</div>
            <FadeIn>
              <PostCard post={featured} index={0} variant="featured" />
            </FadeIn>
          </>
        ) : (
          <p className="label text-[var(--muted)] py-12">
            The feed could not be reached. Check back after dark.
          </p>
        )}

        {rest.length > 0 && (
          <div className="mt-20">
            <div className="mb-2 label">The Reel</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {rest.map((post, i) => (
                <FadeIn key={post.link} delay={(i % 4) * 0.06}>
                  <PostCard post={post} index={i + 1} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SUBSCRIBE */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-24 md:py-32">
        <FadeIn>
          <SubscribeForm />
        </FadeIn>
      </section>

      <Marquee
        tone="cinema"
        items={["Gorehound Grindhouse", "After Dark", "Midnight Digest", "The Macabre"]}
        slow
      />
    </>
  );
}
