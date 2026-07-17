import Image from "next/image";
import FadeIn from "../components/FadeIn";
import PostCard from "../components/PostCard";
import LetterboxdSection from "../components/LetterboxdSection";
import { getPosts } from "@/lib/substack";

export const revalidate = 900;

export const metadata = {
  title: "Cinema Journalism · Kai McAdams",
  description:
    "Gorehound Grindhouse: a midnight digest of media and the macabre. Essays, reviews, and dispatches.",
};

export default async function CinematicAnalysisPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <LetterboxdSection />

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-16 md:pt-24 pb-16">
        <FadeIn className="max-w-4xl">
          <h1 className="mb-6">
            <Image
              src="/gorehound-grindhouse-wordmark.png"
              alt="Gorehound Grindhouse"
              width={713}
              height={104}
              priority
              className="w-full max-w-[640px] h-auto"
              sizes="(min-width: 768px) 640px, 90vw"
            />
          </h1>
          <p className="text-xl md:text-3xl font-medium text-[var(--cinema)] leading-tight tracking-tight">
            A Midnight Digest of Media and the Macabre.
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

    </>
  );
}
