export interface PdfPublication {
  id: string;
  title: string;
  category: 'Octocorals' | 'Corals & Black Corals' | 'Sea Slugs & Molluscs' | 'Marine Mammals & Turtles' | 'Reef Fishes & Seahorses' | 'Invertebrates' | 'Oceanography & Ecology' | 'Shipwrecks';
  journal: string;
  year: string;
  authors: string;
  location: string;
  pdfUrl: string;
  filename: string;
  description: string;
  sizeBytes?: number;
}

export const PDF_PUBLICATIONS: PdfPublication[] = [
  {
    id: "pdf-1",
    title: "Occurrence of Portuguese man-of-war along Digha Coast, West Bengal: A Threat to Tourists and Fisherfolk",
    category: "Invertebrates",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "S. Geetha, J S Yogesh Kumar, A. Mohapatra, R. Sornaraj",
    location: "Digha Coast, West Bengal",
    filename: "1. Occurrence of Portuguese man-of-war along Digha Coast, West Bengal a threat to tourists and fisherfolk.pdf",
    pdfUrl: "/PDFs/1.%20Occurrence%20of%20Portuguese%20man-of-war%20along%20Digha%20Coast%2C%20West%20Bengal%20a%20threat%20to%20tourists%20and%20fisherfolk.pdf",
    description: "Documentation of floating colonies of Physalia physalis (Portuguese man-of-war) along the Digha coastline during summer, discussing ecological impacts and public safety."
  },
  {
    id: "pdf-2",
    title: "Occurrence of Black Corals (Order Antipatharia) in Andaman and Nicobar Islands, India",
    category: "Corals & Black Corals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, S. Geetha, R. Sornaraj, C. Raghunathan",
    location: "Andaman & Nicobar Islands",
    filename: "2. Occurrence of black corals (Order Antipatharian) in Andaman and Nicobar Islands, India.pdf",
    pdfUrl: "/PDFs/2.%20Occurrence%20of%20black%20corals%20(Order%20Antipatharian)%20in%20Andaman%20and%20Nicobar%20Islands%2C%20India.pdf",
    description: "Survey documenting 15 species of black corals (Antipatharia) across 11 island sites, detailing 7 new zoogeographical records for Indian waters."
  },
  {
    id: "pdf-3",
    title: "Irrawaddy Dolphin (Orcaella brevirostris) Washed Ashore on Digha Coast, West Bengal, India",
    category: "Marine Mammals & Turtles",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, A. Mohapatra, S. Balakrishnan, C. Venkatraman",
    location: "Digha Coast, West Bengal",
    filename: "3. Irrawaddy dolphin (Orcaella brevirostris) washed ashore on Digha coast, West Bengal, India.pdf",
    pdfUrl: "/PDFs/3.%20Irrawaddy%20dolphin%20(Orcaella%20brevirostris)%20washed%20ashore%20on%20Digha%20coast%2C%20West%20Bengal%2C%20India.pdf",
    description: "Morphological inspection and stranding record of an endangered male Irrawaddy dolphin along the Digha coast."
  },
  {
    id: "pdf-4",
    title: "Rare Occurrence of a Mushroom Coral Cycloseris cyclolites (Lamarck, 1801) in Gulf of Mannar",
    category: "Corals & Black Corals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, C. Venkatraman, S. Geetha, R. Sornaraj",
    location: "Gulf of Mannar, Tamil Nadu",
    filename: "4. A report on rare occurrence of a mushroom coral Cycloseris cyclolites (Lamarck, 1801) in Gulf of Mannar, India..pdf",
    pdfUrl: "/PDFs/4.%20A%20report%20on%20rare%20occurrence%20of%20a%20mushroom%20coral%20Cycloseris%20cyclolites%20(Lamarck%2C%201801)%20in%20Gulf%20of%20Mannar%2C%20India..pdf",
    description: "Re-discovery of the free-living solitary mushroom coral Cycloseris cyclolites in the Gulf of Mannar reef after 29 years."
  },
  {
    id: "pdf-5",
    title: "Two New Records of Dendronephthya Octocorals (Family Nephtheidae) from Andaman and Nicobar Islands",
    category: "Octocorals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, S. Geetha, C. Raghunathan, R. Sornaraj",
    location: "Andaman & Nicobar Islands",
    filename: "5. Two new records of Dendronephthya octocorals (Family Nephtheidae) from Andaman and Nicobar Islands, India..pdf",
    pdfUrl: "/PDFs/5.%20Two%20new%20records%20of%20Dendronephthya%20octocorals%20(Family%20Nephtheidae)%20from%20Andaman%20and%20Nicobar%20Islands%2C%20India..pdf",
    description: "First zoogeographical reporting of soft carnation corals Dendronephthya mucronata and Dendronephthya savignyi in Indian marine waters."
  },
  {
    id: "pdf-6",
    title: "Mutualistic Interactions of Polychaete, Barnacles, Mollusc and Sea Anemone with Hermit Crab",
    category: "Invertebrates",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "S. Balakrishnan, P. Santhanam, P.C. Tudu, J S Yogesh Kumar, A. Mohapatra",
    location: "Bay of Bengal, West Bengal Coast",
    filename: "6. Mutualistic interactions of polychaete, barnacles, mollusc and sea anemone with hermit crab.pdf",
    pdfUrl: "/PDFs/6.%20Mutualistic%20interactions%20of%20polychaete%2C%20barnacles%2C%20mollusc%20and%20sea%20anemone%20with%20hermit%20crab.pdf",
    description: "Symbiotic relationship analysis between subtidal hermit crabs and epibiontic sea anemones, polychaetes, and acorn barnacles."
  },
  {
    id: "pdf-7",
    title: "Morphometry of the Dugong Dugon (Müller, 1776) Skeleton Based on Indian Museum Specimens, Kolkata",
    category: "Marine Mammals & Turtles",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, M. Kamalakannan, C. Venkatraman",
    location: "ZSI Kolkata / Indian Museum",
    filename: "7. Morphometry of the Dugong Dugon (Muller, 1776) skeleton based on Indian Museum specimens, Kolkata, India.pdf",
    pdfUrl: "/PDFs/7.%20Morphometry%20of%20the%20Dugong%20Dugon%20(Muller%2C%201776)%20skeleton%20based%20on%20Indian%20Museum%20specimens%2C%20Kolkata%2C%20India.pdf",
    description: "Detailed osteological and craniometric assessment of 4 Dugong dugon skeletons preserved in the National Zoological Collection."
  },
  {
    id: "pdf-8",
    title: "New Report of Melithaea delicata Hickson, 1905 (Subclass Octocorallia) from Little Andaman Island",
    category: "Octocorals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, S. Geetha, C. Raghunathan, R. Sornaraj",
    location: "Little Andaman Island",
    filename: "8. New report of Melithaea delicata Hickson, 1905 (Subclass Octocorallia) from Little Andaman Island, India.pdf",
    pdfUrl: "/PDFs/8.%20New%20report%20of%20Melithaea%20delicata%20Hickson%2C%201905%20(Subclass%20Octocorallia)%20from%20Little%20Andaman%20Island%2C%20India.pdf",
    description: "Taxonomic analysis and sclerite micro-structure documentation of the newly recorded sea fan Melithaea delicata."
  },
  {
    id: "pdf-9",
    title: "Diversity and Distribution of Shallow Water Octocorallia from Mahatma Gandhi Marine National Park",
    category: "Octocorals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, S. Geetha, C. Raghunathan, R. Sornaraj",
    location: "MGMNP, South Andaman",
    filename: "9. Diversity and distribution of shallow water octocorallia from Mahatma Gandhi Marine National Park, South Andaman, India.pdf",
    pdfUrl: "/PDFs/9.%20Diversity%20and%20distribution%20of%20shallow%20water%20octocorallia%20from%20Mahatma%20Gandhi%20Marine%20National%20Park%2C%20South%20Andaman%2C%20India.pdf",
    description: "Line Intercept Transect SCUBA assessment across 11 island sites recording spatial octocoral cover and cluster similarity."
  },
  {
    id: "pdf-10",
    title: "New Report of Melithaea retifera (Lamarck, 1816) from Andaman and Nicobar Islands, India",
    category: "Octocorals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, S. Geetha, C. Raghunathan, R. Sornaraj",
    location: "Havelock & Shark Islands, Andaman",
    filename: "10. New report of Melithaea retifera (Lamarck, 1816) from Andaman and Nicobar Island, India.pdf",
    pdfUrl: "/PDFs/10.%20New%20report%20of%20Melithaea%20retifera%20(Lamarck%2C%201816)%20from%20Andaman%20and%20Nicobar%20Island%2C%20India.pdf",
    description: "First photographic and morphological documentation of the reticulated sea fan Melithaea retifera from Havelock & Shark Islands."
  },
  {
    id: "pdf-11",
    title: "New Records of Opisthobranchs (Mollusca: Gastropoda) from Gulf of Mannar, India",
    category: "Sea Slugs & Molluscs",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2019",
    authors: "J S Yogesh Kumar, C. Venkatraman, S. Shrinivaasu, C. Raghunathan",
    location: "Gulf of Mannar Biosphere Reserve",
    filename: "11. New records of Opisthobranchs (Mollusca Gastropoda) from Gulf of Mannar, India.pdf",
    pdfUrl: "/PDFs/11.%20New%20records%20of%20Opisthobranchs%20(Mollusca%20Gastropoda)%20from%20Gulf%20of%20Mannar%2C%20India.pdf",
    description: "Field survey uncovering 8 newly recorded sea slug species (Goniobranchus, Aplysia, Dendrodoris) in the Gulf of Mannar."
  },
  {
    id: "pdf-17",
    title: "Diversity and Distribution of Orthoptera Fauna in Lothian Island Wildlife Sanctuary, Sunderbans",
    category: "Invertebrates",
    journal: "Records of the Zoological Survey of India",
    year: "2020",
    authors: "J S Yogesh Kumar, et al.",
    location: "Lothian Island, Sunderbans, West Bengal",
    filename: "17. Diversity and Distribution of Orthoptera fauna in Lothian Island Wildlife Sanctuary, Sunderban Biosphere Reserve, West Bengal.pdf",
    pdfUrl: "/PDFs/17.%20Diversity%20and%20Distribution%20of%20Orthoptera%20fauna%20in%20Lothian%20Island%20Wildlife%20Sanctuary%2C%20Sunderban%20Biosphere%20Reserve%2C%20West%20Bengal.pdf",
    description: "Entomological assessment of grasshopper and cricket fauna across mangrove habitats of Lothian Island Sanctuary."
  },
  {
    id: "pdf-19",
    title: "Diversity and Distribution of Scleractinian Corals from Mandapam Group of Islands, Gulf of Mannar",
    category: "Corals & Black Corals",
    journal: "International Journal of Fisheries and Aquatic Studies",
    year: "2021",
    authors: "J S Yogesh Kumar, C. Raghunathan, S. Geetha, C. Venkatraman",
    location: "Mandapam Islands, Gulf of Mannar",
    filename: "19. Diversity and distribution of scleractinian corals from Mandapam group of Islands in Gulf of Mannar Marine National Park, South East coast of India.pdf",
    pdfUrl: "/PDFs/19.%20Diversity%20and%20distribution%20of%20scleractinian%20corals%20from%20Mandapam%20group%20of%20Islands%20in%20Gulf%20of%20Mannar%20Marine%20National%20Park%2C%20South%20East%20coast%20of%20India.pdf",
    description: "Quantitative assessment of hard coral species richness and percent benthic cover across 7 islands in the Mandapam group."
  },
  {
    id: "pdf-20",
    title: "New Distribution Record of Heterobranchs from Keelakarai Coast, Gulf of Mannar, India",
    category: "Sea Slugs & Molluscs",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2021",
    authors: "J S Yogesh Kumar, C. Venkatraman, C. Raghunathan",
    location: "Keelakarai Islands, Gulf of Mannar",
    filename: "20. New distribution record of Heterobranchs (Mollusca Gastropoda) from Keelakarai Coast, Gulf of Mannar, India.pdf",
    pdfUrl: "/PDFs/20.%20New%20distribution%20record%20of%20Heterobranchs%20(Mollusca%20Gastropoda)%20from%20Keelakarai%20Coast%2C%20Gulf%20of%20Mannar%2C%20India.pdf",
    description: "SCUBA survey reporting 20 species of sea slugs from subtidal reefs, including 8 first-ever records for the Keelakarai region."
  },
  {
    id: "pdf-21",
    title: "Range Extension of Filifusus manuelae (Bozzetti, 2008) to Indian Waters",
    category: "Sea Slugs & Molluscs",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2021",
    authors: "P.C. Tudu, J S Yogesh Kumar, C. Venkatraman",
    location: "Mandapam Islands, Gulf of Mannar",
    filename: "21. Range extension of Filifusus manuelae (Bozzetti, 2008) (Neogastropoda Fasciolariidae) to Indian Waters.pdf",
    pdfUrl: "/PDFs/21.%20Range%20extension%20of%20Filifusus%20manuelae%20(Bozzetti%2C%202008)%20(Neogastropoda%20Fasciolariidae)%20to%20Indian%20Waters.pdf",
    description: "First record of the spindle snail Filifusus manuelae in Indian oceanic waters, previously known only from Madagascar."
  },
  {
    id: "pdf-23",
    title: "New Distribution Record of Horn Coral Caryophyllia grandis from Karnataka Coast, India",
    category: "Corals & Black Corals",
    journal: "Journal of Threatened Taxa",
    year: "2021",
    authors: "J S Yogesh Kumar, C. Raghunathan",
    location: "Karnataka Coast / FORV Sagar Sampada Cruise 374",
    filename: "23. A new distribution record of the Horn Coral CaryophylliagrandisGardiner& Waugh, 1938 (Anthozoa Scleractinia) from the Karnataka coast, India.pdf",
    pdfUrl: "/PDFs/23.%20A%20new%20distribution%20record%20of%20the%20Horn%20Coral%20CaryophylliagrandisGardiner%26%20Waugh%2C%201938%20(Anthozoa%20Scleractinia)%20from%20the%20Karnataka%20coast%2C%20India.pdf",
    description: "Deep-sea coral exploration aboard FORV Sagar Sampada collecting Caryophyllia grandis at 200m+ depth off Karnataka."
  },
  {
    id: "pdf-55",
    title: "Range Extension of Snowflake Soft Coral Carijoa riisei along Digha Coast, West Bengal",
    category: "Octocorals",
    journal: "Journal of the Marine Biological Association of India",
    year: "2023",
    authors: "J S Yogesh Kumar, C. Raghunathan, P. Mahapatra, A. Sen",
    location: "Digha Coast, West Bengal",
    filename: "55. Range extension of Snowflake soft coral, Carijoa riisei (Octocorallia Alcyonacea) along Digha Coast, West Bengal, India.pdf",
    pdfUrl: "/PDFs/55.%20Range%20extension%20of%20Snowflake%20soft%20coral%2C%20Carijoa%20riisei%20(Octocorallia%20Alcyonacea)%20along%20Digha%20Coast%2C%20West%20Bengal%2C%20India.pdf",
    description: "First documentation of the invasive/re-colonizing snowflake octocoral Carijoa riisei along the northern Bay of Bengal."
  },
  {
    id: "pdf-62",
    title: "Shallow Water Sea Slugs (Gastropoda: Heterobranchia) from Andhra Pradesh, India",
    category: "Sea Slugs & Molluscs",
    journal: "Nusantara Bioscience",
    year: "2024",
    authors: "J S Yogesh Kumar, A. Sen, C. Raghunathan, C. Venkatraman",
    location: "Visakhapatnam & Chintapalli, Andhra Pradesh",
    filename: "62. Shallow water sea slugs (Gastropoda Heterobranchia) from Andhra Pradesh, India.pdf",
    pdfUrl: "/PDFs/62.%20Shallow%20water%20sea%20slugs%20(Gastropoda%20Heterobranchia)%20from%20Andhra%20Pradesh%2C%20India.pdf",
    description: "Comprehensive survey discovering 19 heterobranch sea slug species across 10 genera along the rocky reefs of Andhra Pradesh."
  },
  {
    id: "pdf-andhra-fish",
    title: "Notes on Some Newly Recorded Fish from Andhra Pradesh Coast, India",
    category: "Reef Fishes & Seahorses",
    journal: "Journal of Fisheries",
    year: "2024",
    authors: "J S Yogesh Kumar, A. Sen, C. Raghunathan",
    location: "Andhra Pradesh Coast",
    filename: "Andhra fish JoF 2024 (1).pdf",
    pdfUrl: "/PDFs/Andhra%20fish%20JoF%202024%20(1).pdf",
    description: "Taxonomic record of 11 newly recorded teleost fish species (Pomacentridae, Holocentridae, Labridae) off Visakhapatnam."
  },
  {
    id: "pdf-biofouling",
    title: "Experimental Investigation on Biofouling Marine Bryozoans in Coral Reefs",
    category: "Oceanography & Ecology",
    journal: "Discover Oceans (Springer Nature)",
    year: "2026",
    authors: "M.S. Sanjay, C. Venkatraman, A. Sen, J S Yogesh Kumar",
    location: "Gulf of Mannar Reefs",
    filename: "Biofouling - Gulf of Mannar - April 2026.pdf",
    pdfUrl: "/PDFs/Biofouling%20-%20Gulf%20of%20Mannar%20-%20April%202026.pdf",
    description: "Field experiment using ceramic and tile immersion panels assessing marine biofouling bryozoans (Parasmittina & Celleporaria)."
  },
  {
    id: "pdf-black-coral-gom",
    title: "New Records of Cirrhipathes (Order Antipatharia) for Gulf of Mannar Marine Biosphere Reserve",
    category: "Corals & Black Corals",
    journal: "National Academy Science Letters",
    year: "2025",
    authors: "J S Yogesh Kumar, A. Sen, P. Panda, C. Raghunathan",
    location: "Keelakarai, Gulf of Mannar",
    filename: "Black coral - GoM.pdf",
    pdfUrl: "/PDFs/Black%20coral%20-%20GoM.pdf",
    description: "Morphological and underwater description of black whip corals Cirrhipathes spiralis and Cirrhipathes anguina in Gulf of Mannar."
  },
  {
    id: "pdf-christmas-worm",
    title: "Taxonomy and Ecology of Christmas Tree Worm Spirobranchus giganteus in Live Porites Heads",
    category: "Invertebrates",
    journal: "Monograph Manuscript",
    year: "2023",
    authors: "J S Yogesh Kumar, A. Sen, et al.",
    location: "Andaman & Gulf of Mannar",
    filename: "Chrishmas Tree Worm Manuscript.pdf",
    pdfUrl: "/PDFs/Chrishmas%20Tree%20Worm%20Manuscript.pdf",
    description: "Detailed manuscript with high-resolution plates documenting polychaete worm symbiosis inside hard coral heads."
  },
  {
    id: "pdf-coral-springer",
    title: "Exploring India’s Coral Reefs: Biodiversity, Threats, Conservation, Restoration, and Monitoring",
    category: "Oceanography & Ecology",
    journal: "Springer Nature Book Chapter",
    year: "2025",
    authors: "C. Sivaperuman, J S Yogesh Kumar, R. Uma Maheswari, K. Sivakumar",
    location: "Pan-India Coral Reef Ecosystems",
    filename: "Coral - Springer Nature.pdf",
    pdfUrl: "/PDFs/Coral%20-%20Springer%20Nature.pdf",
    description: "Major book chapter detailing biodiversity trends, coral bleaching, restoration protocols, and remote monitoring in India."
  },
  {
    id: "pdf-corals-visakha",
    title: "Diversity and Distribution of Coral Community from Visakhapatnam Coast, Andhra Pradesh",
    category: "Corals & Black Corals",
    journal: "Journal of Coastal Environment",
    year: "2025",
    authors: "J S Yogesh Kumar, A. Sen, P. Panda, C. Raghunathan",
    location: "Visakhapatnam Coast, Andhra Pradesh",
    filename: "Corals Visakhapatnam.pdf",
    pdfUrl: "/PDFs/Corals%20Visakhapatnam.pdf",
    description: "Benthic survey documenting Porites, Favids, and Tubastrea coral communities along the rocky coastline of Visakhapatnam."
  },
  {
    id: "pdf-dugong-west",
    title: "Observation of Endangered Marine Mammal (Dugong dugon) Along the West Coast of India",
    category: "Marine Mammals & Turtles",
    journal: "Journal of Marine Biological Association",
    year: "2013",
    authors: "J S Yogesh Kumar, V.T. Naseef, D. Thiyagarajan, K. Venkataraman",
    location: "Mithapur / Gulf of Kachchh",
    filename: "Dugong.pdf",
    pdfUrl: "/PDFs/Dugong.pdf",
    description: "Stranding log and anatomical inspection of a 2.85m female Dugong dugon retrieved off the Mithapur coast."
  },
  {
    id: "pdf-gorgonian-andaman",
    title: "Gorgonians (Octocorallia) of Andaman and Nicobar Islands: Taxonomic Evaluation",
    category: "Octocorals",
    journal: "ZSI Special Publication Monograph",
    year: "2014",
    authors: "J S Yogesh Kumar, C. Raghunathan, R. Raghuraman, K. Venkataraman",
    location: "Andaman & Nicobar Archipelago",
    filename: "Gorgonian from Andaman and Nicobar.pdf",
    pdfUrl: "/PDFs/Gorgonian%20from%20Andaman%20and%20Nicobar.pdf",
    description: "Comprehensive 51-species monograph on shallow-water Gorgonians including 44 new records for Indian seas."
  },
  {
    id: "pdf-hippocampus",
    title: "New Distributional Record of Seahorse Hippocampus montebelloensis in Indian Waters",
    category: "Reef Fishes & Seahorses",
    journal: "Indian Journal of Fisheries",
    year: "2018",
    authors: "J S Yogesh Kumar, et al.",
    location: "Gulf of Mannar Reefs",
    filename: "HIPPOCAMPUS MONTEBELLOENSIS.pdf",
    pdfUrl: "/PDFs/HIPPOCAMPUS%20MONTEBELLOENSIS.pdf",
    description: "Morphological details and habitat notes on the rare Montebello seahorse recorded in seagrass beds."
  },
  {
    id: "pdf-octocoral-antiox",
    title: "Determination of Antiacetylecholinestrasic and Antioxidant Properties from Octocorals of A&N",
    category: "Octocorals",
    journal: "Cahiers de Biologie Marine",
    year: "2025",
    authors: "J S Yogesh Kumar, N. Sahu, A. Sen, C. Raghunathan",
    location: "Andaman & Nicobar Islands",
    filename: "Octocoral - Antioxidant.pdf",
    pdfUrl: "/PDFs/Octocoral%20-%20Antioxidant.pdf",
    description: "Biochemical analysis testing DPPH radical scavenging and acetylcholinesterase inhibition in soft coral tissue extracts."
  },
  {
    id: "pdf-octocorals-digha",
    title: "New Records of Soft Corals (Cnidaria: Octocorallia) at Digha and Adjacent Areas, West Bengal",
    category: "Octocorals",
    journal: "Indian Journal of Geo-Marine Sciences",
    year: "2024",
    authors: "J S Yogesh Kumar",
    location: "Digha Coast, West Bengal",
    filename: "Octocorals from West Bengal - IJMS.pdf",
    pdfUrl: "/PDFs/Octocorals%20from%20West%20Bengal%20-%20IJMS.pdf",
    description: "Benthic survey recording 16 soft coral species along Digha, including 12 previously unrecorded octocorals for West Bengal."
  },
  {
    id: "pdf-polymorphism",
    title: "Polymorphism in Umbonium vestiarium (Linnaeus, 1758) from Sundarban Biosphere Reserve",
    category: "Sea Slugs & Molluscs",
    journal: "Molluscan Research (Taylor & Francis)",
    year: "2026",
    authors: "J S Yogesh Kumar, P. Rai, A. Sen",
    location: "Sundarban Biosphere Reserve, West Bengal",
    filename: "Polymorphism in Umbonium vestiarium  Linnaeus  1758  from the Sundarban Biosphere Reserve  morphological  morphometric and distributional analyses.pdf",
    pdfUrl: "/PDFs/Polymorphism%20in%20Umbonium%20vestiarium%20%20Linnaeus%20%201758%20%20from%20the%20Sundarban%20Biosphere%20Reserve%20%20morphological%20%20morphometric%20and%20distributional%20analyses.pdf",
    description: "First quantitative morphological and morphometric analysis of shell color variation in the button snail Umbonium vestiarium in SBR."
  },
  {
    id: "pdf-sea-urchin-sunderban",
    title: "Rare Occurrence of Maretia planulata (Lamarck, 1816) from Sunderban Biosphere Reserve",
    category: "Invertebrates",
    journal: "National Academy Science Letters",
    year: "2026",
    authors: "J S Yogesh Kumar, A. Sen, P. Rai, C. Raghunathan",
    location: "Sundarban Mangrove Estuary",
    filename: "Sea Urchin - Sunderbans - April 2026.pdf",
    pdfUrl: "/PDFs/Sea%20Urchin%20-%20Sunderbans%20-%20April%202026.pdf",
    description: "Discovery of the heart sea urchin Maretia planulata inhabiting estuarine soft-sediment mudflats of the Sunderbans."
  },
  {
    id: "pdf-shipwreck-gom",
    title: "An Assessment of Faunal Diversity and its Conservation in Shipwrecks in Indian Seas",
    category: "Shipwrecks",
    journal: "ZSI Special Publication Chapter 25",
    year: "2015",
    authors: "J S Yogesh Kumar, S. Geetha, C. Raghunathan, K. Venkataraman",
    location: "Gulf of Mannar & Nicobar Shipwrecks",
    filename: "Shipwreck GOM.pdf",
    pdfUrl: "/PDFs/Shipwreck%20GOM.pdf",
    description: "Underwater ecological documentation of artificial reef creation and bio-fouling assemblages on historical sunken shipwrecks."
  },
  {
    id: "pdf-tubipora-lakshadweep",
    title: "New Distribution Record of Tubipora musica (Octocorallia: Tubiporidae) from Lakshadweep",
    category: "Octocorals",
    journal: "National Academy Science Letters",
    year: "2026",
    authors: "J S Yogesh Kumar",
    location: "Kadmat Island, Lakshadweep",
    filename: "Tubipora musica - Lakshadweep - April 2026.pdf",
    pdfUrl: "/PDFs/Tubipora%20musica%20-%20Lakshadweep%20-%20April%202026.pdf",
    description: "First record of the organ pipe coral Tubipora musica off Kadmat Island, detailing sclerite structures and zoogeography."
  },
  {
    id: "pdf-turtle-sunderban",
    title: "Red-eared Slider from Indian Sunderban: A Rising Threat over Indigenous Biodiversity",
    category: "Marine Mammals & Turtles",
    journal: "National Academy Science Letters",
    year: "2024",
    authors: "J S Yogesh Kumar, A. Sen, P. Rai, K. Deuti",
    location: "Sunderban Biosphere Reserve",
    filename: "Turtle - Sunderbans.pdf",
    pdfUrl: "/PDFs/Turtle%20-%20Sunderbans.pdf",
    description: "Alert report on invasive alien turtle species Trachemys scripta elegans invading pristine mangrove aquatic habitats."
  },
  {
    id: "pdf-whale-shark",
    title: "Occurrence of Whale Sharks Along the Indian Coastline: Challenges and Conservation Efforts",
    category: "Reef Fishes & Seahorses",
    journal: "Species Journal",
    year: "2024",
    authors: "J S Yogesh Kumar, A. Sen, G. Arun, C. Raghunathan",
    location: "Visakhapatnam Coast, Andhra Pradesh",
    filename: "Whale Shark Paper - Visak.pdf",
    pdfUrl: "/PDFs/Whale%20Shark%20Paper%20-%20Visak.pdf",
    description: "Field observation of Rhincodon typus off Visakhapatnam with review of migration corridors and conservation strategies."
  },
  {
    id: "pdf-crab-gok",
    title: "Distribution of Marine Crabs from the Marine National Park, Gulf of Kachchh",
    category: "Invertebrates",
    journal: "Scholars Academic Journal of Biosciences",
    year: "2023",
    authors: "I. Beleem, J S Yogesh Kumar, Ch. Satyanarayana, R.D. Kamboj",
    location: "Marine National Park, Gulf of Kachchh",
    filename: "crab GOK.pdf",
    pdfUrl: "/PDFs/crab%20GOK.pdf",
    description: "Survey recording 22 brachyuran crab species across 42 reef islands and intertidal mudflats in the Gulf of Kachchh."
  }
];
