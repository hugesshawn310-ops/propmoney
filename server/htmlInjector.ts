import { RouteSeoData, escapeHtml, SITE_URL } from './seoRenderer';

export function injectSeoIntoHtml(templateHtml: string, seo: RouteSeoData): string {
  let html = templateHtml;

  // 1. Replace or Inject <title>
  if (html.includes('<title>')) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  } else {
    html = html.replace('</head>', `  <title>${escapeHtml(seo.title)}</title>\n</head>`);
  }

  // 2. Replace or Inject <meta name="description">
  const metaDescTag = `<meta name="description" content="${escapeHtml(seo.description)}" />`;
  if (/<meta\s+name=["']description["'][\s\S]*?>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][\s\S]*?>/i, metaDescTag);
  } else {
    html = html.replace('</head>', `  ${metaDescTag}\n</head>`);
  }

  // 3. Replace or Inject <link rel="canonical">
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`;
  if (/<link\s+rel=["']canonical["'][\s\S]*?>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/i, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // 4. Replace Open Graph tags
  const ogTags = `
    <!-- Open Graph & Twitter Social Metadata -->
    <meta property="og:type" content="${escapeHtml(seo.ogType)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(seo.ogImage.startsWith('http') ? seo.ogImage : `${SITE_URL}${seo.ogImage}`)}" />
    <meta property="og:site_name" content="AUS PROP CASH" />
    <meta property="og:locale" content="en_AU" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.ogImage.startsWith('http') ? seo.ogImage : `${SITE_URL}${seo.ogImage}`)}" />
  `.trim();

  // Remove existing OG and Twitter tags to avoid duplicates
  html = html.replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '');

  // 5. Replace existing JSON-LD script tag with route-specific structured data
  const jsonLdTag = `\n    <script type="application/ld+json">\n    ${JSON.stringify(seo.schemaJsonLd, null, 2)}\n    </script>\n`;
  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');

  // Inject OG, Twitter, and JSON-LD before </head>
  html = html.replace('</head>', `    ${ogTags}\n    ${jsonLdTag}\n  </head>`);

  // 6. Inject Server-Side Pre-Rendered Semantic HTML into #root
  // If #root is empty (<div id="root"></div>), inject the ssrHtml inside it!
  if (html.includes('<div id="root"></div>')) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${seo.ssrHtml}</div>`
    );
  }

  return html;
}
