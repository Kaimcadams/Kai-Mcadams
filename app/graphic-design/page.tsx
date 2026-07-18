import FadeIn from "../components/FadeIn";
import GraphicDesignGallery from "../components/GraphicDesignGallery";

// Merch, logos, and flyers. Dimensions are the source files' intrinsic sizes,
// so the masonry lays each piece out at its natural ratio (no cropping).
const WORK = [
  { src: "/gd-01.webp", width: 1500, height: 1500 },
  { src: "/gd-02.webp", width: 1500, height: 1500 },
  { src: "/gd-03.webp", width: 1500, height: 1500 },
  { src: "/gd-04.webp", width: 1500, height: 1500 },
  { src: "/gd-05.webp", width: 1500, height: 1500 },
  { src: "/gd-06.webp", width: 1500, height: 1500 },
  { src: "/gd-07.webp", width: 1500, height: 1500 },
  { src: "/gd-08.webp", width: 1500, height: 1500 },
  { src: "/gd-09.webp", width: 1500, height: 1500 },
  { src: "/gd-10.webp", width: 1500, height: 1500 },
  { src: "/gd-11.webp", width: 1500, height: 1500 },
  { src: "/gd-12.webp", width: 1500, height: 1500 },
  { src: "/gd-13.webp", width: 1500, height: 1500 },
  { src: "/gd-14.webp", width: 1000, height: 1629 },
  { src: "/gd-15.webp", width: 750, height: 750 },
];

export const metadata = {
  title: "Graphic Design · Kai McAdams",
  description:
    "Identity, merchandise, and print work for venues, artists, and brands.",
};

export default function GraphicDesignPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-20">
        <FadeIn className="max-w-3xl">
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Graphic Design
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            Identity, merchandise, and print work for venues, artists, and
            brands.
          </p>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
        <GraphicDesignGallery images={WORK} />
      </section>
    </>
  );
}
