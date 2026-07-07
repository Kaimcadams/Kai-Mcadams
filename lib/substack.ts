import Parser from "rss-parser";
import { unstable_cache } from "next/cache";

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

export const getPosts = unstable_cache(fetchAndParse, ["substack-feed"], {
  revalidate: 900,
  tags: ["substack-feed"],
});

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}
