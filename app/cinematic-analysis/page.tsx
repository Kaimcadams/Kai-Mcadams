import FadeIn from "../components/FadeIn";
import PostCard from "../components/PostCard";
import SubscribeForm from "../components/SubscribeForm";
import { getPosts } from "@/lib/substack";

export const revalidate = 900;

export const metadata = {
  title: "Cinematic Analysis — Kai McAdams",
  description:
    "Gorehound Grindhouse: a midnight digest of media and the macabre. Essays, reviews, and dispatches.",
};

export default async function CinematicAnalysisPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-16">
        <FadeIn className="max-w-4xl">
          <h1
            className="font-bold tracking-tight leading-[0.95] mb-6 text-[var(--bone)]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)" }}
          >
            Gorehound
            <br />
            Grindhouse
          </h1>
          <p className="text-xl md:text-3xl font-medium text-[var(--cinema)] leading-tight tracking-tight">
            A Midnight Digest of Media and the Macabre.
          </p>
          <p className="mt-8 max-w-2xl text-lg text-[var(--bone-dim)] leading-relaxed">
            Essays, reviews, and dispatches from the dim corners of horror —
            and the genres adjacent. New issues posted regularly.
          </p>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-20">
        {featured ? (
          <FadeIn>
            <PostCard post={featured} variant="featured" />
          </FadeIn>
        ) : (
          <p className="label text-[var(--muted)] py-12">
            The feed could not be reached. Check back after dark.
          </p>
        )}

        {rest.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {rest.map((post, i) => (
              <FadeIn key={post.link} delay={(i % 4) * 0.06}>
                <PostCard post={post} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto py-24 md:py-32">
        <FadeIn>
          <SubscribeForm />
        </FadeIn>
      </section>

    </>
  );
}
