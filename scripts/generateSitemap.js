import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://yogesh-teal.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  // Primary High-Authority Routes
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${BASE_URL}/about`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE_URL}/specimens`, priority: '0.95', changefreq: 'weekly' },
  { loc: `${BASE_URL}/publications`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${BASE_URL}/expeditions`, priority: '0.85', changefreq: 'monthly' },
  { loc: `${BASE_URL}/press`, priority: '0.8', changefreq: 'monthly' },

  // Specimen Taxonomy Groups
  { loc: `${BASE_URL}/specimens/corals`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE_URL}/specimens/octocorals`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${BASE_URL}/specimens/mollusca`, priority: '0.85', changefreq: 'weekly' },
];

// 80 Scleractinia & Hard Corals
for (let i = 1; i <= 80; i++) {
  const id = `coral-${String(i).padStart(3, '0')}`;
  routes.push({
    loc: `${BASE_URL}/specimens/${id}`,
    priority: '0.75',
    changefreq: 'monthly'
  });
}

// 87 Octocorallia & Gorgonians
for (let i = 1; i <= 87; i++) {
  const id = `octo-${String(i).padStart(3, '0')}`;
  routes.push({
    loc: `${BASE_URL}/specimens/${id}`,
    priority: '0.75',
    changefreq: 'monthly'
  });
}

// 26 Mollusca
for (let i = 1; i <= 26; i++) {
  const id = `mollusca-${String(i).padStart(3, '0')}`;
  routes.push({
    loc: `${BASE_URL}/specimens/${id}`,
    priority: '0.75',
    changefreq: 'monthly'
  });
}

// 59 SCUBA Expedition Visuals
for (let i = 1; i <= 59; i++) {
  routes.push({
    loc: `${BASE_URL}/expeditions/photo-${i}`,
    priority: '0.7',
    changefreq: 'monthly'
  });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
console.log(`Generated sitemap with ${routes.length} URLs at ${outputPath}`);

