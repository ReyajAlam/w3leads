import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

/** Blog pagination with page number buttons and prev/next navigation */
export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  const getPageUrl = (page: number) => (page === 1 ? '/blog' : `/blog?page=${page}`);

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-ink-muted hover:text-ink hover:bg-surface-tint transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-10 h-10 text-border" aria-hidden="true">
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-ink-muted" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'text-ink-muted hover:text-ink hover:bg-surface-tint'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-ink-muted hover:text-ink hover:bg-surface-tint transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-10 h-10 text-border" aria-hidden="true">
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </nav>
  );
}
