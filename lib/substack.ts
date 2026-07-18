import Parser from "rss-parser";

const FEED_URL = "https://kaimcadams.substack.com/feed";

export type Post = {
  title: string;
  link: string;
  slug: string;
  content: string;
  isoDate: string | null;
  pubDate: string | null;
  contentSnippet: string;
  thumbnail: string | null;
  creator: string | null;
};

type Item = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  ["content:encoded"]?: string;
  ["dc:creator"]?: string;
  enclosure?: { url?: string };
};

const parser: Parser<unknown, Item> = new Parser({
  customFields: {
    item: ["content:encoded", "dc:creator", "enclosure"],
  },
});

function extractThumbnail(item: Item): string | null {
  if (item.enclosure?.url) return item.enclosure.url;
  const html = item["content:encoded"] ?? item.content ?? "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function makeSnippet(item: Item, max = 220): string {
  const raw =
    item.contentSnippet ||
    (item["content:encoded"] || item.content || "").replace(/<[^>]+>/g, " ");
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function makeSlug(item: Item): string {
  const slugMatch = (item.link || "").match(/\/p\/([^/?]+)/);
  if (slugMatch) return slugMatch[1];
  return (item.title || "post")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchAndParse(): Promise<Post[]> {
  try {
    const res = await fetch(FEED_URL, {
      cache: "no-store",
      headers: { "user-agent": "kai-mcadams-site/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    const items = (feed.items ?? []) as Item[];
    return items.map((item) => ({
      title: item.title ?? "Untitled",
      link: item.link ?? "#",
      slug: makeSlug(item),
      content: item["content:encoded"] || item.content || "",
      isoDate: item.isoDate ?? null,
      pubDate: item.pubDate ?? null,
      contentSnippet: makeSnippet(item),
      thumbnail: extractThumbnail(item),
      creator: item["dc:creator"] ?? null,
    }));
  } catch (err) {
    console.error("[substack] feed fetch failed", err);
    return [];
  }
}

// limit is capped — 100 gets a 400 back, 50 is accepted.
const ARCHIVE_URL =
  "https://kaimcadams.substack.com/api/v1/archive?sort=new&offset=0&limit=50";

type ArchiveItem = {
  title?: string;
  slug?: string;
  post_date?: string;
  canonical_url?: string;
  cover_image?: string | null;
  description?: string | null;
  subtitle?: string | null;
  truncated_body_text?: string | null;
};

// The RSS feed is capped at the 20 most recent posts, so the back catalogue is
// invisible to it. The archive endpoint lists everything — but its body_html is
// always null, so it can only supply metadata.
async function fetchArchive(): Promise<Post[]> {
  try {
    const res = await fetch(ARCHIVE_URL, {
      cache: "no-store",
      headers: { "user-agent": "kai-mcadams-site/1.0" },
    });
    if (!res.ok) {
      console.error("[substack] archive fetch failed", res.status, ARCHIVE_URL);
      return [];
    }
    const items = (await res.json()) as ArchiveItem[];
    if (!Array.isArray(items)) return [];
    return items
      .filter((i) => i.slug && i.title)
      .map((i) => ({
        title: i.title ?? "Untitled",
        link: i.canonical_url ?? "#",
        slug: i.slug as string,
        content: "",
        isoDate: i.post_date ?? null,
        pubDate: i.post_date ?? null,
        contentSnippet: (
          i.description ||
          i.subtitle ||
          i.truncated_body_text ||
          ""
        ).trim(),
        thumbnail: i.cover_image ?? null,
        creator: null,
      }));
  } catch (err) {
    console.error("[substack] archive fetch failed", err);
    return [];
  }
}

// Fetch fresh on each render; the pages that use this set `revalidate = 900`,
// so Next caches the rendered page (not the oversized feed payload) for 15 min.
//
// RSS wins on overlap because it carries full post bodies; the archive fills in
// the older posts RSS drops. The archive gives no body, but getPostBySlug fetches
// it per-post so every detail page still renders full text.
export async function getPosts(): Promise<Post[]> {
  const [rss, archive] = await Promise.all([fetchAndParse(), fetchArchive()]);
  const bySlug = new Map<string, Post>();
  for (const p of archive) bySlug.set(p.slug, p);
  for (const p of rss) bySlug.set(p.slug, p);
  return [...bySlug.values()].sort((a, b) => {
    const ta = a.isoDate ? Date.parse(a.isoDate) : 0;
    const tb = b.isoDate ? Date.parse(b.isoDate) : 0;
    return tb - ta;
  });
}

// Full post body by slug. RSS only carries the newest 20, so anything older
// has empty content until this pulls it from the per-post endpoint, which
// returns body_html for every published post.
async function fetchPostContent(slug: string): Promise<string> {
  try {
    const res = await fetch(
      `https://kaimcadams.substack.com/api/v1/posts/${slug}`,
      {
        cache: "no-store",
        headers: { "user-agent": "kai-mcadams-site/1.0" },
      },
    );
    if (!res.ok) {
      console.error("[substack] post fetch failed", res.status, slug);
      return "";
    }
    const post = (await res.json()) as { body_html?: string | null };
    return post.body_html ?? "";
  } catch (err) {
    console.error("[substack] post fetch failed", slug, err);
    return "";
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  // Backfill the body for archive-only posts RSS never carried.
  if (!post.content) {
    return { ...post, content: await fetchPostContent(slug) };
  }
  return post;
}
