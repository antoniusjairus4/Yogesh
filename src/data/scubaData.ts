export interface ScubaPhoto {
  id: string;
  url: string;
  title: string;
  scientificName?: string;
  category: 'Corals' | 'Fauna' | 'Expeditions';
  location?: string;
  depth?: string;
  description: string;
}

export const SCUBA_PHOTOS: ScubaPhoto[] = [
  {
    id: 'photo-1',
    url: '/Images_gallery/Turtle from Visakhapatnam.jpg',
    title: 'Sea Turtle Coastal Encounter',
    scientificName: 'Cheloniidae sp.',
    category: 'Fauna',
    location: 'Visakhapatnam Coast',
    depth: '14m',
    description: 'A sea turtle glides gracefully through coastal waters off Visakhapatnam during an underwater species survey.'
  },
  {
    id: 'photo-2',
    url: '/Images_gallery/angelfish-blue ringed2.JPG',
    title: 'Blue-Ringed Angelfish',
    scientificName: 'Pomacanthus annularis',
    category: 'Fauna',
    location: 'Coral Reef Pinnacle',
    depth: '18m',
    description: 'Vibrant adult Pomacanthus annularis showcasing distinctive curved iridescent electric-blue body striping.'
  },
  {
    id: 'photo-3',
    url: '/Images_gallery/Acanthastrea regularis Veron, 2000,.JPG',
    title: 'Regular Star Coral',
    scientificName: 'Acanthastrea regularis (Veron, 2000)',
    category: 'Corals',
    location: 'Deep Reef Slope',
    depth: '22m',
    description: 'High-definition macro photograph documenting the dense calice structure and fleshy polyp tissues of Acanthastrea regularis.'
  },
  {
    id: 'photo-4',
    url: '/Images_gallery/Acanthogorgia spinosa Hiles, 1899.JPG',
    title: 'Spiny Gorgonian Sea Fan',
    scientificName: 'Acanthogorgia spinosa (Hiles, 1899)',
    category: 'Corals',
    location: 'Continental Shelf Drop-off',
    depth: '30m',
    description: 'Complex branching octocoral fan filtering nutrients along steep deep-water currents.'
  },
  {
    id: 'photo-5',
    url: '/Images_gallery/Annella reticulata (Ellis & Solander, 1786).JPG',
    title: 'Reticulated Sea Fan',
    scientificName: 'Annella reticulata (Ellis & Solander, 1786)',
    category: 'Corals',
    location: 'Deep Wall Survey Site',
    depth: '28m',
    description: 'Stunning crimson-hued reticulated sea fan documenting marine biodiversity along structural bathymetric walls.'
  },
  {
    id: 'photo-6',
    url: '/Images_gallery/Armina semperi.jpg',
    title: 'Striped Sea Nudibranch',
    scientificName: 'Armina semperi',
    category: 'Fauna',
    location: 'Sandy Benthic Zone',
    depth: '16m',
    description: 'Distinctive striped benthic nudibranch foraging along soft sediment layers.'
  },
  {
    id: 'photo-7',
    url: '/Images_gallery/Cavernularia pusilla (Philippi, 1835).JPG',
    title: 'Benthic Sea Pen',
    scientificName: 'Cavernularia pusilla (Philippi, 1835)',
    category: 'Corals',
    location: 'Soft Benthic Substratum',
    depth: '24m',
    description: 'Fascinating soft octocoral sea pen anchored into fine marine sands.'
  },
  {
    id: 'photo-8',
    url: '/Images_gallery/Cirrhipathes anguina (Dana, 1846).jpg',
    title: 'Wire Coral Spiral',
    scientificName: 'Cirrhipathes anguina (Dana, 1846)',
    category: 'Corals',
    location: 'Current-Swept Pinnacle',
    depth: '25m',
    description: 'Single-stem spiraling antipatharian wire coral stretching upward into oceanic upwelling zones.'
  },
  {
    id: 'photo-9',
    url: '/Images_gallery/Cirrhipathes contorta van Pesch, 1910.jpg',
    title: 'Contorted Wire Coral',
    scientificName: 'Cirrhipathes contorta (van Pesch, 1910)',
    category: 'Corals',
    location: 'Submerged Seamount',
    depth: '32m',
    description: 'Coiled black whip coral displaying dense arrays of feeding polyps.'
  },
  {
    id: 'photo-10',
    url: '/Images_gallery/Cladiella australis (Macfadyen, 1936) a.JPG',
    title: 'Blubber Soft Coral',
    scientificName: 'Cladiella australis (Macfadyen, 1936)',
    category: 'Corals',
    location: 'Fringing Coral Reef',
    depth: '12m',
    description: 'Expansive soft coral colony of Cladiella australis with fully extended feeding tentacles.'
  },
  {
    id: 'photo-11',
    url: '/Images_gallery/Comanthus parvicirrus.JPG',
    title: 'Feather Star Crinoid',
    scientificName: 'Comanthus parvicirrus',
    category: 'Fauna',
    location: 'Upper Reef Crest',
    depth: '10m',
    description: 'Feather star (crinoid) anchored atop a coral head with arrayed pinnules capturing suspended organic micro-particles.'
  },
  {
    id: 'photo-12',
    url: '/Images_gallery/Dendronephthya persica.JPG',
    title: 'Persian Carnation Coral',
    scientificName: 'Dendronephthya persica',
    category: 'Corals',
    location: 'Rocky Reef Ledge',
    depth: '26m',
    description: 'Bioluminescent-like translucent pink soft carnation coral displaying calcium carbonate spicules.'
  },
  {
    id: 'photo-13',
    url: '/Images_gallery/Dendrophyllia sp (1).JPG',
    title: 'Sun Cup Coral',
    scientificName: 'Dendrophyllia sp.',
    category: 'Corals',
    location: 'Shaded Overhang',
    depth: '20m',
    description: 'Non-photosynthetic stony cup coral colony with vibrant golden tentacles expanded for nocturnal feeding.'
  },
  {
    id: 'photo-14',
    url: '/Images_gallery/Halgerda tessellata (Bergh, 1880).JPG',
    title: 'Tessellated Nudibranch',
    scientificName: 'Halgerda tessellata (Bergh, 1880)',
    category: 'Fauna',
    location: 'Coral Rubble Zone',
    depth: '15m',
    description: 'Geometric-patterned sea slug showcasing bright warning coloration and firm mantle ridges.'
  },
  {
    id: 'photo-15',
    url: '/Images_gallery/Melithaea caledonica (Grasshoff, 1999).JPG',
    title: 'Caledonian Gorgonian Fan',
    scientificName: 'Melithaea caledonica (Grasshoff, 1999)',
    category: 'Corals',
    location: 'Oceanic Drop-Off',
    depth: '34m',
    description: 'Deep crimson gorgonian octocoral branching across hard substrata on an offshore seamount.'
  },
  {
    id: 'photo-16',
    url: '/Images_gallery/Montipora florida Nemenzo, 1967 (2).jpg',
    title: 'Pore Plate Coral',
    scientificName: 'Montipora florida (Nemenzo, 1967)',
    category: 'Corals',
    location: 'Mid-Reef Platform',
    depth: '14m',
    description: 'Foliose stony coral plate providing shelter and micro-habitat for reef invertebrates.'
  },
  {
    id: 'photo-17',
    url: '/Images_gallery/Narcine entemedor  Jordan &  Starks,  1895 (1).JPG',
    title: 'Giant Electric Ray',
    scientificName: 'Narcine entemedor (Jordan & Starks, 1895)',
    category: 'Fauna',
    location: 'Benthic Sand Flat',
    depth: '18m',
    description: 'Rare sighting of a numbfish / electric ray resting seamlessly camouflaged against coarse seabed sediment.'
  },
  {
    id: 'photo-18',
    url: '/Images_gallery/Phyllidia ocellata Cuvier, 1804.JPG',
    title: 'Ocellated Nudibranch',
    scientificName: 'Phyllidia ocellata (Cuvier, 1804)',
    category: 'Fauna',
    location: 'Sponge Habitat',
    depth: '12m',
    description: 'Striking golden and black sea slug with distinct raised dorsal tubercles.'
  },
  {
    id: 'photo-19',
    url: '/Images_gallery/Spirobranchus giganteus (Pallas, 1766).JPG',
    title: 'Christmas Tree Worm',
    scientificName: 'Spirobranchus giganteus (Pallas, 1766)',
    category: 'Fauna',
    location: 'Massive Porites Coral',
    depth: '9m',
    description: 'Pair of spiral radioles of a Christmas tree polychaete worm embedded inside live hard coral head.'
  },
  {
    id: 'photo-20',
    url: '/Images_gallery/Stichopathes solorensis van Pesch, 1914.jpg',
    title: 'Black Whip Coral',
    scientificName: 'Stichopathes solorensis (van Pesch, 1914)',
    category: 'Corals',
    location: 'Deep Slope Habitat',
    depth: '38m',
    description: 'Elongated black whip coral extending into open water column along deep oceanic currents.'
  },
  {
    id: 'photo-21',
    url: '/Images_gallery/DSC00540.JPG',
    title: 'Reef Biodiversity Survey',
    category: 'Expeditions',
    location: 'Marine Sanctuary Zone',
    depth: '15m',
    description: 'Underwater documentation surveying complex coral reef architecture and associated marine life.'
  },
  {
    id: 'photo-22',
    url: '/Images_gallery/DSC00996.JPG',
    title: 'Submerged Coral Pinnacle',
    category: 'Expeditions',
    location: 'Offshore Reef Apex',
    depth: '18m',
    description: 'Wide-angle capture of a healthy submerged coral pinnacle teeming with reef fish and invertebrates.'
  },
  {
    id: 'photo-23',
    url: '/Images_gallery/DSC03389.JPG',
    title: 'Deep Reef Ecosystem Mapping',
    category: 'Expeditions',
    location: 'Benthic Mapping Transect',
    depth: '22m',
    description: 'Scientific underwater transect assessment recording benthic coral cover and substrate health.'
  },
  {
    id: 'photo-24',
    url: '/Images_gallery/DSC03435.JPG',
    title: 'Coral Colony Assessment',
    category: 'Expeditions',
    location: 'Marine Protected Area',
    depth: '19m',
    description: 'Close inspection of hard and soft coral colonies during routine marine ecology surveys.'
  },
  {
    id: 'photo-25',
    url: '/Images_gallery/DSC06790.JPG',
    title: 'Submerged Habitats & Fauna',
    category: 'Expeditions',
    location: 'Island Archipelago Waters',
    depth: '27m',
    description: 'Rich underwater habitat featuring gorgonians, sponges, and schooling marine organisms.'
  },
  {
    id: 'photo-26',
    url: '/Images_gallery/DSC09721.JPG',
    title: 'Deep Ocean Subsurface Expedition',
    category: 'Expeditions',
    location: 'Outer Wall Drop-Off',
    depth: '35m',
    description: 'High-contrast deep water dive recording pristine benthic assemblages.'
  },
  {
    id: 'photo-27',
    url: '/Images_gallery/DSCN1156.JPG',
    title: 'Benthic Marine Transect',
    category: 'Expeditions',
    location: 'Coastal Coral Slope',
    depth: '14m',
    description: 'Detailed photographic log of coastal benthic substrate composition and sessile fauna.'
  },
  {
    id: 'photo-28',
    url: '/Images_gallery/DSCN1201.JPG',
    title: 'Macro Reef Life Observation',
    category: 'Expeditions',
    location: 'Shallow Patch Reef',
    depth: '11m',
    description: 'Macro focus capturing minute reef organisms dwelling among coral branches.'
  },
  {
    id: 'photo-29',
    url: '/Images_gallery/DSCN1253.JPG',
    title: 'Subsurface Coral Structural Survey',
    category: 'Expeditions',
    location: 'Reef Crest Transect',
    depth: '13m',
    description: 'Documentation of structural complexity and coral health indices.'
  },
  {
    id: 'photo-30',
    url: '/Images_gallery/DSCN1359.JPG',
    title: 'Marine Fauna & Benthos',
    category: 'Expeditions',
    location: 'Offshore Shoal',
    depth: '17m',
    description: 'Exploration of rocky reef substrate hosting encrusting corals and invertebrate fauna.'
  },
  {
    id: 'photo-31',
    url: '/Images_gallery/DSCN1405.JPG',
    title: 'Octocoral Reef Community',
    category: 'Corals',
    location: 'Current-Swept Slope',
    depth: '21m',
    description: 'Dense aggregation of soft corals and sea fans along an energetic current slope.'
  },
  {
    id: 'photo-32',
    url: '/Images_gallery/DSCN1444.JPG',
    title: 'Reef Slope Substrate Analysis',
    category: 'Expeditions',
    location: 'Deep Reef Slope',
    depth: '24m',
    description: 'Sampling frame recording live coral percentage vs macroalgal cover.'
  },
  {
    id: 'photo-33',
    url: '/Images_gallery/DSCN1475.JPG',
    title: 'Submerged Wall Documentation',
    category: 'Expeditions',
    location: 'Vertical Coral Wall',
    depth: '29m',
    description: 'Vertical wall dive revealing sea fans and encrusting sponges thriving in nutrient upwellings.'
  },
  {
    id: 'photo-34',
    url: '/Images_gallery/DSCN5887.JPG',
    title: 'Pristine Coral Sanctuary',
    category: 'Expeditions',
    location: 'Andaman & Nicobar Waters',
    depth: '16m',
    description: 'Untouched coral gardens documenting pristine condition across marine reserves.'
  },
  {
    id: 'photo-35',
    url: '/Images_gallery/DSCN5896.JPG',
    title: 'Massive Coral Structure',
    category: 'Corals',
    location: 'Deep Lagoon Passage',
    depth: '18m',
    description: 'Centuries-old massive brain coral colony providing key structural refuge.'
  },
  {
    id: 'photo-36',
    url: '/Images_gallery/DSCN5911.JPG',
    title: 'Macro Benthic Details',
    category: 'Expeditions',
    location: 'Coral Rubble Field',
    depth: '15m',
    description: 'Close inspection of cryptofauna inhabiting structural interstitial coral spaces.'
  },
  {
    id: 'photo-37',
    url: '/Images_gallery/DSCN5932.JPG',
    title: 'Oceanic Reef Slope Survey',
    category: 'Expeditions',
    location: 'Outer Barrier Reef',
    depth: '25m',
    description: 'Surveying outer barrier reef slope under crystal clear tropical waters.'
  },
  {
    id: 'photo-38',
    url: '/Images_gallery/DSCN7220.JPG',
    title: 'Bioluminescent Reef Haven',
    category: 'Expeditions',
    location: 'Deep Reef Drop-off',
    depth: '30m',
    description: 'High-resolution field documentation capturing deep water octocorals and benthic life.'
  },
  {
    id: 'photo-39',
    url: '/Images_gallery/G0140863.JPG',
    title: 'Action Underwater Exploration',
    category: 'Expeditions',
    location: 'Active Dive Site',
    depth: '17m',
    description: 'Scuba dive survey action photo documenting specimen collection and photographic recording.'
  },
  {
    id: 'photo-40',
    url: '/Images_gallery/IMG_0324.JPG',
    title: 'Marine Ecosystem Survey',
    category: 'Expeditions',
    location: 'Fringing Reef Zone',
    depth: '12m',
    description: 'Observational scientific diving recording fish species richness and benthic cover.'
  },
  {
    id: 'photo-41',
    url: '/Images_gallery/IMG_2271.JPG',
    title: 'Subsurface Exploration Log',
    category: 'Expeditions',
    location: 'Coastal Water Reserve',
    depth: '14m',
    description: 'Scientific field log photo documenting habitat parameters during routine monitoring.'
  },
  {
    id: 'photo-42',
    url: '/Images_gallery/IMG_3031.JPG',
    title: 'Submerged Pinnacle Habitat',
    category: 'Expeditions',
    location: 'Submerged Pinnacle',
    depth: '20m',
    description: 'Expansive view of a isolated underwater pinnacle attracting pelagic species.'
  },
  {
    id: 'photo-43',
    url: '/Images_gallery/IMG_3108.JPG',
    title: 'Tropical Reef Canopy',
    category: 'Corals',
    location: 'Shallow Reef Crest',
    depth: '8m',
    description: 'Sunlight filtering through clear surface waters onto branching hard coral canopies.'
  },
  {
    id: 'photo-44',
    url: '/Images_gallery/IMG_8791.jpg',
    title: 'Benthic Species Macro Log',
    category: 'Fauna',
    location: 'Deep Sand Patch',
    depth: '22m',
    description: 'Macro photographic record of cryptic seabed fauna.'
  },
  {
    id: 'photo-45',
    url: '/Images_gallery/IMG_9468.jpg',
    title: 'Deep Ocean Coral Survey',
    category: 'Corals',
    location: 'Deep Shelf Transect',
    depth: '31m',
    description: 'Scientific imaging of rare deep-water coral specimens in their native habitat.'
  },
  {
    id: 'photo-46',
    url: '/Images_gallery/20230921_092319.jpg',
    title: 'Field Dive Operation 2023',
    category: 'Expeditions',
    location: 'National Marine Survey Site',
    depth: '19m',
    description: 'Modern SCUBA research expedition documenting marine life in real-time.'
  },
  {
    id: 'photo-47',
    url: '/Images_gallery/236_3628.JPG',
    title: 'Invertebrate Habitat Record',
    category: 'Fauna',
    location: 'Reef Crevice',
    depth: '13m',
    description: 'Focusing on crevice-dwelling crustaceans and echinoderms.'
  }
];
