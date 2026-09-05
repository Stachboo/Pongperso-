/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ÉDITORIAL RIDDIMS (histoire & influence, sourcé)
   Contenu rédactionnel approfondi pour les riddims phares, dans les 5 langues.
   Chaque entrée est adossée à des sources réelles (aucune donnée inventée) et
   n'est affichée que pour les riddims qui en disposent ; les autres conservent
   le résumé dérivé automatiquement.
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Locale } from '@/lib/i18n';

export interface RiddimEditorial {
  /** Récit d'histoire & d'influence, par langue. */
  text: Record<Locale, string>;
  /** Sources réelles consultées pour ce contenu. */
  sources: { title: string; url: string }[];
}

/** Titre de la section, par langue. */
export const EDITORIAL_SECTION_TITLE: Record<Locale, string> = {
  fr: 'Histoire & influence',
  en: 'History & influence',
  es: 'Historia e influencia',
  pt: 'História e influência',
  ja: '歴史と影響',
};

/** Libellé de la liste de sources, par langue. */
export const EDITORIAL_SOURCES_LABEL: Record<Locale, string> = {
  fr: 'Sources',
  en: 'Sources',
  es: 'Fuentes',
  pt: 'Fontes',
  ja: '出典',
};

/**
 * Éditorial par identifiant de riddim. Seuls les riddims phares (les plus
 * documentés) y figurent ; l'absence d'entrée déclenche le résumé dérivé.
 */
export const riddimEditorial: Record<number, RiddimEditorial> = {
  // ─── #1 · Diwali (2002, Steven "Lenky" Marsden) ────────────────────────────
  1: {
    text: {
      fr: "Le Diwali est l'un des riddims dancehall les plus marquants du début des années 2000. Produit par Steven « Lenky » Marsden et publié en 2002 chez Greensleeves Records, il repose sur un motif de claps syncopés et de nappes de synthé ; son nom rend hommage à Diwali, la fête hindoue des lumières, en clin d'œil à son influence indienne. Le riddim a porté plusieurs succès internationaux : « Get Busy » de Sean Paul, premier numéro un de l'artiste au Billboard Hot 100 américain, et « No Letting Go » de Wayne Wonder, son plus grand tube (top 5 au Royaume-Uni). On y trouve aussi « Sufferer » de Bounty Killer et Wayne Marshall, ou « Can't Touch Me No More » de Tanya Stephens. Plutôt que de dupliquer une seule boucle, Marsden réenregistrait des variations pour chaque artiste. Le Diwali a incarné le passage du dancehall jamaïcain vers la pop mondiale, au point que le New York Times l'a décrit comme l'un des rythmes reggae les plus populaires de tous les temps.",
      en: "Diwali is one of the defining dancehall riddims of the early 2000s. Produced by Steven “Lenky” Marsden and released in 2002 on Greensleeves Records, it is built on a pattern of syncopated hand-claps and synth stabs; its name nods to Diwali, the Hindu festival of lights, echoing its Indian-tinged feel. The riddim carried several international hits: Sean Paul's “Get Busy,” the artist's first US Billboard Hot 100 number one, and Wayne Wonder's “No Letting Go,” his biggest single (a UK top five). It also hosts Bounty Killer and Wayne Marshall's “Sufferer” and Tanya Stephens' “Can't Touch Me No More.” Rather than duplicating a single loop, Marsden re-recorded variations for each artist. Diwali came to embody dancehall's crossover into global pop — the New York Times called it one of the most popular reggae rhythms of all time.",
      es: "El Diwali es uno de los riddims de dancehall más determinantes de comienzos de los años 2000. Producido por Steven «Lenky» Marsden y publicado en 2002 por Greensleeves Records, se construye sobre un patrón de palmas sincopadas y golpes de sintetizador; su nombre alude a Diwali, la fiesta hindú de las luces, en guiño a su aire de influencia india. El riddim sostuvo varios éxitos internacionales: «Get Busy» de Sean Paul, su primer número uno en el Billboard Hot 100 estadounidense, y «No Letting Go» de Wayne Wonder, su mayor sencillo (top cinco en el Reino Unido). También acoge «Sufferer» de Bounty Killer y Wayne Marshall, o «Can't Touch Me No More» de Tanya Stephens. En lugar de duplicar un solo bucle, Marsden regrababa variaciones para cada artista. El Diwali encarnó el cruce del dancehall hacia el pop mundial; el New York Times lo describió como uno de los ritmos de reggae más populares de todos los tiempos.",
      pt: "O Diwali é um dos riddims de dancehall mais marcantes do início dos anos 2000. Produzido por Steven «Lenky» Marsden e lançado em 2002 pela Greensleeves Records, apoia-se num padrão de palmas sincopadas e golpes de sintetizador; o nome remete a Diwali, o festival hindu das luzes, num aceno à sua sonoridade de influência indiana. O riddim sustentou vários sucessos internacionais: «Get Busy» de Sean Paul, o primeiro número um do artista na Billboard Hot 100 dos EUA, e «No Letting Go» de Wayne Wonder, o seu maior single (top cinco no Reino Unido). Também abriga «Sufferer» de Bounty Killer e Wayne Marshall, ou «Can't Touch Me No More» de Tanya Stephens. Em vez de duplicar um único loop, Marsden regravava variações para cada artista. O Diwali encarnou a passagem do dancehall para o pop mundial; o New York Times descreveu-o como um dos ritmos de reggae mais populares de todos os tempos.",
      ja: "Diwali は、2000 年代初頭を象徴するダンスホール・リディムの一つです。Steven「Lenky」Marsden がプロデュースし、2002 年に Greensleeves Records からリリースされました。シンコペーションの効いた手拍子とシンセの刺すような音で構成され、その名はヒンドゥー教の光の祭り「ディワリ」に由来し、インド的な色合いを反映しています。このリディムは複数の国際的ヒットを生みました。Sean Paul の「Get Busy」は彼にとって全米 Billboard Hot 100 初の 1 位となり、Wayne Wonder の「No Letting Go」は彼最大のシングル（英国トップ 5）となりました。ほかに Bounty Killer と Wayne Marshall の「Sufferer」、Tanya Stephens の「Can't Touch Me No More」も収録されています。Marsden は単一のループを使い回すのではなく、アーティストごとにバリエーションを録り直しました。Diwali はダンスホールが世界的ポップへと越境した時代を体現し、ニューヨーク・タイムズは史上最も人気のあるレゲエ・リズムの一つと評しました。",
    },
    sources: [
      { title: 'Diwali Riddim — Wikipedia', url: 'https://en.wikipedia.org/wiki/Diwali_Riddim' },
      { title: 'The Diwali Riddim story — Billboard', url: 'https://www.billboard.com/music/rb-hip-hop/diwali-riddim-2003-story-lenky-producer-sean-paul-get-busy-1235301278/' },
      { title: 'A History of the Diwali Loop — Red Bull Music Academy', url: 'https://daily.redbullmusicacademy.com/2015/10/diwali-loop-history/' },
    ],
  },

  // ─── #4 · Stalag (1973, Ansell Collins / Winston Riley) ─────────────────────
  4: {
    text: {
      fr: "Le Stalag est l'un des riddims les plus réinterprétés de toute l'histoire du reggae. À l'origine, « Stalag 17 » est une instrumentale du claviériste Ansell Collins, produite par Winston Riley et publiée sur son label Techniques en 1973 — son nom fait référence au film de guerre de 1953. Devenu une matrice réutilisable, il a connu une seconde vie dans le dancehall des années 1980. Sa version la plus célèbre est « Ring the Alarm » de Tenor Saw, le plus grand succès de sa carrière. C'est aussi sur le Stalag qu'est bâti « Bam Bam » de Sister Nancy (1982), devenu l'un des morceaux de reggae les plus échantillonnés au monde. Réenregistré par des dizaines d'artistes et samplé jusque dans le hip-hop, le Stalag illustre le principe même du riddim jamaïcain : une fondation instrumentale que chaque génération se réapproprie.",
      en: "Stalag is one of the most re-voiced riddims in all of reggae. It began as “Stalag 17,” an instrumental by keyboardist Ansell Collins, produced by Winston Riley and released on his Techniques label in 1973 — its name a nod to the 1953 war film. As a reusable template it found a second life in 1980s dancehall. Its most celebrated version is Tenor Saw's “Ring the Alarm,” the biggest hit of his career. Sister Nancy's “Bam Bam” (1982) is also built on Stalag, and went on to become one of the most-sampled reggae records in the world. Re-recorded by dozens of artists and sampled well into hip-hop, Stalag embodies the very principle of the Jamaican riddim: an instrumental foundation that each generation makes its own.",
      es: "El Stalag es uno de los riddims más reinterpretados de toda la historia del reggae. Nació como «Stalag 17», una instrumental del tecladista Ansell Collins, producida por Winston Riley y publicada en su sello Techniques en 1973 —su nombre alude a la película bélica de 1953—. Como matriz reutilizable, tuvo una segunda vida en el dancehall de los años 1980. Su versión más célebre es «Ring the Alarm» de Tenor Saw, el mayor éxito de su carrera. Sobre el Stalag también se construye «Bam Bam» de Sister Nancy (1982), que llegó a ser uno de los discos de reggae más sampleados del mundo. Regrabado por decenas de artistas y sampleado hasta en el hip-hop, el Stalag encarna el principio mismo del riddim jamaicano: una base instrumental que cada generación hace suya.",
      pt: "O Stalag é um dos riddims mais reinterpretados de toda a história do reggae. Começou como «Stalag 17», uma instrumental do tecladista Ansell Collins, produzida por Winston Riley e lançada na sua editora Techniques em 1973 — o nome remete ao filme de guerra de 1953. Como matriz reutilizável, teve uma segunda vida no dancehall dos anos 1980. A sua versão mais célebre é «Ring the Alarm» de Tenor Saw, o maior sucesso da sua carreira. Sobre o Stalag também se constrói «Bam Bam» de Sister Nancy (1982), que se tornou um dos discos de reggae mais sampleados do mundo. Regravado por dezenas de artistas e sampleado até no hip-hop, o Stalag encarna o próprio princípio do riddim jamaicano: uma base instrumental que cada geração torna sua.",
      ja: "Stalag は、レゲエ史上でも最も多く歌い直されたリディムの一つです。もとは鍵盤奏者 Ansell Collins によるインスト曲「Stalag 17」で、Winston Riley がプロデュースし、1973 年に彼のレーベル Techniques からリリースされました（その名は 1953 年の戦争映画に由来します）。再利用可能な土台として、1980 年代のダンスホールで second life を得ました。最も有名なバージョンは Tenor Saw の「Ring the Alarm」で、彼のキャリア最大のヒットです。Sister Nancy の「Bam Bam」（1982 年）も Stalag の上に作られ、世界で最もサンプリングされたレゲエ作品の一つとなりました。何十人ものアーティストに録り直され、ヒップホップにまでサンプリングされた Stalag は、ジャマイカのリディムの原理そのもの——各世代が自分のものにするインストの土台——を体現しています。",
    },
    sources: [
      { title: 'Stalag riddim — Wikipedia', url: 'https://en.wikipedia.org/wiki/Stalag_riddim' },
      { title: 'Bam Bam (Sister Nancy song) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Bam_Bam_(Sister_Nancy_song)' },
      { title: 'Tenor Saw — Wikipedia', url: 'https://en.wikipedia.org/wiki/Tenor_Saw' },
    ],
  },

  // ─── #11 · Full Up (c.1968, Studio One / Leroy Sibbles) ─────────────────────
  11: {
    text: {
      fr: "Le Full Up est l'un des riddims fondateurs de Studio One, le studio de Coxsone Dodd. Enregistré vers 1968 par le groupe maison Sound Dimension, il doit sa signature à la ligne de basse de Leroy Sibbles — bassiste et arrangeur du label, par ailleurs chanteur des Heptones — soutenue par les claviers de Jackie Mittoo. Sa descendance est spectaculaire : les Mighty Diamonds le chantent en 1981 sous le titre « Pass the Kouchie », que le groupe britannique Musical Youth reprend en 1982 en « Pass the Dutchie » — un numéro un au Royaume-Uni et un top 10 aux États-Unis. Surnommé le riddim « Country », le Full Up est considéré comme l'un des morceaux les plus « versionnés » de tous les temps, et sa basse compte parmi les plus recyclées du reggae.",
      en: "Full Up is one of the foundational riddims of Studio One, Coxsone Dodd's studio. Recorded around 1968 by the house band Sound Dimension, it owes its signature to Leroy Sibbles' bassline — the label's staff bassist and arranger, also lead singer of The Heptones — over Jackie Mittoo's keyboards. Its lineage is remarkable: The Mighty Diamonds voiced it in 1981 as “Pass the Kouchie,” which British group Musical Youth reworked in 1982 as “Pass the Dutchie” — a UK number one and a US top ten. Nicknamed the “Country” riddim, Full Up is regarded as one of the most-versioned tunes of all time, and its bassline is among the most recycled in reggae.",
      es: "El Full Up es uno de los riddims fundacionales de Studio One, el estudio de Coxsone Dodd. Grabado hacia 1968 por la banda de la casa, Sound Dimension, debe su sello a la línea de bajo de Leroy Sibbles —bajista y arreglista del sello, además de cantante de The Heptones— sobre los teclados de Jackie Mittoo. Su descendencia es notable: The Mighty Diamonds lo cantan en 1981 como «Pass the Kouchie», que el grupo británico Musical Youth reelabora en 1982 como «Pass the Dutchie» —número uno en el Reino Unido y top diez en Estados Unidos—. Apodado el riddim «Country», el Full Up está considerado uno de los temas más «versionados» de todos los tiempos, y su bajo figura entre los más reciclados del reggae.",
      pt: "O Full Up é um dos riddims fundadores do Studio One, o estúdio de Coxsone Dodd. Gravado por volta de 1968 pela banda da casa, Sound Dimension, deve a sua assinatura à linha de baixo de Leroy Sibbles — baixista e arranjador da editora, e também vocalista dos The Heptones — sobre os teclados de Jackie Mittoo. A sua descendência é notável: os The Mighty Diamonds cantam-no em 1981 como «Pass the Kouchie», que o grupo britânico Musical Youth reelabora em 1982 como «Pass the Dutchie» — número um no Reino Unido e top dez nos Estados Unidos. Apelidado de riddim «Country», o Full Up é considerado um dos temas mais «versionados» de todos os tempos, e o seu baixo está entre os mais reciclados do reggae.",
      ja: "Full Up は、Coxsone Dodd のスタジオ Studio One を代表する土台リディムの一つです。1968 年頃にハウスバンド Sound Dimension によって録音され、その特徴は Leroy Sibbles のベースライン——レーベル専属のベーシスト兼アレンジャーで、The Heptones のリードシンガーでもある——と Jackie Mittoo の鍵盤にあります。その系譜は目覚ましく、The Mighty Diamonds が 1981 年に「Pass the Kouchie」として歌い、英国のグループ Musical Youth が 1982 年に「Pass the Dutchie」として作り直しました——英国 1 位、全米トップ 10 です。「Country」リディムの愛称を持つ Full Up は、史上最も多く「バージョン化」された曲の一つとされ、そのベースはレゲエで最も再利用されたものの一つです。",
    },
    sources: [
      { title: 'Pass the Kouchie — Wikipedia', url: 'https://en.wikipedia.org/wiki/Pass_the_Kouchie' },
      { title: 'Sound Dimension — Wikipedia', url: 'https://en.wikipedia.org/wiki/Sound_Dimension' },
      { title: 'The Best Reggae Riddims — Rolling Stone', url: 'https://www.rollingstone.com/music/music-lists/best-reggae-riddims-1234951483/' },
    ],
  },

  // ─── #10 · Drop Leaf (2005, Don Corleon) ────────────────────────────────────
  10: {
    text: {
      fr: "Le Drop Leaf est l'un des riddims « one-drop » les plus aboutis du milieu des années 2000. Produit par Donovan « Don Corleon » Bennett et publié en 2005 sur Don Corleon Records, il se distingue par une pulsation douce, une guitare claire et une basse chaude et liquide — une atmosphère mélodique et introspective, à contre-courant du dancehall plus dur de l'époque. Il réunit une distribution prestigieuse : « Footprints » de T.O.K., « Longing For » de Jah Cure, « Your Best Friend » de Morgan Heritage, « Be Strong » de Sizzla, « I Believe » de Maxi Priest ou « Intoxication » de Gentleman. Marqueur du renouveau roots de la période, le Drop Leaf a conservé son aura bien après sa sortie : le rappeur J. Cole a récemment échantillonné deux de ses titres.",
      en: "Drop Leaf is one of the most accomplished “one-drop” riddims of the mid-2000s. Produced by Donovan “Don Corleon” Bennett and released in 2005 on Don Corleon Records, it stands out for a gentle pulse, a bright guitar figure and a warm, liquid bassline — a melodic, introspective mood that ran against the harder dancehall of the time. It gathers a prestigious cast: T.O.K.'s “Footprints,” Jah Cure's “Longing For,” Morgan Heritage's “Your Best Friend,” Sizzla's “Be Strong,” Maxi Priest's “I Believe” and Gentleman's “Intoxication.” A marker of the era's roots revival, Drop Leaf has kept its aura long after release: rapper J. Cole recently sampled two of its cuts.",
      es: "El Drop Leaf es uno de los riddims «one-drop» más logrados de mediados de los años 2000. Producido por Donovan «Don Corleon» Bennett y publicado en 2005 en Don Corleon Records, destaca por un pulso suave, una guitarra luminosa y un bajo cálido y líquido —un ambiente melódico e introspectivo, a contracorriente del dancehall más duro de la época—. Reúne un reparto de primer nivel: «Footprints» de T.O.K., «Longing For» de Jah Cure, «Your Best Friend» de Morgan Heritage, «Be Strong» de Sizzla, «I Believe» de Maxi Priest o «Intoxication» de Gentleman. Marca del renacer roots del periodo, el Drop Leaf ha conservado su aura mucho después de su salida: el rapero J. Cole ha sampleado recientemente dos de sus temas.",
      pt: "O Drop Leaf é um dos riddims «one-drop» mais bem conseguidos de meados dos anos 2000. Produzido por Donovan «Don Corleon» Bennett e lançado em 2005 na Don Corleon Records, distingue-se por uma pulsação suave, uma guitarra luminosa e um baixo quente e líquido — uma atmosfera melódica e introspetiva, na contracorrente do dancehall mais duro da época. Reúne um elenco de primeira: «Footprints» de T.O.K., «Longing For» de Jah Cure, «Your Best Friend» de Morgan Heritage, «Be Strong» de Sizzla, «I Believe» de Maxi Priest ou «Intoxication» de Gentleman. Marca do renascimento roots do período, o Drop Leaf manteve a sua aura muito depois do lançamento: o rapper J. Cole sampleou recentemente dois dos seus temas.",
      ja: "Drop Leaf は、2000 年代半ばで最も完成度の高い「ワンドロップ」リディムの一つです。Donovan「Don Corleon」Bennett がプロデュースし、2005 年に Don Corleon Records からリリースされました。柔らかなパルス、明るいギターのフレーズ、温かく流れるようなベースが特徴で、当時の激しいダンスホールとは一線を画す、メロディアスで内省的な雰囲気を持ちます。豪華な顔ぶれが集まりました——T.O.K. の「Footprints」、Jah Cure の「Longing For」、Morgan Heritage の「Your Best Friend」、Sizzla の「Be Strong」、Maxi Priest の「I Believe」、Gentleman の「Intoxication」など。当時のルーツ復興を象徴する Drop Leaf は、リリース後も長く存在感を保ち、ラッパーの J. Cole は最近その 2 曲をサンプリングしました。",
    },
    sources: [
      { title: 'Drop Leaf Riddim — Riddims World', url: 'https://riddimsworld.com/drop-leaf-riddim-don-corleon/' },
      { title: 'J. Cole samples Don Corleon’s Drop Leaf — DancehallMag', url: 'https://www.dancehallmag.com/2026/02/06/news/j-cole-samples-two-classics-from-don-corleons-drop-leaf-riddim.html' },
      { title: 'Don Corleon — Wikipedia', url: 'https://en.wikipedia.org/wiki/Don_Corleon' },
    ],
  },

  // ─── #8 · Playground (1997, Jeremy Harding) ─────────────────────────────────
  8: {
    text: {
      fr: "Le Playground est un riddim dancehall fondateur de la fin des années 1990, produit par Jeremy Harding sur son label 2 Hard en 1997. Influencé par le hip-hop, il s'articule autour d'une basse roulante et d'un kick 808, avec un sample du morceau « Section » des Roots. Sa notoriété tient surtout à « Who Am I (Sim Simma) » de Beenie Man, un succès de crossover mondial qui a internationalisé le deejay, et à « Infiltrate » de Sean Paul, l'un des tout premiers titres de sa carrière. On y trouve aussi « Nike Air » de Mr. Vegas et des voix de Spragga Benz, Mad Cobra ou Lexxus. Le refrain « Sim Simma » a depuis été repris et interpolé par d'autres artistes.",
      en: "Playground is a foundational late-1990s dancehall riddim, produced by Jeremy Harding on his 2 Hard label in 1997. Hip-hop-influenced, it is built around a rolling bassline and an 808 kick, with a sample of The Roots' “Section.” Its fame rests above all on Beenie Man's “Who Am I (Sim Simma),” a global crossover hit that internationalised the deejay, and on Sean Paul's “Infiltrate,” one of the very first cuts of his career. It also features Mr. Vegas' “Nike Air” and voicings by Spragga Benz, Mad Cobra and Lexxus. The “Sim Simma” hook has since been covered and interpolated by other artists.",
      es: "El Playground es un riddim de dancehall fundacional de finales de los años 1990, producido por Jeremy Harding en su sello 2 Hard en 1997. De influencia hip-hop, se construye sobre una línea de bajo rodante y un bombo 808, con un sample de «Section» de The Roots. Su fama descansa sobre todo en «Who Am I (Sim Simma)» de Beenie Man, un éxito de crossover mundial que internacionalizó al deejay, y en «Infiltrate» de Sean Paul, uno de los primerísimos temas de su carrera. También incluye «Nike Air» de Mr. Vegas y voces de Spragga Benz, Mad Cobra o Lexxus. El estribillo «Sim Simma» ha sido versionado e interpolado después por otros artistas.",
      pt: "O Playground é um riddim de dancehall fundador do fim dos anos 1990, produzido por Jeremy Harding na sua editora 2 Hard em 1997. De influência hip-hop, apoia-se numa linha de baixo rolante e num bumbo 808, com um sample de «Section» dos The Roots. A sua fama assenta sobretudo em «Who Am I (Sim Simma)» de Beenie Man, um sucesso de crossover mundial que internacionalizou o deejay, e em «Infiltrate» de Sean Paul, um dos primeiríssimos temas da sua carreira. Também inclui «Nike Air» de Mr. Vegas e vozes de Spragga Benz, Mad Cobra ou Lexxus. O refrão «Sim Simma» foi depois versionado e interpolado por outros artistas.",
      ja: "Playground は、1990 年代後半を代表するダンスホール・リディムで、Jeremy Harding が 1997 年に自身のレーベル 2 Hard で制作しました。ヒップホップの影響を受け、転がるようなベースラインと 808 のキックを軸に、The Roots の「Section」のサンプルを用いています。その名声は何よりも、この DJ を国際的にした世界的クロスオーバー・ヒット、Beenie Man の「Who Am I (Sim Simma)」と、Sean Paul のキャリア最初期の一曲「Infiltrate」に支えられています。ほかに Mr. Vegas の「Nike Air」、Spragga Benz、Mad Cobra、Lexxus の歌も収録。「Sim Simma」のフックは、その後ほかのアーティストにもカバー・引用されています。",
    },
    sources: [
      { title: "Jeremy Harding's Playground marks 25th anniversary — DancehallMag", url: 'https://www.dancehallmag.com/2022/10/25/features/interviews/riddims-that-slapped-jeremy-hardings-playground-marks-25th-anniversary.html' },
      { title: 'Playground Riddim — riddim-id', url: 'https://riddim-id.com/riddims/926/playground' },
    ],
  },

  // ─── #12 · Buyout (2001, Tony "CD" Kelly) ───────────────────────────────────
  12: {
    text: {
      fr: "Le Buyout (« Buy Out ») est un riddim dancehall de 2001 produit par Tony « CD » Kelly, publié dans la série Riddim Driven de VP/Greensleeves. Sa version phare est « Like Glue » de Sean Paul, qui figurera plus tard sur l'album Dutty Rock et deviendra l'un de ses grands succès internationaux. Le riddim réunit aussi « Miss Lap » de Beenie Man, « Money to Burn » de T.O.K. et des voix de Mr. Easy, Notch ou Tanto Metro & Devonte. Représentatif du dancehall du début des années 2000, il illustre le rôle central des compilations Riddim Driven dans la diffusion mondiale du genre.",
      en: "Buyout (“Buy Out”) is a 2001 dancehall riddim produced by Tony “CD” Kelly, issued in VP/Greensleeves' Riddim Driven series. Its flagship cut is Sean Paul's “Like Glue,” which later appeared on the Dutty Rock album and became one of his major international hits. The riddim also gathers Beenie Man's “Miss Lap,” T.O.K.'s “Money to Burn” and voicings by Mr. Easy, Notch and Tanto Metro & Devonte. Emblematic of early-2000s dancehall, it shows the central role the Riddim Driven compilations played in the genre's global spread.",
      es: "El Buyout («Buy Out») es un riddim de dancehall de 2001 producido por Tony «CD» Kelly, editado en la serie Riddim Driven de VP/Greensleeves. Su corte estrella es «Like Glue» de Sean Paul, que más tarde apareció en el álbum Dutty Rock y se convirtió en uno de sus grandes éxitos internacionales. El riddim reúne también «Miss Lap» de Beenie Man, «Money to Burn» de T.O.K. y voces de Mr. Easy, Notch o Tanto Metro & Devonte. Emblemático del dancehall de comienzos de los 2000, muestra el papel central de las compilaciones Riddim Driven en la difusión mundial del género.",
      pt: "O Buyout («Buy Out») é um riddim de dancehall de 2001 produzido por Tony «CD» Kelly, editado na série Riddim Driven da VP/Greensleeves. O seu corte principal é «Like Glue» de Sean Paul, que mais tarde apareceu no álbum Dutty Rock e se tornou um dos seus grandes sucessos internacionais. O riddim reúne também «Miss Lap» de Beenie Man, «Money to Burn» de T.O.K. e vozes de Mr. Easy, Notch ou Tanto Metro & Devonte. Emblemático do dancehall do início dos anos 2000, mostra o papel central das compilações Riddim Driven na difusão mundial do gênero.",
      ja: "Buyout（「Buy Out」）は、2001 年のダンスホール・リディムで、Tony「CD」Kelly がプロデュースし、VP/Greensleeves の Riddim Driven シリーズでリリースされました。代表曲は Sean Paul の「Like Glue」で、のちにアルバム Dutty Rock に収録され、彼の主要な国際的ヒットの一つとなりました。ほかに Beenie Man の「Miss Lap」、T.O.K. の「Money to Burn」、Mr. Easy、Notch、Tanto Metro & Devonte の歌も収録。2000 年代初頭のダンスホールを象徴し、Riddim Driven のコンピレーションがジャンルの世界的普及に果たした中心的役割を示しています。",
    },
    sources: [
      { title: 'Riddim Driven: Buy Out (2001) — AllMusic', url: 'https://www.allmusic.com/album/r562435' },
      { title: 'Buy Out riddim — Riddimguide', url: 'https://www.riddimguide.com/tunedb/riddim_Buy%20Out/' },
    ],
  },

  // ─── #13 · Drum Song (c.1967, Jackie Mittoo / Studio One) ───────────────────
  13: {
    text: {
      fr: "Le Drum Song est un riddim fondateur de Studio One, le studio de Coxsone Dodd. Enregistré à la fin des années 1960 (les sources indiquent 1967), il est crédité au claviériste et directeur musical Jackie Mittoo, accompagné du groupe maison. Devenu une matrice réutilisable, il a été relické pendant des décennies par des dizaines de producteurs. Parmi ses interprétations vérifiées : « Kill Them With Music » de Gregory Isaacs, « Mr. Bad Mind » de Buju Banton, ainsi que des cuts de Sizzla et Anthony B, sans oublier les premières versions de Dennis Alcapone et les dubs de King Tubby. Le Drum Song incarne la profondeur du catalogue Studio One, socle de la musique jamaïcaine moderne.",
      en: "Drum Song is a foundational Studio One riddim, from Coxsone Dodd's studio. Recorded in the late 1960s (sources give 1967), it is credited to keyboardist and musical director Jackie Mittoo with the house band. As a reusable template it was relicked for decades by dozens of producers. Verified voicings include Gregory Isaacs' “Kill Them With Music,” Buju Banton's “Mr. Bad Mind,” cuts by Sizzla and Anthony B, plus early versions by Dennis Alcapone and King Tubby dubs. Drum Song embodies the depth of the Studio One catalogue, a bedrock of modern Jamaican music.",
      es: "El Drum Song es un riddim fundacional de Studio One, el estudio de Coxsone Dodd. Grabado a finales de los años 1960 (las fuentes indican 1967), se acredita al tecladista y director musical Jackie Mittoo con la banda de la casa. Como matriz reutilizable, fue relickeado durante décadas por decenas de productores. Entre sus interpretaciones verificadas: «Kill Them With Music» de Gregory Isaacs, «Mr. Bad Mind» de Buju Banton, cortes de Sizzla y Anthony B, además de versiones tempranas de Dennis Alcapone y dubs de King Tubby. El Drum Song encarna la profundidad del catálogo de Studio One, cimiento de la música jamaicana moderna.",
      pt: "O Drum Song é um riddim fundador do Studio One, o estúdio de Coxsone Dodd. Gravado no fim dos anos 1960 (as fontes indicam 1967), é creditado ao tecladista e diretor musical Jackie Mittoo com a banda da casa. Como matriz reutilizável, foi relickado durante décadas por dezenas de produtores. Entre as suas interpretações verificadas: «Kill Them With Music» de Gregory Isaacs, «Mr. Bad Mind» de Buju Banton, cortes de Sizzla e Anthony B, além de versões antigas de Dennis Alcapone e dubs de King Tubby. O Drum Song encarna a profundidade do catálogo Studio One, alicerce da música jamaicana moderna.",
      ja: "Drum Song は、Coxsone Dodd のスタジオ Studio One を代表する土台リディムです。1960 年代後半（資料では 1967 年）に録音され、鍵盤奏者で音楽監督の Jackie Mittoo とハウスバンドの名義とされています。再利用可能な土台として、何十年にもわたり数十人のプロデューサーにリリックされました。確認済みのボイシングには、Gregory Isaacs の「Kill Them With Music」、Buju Banton の「Mr. Bad Mind」、Sizzla や Anthony B のカット、さらに Dennis Alcapone の初期バージョンや King Tubby のダブがあります。Drum Song は、現代ジャマイカ音楽の礎である Studio One カタログの奥深さを体現しています。",
    },
    sources: [
      { title: 'Drum Song riddim — Riddims World', url: 'https://riddimsworld.com/drum-song-riddim-various-labels/' },
      { title: 'Jackie Mittoo — Wikipedia', url: 'https://en.wikipedia.org/wiki/Jackie_Mittoo' },
    ],
  },

  // ─── #42 · Guardian Angel (2007, Arif Cooper) ───────────────────────────────
  42: {
    text: {
      fr: "Le Guardian Angel est un riddim reggae/lovers rock produit par Arif Cooper pour son label Fresh Ear en 2007. VP Records l'a publié comme volume #129 de la série Riddim Driven, réunissant une quinzaine d'interprétations sur une trame douce et mélodique. On y retrouve « Guardian Angel » de T.O.K., « The World Is A Cycle » de Richie Spice, « To Your Arms Of Love » de Jah Cure et « Rise In Love » d'Alaine, aux côtés de Wayne Marshall, Da'Ville, Million Stylez ou Vybz Kartel. Le riddim illustre le savoir-faire d'Arif Cooper dans le lovers rock : des thèmes romantiques posés sur une instrumentation chaleureuse, ponctuée de quelques voix plus dancehall.",
      en: "Guardian Angel is a reggae/lovers-rock riddim produced by Arif Cooper for his Fresh Ear label in 2007. VP Records issued it as volume #129 of the Riddim Driven series, gathering around a dozen and a half voicings over a smooth, melodic groove. It features T.O.K.'s “Guardian Angel,” Richie Spice's “The World Is A Cycle,” Jah Cure's “To Your Arms Of Love” and Alaine's “Rise In Love,” alongside Wayne Marshall, Da'Ville, Million Stylez and Vybz Kartel. The riddim showcases Arif Cooper's lovers-rock craft: romantic themes over a warm instrumental, punctuated by a few tougher dancehall voices.",
      es: "El Guardian Angel es un riddim reggae/lovers rock producido por Arif Cooper para su sello Fresh Ear en 2007. VP Records lo editó como volumen #129 de la serie Riddim Driven, reuniendo alrededor de quince interpretaciones sobre una base suave y melódica. Incluye «Guardian Angel» de T.O.K., «The World Is A Cycle» de Richie Spice, «To Your Arms Of Love» de Jah Cure y «Rise In Love» de Alaine, junto a Wayne Marshall, Da'Ville, Million Stylez o Vybz Kartel. El riddim muestra el oficio de Arif Cooper en el lovers rock: temas románticos sobre una instrumentación cálida, con algunas voces más dancehall.",
      pt: "O Guardian Angel é um riddim reggae/lovers rock produzido por Arif Cooper para a sua editora Fresh Ear em 2007. A VP Records editou-o como volume #129 da série Riddim Driven, reunindo cerca de quinze interpretações sobre uma base suave e melódica. Inclui «Guardian Angel» de T.O.K., «The World Is A Cycle» de Richie Spice, «To Your Arms Of Love» de Jah Cure e «Rise In Love» de Alaine, ao lado de Wayne Marshall, Da'Ville, Million Stylez ou Vybz Kartel. O riddim mostra o ofício de Arif Cooper no lovers rock: temas românticos sobre uma instrumentação quente, com algumas vozes mais dancehall.",
      ja: "Guardian Angel は、Arif Cooper が 2007 年に自身のレーベル Fresh Ear で制作したレゲエ／ラヴァーズロックのリディムです。VP Records は Riddim Driven シリーズの第 129 巻としてリリースし、滑らかでメロディアスなトラックの上に十数のボイシングを収めました。T.O.K. の「Guardian Angel」、Richie Spice の「The World Is A Cycle」、Jah Cure の「To Your Arms Of Love」、Alaine の「Rise In Love」に加え、Wayne Marshall、Da'Ville、Million Stylez、Vybz Kartel などが参加しています。このリディムは、温かい伴奏にロマンティックなテーマを乗せ、時によりダンスホール寄りの声を交える Arif Cooper のラヴァーズロックの手腕を示しています。",
    },
    sources: [
      { title: 'Guardian Angel Riddim (Fresh Ear / VP) — Riddims World', url: 'https://riddimsworld.com/riddim-driven-albums/guardian-angel-riddim-fresh-ear-vp-records/' },
      { title: 'Guardian Angel — Discogs', url: 'https://www.discogs.com/release/15802526-Various-Guardian-Angel' },
    ],
  },

  // ─── #52 · Major & Minor (2010, Don Corleon) ────────────────────────────────
  52: {
    text: {
      fr: "Le Major & Minor est un projet double signé Don Corleon en 2010 : un « Major Riddim » et un « Minor Riddim » complémentaires, publiés ensemble. Orienté roots reggae plutôt que dancehall dur, le Major est décrit comme « d'une douceur sucrée ». Le package réunit une dizaine et demie d'interprétations : côté Major, « Wildfire » de Tarrus Riley, « Respect » de Jah Cure, « Let's Do It Again » de J Boog, ainsi que Lutan Fyah et Ce'Cile ; côté Minor, Vybz Kartel, Tami Chynn, Pressure Busspipe et une apparition précoce de Protoje, cousin de Don Corleon. Le projet est resté comme une vitrine du reggae roots du producteur et l'un des premiers jalons de la carrière de Protoje.",
      en: "Major & Minor is a paired 2010 project by Don Corleon: a companion “Major Riddim” and “Minor Riddim” released together. Leaning to roots reggae rather than hard dancehall, the Major side was described as “sugary sweet.” The package gathers around a dozen and a half voicings: on the Major side, Tarrus Riley's “Wildfire,” Jah Cure's “Respect,” J Boog's “Let's Do It Again,” plus Lutan Fyah and Ce'Cile; on the Minor side, Vybz Kartel, Tami Chynn, Pressure Busspipe and an early appearance by Protoje, Don Corleon's cousin. It endures as a showcase of the producer's roots reggae and one of the first milestones in Protoje's career.",
      es: "El Major & Minor es un proyecto doble de Don Corleon de 2010: un «Major Riddim» y un «Minor Riddim» complementarios, publicados juntos. Orientado al roots reggae más que al dancehall duro, el lado Major fue descrito como «de una dulzura azucarada». El paquete reúne alrededor de quince interpretaciones: en el lado Major, «Wildfire» de Tarrus Riley, «Respect» de Jah Cure, «Let's Do It Again» de J Boog, además de Lutan Fyah y Ce'Cile; en el lado Minor, Vybz Kartel, Tami Chynn, Pressure Busspipe y una aparición temprana de Protoje, primo de Don Corleon. Perdura como una vitrina del roots reggae del productor y uno de los primeros hitos en la carrera de Protoje.",
      pt: "O Major & Minor é um projeto duplo de Don Corleon de 2010: um «Major Riddim» e um «Minor Riddim» complementares, lançados juntos. Voltado para o roots reggae em vez do dancehall duro, o lado Major foi descrito como «de uma doçura açucarada». O pacote reúne cerca de quinze interpretações: no lado Major, «Wildfire» de Tarrus Riley, «Respect» de Jah Cure, «Let's Do It Again» de J Boog, além de Lutan Fyah e Ce'Cile; no lado Minor, Vybz Kartel, Tami Chynn, Pressure Busspipe e uma aparição inicial de Protoje, primo de Don Corleon. Permanece como uma vitrine do roots reggae do produtor e um dos primeiros marcos na carreira de Protoje.",
      ja: "Major & Minor は、Don Corleon による 2010 年の対になったプロジェクトで、対をなす「Major Riddim」と「Minor Riddim」が一緒にリリースされました。ハードなダンスホールよりもルーツ・レゲエ寄りで、Major 側は「砂糖のように甘い」と評されました。パッケージには十数のボイシングが集まっています。Major 側は Tarrus Riley の「Wildfire」、Jah Cure の「Respect」、J Boog の「Let's Do It Again」、さらに Lutan Fyah や Ce'Cile。Minor 側は Vybz Kartel、Tami Chynn、Pressure Busspipe、そして Don Corleon のいとこ Protoje の初期の登場。このプロジェクトは、プロデューサーのルーツ・レゲエの見本であり、Protoje のキャリア初期の節目の一つとして記憶されています。",
    },
    sources: [
      { title: 'Major and Minor Riddims — United Reggae', url: 'https://unitedreggae.com/news/n706/092310/major-and-minor-riddims' },
      { title: 'Major & Minor Riddim (2010) — dream-sound', url: 'https://dream-sound.com/major-n-minor-riddim-2010/' },
    ],
  },

  // ─── #75 · Jambe An (2014, DJ Kurt Riley / Techniques) ──────────────────────
  75: {
    text: {
      fr: "Le Jambe An est un riddim dancehall-soca produit par DJ Kurt Riley pour Techniques Records — le label fondé par son père, le légendaire Winston Riley — et sorti en 2014. Sa signature est un groove de « wine » entraînant, taillé pour le crossover caribéen. Sa célébrité repose presque entièrement sur une interprétation : « Gyal You A Party Animal » de Charly Black, devenu un tube mondial classé à travers l'Europe et l'Amérique latine. On y trouve aussi des voix de Khago, Timeka Marshall et Shurwayne Winchester. Le succès du riddim a redonné de la visibilité au catalogue Techniques et asseoir la réputation de producteur de Kurt Riley.",
      en: "Jambe An is a dancehall-soca riddim produced by DJ Kurt Riley for Techniques Records — the label founded by his father, the legendary Winston Riley — and released in 2014. Its signature is an upbeat “wine” groove built for Caribbean crossover. Its fame rests almost entirely on one voicing: Charly Black's “Gyal You A Party Animal,” which became a global hit charting across Europe and Latin America. It also features voicings by Khago, Timeka Marshall and Shurwayne Winchester. The riddim's success renewed visibility for the Techniques catalogue and cemented Kurt Riley's reputation as a producer.",
      es: "El Jambe An es un riddim dancehall-soca producido por DJ Kurt Riley para Techniques Records —el sello fundado por su padre, el legendario Winston Riley— y publicado en 2014. Su sello es un groove de «wine» animado, hecho para el crossover caribeño. Su fama descansa casi por completo en una interpretación: «Gyal You A Party Animal» de Charly Black, que se convirtió en un éxito mundial con listas en Europa y América Latina. También incluye voces de Khago, Timeka Marshall y Shurwayne Winchester. El éxito del riddim renovó la visibilidad del catálogo Techniques y consolidó la reputación de productor de Kurt Riley.",
      pt: "O Jambe An é um riddim dancehall-soca produzido por DJ Kurt Riley para a Techniques Records — a editora fundada pelo seu pai, o lendário Winston Riley — e lançado em 2014. A sua assinatura é um groove de «wine» animado, feito para o crossover caribenho. A sua fama assenta quase inteiramente numa interpretação: «Gyal You A Party Animal» de Charly Black, que se tornou um sucesso mundial com presença em tabelas na Europa e na América Latina. Inclui também vozes de Khago, Timeka Marshall e Shurwayne Winchester. O sucesso do riddim renovou a visibilidade do catálogo Techniques e consolidou a reputação de produtor de Kurt Riley.",
      ja: "Jambe An は、DJ Kurt Riley が Techniques Records——父である伝説的プロデューサー Winston Riley が設立したレーベル——のために制作し、2014 年にリリースしたダンスホール・ソカのリディムです。その特徴は、カリブのクロスオーバーに向けたアップテンポの「ワイン」グルーヴです。その名声はほぼ一曲、Charly Black の「Gyal You A Party Animal」に支えられ、ヨーロッパやラテンアメリカでチャート入りする世界的ヒットとなりました。ほかに Khago、Timeka Marshall、Shurwayne Winchester の歌も収録。このリディムの成功は Techniques のカタログに再び光を当て、Kurt Riley のプロデューサーとしての評価を確立しました。",
    },
    sources: [
      { title: 'Jambe An Riddim (Techniques) — Riddims World', url: 'https://riddimsworld.com/jambe-an-riddim-techniques-records/' },
      { title: 'Kurt Riley / Party Animal — DancehallMag', url: 'https://www.dancehallmag.com/2024/08/22/news/party-animal-producer-kurt-riley-sets-goal-to-achieve-legendary-status-in-jamaican-music.html' },
    ],
  },

  // ─── #86 · Conquest Paradise (2019, Damage Musiq) ───────────────────────────
  86: {
    text: {
      fr: "Le Conquest Paradise est un riddim dancehall de 2019 produit par le label jamaïcain Damage Musiq. Publié comme compilation multi-artistes, il présente une atmosphère sombre et tendue, mêlant thèmes de lutte et d'élévation. Ses interprétations phares réunissent Tommy Lee Sparta (« Blessings ») et Chronic Law (« Bless Me »), aux côtés de Shane O, Tamo J ou Singer J. Représentatif du dancehall de la fin des années 2010 porté par une nouvelle génération d'artistes, le Conquest Paradise illustre la vitalité des labels indépendants jamaïcains à l'ère du streaming.",
      en: "Conquest Paradise is a 2019 dancehall riddim produced by the Jamaican label Damage Musiq. Released as a multi-artist compilation, it carries a dark, tense atmosphere mixing themes of struggle and uplift. Its flagship voicings pair Tommy Lee Sparta (“Blessings”) and Chronic Law (“Bless Me”), alongside Shane O, Tamo J and Singer J. Representative of late-2010s dancehall driven by a new generation of artists, Conquest Paradise reflects the vitality of independent Jamaican labels in the streaming era.",
      es: "El Conquest Paradise es un riddim de dancehall de 2019 producido por el sello jamaicano Damage Musiq. Publicado como compilación multiartista, tiene una atmósfera oscura y tensa que mezcla temas de lucha y superación. Sus interpretaciones estrella juntan a Tommy Lee Sparta («Blessings») y Chronic Law («Bless Me»), junto a Shane O, Tamo J o Singer J. Representativo del dancehall de finales de la década de 2010 impulsado por una nueva generación de artistas, el Conquest Paradise refleja la vitalidad de los sellos independientes jamaicanos en la era del streaming.",
      pt: "O Conquest Paradise é um riddim de dancehall de 2019 produzido pela editora jamaicana Damage Musiq. Lançado como compilação multiartista, tem uma atmosfera sombria e tensa que mistura temas de luta e superação. As suas interpretações principais juntam Tommy Lee Sparta («Blessings») e Chronic Law («Bless Me»), ao lado de Shane O, Tamo J ou Singer J. Representativo do dancehall do fim da década de 2010 impulsionado por uma nova geração de artistas, o Conquest Paradise reflete a vitalidade das editoras independentes jamaicanas na era do streaming.",
      ja: "Conquest Paradise は、ジャマイカのレーベル Damage Musiq が制作した 2019 年のダンスホール・リディムです。マルチアーティストのコンピレーションとしてリリースされ、闘いと高揚のテーマを混ぜ合わせた、暗く張り詰めた雰囲気を持ちます。代表的なボイシングは Tommy Lee Sparta（「Blessings」）と Chronic Law（「Bless Me」）で、Shane O、Tamo J、Singer J なども参加しています。新世代のアーティストが牽引する 2010 年代後半のダンスホールを代表し、Conquest Paradise はストリーミング時代におけるジャマイカのインディペンデント・レーベルの活力を映し出しています。",
    },
    sources: [
      { title: 'Conquest Paradise Riddim (Damage Musiq) — Riddims World', url: 'https://riddimsworld.com/conquest-paradise-riddim-damage-musiq/' },
      { title: 'Conquest Paradise Riddim — Apple Music', url: 'https://music.apple.com/us/album/conquest-paradise-riddim/1672797297' },
    ],
  },
};

/** Renvoie l'éditorial d'un riddim, ou undefined s'il n'en a pas. */
export function getRiddimEditorial(id: number): RiddimEditorial | undefined {
  return riddimEditorial[id];
}
