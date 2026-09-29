import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'main';
  id?: string;
}

/**
 * Responsive container with max-width and consistent padding.
 * Used as the primary content wrapper across all sections.
 */
export function Container({
  children,
  className = '',
  as: Component = 'div',
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Component>
  );
}
