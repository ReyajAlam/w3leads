import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/wordpress/types';
import { Badge } from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPost;
}

/** Blog post card for the list page */
export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group bg-surface rounded-[var(--radius-lg)] border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
        {/* Featured Image */}
        {post.featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-tint">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-surface-tint flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
              className="text-border"
            >
              <rect width="48" height="48" rx="12" fill="currentColor" opacity="0.3" />
              <path
                d="M16 32l6-8 4 5 6-8 6 11H16z"
                fill="currentColor"
                opacity="0.5"
              />
              <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        )}

        {/* Content */}
        <div className="p-5 lg:p-6">
          {/* Category Badges */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((cat) => (
                <Badge key={cat.slug} variant="primary">
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          <h2 className="font-heading text-lg text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-ink-muted line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
