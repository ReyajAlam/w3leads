'use client';

import { useState, type ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

/**
 * Accessible tabs component implementing WAI-ARIA Tabs Pattern.
 * Supports keyboard arrow navigation between tab buttons.
 */
export function Tabs({ items, className = '' }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + items.length) % items.length;
    } else {
      return;
    }
    e.preventDefault();
    setActiveId(items[newIndex].id);
    const nextTab = document.getElementById(`tab-${items[newIndex].id}`);
    nextTab?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Use case categories"
        className="flex flex-wrap gap-2 border-b border-border pb-0"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={activeId === item.id ? 0 : -1}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-5 py-3 text-sm font-medium transition-colors cursor-pointer min-h-[44px] border-b-2 -mb-px ${
              activeId === item.id
                ? 'border-primary text-primary'
                : 'border-transparent text-ink-muted hover:text-ink hover:border-border'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`tabpanel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${item.id}`}
          hidden={activeId !== item.id}
          tabIndex={0}
          className="pt-8"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
