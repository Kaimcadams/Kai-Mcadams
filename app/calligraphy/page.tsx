import CalligraphyGallery from "../components/CalligraphyGallery";
import FadeIn from "../components/FadeIn";

// IMG_0797 2.jpeg / IMG_0797 3.jpeg are byte-identical copies of IMG_0797.jpeg.
const IMAGES = [
  "/RenderedImage.jpeg",
  "/IMG_0794.jpeg",
  "/IMG_9437.jpeg",
  "/IMG_9293.jpeg",
  "/IMG_9386.jpeg",
  "/IMG_8121.jpeg",
  "/IMG_6094.jpeg",
  "/IMG_5180.jpeg",
  "/IMG_2554.jpeg",
  "/IMG_1380.jpeg",
  "/IMG_1097.jpeg",
  "/IMG_1699.jpeg",
  "/IMG_0366.jpeg",
  "/IMG_5179.jpeg",
  "/IMG_0410.jpeg",
  "/IMG_1153.jpeg",
  "/IMG_8276.jpeg",
  "/IMG_0772.jpeg",
  "/IMG_0797.jpeg",
];

export const metadata = {
  title: "Calligraphy · Kai McAdams",
  description: "Hand-lettering and calligraphy work.",
};

export default function CalligraphyPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-20">
        <FadeIn className="max-w-3xl">
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Calligraphy
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            Hand-lettering, ink, and the slow work of the pen.
          </p>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
        <CalligraphyGallery images={IMAGES} />
      </section>
    </>
  );
}
