import Link from "next/link";
import FadeIn from "../components/FadeIn";

export const metadata = {
  title: "Reel — Kai McAdams",
  description:
    "Directing and editing reel — selected film, music, and brand work by Kai McAdams.",
};

/**
 * Kai's reel embed.
 *  - platform: "vimeo" | "youtube"
 *  - id: the video ID only
 *      Vimeo   → https://vimeo.com/123456789            → id: "123456789"
 *      YouTube → https://youtube.com/watch?v=abc123XYZ   → id: "abc123XYZ"
 * Leave id as "" to show the placeholder frame.
 */
const REEL: { platform: "vimeo" | "youtube"; id: string } = {
  platform: "youtube",
  id: "2GXX3Yc-bUs", // Stand-in: Kai McAdams Showreel. Swap for the new cut when ready.
};

function embedSrc(): string | null {
  if (!REEL.id) return null;
  if (REEL.platform === "vimeo") {
    return `https://player.vimeo.com/video/${REEL.id}?color=8b1414&title=0&byline=0&portrait=0`;
  }
  return `https://www.youtube.com/embed/${REEL.id}?rel=0&modestbranding=1`;
}

export default function ReelPage() {
  const src = embedSrc();

  return (
    <>
      {/* HEADER */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-12">
        <FadeIn className="max-w-3xl">
          <p className="label mb-6">Directing · Editing</p>
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Reel
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            A cut through the work — narrative, music, and brand. Direction and
            editorial, drawn toward horror and the macabre.
          </p>
        </FadeIn>
      </section>

      {/* REEL */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-16">
        <FadeIn>
          <div className="relative aspect-video w-full bg-black border border-[var(--rule)] overflow-hidden">
            {src ? (
              <iframe
                src={src}
                title="Kai McAdams — Reel"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="text-[var(--muted)]/40 text-7xl font-light select-none">
                  ✕
                </span>
                <span className="label text-[var(--muted)]">
                  Reel arriving soon
                </span>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER LINKS */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
        <FadeIn className="flex flex-wrap gap-x-10 gap-y-3 pt-8 border-t border-[var(--rule)]">
          <Link
            href="/film"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            View All Film →
          </Link>
          <Link
            href="/cv"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            Full CV →
          </Link>
          <a
            href="mailto:McAdamsxK@gmail.com"
            className="label hover:text-[var(--cinema)] transition-colors"
          >
            Booking & Enquiries →
          </a>
        </FadeIn>
      </section>
    </>
  );
}
