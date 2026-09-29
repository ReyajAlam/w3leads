import { type ReactNode } from 'react';

type BadgeVariant = 'primary' | 'accent' | 'muted';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-primary-light text-primary',
  accent: 'bg-accent-light text-ink',
  muted: 'bg-surface-tint text-ink-muted',
};

/** Small label badge for inline highlights, status, and categories */
export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-[var(--radius-full)] ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
