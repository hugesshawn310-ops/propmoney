import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

export const PAGE_ROUTES: Record<PageId, string> = {
  home: '/',
  shop: '/shop',
  about: '/about',
  terms: '/terms',
  privacy: '/privacy',
  contact: '/contact',
  'full-stacks': '/full-stacks',
  'rba-guidelines': '/rba-guidelines',
  'bulk-studio': '/bulk-studio',
  'studio-portal': '/studio-portal',
  blog: '/blog',
  product: '/shop',
};

interface BreadcrumbsProps {
  items: { label: string; page?: PageId; href?: string }[];
  onNavigate: (page: PageId, slug?: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 py-3 border-b border-neutral-800/80 mb-8 overflow-x-auto">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home');
        }}
        className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const targetHref = item.href || (item.page ? PAGE_ROUTES[item.page] : undefined);

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            {isLast || !targetHref ? (
              <span className="text-amber-400 font-semibold truncate shrink-0">
                {item.label}
              </span>
            ) : (
              <a
                href={targetHref}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.page) onNavigate(item.page);
                }}
                className="text-neutral-400 hover:text-amber-400 transition-colors truncate shrink-0"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
