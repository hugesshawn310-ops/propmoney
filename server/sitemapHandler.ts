import { PRODUCTS } from '../src/data/products';
import { CATEGORIES } from '../src/data/categories';
import { BLOG_POSTS } from '../src/data/blogData';
import { SITE_URL } from './seoRenderer';

export function generateSitemapXml(): string {
  const currentDate = new Date().toISOString().split('T')[0];

  interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: string;
    images?: { loc: string; title: string }[];
  }

  const urls: SitemapUrl[] = [];

  // 1. Core Primary Static Pages
  urls.push(
    { loc: `${SITE_URL}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/shop`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/terms`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/privacy`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/contact`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/full-stacks`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/rba-guidelines`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${SITE_URL}/bulk-studio`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/studio-portal`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { loc: `${SITE_URL}/faq`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/blog`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' }
  );

  // 2. Category Pages
  Object.values(CATEGORIES).forEach((cat) => {
    urls.push({
      loc: `${SITE_URL}/shop/${cat.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85'
    });
  });

  // 3. Blog Article Pages
  BLOG_POSTS.forEach((bp) => {
    urls.push({
      loc: `${SITE_URL}/blog/${bp.slug}`,
      lastmod: bp.publishDate,
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          loc: bp.image.startsWith('http') ? bp.image : `${SITE_URL}${bp.image}`,
          title: bp.title
        }
      ]
    });
  });

  // 4. All Product Pages with Image Sitemap Tags
  PRODUCTS.forEach((prod) => {
    const imgLoc = prod.image.startsWith('http') ? prod.image : `${SITE_URL}${prod.image}`;
    urls.push({
      loc: `${SITE_URL}/product/${prod.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
      images: [
        {
          loc: imgLoc,
          title: `${prod.name} - 4K Film Prop Currency`
        }
      ]
    });
  });

  // Generate XML
  const xmlEntries = urls
    .map((item) => {
      let imageTags = '';
      if (item.images && item.images.length > 0) {
        imageTags = item.images
          .map(
            (img) => `
    <image:image>
      <image:loc>${img.loc.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${img.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>`
          )
          .join('');
      }

      return `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${imageTags}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Disallow API endpoints
Disallow: /api/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;
}
