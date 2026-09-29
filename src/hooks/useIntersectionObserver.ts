'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  /** If true, only triggers once */
  triggerOnce?: boolean;
}

/**
 * Observes an element's intersection with the viewport.
 * Returns a ref to attach and a boolean indicating visibility.
 * Automatically treats elements as visible if reduced motion is preferred.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  const isVisible = prefersReducedMotion || isIntersecting;

  return [ref, isVisible];
}
