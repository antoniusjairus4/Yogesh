export interface NewspaperFeature {
  id: string;
  image: string;
  newspaper: string;
  date: string;
  headlineTamil: string;
  headlineEnglish: string;
  location: string;
  summary: string;
  fullDetails: {
    overview: string;
    keyAchievements: string[];
    ecologicalSignificance: string;
    dignitariesInvolved: string[];
  };
}

export const NEWSPAPER_FEATURES: NewspaperFeature[] = [
  {
    id: 'scan0015',
    image: '/scan0015.jpg',
    newspaper: 'Dinakaran (தினகரன்)',
    date: '26 June 2006',
    headlineTamil: 'தமிழகத்தில் முதன்முறையாக ஆழ்கடலில் மூழ்கும் நீச்சல் பயிற்சி அறிமுகம்',
    headlineEnglish: 'First Time in Tamil Nadu: Deep-Sea Diving Training Introduced for Coastal Youth',
    location: 'Vembar, Thoothukudi District, Gulf of Mannar',
    summary: 'Historic introduction of Tamil Nadu\'s first deep-sea SCUBA diving training program designed specifically for coastal fishermen youth and marine researchers in Vembar.',
    fullDetails: {
      overview: 'Organized jointly by the Suganthi Devadason Marine Research Institute (SDMRI) and the Gulf of Mannar Biosphere Reserve Trust (GOMBRT) in collaboration with PEDO, this landmark program trained 13 local coastal youth from Thoothukudi and Ramanathapuram in scientific SCUBA diving.',
      keyAchievements: [
        'First-of-its-kind deep-sea SCUBA diving course in Tamil Nadu for fishermen youth',
        '1-month intensive practical diving instruction provided by Goa Barracuda diving experts',
        'Empowered local youth to assist marine biologists in underwater ecological surveys'
      ],
      ecologicalSignificance: 'Equipped local fishermen with professional underwater observation skills, enabling active community monitoring of coral reef health, fish breeding grounds, and protected marine fauna in the Gulf of Mannar Biosphere Reserve.',
      dignitariesInvolved: [
        'Dr. J.S. Yogesh Kumar (Scientific Research Team)',
        'S. Shenbagamoorthy (Wildlife Warden, Gulf of Mannar Biosphere Reserve)',
        'Commandant S.M. Singh (Indian Coast Guard)'
      ]
    }
  },
  {
    id: 'scan0016',
    image: '/scan0016.jpg',
    newspaper: 'Dinamani (தினமணி)',
    date: '28 June 2006',
    headlineTamil: 'மீனவ இளைஞர்களுக்கான ஆழ்கடல் மூழ்கும் பயிற்சி நிறைவு',
    headlineEnglish: 'Completion of 1-Month Deep-Sea SCUBA Diving Course for Coastal Youth',
    location: 'Kovilpatti / Vembar, Thoothukudi',
    summary: 'Valedictory ceremony celebrating 13 fishermen youth who successfully completed 30 days of deep-sea SCUBA diving and marine safety instruction.',
    fullDetails: {
      overview: 'Dinamani reported on the formal closing ceremony held at Vembar where 13 trained divers received certificates from Indian Coast Guard leadership following a month of underwater physical and technical training.',
      keyAchievements: [
        'Certificate distribution to 13 youth from Thoothukudi and Ramanathapuram coastal belts',
        'Mastered deep-sea diving, underwater species identification, and coral reef assessment',
        'Integrated disaster rescue training with marine ecological research'
      ],
      ecologicalSignificance: 'Formed a frontline community protection squad across the 21 islands of the Gulf of Mannar to prevent illegal exploitation and monitor marine species health.',
      dignitariesInvolved: [
        'Commandant S.M. Singh (Indian Coast Guard)',
        'S. Shenbagamoorthy (Wildlife Warden)',
        'Rajendra Prasad (Executive Director, PEDO NGO)',
        'Venkatesh Charles (Lead Diving Instructor)'
      ]
    }
  },
  {
    id: 'scan0017',
    image: '/scan0017.jpg',
    newspaper: 'Dinamalar (தினமலர் - Tirunelveli)',
    date: '3 July 2006',
    headlineTamil: 'ஆழ்கடல் அதிசயங்கள் • ஆழ்கடலில் மூழ்கும் பயிற்சி அவசியம்',
    headlineEnglish: 'Deep-Sea Wonders: Why SCUBA Diving is Critical for Marine Conservation',
    location: 'Gulf of Mannar National Park',
    summary: 'Special full-page feature detailing the over 3,600 marine species in the Gulf of Mannar and the critical role SCUBA diving plays in protecting reef ecosystems.',
    fullDetails: {
      overview: 'A feature article explaining the ecological importance of the Gulf of Mannar Biosphere Reserve (stretching 1000 sq km) and why specialized scientific SCUBA diving is essential for monitoring coral reefs, dugongs, and sea turtles.',
      keyAchievements: [
        'Detailed documentation of 3,600+ species of marine flora and fauna in the biosphere',
        'Advocated for ongoing scientific diving training among local fishermen communities',
        'Featured SDMRI and GOMBRT\'s innovative marine stewardship model'
      ],
      ecologicalSignificance: 'Elevated regional public awareness about marine conservation, highlighting how trained divers monitor habitat degradation, climate impacts, and coral bleaching across 21 protected islands.',
      dignitariesInvolved: [
        'Dr. J.S. Yogesh Kumar (Marine Taxonomist & Ecologist)',
        'Forest Department Wildlife Officers',
        'Marine Biology Research Team'
      ]
    }
  },
  {
    id: 'scan0018',
    image: '/scan0018.jpg',
    newspaper: 'THE HINDU (Madurai)',
    date: 'Wednesday, June 28, 2006',
    headlineTamil: 'THE HINDU: SCUBA டைவிங் பயிற்சி - மீட்பு மற்றும் ஆராய்ச்சி',
    headlineEnglish: 'Training Course in SCUBA Diving: Rescue \'N\' Research',
    location: 'Vembar, Tuticorin District',
    summary: 'The Hindu\'s national coverage on the month-long SCUBA diving initiative organized by GOMBRT and People\'s Action for Development.',
    fullDetails: {
      overview: 'Published in The Hindu, this coverage highlighted the dual purpose of the SCUBA training course at Vembar: enabling coral ecosystem research and preparing coastal youth for maritime disaster rescue operations.',
      keyAchievements: [
        'National media recognition for Gulf of Mannar marine conservation initiatives',
        '13 coastal youth trained by instructors from Barracuda Diving Centre, Goa',
        'Course certificates issued by Coast Guard Commandant S.M. Singh'
      ],
      ecologicalSignificance: 'Highlighted the integration of disaster preparedness with ecological field monitoring, creating sustainable capacity in coastal Tuticorin.',
      dignitariesInvolved: [
        'Commandant S.M. Singh (Indian Coast Guard)',
        'S. Shenbagamoorthy (Wildlife Warden, Ramanathapuram)',
        'R. Vimal Kumar (Reporter, Tuticorin)',
        'Photo by N. Rajesh'
      ]
    }
  },
  {
    id: 'scan0019',
    image: '/scan0019.jpg',
    newspaper: 'Dinakaran (தினகரன்)',
    date: '28 June 2006',
    headlineTamil: 'மீனவர்களுக்கு நீச்சல் பயிற்சி நிறைவு விழா',
    headlineEnglish: 'Valedictory Ceremony for SCUBA Divers in Gulf of Mannar',
    location: 'Vembar, Tuticorin District',
    summary: 'Front-page visual feature showing SCUBA divers outfitted in full oxygen gear entering the ocean during final scientific evaluation exercises.',
    fullDetails: {
      overview: 'Dinakaran captured striking photographs of the diving cohort preparing for their deep-water evaluation under the guidance of lead research staff including Dr. J.S. Yogesh Kumar.',
      keyAchievements: [
        'Visual demonstration of underwater coral and invertebrate sampling techniques',
        'Formal vote of thanks delivered by marine biologist Dr. J.S. Yogesh Kumar',
        'Strong community engagement across coastal fishing villages'
      ],
      ecologicalSignificance: 'Demonstrated the feasibility of converting traditional fishing knowledge into scientific ecosystem protection through certified SCUBA diving.',
      dignitariesInvolved: [
        'Dr. J.S. Yogesh Kumar (Scientific Team)',
        'Forest Wildlife Warden S. Shenbagamoorthy',
        'Goa Barracuda Diving Instructors'
      ]
    }
  },
  {
    id: 'scan0020',
    image: '/scan0020.jpg',
    newspaper: 'Dinamalar (தினமலர் - Tirunelveli)',
    date: '8 June 2006',
    headlineTamil: 'நீச்சல் பயிற்சி மையம் துவக்க விழா',
    headlineEnglish: 'Inauguration of Marine SCUBA Training Center',
    location: 'Vembar, Tuticorin District',
    summary: 'Launch of Tamil Nadu\'s dedicated coastal SCUBA training center at Vembar to enable direct underwater investigation of the 21 islands of Gulf of Mannar National Park.',
    fullDetails: {
      overview: 'Dinamalar covered the opening of the training hub established by PEDO and GOMBRT. The center served as the launchpad for underwater baseline survey work across protected island habitats.',
      keyAchievements: [
        'Inauguration of dedicated diving training infrastructure for researchers and coastal youth',
        'Direct underwater research initiated across 21 islands of Gulf of Mannar National Park',
        'Initial batch of 19 fishermen youth selected for 30-day intensive SCUBA training'
      ],
      ecologicalSignificance: 'Allowed scientists to conduct direct in-situ research on coral reefs, sea grass beds, and fish nurseries, replacing indirect sampling methods.',
      dignitariesInvolved: [
        'Dr. Gladwin Yogesh Kumar (Marine Biological Researcher)',
        'Naganathan (GOMBRT Officer)',
        'Rajendra Prasad (PEDO NGO)',
        'Forest Department Wildlife Officers'
      ]
    }
  },
  {
    id: 'scan0021',
    image: '/scan0021.jpg',
    newspaper: 'Tamil Osai (தமிழ் ஓசை - Madurai)',
    date: '19 April 2008',
    headlineTamil: 'கடல் ஆமைகளைப் பாதுகாக்க நடவடிக்கை',
    headlineEnglish: 'Sea Turtle Nest Conservation: 87 Green Turtles Released into Gulf of Mannar',
    location: 'Karsambar Island, Tuticorin / Gulf of Mannar',
    summary: 'Front-page story documenting a 57-day sea turtle nest protection mission led by Dr. Gladwin Yogesh Kumar, culminating in the release of 87 Green Turtle hatchlings.',
    fullDetails: {
      overview: 'Tamil Osai featured a detailed report on the intensive 57-day continuous nesting surveillance program executed by marine biologist Dr. Gladwin Yogesh Kumar and team. The project safeguarded endangered Green Sea Turtle (Chelonia mydas) eggs on coastal beaches.',
      keyAchievements: [
        '57 consecutive days of 24/7 sea turtle nest protection along the Tuticorin coastline',
        'Successfully incubated and released 87 rare Green Sea Turtle hatchlings near Karsambar Island',
        'Educated local fishing communities on rescuing sea turtles accidentally caught in fishing nets'
      ],
      ecologicalSignificance: 'Major conservation milestone for endangered marine turtles in India. Protected vulnerable nesting sites from poaching and predators while building community turtle-guardian networks.',
      dignitariesInvolved: [
        'Dr. Gladwin Yogesh Kumar (Lead Marine Ecologist)',
        'Dr. Gladwin Gnana Asir (Co-Researcher)',
        'Rajendra Prasad (Project Director)',
        'Gulf of Mannar Biosphere Reserve Trust Conservation Team'
      ]
    }
  }
];
