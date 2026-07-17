import { getPosts, getPostBySlug } from '@/lib/substack';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 900;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.title ? `${post.title} · Gorehound Grindhouse` : 'Post',
    description: post?.contentSnippet,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.isoDate
    ? new Date(post.isoDate).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    : '';

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <Link
        href="/cinema-journalism"
        className="inline-block mb-10 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 transition"
      >
        ← Back to Gorehound Grindhouse
      </Link>

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--bone-dim)' }}>
          {date}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          {post.title}
        </h1>
      </header>

      <div
        className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-img:rounded prose-blockquote:not-italic"
        style={{
          ['--tw-prose-links' as string]: 'var(--cinema)',
          ['--tw-prose-quote-borders' as string]: 'var(--cinema)',
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16 pt-10 border-t" style={{ borderColor: 'var(--rule)' }}>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs uppercase tracking-[0.2em] hover:opacity-80 transition"
          style={{ color: 'var(--cinema)' }}
        >
          View on Substack →
        </a>
      </div>
    </article>
  );
}
