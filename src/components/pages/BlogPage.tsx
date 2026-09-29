import React from 'react';
import { PageId } from '../../types';
import { Breadcrumbs } from '../Breadcrumbs';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { PRODUCTS } from '../../data/products';
import { Clapperboard, Calendar, Clock, User, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface BlogPageProps {
  currentSlug?: string;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ currentSlug, onNavigate }) => {
  const activePost = currentSlug ? BLOG_POSTS.find((p) => p.slug === currentSlug) : null;

  if (activePost) {
    const relatedProducts = PRODUCTS.filter((p) =>
      activePost.relatedProductSlugs.includes(p.slug)
    );

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Cinematography Guides', page: 'blog' },
            { label: activePost.title },
          ]}
          onNavigate={onNavigate}
        />

        <article className="space-y-6">
          <header className="space-y-4 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 font-bold">
                {activePost.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono leading-tight">
              {activePost.title}
            </h1>

            <p className="text-base text-neutral-300 font-sans italic leading-relaxed">
              {activePost.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-400 font-mono">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400 font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-bold">{activePost.author}</div>
                <div className="text-[11px] text-neutral-500">{activePost.authorRole}</div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full h-80 sm:h-96 object-cover"
              loading="eager"
              width="800"
              height="400"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-neutral-300 text-sm leading-relaxed space-y-5">
            <p>
              Filming realistic heist sequences, crime dramas, rap music videos, or theater scenes in Australia requires high-visual-fidelity cash that withstands extreme macro camera scrutiny. However, handling reproduction currency carries serious legal responsibilities under Australian federal law.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono pt-4">
              1. Camera Glare Suppression and Sensor Testing
            </h2>
            <p>
              Genuine Australian polymer banknotes feature high-gloss transparent windows and reflective inks that cause harsh specular highlights under 10,000-watt HMI lights and high-end digital sensors (such as ARRI Alexa 35, RED V-Raptor, and Sony Venice).
            </p>
            <p>
              At AUS PROP CASH, our banknotes are produced on non-reflective 110gsm hybrid linen-smooth paper stock. Under harsh set lighting, this absorbs flash glare while preserving vibrant Australian ocean-blue ($10), ruby-red ($20), golden-yellow ($50), and emerald-green ($100) color gamuts.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono pt-4">
              2. Legal Compliance Under the Crimes (Currency) Act 1981
            </h2>
            <p>
              Section 22 of the Commonwealth Crimes (Currency) Act 1981 regulates reproduction of Australian banknotes. To remain 100% compliant with the Reserve Bank of Australia (RBA):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-300">
              <li>Every prop banknote displays prominent, permanent <strong>"FOR MOTION PICTURE USE ONLY"</strong> and <strong>"PROP SPECIMEN - NOT LEGAL TENDER"</strong> notices.</li>
              <li>Architectural and portrait artwork incorporates deliberate dimensional alterations.</li>
              <li>Security threads, metallic foil patches, and UV fluorescent security features are deliberately omitted.</li>
              <li>The notes will not pass automated banking machines, banknote acceptors, or cash registers.</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono pt-4">
              3. Logistics &amp; On-Set Production Documentation
            </h2>
            <p>
              State film bodies—including Screen Australia, Screen NSW, VicScreen, and Screen Queensland—frequently require an Art Department clearance chain of title. Every AUS PROP CASH order includes an official Theatrical Currency Compliance Certificate and RBA Legal Clearance Dossier for production files.
            </p>
          </div>
        </article>

        {/* Featured Mentioned Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-neutral-800 space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Prop Banknotes Featured in this Guide</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700">
                  <a
                    href={`/product/${p.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product', p.slug);
                    }}
                    className="block group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-36 object-cover rounded-lg mb-2"
                      loading="lazy"
                      width="250"
                      height="150"
                    />
                    <h3 className="text-xs font-bold text-white group-hover:text-amber-300 font-mono">
                      {p.name}
                    </h3>
                  </a>
                  <div className="text-amber-400 font-mono font-bold text-xs mt-1">
                    ${p.basePrice.toFixed(2)} AUD
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Blog Listing Index
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ label: 'Cinematography & Legal Guides' }]}
        onNavigate={onNavigate}
      />

      <header className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Australian Film &amp; Prop Journal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono">
          Prop Money &amp; Cinematography Production Guides
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
          Technical resources for directors, line producers, art departments, and props masters on camera glare testing, legal clearances under the Crimes Act, and handling theatrical replica currency on set.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <a
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blog', post.slug);
                }}
                className="block overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-6 sm:p-8 space-y-3">
                <div className="text-xs font-mono text-amber-400 flex items-center gap-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('blog', post.slug);
                    }}
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <a
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('blog', post.slug);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Read Full Technical Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
