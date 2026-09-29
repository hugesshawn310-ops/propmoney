import { PRODUCTS } from '../src/data/products';
import { CATEGORIES } from '../src/data/categories';
import { BLOG_POSTS } from '../src/data/blogData';

export const SITE_URL = 'https://www.propmoneyaustralia.com.au';
export const SITE_NAME = 'AUS PROP CASH';

export interface RouteSeoData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
  schemaJsonLd: object;
  ssrHtml: string;
  statusCode: number;
}

// Escape HTML utility for safe injection
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function resolveRouteSeo(pathname: string): RouteSeoData {
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '/';

  // Site-wide Organization & WebSite Schemas
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'AUS PROP CASH Pty Ltd',
    alternateName: 'AUS Prop Cash Motion Picture Money',
    url: SITE_URL,
    logo: `${SITE_URL}/hero-fullscreen.jpg`,
    email: 'sales@propmoneyaustralia.com.au',
    telephone: '+61 480 812 592',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alexandria Logistics Hub',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2015',
      addressCountry: 'AU'
    },
    sameAs: []
  };

  const webSiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'AUS PROP CASH',
    description: 'Realistic Australian AUD Prop Banknotes for Film, TV, and Stage',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // 1. Product Detail Page: /product/:slug
  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '').trim();
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (product) {
      const canonicalUrl = `${SITE_URL}/product/${product.slug}`;
      const title = `${product.name} | RBA Compliant Prop Money | AUS PROP CASH`;
      const description = `${product.shortDesc} 100% Reserve Bank of Australia compliant for 4K film and TV. Same-day express dispatch.`;

      // Category matching
      let categorySlug = 'australian-dollar';
      if (product.currency === 'USD') categorySlug = 'us-dollar';
      else if (product.currency === 'GBP') categorySlug = 'british-pound';
      else if (product.currency === 'EUR') categorySlug = 'euro';
      else if (product.currency === 'CAD') categorySlug = 'canadian-dollar';

      const relatedProducts = PRODUCTS
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

      const productSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          webSiteSchema,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: product.category,
                item: `${SITE_URL}/shop/${categorySlug}`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
                item: canonicalUrl
              }
            ]
          },
          {
            '@type': 'Product',
            '@id': `${canonicalUrl}#product`,
            name: product.name,
            description: product.fullDesc,
            image: product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`,
            sku: product.sku,
            mpn: product.sku,
            brand: {
              '@type': 'Brand',
              name: 'AUS PROP CASH'
            },
            offers: {
              '@type': 'Offer',
              url: canonicalUrl,
              priceCurrency: product.currency,
              price: product.basePrice.toFixed(2),
              priceValidUntil: '2027-12-31',
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#organization` }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating.toString(),
              reviewCount: product.reviewsCount.toString(),
              bestRating: '5',
              worstRating: '1'
            }
          }
        ]
      };

      const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8">
  <nav aria-label="Breadcrumb" class="mb-6 text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <a href="/shop/${categorySlug}" class="hover:text-amber-400">${escapeHtml(product.category)}</a> &gt;
    <span class="text-amber-400">${escapeHtml(product.name)}</span>
  </nav>

  <article class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    <div class="product-gallery">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} - 4K Film Prop Banknotes" class="w-full rounded-2xl border border-neutral-800 shadow-2xl object-cover" loading="eager" width="600" height="400" />
      <div class="mt-3 text-xs text-neutral-400 text-center font-mono">
        ${escapeHtml(product.specifications.finish)}
      </div>
    </div>

    <div class="product-details space-y-5">
      <div class="inline-block text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        RBA Section 22 Compliant Prop Specimen
      </div>
      <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">${escapeHtml(product.name)}</h1>
      <div class="text-2xl font-bold font-mono text-amber-400">
        ${escapeHtml(product.currency)} $${product.basePrice.toFixed(2)} AUD
      </div>
      <p class="text-sm text-neutral-300 leading-relaxed">${escapeHtml(product.fullDesc)}</p>

      <section class="specifications bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-2">
        <h2 class="text-sm font-bold text-white font-mono uppercase tracking-wider">Cinematic Specifications</h2>
        <ul class="text-xs text-neutral-300 space-y-1">
          <li><strong>Paper Stock:</strong> ${escapeHtml(product.specifications.paperWeight)}</li>
          <li><strong>Dimensions:</strong> ${escapeHtml(product.specifications.dimensions)}</li>
          <li><strong>Finish:</strong> ${escapeHtml(product.specifications.finish)}</li>
          <li><strong>Print:</strong> ${escapeHtml(product.specifications.printSides)}</li>
          <li><strong>Safety Disclaimer:</strong> ${escapeHtml(product.specifications.safetyMarkings)}</li>
        </ul>
      </section>

      <section class="rba-compliance bg-amber-950/20 p-5 rounded-xl border border-amber-500/30 space-y-2">
        <h2 class="text-sm font-bold text-amber-400 font-mono">RBA Legal Compliance Details</h2>
        <p class="text-xs text-neutral-300 leading-relaxed">${escapeHtml(product.rbaComplianceDetails)}</p>
      </section>

      <div class="pt-4 flex gap-4">
        <a href="/shop" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs uppercase tracking-wider">
          View All Currency Stacks
        </a>
        <a href="/contact" class="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs">
          Production Urgent Inquiry
        </a>
      </div>
    </div>
  </article>

  ${relatedProducts.length > 0 ? `
  <section class="related-products mt-16 pt-8 border-t border-neutral-800">
    <h2 class="text-xl font-bold text-white font-mono mb-6">Related Production Props in ${escapeHtml(product.category)}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      ${relatedProducts.map((rp) => `
      <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
        <a href="/product/${rp.slug}">
          <img src="${escapeHtml(rp.image)}" alt="${escapeHtml(rp.name)}" class="w-full h-44 object-cover rounded-lg mb-3" loading="lazy" width="300" height="200" />
          <h3 class="text-sm font-bold text-white hover:text-amber-400 font-mono">${escapeHtml(rp.name)}</h3>
        </a>
        <div class="text-amber-400 font-bold font-mono text-xs mt-1">$${rp.basePrice.toFixed(2)} AUD</div>
      </div>
      `).join('')}
    </div>
  </section>
  ` : ''}
</main>
      `.trim();

      return {
        title,
        description,
        canonicalUrl,
        ogType: 'product',
        ogImage: product.image,
        schemaJsonLd: productSchema,
        ssrHtml,
        statusCode: 200
      };
    }
  }

  // 2. Category Page: /shop/:categorySlug
  if (cleanPath.startsWith('/shop/')) {
    const categorySlug = cleanPath.replace('/shop/', '').trim();
    const cat = CATEGORIES[categorySlug];

    if (cat) {
      const canonicalUrl = `${SITE_URL}/shop/${cat.slug}`;
      const filtered = PRODUCTS.filter((p) => p.category === cat.name || p.currency === cat.currencyCode);

      const categorySchema = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          webSiteSchema,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Shop All', item: `${SITE_URL}/shop` },
              { '@type': 'ListItem', position: 3, name: cat.name, item: canonicalUrl }
            ]
          },
          {
            '@type': 'ItemList',
            name: cat.h1Title,
            numberOfItems: filtered.length,
            itemListElement: filtered.map((p, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/product/${p.slug}`,
              name: p.name
            }))
          }
        ]
      };

      const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8">
  <nav aria-label="Breadcrumb" class="mb-6 text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <a href="/shop" class="hover:text-amber-400">Shop</a> &gt;
    <span class="text-amber-400">${escapeHtml(cat.name)}</span>
  </nav>

  <header class="mb-8 space-y-3">
    <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">${escapeHtml(cat.h1Title)}</h1>
    <p class="text-sm text-neutral-300 max-w-3xl leading-relaxed">${escapeHtml(cat.description)}</p>
  </header>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    ${filtered.map((p) => `
    <article class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700">
      <div>
        <a href="/product/${p.slug}">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="w-full h-48 object-cover rounded-xl mb-3" loading="lazy" width="300" height="200" />
          <h2 class="text-base font-bold text-white hover:text-amber-400 transition-colors font-mono">${escapeHtml(p.name)}</h2>
        </a>
        <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${escapeHtml(p.shortDesc)}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span class="text-amber-400 font-mono font-bold">$${p.basePrice.toFixed(2)} AUD</span>
        <a href="/product/${p.slug}" class="text-xs font-mono font-bold text-amber-400 hover:underline">View Stack &rarr;</a>
      </div>
    </article>
    `).join('')}
  </section>
</main>
      `.trim();

      return {
        title: cat.metaTitle,
        description: cat.metaDescription,
        canonicalUrl,
        ogType: 'website',
        ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
        schemaJsonLd: categorySchema,
        ssrHtml,
        statusCode: 200
      };
    }
  }

  // 3. Shop All Page: /shop
  if (cleanPath === '/shop') {
    const canonicalUrl = `${SITE_URL}/shop`;
    const title = 'Shop Australian Prop Money & International Replica Banknotes | AUS PROP CASH';
    const description = 'Explore cinema-grade replica Australian Dollars, US Dollars, Euros, British Pounds, and Canadian Dollars. 100% compliant for 4K film and TV.';

    const shopSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Shop All', item: canonicalUrl }
          ]
        },
        {
          '@type': 'ItemList',
          name: 'Theatrical Replica Currency Stacks',
          numberOfItems: PRODUCTS.length,
          itemListElement: PRODUCTS.slice(0, 12).map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/product/${p.slug}`,
            name: p.name
          }))
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8">
  <nav aria-label="Breadcrumb" class="mb-6 text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Shop All Banknotes</span>
  </nav>

  <header class="mb-8 space-y-3">
    <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Australian & International Prop Money Catalog</h1>
    <p class="text-sm text-neutral-300 max-w-3xl leading-relaxed">
      Browse our complete collection of cinema-ready prop currency stacks. All notes feature dual-sided "FOR MOTION PICTURE USE ONLY" markings and anti-reflective 110gsm paper stock for high-definition cinematography.
    </p>

    <!-- Category Filter Links for Crawlers -->
    <div class="flex flex-wrap gap-2 pt-2">
      <a href="/shop/australian-dollar" class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-amber-400">Australian Dollars (AUD)</a>
      <a href="/shop/us-dollar" class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-amber-400">US Dollars (USD)</a>
      <a href="/shop/british-pound" class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-amber-400">British Pounds (GBP)</a>
      <a href="/shop/euro" class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-amber-400">Euros (EUR)</a>
      <a href="/shop/canadian-dollar" class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-amber-400">Canadian Dollars (CAD)</a>
    </div>
  </header>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    ${PRODUCTS.map((p) => `
    <article class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700">
      <div>
        <a href="/product/${p.slug}">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="w-full h-48 object-cover rounded-xl mb-3" loading="lazy" width="300" height="200" />
          <h2 class="text-base font-bold text-white hover:text-amber-400 transition-colors font-mono">${escapeHtml(p.name)}</h2>
        </a>
        <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${escapeHtml(p.shortDesc)}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span class="text-amber-400 font-mono font-bold">$${p.basePrice.toFixed(2)} AUD</span>
        <a href="/product/${p.slug}" class="text-xs font-mono font-bold text-amber-400 hover:underline">Select Stack &rarr;</a>
      </div>
    </article>
    `).join('')}
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: shopSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 4. Blog Listing & Article Pages: /blog and /blog/:slug
  if (cleanPath === '/blog') {
    const canonicalUrl = `${SITE_URL}/blog`;
    const title = 'Cinematography Prop Guides & Legal Filming Articles | AUS PROP CASH';
    const description = 'Read expert articles from Australian prop masters on lighting prop currency on 4K cameras, RBA legal compliance, and art department set protocols.';

    const blogListSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: canonicalUrl }
          ]
        },
        {
          '@type': 'Blog',
          name: 'AUS PROP CASH Production & Prop Journal',
          description,
          blogPost: BLOG_POSTS.map((bp) => ({
            '@type': 'BlogPosting',
            headline: bp.title,
            url: `${SITE_URL}/blog/${bp.slug}`,
            datePublished: bp.publishDate,
            author: { '@type': 'Person', name: bp.author }
          }))
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8">
  <nav aria-label="Breadcrumb" class="mb-6 text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Cinematography & Legal Prop Guides</span>
  </nav>

  <header class="mb-10 space-y-3">
    <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Australian Prop Money & Cinematography Guides</h1>
    <p class="text-sm text-neutral-300 max-w-3xl leading-relaxed">
      Industry guides for Australian filmmakers, music video creators, and theater producers covering Reserve Bank of Australia compliance, lighting techniques, and on-set prop management.
    </p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    ${BLOG_POSTS.map((post) => `
    <article class="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-colors flex flex-col justify-between">
      <div>
        <a href="/blog/${post.slug}">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" class="w-full h-56 object-cover" loading="lazy" width="500" height="300" />
        </a>
        <div class="p-6 space-y-3">
          <div class="text-xs font-mono text-amber-400">${escapeHtml(post.category)} • ${escapeHtml(post.readTime)}</div>
          <h2 class="text-xl font-bold text-white font-mono hover:text-amber-300">
            <a href="/blog/${post.slug}">${escapeHtml(post.title)}</a>
          </h2>
          <p class="text-xs text-neutral-300 leading-relaxed">${escapeHtml(post.excerpt)}</p>
        </div>
      </div>
      <div class="p-6 pt-0">
        <a href="/blog/${post.slug}" class="text-xs font-mono font-bold text-amber-400 hover:underline">Read Full Guide &rarr;</a>
      </div>
    </article>
    `).join('')}
  </div>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: blogListSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').trim();
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (post) {
      const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
      const title = `${post.title} | AUS PROP CASH`;
      const description = post.excerpt;

      const relatedProducts = PRODUCTS.filter((p) => post.relatedProductSlugs.includes(p.slug));

      const articleSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          webSiteSchema,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl }
            ]
          },
          {
            '@type': 'BlogPosting',
            '@id': `${canonicalUrl}#article`,
            headline: post.title,
            description: post.excerpt,
            image: `${SITE_URL}${post.image}`,
            datePublished: post.publishDate,
            dateModified: post.publishDate,
            author: {
              '@type': 'Person',
              name: post.author,
              jobTitle: post.authorRole
            },
            publisher: { '@id': `${SITE_URL}/#organization` },
            mainEntityOfPage: canonicalUrl
          }
        ]
      };

      const ssrHtml = `
<main class="ssr-page max-w-4xl mx-auto px-4 py-8 space-y-8">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <a href="/blog" class="hover:text-amber-400">Blog</a> &gt;
    <span class="text-amber-400">${escapeHtml(post.title)}</span>
  </nav>

  <article class="space-y-6">
    <header class="space-y-3">
      <div class="text-xs font-mono text-amber-400">${escapeHtml(post.category)} • Published ${escapeHtml(post.publishDate)} • ${escapeHtml(post.readTime)}</div>
      <h1 class="text-3xl sm:text-4xl font-black text-white font-mono leading-tight">${escapeHtml(post.title)}</h1>
      <p class="text-sm text-neutral-300 font-sans italic">${escapeHtml(post.excerpt)}</p>
      <div class="text-xs text-neutral-400">By <strong>${escapeHtml(post.author)}</strong> (${escapeHtml(post.authorRole)})</div>
    </header>

    <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" class="w-full rounded-2xl border border-neutral-800 object-cover max-h-96" loading="eager" width="800" height="400" />

    <div class="prose prose-invert max-w-none text-neutral-300 text-sm leading-relaxed space-y-4">
      <p>Filming realistic heist sequences, crime dramas, rap music videos, or theater scenes in Australia requires high-visual-fidelity cash that withstands extreme macro camera scrutiny. However, handling reproduction currency carries serious legal responsibilities under Australian federal law.</p>
      <h2 class="text-xl font-bold text-white font-mono mt-6">Camera Glare Suppression and Sensor Testing</h2>
      <p>Genuine Australian polymer banknotes feature high-gloss transparent windows and reflective inks that cause harsh specular highlights under 10,000-watt HMI lights and high-end digital sensors (such as ARRI Alexa 35, RED V-Raptor, and Sony Venice).</p>
      <p>At AUS PROP CASH, our banknotes are produced on non-reflective 110gsm hybrid linen-smooth paper stock. Under harsh set lighting, this absorbs flash glare while preserving vibrant Australian ocean-blue ($10), ruby-red ($20), golden-yellow ($50), and emerald-green ($100) color gamuts.</p>
      <h2 class="text-xl font-bold text-white font-mono mt-6">Legal Compliance Under the Crimes (Currency) Act 1981</h2>
      <p>Section 22 of the Commonwealth Crimes (Currency) Act 1981 regulates reproduction of Australian banknotes. To remain 100% compliant with the Reserve Bank of Australia (RBA):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Every prop banknote displays prominent, permanent "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN - NOT LEGAL TENDER" notices.</li>
        <li>Architectural and portrait artwork incorporates deliberate dimensional alterations.</li>
        <li>Security threads, metallic foil patches, and UV fluorescent security features are deliberately omitted.</li>
        <li>The notes will not pass automated banking machines, banknote acceptors, or cash registers.</li>
      </ul>
    </div>
  </article>

  ${relatedProducts.length > 0 ? `
  <section class="mt-12 pt-8 border-t border-neutral-800">
    <h2 class="text-lg font-bold text-white font-mono mb-4">Featured Prop Banknotes Mentioned in this Article</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      ${relatedProducts.map((p) => `
      <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
        <a href="/product/${p.slug}">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="w-full h-36 object-cover rounded-lg mb-2" loading="lazy" width="250" height="150" />
          <h3 class="text-xs font-bold text-white hover:text-amber-400 font-mono">${escapeHtml(p.name)}</h3>
        </a>
        <div class="text-amber-400 font-bold text-xs mt-1">$${p.basePrice.toFixed(2)} AUD</div>
      </div>
      `).join('')}
    </div>
  </section>
  ` : ''}
</main>
      `.trim();

      return {
        title,
        description,
        canonicalUrl,
        ogType: 'article',
        ogImage: `${SITE_URL}${post.image}`,
        schemaJsonLd: articleSchema,
        ssrHtml,
        statusCode: 200
      };
    }
  }

  // 5. FAQ Page: /faq
  if (cleanPath === '/faq') {
    const canonicalUrl = `${SITE_URL}/faq`;
    const title = 'Frequently Asked Questions & RBA Legal Rules | AUS PROP CASH';
    const description = 'Common questions on Australian prop money legality, Reserve Bank reproduction guidelines, same-day Sydney dispatch, and camera lighting tests.';

    const faqSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'FAQ', item: canonicalUrl }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is prop money legal to buy and use in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. AUS PROP CASH strictly complies with the Reserve Bank of Australia (RBA) guidelines and the Crimes (Currency) Act 1981 Section 22. All bills feature distinct "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" indicators, altered architectural features, and modified dimensions.'
              }
            },
            {
              '@type': 'Question',
              name: 'How fast is shipping across Australia (Sydney, Melbourne, Brisbane, Perth)?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'All studio orders placed before 2:00 PM AEST dispatch same day from our Sydney fulfillment warehouse via StarTrack Express or Australia Post Express.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I travel on domestic flights with prop money?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. When flying interstate (e.g. Qantas or Virgin between Sydney, Melbourne, and Brisbane), carry your prop cash accompanied by our signed Theatrical Compliance Certificate and your call sheet.'
              }
            },
            {
              '@type': 'Question',
              name: 'Do these notes pass through automated banking or vending machines?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. They are engineered strictly as theatrical props without magnetic or infrared security inks, and will be immediately rejected by automated cash terminals.'
              }
            }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-4xl mx-auto px-4 py-8 space-y-8">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Frequently Asked Questions</span>
  </nav>

  <header class="space-y-3">
    <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Frequently Asked Questions (FAQ)</h1>
    <p class="text-sm text-neutral-300">
      Key information regarding legal compliance, dispatch timeframes, and production prop handling in Australia.
    </p>
  </header>

  <section class="space-y-4">
    <article class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">Is prop money legal to buy and use in Australia?</h2>
      <p class="text-xs text-neutral-300 leading-relaxed">
        Yes. AUS PROP CASH strictly complies with the Reserve Bank of Australia (RBA) guidelines and the Crimes (Currency) Act 1981 Section 22. All bills feature distinct "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" indicators, altered architectural features, and modified dimensions.
      </p>
    </article>

    <article class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">How fast is shipping across Australia?</h2>
      <p class="text-xs text-neutral-300 leading-relaxed">
        All studio orders placed before 2:00 PM AEST dispatch same day from our Sydney fulfillment warehouse via StarTrack Express or Australia Post Express with trackable consignments.
      </p>
    </article>

    <article class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">Can I travel on domestic flights with prop money?</h2>
      <p class="text-xs text-neutral-300 leading-relaxed">
        Yes. Pack your theatrical currency with a copy of our included RBA Clearance Certificate and production call sheet for airport security.
      </p>
    </article>

    <article class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">Do these notes pass through automated banking or vending machines?</h2>
      <p class="text-xs text-neutral-300 leading-relaxed">
        No. They are non-negotiable artistic reproductions without magnetic or infrared security features. Attempting to use them as genuine legal tender is a federal criminal offence.
      </p>
    </article>
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: faqSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 6. About Page: /about
  if (cleanPath === '/about') {
    const canonicalUrl = `${SITE_URL}/about`;
    const title = 'About Us | Australian Cinema Prop Currency Specialists | AUS PROP CASH';
    const description = 'Founded by Australian film art department technicians, AUS PROP CASH provides camera-tested, Reserve Bank compliant prop banknotes across Australia.';

    const aboutSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: canonicalUrl }
          ]
        },
        {
          '@type': 'AboutPage',
          name: 'About AUS PROP CASH',
          description,
          mainEntity: { '@id': `${SITE_URL}/#organization` }
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-8">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">About Us</span>
  </nav>

  <header class="space-y-4">
    <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Crafting Australia’s Most Realistic & Compliant Prop Currency</h1>
    <p class="text-sm text-neutral-300 leading-relaxed">
      Founded by veteran Australian film and television art department technicians, <strong>AUS PROP CASH</strong> is the nation’s leading creator and distributor of cinema-grade replica Australian Dollar banknotes. From major streaming series and feature films to music videos, stage theater, and commercial shoots, we provide the authentic visual impact directors demand while guaranteeing strict compliance with Australian law.
    </p>
  </header>

  <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">Camera Tested</h2>
      <p class="text-xs text-neutral-400">Calibrated for 4K/8K sensors to prevent glare under HMI and high-intensity set lighting.</p>
    </div>
    <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">RBA Section 22 Compliant</h2>
      <p class="text-xs text-neutral-400">Every bill contains permanent legal indicators and modified architectural dimensions.</p>
    </div>
    <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2">
      <h2 class="text-base font-bold text-white font-mono">Sydney Dispatch Hub</h2>
      <p class="text-xs text-neutral-400">Same-day express courier dispatch from Alexandria to Sydney, Melbourne, Brisbane, and Perth.</p>
    </div>
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: aboutSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 7. Terms Page: /terms
  if (cleanPath === '/terms') {
    const canonicalUrl = `${SITE_URL}/terms`;
    const title = 'Terms & Conditions | Legal Notice & Crimes Act Compliance | AUS PROP CASH';
    const description = 'Commercial agreement, terms of sale, and federal Crimes (Currency) Act 1981 Section 22 statutory compliance policies for AUS PROP CASH.';

    const termsSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Terms and Conditions', item: canonicalUrl }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Terms &amp; Conditions</span>
  </nav>

  <h1 class="text-3xl font-black text-white font-mono">Terms &amp; Conditions</h1>
  <p class="text-xs text-neutral-400">AUS PROP CASH Pty Ltd (ABN: 51 824 753 190) • Crimes (Currency) Act 1981 (Cth) Section 22</p>

  <section class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4 text-xs text-neutral-300 leading-relaxed">
    <h2 class="text-sm font-bold text-white font-mono uppercase">1. Legal Prop Money Usage Agreement</h2>
    <p>All items sold by AUS PROP CASH are non-negotiable replica prop banknotes manufactured strictly for motion picture, television, photography, theatre, and artistic entertainment productions. By placing an order, you explicitly warrant that these items will never be used, offered, tendered, or circulated as genuine Australian legal tender.</p>
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: termsSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 8. Privacy Page: /privacy
  if (cleanPath === '/privacy') {
    const canonicalUrl = `${SITE_URL}/privacy`;
    const title = 'Privacy Policy | Australian Privacy Principles Compliant | AUS PROP CASH';
    const description = 'Our commitment to strict client confidentiality, production set NDA discretion, and Australian Privacy Principles (APPs) compliance.';

    const privacySchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonicalUrl }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Privacy Policy</span>
  </nav>

  <h1 class="text-3xl font-black text-white font-mono">Privacy Policy</h1>
  <p class="text-xs text-neutral-400">Compliant with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs).</p>

  <section class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4 text-xs text-neutral-300 leading-relaxed">
    <h2 class="text-sm font-bold text-white font-mono uppercase">Production Discretion &amp; Confidentiality</h2>
    <p>We respect that television and feature film productions operate under strict Non-Disclosure Agreements (NDAs). We never disclose our client lists, project working titles, script details, or delivery locations.</p>
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: privacySchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 9. Contact Page: /contact
  if (cleanPath === '/contact') {
    const canonicalUrl = `${SITE_URL}/contact`;
    const title = 'Contact Us | Sydney Dispatch & Urgent Production Desk | AUS PROP CASH';
    const description = 'Get in touch with the AUS PROP CASH production desk. Alexandria logistics hub, phone +61 480 812 592, email sales@propmoneyaustralia.com.au.';

    const contactSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Contact Us', item: canonicalUrl }
          ]
        },
        {
          '@type': 'ContactPage',
          name: 'Contact AUS PROP CASH',
          description,
          mainEntity: { '@id': `${SITE_URL}/#organization` }
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Contact Us</span>
  </nav>

  <h1 class="text-3xl font-black text-white font-mono">Contact Our Production Desk</h1>
  <p class="text-sm text-neutral-300">Monitored 7 days a week for urgent film set requirements.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
    <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
      <h2 class="text-sm font-bold text-white uppercase tracking-wider">Direct Communications</h2>
      <div><strong>Email:</strong> <a href="mailto:sales@propmoneyaustralia.com.au" class="text-amber-400 hover:underline">sales@propmoneyaustralia.com.au</a></div>
      <div><strong>Emergency Hotline:</strong> <a href="tel:+61480812592" class="text-amber-400 hover:underline">+61 480 812 592</a></div>
      <div><strong>Dispatch Hub:</strong> Alexandria Logistics Hub, Sydney NSW 2015</div>
      <div><strong>Hours:</strong> Mon – Sat: 7:00 AM – 7:00 PM AEST</div>
    </div>
    <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs text-neutral-300">
      <h2 class="text-sm font-bold text-white font-mono uppercase tracking-wider">Courier Dispatch Cutoffs</h2>
      <p>Orders confirmed before 2:00 PM AEST dispatch same day via StarTrack Express or Australia Post Express with tracking.</p>
    </div>
  </div>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: contactSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 10. Full Stacks: /full-stacks
  if (cleanPath === '/full-stacks') {
    const canonicalUrl = `${SITE_URL}/full-stacks`;
    const title = 'Full Prop Money Stacks ($50 & $100 AUD Bricks) | AUS PROP CASH';
    const description = 'Order complete 100-note and 1,000-note AUD replica stacks strapped with authentic bank bands. Ideal for heist scenes and rap music videos.';

    const fullStacksSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Full Stacks', item: canonicalUrl }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Full Stacks</span>
  </nav>

  <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Full Currency Stacks &amp; Production Bricks</h1>
  <p class="text-sm text-neutral-300 max-w-3xl">Full 50-note, 100-note, and 1,000-note prop bundles bound with official-style production straps.</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
    ${PRODUCTS.slice(0, 6).map((p) => `
    <article class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
      <a href="/product/${p.slug}">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="w-full h-44 object-cover rounded-xl mb-3" loading="lazy" width="300" height="200" />
        <h2 class="text-base font-bold text-white hover:text-amber-400 font-mono">${escapeHtml(p.name)}</h2>
      </a>
      <div class="text-amber-400 font-mono font-bold mt-2">$${p.basePrice.toFixed(2)} AUD</div>
    </article>
    `).join('')}
  </div>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: fullStacksSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 11. RBA Guidelines: /rba-guidelines
  if (cleanPath === '/rba-guidelines') {
    const canonicalUrl = `${SITE_URL}/rba-guidelines`;
    const title = 'RBA Legal Guidelines & Prop Money Compliance | AUS PROP CASH';
    const description = 'Reserve Bank of Australia reproduction policy rules, Crimes (Currency) Act 1981 Section 22 clearances, and certificate dossier downloads.';

    const rbaSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'RBA Legal Guidelines', item: canonicalUrl }
          ]
        },
        {
          '@type': 'Article',
          headline: 'Reserve Bank of Australia (RBA) Prop Money Regulations',
          description,
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntityOfPage: canonicalUrl
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">RBA Legal Guidelines</span>
  </nav>

  <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">RBA Legal Guidelines &amp; Prop Money Compliance</h1>
  <p class="text-sm text-neutral-300 leading-relaxed">
    Filmmaking in Australia requires strict adherence to federal currency reproduction regulations under the <strong>Crimes (Currency) Act 1981 (Cth) Section 22</strong> and official <strong>Reserve Bank of Australia (RBA)</strong> policy guidelines.
  </p>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'article',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: rbaSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 12. Bulk Studio Orders: /bulk-studio
  if (cleanPath === '/bulk-studio') {
    const canonicalUrl = `${SITE_URL}/bulk-studio`;
    const title = 'Bulk Studio Orders & Production Quotes | AUS PROP CASH';
    const description = 'Tiered wholesale discounts for feature film productions, television studios, and props houses. Instant ABN quotes and fast dispatch.';

    const bulkSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Bulk Studio Orders', item: canonicalUrl }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Bulk Studio Orders</span>
  </nav>

  <h1 class="text-3xl sm:text-4xl font-black text-white font-mono">Bulk Studio Orders &amp; B2B Production Tier Calculator</h1>
  <p class="text-sm text-neutral-300">Volume pricing for Australian film and television productions requiring large cash volumes.</p>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: bulkSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 13. Studio Portal: /studio-portal
  if (cleanPath === '/studio-portal') {
    const canonicalUrl = `${SITE_URL}/studio-portal`;
    const title = 'Studio Portal & Tax Invoicing | AUS PROP CASH';
    const description = 'Track production shipments via StarTrack Express, download official RBA clearance dossiers, and request rush concierge service.';

    const portalSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Studio Portal', item: canonicalUrl }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-5xl mx-auto px-4 py-8 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-neutral-400 flex items-center gap-2">
    <a href="/" class="hover:text-amber-400">Home</a> &gt;
    <span class="text-amber-400">Studio Portal</span>
  </nav>

  <h1 class="text-3xl font-black text-white font-mono">Studio Client Support &amp; Tracking Portal</h1>
  <p class="text-sm text-neutral-300">Logistics tracking, tax invoices, and legal compliance documentation.</p>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: portalSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 14. Homepage: /
  if (cleanPath === '/') {
    const canonicalUrl = `${SITE_URL}/`;
    const title = 'AUS PROP CASH | Ultra-Realistic Australian Prop Money | RBA Compliant';
    const description = 'Buy ultra-realistic Australian prop money ($5, $10, $20, $50, $100 AUD stacks) engineered for 4K film, TV, photography, and music videos. 100% Reserve Bank of Australia (RBA) legal compliant. Fast express dispatch to Sydney, Melbourne, Brisbane, and Perth.';

    const homeSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        webSiteSchema,
        {
          '@type': 'OnlineStore',
          '@id': `${SITE_URL}/#store`,
          name: 'AUS PROP CASH',
          url: SITE_URL,
          telephone: '+61 480 812 592',
          currenciesAccepted: 'AUD',
          paymentAccepted: 'Credit Card, Visa, Mastercard, Apple Pay, Google Pay, Afterpay, Zip',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Alexandria Logistics Hub',
            addressLocality: 'Sydney',
            addressRegion: 'NSW',
            postalCode: '2015',
            addressCountry: 'AU'
          }
        },
        {
          '@type': 'ItemList',
          name: 'Featured AUD Prop Currency Stacks',
          itemListElement: PRODUCTS.slice(0, 4).map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${SITE_URL}/product/${p.slug}`,
            name: p.name
          }))
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is prop money legal to buy and use in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. AUS PROP CASH strictly complies with the Reserve Bank of Australia (RBA) guidelines and the Crimes (Currency) Act 1981 Section 22. All bills feature distinct "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" indicators, altered architectural features, and modified dimensions.'
              }
            },
            {
              '@type': 'Question',
              name: 'How fast is shipping across Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'All studio orders placed before 2:00 PM AEST dispatch same day from our Sydney fulfillment warehouse via StarTrack Express or Australia Post Express.'
              }
            }
          ]
        }
      ]
    };

    const ssrHtml = `
<main class="ssr-page max-w-7xl mx-auto px-4 py-8 space-y-12">
  <section class="hero text-center max-w-4xl mx-auto space-y-4 pt-4">
    <div class="inline-block text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 uppercase tracking-widest">
      Reserve Bank of Australia Compliant
    </div>
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight">
      Ultra-Realistic Australian Prop Money for Film &amp; Television
    </h1>
    <p class="text-base text-neutral-300 leading-relaxed font-sans max-w-2xl mx-auto">
      Camera-tested 4K cinema replica currency stacks. Designed on anti-glare 110gsm linen stock for film, TV, photography, and music videos.
    </p>
    <div class="flex items-center justify-center gap-4 pt-2">
      <a href="/shop" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs uppercase tracking-wider">
        Shop Currency Catalog
      </a>
      <a href="/rba-guidelines" class="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-700">
        RBA Legal Guidelines
      </a>
    </div>
  </section>

  <!-- Featured Products for immediate crawler indexing -->
  <section class="featured-products pt-8 border-t border-neutral-800">
    <h2 class="text-2xl font-black text-white font-mono mb-6 text-center">Featured Australian Dollar Prop Stacks</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${PRODUCTS.slice(0, 4).map((p) => `
      <article class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <a href="/product/${p.slug}">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="w-full h-44 object-cover rounded-xl mb-3" loading="lazy" width="300" height="200" />
            <h3 class="text-sm font-bold text-white hover:text-amber-400 font-mono">${escapeHtml(p.name)}</h3>
          </a>
          <p class="text-xs text-neutral-400 mt-1 line-clamp-2">${escapeHtml(p.shortDesc)}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
          <span class="text-amber-400 font-mono font-bold">$${p.basePrice.toFixed(2)} AUD</span>
          <a href="/product/${p.slug}" class="text-xs font-mono font-bold text-amber-400 hover:underline">View Stack &rarr;</a>
        </div>
      </article>
      `).join('')}
    </div>
  </section>
</main>
    `.trim();

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
      schemaJsonLd: homeSchema,
      ssrHtml,
      statusCode: 200
    };
  }

  // 15. Default 404
  return {
    title: 'Page Not Found (404) | AUS PROP CASH',
    description: 'The requested Australian prop money page could not be located. Explore our shop or contact our Sydney production desk.',
    canonicalUrl: `${SITE_URL}${cleanPath}`,
    ogType: 'website',
    ogImage: `${SITE_URL}/hero-fullscreen.jpg`,
    schemaJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organizationSchema, webSiteSchema]
    },
    ssrHtml: `
<main class="ssr-page max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
  <h1 class="text-4xl font-mono font-black text-amber-400">404 - Page Not Found</h1>
  <p class="text-sm text-neutral-300">The requested page does not exist or has been relocated.</p>
  <div class="pt-4">
    <a href="/" class="px-6 py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold font-mono text-xs uppercase">
      Return to Home
    </a>
  </div>
</main>
    `.trim(),
    statusCode: 404
  };
}
