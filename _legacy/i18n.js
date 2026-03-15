const TRANSLATIONS = {
    fr: {
        lang: "fr",
        langName: "Francais",
        flag: "\ud83c\uddeb\ud83c\uddf7",
        // Header
        siteTitle: "World Music Contest",
        taglineHome: "La r\u00e9f\u00e9rence des riddims jama\u00efcains",
        taglineExplorer: "Explorez le catalogue des riddims",
        navHome: "Accueil",
        navExplorer: "Explorer les Riddims",
        // Meta
        metaDescHome: "Explorez la plus grande base de donn\u00e9es de riddims jama\u00efcains. Dancehall, Reggae, Lovers Rock : d\u00e9couvrez chaque riddim, ses voicings et leurs statistiques de streaming.",
        metaDescExplorer: "Recherchez et explorez notre catalogue de riddims jama\u00efcains. Filtrez par genre, type et d\u00e9cennie.",
        metaDescRiddim: "D\u00e9tails et voicings de ce riddim jama\u00efcain - World Music Contest",
        // Hero
        heroTitle1: "Chaque riddim.",
        heroTitle2: "Chaque voicing.",
        heroTitle3: "Class\u00e9 par popularit\u00e9.",
        heroText: "Plongez dans l'univers des riddims jama\u00efcains, ces instrumentales l\u00e9gendaires qui ont fa\u00e7onn\u00e9 le dancehall, le reggae et la musique mondiale depuis les ann\u00e9es 60.",
        ctaExplore: "Explorer la base de donn\u00e9es",
        ctaAccess: "Acc\u00e9der au catalogue",
        // Stats
        statsRiddims: "Riddims r\u00e9f\u00e9renc\u00e9s",
        statsVoicings: "Voicings catalogu\u00e9s",
        statsViews: "Vues cumul\u00e9es",
        statsGenres: "Genres musicaux",
        statsDecades: "D\u00e9cennies couvertes",
        statsRiddimsShort: "Riddims",
        statsVoicingsShort: "Voicings",
        statsViewsShort: "Vues totales",
        statsGenresShort: "Genres",
        // What is a riddim
        whatTitle: "Qu'est-ce qu'un riddim ?",
        whatP1: "Un <strong>riddim</strong> (de l'anglais \"rhythm\") est une instrumentale jama\u00efcaine sur laquelle plusieurs artistes enregistrent leurs propres versions vocales, appel\u00e9es <strong>voicings</strong>. C'est le fondement m\u00eame de la musique jama\u00efcaine depuis les ann\u00e9es 1960.",
        whatP2: "Contrairement \u00e0 la musique occidentale traditionnelle o\u00f9 chaque chanson a sa propre production, un seul riddim peut donner naissance \u00e0 des dizaines, voire des centaines de morceaux diff\u00e9rents. C'est ce qui rend la culture musicale jama\u00efcaine unique au monde.",
        whatP3: "Des riddims comme le <strong>Bam Bam</strong> de Sly & Robbie (1982), le <strong>Sleng Teng</strong> de King Jammy (1985) ou le <strong>Diwali</strong> de Lenky Marsden (2002) ont travers\u00e9 les d\u00e9cennies et continuent d'influencer la musique contemporaine, du hip-hop \u00e0 l'afrobeats.",
        whatP4: "Notre base de donn\u00e9es recense les riddims les plus embl\u00e9matiques, leurs voicings et les statistiques de streaming associ\u00e9es, pour pr\u00e9server et valoriser ce patrimoine musical inestimable.",
        // Genres
        genresTitle: "Les genres",
        genreReggae: "Reggae",
        genreReggaeDesc: "Le genre fondateur. N\u00e9 \u00e0 la fin des ann\u00e9es 60 en Jama\u00efque, le reggae est caract\u00e9ris\u00e9 par son offbeat rythmique et ses basses profondes. Les riddims reggae du Studio One restent parmi les plus sampl\u00e9s au monde.",
        genreDancehall: "Dancehall",
        genreDancehallDesc: "\u00c9volution digitale du reggae apparue dans les ann\u00e9es 80. Le dancehall se distingue par ses rythmes plus rapides, ses synth\u00e9tiseurs et sa culture des sound systems. C'est le genre le plus prolifique en riddims.",
        genreLovers: "Lovers Rock",
        genreLoversDesc: "Le c\u00f4t\u00e9 romantique de la musique jama\u00efcaine. N\u00e9 dans la diaspora jama\u00efcaine \u00e0 Londres, le lovers rock privil\u00e9gie les m\u00e9lodies douces et les th\u00e8mes sentimentaux sur des riddims chaleureux.",
        genreSoca: "Soca",
        genreSocaDesc: "Fusion de soul et calypso originaire de Trinidad et Tobago. Le soca partage des riddims avec le dancehall et apporte une \u00e9nergie festive et carnival unique \u00e0 la culture carib\u00e9enne.",
        // How to
        howTitle: "Comment utiliser la base de donn\u00e9es",
        howStep1Title: "Explorez",
        howStep1Desc: "Parcourez notre catalogue de riddims. Filtrez par genre, type, d\u00e9cennie ou recherchez un artiste sp\u00e9cifique.",
        howStep2Title: "D\u00e9couvrez",
        howStep2Desc: "Cliquez sur un riddim pour voir tous ses voicings, les artistes qui l'ont utilis\u00e9 et les statistiques de streaming.",
        howStep3Title: "\u00c9coutez",
        howStep3Desc: "Chaque voicing dispose d'un lien direct vers YouTube pour \u00e9couter les morceaux et comparer les versions.",
        // CTA
        ctaReadyTitle: "Pr\u00eat \u00e0 explorer ?",
        ctaReadyText: "D\u00e9couvrez les riddims qui ont fa\u00e7onn\u00e9 la musique jama\u00efcaine depuis plus de 60 ans.",
        // Explorer
        searchPlaceholder: "Rechercher un riddim, un artiste, un titre...",
        filterGenre: "Genre",
        filterType: "Type",
        filterDecade: "D\u00e9cennie",
        filterSort: "Trier par",
        filterAll: "Tous",
        filterAllFem: "Toutes",
        sortViews: "Vues totales",
        sortName: "Nom A-Z",
        sortYear: "Ann\u00e9e",
        sortVoicings: "Nb. de voicings",
        typeClassique: "Classique",
        typeRagga: "Ragga",
        typeDigital: "Digital",
        noResults: "Aucun riddim trouv\u00e9",
        noResultsHint: "Essaye de modifier tes filtres ou ta recherche.",
        views: "vues",
        voicings: "voicings",
        // Riddim page
        backToCatalog: "Retour au catalogue",
        totalViews: "Vues totales",
        year: "Ann\u00e9e",
        voicingsTitle: "Voicings",
        listenOnYt: "\u00c9couter sur YouTube",
        riddimNotFound: "Riddim introuvable",
        backToHome: "Retour \u00e0 l'accueil",
        // Footer
        footerText: "La musique jama\u00efcaine, organis\u00e9e.",
        footerNote: "Les vues sont approximatives et proviennent des principales plateformes de streaming.",
        // Decades
        decade1960: "1960s",
        decade1970: "1970s",
        decade1980: "1980s",
        decade1990: "1990s",
        decade2000: "2000s",
        decade2010: "2010s",
        // Share
        shareTitle: "Partager",
        shareCopied: "Lien copi\u00e9 !",
        shareText: "D\u00e9couvrez World Music Contest, la base de donn\u00e9es des riddims jama\u00efcains !"
    },
    en: {
        lang: "en",
        langName: "English",
        flag: "\ud83c\uddec\ud83c\udde7",
        siteTitle: "World Music Contest",
        taglineHome: "The reference for Jamaican riddims",
        taglineExplorer: "Explore the riddim catalog",
        navHome: "Home",
        navExplorer: "Explore Riddims",
        metaDescHome: "Explore the largest database of Jamaican riddims. Dancehall, Reggae, Lovers Rock: discover every riddim, its voicings and streaming statistics.",
        metaDescExplorer: "Search and explore our catalog of Jamaican riddims. Filter by genre, type and decade.",
        metaDescRiddim: "Details and voicings for this Jamaican riddim - World Music Contest",
        heroTitle1: "Every riddim.",
        heroTitle2: "Every voicing.",
        heroTitle3: "Ranked by popularity.",
        heroText: "Dive into the world of Jamaican riddims, the legendary instrumentals that have shaped dancehall, reggae and global music since the 1960s.",
        ctaExplore: "Explore the database",
        ctaAccess: "Access the catalog",
        statsRiddims: "Riddims indexed",
        statsVoicings: "Voicings cataloged",
        statsViews: "Total views",
        statsGenres: "Music genres",
        statsDecades: "Decades covered",
        statsRiddimsShort: "Riddims",
        statsVoicingsShort: "Voicings",
        statsViewsShort: "Total views",
        statsGenresShort: "Genres",
        whatTitle: "What is a riddim?",
        whatP1: "A <strong>riddim</strong> (from \"rhythm\") is a Jamaican instrumental track on which multiple artists record their own vocal versions, called <strong>voicings</strong>. It has been the foundation of Jamaican music since the 1960s.",
        whatP2: "Unlike traditional Western music where each song has its own production, a single riddim can give birth to dozens or even hundreds of different tracks. This is what makes Jamaican music culture unique in the world.",
        whatP3: "Riddims like <strong>Bam Bam</strong> by Sly & Robbie (1982), <strong>Sleng Teng</strong> by King Jammy (1985) or <strong>Diwali</strong> by Lenky Marsden (2002) have spanned decades and continue to influence contemporary music, from hip-hop to afrobeats.",
        whatP4: "Our database catalogs the most iconic riddims, their voicings and associated streaming statistics, to preserve and celebrate this priceless musical heritage.",
        genresTitle: "The genres",
        genreReggae: "Reggae",
        genreReggaeDesc: "The founding genre. Born in late 1960s Jamaica, reggae is characterized by its rhythmic offbeat and deep basslines. Studio One reggae riddims remain among the most sampled in the world.",
        genreDancehall: "Dancehall",
        genreDancehallDesc: "The digital evolution of reggae that emerged in the 1980s. Dancehall stands out with its faster rhythms, synthesizers and sound system culture. It is the most prolific genre for riddims.",
        genreLovers: "Lovers Rock",
        genreLoversDesc: "The romantic side of Jamaican music. Born in the Jamaican diaspora in London, lovers rock favors soft melodies and sentimental themes over warm riddims.",
        genreSoca: "Soca",
        genreSocaDesc: "A fusion of soul and calypso originating from Trinidad and Tobago. Soca shares riddims with dancehall and brings a unique festive carnival energy to Caribbean culture.",
        howTitle: "How to use the database",
        howStep1Title: "Explore",
        howStep1Desc: "Browse our riddim catalog. Filter by genre, type, decade or search for a specific artist.",
        howStep2Title: "Discover",
        howStep2Desc: "Click on a riddim to see all its voicings, the artists who used it and streaming statistics.",
        howStep3Title: "Listen",
        howStep3Desc: "Each voicing has a direct link to YouTube to listen to the tracks and compare versions.",
        ctaReadyTitle: "Ready to explore?",
        ctaReadyText: "Discover the riddims that have shaped Jamaican music for over 60 years.",
        searchPlaceholder: "Search for a riddim, artist, or title...",
        filterGenre: "Genre",
        filterType: "Type",
        filterDecade: "Decade",
        filterSort: "Sort by",
        filterAll: "All",
        filterAllFem: "All",
        sortViews: "Total views",
        sortName: "Name A-Z",
        sortYear: "Year",
        sortVoicings: "No. of voicings",
        typeClassique: "Classic",
        typeRagga: "Ragga",
        typeDigital: "Digital",
        noResults: "No riddim found",
        noResultsHint: "Try changing your filters or search.",
        views: "views",
        voicings: "voicings",
        backToCatalog: "Back to catalog",
        totalViews: "Total views",
        year: "Year",
        voicingsTitle: "Voicings",
        listenOnYt: "Listen on YouTube",
        riddimNotFound: "Riddim not found",
        backToHome: "Back to home",
        footerText: "Jamaican music, organized.",
        footerNote: "Views are approximate and sourced from major streaming platforms.",
        decade1960: "1960s", decade1970: "1970s", decade1980: "1980s",
        decade1990: "1990s", decade2000: "2000s", decade2010: "2010s",
        shareTitle: "Share",
        shareCopied: "Link copied!",
        shareText: "Check out World Music Contest, the Jamaican riddim database!"
    },
    es: {
        lang: "es",
        langName: "Espa\u00f1ol",
        flag: "\ud83c\uddea\ud83c\uddf8",
        siteTitle: "World Music Contest",
        taglineHome: "La referencia de los riddims jamaicanos",
        taglineExplorer: "Explora el cat\u00e1logo de riddims",
        navHome: "Inicio",
        navExplorer: "Explorar Riddims",
        metaDescHome: "Explora la mayor base de datos de riddims jamaicanos. Dancehall, Reggae, Lovers Rock: descubre cada riddim, sus voicings y estad\u00edsticas de streaming.",
        metaDescExplorer: "Busca y explora nuestro cat\u00e1logo de riddims jamaicanos. Filtra por g\u00e9nero, tipo y d\u00e9cada.",
        metaDescRiddim: "Detalles y voicings de este riddim jamaicano - World Music Contest",
        heroTitle1: "Cada riddim.",
        heroTitle2: "Cada voicing.",
        heroTitle3: "Clasificado por popularidad.",
        heroText: "Sum\u00e9rgete en el universo de los riddims jamaicanos, esas instrumentales legendarias que han moldeado el dancehall, el reggae y la m\u00fasica mundial desde los a\u00f1os 60.",
        ctaExplore: "Explorar la base de datos",
        ctaAccess: "Acceder al cat\u00e1logo",
        statsRiddims: "Riddims indexados",
        statsVoicings: "Voicings catalogados",
        statsViews: "Vistas acumuladas",
        statsGenres: "G\u00e9neros musicales",
        statsDecades: "D\u00e9cadas cubiertas",
        statsRiddimsShort: "Riddims",
        statsVoicingsShort: "Voicings",
        statsViewsShort: "Vistas totales",
        statsGenresShort: "G\u00e9neros",
        whatTitle: "\u00bfQu\u00e9 es un riddim?",
        whatP1: "Un <strong>riddim</strong> (del ingl\u00e9s \"rhythm\") es una instrumental jamaicana sobre la cual varios artistas graban sus propias versiones vocales, llamadas <strong>voicings</strong>. Es el fundamento de la m\u00fasica jamaicana desde los a\u00f1os 1960.",
        whatP2: "A diferencia de la m\u00fasica occidental tradicional donde cada canci\u00f3n tiene su propia producci\u00f3n, un solo riddim puede dar lugar a decenas, incluso cientos de temas diferentes. Esto es lo que hace \u00fanica la cultura musical jamaicana en el mundo.",
        whatP3: "Riddims como <strong>Bam Bam</strong> de Sly & Robbie (1982), <strong>Sleng Teng</strong> de King Jammy (1985) o <strong>Diwali</strong> de Lenky Marsden (2002) han atravesado d\u00e9cadas y siguen influyendo en la m\u00fasica contempor\u00e1nea, del hip-hop al afrobeats.",
        whatP4: "Nuestra base de datos cataloga los riddims m\u00e1s emblem\u00e1ticos, sus voicings y las estad\u00edsticas de streaming asociadas, para preservar y valorar este patrimonio musical invaluable.",
        genresTitle: "Los g\u00e9neros",
        genreReggae: "Reggae",
        genreReggaeDesc: "El g\u00e9nero fundador. Nacido a finales de los a\u00f1os 60 en Jamaica, el reggae se caracteriza por su offbeat r\u00edtmico y sus bajos profundos. Los riddims reggae de Studio One siguen siendo de los m\u00e1s sampleados del mundo.",
        genreDancehall: "Dancehall",
        genreDancehallDesc: "Evoluci\u00f3n digital del reggae surgida en los a\u00f1os 80. El dancehall se distingue por sus ritmos m\u00e1s r\u00e1pidos, sintetizadores y cultura de sound systems. Es el g\u00e9nero m\u00e1s prol\u00edfico en riddims.",
        genreLovers: "Lovers Rock",
        genreLoversDesc: "El lado rom\u00e1ntico de la m\u00fasica jamaicana. Nacido en la di\u00e1spora jamaicana en Londres, el lovers rock privilegia melod\u00edas suaves y temas sentimentales sobre riddims c\u00e1lidos.",
        genreSoca: "Soca",
        genreSocaDesc: "Fusi\u00f3n de soul y calypso originaria de Trinidad y Tobago. El soca comparte riddims con el dancehall y aporta una energ\u00eda festiva y carnavalesca \u00fanica a la cultura caribe\u00f1a.",
        howTitle: "C\u00f3mo usar la base de datos",
        howStep1Title: "Explora",
        howStep1Desc: "Recorre nuestro cat\u00e1logo de riddims. Filtra por g\u00e9nero, tipo, d\u00e9cada o busca un artista espec\u00edfico.",
        howStep2Title: "Descubre",
        howStep2Desc: "Haz clic en un riddim para ver todos sus voicings, los artistas que lo usaron y las estad\u00edsticas de streaming.",
        howStep3Title: "Escucha",
        howStep3Desc: "Cada voicing tiene un enlace directo a YouTube para escuchar los temas y comparar versiones.",
        ctaReadyTitle: "\u00bfListo para explorar?",
        ctaReadyText: "Descubre los riddims que han moldeado la m\u00fasica jamaicana durante m\u00e1s de 60 a\u00f1os.",
        searchPlaceholder: "Buscar un riddim, artista o t\u00edtulo...",
        filterGenre: "G\u00e9nero",
        filterType: "Tipo",
        filterDecade: "D\u00e9cada",
        filterSort: "Ordenar por",
        filterAll: "Todos",
        filterAllFem: "Todas",
        sortViews: "Vistas totales",
        sortName: "Nombre A-Z",
        sortYear: "A\u00f1o",
        sortVoicings: "N\u00ba de voicings",
        typeClassique: "Cl\u00e1sico",
        typeRagga: "Ragga",
        typeDigital: "Digital",
        noResults: "Ning\u00fan riddim encontrado",
        noResultsHint: "Intenta cambiar tus filtros o b\u00fasqueda.",
        views: "vistas",
        voicings: "voicings",
        backToCatalog: "Volver al cat\u00e1logo",
        totalViews: "Vistas totales",
        year: "A\u00f1o",
        voicingsTitle: "Voicings",
        listenOnYt: "Escuchar en YouTube",
        riddimNotFound: "Riddim no encontrado",
        backToHome: "Volver al inicio",
        footerText: "La m\u00fasica jamaicana, organizada.",
        footerNote: "Las vistas son aproximadas y provienen de las principales plataformas de streaming.",
        decade1960: "1960s", decade1970: "1970s", decade1980: "1980s",
        decade1990: "1990s", decade2000: "2000s", decade2010: "2010s",
        shareTitle: "Compartir",
        shareCopied: "\u00a1Enlace copiado!",
        shareText: "\u00a1Descubre World Music Contest, la base de datos de riddims jamaicanos!"
    },
    pt: {
        lang: "pt",
        langName: "Portugu\u00eas",
        flag: "\ud83c\udde7\ud83c\uddf7",
        siteTitle: "World Music Contest",
        taglineHome: "A refer\u00eancia dos riddims jamaicanos",
        taglineExplorer: "Explore o cat\u00e1logo de riddims",
        navHome: "In\u00edcio",
        navExplorer: "Explorar Riddims",
        metaDescHome: "Explore o maior banco de dados de riddims jamaicanos. Dancehall, Reggae, Lovers Rock: descubra cada riddim, seus voicings e estat\u00edsticas de streaming.",
        metaDescExplorer: "Pesquise e explore nosso cat\u00e1logo de riddims jamaicanos. Filtre por g\u00eanero, tipo e d\u00e9cada.",
        metaDescRiddim: "Detalhes e voicings deste riddim jamaicano - World Music Contest",
        heroTitle1: "Cada riddim.",
        heroTitle2: "Cada voicing.",
        heroTitle3: "Classificado por popularidade.",
        heroText: "Mergulhe no universo dos riddims jamaicanos, as instrumentais lend\u00e1rias que moldaram o dancehall, o reggae e a m\u00fasica mundial desde os anos 60.",
        ctaExplore: "Explorar o banco de dados",
        ctaAccess: "Acessar o cat\u00e1logo",
        statsRiddims: "Riddims indexados",
        statsVoicings: "Voicings catalogados",
        statsViews: "Visualiza\u00e7\u00f5es acumuladas",
        statsGenres: "G\u00eaneros musicais",
        statsDecades: "D\u00e9cadas cobertas",
        statsRiddimsShort: "Riddims",
        statsVoicingsShort: "Voicings",
        statsViewsShort: "Visualiza\u00e7\u00f5es totais",
        statsGenresShort: "G\u00eaneros",
        whatTitle: "O que \u00e9 um riddim?",
        whatP1: "Um <strong>riddim</strong> (do ingl\u00eas \"rhythm\") \u00e9 uma instrumental jamaicana sobre a qual v\u00e1rios artistas gravam suas pr\u00f3prias vers\u00f5es vocais, chamadas <strong>voicings</strong>. \u00c9 a base da m\u00fasica jamaicana desde os anos 1960.",
        whatP2: "Diferente da m\u00fasica ocidental tradicional onde cada can\u00e7\u00e3o tem sua pr\u00f3pria produ\u00e7\u00e3o, um \u00fanico riddim pode dar origem a dezenas, at\u00e9 centenas de faixas diferentes. \u00c9 isso que torna a cultura musical jamaicana \u00fanica no mundo.",
        whatP3: "Riddims como <strong>Bam Bam</strong> de Sly & Robbie (1982), <strong>Sleng Teng</strong> de King Jammy (1985) ou <strong>Diwali</strong> de Lenky Marsden (2002) atravessaram d\u00e9cadas e continuam influenciando a m\u00fasica contempor\u00e2nea, do hip-hop ao afrobeats.",
        whatP4: "Nosso banco de dados cataloga os riddims mais emblem\u00e1ticos, seus voicings e estat\u00edsticas de streaming associadas, para preservar e valorizar esse patrim\u00f4nio musical inestim\u00e1vel.",
        genresTitle: "Os g\u00eaneros",
        genreReggae: "Reggae",
        genreReggaeDesc: "O g\u00eanero fundador. Nascido no final dos anos 60 na Jamaica, o reggae se caracteriza pelo offbeat r\u00edtmico e graves profundos. Os riddims reggae do Studio One continuam entre os mais sampleados do mundo.",
        genreDancehall: "Dancehall",
        genreDancehallDesc: "Evolu\u00e7\u00e3o digital do reggae surgida nos anos 80. O dancehall se destaca por seus ritmos mais r\u00e1pidos, sintetizadores e cultura de sound systems. \u00c9 o g\u00eanero mais prol\u00edfico em riddims.",
        genreLovers: "Lovers Rock",
        genreLoversDesc: "O lado rom\u00e2ntico da m\u00fasica jamaicana. Nascido na di\u00e1spora jamaicana em Londres, o lovers rock privilegia melodias suaves e temas sentimentais sobre riddims calorosos.",
        genreSoca: "Soca",
        genreSocaDesc: "Fus\u00e3o de soul e calypso origin\u00e1ria de Trinidad e Tobago. O soca compartilha riddims com o dancehall e traz uma energia festiva e carnavalesca \u00fanica \u00e0 cultura caribenha.",
        howTitle: "Como usar o banco de dados",
        howStep1Title: "Explore",
        howStep1Desc: "Navegue pelo nosso cat\u00e1logo de riddims. Filtre por g\u00eanero, tipo, d\u00e9cada ou pesquise um artista espec\u00edfico.",
        howStep2Title: "Descubra",
        howStep2Desc: "Clique em um riddim para ver todos os seus voicings, os artistas que o utilizaram e as estat\u00edsticas de streaming.",
        howStep3Title: "Ou\u00e7a",
        howStep3Desc: "Cada voicing tem um link direto para o YouTube para ouvir as faixas e comparar vers\u00f5es.",
        ctaReadyTitle: "Pronto para explorar?",
        ctaReadyText: "Descubra os riddims que moldaram a m\u00fasica jamaicana por mais de 60 anos.",
        searchPlaceholder: "Pesquisar um riddim, artista ou t\u00edtulo...",
        filterGenre: "G\u00eanero",
        filterType: "Tipo",
        filterDecade: "D\u00e9cada",
        filterSort: "Ordenar por",
        filterAll: "Todos",
        filterAllFem: "Todas",
        sortViews: "Visualiza\u00e7\u00f5es totais",
        sortName: "Nome A-Z",
        sortYear: "Ano",
        sortVoicings: "N\u00ba de voicings",
        typeClassique: "Cl\u00e1ssico",
        typeRagga: "Ragga",
        typeDigital: "Digital",
        noResults: "Nenhum riddim encontrado",
        noResultsHint: "Tente mudar seus filtros ou pesquisa.",
        views: "visualiza\u00e7\u00f5es",
        voicings: "voicings",
        backToCatalog: "Voltar ao cat\u00e1logo",
        totalViews: "Visualiza\u00e7\u00f5es totais",
        year: "Ano",
        voicingsTitle: "Voicings",
        listenOnYt: "Ouvir no YouTube",
        riddimNotFound: "Riddim n\u00e3o encontrado",
        backToHome: "Voltar ao in\u00edcio",
        footerText: "A m\u00fasica jamaicana, organizada.",
        footerNote: "As visualiza\u00e7\u00f5es s\u00e3o aproximadas e provenientes das principais plataformas de streaming.",
        decade1960: "1960s", decade1970: "1970s", decade1980: "1980s",
        decade1990: "1990s", decade2000: "2000s", decade2010: "2010s",
        shareTitle: "Compartilhar",
        shareCopied: "Link copiado!",
        shareText: "Confira o World Music Contest, o banco de dados de riddims jamaicanos!"
    },
    ja: {
        lang: "ja",
        langName: "\u65e5\u672c\u8a9e",
        flag: "\ud83c\uddef\ud83c\uddf5",
        siteTitle: "World Music Contest",
        taglineHome: "\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u30ea\u30d5\u30a1\u30ec\u30f3\u30b9",
        taglineExplorer: "\u30ea\u30c7\u30a3\u30e0\u30ab\u30bf\u30ed\u30b0\u3092\u63a2\u7d22",
        navHome: "\u30db\u30fc\u30e0",
        navExplorer: "\u30ea\u30c7\u30a3\u30e0\u3092\u63a2\u7d22",
        metaDescHome: "\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u6700\u5927\u306e\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3002\u30c0\u30f3\u30b9\u30db\u30fc\u30eb\u3001\u30ec\u30b2\u30a8\u3001\u30e9\u30d0\u30fc\u30ba\u30ed\u30c3\u30af\uff1a\u5404\u30ea\u30c7\u30a3\u30e0\u3001\u30dc\u30a4\u30b7\u30f3\u30b0\u3001\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u7d71\u8a08\u3092\u767a\u898b\u3002",
        metaDescExplorer: "\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u30ab\u30bf\u30ed\u30b0\u3092\u691c\u7d22\u30fb\u63a2\u7d22\u3002\u30b8\u30e3\u30f3\u30eb\u3001\u30bf\u30a4\u30d7\u3001\u5e74\u4ee3\u3067\u30d5\u30a3\u30eb\u30bf\u30fc\u3002",
        metaDescRiddim: "\u3053\u306e\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u8a73\u7d30\u3068\u30dc\u30a4\u30b7\u30f3\u30b0 - World Music Contest",
        heroTitle1: "\u3059\u3079\u3066\u306e\u30ea\u30c7\u30a3\u30e0\u3002",
        heroTitle2: "\u3059\u3079\u3066\u306e\u30dc\u30a4\u30b7\u30f3\u30b0\u3002",
        heroTitle3: "\u4eba\u6c17\u9806\u306b\u30e9\u30f3\u30ad\u30f3\u30b0\u3002",
        heroText: "1960\u5e74\u4ee3\u304b\u3089\u30c0\u30f3\u30b9\u30db\u30fc\u30eb\u3001\u30ec\u30b2\u30a8\u3001\u305d\u3057\u3066\u4e16\u754c\u306e\u97f3\u697d\u3092\u5f62\u4f5c\u3063\u3066\u304d\u305f\u4f1d\u8aac\u7684\u306a\u30a4\u30f3\u30b9\u30c8\u30a5\u30eb\u30e1\u30f3\u30bf\u30eb\u3001\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u4e16\u754c\u3078\u98db\u3073\u8fbc\u3082\u3046\u3002",
        ctaExplore: "\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3092\u63a2\u7d22",
        ctaAccess: "\u30ab\u30bf\u30ed\u30b0\u306b\u30a2\u30af\u30bb\u30b9",
        statsRiddims: "\u767b\u9332\u30ea\u30c7\u30a3\u30e0\u6570",
        statsVoicings: "\u30ab\u30bf\u30ed\u30b0\u6e08\u307f\u30dc\u30a4\u30b7\u30f3\u30b0",
        statsViews: "\u7dcf\u518d\u751f\u56de\u6570",
        statsGenres: "\u97f3\u697d\u30b8\u30e3\u30f3\u30eb",
        statsDecades: "\u30ab\u30d0\u30fc\u5e74\u4ee3",
        statsRiddimsShort: "\u30ea\u30c7\u30a3\u30e0",
        statsVoicingsShort: "\u30dc\u30a4\u30b7\u30f3\u30b0",
        statsViewsShort: "\u7dcf\u518d\u751f\u6570",
        statsGenresShort: "\u30b8\u30e3\u30f3\u30eb",
        whatTitle: "\u30ea\u30c7\u30a3\u30e0\u3068\u306f\uff1f",
        whatP1: "<strong>\u30ea\u30c7\u30a3\u30e0</strong>\uff08\u82f1\u8a9e\u306e\"rhythm\"\u304b\u3089\uff09\u306f\u3001\u8907\u6570\u306e\u30a2\u30fc\u30c6\u30a3\u30b9\u30c8\u304c\u305d\u308c\u305e\u308c\u306e\u30dc\u30fc\u30ab\u30eb\u30d0\u30fc\u30b8\u30e7\u30f3\uff08<strong>\u30dc\u30a4\u30b7\u30f3\u30b0</strong>\uff09\u3092\u9332\u97f3\u3059\u308b\u30b8\u30e3\u30de\u30a4\u30ab\u306e\u30a4\u30f3\u30b9\u30c8\u30a5\u30eb\u30e1\u30f3\u30bf\u30eb\u30c8\u30e9\u30c3\u30af\u3067\u3059\u30021960\u5e74\u4ee3\u304b\u3089\u30b8\u30e3\u30de\u30a4\u30ab\u97f3\u697d\u306e\u57fa\u76e4\u3068\u306a\u3063\u3066\u3044\u307e\u3059\u3002",
        whatP2: "\u5404\u66f2\u304c\u72ec\u81ea\u306e\u30d7\u30ed\u30c0\u30af\u30b7\u30e7\u30f3\u3092\u6301\u3064\u6b27\u7c73\u306e\u4f1d\u7d71\u7684\u306a\u97f3\u697d\u3068\u7570\u306a\u308a\u30011\u3064\u306e\u30ea\u30c7\u30a3\u30e0\u304b\u3089\u6570\u5341\u3001\u6642\u306b\u306f\u6570\u767e\u306e\u7570\u306a\u308b\u30c8\u30e9\u30c3\u30af\u304c\u751f\u307e\u308c\u307e\u3059\u3002\u3053\u308c\u304c\u30b8\u30e3\u30de\u30a4\u30ab\u306e\u97f3\u697d\u6587\u5316\u3092\u4e16\u754c\u3067\u552f\u4e00\u7121\u4e8c\u306e\u3082\u306e\u306b\u3057\u3066\u3044\u307e\u3059\u3002",
        whatP3: "Sly & Robbie\u306e<strong>Bam Bam</strong>\uff081982\uff09\u3001King Jammy\u306e<strong>Sleng Teng</strong>\uff081985\uff09\u3001Lenky Marsden\u306e<strong>Diwali</strong>\uff082002\uff09\u306a\u3069\u306e\u30ea\u30c7\u30a3\u30e0\u306f\u6570\u5341\u5e74\u3092\u8d85\u3048\u3001\u30d2\u30c3\u30d7\u30db\u30c3\u30d7\u304b\u3089\u30a2\u30d5\u30ed\u30d3\u30fc\u30c4\u307e\u3067\u73fe\u4ee3\u97f3\u697d\u306b\u5f71\u97ff\u3092\u4e0e\u3048\u7d9a\u3051\u3066\u3044\u307e\u3059\u3002",
        whatP4: "\u79c1\u305f\u3061\u306e\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306f\u3001\u6700\u3082\u8c61\u5fb4\u7684\u306a\u30ea\u30c7\u30a3\u30e0\u3001\u305d\u306e\u30dc\u30a4\u30b7\u30f3\u30b0\u3001\u95a2\u9023\u3059\u308b\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u7d71\u8a08\u3092\u30ab\u30bf\u30ed\u30b0\u5316\u3057\u3001\u3053\u306e\u304b\u3051\u304c\u3048\u306e\u306a\u3044\u97f3\u697d\u907a\u7523\u3092\u4fdd\u5b58\u30fb\u7d39\u4ecb\u3057\u3066\u3044\u307e\u3059\u3002",
        genresTitle: "\u30b8\u30e3\u30f3\u30eb",
        genreReggae: "\u30ec\u30b2\u30a8",
        genreReggaeDesc: "\u5275\u59cb\u306e\u30b8\u30e3\u30f3\u30eb\u30021960\u5e74\u4ee3\u5f8c\u534a\u306b\u30b8\u30e3\u30de\u30a4\u30ab\u3067\u8a95\u751f\u3057\u3001\u30ea\u30ba\u30df\u30ab\u30eb\u306a\u30aa\u30d5\u30d3\u30fc\u30c8\u3068\u6df1\u3044\u30d9\u30fc\u30b9\u30e9\u30a4\u30f3\u304c\u7279\u5fb4\u3002Studio One\u306e\u30ec\u30b2\u30a8\u30ea\u30c7\u30a3\u30e0\u306f\u4e16\u754c\u3067\u6700\u3082\u30b5\u30f3\u30d7\u30ea\u30f3\u30b0\u3055\u308c\u3066\u3044\u308b\u3082\u306e\u306e\u4e00\u3064\u3067\u3059\u3002",
        genreDancehall: "\u30c0\u30f3\u30b9\u30db\u30fc\u30eb",
        genreDancehallDesc: "1980\u5e74\u4ee3\u306b\u767b\u5834\u3057\u305f\u30ec\u30b2\u30a8\u306e\u30c7\u30b8\u30bf\u30eb\u9032\u5316\u5f62\u3002\u3088\u308a\u901f\u3044\u30ea\u30ba\u30e0\u3001\u30b7\u30f3\u30bb\u30b5\u30a4\u30b6\u30fc\u3001\u30b5\u30a6\u30f3\u30c9\u30b7\u30b9\u30c6\u30e0\u6587\u5316\u304c\u7279\u5fb4\u3002\u30ea\u30c7\u30a3\u30e0\u306e\u6570\u304c\u6700\u3082\u591a\u3044\u30b8\u30e3\u30f3\u30eb\u3067\u3059\u3002",
        genreLovers: "\u30e9\u30d0\u30fc\u30ba\u30ed\u30c3\u30af",
        genreLoversDesc: "\u30b8\u30e3\u30de\u30a4\u30ab\u97f3\u697d\u306e\u30ed\u30de\u30f3\u30c6\u30a3\u30c3\u30af\u306a\u4e00\u9762\u3002\u30ed\u30f3\u30c9\u30f3\u306e\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30c7\u30a3\u30a2\u30b9\u30dd\u30e9\u3067\u751f\u307e\u308c\u3001\u6e29\u304b\u3044\u30ea\u30c7\u30a3\u30e0\u306e\u4e0a\u306b\u512a\u3057\u3044\u30e1\u30ed\u30c7\u30a3\u30fc\u3068\u611f\u50b7\u7684\u306a\u30c6\u30fc\u30de\u3092\u8f09\u305b\u307e\u3059\u3002",
        genreSoca: "\u30bd\u30ab",
        genreSocaDesc: "\u30c8\u30ea\u30cb\u30c0\u30fc\u30c9\u30fb\u30c8\u30d0\u30b4\u767a\u7965\u306e\u30bd\u30a6\u30eb\u3068\u30ab\u30ea\u30d7\u30bd\u306e\u878d\u5408\u3002\u30c0\u30f3\u30b9\u30db\u30fc\u30eb\u3068\u30ea\u30c7\u30a3\u30e0\u3092\u5171\u6709\u3057\u3001\u30ab\u30ea\u30d6\u6587\u5316\u306b\u72ec\u81ea\u306e\u30d5\u30a7\u30b9\u30c6\u30a3\u30d0\u30eb\u30a8\u30ca\u30b8\u30fc\u3092\u3082\u305f\u3089\u3057\u307e\u3059\u3002",
        howTitle: "\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306e\u4f7f\u3044\u65b9",
        howStep1Title: "\u63a2\u7d22",
        howStep1Desc: "\u30ea\u30c7\u30a3\u30e0\u30ab\u30bf\u30ed\u30b0\u3092\u95b2\u89a7\u3002\u30b8\u30e3\u30f3\u30eb\u3001\u30bf\u30a4\u30d7\u3001\u5e74\u4ee3\u3067\u30d5\u30a3\u30eb\u30bf\u30fc\u3001\u307e\u305f\u306f\u7279\u5b9a\u306e\u30a2\u30fc\u30c6\u30a3\u30b9\u30c8\u3092\u691c\u7d22\u3002",
        howStep2Title: "\u767a\u898b",
        howStep2Desc: "\u30ea\u30c7\u30a3\u30e0\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u3001\u5168\u30dc\u30a4\u30b7\u30f3\u30b0\u3001\u4f7f\u7528\u30a2\u30fc\u30c6\u30a3\u30b9\u30c8\u3001\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u7d71\u8a08\u3092\u78ba\u8a8d\u3002",
        howStep3Title: "\u8074\u304f",
        howStep3Desc: "\u5404\u30dc\u30a4\u30b7\u30f3\u30b0\u306bYouTube\u3078\u306e\u76f4\u63a5\u30ea\u30f3\u30af\u304c\u3042\u308a\u3001\u697d\u66f2\u3092\u8074\u3044\u305f\u308a\u30d0\u30fc\u30b8\u30e7\u30f3\u3092\u6bd4\u8f03\u3067\u304d\u307e\u3059\u3002",
        ctaReadyTitle: "\u63a2\u7d22\u306e\u6e96\u5099\u306f\u3067\u304d\u307e\u3057\u305f\u304b\uff1f",
        ctaReadyText: "60\u5e74\u4ee5\u4e0a\u306b\u308f\u305f\u308a\u30b8\u30e3\u30de\u30a4\u30ab\u97f3\u697d\u3092\u5f62\u4f5c\u3063\u3066\u304d\u305f\u30ea\u30c7\u30a3\u30e0\u3092\u767a\u898b\u3057\u3088\u3046\u3002",
        searchPlaceholder: "\u30ea\u30c7\u30a3\u30e0\u3001\u30a2\u30fc\u30c6\u30a3\u30b9\u30c8\u3001\u30bf\u30a4\u30c8\u30eb\u3092\u691c\u7d22...",
        filterGenre: "\u30b8\u30e3\u30f3\u30eb",
        filterType: "\u30bf\u30a4\u30d7",
        filterDecade: "\u5e74\u4ee3",
        filterSort: "\u4e26\u3079\u66ff\u3048",
        filterAll: "\u3059\u3079\u3066",
        filterAllFem: "\u3059\u3079\u3066",
        sortViews: "\u7dcf\u518d\u751f\u6570",
        sortName: "\u540d\u524d A-Z",
        sortYear: "\u5e74",
        sortVoicings: "\u30dc\u30a4\u30b7\u30f3\u30b0\u6570",
        typeClassique: "\u30af\u30e9\u30b7\u30c3\u30af",
        typeRagga: "\u30e9\u30ac",
        typeDigital: "\u30c7\u30b8\u30bf\u30eb",
        noResults: "\u30ea\u30c7\u30a3\u30e0\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
        noResultsHint: "\u30d5\u30a3\u30eb\u30bf\u30fc\u3084\u691c\u7d22\u3092\u5909\u66f4\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002",
        views: "\u518d\u751f",
        voicings: "\u30dc\u30a4\u30b7\u30f3\u30b0",
        backToCatalog: "\u30ab\u30bf\u30ed\u30b0\u306b\u623b\u308b",
        totalViews: "\u7dcf\u518d\u751f\u6570",
        year: "\u5e74",
        voicingsTitle: "\u30dc\u30a4\u30b7\u30f3\u30b0",
        listenOnYt: "YouTube\u3067\u8074\u304f",
        riddimNotFound: "\u30ea\u30c7\u30a3\u30e0\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
        backToHome: "\u30db\u30fc\u30e0\u306b\u623b\u308b",
        footerText: "\u30b8\u30e3\u30de\u30a4\u30ab\u97f3\u697d\u3001\u6574\u7406\u6e08\u307f\u3002",
        footerNote: "\u518d\u751f\u6570\u306f\u6982\u7b97\u3067\u3042\u308a\u3001\u4e3b\u8981\u30b9\u30c8\u30ea\u30fc\u30df\u30f3\u30b0\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u304b\u3089\u53d6\u5f97\u3057\u3066\u3044\u307e\u3059\u3002",
        decade1960: "1960\u5e74\u4ee3", decade1970: "1970\u5e74\u4ee3", decade1980: "1980\u5e74\u4ee3",
        decade1990: "1990\u5e74\u4ee3", decade2000: "2000\u5e74\u4ee3", decade2010: "2010\u5e74\u4ee3",
        shareTitle: "\u30b7\u30a7\u30a2",
        shareCopied: "\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\uff01",
        shareText: "World Music Contest\u3092\u30c1\u30a7\u30c3\u30af\uff01\u30b8\u30e3\u30de\u30a4\u30ab\u30f3\u30ea\u30c7\u30a3\u30e0\u306e\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\uff01"
    }
};

// Detect language from path or default to 'fr'
function detectLang() {
    const path = window.location.pathname;
    const match = path.match(/\/(fr|en|es|pt|ja)\//);
    if (match) return match[1];
    // Check html lang attribute
    const htmlLang = document.documentElement.lang;
    if (TRANSLATIONS[htmlLang]) return htmlLang;
    return 'fr';
}

function getT() {
    return TRANSLATIONS[detectLang()];
}

// Get base path for links (e.g., "/en/" or "/fr/")
function getLangBase() {
    const lang = detectLang();
    const path = window.location.pathname;
    const match = path.match(/^(.*\/(fr|en|es|pt|ja)\/)/);
    if (match) return match[1];
    return `/${lang}/`;
}

// Build floating share button
function buildShareButton() {
    const t = getT();
    const shareHTML = `
    <div class="share-fab" id="shareFab">
        <button class="share-fab-btn" id="shareFabBtn" title="${t.shareTitle}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
        </button>
        <div class="share-menu" id="shareMenu">
            <a class="share-option share-whatsapp" id="shareWhatsApp" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a class="share-option share-x" id="shareX" target="_blank" rel="noopener noreferrer" title="X">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a class="share-option share-facebook" id="shareFacebook" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <button class="share-option share-copy" id="shareCopy" title="${t.shareCopied}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
            </button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', shareHTML);

    const fab = document.getElementById('shareFab');
    const fabBtn = document.getElementById('shareFabBtn');
    const menu = document.getElementById('shareMenu');
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(t.shareText);

    fabBtn.addEventListener('click', () => {
        fab.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!fab.contains(e.target)) {
            fab.classList.remove('open');
        }
    });

    document.getElementById('shareWhatsApp').href = `https://wa.me/?text=${text}%20${url}`;
    document.getElementById('shareX').href = `https://x.com/intent/tweet?text=${text}&url=${url}`;
    document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    document.getElementById('shareCopy').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.getElementById('shareCopy');
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 2000);
        });
    });
}

// Build language switcher HTML
function buildLangSwitcher() {
    const currentLang = detectLang();
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    const search = window.location.search;

    let html = '<div class="lang-switcher">';
    for (const [code, t] of Object.entries(TRANSLATIONS)) {
        const active = code === currentLang ? ' active' : '';
        // Build the path for this language
        const newPath = currentPath.replace(/\/(fr|en|es|pt|ja)\//, `/${code}/`);
        html += `<a href="${newPath}${search}" class="lang-option${active}" title="${t.langName}">${t.flag}</a>`;
    }
    html += '</div>';
    return html;
}
