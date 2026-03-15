/* ══════════════════════════════════════════════════════════════════════════════
   WMC — DONNÉES PRODUCTEURS
   18 labels et producteurs du dancehall et reggae jamaïcain
   ══════════════════════════════════════════════════════════════════════════════ */

export interface Producer {
  id: string;
  name: string;
  label: string;
  origin: string;
  founded: string;
  active: string;
  style: string[];
  description: string;
  notableRiddims: string[];
  keyArtists: string[];
  achievements: string[];
  riddimIds: string[];
}

export const producers: Producer[] = [
  {
    id: 'arif-cooper',
    name: 'Arif Cooper',
    label: 'Fresh Ear Productions',
    origin: 'Jamaïque',
    founded: '2006',
    active: '2006 – présent',
    style: ['Lovers Rock', 'Reggae'],
    description:
      "Arif Cooper est le producteur de Fresh Ear Productions, spécialisé en lovers rock et reggae smooth. Ses productions font partie de la série Riddim Driven de VP Records. Ses compilations réunissent le gratin du reggae jamaïcain sur des instrumentales à l'atmosphère romantique et élaborée.",
    notableRiddims: ['Relationship Riddim', 'Guardian Angel Riddim'],
    keyArtists: ['Jah Cure', 'Vybz Kartel', 'Sean Paul', 'Christopher Martin', 'Alaine', 'Richie Spice', 'Collie Buddz'],
    achievements: ['Guardian Angel — Riddim Driven #129 VP Records', 'Relationship Riddim — Sean Paul, Collie Buddz'],
    riddimIds: ['relationship-riddim', 'guardian-angel-riddim'],
  },
  {
    id: 'silly-walks-discotheque',
    name: 'Silly Walks Discotheque',
    label: 'Silly Walks Discotheque',
    origin: 'Hambourg, Allemagne',
    founded: '2000',
    active: '2000 – présent',
    style: ['Reggae'],
    description:
      "Label hambourgeois devenu l'une des références mondiales du reggae moderne. Silly Walks Discotheque produit des riddims one-drop de qualité qui attirent les meilleurs artistes jamaïcains et internationaux. Le Brighter Days Riddim illustre leur capacité à créer des projets réunissant roots reggae et voix contemporaines.",
    notableRiddims: ['Brighter Days Riddim'],
    keyArtists: ['Busy Signal', 'Romain Virgo', 'Christopher Martin', 'J Boog', 'Fiji', 'Exco Levi'],
    achievements: ['Label reggae de référence internationale basé en Europe', 'Brighter Days — Busy Signal & RC hit majeur'],
    riddimIds: ['brighter-days-riddim'],
  },
  {
    id: 'zj-chrome-cr203',
    name: 'ZJ Chrome',
    label: 'CR203 Records',
    origin: 'Jamaïque',
    founded: '2008',
    active: '2008 – présent',
    style: ['Dancehall'],
    description:
      'ZJ Chrome est le producteur derrière CR203 Records, connu pour sa série Cardiac qui a marqué le dancehall jamaïcain des années 2010. Le Cardiac Bass Riddim s\'inscrit dans une longue lignée de productions Cardiac — Cardiac Keys, Cardiac Strings — qui constituent une œuvre de producteur cohérente et reconnaissable.',
    notableRiddims: ['Cardiac Bass Riddim', 'Cardiac Keys Riddim', 'Cardiac Strings Riddim'],
    keyArtists: ['Vybz Kartel', 'Christopher Martin', 'Jah Cure', 'Alaine', 'I-Octane', "Ce'Cile"],
    achievements: ['Série Cardiac — identité de production forte et reconnaissable', 'Cardiac Bass — Vybz Kartel double voicing'],
    riddimIds: ['cardiac-bass-riddim'],
  },
  {
    id: 'troyton-music',
    name: 'Troy Hinds',
    label: 'Troyton Music',
    origin: 'Jamaïque',
    founded: '2010',
    active: '2010 – présent',
    style: ['Dancehall'],
    description:
      'Troyton Music est le label de Troy Hinds, producteur jamaïcain actif dans le dancehall des années 2010. Le Danger Luv Riddim réunit un casting solide de voix dancehall majeures autour d\'une instrumentation mélodique et émotionnelle caractéristique du style Troyton.',
    notableRiddims: ['Danger Luv Riddim'],
    keyArtists: ['Mavado', 'Tarrus Riley', 'Konshens', 'Aidonia', 'I-Octane', 'Bugle'],
    achievements: ['Danger Luv — Mavado et Tarrus Riley sur un même riddim'],
    riddimIds: ['danger-luv-riddim'],
  },
  {
    id: 'don-corleon-records',
    name: 'Don Corleon',
    label: 'Don Corleon Records',
    origin: 'Jamaïque',
    founded: '2005',
    active: '2005 – présent',
    style: ['Roots Reggae', 'Dancehall'],
    description:
      "Don Corleon Records est l'un des labels les plus respectés de la scène reggae jamaïcaine. Producteur polyvalent, Don Corleon navigue entre roots reggae et dancehall avec une approche musicale soignée. Le Scriptures Riddim illustre sa capacité à réunir artistes roots et voix contemporaines sur un même projet.",
    notableRiddims: ['Scriptures Riddim'],
    keyArtists: ['Jah Cure', 'Chronixx', 'Morgan Heritage', 'Tessanne Chin', 'Duane Stephenson'],
    achievements: ['Scriptures — Chronixx émergent + Morgan Heritage', 'Label polyvalent roots/dancehall reconnu'],
    riddimIds: ['scriptures-riddim'],
  },
  {
    id: 'chimney-records',
    name: 'Chimney Records',
    label: 'Chimney Records',
    origin: 'Kingston, Jamaïque',
    founded: '2007',
    active: '2007 – présent',
    style: ['Dancehall', 'Reggae Revival'],
    description:
      "Jordan McClure et David Hizzle Hayle fondent Chimney Records en 2007 après avoir travaillé pour Delly Ranx, qui leur donna le nom en voyant leur studio enfumé. Leur premier hit Trailer Load of Money de Vybz Kartel les lance. Pianistes classiques de formation, ils imposent un son soigné et polyvalent. Triple victoire aux Star Awards 2015.",
    notableRiddims: ['Movie Star Riddim', 'Tropical Escape Riddim', 'Rising Sun Riddim', 'Happy Hour Riddim'],
    keyArtists: ['Vybz Kartel', 'Mavado', 'Tarrus Riley', 'Chronixx', 'Bounty Killer', 'Beenie Man', 'I-Octane'],
    achievements: [
      'Triple victoire Star Awards 2015',
      'Tropical Escape — pilier du Reggae Revival',
      'Trailer Load of Money — premier #1 (2008)',
    ],
    riddimIds: ['movie-star-riddim', 'tropical-escape-riddim'],
  },
  {
    id: 'full-strength-ja-productions',
    name: 'Justus Arison',
    label: 'Full Strength / JA Productions',
    origin: 'Jamaïque',
    founded: '2010',
    active: '2010 – présent',
    style: ['Dancehall'],
    description:
      "Justus Arison est le producteur derrière Full Strength et JA Productions, auteur du Overproof Riddim (2011) — l'un des riddims les plus fournis de l'année avec plus de 20 voicings et un casting exceptionnel incluant Sean Paul, Vybz Kartel, Mavado, Beenie Man et Bounty Killer sur un même projet.",
    notableRiddims: ['Overproof Riddim'],
    keyArtists: ['Sean Paul', 'Vybz Kartel', 'Mavado', 'Beenie Man', 'Bounty Killer', 'Aidonia', 'Lady Saw'],
    achievements: ['Overproof — 20+ voicings, casting all-star 2011', 'Sean Paul, Kartel, Mavado, Beenie, Bounty sur un riddim'],
    riddimIds: ['overproof-riddim'],
  },
  {
    id: 'notice-productions',
    name: 'Notice Productions',
    label: 'Notice Productions',
    origin: 'Jamaïque',
    founded: '2011',
    active: '2011 – présent',
    style: ['Reggae', 'Dancehall'],
    description:
      "Notice Productions est un label jamaïcain à la croisée du reggae et du dancehall. Le Heart and Soul Riddim (2011–2013), produit en deux volumes, illustre leur capacité à réunir voix reggae et dancehall autour d'un instrumental élaboré et mélodique, avec près de 19 artistes documentés.",
    notableRiddims: ['Heart and Soul Riddim'],
    keyArtists: ['Jah Cure', 'Busy Signal', 'Christopher Martin', 'Etana', 'T.O.K', 'Iba Mahr'],
    achievements: ['Heart and Soul — 19 voicings sur 2 volumes (2011–2013)'],
    riddimIds: ['heart-and-soul-riddim'],
  },
  {
    id: '2-hard-records',
    name: '2 Hard Records',
    label: '2 Hard Records',
    origin: 'Jamaïque',
    founded: '2009',
    active: '2009 – présent',
    style: ['Reggae', 'Dancehall'],
    description:
      "2 Hard Records est un label jamaïcain qui produit des riddims à la croisée du reggae et du dancehall. Le City Life Riddim (2010) réunit des artistes majeurs des deux genres — Sean Paul, Tarrus Riley, Queen Ifrica — autour d'un instrumental urbain et contemporain.",
    notableRiddims: ['City Life Riddim'],
    keyArtists: ['Sean Paul', 'Tarrus Riley', 'Queen Ifrica', 'Elephant Man', 'Assassin', 'Wayne Marshall'],
    achievements: ['City Life — Sean Paul + Tarrus Riley sur un même riddim'],
    riddimIds: ['city-life-riddim'],
  },
  {
    id: 'yard-vybz-entertainment',
    name: 'Yard Vybz Entertainment',
    label: 'Yard Vybz Entertainment',
    origin: 'Jamaïque',
    founded: '2008',
    active: '2008 – présent',
    style: ['Lovers Rock'],
    description:
      "Yard Vybz Entertainment est un label jamaïcain spécialisé en lovers rock. Le Good Love Riddim (2009) réunit des voix majeures du reggae romantique jamaïcain — Jah Cure, Gyptian, Christopher Martin — sur une instrumentation douce et émotionnelle.",
    notableRiddims: ['Good Love Riddim'],
    keyArtists: ['Jah Cure', 'Gyptian', 'Christopher Martin', 'Wayne Marshall', 'Tanya Stephens'],
    achievements: ['Good Love — Jah Cure ft. Phyllisia voicing signature'],
    riddimIds: ['good-love-riddim'],
  },
  {
    id: 'daseca-productions',
    name: 'Daseca Productions',
    label: 'Daseca Productions',
    origin: 'Red Hills Road, Kingston, Jamaïque',
    founded: '2001',
    active: '2001 – présent',
    style: ['Dancehall', 'R&B'],
    description:
      "Trio fondé en 2001 par les frères David et Craig Harrisingh et leur ami Craig Serani Marsh. Le nom Daseca vient de leurs initiales : DA-SE-CA. Ils définissent le son dancehall des années 2000 en infusant R&B et hip-hop. Ils propulsent Mavado, produisent We Be Burnin de Sean Paul et Dutty Wine — numéro 1 en Jamaïque et en Angleterre.",
    notableRiddims: ['Anger Management Riddim', 'Chaka Chaka Riddim'],
    keyArtists: ['Mavado', 'Sean Paul', 'Bounty Killer', 'Busy Signal', 'Vybz Kartel', 'Bugle'],
    achievements: [
      'Dutty Wine — #1 Jamaïque et Angleterre',
      'Anger Management — riddim générationnel 2004',
      'We Be Burnin — Sean Paul (international)',
    ],
    riddimIds: ['anger-management-riddim'],
  },
  {
    id: 'tj-records',
    name: 'TJ Records',
    label: 'TJ Records',
    origin: 'Jamaïque',
    founded: '2008',
    active: '2008 – présent',
    style: ['Dancehall'],
    description:
      "TJ Records est le label de production exclusif du camp Gaza / Portmore Empire. Productions quasi exclusivement réservées aux artistes de Vybz Kartel — Popcaan, Tommy Lee, Blak Ryno, Jah Vinci. Le Fight Fi War Riddim (2009) et le Gaza World Riddim (2011) sont les deux grandes productions TJ Records dans le catalogue WMC.",
    notableRiddims: ['Fight Fi War Riddim', 'Gaza World Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Tommy Lee Sparta', 'Blak Ryno', 'Jah Vinci'],
    achievements: ['Fight Fi War — 4 voicings Vybz Kartel dont Don Run', 'Gaza World — production exclusive Portmore Empire'],
    riddimIds: ['fight-fi-war-riddim', 'gaza-world-riddim'],
  },
  {
    id: 'birchill-records',
    name: 'Birchill Records',
    label: 'Birchill Records',
    origin: 'Jamaïque',
    founded: '2003',
    active: '2003 – présent',
    style: ['Dancehall'],
    description:
      "Fondé par Christopher Birch, producteur, claviériste et ingénieur du son. Le Military Riddim (2004) est leur production signature — un double LP avec plus de 20 artistes incluant Sean Paul, Vybz Kartel, Bounty Killer et Beenie Man. L'un des projets les plus chargés en talents de la décennie 2000.",
    notableRiddims: ['Military Riddim'],
    keyArtists: ['Sean Paul', 'Vybz Kartel', 'Bounty Killer', 'Beenie Man', 'Sizzla', 'Lady Saw'],
    achievements: ['Military Riddim — 20+ artistes sur un projet (2004)', 'Collaboration Shaggy, Sean Paul, Bounty Killer'],
    riddimIds: ['military-riddim'],
  },
  {
    id: 'good-good-productions',
    name: 'Good Good Productions',
    label: 'Good Good Productions',
    origin: 'Jamaïque',
    founded: '2015',
    active: '2015 – présent',
    style: ['Dancehall'],
    description:
      "Good Good Productions est un label jamaïcain actif dans le dancehall contemporain des années 2010–2020. Le Cure Pain Riddim (2016) illustre leur capacité à réunir les deux grandes factions du dancehall jamaïcain — Kartel, Mavado, Alkaline — sur un même projet, chose rare dans un milieu souvent divisé.",
    notableRiddims: ['Cure Pain Riddim'],
    keyArtists: ['Vybz Kartel', 'Mavado', 'Alkaline', 'Sizzla', 'Masicka', 'Ky-Mani Marley'],
    achievements: ['Cure Pain — Kartel + Mavado + Alkaline réunis (2016)'],
    riddimIds: ['cure-pain-riddim'],
  },
  {
    id: 'rvssian-head-concussion',
    name: 'Rvssian',
    label: 'Head Concussion Records',
    origin: 'Kingston, Jamaïque',
    founded: '2007',
    active: '2007 – présent',
    style: ['Dancehall', 'Latin'],
    description:
      "Tarik Johnston fonde Head Concussion Records à 17 ans en 2007. Fils d'un musicien, il apprend piano et batterie dès l'enfance. Percée en 2010 avec Life Sweet de Vybz Kartel, puis Straight Jeans and Fitted dépasse 25 millions de vues YouTube. Il s'impose ensuite sur le marché latin avec Sean Paul et Farruko.",
    notableRiddims: ['Remedy Riddim', 'Klappaz Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Sean Paul', 'Farruko', 'Aidonia', 'Sizzla'],
    achievements: [
      'Head Concussion Records fondé à 17 ans',
      'Straight Jeans and Fitted — 25M+ vues YouTube',
      'Certification RIAA Platine (Sean Paul & Farruko)',
    ],
    riddimIds: ['remedy-riddim', 'klappaz-riddim'],
  },
  {
    id: 'dj-vtrine',
    name: 'DJ Vtrine',
    label: 'Vtrine Prod / Shatta Sound',
    origin: 'Martinique, Antilles françaises',
    founded: '2010',
    active: '2010 – présent',
    style: ['Shatta', 'Dancehall Antillais'],
    description:
      "DJ Vtrine est le producteur martiniquais derrière l'EDF Riddim (2011), le seul riddim antillais du catalogue WMC. Produit pour la scène shatta/dancehall des Antilles françaises, ce riddim a acquis une notoriété internationale grâce à une voicing non officielle de Vybz Kartel. Il représente le rayonnement mondial de la culture riddim bien au-delà de la Jamaïque.",
    notableRiddims: ['EDF Riddim'],
    keyArtists: ['Vybz Kartel', 'Admiral T', 'Panik-J', 'Varsko Kidman', 'Calif'],
    achievements: [
      'EDF — seul riddim antillais du catalogue WMC',
      'Voicing Vybz Kartel — diffusion internationale',
      'Représentant du dancehall français / shatta',
    ],
    riddimIds: ['edf-riddim'],
  },
  {
    id: 'di-genius-records',
    name: 'Di Genius',
    label: 'Di Genius Records / Big Ship',
    origin: 'Havendale, Kingston, Jamaïque',
    founded: '2004',
    active: '2004 – présent',
    style: ['Dancehall', 'Reggae', 'Pop'],
    description:
      "Stephen McGregor, né le 6 janvier 1990, est le fils du légendaire Freddie McGregor. Autodidacte complet — basse, guitare, claviers appris à 7 ans. Sa carrière démarre à 12 ans. Il produit Drake, Ne-Yo et Nelly Furtado tout en restant la référence du dancehall. Warner Chappell Music signe un accord mondial avec lui en 2019.",
    notableRiddims: ['Day Rave Riddim', 'Set Me Free Riddim', 'Red Bull & Guinness Riddim'],
    keyArtists: ['Mavado', 'Vybz Kartel', 'Sean Paul', 'Drake', 'Ne-Yo', 'Nelly Furtado'],
    achievements: [
      'Producteur de Controlla — Drake (multi-platine)',
      'Accord Warner Chappell Music 2019',
      'Billboard — producteur qui a ramené le dancehall au mainstream',
    ],
    riddimIds: ['day-rave-riddim', 'set-me-free-riddim'],
  },
  {
    id: 'notnice-records',
    name: 'Notnice',
    label: 'Notnice Records / Adidijahiem',
    origin: 'Portmore, St. Catherine, Jamaïque',
    founded: '2006',
    active: '2006 – présent',
    style: ['Dancehall'],
    description:
      "Ainsley Morris, alias Notnice, est un producteur autodidacte formé sur FruityLoops. Backbone du Portmore Empire de Vybz Kartel entre 2009 et 2011, il enchaîne les numéros 1 jamaïcains. En 2009, Ramping Shop (Kartel & Spice) atteint le #76 du Billboard Hot 100. Nommé Producteur de l'Année 2011 aux Excellence in Music and Entertainment Awards.",
    notableRiddims: ['Boxing Day Riddim', 'England Town Riddim', 'Story Tella Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Alkaline', 'Spice', 'Shawn Storm', 'Jah Vinci'],
    achievements: [
      'Billboard Hot 100 #76 — Ramping Shop (2009)',
      "Producteur de l'Année — EMEA Awards 2011",
      'Album Kyng Midas #9 Billboard Reggae (2019)',
    ],
    riddimIds: ['boxing-day-riddim', 'england-town-riddim'],
  },
];
