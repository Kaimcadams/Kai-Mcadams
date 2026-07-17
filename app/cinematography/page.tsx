import FadeIn from "../components/FadeIn";
import FilmCard from "../components/FilmCard";

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

const FILMS = [
  { number: 1, title: "Chambiar AI Demo", role: "Director · Editor", date: "March 2025" },
  { number: 2, title: "Ridiculous Bitch at NUBLU", role: "Director · Editor", date: "February 2025" },
  { number: 3, title: "Haunted City: Morris-Jumel Mansion", role: "Editor", date: "December 2024" },
  { number: 4, title: "Halloween Manor", role: "Director · Editor", date: "October 2024" },
  { number: 5, title: "Ring Me at Seven", role: "Director · Editor", date: "April 2023" },
  { number: 6, title: "The Night of the Reaper", role: "Director · Writer · Editor", date: "October 2022" },
];

export const metadata = {
  title: "Cinematography · Kai McAdams",
  description:
    "Direction and editorial work in narrative, music, and brand. Reel and selected films by Kai McAdams.",
};

export default function CinematographyPage() {
  const src = embedSrc();

  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-12">
        <FadeIn className="max-w-3xl">
          <p className="label mb-6">Directing · Editing</p>
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Cinematography
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            Direction and editorial work in narrative, music, and brand. Drawn
            toward horror and the macabre.
          </p>
        </FadeIn>
      </section>

      {/* REEL — leads the page */}
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-24">
        <FadeIn>
          <div className="relative aspect-video w-full bg-black border border-[var(--rule)] overflow-hidden">
            {src ? (
              <iframe
                src={src}
                title="Kai McAdams · Reel"
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

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
        <FadeIn className="mb-16 pb-6 border-b border-[var(--rule)]">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected Works
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {FILMS.map((film, i) => (
            <FadeIn key={film.title} delay={i * 0.06}>
              <FilmCard film={film} />
            </FadeIn>
          ))}
        </div>
      </section>

    </>
  );
}
