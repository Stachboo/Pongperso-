/* ══════════════════════════════════════════════════════════════════════════════
   WMC — SYSTÈME I18N
   World Music Contest — 5 langues (fr, en, es, pt, ja)
   ══════════════════════════════════════════════════════════════════════════════ */

export const LOCALES = ['fr', 'en', 'es', 'pt', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export interface Dictionary {
  lang: string;
  langName: string;
  flag: string;
  siteTitle: string;
  taglineHome: string;
  taglineExplorer: string;
  navHome: string;
  navExplorer: string;
  metaDescHome: string;
  metaDescExplorer: string;
  metaDescRiddim: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroText: string;
  ctaExplore: string;
  ctaAccess: string;
  statsRiddims: string;
  statsVoicings: string;
  statsViews: string;
  statsGenres: string;
  statsDecades: string;
  statsRiddimsShort: string;
  statsVoicingsShort: string;
  statsViewsShort: string;
  statsGenresShort: string;
  whatTitle: string;
  whatP1: string;
  whatP2: string;
  whatP3: string;
  whatP4: string;
  genresTitle: string;
  genreReggae: string;
  genreReggaeDesc: string;
  genreDancehall: string;
  genreDancehallDesc: string;
  genreLovers: string;
  genreLoversDesc: string;
  genreSoca: string;
  genreSocaDesc: string;
  howTitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  ctaReadyTitle: string;
  ctaReadyText: string;
  searchPlaceholder: string;
  filterGenre: string;
  filterType: string;
  filterDecade: string;
  filterSort: string;
  filterAll: string;
  filterAllFem: string;
  sortViews: string;
  sortName: string;
  sortYear: string;
  sortVoicings: string;
  typeClassique: string;
  typeRagga: string;
  typeDigital: string;
  noResults: string;
  noResultsHint: string;
  views: string;
  voicings: string;
  backToCatalog: string;
  totalViews: string;
  year: string;
  voicingsTitle: string;
  listenOnYt: string;
  riddimNotFound: string;
  backToHome: string;
  footerText: string;
  footerNote: string;
  decade1960: string;
  decade1970: string;
  decade1980: string;
  decade1990: string;
  decade2000: string;
  decade2010: string;
  shareTitle: string;
  shareCopied: string;
  shareText: string;
  searchButton: string;
  exploreRiddims: string;
  allGenres: string;
  allDecades: string;
  allProducers: string;
  sortPopularity: string;
  sortYearDesc: string;
  sortYearAsc: string;
  sortNameAz: string;
  searchRiddimArtist: string;
  sectionTitle: string;
  sectionSubtitle: string;
  noRiddimFound: string;
  noRiddimHint: string;
  badgeText: string;
  filterByGenre: string;
  filterByDecade: string;
  filterByProducer: string;
  sortByLabel: string;
  producer: string;
  label: string;
  bpm: string;
  description: string;
  rank: string;
  artist: string;
  title: string;
}

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    lang: 'fr',
    langName: 'Français',
    flag: '🇫🇷',
    siteTitle: 'World Music Contest',
    taglineHome: 'La référence des riddims jamaïcains',
    taglineExplorer: 'Explorez le catalogue des riddims',
    navHome: 'Accueil',
    navExplorer: 'Explorer les Riddims',
    metaDescHome: 'Explorez la plus grande base de données de riddims jamaïcains. Dancehall, Reggae, Lovers Rock : découvrez chaque riddim, ses voicings et leurs statistiques de streaming.',
    metaDescExplorer: 'Recherchez et explorez notre catalogue de riddims jamaïcains. Filtrez par genre, type et décennie.',
    metaDescRiddim: 'Détails et voicings de ce riddim jamaïcain - World Music Contest',
    heroTitle1: 'Chaque riddim.',
    heroTitle2: 'Chaque voicing.',
    heroTitle3: 'Classé par popularité.',
    heroText: "Plongez dans l'univers des riddims jamaïcains, ces instrumentales légendaires qui ont façonné le dancehall, le reggae et la musique mondiale depuis les années 60.",
    ctaExplore: 'Explorer la base de données',
    ctaAccess: 'Accéder au catalogue',
    statsRiddims: 'Riddims référencés',
    statsVoicings: 'Voicings catalogués',
    statsViews: 'Vues cumulées',
    statsGenres: 'Genres musicaux',
    statsDecades: 'Décennies couvertes',
    statsRiddimsShort: 'Riddims',
    statsVoicingsShort: 'Voicings',
    statsViewsShort: 'Vues totales',
    statsGenresShort: 'Genres',
    whatTitle: "Qu'est-ce qu'un riddim ?",
    whatP1: 'Un <strong>riddim</strong> (de l\'anglais "rhythm") est une instrumentale jamaïcaine sur laquelle plusieurs artistes enregistrent leurs propres versions vocales, appelées <strong>voicings</strong>. C\'est le fondement même de la musique jamaïcaine depuis les années 1960.',
    whatP2: "Contrairement à la musique occidentale traditionnelle où chaque chanson a sa propre production, un seul riddim peut donner naissance à des dizaines, voire des centaines de morceaux différents. C'est ce qui rend la culture musicale jamaïcaine unique au monde.",
    whatP3: 'Des riddims comme le <strong>Bam Bam</strong> de Sly & Robbie (1982), le <strong>Sleng Teng</strong> de King Jammy (1985) ou le <strong>Diwali</strong> de Lenky Marsden (2002) ont traversé les décennies et continuent d\'influencer la musique contemporaine, du hip-hop à l\'afrobeats.',
    whatP4: "Notre base de données recense les riddims les plus emblématiques, leurs voicings et les statistiques de streaming associées, pour préserver et valoriser ce patrimoine musical inestimable.",
    genresTitle: 'Les genres',
    genreReggae: 'Reggae',
    genreReggaeDesc: "Le genre fondateur. Né à la fin des années 60 en Jamaïque, le reggae est caractérisé par son offbeat rythmique et ses basses profondes. Les riddims reggae du Studio One restent parmi les plus samplés au monde.",
    genreDancehall: 'Dancehall',
    genreDancehallDesc: "Évolution digitale du reggae apparue dans les années 80. Le dancehall se distingue par ses rythmes plus rapides, ses synthétiseurs et sa culture des sound systems. C'est le genre le plus prolifique en riddims.",
    genreLovers: 'Lovers Rock',
    genreLoversDesc: "Le côté romantique de la musique jamaïcaine. Né dans la diaspora jamaïcaine à Londres, le lovers rock privilégie les mélodies douces et les thèmes sentimentaux sur des riddims chaleureux.",
    genreSoca: 'Soca',
    genreSocaDesc: "Fusion de soul et calypso originaire de Trinidad et Tobago. Le soca partage des riddims avec le dancehall et apporte une énergie festive et carnival unique à la culture caribéenne.",
    howTitle: 'Comment utiliser la base de données',
    howStep1Title: 'Explorez',
    howStep1Desc: 'Parcourez notre catalogue de riddims. Filtrez par genre, type, décennie ou recherchez un artiste spécifique.',
    howStep2Title: 'Découvrez',
    howStep2Desc: "Cliquez sur un riddim pour voir tous ses voicings, les artistes qui l'ont utilisé et les statistiques de streaming.",
    howStep3Title: 'Écoutez',
    howStep3Desc: "Chaque voicing dispose d'un lien direct vers YouTube pour écouter les morceaux et comparer les versions.",
    ctaReadyTitle: 'Prêt à explorer ?',
    ctaReadyText: 'Découvrez les riddims qui ont façonné la musique jamaïcaine depuis plus de 60 ans.',
    searchPlaceholder: 'Rechercher un riddim, un artiste, un titre...',
    filterGenre: 'Genre',
    filterType: 'Type',
    filterDecade: 'Décennie',
    filterSort: 'Trier par',
    filterAll: 'Tous',
    filterAllFem: 'Toutes',
    sortViews: 'Vues totales',
    sortName: 'Nom A-Z',
    sortYear: 'Année',
    sortVoicings: 'Nb. de voicings',
    typeClassique: 'Classique',
    typeRagga: 'Ragga',
    typeDigital: 'Digital',
    noResults: 'Aucun riddim trouvé',
    noResultsHint: 'Essaye de modifier tes filtres ou ta recherche.',
    views: 'vues',
    voicings: 'voicings',
    backToCatalog: 'Retour au catalogue',
    totalViews: 'Vues totales',
    year: 'Année',
    voicingsTitle: 'Voicings',
    listenOnYt: 'Écouter sur YouTube',
    riddimNotFound: 'Riddim introuvable',
    backToHome: "Retour à l'accueil",
    footerText: 'La musique jamaïcaine, organisée.',
    footerNote: 'Les vues sont approximatives et proviennent des principales plateformes de streaming.',
    decade1960: '1960s', decade1970: '1970s', decade1980: '1980s',
    decade1990: '1990s', decade2000: '2000s', decade2010: '2010s',
    shareTitle: 'Partager',
    shareCopied: 'Lien copié !',
    shareText: 'Découvrez World Music Contest, la base de données des riddims jamaïcains !',
    searchButton: 'Rechercher',
    exploreRiddims: 'Explorer les riddims',
    allGenres: 'Tous les genres',
    allDecades: 'Toutes les décennies',
    allProducers: 'Tous les producteurs',
    sortPopularity: 'Popularité',
    sortYearDesc: 'Année ↓',
    sortYearAsc: 'Année ↑',
    sortNameAz: 'Nom A–Z',
    searchRiddimArtist: 'Riddim ou artiste...',
    sectionTitle: 'Tous les riddims',
    sectionSubtitle: 'classés par popularité',
    noRiddimFound: 'Aucun riddim trouvé',
    noRiddimHint: 'Essayez de modifier vos filtres',
    badgeText: '🇯🇲 La référence mondiale des riddims jamaïcains',
    filterByGenre: 'Filtrer par genre',
    filterByDecade: 'Filtrer par décennie',
    filterByProducer: 'Filtrer par producteur',
    sortByLabel: 'Trier par',
    producer: 'Producteur',
    label: 'Label',
    bpm: 'BPM',
    description: 'Description',
    rank: '#',
    artist: 'Artiste',
    title: 'Titre',
  },

  en: {
    lang: 'en',
    langName: 'English',
    flag: '🇬🇧',
    siteTitle: 'World Music Contest',
    taglineHome: 'The reference for Jamaican riddims',
    taglineExplorer: 'Explore the riddim catalog',
    navHome: 'Home',
    navExplorer: 'Explore Riddims',
    metaDescHome: 'Explore the largest database of Jamaican riddims. Dancehall, Reggae, Lovers Rock: discover every riddim, its voicings and streaming statistics.',
    metaDescExplorer: 'Search and explore our catalog of Jamaican riddims. Filter by genre, type and decade.',
    metaDescRiddim: 'Details and voicings for this Jamaican riddim - World Music Contest',
    heroTitle1: 'Every riddim.',
    heroTitle2: 'Every voicing.',
    heroTitle3: 'Ranked by popularity.',
    heroText: 'Dive into the world of Jamaican riddims, the legendary instrumentals that have shaped dancehall, reggae and global music since the 1960s.',
    ctaExplore: 'Explore the database',
    ctaAccess: 'Access the catalog',
    statsRiddims: 'Riddims indexed',
    statsVoicings: 'Voicings cataloged',
    statsViews: 'Total views',
    statsGenres: 'Music genres',
    statsDecades: 'Decades covered',
    statsRiddimsShort: 'Riddims',
    statsVoicingsShort: 'Voicings',
    statsViewsShort: 'Total views',
    statsGenresShort: 'Genres',
    whatTitle: 'What is a riddim?',
    whatP1: 'A <strong>riddim</strong> (from "rhythm") is a Jamaican instrumental track on which multiple artists record their own vocal versions, called <strong>voicings</strong>. It has been the foundation of Jamaican music since the 1960s.',
    whatP2: 'Unlike traditional Western music where each song has its own production, a single riddim can give birth to dozens or even hundreds of different tracks. This is what makes Jamaican music culture unique in the world.',
    whatP3: 'Riddims like <strong>Bam Bam</strong> by Sly & Robbie (1982), <strong>Sleng Teng</strong> by King Jammy (1985) or <strong>Diwali</strong> by Lenky Marsden (2002) have spanned decades and continue to influence contemporary music, from hip-hop to afrobeats.',
    whatP4: 'Our database catalogs the most iconic riddims, their voicings and associated streaming statistics, to preserve and celebrate this priceless musical heritage.',
    genresTitle: 'The genres',
    genreReggae: 'Reggae',
    genreReggaeDesc: 'The founding genre. Born in late 1960s Jamaica, reggae is characterized by its rhythmic offbeat and deep basslines. Studio One reggae riddims remain among the most sampled in the world.',
    genreDancehall: 'Dancehall',
    genreDancehallDesc: 'The digital evolution of reggae that emerged in the 1980s. Dancehall stands out with its faster rhythms, synthesizers and sound system culture. It is the most prolific genre for riddims.',
    genreLovers: 'Lovers Rock',
    genreLoversDesc: 'The romantic side of Jamaican music. Born in the Jamaican diaspora in London, lovers rock favors soft melodies and sentimental themes over warm riddims.',
    genreSoca: 'Soca',
    genreSocaDesc: 'A fusion of soul and calypso originating from Trinidad and Tobago. Soca shares riddims with dancehall and brings a unique festive carnival energy to Caribbean culture.',
    howTitle: 'How to use the database',
    howStep1Title: 'Explore',
    howStep1Desc: 'Browse our riddim catalog. Filter by genre, type, decade or search for a specific artist.',
    howStep2Title: 'Discover',
    howStep2Desc: 'Click on a riddim to see all its voicings, the artists who used it and streaming statistics.',
    howStep3Title: 'Listen',
    howStep3Desc: 'Each voicing has a direct link to YouTube to listen to the tracks and compare versions.',
    ctaReadyTitle: 'Ready to explore?',
    ctaReadyText: 'Discover the riddims that have shaped Jamaican music for over 60 years.',
    searchPlaceholder: 'Search for a riddim, artist, or title...',
    filterGenre: 'Genre',
    filterType: 'Type',
    filterDecade: 'Decade',
    filterSort: 'Sort by',
    filterAll: 'All',
    filterAllFem: 'All',
    sortViews: 'Total views',
    sortName: 'Name A-Z',
    sortYear: 'Year',
    sortVoicings: 'No. of voicings',
    typeClassique: 'Classic',
    typeRagga: 'Ragga',
    typeDigital: 'Digital',
    noResults: 'No riddim found',
    noResultsHint: 'Try changing your filters or search.',
    views: 'views',
    voicings: 'voicings',
    backToCatalog: 'Back to catalog',
    totalViews: 'Total views',
    year: 'Year',
    voicingsTitle: 'Voicings',
    listenOnYt: 'Listen on YouTube',
    riddimNotFound: 'Riddim not found',
    backToHome: 'Back to home',
    footerText: 'Jamaican music, organized.',
    footerNote: 'Views are approximate and sourced from major streaming platforms.',
    decade1960: '1960s', decade1970: '1970s', decade1980: '1980s',
    decade1990: '1990s', decade2000: '2000s', decade2010: '2010s',
    shareTitle: 'Share',
    shareCopied: 'Link copied!',
    shareText: 'Check out World Music Contest, the Jamaican riddim database!',
    searchButton: 'Search',
    exploreRiddims: 'Explore the riddims',
    allGenres: 'All genres',
    allDecades: 'All decades',
    allProducers: 'All producers',
    sortPopularity: 'Popularity',
    sortYearDesc: 'Year ↓',
    sortYearAsc: 'Year ↑',
    sortNameAz: 'Name A–Z',
    searchRiddimArtist: 'Riddim or artist...',
    sectionTitle: 'All riddims',
    sectionSubtitle: 'ranked by popularity',
    noRiddimFound: 'No riddim found',
    noRiddimHint: 'Try adjusting your filters',
    badgeText: '🇯🇲 The world reference for Jamaican riddims',
    filterByGenre: 'Filter by genre',
    filterByDecade: 'Filter by decade',
    filterByProducer: 'Filter by producer',
    sortByLabel: 'Sort by',
    producer: 'Producer',
    label: 'Label',
    bpm: 'BPM',
    description: 'Description',
    rank: '#',
    artist: 'Artist',
    title: 'Title',
  },

  es: {
    lang: 'es',
    langName: 'Español',
    flag: '🇪🇸',
    siteTitle: 'World Music Contest',
    taglineHome: 'La referencia de los riddims jamaicanos',
    taglineExplorer: 'Explora el catálogo de riddims',
    navHome: 'Inicio',
    navExplorer: 'Explorar Riddims',
    metaDescHome: 'Explora la mayor base de datos de riddims jamaicanos. Dancehall, Reggae, Lovers Rock: descubre cada riddim, sus voicings y estadísticas de streaming.',
    metaDescExplorer: 'Busca y explora nuestro catálogo de riddims jamaicanos. Filtra por género, tipo y década.',
    metaDescRiddim: 'Detalles y voicings de este riddim jamaicano - World Music Contest',
    heroTitle1: 'Cada riddim.',
    heroTitle2: 'Cada voicing.',
    heroTitle3: 'Clasificado por popularidad.',
    heroText: 'Sumérgete en el universo de los riddims jamaicanos, esas instrumentales legendarias que han moldeado el dancehall, el reggae y la música mundial desde los años 60.',
    ctaExplore: 'Explorar la base de datos',
    ctaAccess: 'Acceder al catálogo',
    statsRiddims: 'Riddims indexados',
    statsVoicings: 'Voicings catalogados',
    statsViews: 'Vistas acumuladas',
    statsGenres: 'Géneros musicales',
    statsDecades: 'Décadas cubiertas',
    statsRiddimsShort: 'Riddims',
    statsVoicingsShort: 'Voicings',
    statsViewsShort: 'Vistas totales',
    statsGenresShort: 'Géneros',
    whatTitle: '¿Qué es un riddim?',
    whatP1: 'Un <strong>riddim</strong> (del inglés "rhythm") es una instrumental jamaicana sobre la cual varios artistas graban sus propias versiones vocales, llamadas <strong>voicings</strong>. Es el fundamento de la música jamaicana desde los años 1960.',
    whatP2: 'A diferencia de la música occidental tradicional donde cada canción tiene su propia producción, un solo riddim puede dar lugar a decenas, incluso cientos de temas diferentes. Esto es lo que hace única la cultura musical jamaicana en el mundo.',
    whatP3: 'Riddims como <strong>Bam Bam</strong> de Sly & Robbie (1982), <strong>Sleng Teng</strong> de King Jammy (1985) o <strong>Diwali</strong> de Lenky Marsden (2002) han atravesado décadas y siguen influyendo en la música contemporánea, del hip-hop al afrobeats.',
    whatP4: 'Nuestra base de datos cataloga los riddims más emblemáticos, sus voicings y las estadísticas de streaming asociadas, para preservar y valorar este patrimonio musical invaluable.',
    genresTitle: 'Los géneros',
    genreReggae: 'Reggae',
    genreReggaeDesc: 'El género fundador. Nacido a finales de los años 60 en Jamaica, el reggae se caracteriza por su offbeat rítmico y sus bajos profundos.',
    genreDancehall: 'Dancehall',
    genreDancehallDesc: 'Evolución digital del reggae surgida en los años 80. El dancehall se distingue por sus ritmos más rápidos, sintetizadores y cultura de sound systems.',
    genreLovers: 'Lovers Rock',
    genreLoversDesc: 'El lado romántico de la música jamaicana. Nacido en la diáspora jamaicana en Londres, el lovers rock privilegia melodías suaves y temas sentimentales.',
    genreSoca: 'Soca',
    genreSocaDesc: 'Fusión de soul y calypso originaria de Trinidad y Tobago. El soca comparte riddims con el dancehall y aporta una energía festiva y carnavalesca única.',
    howTitle: 'Cómo usar la base de datos',
    howStep1Title: 'Explora',
    howStep1Desc: 'Recorre nuestro catálogo de riddims. Filtra por género, tipo, década o busca un artista específico.',
    howStep2Title: 'Descubre',
    howStep2Desc: 'Haz clic en un riddim para ver todos sus voicings, los artistas que lo usaron y las estadísticas de streaming.',
    howStep3Title: 'Escucha',
    howStep3Desc: 'Cada voicing tiene un enlace directo a YouTube para escuchar los temas y comparar versiones.',
    ctaReadyTitle: '¿Listo para explorar?',
    ctaReadyText: 'Descubre los riddims que han moldeado la música jamaicana durante más de 60 años.',
    searchPlaceholder: 'Buscar un riddim, artista o título...',
    filterGenre: 'Género',
    filterType: 'Tipo',
    filterDecade: 'Década',
    filterSort: 'Ordenar por',
    filterAll: 'Todos',
    filterAllFem: 'Todas',
    sortViews: 'Vistas totales',
    sortName: 'Nombre A-Z',
    sortYear: 'Año',
    sortVoicings: 'Nº de voicings',
    typeClassique: 'Clásico',
    typeRagga: 'Ragga',
    typeDigital: 'Digital',
    noResults: 'Ningún riddim encontrado',
    noResultsHint: 'Intenta cambiar tus filtros o búsqueda.',
    views: 'vistas',
    voicings: 'voicings',
    backToCatalog: 'Volver al catálogo',
    totalViews: 'Vistas totales',
    year: 'Año',
    voicingsTitle: 'Voicings',
    listenOnYt: 'Escuchar en YouTube',
    riddimNotFound: 'Riddim no encontrado',
    backToHome: 'Volver al inicio',
    footerText: 'La música jamaicana, organizada.',
    footerNote: 'Las vistas son aproximadas y provienen de las principales plataformas de streaming.',
    decade1960: '1960s', decade1970: '1970s', decade1980: '1980s',
    decade1990: '1990s', decade2000: '2000s', decade2010: '2010s',
    shareTitle: 'Compartir',
    shareCopied: '¡Enlace copiado!',
    shareText: '¡Descubre World Music Contest, la base de datos de riddims jamaicanos!',
    searchButton: 'Buscar',
    exploreRiddims: 'Explorar los riddims',
    allGenres: 'Todos los géneros',
    allDecades: 'Todas las décadas',
    allProducers: 'Todos los productores',
    sortPopularity: 'Popularidad',
    sortYearDesc: 'Año ↓',
    sortYearAsc: 'Año ↑',
    sortNameAz: 'Nombre A–Z',
    searchRiddimArtist: 'Riddim o artista...',
    sectionTitle: 'Todos los riddims',
    sectionSubtitle: 'clasificados por popularidad',
    noRiddimFound: 'Ningún riddim encontrado',
    noRiddimHint: 'Intenta modificar tus filtros',
    badgeText: '🇯🇲 La referencia mundial de los riddims jamaicanos',
    filterByGenre: 'Filtrar por género',
    filterByDecade: 'Filtrar por década',
    filterByProducer: 'Filtrar por productor',
    sortByLabel: 'Ordenar por',
    producer: 'Productor',
    label: 'Sello',
    bpm: 'BPM',
    description: 'Descripción',
    rank: '#',
    artist: 'Artista',
    title: 'Título',
  },

  pt: {
    lang: 'pt',
    langName: 'Português',
    flag: '🇧🇷',
    siteTitle: 'World Music Contest',
    taglineHome: 'A referência dos riddims jamaicanos',
    taglineExplorer: 'Explore o catálogo de riddims',
    navHome: 'Início',
    navExplorer: 'Explorar Riddims',
    metaDescHome: 'Explore o maior banco de dados de riddims jamaicanos. Dancehall, Reggae, Lovers Rock: descubra cada riddim, seus voicings e estatísticas de streaming.',
    metaDescExplorer: 'Pesquise e explore nosso catálogo de riddims jamaicanos. Filtre por gênero, tipo e década.',
    metaDescRiddim: 'Detalhes e voicings deste riddim jamaicano - World Music Contest',
    heroTitle1: 'Cada riddim.',
    heroTitle2: 'Cada voicing.',
    heroTitle3: 'Classificado por popularidade.',
    heroText: 'Mergulhe no universo dos riddims jamaicanos, as instrumentais lendárias que moldaram o dancehall, o reggae e a música mundial desde os anos 60.',
    ctaExplore: 'Explorar o banco de dados',
    ctaAccess: 'Acessar o catálogo',
    statsRiddims: 'Riddims indexados',
    statsVoicings: 'Voicings catalogados',
    statsViews: 'Visualizações acumuladas',
    statsGenres: 'Gêneros musicais',
    statsDecades: 'Décadas cobertas',
    statsRiddimsShort: 'Riddims',
    statsVoicingsShort: 'Voicings',
    statsViewsShort: 'Visualizações totais',
    statsGenresShort: 'Gêneros',
    whatTitle: 'O que é um riddim?',
    whatP1: 'Um <strong>riddim</strong> (do inglês "rhythm") é uma instrumental jamaicana sobre a qual vários artistas gravam suas próprias versões vocais, chamadas <strong>voicings</strong>. É a base da música jamaicana desde os anos 1960.',
    whatP2: 'Diferente da música ocidental tradicional onde cada canção tem sua própria produção, um único riddim pode dar origem a dezenas, até centenas de faixas diferentes. É isso que torna a cultura musical jamaicana única no mundo.',
    whatP3: 'Riddims como <strong>Bam Bam</strong> de Sly & Robbie (1982), <strong>Sleng Teng</strong> de King Jammy (1985) ou <strong>Diwali</strong> de Lenky Marsden (2002) atravessaram décadas e continuam influenciando a música contemporânea, do hip-hop ao afrobeats.',
    whatP4: 'Nosso banco de dados cataloga os riddims mais emblemáticos, seus voicings e estatísticas de streaming associadas, para preservar e valorizar esse patrimônio musical inestimável.',
    genresTitle: 'Os gêneros',
    genreReggae: 'Reggae',
    genreReggaeDesc: 'O gênero fundador. Nascido no final dos anos 60 na Jamaica, o reggae se caracteriza pelo offbeat rítmico e graves profundos.',
    genreDancehall: 'Dancehall',
    genreDancehallDesc: 'Evolução digital do reggae surgida nos anos 80. O dancehall se destaca por seus ritmos mais rápidos, sintetizadores e cultura de sound systems.',
    genreLovers: 'Lovers Rock',
    genreLoversDesc: 'O lado romântico da música jamaicana. Nascido na diáspora jamaicana em Londres, o lovers rock privilegia melodias suaves e temas sentimentais.',
    genreSoca: 'Soca',
    genreSocaDesc: 'Fusão de soul e calypso originária de Trinidad e Tobago. O soca compartilha riddims com o dancehall e traz uma energia festiva e carnavalesca única.',
    howTitle: 'Como usar o banco de dados',
    howStep1Title: 'Explore',
    howStep1Desc: 'Navegue pelo nosso catálogo de riddims. Filtre por gênero, tipo, década ou pesquise um artista específico.',
    howStep2Title: 'Descubra',
    howStep2Desc: 'Clique em um riddim para ver todos os seus voicings, os artistas que o utilizaram e as estatísticas de streaming.',
    howStep3Title: 'Ouça',
    howStep3Desc: 'Cada voicing tem um link direto para o YouTube para ouvir as faixas e comparar versões.',
    ctaReadyTitle: 'Pronto para explorar?',
    ctaReadyText: 'Descubra os riddims que moldaram a música jamaicana por mais de 60 anos.',
    searchPlaceholder: 'Pesquisar um riddim, artista ou título...',
    filterGenre: 'Gênero',
    filterType: 'Tipo',
    filterDecade: 'Década',
    filterSort: 'Ordenar por',
    filterAll: 'Todos',
    filterAllFem: 'Todas',
    sortViews: 'Visualizações totais',
    sortName: 'Nome A-Z',
    sortYear: 'Ano',
    sortVoicings: 'Nº de voicings',
    typeClassique: 'Clássico',
    typeRagga: 'Ragga',
    typeDigital: 'Digital',
    noResults: 'Nenhum riddim encontrado',
    noResultsHint: 'Tente mudar seus filtros ou pesquisa.',
    views: 'visualizações',
    voicings: 'voicings',
    backToCatalog: 'Voltar ao catálogo',
    totalViews: 'Visualizações totais',
    year: 'Ano',
    voicingsTitle: 'Voicings',
    listenOnYt: 'Ouvir no YouTube',
    riddimNotFound: 'Riddim não encontrado',
    backToHome: 'Voltar ao início',
    footerText: 'A música jamaicana, organizada.',
    footerNote: 'As visualizações são aproximadas e provenientes das principais plataformas de streaming.',
    decade1960: '1960s', decade1970: '1970s', decade1980: '1980s',
    decade1990: '1990s', decade2000: '2000s', decade2010: '2010s',
    shareTitle: 'Compartilhar',
    shareCopied: 'Link copiado!',
    shareText: 'Confira o World Music Contest, o banco de dados de riddims jamaicanos!',
    searchButton: 'Pesquisar',
    exploreRiddims: 'Explorar os riddims',
    allGenres: 'Todos os gêneros',
    allDecades: 'Todas as décadas',
    allProducers: 'Todos os produtores',
    sortPopularity: 'Popularidade',
    sortYearDesc: 'Ano ↓',
    sortYearAsc: 'Ano ↑',
    sortNameAz: 'Nome A–Z',
    searchRiddimArtist: 'Riddim ou artista...',
    sectionTitle: 'Todos os riddims',
    sectionSubtitle: 'classificados por popularidade',
    noRiddimFound: 'Nenhum riddim encontrado',
    noRiddimHint: 'Tente modificar seus filtros',
    badgeText: '🇯🇲 A referência mundial dos riddims jamaicanos',
    filterByGenre: 'Filtrar por gênero',
    filterByDecade: 'Filtrar por década',
    filterByProducer: 'Filtrar por produtor',
    sortByLabel: 'Ordenar por',
    producer: 'Produtor',
    label: 'Gravadora',
    bpm: 'BPM',
    description: 'Descrição',
    rank: '#',
    artist: 'Artista',
    title: 'Título',
  },

  ja: {
    lang: 'ja',
    langName: '日本語',
    flag: '🇯🇵',
    siteTitle: 'World Music Contest',
    taglineHome: 'ジャマイカンリディムのリファレンス',
    taglineExplorer: 'リディムカタログを探索',
    navHome: 'ホーム',
    navExplorer: 'リディムを探索',
    metaDescHome: 'ジャマイカンリディムの最大のデータベース。ダンスホール、レゲエ、ラバーズロック：各リディム、ボイシング、ストリーミング統計を発見。',
    metaDescExplorer: 'ジャマイカンリディムのカタログを検索・探索。ジャンル、タイプ、年代でフィルター。',
    metaDescRiddim: 'このジャマイカンリディムの詳細とボイシング - World Music Contest',
    heroTitle1: 'すべてのリディム。',
    heroTitle2: 'すべてのボイシング。',
    heroTitle3: '人気順にランキング。',
    heroText: '1960年代からダンスホール、レゲエ、そして世界の音楽を形作ってきた伝説的なインストゥルメンタル、ジャマイカンリディムの世界へ飛び込もう。',
    ctaExplore: 'データベースを探索',
    ctaAccess: 'カタログにアクセス',
    statsRiddims: '登録リディム数',
    statsVoicings: 'カタログ済みボイシング',
    statsViews: '総再生回数',
    statsGenres: '音楽ジャンル',
    statsDecades: 'カバー年代',
    statsRiddimsShort: 'リディム',
    statsVoicingsShort: 'ボイシング',
    statsViewsShort: '総再生数',
    statsGenresShort: 'ジャンル',
    whatTitle: 'リディムとは？',
    whatP1: '<strong>リディム</strong>（英語の"rhythm"から）は、複数のアーティストがそれぞれのボーカルバージョン（<strong>ボイシング</strong>）を録音するジャマイカのインストゥルメンタルトラックです。1960年代からジャマイカ音楽の基盤となっています。',
    whatP2: '各曲が独自のプロダクションを持つ欧米の伝統的な音楽と異なり、1つのリディムから数十、時には数百の異なるトラックが生まれます。これがジャマイカの音楽文化を世界で唯一無二のものにしています。',
    whatP3: 'Sly & Robbieの<strong>Bam Bam</strong>（1982）、King Jammyの<strong>Sleng Teng</strong>（1985）、Lenky Marsdenの<strong>Diwali</strong>（2002）などのリディムは数十年を超え、ヒップホップからアフロビーツまで現代音楽に影響を与え続けています。',
    whatP4: '私たちのデータベースは、最も象徴的なリディム、そのボイシング、関連するストリーミング統計をカタログ化し、このかけがえのない音楽遺産を保存・紹介しています。',
    genresTitle: 'ジャンル',
    genreReggae: 'レゲエ',
    genreReggaeDesc: '創始のジャンル。1960年代後半にジャマイカで誕生し、リズミカルなオフビートと深いベースラインが特徴。',
    genreDancehall: 'ダンスホール',
    genreDancehallDesc: '1980年代に登場したレゲエのデジタル進化形。より速いリズム、シンセサイザー、サウンドシステム文化が特徴。',
    genreLovers: 'ラバーズロック',
    genreLoversDesc: 'ジャマイカ音楽のロマンティックな一面。ロンドンのジャマイカンディアスポラで生まれ、温かいリディムの上に優しいメロディーと感傷的なテーマを載せます。',
    genreSoca: 'ソカ',
    genreSocaDesc: 'トリニダード・トバゴ発祥のソウルとカリプソの融合。ダンスホールとリディムを共有し、カリブ文化に独自のフェスティバルエナジーをもたらします。',
    howTitle: 'データベースの使い方',
    howStep1Title: '探索',
    howStep1Desc: 'リディムカタログを閲覧。ジャンル、タイプ、年代でフィルター、または特定のアーティストを検索。',
    howStep2Title: '発見',
    howStep2Desc: 'リディムをクリックして、全ボイシング、使用アーティスト、ストリーミング統計を確認。',
    howStep3Title: '聴く',
    howStep3Desc: '各ボイシングにYouTubeへの直接リンクがあり、楽曲を聴いたりバージョンを比較できます。',
    ctaReadyTitle: '探索の準備はできましたか？',
    ctaReadyText: '60年以上にわたりジャマイカ音楽を形作ってきたリディムを発見しよう。',
    searchPlaceholder: 'リディム、アーティスト、タイトルを検索...',
    filterGenre: 'ジャンル',
    filterType: 'タイプ',
    filterDecade: '年代',
    filterSort: '並べ替え',
    filterAll: 'すべて',
    filterAllFem: 'すべて',
    sortViews: '総再生数',
    sortName: '名前 A-Z',
    sortYear: '年',
    sortVoicings: 'ボイシング数',
    typeClassique: 'クラシック',
    typeRagga: 'ラガ',
    typeDigital: 'デジタル',
    noResults: 'リディムが見つかりません',
    noResultsHint: 'フィルターや検索を変更してみてください。',
    views: '再生',
    voicings: 'ボイシング',
    backToCatalog: 'カタログに戻る',
    totalViews: '総再生数',
    year: '年',
    voicingsTitle: 'ボイシング',
    listenOnYt: 'YouTubeで聴く',
    riddimNotFound: 'リディムが見つかりません',
    backToHome: 'ホームに戻る',
    footerText: 'ジャマイカ音楽、整理済み。',
    footerNote: '再生数は概算であり、主要ストリーミングプラットフォームから取得しています。',
    decade1960: '1960年代', decade1970: '1970年代', decade1980: '1980年代',
    decade1990: '1990年代', decade2000: '2000年代', decade2010: '2010年代',
    shareTitle: 'シェア',
    shareCopied: 'リンクをコピーしました！',
    shareText: 'World Music Contestをチェック！ジャマイカンリディムのデータベース！',
    searchButton: '検索',
    exploreRiddims: 'リディムを探索',
    allGenres: 'すべてのジャンル',
    allDecades: 'すべての年代',
    allProducers: 'すべてのプロデューサー',
    sortPopularity: '人気順',
    sortYearDesc: '年 ↓',
    sortYearAsc: '年 ↑',
    sortNameAz: '名前 A–Z',
    searchRiddimArtist: 'リディムまたはアーティスト...',
    sectionTitle: 'すべてのリディム',
    sectionSubtitle: '人気順にランキング',
    noRiddimFound: 'リディムが見つかりません',
    noRiddimHint: 'フィルターを変更してみてください',
    badgeText: '🇯🇲 ジャマイカンリディムの世界的リファレンス',
    filterByGenre: 'ジャンルでフィルター',
    filterByDecade: '年代でフィルター',
    filterByProducer: 'プロデューサーでフィルター',
    sortByLabel: '並べ替え',
    producer: 'プロデューサー',
    label: 'レーベル',
    bpm: 'BPM',
    description: '説明',
    rank: '#',
    artist: 'アーティスト',
    title: 'タイトル',
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
