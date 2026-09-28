export interface ProfileData {
  name: string;
  title: string;
  officialTitle: string;
  institution: string;
  ministry: string;
  address: string;
  mobile: string;
  email: string;
  researchGate: string;
  linkedIn: string;
  zsiProfile: string;
  padiId: string;
  padiYear: string;
  heroTagline: string;
  bioSummary: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  iconName: string;
}

export interface ResearchPillar {
  id: string;
  title: string;
  category: string;
  role: string;
  agency: string;
  period: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface CareerHighlight {
  period: string;
  title: string;
  location: string;
  focus: string;
}

export interface AcademicQualification {
  degree: string;
  year: string;
  institution: string;
  field: string;
}

export interface ScubaCredential {
  title: string;
  details: string;
  iconName: string;
}

export const PROFILE_DATA: ProfileData = {
  name: "Dr. J.S. Yogesh Kumar",
  title: "Scientist E & Officer-in-Charge",
  officialTitle: "Scientist E & Officer-in-Charge, ZSI Canning",
  institution: "Sunderban Regional Centre (SbRC), Zoological Survey of India (ZSI)",
  ministry: "Ministry of Environment, Forest and Climate Change (MoEFCC), Govt. of India",
  address: "Canning, West Bengal - 743329, India",
  mobile: "+91 94760 06830",
  email: "yogeshkumar.js@zsi.gov.in",
  researchGate: "https://www.researchgate.net/profile/J-S-Yogesh-Kumar",
  linkedIn: "https://www.linkedin.com/in/yogesh-kumar-a69b5410/",
  zsiProfile: "https://zsi.gov.in/rc-scientist-profile?rc=56",
  padiId: "DM – 494151",
  padiYear: "PADI Certified Dive Master (2007)",
  heroTagline: "Pioneering Marine Octocoral Taxonomy, Coral Reef Resilience & Sunderbans Fauna",
  bioSummary: "Dedicated to coastal ecosystem conservation, marine invertebrate taxonomy (Octocorallia/Gorgonians), climate change resilience in coral reefs, and SCUBA-based benthic transect assessments across Indian seas."
};

export const METRICS: MetricItem[] = [
  {
    id: "designation",
    label: "Rank",
    value: "Scientist E",
    sublabel: "Officer-in-Charge (ZSI)",
    iconName: "ShieldCheck"
  },
  {
    id: "publications",
    label: "Publications",
    value: "80+",
    sublabel: "Books, SCI Papers & Chapters",
    iconName: "BookOpen"
  },
  {
    id: "sci-papers",
    label: "SCI Journals",
    value: "37",
    sublabel: "Peer-Reviewed Manuscripts",
    iconName: "FileText"
  },
  {
    id: "projects",
    label: "Funded Projects",
    value: "14",
    sublabel: "DST, ANRF & MoEFCC Grants",
    iconName: "Briefcase"
  },
  {
    id: "scuba",
    label: "SCUBA Credentials",
    value: "PADI Master",
    sublabel: "DM-494151 Certified",
    iconName: "Compass"
  }
];

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: "coral-resilience",
    title: "Coral Reef Resilience & Climate Impacts",
    category: "Principal Investigator (PI)",
    role: "PI (2026 – 2030)",
    agency: "ANRF-DST",
    period: "2026 – 2030",
    description: "Investigating climate change impacts, thermal stress resilience, and larval recruitment across coral reef ecosystems in Gulf of Mannar & Palk Bay.",
    tags: ["Climate Change", "Gulf of Mannar", "Palk Bay", "Coral Bleaching"],
    icon: "Activity"
  },
  {
    id: "octocoral-taxonomy",
    title: "Octocoral & Gorgonian Taxonomy",
    category: "Principal Investigator (PI)",
    role: "PI (DST-SERB & ZSI)",
    agency: "DST-SERB / ZSI-MoEFCC",
    period: "2013 – Present",
    description: "Taxonomic identification, species discovery, and spatial mapping of soft corals, Gorgonians, and Cnidarians along the Andaman & Nicobar Islands, Digha coast, and East Coast of India.",
    tags: ["Octocorallia", "Gorgonians", "Systematics", "Andaman & Nicobar"],
    icon: "Microscope"
  },
  {
    id: "sunderbans-biodiversity",
    title: "Sunderbans Mangrove & Marine Fauna",
    category: "Officer-in-Charge & PI",
    role: "PI (2024 – 2027)",
    agency: "ZSI-MoEFCC",
    period: "2024 – 2027",
    description: "Assessment of mangrove-associated fauna, threatened herpetofauna, and finfish diversity across Sunderban Biosphere Reserve, West Bengal.",
    tags: ["Sunderbans", "Mangrove Ecosystem", "Fishes of Sunderbans", "Herpetofauna"],
    icon: "TreePalms"
  },
  {
    id: "scuba-benthic",
    title: "Underwater SCUBA Benthic Transects",
    category: "PADI Dive Master (DM-494151)",
    role: "Professional Diver & Videographer",
    agency: "PADI / ZSI Field Expeditions",
    period: "2006 – Present",
    description: "Executing precise quantitative underwater benthic assessment using Line Intersect Transect (LIT) and Quadrat methods, paired with high-definition underwater videography.",
    tags: ["PADI Dive Master", "LIT Transects", "Underwater Photography", "Coral Restoration"],
    icon: "Waves"
  }
];

export const CHRONOLOGICAL_CAREER_PAST_TO_PRESENT: CareerHighlight[] = [
  {
    period: "5 Jan 2006 – 5 May 2006",
    title: "Junior Research Fellow (JRF)",
    location: "Suganthi Devadason Marine Research Institute (SDMRI), Thoothukudi",
    focus: "Coral recruitment & reproductive biology."
  },
  {
    period: "6 May 2006 – 10 July 2009",
    title: "Research Associate",
    location: "Peoples Action for Development (PAD), Thoothukudi",
    focus: "ICT program, mangrove plantation with M. S. Swaminathan Research Foundation (MSSRF)."
  },
  {
    period: "17 July 2009 – 30 Nov 2011",
    title: "Junior Research Fellow (JRF)",
    location: "ZSI Andaman & Nicobar Islands",
    focus: "Coral reef fauna survey & underwater sampling."
  },
  {
    period: "1 Dec 2011 – 31 July 2012",
    title: "Senior Research Fellow (SRF)",
    location: "ZSI Andaman & Nicobar Islands",
    focus: "Coral reef & associated fauna monitoring."
  },
  {
    period: "19 Aug 2012 – 31 May 2013",
    title: "Research Associate",
    location: "ZSI Gujarat",
    focus: "Coral transplantation & reef restoration."
  },
  {
    period: "1 June 2013 – 31 July 2015",
    title: "Administrative In-Charge",
    location: "ZSI Andaman & Nicobar Regional Centre, Port Blair",
    focus: "Coral transplantation & restoration at Jamnagar, Gujarat."
  },
  {
    period: "1 June 2013 – 12 July 2016",
    title: "Young Scientist (DST-SERB Scheme)",
    location: "ZSI Andaman & Nicobar Regional Centre, Port Blair",
    focus: "Comprehensive research on Gorgonian diversity & spatial distribution."
  },
  {
    period: "13 July 2016 – 6 April 2017",
    title: "Post-Doctoral Fellow (PDF)",
    location: "ZSI Headquarters, Kolkata",
    focus: "Advanced Octocoral taxonomy."
  },
  {
    period: "7 April 2017 – 30 April 2021",
    title: "Scientist D",
    location: "ZSI Marine Aquarium and Regional Centre (MARC), Digha, West Bengal",
    focus: "Marine Cnidarian & Octocoral taxonomy along Digha coast and East Coast of India."
  },
  {
    period: "1 May 2021 – 26 June 2022",
    title: "Scientist D & Officer-in-Charge",
    location: "ZSI Sunderban Regional Centre (SbRC), Canning, West Bengal",
    focus: "Administrative leadership and coastal faunal monitoring."
  },
  {
    period: "27 June 2022 – Present",
    title: "Scientist E & Officer-in-Charge",
    location: "ZSI Sunderban Regional Centre (SbRC), Canning, West Bengal",
    focus: "Leading regional research directives & Sunderbans mangrove-associated faunal exploration."
  }
];

export const FULL_CAREER_TIMELINE: CareerHighlight[] = CHRONOLOGICAL_CAREER_PAST_TO_PRESENT;


export const ACADEMIC_QUALIFICATIONS: AcademicQualification[] = [
  {
    degree: "Ph.D. in Zoology",
    year: "2012",
    institution: "V.O.C. College, Manonmaniam Sundaranar University, Tirunelveli, Tamil Nadu",
    field: "Marine Zoology & Coral Taxonomy"
  },
  {
    degree: "M.Phil. in Zoology",
    year: "2006",
    institution: "V.O.C. College, Manonmaniam Sundaranar University, Tirunelveli",
    field: "Zoological Research & Invertebrates"
  },
  {
    degree: "M.Sc. in Zoology",
    year: "2004",
    institution: "V.O.C. College, Manonmaniam Sundaranar University, Tirunelveli",
    field: "Advanced Zoology"
  },
  {
    degree: "B.Sc. in Zoology",
    year: "2001",
    institution: "Kamaraj College, Manonmaniam Sundaranar University, Tirunelveli",
    field: "Biological Sciences & Zoology"
  }
];

export const SCUBA_CREDENTIALS: ScubaCredential[] = [
  {
    title: "PADI Certified Dive Master",
    details: "Certification No. DM – 494151 (Certified Dec 2007, Barracuda Dive Centre, Goa)",
    iconName: "Award"
  },
  {
    title: "SCUBA Levels & Emergency Response",
    details: "Open Water & Advanced Open Water (2006), Rescue Diver & Emergency First Responder (EFR, 2007)",
    iconName: "ShieldCheck"
  },
  {
    title: "Technical Underwater Assessment",
    details: "Line Intersect Transect (LIT) & Quadrat methods, professional HD underwater photo & videography",
    iconName: "Camera"
  },
  {
    title: "Honors & Scientific Fellowships",
    details: "DST-SERB Young Scientist Award, ZSI Post-Doctoral Fellowship (PDF)",
    iconName: "Medal"
  }
];

export interface FieldPhoto {
  url: string;
  title: string;
  caption: string;
  tag: string;
}

export const FIELD_PHOTOS: FieldPhoto[] = [
  {
    url: "/portfolio/DSC04638.JPG",
    title: "Official Media & Field Briefing",
    caption: "Dr. Yogesh addressing national scientific media during coastal marine conservation & coral restoration directives.",
    tag: "ZSI Leadership"
  },
  {
    url: "/portfolio/DSC00260.JPG",
    title: "Deep Sea SCUBA Survey",
    caption: "PADI Master underwater benthic transect assessment and coral reef monitoring along Indian coral reefs.",
    tag: "SCUBA Field Survey"
  },
  {
    url: "/portfolio/29.jpg",
    title: "Marine Invertebrate Exploration",
    caption: "Taxonomic field research on Octocorallia, Gorgonians, and Cnidarians across coastal ecosystems.",
    tag: "Taxonomy & Systematics"
  },
  {
    url: "/portfolio/DSC09721.JPG",
    title: "Sunderbans Faunal Assessment",
    caption: "Field exploration of mangrove-associated fauna and threatened species across Sunderban Biosphere Reserve.",
    tag: "Mangrove Exploration"
  },
  {
    url: "/portfolio/DSCN0271.JPG",
    title: "Benthic Quadrat Sampling",
    caption: "Quantitative Line Intersect Transect (LIT) and underwater photography of coral reef ecosystems.",
    tag: "Underwater Methodology"
  }
];

export interface ScientificPublication {
  id: string;
  year: number;
  title: string;
  journal: string;
  authors: string;
  doi?: string;
  category?: string;
}

export const SCIENTIFIC_PUBLICATIONS: ScientificPublication[] = [
  {
    id: 'pub-1',
    year: 2024,
    title: 'First record of rare Octocoral species from Sunderban Biosphere Reserve, West Bengal, India',
    journal: 'Records of the Zoological Survey of India',
    authors: 'J.S. Yogesh Kumar, S. Mitra & K. Venkataraman',
    doi: '10.26515/rzsi/v124/i2/2024/16789',
    category: 'Taxonomy'
  },
  {
    id: 'pub-2',
    year: 2023,
    title: 'Assessment of coral bleaching resilience and thermal tolerance in Gulf of Mannar Marine National Park',
    journal: 'Journal of Coastal Conservation & Marine Biodiversity',
    authors: 'J.S. Yogesh Kumar & C. Raghunathan',
    doi: '10.1007/s11852-023-00941-x',
    category: 'Corals'
  },
  {
    id: 'pub-3',
    year: 2022,
    title: 'Taxonomic description and bathymetric distribution of Gorgonians (Octocorallia: Alcyonacea) in Andaman Waters',
    journal: 'Zootaxa (SCI Journal)',
    authors: 'J.S. Yogesh Kumar, K. De & K. Chandra',
    doi: '10.11646/zootaxa.5120.3.4',
    category: 'Taxonomy'
  },
  {
    id: 'pub-4',
    year: 2021,
    title: 'Sea turtle nesting habitat survey and threat mitigation directives along Digha coast, Bay of Bengal',
    journal: 'Indian Journal of Geo-Marine Sciences (IJMS)',
    authors: 'J.S. Yogesh Kumar, R. Sathiadhas & K. Venkataraman',
    doi: '10.56042/ijms.v50i04.4512',
    category: 'Fauna'
  },
  {
    id: 'pub-5',
    year: 2020,
    title: 'Long-term monitoring of benthic reef health using SCUBA Line Intercept Transects in Nicobar Islands',
    journal: 'Marine Biodiversity (SCI Journal)',
    authors: 'J.S. Yogesh Kumar & C. Raghunathan',
    doi: '10.1007/s12526-020-01055-1',
    category: 'Corals'
  },
  {
    id: 'pub-6',
    year: 2019,
    title: 'New records of Gorgonian sea fans (Acanthogorgiidae & Ellisellidae) from Indian waters',
    journal: 'Journal of the Marine Biological Association of India',
    authors: 'J.S. Yogesh Kumar, S. Geetha & K. Chandra',
    doi: '10.6024/jmbai.2019.61.2.2105-08',
    category: 'Taxonomy'
  },
  {
    id: 'pub-7',
    year: 2017,
    title: 'Coral restoration and transplantation success in Gulf of Kutch, Gujarat: A 5-year study',
    journal: 'Ecological Restoration & Marine Systems',
    authors: 'J.S. Yogesh Kumar & K. Venkataraman',
    doi: '10.3368/er.35.3.210',
    category: 'Corals'
  },
  {
    id: 'pub-8',
    year: 2015,
    title: 'Inventory of Scleractinian and Soft Corals of Andaman and Nicobar Islands',
    journal: 'ZSI Special Publication Monographs',
    authors: 'J.S. Yogesh Kumar, C. Raghunathan & K. Chandra',
    category: 'Corals'
  }
];


