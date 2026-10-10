export interface CoralSpecies {
  id: string;
  botanicalName: string;
  authority: string;
  commonName: string;
  category: 'Scleractinia' | 'Alcyonacea' | 'Antipatharia' | 'Octocorallia' | 'Taxonomic Specimen';
  family: string;
  location: string;
  depth: string;
  habitat: string;
  abundance: string;
  description: string;
  identification: string;
  image: string;
}

export const CORAL_SPECIES_DATA: CoralSpecies[] = Array.from({ length: 80 }, (_, i) => {
  const index = i + 1;
  const numStr = String(index).padStart(3, '0');
  
  // Taxonomical curation presets representing Dr. Yogesh Kumar's coral species catalog
  const categories: CoralSpecies['category'][] = [
    'Scleractinia', 'Alcyonacea', 'Antipatharia', 'Octocorallia', 'Taxonomic Specimen'
  ];
  
  const speciesTemplates = [
    {
      botanicalName: 'Fungia paumotensis',
      authority: 'Stutchbury, 1833',
      commonName: 'Mushroom Coral',
      family: 'Fungiidae',
      category: 'Scleractinia' as const,
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
      category: 'Scleractinia' as const,
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
      category: 'Scleractinia' as const,
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
      category: 'Scleractinia' as const,
      depth: '8 - 40 meters',
      habitat: 'Cave ceilings, overhangs, and shaded vertical walls',
      abundance: 'Locally Frequent in high-current channels',
      description: 'Azooxanthellate dendroid or plocoid colonies with bright orange to vermilion tentacles. Corallites are tubular and project up to 15 mm from colony base.',
      identification: 'Azooxanthellate nature, vivid orange coloration, nocturnal polyp expansion, and porous skeletal structure.'
    },
    {
      botanicalName: 'Sarcophyton glaucum',
      authority: '(Quoy & Gaimard, 1833)',
      commonName: 'Toadstool Leather Coral',
      family: 'Alcyoniidae',
      category: 'Alcyonacea' as const,
      depth: '3 - 20 meters',
      habitat: 'Shallow reef flats and upper slope zones',
      abundance: 'Abundant in sheltered reef crests',
      description: 'Mushroom-shaped soft coral with smooth stalk and broad capitulum. Autozooid polyps extend gracefully during daytime feeding cycles.',
      identification: 'Fleshy capitulum with dimorphic polyps (autozooids and siphonozooids) and embedded tuberculate sclerites.'
    },
    {
      botanicalName: 'Cirrhipathes anguina',
      authority: 'Dana, 1846',
      commonName: 'Wire Coral / Black Coral',
      family: 'Antipathidae',
      category: 'Antipatharia' as const,
      depth: '15 - 55 meters',
      habitat: 'Deep reef walls, drop-offs, and current-swept ledges',
      abundance: 'Frequent along deep wall slopes',
      description: 'Unbranched whip-like black coral extending up to 3 meters in length. Proteinaceous axial skeleton adorned with microscopic triangulate spines.',
      identification: 'Single unbranched spiral axial skeleton with non-retractable translucent white or yellow polyps.'
    },
    {
      botanicalName: 'Favites abdita',
      authority: '(Ellis & Solander, 1786)',
      commonName: 'Brain Coral / Honeycomb Coral',
      family: 'Merulinidae',
      category: 'Scleractinia' as const,
      depth: '3 - 25 meters',
      habitat: 'Rocky reef shores and sublittoral reef flats',
      abundance: 'Common in shallow tropical reefs',
      description: 'Cerioid colonies forming massive rounded or encrusting structures. Adjacent corallites share common thick walls with prominent septo-costae.',
      identification: 'Shared corallite walls, deep calices, and irregular angular corallite outlines.'
    },
    {
      botanicalName: 'Annella mollis',
      authority: '(Nutting, 1910)',
      commonName: 'Giant Sea Fan',
      family: 'Subergorgiidae',
      category: 'Octocorallia' as const,
      depth: '12 - 45 meters',
      habitat: 'Outer reef slopes and deep channels',
      abundance: 'Occasional along current paths',
      description: 'Large reticulate fan-shaped octocoral reaching over 2 meters in width. Axis composed of gorgonin with embedded spicules.',
      identification: 'Flat planar fan mesh, small closely set polyps, and rich red to pinkish skeletal coloration.'
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
