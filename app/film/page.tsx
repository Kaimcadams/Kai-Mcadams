import FadeIn from "../components/FadeIn";
import FilmCard from "../components/FilmCard";

const FILMS = [
  { number: 1, title: "Chambiar AI Demo", role: "Director · Editor", date: "March 2025" },
  { number: 2, title: "Ridiculous Bitch at NUBLU", role: "Director · Editor", date: "February 2025" },
  { number: 3, title: "Haunted City: Morris-Jumel Mansion", role: "Editor", date: "December 2024" },
  { number: 4, title: "Halloween Manor", role: "Director · Editor", date: "October 2024" },
  { number: 5, title: "Ring Me at Seven", role: "Director · Editor", date: "April 2023" },
  { number: 6, title: "The Night of the Reaper", role: "Director · Writer · Editor", date: "October 2022" },
];

export const metadata = {
  title: "Film — Kai McAdams",
  description:
    "Direction and editorial work in narrative, music, and brand. Selected films by Kai McAdams.",
};

export default function FilmPage() {
  return (
    <>
      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pt-44 md:pt-56 pb-20">
        <FadeIn className="max-w-3xl">
          <h1
            className="font-bold tracking-tight leading-[1.0] mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Film
          </h1>
          <p className="text-xl md:text-2xl text-[var(--bone-dim)] leading-snug max-w-2xl">
            Direction and editorial work in narrative, music, and brand.
            Selected projects below.
          </p>
        </FadeIn>
      </section>

      <section className="relative px-6 md:px-20 max-w-[1280px] mx-auto pb-32">
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
