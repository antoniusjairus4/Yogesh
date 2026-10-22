import { SITE_CONFIG, getCanonicalUrl } from './config';

export interface RouteSEOOptions {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

function setOrCreateMeta(nameOrProp: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector(`meta[${nameOrProp}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(nameOrProp, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function updateRouteSEO(options: RouteSEOOptions) {
  const fullTitle = options.title.includes('Dr. J.S. Yogesh Kumar') 
    ? options.title 
    : `${options.title} | Dr. J.S. Yogesh Kumar`;

  const canonicalUrl = getCanonicalUrl(options.canonicalPath);
  const imageUrl = options.ogImage 
    ? (options.ogImage.startsWith('http') ? options.ogImage : `${SITE_CONFIG.baseUrl}${options.ogImage}`)
    : SITE_CONFIG.defaultOgImage;

  // Title
  document.title = fullTitle;
  setOrCreateMeta('name', 'title', fullTitle);

  // Description
  setOrCreateMeta('name', 'description', options.description);

  // Robots
  if (options.noindex) {
    setOrCreateMeta('name', 'robots', 'noindex, follow');
  } else {
    setOrCreateMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // Canonical
  setOrCreateLink('canonical', canonicalUrl);

  // Open Graph
  setOrCreateMeta('property', 'og:title', fullTitle);
  setOrCreateMeta('property', 'og:description', options.description);
  setOrCreateMeta('property', 'og:url', canonicalUrl);
  setOrCreateMeta('property', 'og:type', options.ogType || 'website');
  setOrCreateMeta('property', 'og:image', imageUrl);
  setOrCreateMeta('property', 'og:site_name', SITE_CONFIG.siteName);

  // Twitter
  setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
  setOrCreateMeta('name', 'twitter:title', fullTitle);
  setOrCreateMeta('name', 'twitter:description', options.description);
  setOrCreateMeta('name', 'twitter:image', imageUrl);

  // Structured Data (JSON-LD)
  if (options.jsonLd) {
    let scriptTag = document.getElementById('seo-dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(options.jsonLd, null, 2);
  }
}

