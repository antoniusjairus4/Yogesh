import { SITE_CONFIG } from './config';
import { 
  generatePersonSchema, 
  generateWebSiteSchema, 
  generateBreadcrumbsSchema,
  generateSpecimenArchiveSchema,
  generatePublicationsSchema,
  generateExpeditionsSchema,
  generatePressSchema 
} from './schemas';
import { CORAL_SPECIES_DATA } from '../data/coralSpeciesData';
import { PDF_PUBLICATIONS } from '../data/pdfPublicationsData';
import { SCUBA_PHOTOS } from '../data/scubaData';
import { NEWSPAPER_FEATURES } from '../data/newspaperData';
import { RouteSEOOptions } from './metaManager';

export const PRIMARY_ROUTES_SEO: Record<string, () => RouteSEOOptions> = {
  '/': () => ({
    title: 'Dr. J.S. Yogesh Kumar | Coral Scientist & Marine Biologist, ZSI',
    description: 'Official Scientific Portfolio & Marine Specimen Archive of Dr. J.S. Yogesh Kumar, Scientist E & Officer-in-Charge at Zoological Survey of India (ZSI), MoEFCC. Specialist in Indian coral reef research, Scleractinian & Octocoral taxonomy, sea fans, sea pens, and reef resilience.',
    canonicalPath: '/',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generatePersonSchema(),
        generateWebSiteSchema(),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: 'Marine Specimen Archive', path: '/specimens' },
          { name: 'SCUBA Expeditions', path: '/expeditions' },
          { name: 'Publications', path: '/publications' },
          { name: 'Press & Media', path: '/press' }
        ])
      ]
    }
  }),

  '/about': () => ({
    title: 'About Dr. J.S. Yogesh Kumar | Marine Scientist E & Officer-in-Charge, ZSI',
    description: 'Biographical profile, academic qualifications, PADI Divemaster credentials, and scientific leadership of Dr. J.S. Yogesh Kumar at the Zoological Survey of India (ZSI), Ministry of Environment, Forest and Climate Change.',
    canonicalPath: '/about',
    ogType: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generatePersonSchema(),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'About & Career', path: '/about' }
        ])
      ]
    }
  }),

  '/specimens': () => ({
    title: 'Marine Specimen Archive | 190+ Corals, Octocorals & Mollusca | Dr. J.S. Yogesh Kumar',
    description: 'High-resolution scientific specimen database of 190+ marine species collected across Andaman & Nicobar, Gulf of Mannar, and Lakshadweep. Scleractinia hard corals, gorgonian sea fans, sea pens, and marine molluscs with taxonomy details.',
    canonicalPath: '/specimens',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generateSpecimenArchiveSchema(CORAL_SPECIES_DATA.length),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'Marine Specimen Archive', path: '/specimens' }
        ])
      ]
    }
  }),

  '/publications': () => ({
    title: 'Scientific Research Publications & Monograph Checklists | Dr. J.S. Yogesh Kumar',
    description: 'Comprehensive research repository of 80+ peer-reviewed papers, book chapters, and taxonomic checklists by Dr. J.S. Yogesh Kumar documenting Indian Octocorallia, coral reefs, and marine fauna.',
    canonicalPath: '/publications',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generatePublicationsSchema(PDF_PUBLICATIONS),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'Scientific Publications', path: '/publications' }
        ])
      ]
    }
  }),

  '/expeditions': () => ({
    title: 'SCUBA Diving Expeditions & Deep Reef Surveys | Dr. J.S. Yogesh Kumar',
    description: 'Photographic documentation of underwater marine biodiversity surveys, SCUBA transects, and deep reef exploration across Andaman & Nicobar Islands, Gulf of Mannar, and Lakshadweep by Dr. J.S. Yogesh Kumar.',
    canonicalPath: '/expeditions',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generateExpeditionsSchema(SCUBA_PHOTOS),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'SCUBA Expeditions', path: '/expeditions' }
        ])
      ]
    }
  }),

  '/press': () => ({
    title: 'Press Coverage & Marine Conservation Media | Dr. J.S. Yogesh Kumar',
    description: 'National newspaper features, environmental journalism, and public outreach covering coastal fishermen SCUBA training, sea turtle conservation, and coral reef monitoring missions by Dr. J.S. Yogesh Kumar.',
    canonicalPath: '/press',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        generatePressSchema(NEWSPAPER_FEATURES),
        generateBreadcrumbsSchema([
          { name: 'Home', path: '/' },
          { name: 'Press & Media Coverage', path: '/press' }
        ])
      ]
    }
  })
};

