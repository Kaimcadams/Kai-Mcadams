import data from "./letterboxd-data.json";

export type LbFilm = {
  slug: string;
  title: string;
  year: string | null;
  tmdbId: string | null;
  poster: string | null;
  cert: string | null;
  posterSource: string | null;
};

export type LbList = {
  slug: string;
  title: string;
  description: string | null;
  count: number;
  films: LbFilm[];
};

export type LbData = {
  profileUrl: string;
  favorites: LbFilm[];
  lists: LbList[];
};

const lb = data as LbData;

// Filtered here rather than deleted from letterboxd-data.json so it stays gone
// if that file is ever regenerated from the profile.
const HIDDEN_LISTS = new Set(["pixar-ranked"]);

export const profileUrl = lb.profileUrl;
export const favorites = lb.favorites;
export const lists = lb.lists.filter((l) => !HIDDEN_LISTS.has(l.slug));

export function getList(slug: string): LbList | undefined {
  if (HIDDEN_LISTS.has(slug)) return undefined;
  return lb.lists.find((l) => l.slug === slug);
}

export function filmUrl(slug: string): string {
  return `https://letterboxd.com/film/${slug}/`;
}

/**
 * Live follower count, read off the public profile page — Letterboxd has no
 * public API for this. Callers set `revalidate`, so this refetches on that
 * cadence and the number keeps itself current.
 *
 * This parses HTML, so it will return null if Letterboxd reshuffles their
 * markup. Callers must handle null by hiding the count rather than showing a
 * stale or wrong number.
 */
export async function getFollowerCount(): Promise<number | null> {
  try {
    const res = await fetch(profileUrl, {
      cache: "no-store",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; kai-mcadams-site/1.0; +https://kaimcadams.com)",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /href="\/[^"]*\/followers\/"[^>]*>\s*<span class="value">([\d,]+)<\/span>/,
    );
    if (!match) return null;
    const n = Number.parseInt(match[1].replace(/,/g, ""), 10);
    return Number.isFinite(n) ? n : null;
  } catch (err) {
    console.error("[letterboxd] follower count fetch failed", err);
    return null;
  }
}
