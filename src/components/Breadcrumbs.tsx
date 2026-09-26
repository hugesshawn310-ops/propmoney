import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbsProps {
  items: { label: string; page?: PageId }[];
  onNavigate: (page: PageId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 py-3 border-b border-neutral-800/80 mb-8 overflow-x-auto">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            {isLast || !item.page ? (
              <span className="text-amber-400 font-semibold truncate shrink-0">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => item.page && onNavigate(item.page)}
                className="text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer truncate shrink-0"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
