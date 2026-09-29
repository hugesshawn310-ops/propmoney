import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemapXml } from '../server/sitemapHandler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemap = generateSitemapXml();
const targetPath = path.resolve(__dirname, '../public/sitemap.xml');

fs.writeFileSync(targetPath, sitemap, 'utf-8');
console.log('✅ Generated public/sitemap.xml successfully!');
