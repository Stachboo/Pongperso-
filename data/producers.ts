/* ══════════════════════════════════════════════════════════════════════════════
   WMC — DONNÉES PRODUCTEURS
   7 labels majeurs du dancehall et reggae jamaïcain
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
    id: 'notnice',
    name: 'Notnice',
    label: 'Notnice Records',
    origin: 'Portmore, St. Catherine, Jamaïque',
    founded: '2006',
    active: '2006 – présent',
    style: ['Dancehall'],
    description:
      "Ainsley Morris, alias Notnice, est un producteur autodidacte formé sur FruityLoops. Backbone du Portmore Empire de Vybz Kartel entre 2009 et 2011, il a enchaîné les numéros 1 jamaïcains. En 2009, Ramping Shop (Kartel & Spice) a atteint le #76 du Billboard Hot 100. Nommé Producteur de l'Année 2011 aux Excellence in Music and Entertainment Awards.",
    notableRiddims: ['Boxing Day Riddim', 'England Town Riddim', 'Story Tella Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Alkaline', 'Spice', 'Shawn Storm'],
    achievements: [
      'Billboard Hot 100 #76 — Ramping Shop (2009)',
      "Producteur de l'Année — EMEA Awards 2011",
      'Album Kyng Midas #9 Billboard Reggae (2019)',
    ],
    riddimIds: ['boxing-day-riddim', 'england-town-riddim'],
  },
  {
    id: 'di-genius',
    name: 'Di Genius',
    label: 'Di Genius Records / Big Ship',
    origin: 'Havendale, Kingston, Jamaïque',
    founded: '2004',
    active: '2004 – présent',
    style: ['Dancehall', 'Reggae', 'Pop'],
    description:
      "Stephen McGregor, né le 6 janvier 1990, est le fils du légendaire Freddie McGregor. Autodidacte complet — basse, guitare, claviers appris à 7 ans. Sa carrière démarre à 12 ans. Il produit Drake, Ne-Yo, Nelly Furtado tout en restant la référence du dancehall. Warner Chappell Music signe un accord mondial avec lui en 2019.",
    notableRiddims: ['Day Rave Riddim', 'Set Me Free Riddim', 'Red Bull & Guinness Riddim'],
    keyArtists: ['Mavado', 'Vybz Kartel', 'Sean Paul', 'Drake', 'Ne-Yo'],
    achievements: [
      'Producteur de Controlla — Drake (multi-platine)',
      'Accord Warner Chappell Music 2019',
      'Billboard — producteur qui a ramené le dancehall au mainstream',
    ],
    riddimIds: ['day-rave-riddim', 'set-me-free-riddim'],
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
      "Jordan McClure et David Hizzle Hayle, anciens élèves du Campion College et pianistes classiques, fondent Chimney Records en 2007. C'est Delly Ranx qui leur donne le nom en voyant leur studio enfumé. Leur premier hit — Trailer Load of Money de Vybz Kartel (2008) — les lance. Triple victoire aux Star Awards 2015.",
    notableRiddims: ['Movie Star Riddim', 'Tropical Escape Riddim', 'Rising Sun Riddim', 'Happy Hour Riddim'],
    keyArtists: ['Vybz Kartel', 'Mavado', 'Tarrus Riley', 'Chronixx', 'Bounty Killer'],
    achievements: [
      'Triple victoire Star Awards 2015',
      'Tropical Escape — pilier du Reggae Revival',
      'Trailer Load of Money — premier #1 (2008)',
    ],
    riddimIds: ['movie-star-riddim', 'tropical-escape-riddim'],
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
      "Trio fondé en 2001 par les frères David et Craig Harrisingh et leur ami Craig Serani Marsh. Le nom Daseca vient de leurs initiales : DA-SE-CA. Ils définissent le son dancehall des années 2000 en y infusant R&B et hip-hop. Ils propulsent Mavado, produisent We Be Burnin de Sean Paul et signent Dutty Wine de Tony Matterhorn — numéro 1 en Jamaïque et en Angleterre.",
    notableRiddims: ['Anger Management Riddim', 'Chaka Chaka Riddim', 'Gully Creature Riddim'],
    keyArtists: ['Mavado', 'Sean Paul', 'Bounty Killer', 'Busy Signal', 'Vybz Kartel'],
    achievements: [
      'Dutty Wine — #1 Jamaïque et Angleterre',
      'We Be Burnin — Sean Paul (international)',
      'Anger Management — riddim générationnel (2004)',
    ],
    riddimIds: ['anger-management-riddim'],
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
      "Fondé par Christopher Birch, producteur, claviériste et ingénieur du son jamaïcain. Le Military Riddim (2004) est leur production signature — un double LP avec plus de 20 artistes incluant Sean Paul, Vybz Kartel, Bounty Killer et Beenie Man. L'un des projets les plus chargés en talents de la décennie 2000.",
    notableRiddims: ['Military Riddim'],
    keyArtists: ['Sean Paul', 'Vybz Kartel', 'Bounty Killer', 'Beenie Man', 'Sizzla'],
    achievements: [
      'Military Riddim — 20+ artistes sur un projet',
      'Collaboration avec Shaggy, Sean Paul, Bounty Killer',
    ],
    riddimIds: ['military-riddim'],
  },
  {
    id: 'rvssian',
    name: 'Rvssian',
    label: 'Head Concussion Records',
    origin: 'Kingston, Jamaïque',
    founded: '2007',
    active: '2007 – présent',
    style: ['Dancehall', 'Latin'],
    description:
      "Tarik Johnston fonde Head Concussion Records à 17 ans en 2007. Fils d'un musicien, il apprend piano et batterie dès l'enfance. Percée en 2010 avec Life Sweet de Vybz Kartel, puis Straight Jeans and Fitted dépasse 25 millions de vues YouTube. Il s'impose ensuite sur le marché latin avec Sean Paul et Farruko.",
    notableRiddims: ['Remedy Riddim', 'Klappaz Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Sean Paul', 'Farruko', 'Aidonia'],
    achievements: [
      'Head Concussion Records fondé à 17 ans',
      'Straight Jeans and Fitted — 25M+ vues YouTube',
      'Certification RIAA Platine (Sean Paul & Farruko)',
    ],
    riddimIds: ['remedy-riddim', 'klappaz-riddim'],
  },
  {
    id: 'arif-cooper',
    name: 'Arif Cooper',
    label: 'Fresh Ear Productions',
    origin: 'Jamaïque',
    founded: '2006',
    active: '2006 – présent',
    style: ['Lovers Rock', 'Reggae'],
    description:
      "Arif Cooper est le producteur derrière Fresh Ear Productions, spécialisé en lovers rock et reggae smooth. Ses productions Guardian Angel (2007) et Relationship Riddim (2008) font partie de la série Riddim Driven de VP Records. Ses compilations réunissent le gratin du reggae jamaïcain sur des instrumentales à l'atmosphère romantique.",
    notableRiddims: ['Guardian Angel Riddim', 'Relationship Riddim'],
    keyArtists: ['Jah Cure', 'Vybz Kartel', 'Sean Paul', 'Christopher Martin', 'Alaine'],
    achievements: [
      'Guardian Angel — Riddim Driven #129 VP Records',
      'Relationship Riddim — Sean Paul, Collie Buddz',
      'Spécialiste Lovers Rock jamaïcain',
    ],
    riddimIds: ['guardian-angel-riddim', 'relationship-riddim'],
  },
];
