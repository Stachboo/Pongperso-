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
    label: 'Notnice Records / Adidijahiem Records',
    origin: 'Waterford, Portmore, St. Catherine, Jamaïque',
    founded: '2006',
    active: '2006 – présent',
    style: ['Dancehall'],
    description:
      "Ainsley Morris, alias Notnice, est un producteur autodidacte formé sur FruityLoops. Backbone du Portmore Empire de Vybz Kartel entre 2009 et 2011, il a enchaîné les numéros 1 jamaïcains avant de fonder Notnice Records. En 2009, Ramping Shop (Kartel & Spice) a atteint le #76 du Billboard Hot 100. Nommé Producteur de l'Année 2011 aux Excellence in Music and Entertainment Awards.",
    notableRiddims: ['Boxing Day Riddim', 'England Town Riddim', 'Story Tella Riddim', 'Gangster City Riddim'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Alkaline', 'Spice', 'Shawn Storm', 'Jah Vinci'],
    achievements: [
      'Billboard Hot 100 #76 (Ramping Shop)',
      "Producteur de l'Année 2011 — EMEA Awards",
      'Album Kyng Midas #9 Billboard Reggae 2019',
    ],
    riddimIds: ['boxing-day-riddim', 'england-town-riddim'],
  },
  {
    id: 'di-genius',
    name: 'Di Genius',
    label: 'Di Genius Records / Big Ship Records',
    origin: 'Havendale, St. Andrew, Kingston, Jamaïque',
    founded: '2004',
    active: '2004 – présent',
    style: ['Dancehall', 'Reggae', 'Pop'],
    description:
      "Stephen McGregor, né le 6 janvier 1990, est le fils du légendaire Freddie McGregor. Autodidacte complet — basse, guitare, claviers, violon appris à 7 ans. Sa carrière de producteur débute à 12 ans. Surnommé Di Genius par un DJ radio jamaïcain, il produit Drake, Ne-Yo, Nelly Furtado et Shakira tout en restant la référence du dancehall. En 2019, Warner Chappell Music signe un accord d'édition mondial avec lui.",
    notableRiddims: ['Day Rave Riddim', 'Set Me Free Riddim', 'Red Bull & Guinness Riddim', 'Cartoon Riddim'],
    keyArtists: ['Mavado', 'Vybz Kartel', 'Sean Paul', 'Drake', 'Ne-Yo', 'Nelly Furtado'],
    achievements: [
      'Producteur de Controlla — Drake (multi-platine)',
      'Accord Warner Chappell Music 2019',
      'Producteur Sean Paul — Imperial Blaze (2009)',
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
      "Jordan McClure et David Hizzle Hayle, anciens élèves du Campion College et pianistes classiques, ont fondé Chimney Records en 2007 après avoir travaillé pour Delly Ranx. C'est ce dernier qui leur a donné le nom en arrivant dans leur studio enfumé : This place is like a chimney. Leur premier hit — Trailer Load of Money de Vybz Kartel (2008) — les a lancés. En 2015, triple victoire aux Star Awards : Producteur de l'Année, Collaboration de l'Année et Chanson de l'Année.",
    notableRiddims: ['Movie Star Riddim', 'Tropical Escape Riddim', 'Rising Sun Riddim', 'Happy Hour Riddim', 'Sex Appeal Riddim'],
    keyArtists: ['Vybz Kartel', 'Mavado', 'Tarrus Riley', 'Chronixx', 'Bounty Killer', 'Beenie Man', 'I-Octane'],
    achievements: [
      'Triple victoire Star Awards 2015',
      "Producteur de Chronixx — Ain't No Giving In",
      'Riddim Tropical Escape — pilier du Reggae Revival',
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
    style: ['Dancehall', 'R&B', 'Pop'],
    description:
      "Trio fondé en 2001 par les frères David et Craig Harrisingh et leur ami Craig Serani Marsh. Le nom Daseca est formé de leurs initiales : DA-SE-CA. Basés à Kingston, ils ont défini le son du dancehall des années 2000 en y infusant R&B et hip-hop. Ils ont propulsé Mavado, produit We Be Burnin de Sean Paul, et signé Dutty Wine de Tony Matterhorn — numéro 1 en Jamaïque et en Angleterre.",
    notableRiddims: ['Anger Management Riddim', 'Chaka Chaka Riddim', 'Gully Creature Riddim', 'Dreaming Riddim'],
    keyArtists: ['Mavado', 'Sean Paul', 'Bounty Killer', 'Busy Signal', 'Vybz Kartel', 'Bugle', 'Alaine'],
    achievements: [
      'Dutty Wine — #1 Jamaïque et Angleterre',
      'We Be Burnin — Sean Paul (international)',
      'Propulseurs de la carrière de Mavado (2005)',
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
      "Fondé par Christopher Birch, producteur, claviériste et ingénieur du son jamaïcain. Le Military Riddim (2004) est leur production signature — un double LP avec plus de 20 artistes incluant Sean Paul, Vybz Kartel, Bounty Killer et Beenie Man. L'un des riddims les plus chargés en talents de la décennie 2000. Birch a également travaillé avec Shaggy et Charly Black.",
    notableRiddims: ['Military Riddim', 'various 2000s riddims'],
    keyArtists: ['Sean Paul', 'Vybz Kartel', 'Bounty Killer', 'Beenie Man', 'Sizzla', 'Tanya Stephens', 'Lady Saw'],
    achievements: [
      'Military Riddim — 20+ artistes sur un seul projet',
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
    style: ['Dancehall', 'Reggae', 'Latin'],
    description:
      "Tarik Johnston, alias Rvssian, a fondé Head Concussion Records à seulement 17 ans en 2007. Fils d'un musicien, il a appris le piano et la batterie dès l'enfance. Sa percée arrive en 2010 avec Life Sweet de Vybz Kartel, puis Straight Jeans and Fitted (25M+ vues YouTube). Il s'est ensuite développé sur le marché latin avec Sean Paul et Farruko.",
    notableRiddims: ['Remedy Riddim', 'Klappaz Riddim', 'various Head Concussion riddims'],
    keyArtists: ['Vybz Kartel', 'Popcaan', 'Sean Paul', 'Farruko', 'Aidonia'],
    achievements: [
      'Head Concussion Records fondé à 17 ans',
      'Straight Jeans and Fitted — 25M+ vues',
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
      "Arif Cooper est le producteur derrière Fresh Ear Productions, spécialisé dans les riddims lovers rock et reggae smooth. Ses productions Guardian Angel (2007) et Relationship Riddim (2008) font partie de la célèbre série Riddim Driven de VP Records. Ses compilations réunissent le gratin du reggae jamaïcain — Jah Cure, Vybz Kartel, Sean Paul, Christopher Martin — sur des instrumentales à l'atmosphère romantique et élaborée.",
    notableRiddims: ['Guardian Angel Riddim', 'Relationship Riddim'],
    keyArtists: ['Jah Cure', 'Vybz Kartel', 'Sean Paul', 'Christopher Martin', 'Alaine', 'Richie Spice', 'Collie Buddz'],
    achievements: [
      'Guardian Angel — Riddim Driven #129 VP Records',
      'Relationship Riddim — Sean Paul, Collie Buddz',
      'Spécialiste Lovers Rock jamaïcain',
    ],
    riddimIds: ['guardian-angel-riddim', 'relationship-riddim'],
  },
];
