import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const BASE_URL = 'https://yogesh-teal.vercel.app';

// 1. Bundle TypeScript data in-memory via esbuild
function loadModuleFromTs(tsFilePath) {
  const result = esbuild.buildSync({
    entryPoints: [path.resolve(ROOT_DIR, tsFilePath)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    define: {
      'import.meta.env.BASE_URL': '"/"'
    },
    write: false,
  });
  const code = result.outputFiles[0].text;
  return import('data:text/javascript,' + encodeURIComponent(code));
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replaceMeta(html, {
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  citationMeta = '',
  jsonLd = null,
  noscriptContent = ''
}) {
  let output = html;

  // Title
  if (title) {
    output = output.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
    output = output.replace(/<meta\s+name=["']title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="title" content="${escapeHtml(title)}" />`);
    output = output.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
    output = output.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  }

  // Description
  if (description) {
    output = output.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
    output = output.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    output = output.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  }

  // Canonical & URLs
  if (canonicalUrl) {
    output = output.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    output = output.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    output = output.replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  }

  // OG Image
  if (ogImage) {
    const fullImg = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    output = output.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${fullImg}" />`);
    output = output.replace(/<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:image" content="${fullImg}" />`);
  }

  // OG Type
  if (ogType) {
    output = output.replace(/<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`);
  }

  // Academic Citation Tags (Inject before </head>)
  if (citationMeta) {
    output = output.replace('</head>', `  ${citationMeta}\n  </head>`);
  }

  // JSON-LD Structured Data
  if (jsonLd) {
    const jsonStr = JSON.stringify(jsonLd, null, 2);
    output = output.replace(/<script\s+type=["']application\/ld\+json["']>.*?<\/script>/s, `<script type="application/ld+json">\n${jsonStr}\n    </script>`);
  }

  // Noscript crawler content
  if (noscriptContent) {
    output = output.replace(/<noscript>.*?<\/noscript>/s, `<noscript>\n${noscriptContent}\n    </noscript>`);
  }

  return output;
}

async function main() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Load datasets
  const coralMod = await loadModuleFromTs('src/data/coralSpeciesData.ts');
  const pubMod = await loadModuleFromTs('src/data/pdfPublicationsData.ts');
  const scubaMod = await loadModuleFromTs('src/data/scubaData.ts');
  const newsMod = await loadModuleFromTs('src/data/newspaperData.ts');

  const corals = coralMod.CORAL_SPECIES_DATA || [];
  const publications = pubMod.PDF_PUBLICATIONS || [];
  const scubaPhotos = scubaMod.SCUBA_PHOTOS || [];
  const pressFeatures = newsMod.NEWSPAPER_FEATURES || [];

  console.log(`Prerendering ${corals.length} specimens and top routes for Google SEO...`);

  let count = 0;

  // 1. Prerender each individual specimen (e.g., /specimens/coral-001)
  for (const coral of corals) {
    const cleanBotanical = (coral.botanicalName || '').replace(/\s*\(Specimen\s*#[^)]+\)/i, '');
    const title = `${coral.commonName ? `${coral.commonName} (${cleanBotanical})` : cleanBotanical} Specimen #${coral.id} | Indian Marine Fauna Archive`;
    const description = `High-resolution marine specimen photograph of ${cleanBotanical} (${coral.commonName || coral.group}) from ${coral.location}, recorded depth ${coral.depth}. Documented & cataloged by Dr. J.S. Yogesh Kumar, Scientist E, Zoological Survey of India (ZSI).`;
    const canonicalUrl = `${BASE_URL}/specimens/${coral.id}`;
    const imgUrl = `${BASE_URL}${coral.displayImage || coral.image}`;

    const loc = (coral.location || '').toLowerCase();
    const isAndaman = loc.includes('andaman') || loc.includes('nicobar') || loc.includes('havelock') || loc.includes('neil');
    const isMannar = loc.includes('mannar') || loc.includes('thoothukudi') || loc.includes('vembar') || loc.includes('mandapam');
    const isLakshadweep = loc.includes('lakshadweep') || loc.includes('kavaratti');

    const geo = isAndaman
      ? { '@type': 'GeoCoordinates', latitude: '11.6670', longitude: '92.7350' }
      : isMannar
      ? { '@type': 'GeoCoordinates', latitude: '9.2876', longitude: '79.3129' }
      : isLakshadweep
      ? { '@type': 'GeoCoordinates', latitude: '10.5667', longitude: '72.6417' }
      : { '@type': 'GeoCoordinates', latitude: '13.0827', longitude: '80.2707' };

    const citationMeta = `
    <!-- Highwire Press / Google Scholar Academic Citation Metadata -->
    <meta name="citation_title" content="${escapeHtml(cleanBotanical)} (Specimen #${coral.id}): Marine Biodiversity and Specimen Record from ${escapeHtml(coral.location)}" />
    <meta name="citation_author" content="Kumar, J. S. Yogesh" />
    <meta name="citation_author_institution" content="Zoological Survey of India (ZSI), MoEFCC" />
    <meta name="citation_publication_date" content="2026" />
    <meta name="citation_online_date" content="2026" />
    <meta name="citation_technical_report_institution" content="Zoological Survey of India" />
    <meta name="citation_fulltext_html_url" content="${canonicalUrl}" />
    <meta name="citation_abstract_html_url" content="${canonicalUrl}" />`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Dr. J.S. Yogesh Kumar',
          alternateName: ['Dr. Yogesh Kumar', 'J.S. Yogesh Kumar', 'YK'],
          jobTitle: 'Scientist E & Officer-in-Charge',
          worksFor: {
            '@type': 'Organization',
            name: 'Zoological Survey of India',
            alternateName: 'ZSI',
            url: 'https://zsi.gov.in',
            parentOrganization: {
              '@type': 'GovernmentOrganization',
              name: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
              url: 'https://moef.gov.in'
            }
          },
          url: BASE_URL,
          sameAs: [
            'https://www.researchgate.net/profile/Yogesh-Kumar-J-S',
            'https://www.linkedin.com/in/dr-j-s-yogesh-kumar-875b253b',
            'https://zsi.gov.in'
          ]
        },
        {
          '@type': 'Taxon',
          '@id': `${canonicalUrl}#taxon`,
          url: canonicalUrl,
          name: cleanBotanical,
          alternateName: [coral.commonName, coral.group, coral.category].filter(Boolean),
          taxonRank: 'Species',
          scientificName: cleanBotanical,
          parentTaxon: {
            '@type': 'Taxon',
            name: coral.family,
            taxonRank: 'Family'
          },
          image: imgUrl,
          description: description,
          locationCreated: {
            '@type': 'Place',
            name: coral.location
          },
          collector: {
            '@id': `${BASE_URL}/#person`
          }
        },
        {
          '@type': 'ImageObject',
          '@id': `${canonicalUrl}#image`,
          url: imgUrl,
          contentUrl: imgUrl,
          caption: `${coral.commonName ? `${coral.commonName} (${cleanBotanical})` : cleanBotanical} Specimen #${coral.id} documented at ${coral.location}`,
          description: description,
          creditText: 'Dr. J.S. Yogesh Kumar / Zoological Survey of India',
          copyrightNotice: '© Dr. J.S. Yogesh Kumar, Zoological Survey of India (ZSI), MoEFCC',
          license: `${BASE_URL}/specimens`,
          acquireLicensePage: canonicalUrl,
          creator: {
            '@id': `${BASE_URL}/#person`
          },
          copyrightHolder: {
            '@id': `${BASE_URL}/#person`
          },
          contentLocation: {
            '@type': 'Place',
            name: coral.location,
            geo: geo
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Marine Specimen Archive', item: `${BASE_URL}/specimens` },
            { '@type': 'ListItem', position: 3, name: coral.group, item: `${BASE_URL}/specimens?group=${coral.group.toLowerCase()}` },
            { '@type': 'ListItem', position: 4, name: cleanBotanical, item: canonicalUrl }
          ]
        }
      ]
    };

    const noscriptContent = `
      <article style="max-width: 900px; margin: 40px auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; background: #070e17; color: #f1f5f9; border-radius: 12px; border: 1px solid #1c2e45;">
        <nav aria-label="Breadcrumb" style="font-size: 13px; margin-bottom: 16px; color: #94a3b8;">
          <a href="/" style="color: #c5a880; text-decoration: none;">Home</a> &gt;
          <a href="/specimens" style="color: #c5a880; text-decoration: none;">Marine Specimen Archive</a> &gt;
          <a href="/specimens?group=${coral.group.toLowerCase()}" style="color: #c5a880; text-decoration: none;">${coral.group}</a> &gt;
          <span style="color: #ffffff;">${escapeHtml(cleanBotanical)} (${coral.id})</span>
        </nav>
        <header>
          <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: bold; background: rgba(197, 168, 128, 0.2); color: #e2ba7d; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">
            ${escapeHtml(coral.group)} Specimen #${coral.id}
          </span>
          <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin: 4px 0 8px 0; line-height: 1.2;">
            ${coral.commonName ? `${escapeHtml(coral.commonName)} (${escapeHtml(cleanBotanical)})` : escapeHtml(cleanBotanical)}
          </h1>
          <p style="font-size: 13px; color: #94a3b8; font-family: monospace; margin: 0 0 20px 0;">
            Authority: <strong style="color: #f1f5f9;">${escapeHtml(coral.authority)}</strong> • Family: <strong style="color: #f1f5f9;">${escapeHtml(coral.family)}</strong> • Category: <strong style="color: #f1f5f9;">${escapeHtml(coral.category)}</strong>
          </p>
        </header>

        <figure style="margin: 0 0 24px 0;">
          <img src="${imgUrl}" alt="${escapeHtml(coral.commonName || cleanBotanical)} specimen ${coral.id} photographed at ${escapeHtml(coral.location)} by Dr. J.S. Yogesh Kumar" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #1b2f48;" />
          <figcaption style="font-size: 13px; color: #94a3b8; margin-top: 10px;">
            High-resolution marine biodiversity specimen ${coral.id} from ${escapeHtml(coral.location)} (depth: ${escapeHtml(coral.depth)}). © Dr. J.S. Yogesh Kumar / Zoological Survey of India (ZSI).
          </figcaption>
        </figure>

        <section style="background: #0c1828; border: 1px solid #1b2f48; border-radius: 8px; padding: 20px; margin-bottom: 24px; font-size: 14px; line-height: 1.6;">
          <h2 style="font-size: 18px; color: #c5a880; margin-top: 0; margin-bottom: 12px;">Field Observation &amp; Diagnostic Details</h2>
          <p><strong>Field Location:</strong> ${escapeHtml(coral.location)}</p>
          <p><strong>Recorded Depth:</strong> ${escapeHtml(coral.depth)}</p>
          <p><strong>Habitat / Substrate:</strong> ${escapeHtml(coral.habitat)}</p>
          <p><strong>Abundance in Region:</strong> ${escapeHtml(coral.abundance)}</p>
          <p><strong>Diagnostic Identification:</strong> ${escapeHtml(coral.identification)}</p>
          <p><strong>Principal Investigator:</strong> Dr. J.S. Yogesh Kumar, Scientist E &amp; Officer-in-Charge, Zoological Survey of India (ZSI), MoEFCC.</p>
        </section>

        <footer style="border-top: 1px solid #1b2f48; padding-top: 16px; font-size: 12px; color: #64748b; display: flex; justify-content: space-between;">
          <span>Zoological Survey of India • Marine Specimen Archive</span>
          <span>© Dr. J.S. Yogesh Kumar</span>
        </footer>
      </article>`;

    const specimenHtml = replaceMeta(baseHtml, {
      title,
      description,
      canonicalUrl,
      ogImage: coral.displayImage || coral.image,
      ogType: 'article',
      citationMeta,
      jsonLd,
      noscriptContent
    });

    const targetDir = path.join(DIST_DIR, 'specimens', coral.id);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), specimenHtml, 'utf8');
    count++;
  }

  // 2. Prerender Main Catalog Hub (/specimens)
  {
    const title = 'Marine Specimen Archive | 190+ Corals, Octocorals & Mollusca | Dr. J.S. Yogesh Kumar';
    const description = `Official digital marine specimen archive documenting 190+ species of Scleractinia hard corals, Octocorallia sea fans, and Mollusca from Andaman & Nicobar, Gulf of Mannar, and Lakshadweep by Dr. J.S. Yogesh Kumar (ZSI).`;
    const canonicalUrl = `${BASE_URL}/specimens`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonicalUrl}#archive`,
          url: canonicalUrl,
          name: title,
          description: description,
          author: { '@id': `${BASE_URL}/#person` },
          about: [
            { '@type': 'DefinedTerm', name: 'Scleractinia', termCode: 'Hard Corals' },
            { '@type': 'DefinedTerm', name: 'Octocorallia', termCode: 'Soft Corals & Gorgonians' },
            { '@type': 'DefinedTerm', name: 'Mollusca', termCode: 'Marine Molluscs' }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Marine Specimen Archive', item: canonicalUrl }
          ]
        }
      ]
    };

    const specimenListItems = corals.map(c => `
      <li style="background: #091524; border: 1px solid #1c2e45; border-radius: 8px; padding: 12px; margin-bottom: 12px; list-style: none;">
        <a href="/specimens/${c.id}" style="color: #e2ba7d; font-weight: bold; font-size: 16px; text-decoration: none;">
          ${escapeHtml(c.commonName || c.botanicalName)} (${c.id})
        </a>
        <p style="margin: 4px 0; font-size: 13px; color: #94a3b8;">
          ${escapeHtml(c.botanicalName)} • ${escapeHtml(c.family)} • ${escapeHtml(c.location)}
        </p>
      </li>
    `).join('\n');

    const noscriptContent = `
      <main style="max-width: 1000px; margin: 40px auto; padding: 24px; font-family: system-ui, sans-serif; background: #070e17; color: #f1f5f9;">
        <h1>Marine Specimen Archive — 190+ Species Catalog</h1>
        <p>Scientific marine specimen photographic archive documenting Indian coral reef biodiversity, Scleractinia, Octocorallia, and marine molluscs by Dr. J.S. Yogesh Kumar, Scientist E, Zoological Survey of India.</p>
        <ul style="padding: 0;">
          ${specimenListItems}
        </ul>
      </main>`;

    const catalogHtml = replaceMeta(baseHtml, {
      title,
      description,
      canonicalUrl,
      ogImage: '/portfolio/landing_img.webp',
      ogType: 'website',
      jsonLd,
      noscriptContent
    });

    const targetDir = path.join(DIST_DIR, 'specimens');
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), catalogHtml, 'utf8');
    count++;
  }

  // 3. Prerender Primary Routes: /about, /publications, /expeditions, /press
  const primaryRoutes = [
    {
      subpath: 'about',
      title: 'About Dr. J.S. Yogesh Kumar | Marine Scientist E & Officer-in-Charge, ZSI',
      description: 'Biographical profile, academic qualifications, PADI Divemaster credentials, and scientific leadership of Dr. J.S. Yogesh Kumar at the Zoological Survey of India (ZSI), Ministry of Environment, Forest and Climate Change.',
      ogType: 'profile'
    },
    {
      subpath: 'publications',
      title: 'Scientific Research Publications & Monograph Checklists | Dr. J.S. Yogesh Kumar',
      description: 'Comprehensive research repository of 80+ peer-reviewed papers, book chapters, and taxonomic checklists by Dr. J.S. Yogesh Kumar documenting Indian Octocorallia, coral reefs, and marine fauna.',
      ogType: 'website'
    },
    {
      subpath: 'expeditions',
      title: 'SCUBA Diving Expeditions & Deep Reef Surveys | Dr. J.S. Yogesh Kumar',
      description: 'Photographic documentation of underwater marine biodiversity surveys, SCUBA transects, and deep reef exploration across Andaman & Nicobar Islands, Gulf of Mannar, and Lakshadweep by Dr. J.S. Yogesh Kumar.',
      ogType: 'website'
    },
    {
      subpath: 'press',
      title: 'Press Coverage & Marine Conservation Media | Dr. J.S. Yogesh Kumar',
      description: 'National and regional media documentation of pioneering marine conservation missions, SCUBA diving training programs, and marine wildlife rescues led by Dr. J.S. Yogesh Kumar.',
      ogType: 'website'
    }
  ];

  for (const route of primaryRoutes) {
    const canonicalUrl = `${BASE_URL}/${route.subpath}`;
    const routeHtml = replaceMeta(baseHtml, {
      title: route.title,
      description: route.description,
      canonicalUrl,
      ogImage: '/portfolio/landing_img.webp',
      ogType: route.ogType
    });

    const targetDir = path.join(DIST_DIR, route.subpath);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), routeHtml, 'utf8');
    count++;
  }

  console.log(`Successfully generated ${count} pre-rendered static HTML routes in dist/!`);
}

main().catch(err => {
  console.error('Prerender build error:', err);
  process.exit(1);
});
