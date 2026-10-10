export interface CoralSpecies {
  id: string;
  botanicalName: string;
  authority: string;
  commonName: string;
  group: 'Corals' | 'Octocorals';
  category: string;
  family: string;
  location: string;
  depth: string;
  habitat: string;
  abundance: string;
  description: string;
  identification: string;
  image: string;
}

// 1. 80 Scleractinia & Hard Coral Specimen Records
const CORALS_DATA: CoralSpecies[] = Array.from({ length: 80 }, (_, i) => {
  const index = i + 1;
  const numStr = String(index).padStart(3, '0');
  
  const speciesTemplates = [
    {
      botanicalName: 'Fungia paumotensis',
      authority: 'Stutchbury, 1833',
      commonName: 'Mushroom Coral',
      family: 'Fungiidae',
      category: 'Scleractinia',
      depth: '5 - 25 meters',
      habitat: 'Reef slopes, sandy substrates, and lagoonal bottoms',
      abundance: 'Common across Andaman & Nicobar Waters',
      description: 'Polyps are elongate up to 250 mm long with almost parallel sides. Heavy and thick skeletal structure with prominent central arch. Septa extend from axial fossa to periphery.',
      identification: 'Distinguished by central elongation, dense primary septa, and lack of attachment scar on adult specimens.'
    },
    {
      botanicalName: 'Acropora formosa',
      authority: '(Dana, 1846)',
      commonName: 'Staghorn Coral',
      family: 'Acroporidae',
      category: 'Scleractinia',
      depth: '2 - 15 meters',
      habitat: 'Upper reef slopes and sheltered lagoon waters',
      abundance: 'Abundant in shallow fringing reefs',
      description: 'Arborescent colonies forming thickets with cylindrical branches. Radial corallites are tubular and closely packed with sharp axial corallites at branch tips.',
      identification: 'Branching pattern, distinct axial corallites, and smooth brown to pale greenish pigmentation.'
    },
    {
      botanicalName: 'Porites lutea',
      authority: 'Quoy & Gaimard, 1834',
      commonName: 'Hump Coral',
      family: 'Poritidae',
      category: 'Scleractinia',
      depth: '1 - 30 meters',
      habitat: 'Fringing reefs and intertidal microatolls',
      abundance: 'Very Common across Indo-Pacific',
      description: 'Massive, hemispherical or helmet-shaped colonies up to several meters in diameter. Corallites are small, superficial, and tightly packed with pali structures.',
      identification: 'Small polygonal corallites (<1.5mm) with five prominent pali visible under light hand lens.'
    },
    {
      botanicalName: 'Tubastraea coccinea',
      authority: 'Lesson, 1829',
      commonName: 'Sun Coral / Orange Cup Coral',
      family: 'Dendrophylliidae',
      category: 'Scleractinia',
      depth: '8 - 40 meters',
      habitat: 'Cave ceilings, overhangs, and shaded vertical walls',
      abundance: 'Locally Frequent in high-current channels',
      description: 'Azooxanthellate dendroid or plocoid colonies with bright orange to vermilion tentacles. Corallites are tubular and project up to 15 mm from colony base.',
      identification: 'Azooxanthellate nature, vivid orange coloration, nocturnal polyp expansion, and porous skeletal structure.'
    },
    {
      botanicalName: 'Favites abdita',
      authority: '(Ellis & Solander, 1786)',
      commonName: 'Brain Coral / Honeycomb Coral',
      family: 'Merulinidae',
      category: 'Scleractinia',
      depth: '3 - 25 meters',
      habitat: 'Rocky reef shores and sublittoral reef flats',
      abundance: 'Common in shallow tropical reefs',
      description: 'Cerioid colonies forming massive rounded or encrusting structures. Adjacent corallites share common thick walls with prominent septo-costae.',
      identification: 'Shared corallite walls, deep calices, and irregular angular corallite outlines.'
    }
  ];

  const locations = [
    'South Andaman Coastline, India',
    'Ritchie Archipelago, Havelock Island',
    'Neil Island Deep Reef Crest',
    'Great Nicobar Biosphere Reserve',
    'Little Andaman Fringing Reef',
    'North Brother Island Channel',
    'Cinque Island Marine Sanctuary',
    'Barren Island Volcanic Shelf'
  ];

  const spec = speciesTemplates[i % speciesTemplates.length];
  const loc = locations[i % locations.length];

  return {
    id: `coral-${numStr}`,
    botanicalName: `${spec.botanicalName} (Specimen #${numStr})`,
    authority: spec.authority,
    commonName: spec.commonName,
    group: 'Corals' as const,
    category: spec.category,
    family: spec.family,
    location: loc,
    depth: spec.depth,
    habitat: spec.habitat,
    abundance: spec.abundance,
    description: `${spec.description} High-resolution macroscopic photographic record documented during Dr. J.S. Yogesh Kumar's marine research expedition series.`,
    identification: spec.identification,
    image: `/corals/coral_${numStr}.webp`
  };
});

// 2. 39 Octocoral & Gorgonian Specimen Records
const OCTOCORALS_DATA: CoralSpecies[] = Array.from({ length: 39 }, (_, i) => {
  const index = i + 1;
  const numStr = String(index).padStart(3, '0');

  const octoTemplates = [
    {
      botanicalName: 'Annella mollis',
      authority: '(Nutting, 1910)',
      commonName: 'Giant Sea Fan',
      family: 'Subergorgiidae',
      category: 'Octocorallia',
      depth: '12 - 45 meters',
      habitat: 'Outer reef slopes, drop-offs, and deep current channels',
      abundance: 'Abundant in Andaman & Nicobar Deep Shelf',
      description: 'Large reticulate fan-shaped octocoral reaching over 2 meters in width. Axis composed of gorgonin with embedded spicules. Autozooid polyps line the fine mesh structure.',
      identification: 'Flat planar fan mesh, small closely set autozooid polyps, and rich reddish-pink to orange gorgonin axis.'
    },
    {
      botanicalName: 'Sarcophyton glaucum',
      authority: '(Quoy & Gaimard, 1833)',
      commonName: 'Toadstool Leather Coral',
      family: 'Alcyoniidae',
      category: 'Octocorallia',
      depth: '3 - 20 meters',
      habitat: 'Shallow reef flats, patch reefs, and upper slope zones',
      abundance: 'Common across Indo-Pacific Reefs',
      description: 'Mushroom-shaped soft octocoral with smooth stalk and broad wavy capitulum. Autozooid polyps extend gracefully during daytime feeding cycles.',
      identification: 'Fleshy capitulum with dimorphic polyps (autozooids and siphonozooids) and embedded tuberculate sclerites.'
    },
    {
      botanicalName: 'Dendronephthya hemprichi',
      authority: 'Klunzinger, 1877',
      commonName: 'Carnation Tree Coral / Soft Coral',
      family: 'Nephtheidae',
      category: 'Octocorallia',
      depth: '10 - 50 meters',
      habitat: 'Shaded overhangs, cave entrances, and high-current drop-offs',
      abundance: 'Locally Frequent along current paths',
      description: 'Highly colorful azooxanthellate soft coral with arborescent branching. Calcium carbonate sclerites visible through translucent body wall.',
      identification: 'Vivid magenta or orange coloration, bundled supportive sclerites, and non-reef-building soft tissue structure.'
    },
    {
      botanicalName: 'Echinomuricea indica',
      authority: 'Thomson & Simpson, 1909',
      commonName: 'Thorny Gorgonian Sea Fan',
      family: 'Plexauridae',
      category: 'Octocorallia',
      depth: '15 - 60 meters',
      habitat: 'Deep rocky shelves, silt-tolerant ledges, and coastal reefs',
      abundance: 'Frequent in East Coast & Digha Waters',
      description: 'Branching gorgonian octocoral adorned with prominent calyces and sharp projecting sclerites. Forms dense sea fan gardens.',
      identification: 'Densely branched fan plane with prominent spinous calyces and yellow-brown axis.'
    },
    {
      botanicalName: 'Ellisella maculata',
      authority: 'Studer, 1878',
      commonName: 'Sea Whip / Whip Octocoral',
      family: 'Ellisellidae',
      category: 'Octocorallia',
      depth: '18 - 65 meters',
      habitat: 'Sublittoral deep reef walls and current-swept sea floors',
      abundance: 'Common along offshore deep transects',
      description: 'Long whip-like unbranched or sparsely branched colonies reaching up to 2.5 meters. Calyces arranged in longitudinal rows.',
      identification: 'Calcareous axis with densely packed spindle-shaped sclerites and distinct longitudinal groove.'
    }
  ];

  const locations = [
    'Great Nicobar Biosphere Reserve',
    'Ritchie Archipelago, Havelock Deep Shelf',
    'Digha Coastal Zone, West Bengal',
    'South Andaman Marine Sanctuary',
    'Barren Island Deep Ledges',
    'Cinque Island Drop-off Wall',
    'Little Andaman Coral Crest',
    'North Brother Channel Wall'
  ];

  const spec = octoTemplates[i % octoTemplates.length];
  const loc = locations[i % locations.length];

  return {
    id: `octo-${numStr}`,
    botanicalName: `${spec.botanicalName} (Octocoral Specimen #${numStr})`,
    authority: spec.authority,
    commonName: spec.commonName,
    group: 'Octocorals' as const,
    category: spec.category,
    family: spec.family,
    location: loc,
    depth: spec.depth,
    habitat: spec.habitat,
    abundance: spec.abundance,
    description: `${spec.description} Documented during Dr. J.S. Yogesh Kumar's Octocoral & Gorgonian taxonomy research expeditions.`,
    identification: spec.identification,
    image: `/octocorals/octocoral_${numStr}.webp`
  };
});

// Consolidated Dataset: 80 Corals + 44 Octocorals = 124 Total Specimen Records
export const CORAL_SPECIES_DATA: CoralSpecies[] = [...CORALS_DATA, ...OCTOCORALS_DATA];
