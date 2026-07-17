import Link from "next/link";
import Image from "next/image";
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
  variant?: "default" | "featured" | "compact";
};

export default function PostCard({ post, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  return (
    <Link
      href={`/cinema-journalism/${post.slug}`}
      className={`group block border-t border-[var(--rule)] transition-opacity hover:opacity-95 ${
        isCompact ? "pt-4 pb-4" : "pt-8 pb-8"
      }`}
    >
      {post.thumbnail && (
        <div
          className={`relative w-full overflow-hidden border border-[var(--rule)] ${
            isCompact ? "mb-3" : "mb-6"
          } ${isFeatured ? "aspect-[16/9]" : "aspect-[3/2]"}`}
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes={
              isFeatured
                ? "(min-width: 768px) 1200px, 100vw"
                : "(min-width: 768px) 600px, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className={`label ${isCompact ? "mb-2" : "mb-5"}`}>
        {formatDate(post.isoDate, post.pubDate)}
      </div>
      <h3
        className={`font-bold tracking-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors leading-[1.05] ${
          isFeatured
            ? "text-4xl md:text-6xl"
            : isCompact
              ? "text-base md:text-lg"
              : "text-2xl md:text-3xl"
        }`}
      >
        {post.title}
      </h3>
      {post.contentSnippet && (
        <p
          className={`text-[var(--bone-dim)] leading-relaxed max-w-2xl ${
            isFeatured
              ? "mt-5 text-lg md:text-xl"
              : isCompact
                ? "mt-2 text-sm line-clamp-3"
                : "mt-5 text-base"
          }`}
        >
          {post.contentSnippet}
        </p>
      )}
      <span
        className={`inline-block label ${isCompact ? "mt-3" : "mt-6"}`}
        style={{ color: "var(--cinema)" }}
      >
        Read →
      </span>
    </Link>
  );
}
