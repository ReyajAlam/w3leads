import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { fetchPostBySlug, fetchPostById, fetchAllPostSlugs } from '@/lib/wordpress/client';
import { getArticleJsonLd } from '@/lib/seo/jsonLd';
import { SITE_CONFIG } from '@/config/site';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** Fetches a post by slug, falling back to ID if numeric */
async function getPost(slugOrId: string) {
  let post = await fetchPostBySlug(slugOrId);
  if (!post && /^\d+$/.test(slugOrId)) {
    post = await fetchPostById(parseInt(slugOrId, 10));
  }
  return post;
}

/** Generate static params for all blog posts at build time */
export async function generateStaticParams() {
  const slugs = await fetchAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** Generate dynamic metadata for each blog post */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const ogImage = post.featuredImage?.url ?? `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleJsonLd = getArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    publishedAt: post.publishedAt,
    modifiedAt: post.modifiedAt,
    imageUrl: post.featuredImage?.url,
    authorName: post.author.name,
  });

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <Container>
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>

          <article className="max-w-3xl mx-auto">
            {/* Article Header */}
            <header className="mb-10">
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat) => (
                    <Badge key={cat.slug} variant="primary">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="font-heading text-ink mb-4">{post.title}</h1>

              <div className="flex items-center gap-3 text-sm text-ink-muted">
                {/* Author Avatar */}
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-semibold text-primary">
                  {post.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <span className="font-medium text-ink">{post.author.name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-10 rounded-[var(--radius-lg)] overflow-hidden">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  width={post.featuredImage.width}
                  height={post.featuredImage.height}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Article Body */}
            <ArticleContent htmlContent={post.content} />
          </article>
        </Container>
      </main>
      <SiteFooter />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
