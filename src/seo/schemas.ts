import { SITE_CONFIG, getCanonicalUrl } from './config';
import { CoralSpecies } from '../data/coralSpeciesData';
import { ScubaPhoto } from '../data/scubaData';
import { PdfPublication } from '../data/pdfPublicationsData';
import { NewspaperFeature } from '../data/newspaperData';

export const generatePersonSchema = () => ({
  '@type': 'Person',
  '@id': `${SITE_CONFIG.baseUrl}/#person`,
  name: 'Dr. J.S. Yogesh Kumar',
  alternateName: ['Dr. Yogesh Kumar', 'J.S. Yogesh Kumar', 'YK'],
  jobTitle: SITE_CONFIG.role,
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
  url: SITE_CONFIG.baseUrl,
  image: SITE_CONFIG.defaultOgImage,
  email: 'yogeshkumar.js@zsi.gov.in',
  description: 'Marine biologist, coral scientist, and PADI Dive Master specializing in Indian coral reef research, Scleractinian & Octocoral taxonomy, sea fans, sea pens, and reef resilience across the Andaman & Nicobar Islands, Gulf of Mannar, and Lakshadweep.',
  sameAs: [
    SITE_CONFIG.social.researchGate,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.zsiProfile
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Doctor of Philosophy (Ph.D.) in Marine Biology'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'PADI Certified Dive Master',
      identifier: SITE_CONFIG.credentials.padiId
    }
  ],
  knowsAbout: [
    'Coral Reef Ecology',
    'Scleractinian Corals',
    'Octocorallia Taxonomy',
    'Gorgonians and Sea Fans',
    'Sea Pens (Pennatulacea)',
    'Nudibranchs and Opisthobranchs',
    'Marine Biodiversity Conservation',
    'Scientific SCUBA Diving',
    'Andaman & Nicobar Marine Ecosystems',
    'Gulf of Mannar Biosphere Reserve',
    'Lakshadweep Coral Atolls'
  ]
});

export const generateWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.baseUrl}/#website`,
  url: SITE_CONFIG.baseUrl,
  name: 'Dr. J.S. Yogesh Kumar | Marine Biodiversity & Coral Research Portfolio',
  description: 'Official scientific archive, specimen catalog, underwater SCUBA photography, and publications of Dr. J.S. Yogesh Kumar (ZSI / MoEFCC).',
  publisher: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  }
});

export const generateBreadcrumbsSchema = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE_CONFIG.baseUrl}/#breadcrumb-${items.map(i => i.name.toLowerCase()).join('-')}`,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path)
  }))
});

export const generateSpecimenArchiveSchema = (totalSpecimens: number) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_CONFIG.baseUrl}/specimens#archive`,
  url: `${SITE_CONFIG.baseUrl}/specimens`,
  name: 'Marine Specimen Archive | Scleractinian Corals, Octocorals & Mollusca',
  description: `Digital marine taxonomy archive documenting ${totalSpecimens} scientific specimen records from the Andaman & Nicobar Islands, Gulf of Mannar, and coastal India by Dr. J.S. Yogesh Kumar (Zoological Survey of India).`,
  isPartOf: {
    '@id': `${SITE_CONFIG.baseUrl}/#website`
  },
  author: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Scleractinia', termCode: 'Hard Corals' },
    { '@type': 'DefinedTerm', name: 'Octocorallia', termCode: 'Soft Corals & Gorgonians' },
    { '@type': 'DefinedTerm', name: 'Mollusca', termCode: 'Marine Molluscs' }
  ]
});

export const generateSpecimenDetailSchema = (coral: CoralSpecies) => ({
  '@type': 'Taxon',
  '@id': `${SITE_CONFIG.baseUrl}/specimens/${coral.id}#taxon`,
  url: `${SITE_CONFIG.baseUrl}/specimens/${coral.id}`,
  name: coral.botanicalName,
  alternateName: [coral.commonName, coral.group, coral.category].filter(Boolean),
  taxonRank: 'Species',
  scientificName: coral.botanicalName.replace(/\s*\(Specimen\s*#[^)]+\)/i, ''),
  parentTaxon: {
    '@type': 'Taxon',
    name: coral.family,
    taxonRank: 'Family'
  },
  image: `${SITE_CONFIG.baseUrl}${coral.displayImage || coral.image}`,
  description: `${coral.group} specimen (${coral.id}) cataloged as ${coral.botanicalName} (${coral.family}). Recorded at ${coral.location} at depth of ${coral.depth}. Habitat: ${coral.habitat}. Diagnostic identification: ${coral.identification}`,
  locationCreated: {
    '@type': 'Place',
    name: coral.location
  },
  collector: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  }
});

export const generateSpecimenImageSchema = (coral: CoralSpecies) => {
  const loc = coral.location.toLowerCase();
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

  return {
    '@type': 'ImageObject',
    '@id': `${SITE_CONFIG.baseUrl}/specimens/${coral.id}#image`,
    url: `${SITE_CONFIG.baseUrl}${coral.displayImage || coral.image}`,
    contentUrl: `${SITE_CONFIG.baseUrl}${coral.displayImage || coral.image}`,
    caption: `${coral.commonName ? `${coral.commonName} (${coral.botanicalName})` : coral.botanicalName} Specimen #${coral.id} photographed at ${coral.location}`,
    description: `High-resolution marine biodiversity photograph of ${coral.botanicalName} (${coral.commonName || coral.group}) from ${coral.location}, depth ${coral.depth}. Photographed and cataloged by Dr. J.S. Yogesh Kumar, Zoological Survey of India.`,
    creditText: 'Dr. J.S. Yogesh Kumar / Zoological Survey of India',
    copyrightNotice: '© Dr. J.S. Yogesh Kumar, Zoological Survey of India (ZSI), MoEFCC',
    license: `${SITE_CONFIG.baseUrl}/specimens`,
    acquireLicensePage: `${SITE_CONFIG.baseUrl}/specimens/${coral.id}`,
    creator: {
      '@type': 'Person',
      name: 'Dr. J.S. Yogesh Kumar',
      jobTitle: 'Scientist E & Officer-in-Charge',
      worksFor: {
        '@type': 'Organization',
        name: 'Zoological Survey of India',
        url: 'https://zsi.gov.in'
      }
    },
    copyrightHolder: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`
    },
    contentLocation: {
      '@type': 'Place',
      name: coral.location,
      geo: geo
    }
  };
};

export const generatePublicationsSchema = (publications: PdfPublication[]) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_CONFIG.baseUrl}/publications#collection`,
  url: `${SITE_CONFIG.baseUrl}/publications`,
  name: 'Scientific Research Publications | Dr. J.S. Yogesh Kumar',
  description: `Peer-reviewed scientific papers, taxonomic checklists, monographs, and marine conservation studies published by Dr. J.S. Yogesh Kumar (ZSI).`,
  isPartOf: {
    '@id': `${SITE_CONFIG.baseUrl}/#website`
  },
  author: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: publications.length,
    itemListElement: publications.slice(0, 30).map((pub, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'ScholarlyArticle',
        headline: pub.title,
        name: pub.title,
        datePublished: pub.year,
        author: {
          '@type': 'Person',
          name: pub.authors
        },
        publisher: {
          '@type': 'Organization',
          name: pub.journal
        },
        description: pub.description,
        contentUrl: `${SITE_CONFIG.baseUrl}${pub.pdfUrl}`
      }
    }))
  }
});

export const generateExpeditionsSchema = (photos: ScubaPhoto[]) => ({
  '@type': 'ImageGallery',
  '@id': `${SITE_CONFIG.baseUrl}/expeditions#gallery`,
  url: `${SITE_CONFIG.baseUrl}/expeditions`,
  name: 'SCUBA Diving Expeditions & Deep Reef Photography | Dr. J.S. Yogesh Kumar',
  description: 'Underwater biodiversity photography, reef transects, and deep-reef survey documentation across Andaman & Nicobar, Lakshadweep, and coastal India.',
  author: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  },
  associatedMedia: photos.slice(0, 30).map((photo) => ({
    '@type': 'ImageObject',
    name: photo.title,
    caption: photo.description,
    contentUrl: `${SITE_CONFIG.baseUrl}${photo.url}`,
    acquireLicensePage: `${SITE_CONFIG.baseUrl}/expeditions`,
    creator: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`
    },
    contentLocation: photo.location ? {
      '@type': 'Place',
      name: photo.location
    } : undefined
  }))
});

export const generatePressSchema = (features: NewspaperFeature[]) => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_CONFIG.baseUrl}/press#archive`,
  url: `${SITE_CONFIG.baseUrl}/press`,
  name: 'Press Coverage & Marine Conservation Media | Dr. J.S. Yogesh Kumar',
  description: 'National and regional media documentation of pioneering marine conservation missions, SCUBA diving training programs, and marine wildlife rescues led by Dr. J.S. Yogesh Kumar.',
  isPartOf: {
    '@id': `${SITE_CONFIG.baseUrl}/#website`
  },
  about: {
    '@id': `${SITE_CONFIG.baseUrl}/#person`
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: features.length,
    itemListElement: features.map((feat, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'NewsArticle',
        headline: feat.headlineEnglish,
        alternativeHeadline: feat.headlineTamil,
        datePublished: feat.date,
        publisher: {
          '@type': 'Organization',
          name: feat.newspaper
        },
        description: feat.summary,
        image: `${SITE_CONFIG.baseUrl}${feat.image}`
      }
    }))
  }
});

