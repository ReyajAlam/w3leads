import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { fetchBlogPosts } from '@/lib/wordpress/client';
import { createPageMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = createPageMetadata({
  title: 'Blog — Insights on B2B Lead Generation',
  description:
    'Expert articles on B2B prospecting, lead generation, email outreach, and sales data strategies from the W3Leads team.',
  path: '/blog',
});

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const { posts, totalPages } = await fetchBlogPosts(currentPage);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <Container>
          {/* Page Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="font-heading text-ink mb-4">Blog</h1>
            <p className="text-lg text-ink-muted">
              Insights, strategies, and best practices for B2B lead generation and sales outreach.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-ink-muted text-lg">
                No posts found. Check back soon for new content.
              </p>
            </div>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
