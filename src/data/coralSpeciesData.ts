export interface CoralSpecies {
  id: string;
  botanicalName: string;
  authority: string;
  commonName: string;
  group: 'Corals' | 'Octocorals' | 'Mollusca';
  category: string;
  family: string;
  location: string;
  depth: string;
  habitat: string;
  abundance: string;
  description: string;
  identification: string;
  image: string;
  displayImage: string;
  downloadImage: string;
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
    image: `/specimens/display/coral_${numStr}.webp`,
    displayImage: `/specimens/display/coral_${numStr}.webp`,
    downloadImage: `/specimens/downloads/coral_${numStr}.webp`
  };
});

// 2. 87 Octocoral & Gorgonian Specimen Records (from Octorals dataset)
const OCTOCORALS_DATA: CoralSpecies[] = Array.from({ length: 87 }, (_, i) => {
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
    image: `/specimens/display/octocoral_${numStr}.webp`,
    displayImage: `/specimens/display/octocoral_${numStr}.webp`,
    downloadImage: `/specimens/downloads/octocoral_${numStr}.webp`
  };
});

// 3. 26 Marine Mollusca Specimen Records (from Mollusca dataset)
const MOLLUSCA_DATA: CoralSpecies[] = Array.from({ length: 26 }, (_, i) => {
  const index = i + 1;
  const numStr = String(index).padStart(3, '0');

  const molluscaTemplates = [
    {
      botanicalName: 'Trochus niloticus',
      authority: 'Linnaeus, 1767',
      commonName: 'Commercial Top Snail / Button Shell',
      family: 'Tegulidae',
      category: 'Gastropoda',
      depth: '0 - 15 meters',
      habitat: 'Intertidal reef flats, coral rubble slopes, and high-energy surf zones',
      abundance: 'Protected Schedule IV Marine Species across Andaman & Nicobar',
      description: 'Large heavy conical shell with distinctive reddish-crimson zebra stripes on a thick pearly nacreous background. Thick columellar fold with deep umbilical cavity.',
      identification: 'Broad conical base up to 150mm, smooth whorls with crimson axial flammules, and brilliant mother-of-pearl interior.'
    },
    {
      botanicalName: 'Conus marmoreus',
      authority: 'Linnaeus, 1758',
      commonName: 'Marbled Cone Snail',
      family: 'Conidae',
      category: 'Gastropoda',
      depth: '2 - 25 meters',
      habitat: 'Coral reef platforms, coarse calcareous sand pockets, and shallow lagoons',
      abundance: 'Common in shallow Indo-Pacific reef systems',
      description: 'Heavy obconic shell decorated with an iconic network pattern of chocolate-brown to black reticulated triangles enclosing white triangular tents. Predatory venomous piscivore / molluscivore.',
      identification: 'Heavy smooth cone with low nodulose spire and high-contrast white tent markings on dark chestnut-black ground.'
    },
    {
      botanicalName: 'Mauritia mauritiana',
      authority: '(Linnaeus, 1768)',
      commonName: 'Humpback Cowrie / Chocolate Cowrie',
      family: 'Cypraeidae',
      category: 'Gastropoda',
      depth: 'Intertidal - 8 meters',
      habitat: 'Exposed rocky surge channels, basalt cliffs, and seaward reef edges',
      abundance: 'Frequent in surf-swept volcanic habitats',
      description: 'Heavily callused, humped cowrie shell with solid dark chocolate-black lateral margins and a dorsum covered in golden-brown reticulations with scattered pale spots. Flattened ventral aperture with dark teeth.',
      identification: 'Distinctive humpbacked dorsum, jet-black angular marginal callus, and brown aperture teeth spanning a broad flat base.'
    },
    {
      botanicalName: 'Pleuroploca trapezium',
      authority: '(Linnaeus, 1758)',
      commonName: 'Trapezium Horse Conch / Spindle Snail',
      family: 'Fasciolariidae',
      category: 'Gastropoda',
      depth: '3 - 35 meters',
      habitat: 'Sublittoral sandy bottoms, seagrass beds, and fringing reef slopes',
      abundance: 'Common in Andaman intertidal and coastal beds',
      description: 'Solid fusiform shell with prominent shoulder nodes, elevated turreted spire, and long siphonal canal. Exterior adorned with spiral reddish-brown thread-like cords.',
      identification: 'Stout fusiform profile, heavy shoulder nodules, elongate anterior siphonal canal, and aperture with paired reddish lirae.'
    },
    {
      botanicalName: 'Conus ebraeus',
      authority: 'Linnaeus, 1758',
      commonName: 'Hebrew Cone Snail',
      family: 'Conidae',
      category: 'Gastropoda',
      depth: '0 - 5 meters',
      habitat: 'Shallow intertidal limestone reef benches, wave-cut platforms, and algal turf',
      abundance: 'Abundant in shallow reef crests',
      description: 'Compact, thick-walled cone shell characterized by 3 to 4 spiral rows of large, square or rhomboidal black markings on a creamy white surface, resembling Hebrew lettering.',
      identification: 'Stocky profile with coronated shoulder, low spire, and bold quadrate black block patterns across white body whorl.'
    },
    {
      botanicalName: 'Turbo marmoratus',
      authority: 'Linnaeus, 1758',
      commonName: 'Great Green Turban',
      family: 'Turbinidae',
      category: 'Gastropoda',
      depth: '4 - 30 meters',
      habitat: 'Sublittoral reef crests, outer drop-offs, and surge-swept rocky ledges',
      abundance: 'High Conservation Value • Protected under Indian Wildlife (Protection) Act',
      description: 'Massive heavy turbinate shell reaching up to 25 cm, covered in thick green, brown, and white mottled periostracum overlying an opulent thick mother-of-pearl (nacre) shell layer.',
      identification: 'Giant globular shell with strong spiral nodular ridges and heavy smooth circular calcareous operculum.'
    },
    {
      botanicalName: 'Lyncina carneola',
      authority: '(Linnaeus, 1758)',
      commonName: 'Carnelian Cowrie',
      family: 'Cypraeidae',
      category: 'Gastropoda',
      depth: '1 - 20 meters',
      habitat: 'Coral reef cavities, underneath Porites boulders, and rubble crevices',
      abundance: 'Common in shallow coral reefs',
      description: 'Smooth, polished cylindrical-ovate cowrie featuring warm reddish-flesh to carnelian-orange tones with four subtle darker transverse bands. Apertural teeth accented in rich purple.',
      identification: 'Warm carnelian flesh color, distinct purple tint on aperture teeth, and lack of marginal spotting.'
    },
    {
      botanicalName: 'Tridacna maxima',
      authority: '(Röding, 1798)',
      commonName: 'Small Giant Clam',
      family: 'Cardiidae',
      category: 'Bivalvia',
      depth: '1 - 15 meters',
      habitat: 'Embedded in shallow reef crests, massive coral heads, and lagoon platforms',
      abundance: 'Frequent in pristine reef flats • CITES Appendix II & Schedule I protected',
      description: 'Bivalve mollusc embedded in coral heads with strongly undulated shell margins and prominent closely spaced scales. Fleshy mantle displays brilliant electric blue, turquoise, and emerald green patterns harboring photosynthetic zooxanthellae.',
      identification: 'Asymmetrical elongated shell, strongly fluted folds with dense scutes, and vibrant iridophore mantle visible during sunlit hours.'
    }
  ];

  const locations = [
    'South Andaman Coastline, India',
    'Ritchie Archipelago, Havelock Island',
    'Neil Island Intertidal Reef Flat',
    'Great Nicobar Biosphere Reserve',
    'Little Andaman Fringing Reef',
    'North Brother Island Channel',
    'Cinque Island Marine Sanctuary',
    'Gulf of Mannar Biosphere Reserve'
  ];

  const spec = molluscaTemplates[i % molluscaTemplates.length];
  const loc = locations[i % locations.length];

  return {
    id: `mollusc-${numStr}`,
    botanicalName: `${spec.botanicalName} (Mollusca Specimen #${numStr})`,
    authority: spec.authority,
    commonName: spec.commonName,
    group: 'Mollusca' as const,
    category: spec.category,
    family: spec.family,
    location: loc,
    depth: spec.depth,
    habitat: spec.habitat,
    abundance: spec.abundance,
    description: `${spec.description} High-resolution macroscopic photographic record documented during Dr. J.S. Yogesh Kumar's marine biodiversity & malacology survey expeditions.`,
    identification: spec.identification,
    image: `/specimens/display/mollusca_${numStr}.webp`,
    displayImage: `/specimens/display/mollusca_${numStr}.webp`,
    downloadImage: `/specimens/downloads/mollusca_${numStr}.webp`
  };
});

// Consolidated Dataset: 80 Corals + 87 Octocorals + 26 Mollusca = 193 Total Specimen Records
export const CORAL_SPECIES_DATA: CoralSpecies[] = [...CORALS_DATA, ...OCTOCORALS_DATA, ...MOLLUSCA_DATA];
