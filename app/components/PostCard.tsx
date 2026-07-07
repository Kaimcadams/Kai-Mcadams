import Link from "next/link";
import type { Post } from "@/lib/substack";

function formatDate(iso: string | null, pub: string | null) {
  const date = iso ? new Date(iso) : pub ? new Date(pub) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

type Props = {
  post: Post;
  variant?: "default" | "featured";
};

export default function PostCard({ post, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  return (
    <Link
      href={`/cinematic-analysis/${post.slug}`}
      className="group block border-t border-[var(--rule)] pt-8 pb-8 transition-opacity hover:opacity-95"
    >
      <div className="mb-5 label">
        {formatDate(post.isoDate, post.pubDate)}
      </div>
      <h3
        className={`font-bold tracking-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors leading-[1.05] ${
          isFeatured
            ? "text-4xl md:text-6xl"
            : "text-2xl md:text-3xl"
        }`}
      >
        {post.title}
      </h3>
      {post.contentSnippet && (
        <p
          className={`mt-5 text-[var(--bone-dim)] leading-relaxed max-w-2xl ${
            isFeatured ? "text-lg md:text-xl" : "text-base"
          }`}
        >
          {post.contentSnippet}
        </p>
      )}
      <span
        className="inline-block mt-6 label"
        style={{ color: "var(--cinema)" }}
      >
        Read →
      </span>
    </Link>
  );
}
