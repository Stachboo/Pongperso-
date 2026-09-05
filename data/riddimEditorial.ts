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
};

/** Renvoie l'éditorial d'un riddim, ou undefined s'il n'en a pas. */
export function getRiddimEditorial(id: number): RiddimEditorial | undefined {
  return riddimEditorial[id];
}
