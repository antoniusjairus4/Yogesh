export interface ProfileData {
  name: string;
  title: string;
  officialTitle: string;
  institution: string;
  ministry: string;
  address: string;
  mobile: string;
  email: string;
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

export const PROFILE_DATA: ProfileData = {
  name: "Dr. J.S. Yogesh Kumar",
  title: "Scientist E & Officer-in-Charge",
  officialTitle: "Scientist E & Officer-in-Charge, ZSI Canning",
  institution: "Sunderban Regional Centre (SbRC), Zoological Survey of India (ZSI)",
  ministry: "Ministry of Environment, Forest and Climate Change (MoEFCC), Govt. of India",
  address: "Canning, West Bengal - 743329, India",
  mobile: "+91 94760 06830",
  email: "coralyogesh@yahoo.co.in",
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

export const CAREER_SNAPSHOT: CareerHighlight[] = [
  {
    period: "June 2022 – Present",
    title: "Scientist E & Officer-in-Charge",
    location: "ZSI Sunderban Regional Centre (SbRC), Canning",
    focus: "Leading regional research directives & Sunderbans mangrove ecosystem exploration."
  },
  {
    period: "May 2021 – June 2022",
    title: "Scientist D & Officer-in-Charge",
    location: "ZSI Sunderban Regional Centre (SbRC), Canning",
    focus: "Administrative leadership and coastal faunal monitoring."
  },
  {
    period: "April 2017 – April 2021",
    title: "Scientist D",
    location: "ZSI Marine Aquarium and Regional Centre (MARC), Digha",
    focus: "Soft coral taxonomy along Digha coast and East Coast of India."
  },
  {
    period: "June 2013 – July 2016",
    title: "Young Scientist (DST-SERB Fast Track)",
    location: "ZSI Andaman & Nicobar Regional Centre, Port Blair",
    focus: "Comprehensive research on Gorgonian diversity & distribution."
  }
];
