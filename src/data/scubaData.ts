import { getAssetUrl } from '../utils/baseUrl';

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

const RAW_SCUBA_PHOTOS: ScubaPhoto[] = [
  {
    id: 'photo-1',
    url: '/Images_gallery/Turtle from Visakhapatnam.webp',
    title: 'Sea Turtle Coastal Encounter',
    scientificName: 'Cheloniidae sp.',
    category: 'Fauna',
    location: 'Visakhapatnam Coast',
    depth: '14m',
    description: 'A sea turtle glides gracefully through coastal waters off Visakhapatnam during an underwater species survey.'
  },
  {
    id: 'photo-2',
    url: '/Images_gallery/angelfish-blue ringed2.webp',
    title: 'Blue-Ringed Angelfish',
    scientificName: 'Pomacanthus annularis',
    category: 'Fauna',
    location: 'Coral Reef Pinnacle',
    depth: '18m',
    description: 'Vibrant adult Pomacanthus annularis showcasing distinctive curved iridescent electric-blue body striping.'
  },
  {
    id: 'photo-3',
    url: '/Images_gallery/Acanthastrea regularis Veron, 2000,.webp',
    title: 'Regular Star Coral',
    scientificName: 'Acanthastrea regularis (Veron, 2000)',
    category: 'Corals',
    location: 'Deep Reef Slope',
    depth: '22m',
    description: 'High-definition macro photograph documenting the dense calice structure and fleshy polyp tissues of Acanthastrea regularis.'
  },
  {
    id: 'photo-4',
    url: '/Images_gallery/Acanthogorgia spinosa Hiles, 1899.webp',
    title: 'Spiny Gorgonian Sea Fan',
    scientificName: 'Acanthogorgia spinosa (Hiles, 1899)',
    category: 'Corals',
    location: 'Continental Shelf Drop-off',
    depth: '30m',
    description: 'Complex branching octocoral fan filtering nutrients along steep deep-water currents.'
  },
  {
    id: 'photo-5',
    url: '/Images_gallery/Annella reticulata (Ellis & Solander, 1786).webp',
    title: 'Reticulated Sea Fan',
    scientificName: 'Annella reticulata (Ellis & Solander, 1786)',
    category: 'Corals',
    location: 'Deep Wall Survey Site',
    depth: '28m',
    description: 'Stunning crimson-hued reticulated sea fan documenting marine biodiversity along structural bathymetric walls.'
  },
  {
    id: 'photo-6',
    url: '/Images_gallery/Armina semperi.webp',
    title: 'Striped Sea Nudibranch',
    scientificName: 'Armina semperi',
    category: 'Fauna',
    location: 'Sandy Benthic Zone',
    depth: '16m',
    description: 'Distinctive striped benthic nudibranch foraging along soft sediment layers.'
  },
  {
    id: 'photo-7',
    url: '/Images_gallery/Cavernularia pusilla (Philippi, 1835).webp',
    title: 'Benthic Sea Pen',
    scientificName: 'Cavernularia pusilla (Philippi, 1835)',
    category: 'Corals',
    location: 'Soft Benthic Substratum',
    depth: '24m',
    description: 'Fascinating soft octocoral sea pen anchored into fine marine sands.'
  },
  {
    id: 'photo-8',
    url: '/Images_gallery/Cirrhipathes anguina (Dana, 1846).webp',
    title: 'Wire Coral Spiral',
    scientificName: 'Cirrhipathes anguina (Dana, 1846)',
    category: 'Corals',
    location: 'Current-Swept Pinnacle',
    depth: '25m',
    description: 'Single-stem spiraling antipatharian wire coral stretching upward into oceanic upwelling zones.'
  },
  {
    id: 'photo-9',
    url: '/Images_gallery/Cirrhipathes contorta van Pesch, 1910.webp',
    title: 'Contorted Wire Coral',
    scientificName: 'Cirrhipathes contorta (van Pesch, 1910)',
    category: 'Corals',
    location: 'Submerged Seamount',
    depth: '32m',
    description: 'Coiled black whip coral displaying dense arrays of feeding polyps.'
  },
  {
    id: 'photo-10',
    url: '/Images_gallery/Cladiella australis (Macfadyen, 1936) a.webp',
    title: 'Blubber Soft Coral',
    scientificName: 'Cladiella australis (Macfadyen, 1936)',
    category: 'Corals',
    location: 'Fringing Coral Reef',
    depth: '12m',
    description: 'Expansive soft coral colony of Cladiella australis with fully extended feeding tentacles.'
  },
  {
    id: 'photo-11',
    url: '/Images_gallery/Comanthus parvicirrus.webp',
    title: 'Feather Star Crinoid',
    scientificName: 'Comanthus parvicirrus',
    category: 'Fauna',
    location: 'Upper Reef Crest',
    depth: '10m',
    description: 'Feather star (crinoid) anchored atop a coral head with arrayed pinnules capturing suspended organic micro-particles.'
  },
  {
    id: 'photo-12',
    url: '/Images_gallery/Dendronephthya persica.webp',
    title: 'Persian Carnation Coral',
    scientificName: 'Dendronephthya persica',
    category: 'Corals',
    location: 'Rocky Reef Ledge',
    depth: '26m',
    description: 'Bioluminescent-like translucent pink soft carnation coral displaying calcium carbonate spicules.'
  },
  {
    id: 'photo-13',
    url: '/Images_gallery/Dendrophyllia sp (1).webp',
    title: 'Sun Cup Coral',
    scientificName: 'Dendrophyllia sp.',
    category: 'Corals',
    location: 'Shaded Overhang',
    depth: '20m',
    description: 'Non-photosynthetic stony cup coral colony with vibrant golden tentacles expanded for nocturnal feeding.'
  },
  {
    id: 'photo-14',
    url: '/Images_gallery/Halgerda tessellata (Bergh, 1880).webp',
    title: 'Tessellated Nudibranch',
    scientificName: 'Halgerda tessellata (Bergh, 1880)',
    category: 'Fauna',
    location: 'Coral Rubble Zone',
    depth: '15m',
    description: 'Geometric-patterned sea slug showcasing bright warning coloration and firm mantle ridges.'
  },
  {
    id: 'photo-15',
    url: '/Images_gallery/Melithaea caledonica (Grasshoff, 1999).webp',
    title: 'Caledonian Gorgonian Fan',
    scientificName: 'Melithaea caledonica (Grasshoff, 1999)',
    category: 'Corals',
    location: 'Oceanic Drop-Off',
    depth: '34m',
    description: 'Deep crimson gorgonian octocoral branching across hard substrata on an offshore seamount.'
  },
  {
    id: 'photo-16',
    url: '/Images_gallery/Montipora florida Nemenzo, 1967 (2).webp',
    title: 'Pore Plate Coral',
    scientificName: 'Montipora florida (Nemenzo, 1967)',
    category: 'Corals',
    location: 'Mid-Reef Platform',
    depth: '14m',
    description: 'Foliose stony coral plate providing shelter and micro-habitat for reef invertebrates.'
  },
  {
    id: 'photo-17',
    url: '/Images_gallery/Narcine entemedor  Jordan &  Starks,  1895 (1).webp',
    title: 'Giant Electric Ray',
    scientificName: 'Narcine entemedor (Jordan & Starks, 1895)',
    category: 'Fauna',
    location: 'Benthic Sand Flat',
    depth: '18m',
    description: 'Rare sighting of a numbfish / electric ray resting seamlessly camouflaged against coarse seabed sediment.'
  },
  {
    id: 'photo-18',
    url: '/Images_gallery/Phyllidia ocellata Cuvier, 1804.webp',
    title: 'Ocellated Nudibranch',
    scientificName: 'Phyllidia ocellata (Cuvier, 1804)',
    category: 'Fauna',
    location: 'Sponge Habitat',
    depth: '12m',
    description: 'Striking golden and black sea slug with distinct raised dorsal tubercles.'
  },
  {
    id: 'photo-19',
    url: '/Images_gallery/Spirobranchus giganteus (Pallas, 1766).webp',
    title: 'Christmas Tree Worm',
    scientificName: 'Spirobranchus giganteus (Pallas, 1766)',
    category: 'Fauna',
    location: 'Massive Porites Coral',
    depth: '9m',
    description: 'Pair of spiral radioles of a Christmas tree polychaete worm embedded inside live hard coral head.'
  },
  {
    id: 'photo-20',
    url: '/Images_gallery/Stichopathes solorensis van Pesch, 1914.webp',
    title: 'Black Whip Coral',
    scientificName: 'Stichopathes solorensis (van Pesch, 1914)',
    category: 'Corals',
    location: 'Deep Slope Habitat',
    depth: '38m',
    description: 'Elongated black whip coral extending into open water column along deep oceanic currents.'
  },
  {
    id: 'photo-21',
    url: '/Images_gallery/DSC00540.webp',
    title: 'Reef Biodiversity Survey',
    category: 'Expeditions',
    location: 'Marine Sanctuary Zone',
    depth: '15m',
    description: 'Underwater documentation surveying complex coral reef architecture and associated marine life.'
  },
  {
    id: 'photo-22',
    url: '/Images_gallery/DSC00996.webp',
    title: 'Submerged Coral Pinnacle',
    category: 'Expeditions',
    location: 'Offshore Reef Apex',
    depth: '18m',
    description: 'Wide-angle capture of a healthy submerged coral pinnacle teeming with reef fish and invertebrates.'
  },
  {
    id: 'photo-23',
    url: '/Images_gallery/DSC03389.webp',
    title: 'Deep Reef Ecosystem Mapping',
    category: 'Expeditions',
    location: 'Benthic Mapping Transect',
    depth: '22m',
    description: 'Scientific underwater transect assessment recording benthic coral cover and substrate health.'
  },
  {
    id: 'photo-24',
    url: '/Images_gallery/DSC03435.webp',
    title: 'Coral Colony Assessment',
    category: 'Expeditions',
    location: 'Marine Protected Area',
    depth: '19m',
    description: 'Close inspection of hard and soft coral colonies during routine marine ecology surveys.'
  },
  {
    id: 'photo-25',
    url: '/Images_gallery/DSC06790.webp',
    title: 'Submerged Habitats & Fauna',
    category: 'Expeditions',
    location: 'Island Archipelago Waters',
    depth: '27m',
    description: 'Rich underwater habitat featuring gorgonians, sponges, and schooling marine organisms.'
  },
  {
    id: 'photo-27',
    url: '/Images_gallery/DSCN1156.webp',
    title: 'Benthic Marine Transect',
    category: 'Expeditions',
    location: 'Coastal Coral Slope',
    depth: '14m',
    description: 'Detailed photographic log of coastal benthic substrate composition and sessile fauna.'
  },
  {
    id: 'photo-28',
    url: '/Images_gallery/DSCN1201.webp',
    title: 'Macro Reef Life Observation',
    category: 'Expeditions',
    location: 'Shallow Patch Reef',
    depth: '11m',
    description: 'Macro focus capturing minute reef organisms dwelling among coral branches.'
  },
  {
    id: 'photo-29',
    url: '/Images_gallery/DSCN1253.webp',
    title: 'Subsurface Coral Structural Survey',
    category: 'Expeditions',
    location: 'Reef Crest Transect',
    depth: '13m',
    description: 'Documentation of structural complexity and coral health indices.'
  },
  {
    id: 'photo-30',
    url: '/Images_gallery/DSCN1359.webp',
    title: 'Marine Fauna & Benthos',
    category: 'Expeditions',
    location: 'Offshore Shoal',
    depth: '17m',
    description: 'Exploration of rocky reef substrate hosting encrusting corals and invertebrate fauna.'
  },
  {
    id: 'photo-31',
    url: '/Images_gallery/DSCN1405.webp',
    title: 'Octocoral Reef Community',
    category: 'Corals',
    location: 'Current-Swept Slope',
    depth: '21m',
    description: 'Dense aggregation of soft corals and sea fans along an energetic current slope.'
  },
  {
    id: 'photo-32',
    url: '/Images_gallery/DSCN1444.webp',
    title: 'Reef Slope Substrate Analysis',
    category: 'Expeditions',
    location: 'Deep Reef Slope',
    depth: '24m',
    description: 'Sampling frame recording live coral percentage vs macroalgal cover.'
  },
  {
    id: 'photo-33',
    url: '/Images_gallery/DSCN1475.webp',
    title: 'Submerged Wall Documentation',
    category: 'Expeditions',
    location: 'Vertical Coral Wall',
    depth: '29m',
    description: 'Vertical wall dive revealing sea fans and encrusting sponges thriving in nutrient upwellings.'
  },
  {
    id: 'photo-34',
    url: '/Images_gallery/DSCN5887.webp',
    title: 'Pristine Coral Sanctuary',
    category: 'Expeditions',
    location: 'Andaman & Nicobar Waters',
    depth: '16m',
    description: 'Untouched coral gardens documenting pristine condition across marine reserves.'
  },
  {
    id: 'photo-35',
    url: '/Images_gallery/DSCN5896.webp',
    title: 'Massive Coral Structure',
    category: 'Corals',
    location: 'Deep Lagoon Passage',
    depth: '18m',
    description: 'Centuries-old massive brain coral colony providing key structural refuge.'
  },
  {
    id: 'photo-36',
    url: '/Images_gallery/DSCN5911.webp',
    title: 'Macro Benthic Details',
    category: 'Expeditions',
    location: 'Coral Rubble Field',
    depth: '15m',
    description: 'Close inspection of cryptofauna inhabiting structural interstitial coral spaces.'
  },
  {
    id: 'photo-37',
    url: '/Images_gallery/DSCN5932.webp',
    title: 'Oceanic Reef Slope Survey',
    category: 'Expeditions',
    location: 'Outer Barrier Reef',
    depth: '25m',
    description: 'Surveying outer barrier reef slope under crystal clear tropical waters.'
  },
  {
    id: 'photo-38',
    url: '/Images_gallery/DSCN7220.webp',
    title: 'Bioluminescent Reef Haven',
    category: 'Expeditions',
    location: 'Deep Reef Drop-off',
    depth: '30m',
    description: 'High-resolution field documentation capturing deep water octocorals and benthic life.'
  },
  {
    id: 'photo-39',
    url: '/Images_gallery/G0140863.webp',
    title: 'Action Underwater Exploration',
    category: 'Expeditions',
    location: 'Active Dive Site',
    depth: '17m',
    description: 'Scuba dive survey action photo documenting specimen collection and photographic recording.'
  },
  {
    id: 'photo-40',
    url: '/Images_gallery/IMG_0324.webp',
    title: 'Marine Ecosystem Survey',
    category: 'Expeditions',
    location: 'Fringing Reef Zone',
    depth: '12m',
    description: 'Observational scientific diving recording fish species richness and benthic cover.'
  },
  {
    id: 'photo-41',
    url: '/Images_gallery/IMG_2271.webp',
    title: 'Subsurface Exploration Log',
    category: 'Expeditions',
    location: 'Coastal Water Reserve',
    depth: '14m',
    description: 'Scientific field log photo documenting habitat parameters during routine monitoring.'
  },
  {
    id: 'photo-42',
    url: '/Images_gallery/IMG_3031.webp',
    title: 'Submerged Pinnacle Habitat',
    category: 'Expeditions',
    location: 'Submerged Pinnacle',
    depth: '20m',
    description: 'Expansive view of a isolated underwater pinnacle attracting pelagic species.'
  },
  {
    id: 'photo-43',
    url: '/Images_gallery/IMG_3108.webp',
    title: 'Tropical Reef Canopy',
    category: 'Corals',
    location: 'Shallow Reef Crest',
    depth: '8m',
    description: 'Sunlight filtering through clear surface waters onto branching hard coral canopies.'
  },
  {
    id: 'photo-44',
    url: '/Images_gallery/IMG_8791.webp',
    title: 'Benthic Species Macro Log',
    category: 'Fauna',
    location: 'Deep Sand Patch',
    depth: '22m',
    description: 'Macro photographic record of cryptic seabed fauna.'
  },
  {
    id: 'photo-45',
    url: '/Images_gallery/IMG_9468.webp',
    title: 'Deep Ocean Coral Survey',
    category: 'Corals',
    location: 'Deep Shelf Transect',
    depth: '31m',
    description: 'Scientific imaging of rare deep-water coral specimens in their native habitat.'
  },
  {
    id: 'photo-46',
    url: '/Images_gallery/20230921_092319.webp',
    title: 'Field Dive Operation 2023',
    category: 'Expeditions',
    location: 'National Marine Survey Site',
    depth: '19m',
    description: 'Modern SCUBA research expedition documenting marine life in real-time.'
  },
  {
    id: 'photo-47',
    url: '/Images_gallery/236_3628.webp',
    title: 'Invertebrate Habitat Record',
    category: 'Fauna',
    location: 'Reef Crevice',
    depth: '13m',
    description: 'Focusing on crevice-dwelling crustaceans and echinoderms.'
  },
  {
    id: 'photo-48',
    url: '/Images_gallery/Cavernularia pusilla.webp',
    title: 'Cavernularia pusilla',
    scientificName: 'Cavernularia pusilla',
    category: 'Corals',
    location: 'Deep Sand Patch',
    depth: '18m',
    description: 'A fascinating specimen of Cavernularia pusilla anchoring in the soft sediment.'
  },
  {
    id: 'photo-49',
    url: '/Images_gallery/Cephalopholis formosa (Shaw, 1812).webp',
    title: 'Bluelined Hind',
    scientificName: 'Cephalopholis formosa (Shaw, 1812)',
    category: 'Fauna',
    location: 'Coral Reef Pinnacle',
    depth: '15m',
    description: 'Vibrant bluelined hind recorded during marine surveys.'
  },
  {
    id: 'photo-50',
    url: '/Images_gallery/Chaetodon deccusatus Cuvier, 1829.webp',
    title: 'Indian Vagabond Butterflyfish',
    scientificName: 'Chaetodon deccusatus Cuvier, 1829',
    category: 'Fauna',
    location: 'Shallow Reef Crest',
    depth: '8m',
    description: 'A beautiful butterflyfish specimen foraging along the shallow reef.'
  },
  {
    id: 'photo-51',
    url: '/Images_gallery/Dendronephthya.webp',
    title: 'Dendronephthya Soft Coral',
    scientificName: 'Dendronephthya sp.',
    category: 'Corals',
    location: 'Current-Swept Slope',
    depth: '22m',
    description: 'Brightly colored Dendronephthya soft coral providing habitat complexity.'
  },
  {
    id: 'photo-52',
    url: '/Images_gallery/Diodon hystrix Linnaeus, 1758.webp',
    title: 'Spot-fin Porcupinefish',
    scientificName: 'Diodon hystrix Linnaeus, 1758',
    category: 'Fauna',
    location: 'Reef Crevice',
    depth: '14m',
    description: 'Porcupinefish hiding within the structural complexity of the coral reef.'
  },
  {
    id: 'photo-53',
    url: '/Images_gallery/Gymnothorax favagineus Bloch, Schneider, 1801.webp',
    title: 'Laced Moray Eel',
    scientificName: 'Gymnothorax favagineus Bloch, Schneider, 1801',
    category: 'Fauna',
    location: 'Rocky Overhang',
    depth: '16m',
    description: 'A large laced moray eel encountered resting in a rocky overhang.'
  },
  {
    id: 'photo-54',
    url: '/Images_gallery/IMG_3100.webp',
    title: 'Reef Ecology Survey',
    category: 'Expeditions',
    location: 'Fringing Reef Zone',
    depth: '12m',
    description: 'Field documentation of benthic coral health and species distribution.'
  },
  {
    id: 'photo-55',
    url: '/Images_gallery/Isis hippuris.webp',
    title: 'Golden Sea Fan',
    scientificName: 'Isis hippuris',
    category: 'Corals',
    location: 'Outer Reef Slope',
    depth: '20m',
    description: 'A branching Isis hippuris colony observed in strong current zones.'
  },
  {
    id: 'photo-56',
    url: '/Images_gallery/P4180346.webp',
    title: 'Benthic Fauna Documentation',
    category: 'Expeditions',
    location: 'Submerged Pinnacle',
    depth: '25m',
    description: 'High-resolution capture of the rich macro fauna diversity on the reef.'
  },
  {
    id: 'photo-57',
    url: '/Images_gallery/P4180357.webp',
    title: 'Deep Water Exploration',
    category: 'Expeditions',
    location: 'Oceanic Drop-Off',
    depth: '30m',
    description: 'SCUBA diving assessment along the steep oceanic drop-off walls.'
  },
  {
    id: 'photo-58',
    url: '/Images_gallery/P4180358.webp',
    title: 'Marine Sanctuary Documentation',
    category: 'Expeditions',
    location: 'Marine Protected Area',
    depth: '18m',
    description: 'Continuous monitoring of structural coral health in the protected sanctuary.'
  },
  {
    id: 'photo-59',
    url: '/Images_gallery/Platax teira (Forsskal, 1775).webp',
    title: 'Longfin Batfish',
    scientificName: 'Platax teira (Forsskal, 1775)',
    category: 'Fauna',
    location: 'Mid-Water Column',
    depth: '10m',
    description: 'A curious longfin batfish swimming through the water column above the reef.'
  },
  {
    id: 'photo-60',
    url: '/Images_gallery/Torpedo marmorata Risso, 1810.webp',
    title: 'Marbled Electric Ray',
    scientificName: 'Torpedo marmorata Risso, 1810',
    category: 'Fauna',
    location: 'Sandy Benthic Zone',
    depth: '22m',
    description: 'A rare encounter with the marbled electric ray resting on the sandy bottom.'
  }
];

export const SCUBA_PHOTOS: ScubaPhoto[] = RAW_SCUBA_PHOTOS.map(photo => ({
  ...photo,
  url: getAssetUrl(photo.url)
}));

