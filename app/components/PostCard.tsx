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
  index: number;
  variant?: "default" | "featured";
};

export default function PostCard({ post, index, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-t border-[var(--rule)] pt-8 pb-8 transition-opacity hover:opacity-95"
    >
      <div className="flex items-baseline gap-6 mb-5 label">
        <span className="text-[var(--muted)]">
          Nº {String(index + 1).padStart(3, "0")}
        </span>
        <span>{formatDate(post.isoDate, post.pubDate)}</span>
      </div>
      <h3
        className={`font-display tracking-tight text-[var(--bone)] group-hover:text-[var(--cinema)] transition-colors leading-[1.02] ${
          isFeatured
            ? "text-5xl md:text-7xl"
            : "text-3xl md:text-4xl"
        }`}
      >
        {post.title}
      </h3>
      {post.contentSnippet && (
        <p
          className={`mt-6 text-[var(--bone-dim)] italic leading-relaxed max-w-2xl ${
            isFeatured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {post.contentSnippet}
        </p>
      )}
      <span
        className="inline-block mt-7 label"
        style={{ color: "var(--cinema)" }}
      >
        Read on Substack →
      </span>
    </a>
  );
}
