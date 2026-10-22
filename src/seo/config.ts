export const SITE_CONFIG = {
  baseUrl: 'https://yogesh-teal.vercel.app',
  siteName: 'Dr. J.S. Yogesh Kumar | Marine Biodiversity Archive & Scientific Portfolio',
  author: 'Dr. J.S. Yogesh Kumar',
  role: 'Scientist E & Officer-in-Charge',
  institution: 'Zoological Survey of India (ZSI), MoEFCC, Government of India',
  defaultOgImage: 'https://yogesh-teal.vercel.app/portfolio/landing_img.webp',
  social: {
    researchGate: 'https://www.researchgate.net/profile/J-S-Yogesh-Kumar',
    linkedIn: 'https://www.linkedin.com/in/yogesh-kumar-a69b5410/',
    zsiProfile: 'https://zsi.gov.in/rc-scientist-profile?rc=56',
  },
  credentials: {
    padiId: 'DM – 494151',
    padiCertification: 'PADI Certified Dive Master (2007)',
  }
};

export const getCanonicalUrl = (path: string = '/'): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') {
    return SITE_CONFIG.baseUrl;
  }
  return `${SITE_CONFIG.baseUrl}${cleanPath.replace(/\/+$/, '')}`;
};

