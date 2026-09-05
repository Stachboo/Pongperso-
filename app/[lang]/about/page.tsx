import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE À PROPOS
   Mission, vision et présentation du projet WMC
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  headerTitle: string;
  headerSubtitle: string;
  missionAria: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;
  whyAria: string;
  whyTitle: string;
  whyP1: string;
  whyP2: string;
  methodAria: string;
  methodTitle: string;
  methodP1: string;
  methodLink: string;
  contributeAria: string;
  contributeTitle: string;
  contributeP1: string;
  contributeLink: string;
  contactAria: string;
  contactTitle: string;
  contactP1: string;
  contactLink: string;
  pressAria: string;
  pressTitle: string;
  pressP1: string;
  pressLink: string;
  teamAria: string;
  teamTitle: string;
  teamP1: string;
  teamP2: string;
  understandAria: string;
  understandTitle: string;
  understandP1: string;
  understandP2: string;
  understandP3: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'À propos — World Music Contest',
    metaDescription:
      'WMC est la base de données mondiale de référence des riddims jamaïcains. Découvrez notre mission, notre méthodologie et notre équipe.',
    headerTitle: 'À propos',
    headerSubtitle: 'World Music Contest',
    missionAria: 'Notre mission',
    missionTitle: 'Notre mission',
    missionP1:
      "WMC est la base de données mondiale de référence des riddims jamaïcains. Fondée en 2026, notre mission est de documenter chaque riddim, chaque voicing, classés par popularité de streaming mondiale.",
    missionP2:
      "Le riddim est l'âme de la musique jamaïcaine — une instrumentation partagée par des dizaines d'artistes, fondement du dancehall et du reggae depuis les années 60. Du Bam Bam de Sly & Robbie au Diwali de Lenky Marsden, ces instrumentales ont façonné la musique mondiale.",
    whyAria: 'Pourquoi WMC existe',
    whyTitle: 'Pourquoi WMC existe',
    whyP1:
      "Il n'existait pas, avant WMC, de référence mondiale centralisant les riddims jamaïcains avec leurs voicings complets, leurs producteurs, leurs labels et leur contexte historique. Les informations étaient dispersées entre forums, blogs spécialisés et bases de données partielles.",
    whyP2:
      "WMC comble ce vide en proposant un catalogue structuré, consultable en 5 langues, avec des données de streaming agrégées pour chaque voicing. Notre ambition est de devenir le Discogs du riddim jamaïcain.",
    methodAria: 'Notre méthodologie',
    methodTitle: 'Notre méthodologie en bref',
    methodP1:
      'Les données de popularité proviennent des principales plateformes de streaming mondiales : Spotify, Apple Music, YouTube Music. Les chiffres sont agrégés et approximatifs — ils reflètent la popularité relative des voicings.',
    methodLink: 'Consulter notre méthodologie complète →',
    contributeAria: 'Contribuer',
    contributeTitle: 'Contribuer',
    contributeP1:
      'WMC est construit par et pour les passionnés de musique jamaïcaine. Si vous connaissez un riddim non encore documenté, vous pouvez nous le soumettre.',
    contributeLink: 'Soumettre un riddim →',
    contactAria: 'Contact',
    contactTitle: 'Contact',
    contactP1:
      'Pour toute question concernant WMC, les données, les partenariats ou les demandes presse.',
    contactLink: 'Nous contacter →',
    pressAria: 'Presse',
    pressTitle: 'Presse',
    pressP1:
      'WMC est disponible pour les interviews, collaborations éditoriales et demandes de partenariat liées à la culture jamaïcaine et au dancehall mondial.',
    pressLink: 'Espace presse →',
    teamAria: "L'équipe",
    teamTitle: "L'équipe",
    teamP1:
      "WMC est un projet indépendant développé par une équipe passionnée de culture jamaïcaine et de musique mondiale. Nous ne sommes affiliés à aucun label, aucun artiste ni aucune plateforme de streaming.",
    teamP2:
      "Notre objectif est simple : préserver et valoriser le patrimoine musical jamaïcain en le rendant accessible au plus grand nombre, dans toutes les langues.",
    understandAria: 'Comprendre les riddims',
    understandTitle: 'Comprendre les riddims',
    understandP1:
      "Dans la musique jamaïcaine, un riddim désigne l'instrumentale d'un morceau — la ligne de basse, la batterie et l'accompagnement — indépendamment de la voix. C'est une particularité unique : là où, ailleurs, une chanson associe durablement une mélodie à un interprète, la Jamaïque a fait du riddim un bien commun que des dizaines d'artistes réenregistrent chacun à leur façon.",
    understandP2:
      "Chaque interprétation s'appelle un voicing. Un riddim marquant comme le Sleng Teng (1985), considéré comme le premier riddim entièrement numérique, a donné naissance à des centaines de voicings. Le producteur occupe une place centrale : il crée le riddim en studio, puis invite les artistes à poser leur voix — un modèle qui a façonné le dancehall, le reggae et le lovers rock.",
    understandP3:
      "Documenter les riddims, c'est cartographier tout un écosystème : les producteurs et leurs labels, les artistes qui gravitent autour, et les milliers de morceaux qui partagent une même fondation rythmique. C'est cette histoire collective, souvent dispersée entre disques, forums et mémoires de sound systems, que ce catalogue rassemble et rend consultable.",
  },
  en: {
    metaTitle: 'About — World Music Contest',
    metaDescription:
      'WMC is the world reference database for Jamaican riddims. Discover our mission, our methodology and our team.',
    headerTitle: 'About',
    headerSubtitle: 'World Music Contest',
    missionAria: 'Our mission',
    missionTitle: 'Our mission',
    missionP1:
      'WMC is the world reference database for Jamaican riddims. Founded in 2026, our mission is to document every riddim, every voicing, ranked by global streaming popularity.',
    missionP2:
      'The riddim is the soul of Jamaican music — an instrumental shared by dozens of artists, the foundation of dancehall and reggae since the 1960s. From Sly & Robbie\'s Bam Bam to Lenky Marsden\'s Diwali, these instrumentals have shaped music worldwide.',
    whyAria: 'Why WMC exists',
    whyTitle: 'Why WMC exists',
    whyP1:
      'Before WMC, there was no global reference centralizing Jamaican riddims with their complete voicings, their producers, their labels and their historical context. Information was scattered across forums, specialized blogs and partial databases.',
    whyP2:
      'WMC fills that gap with a structured catalog, available in 5 languages, with aggregated streaming data for each voicing. Our ambition is to become the Discogs of the Jamaican riddim.',
    methodAria: 'Our methodology',
    methodTitle: 'Our methodology in brief',
    methodP1:
      'Popularity data comes from the leading global streaming platforms: Spotify, Apple Music, YouTube Music. The figures are aggregated and approximate — they reflect the relative popularity of the voicings.',
    methodLink: 'Read our full methodology →',
    contributeAria: 'Contribute',
    contributeTitle: 'Contribute',
    contributeP1:
      'WMC is built by and for lovers of Jamaican music. If you know a riddim that is not yet documented, you can submit it to us.',
    contributeLink: 'Submit a riddim →',
    contactAria: 'Contact',
    contactTitle: 'Contact',
    contactP1:
      'For any question regarding WMC, the data, partnerships or press inquiries.',
    contactLink: 'Contact us →',
    pressAria: 'Press',
    pressTitle: 'Press',
    pressP1:
      'WMC is available for interviews, editorial collaborations and partnership requests related to Jamaican culture and global dancehall.',
    pressLink: 'Press room →',
    teamAria: 'The team',
    teamTitle: 'The team',
    teamP1:
      'WMC is an independent project developed by a team passionate about Jamaican culture and world music. We are not affiliated with any label, any artist or any streaming platform.',
    teamP2:
      'Our goal is simple: to preserve and showcase Jamaican musical heritage by making it accessible to as many people as possible, in every language.',
    understandAria: 'Understanding riddims',
    understandTitle: 'Understanding riddims',
    understandP1:
      'In Jamaican music, a riddim is the instrumental of a track — the bassline, the drums and the backing — separate from the vocal. It is a unique trait: where elsewhere a song ties a melody to a single performer for good, Jamaica turned the riddim into common property that dozens of artists re-record, each in their own way.',
    understandP2:
      'Each performance is called a voicing. A landmark riddim like Sleng Teng (1985), regarded as the first fully digital riddim, gave rise to hundreds of voicings. The producer is central: they build the riddim in the studio, then invite artists to lay down their vocals — a model that shaped dancehall, reggae and lovers rock.',
    understandP3:
      'Documenting riddims therefore means mapping a whole ecosystem: the producers and their labels, the artists orbiting around them, and the thousands of tracks that share a single rhythmic foundation. It is this collective history — often scattered across records, forums and sound-system memory — that this catalogue gathers and makes searchable.',
  },
  es: {
    metaTitle: 'Acerca de — World Music Contest',
    metaDescription:
      'WMC es la base de datos mundial de referencia de los riddims jamaicanos. Descubre nuestra misión, nuestra metodología y nuestro equipo.',
    headerTitle: 'Acerca de',
    headerSubtitle: 'World Music Contest',
    missionAria: 'Nuestra misión',
    missionTitle: 'Nuestra misión',
    missionP1:
      'WMC es la base de datos mundial de referencia de los riddims jamaicanos. Fundada en 2026, nuestra misión es documentar cada riddim, cada voicing, clasificados por popularidad de streaming mundial.',
    missionP2:
      'El riddim es el alma de la música jamaicana — una instrumentación compartida por decenas de artistas, base del dancehall y del reggae desde los años 60. Del Bam Bam de Sly & Robbie al Diwali de Lenky Marsden, estas instrumentales han dado forma a la música mundial.',
    whyAria: 'Por qué existe WMC',
    whyTitle: 'Por qué existe WMC',
    whyP1:
      'Antes de WMC no existía una referencia mundial que centralizara los riddims jamaicanos con sus voicings completos, sus productores, sus sellos y su contexto histórico. La información estaba dispersa entre foros, blogs especializados y bases de datos parciales.',
    whyP2:
      'WMC llena ese vacío ofreciendo un catálogo estructurado, consultable en 5 idiomas, con datos de streaming agregados para cada voicing. Nuestra ambición es convertirnos en el Discogs del riddim jamaicano.',
    methodAria: 'Nuestra metodología',
    methodTitle: 'Nuestra metodología en resumen',
    methodP1:
      'Los datos de popularidad provienen de las principales plataformas de streaming mundiales: Spotify, Apple Music, YouTube Music. Las cifras son agregadas y aproximadas — reflejan la popularidad relativa de los voicings.',
    methodLink: 'Consultar nuestra metodología completa →',
    contributeAria: 'Contribuir',
    contributeTitle: 'Contribuir',
    contributeP1:
      'WMC está construido por y para los apasionados de la música jamaicana. Si conoces un riddim aún no documentado, puedes enviárnoslo.',
    contributeLink: 'Enviar un riddim →',
    contactAria: 'Contacto',
    contactTitle: 'Contacto',
    contactP1:
      'Para cualquier pregunta sobre WMC, los datos, las colaboraciones o las solicitudes de prensa.',
    contactLink: 'Contáctanos →',
    pressAria: 'Prensa',
    pressTitle: 'Prensa',
    pressP1:
      'WMC está disponible para entrevistas, colaboraciones editoriales y solicitudes de asociación relacionadas con la cultura jamaicana y el dancehall mundial.',
    pressLink: 'Sala de prensa →',
    teamAria: 'El equipo',
    teamTitle: 'El equipo',
    teamP1:
      'WMC es un proyecto independiente desarrollado por un equipo apasionado por la cultura jamaicana y la música mundial. No estamos afiliados a ningún sello, ningún artista ni ninguna plataforma de streaming.',
    teamP2:
      'Nuestro objetivo es simple: preservar y poner en valor el patrimonio musical jamaicano haciéndolo accesible al mayor número de personas, en todos los idiomas.',
    understandAria: 'Entender los riddims',
    understandTitle: 'Entender los riddims',
    understandP1:
      'En la música jamaicana, un riddim es la instrumental de un tema —la línea de bajo, la batería y el acompañamiento— independientemente de la voz. Es un rasgo único: donde en otros lugares una canción une una melodía a un intérprete para siempre, Jamaica convirtió el riddim en un bien común que decenas de artistas regraban, cada uno a su manera.',
    understandP2:
      'Cada interpretación se llama voicing. Un riddim emblemático como el Sleng Teng (1985), considerado el primer riddim totalmente digital, dio origen a cientos de voicings. El productor ocupa un lugar central: crea el riddim en el estudio y luego invita a los artistas a poner su voz, un modelo que dio forma al dancehall, el reggae y el lovers rock.',
    understandP3:
      'Documentar los riddims significa, por tanto, cartografiar todo un ecosistema: los productores y sus sellos, los artistas que giran a su alrededor y los miles de temas que comparten una misma base rítmica. Es esta historia colectiva —a menudo dispersa entre discos, foros y la memoria de los sound systems— la que este catálogo reúne y hace consultable.',
  },
  pt: {
    metaTitle: 'Sobre — World Music Contest',
    metaDescription:
      'A WMC é a base de dados mundial de referência dos riddims jamaicanos. Conheça a nossa missão, a nossa metodologia e a nossa equipe.',
    headerTitle: 'Sobre',
    headerSubtitle: 'World Music Contest',
    missionAria: 'Nossa missão',
    missionTitle: 'Nossa missão',
    missionP1:
      'A WMC é a base de dados mundial de referência dos riddims jamaicanos. Fundada em 2026, nossa missão é documentar cada riddim, cada voicing, classificados por popularidade de streaming mundial.',
    missionP2:
      'O riddim é a alma da música jamaicana — uma instrumentação compartilhada por dezenas de artistas, base do dancehall e do reggae desde os anos 60. Do Bam Bam de Sly & Robbie ao Diwali de Lenky Marsden, essas instrumentais moldaram a música mundial.',
    whyAria: 'Por que a WMC existe',
    whyTitle: 'Por que a WMC existe',
    whyP1:
      'Antes da WMC não existia uma referência mundial que centralizasse os riddims jamaicanos com seus voicings completos, seus produtores, seus selos e seu contexto histórico. As informações estavam dispersas entre fóruns, blogs especializados e bases de dados parciais.',
    whyP2:
      'A WMC preenche essa lacuna oferecendo um catálogo estruturado, consultável em 5 idiomas, com dados de streaming agregados para cada voicing. Nossa ambição é nos tornarmos o Discogs do riddim jamaicano.',
    methodAria: 'Nossa metodologia',
    methodTitle: 'Nossa metodologia em resumo',
    methodP1:
      'Os dados de popularidade vêm das principais plataformas de streaming mundiais: Spotify, Apple Music, YouTube Music. Os números são agregados e aproximados — refletem a popularidade relativa dos voicings.',
    methodLink: 'Consultar nossa metodologia completa →',
    contributeAria: 'Contribuir',
    contributeTitle: 'Contribuir',
    contributeP1:
      'A WMC é construída por e para os apaixonados pela música jamaicana. Se você conhece um riddim ainda não documentado, pode nos enviá-lo.',
    contributeLink: 'Enviar um riddim →',
    contactAria: 'Contato',
    contactTitle: 'Contato',
    contactP1:
      'Para qualquer dúvida sobre a WMC, os dados, as parcerias ou os pedidos de imprensa.',
    contactLink: 'Fale conosco →',
    pressAria: 'Imprensa',
    pressTitle: 'Imprensa',
    pressP1:
      'A WMC está disponível para entrevistas, colaborações editoriais e pedidos de parceria relacionados à cultura jamaicana e ao dancehall mundial.',
    pressLink: 'Sala de imprensa →',
    teamAria: 'A equipe',
    teamTitle: 'A equipe',
    teamP1:
      'A WMC é um projeto independente desenvolvido por uma equipe apaixonada pela cultura jamaicana e pela música mundial. Não somos afiliados a nenhum selo, nenhum artista nem nenhuma plataforma de streaming.',
    teamP2:
      'Nosso objetivo é simples: preservar e valorizar o patrimônio musical jamaicano, tornando-o acessível ao maior número de pessoas, em todos os idiomas.',
    understandAria: 'Entender os riddims',
    understandTitle: 'Entender os riddims',
    understandP1:
      'Na música jamaicana, um riddim é a instrumental de uma faixa — a linha de baixo, a bateria e o acompanhamento — independentemente da voz. É uma característica única: onde, em outros lugares, uma canção liga uma melodia a um intérprete para sempre, a Jamaica transformou o riddim num bem comum que dezenas de artistas regravam, cada um à sua maneira.',
    understandP2:
      'Cada interpretação chama-se voicing. Um riddim marcante como o Sleng Teng (1985), considerado o primeiro riddim totalmente digital, deu origem a centenas de voicings. O produtor ocupa um lugar central: cria o riddim no estúdio e depois convida os artistas a colocar a sua voz — um modelo que moldou o dancehall, o reggae e o lovers rock.',
    understandP3:
      'Documentar os riddims significa, portanto, mapear todo um ecossistema: os produtores e os seus selos, os artistas que gravitam à sua volta e os milhares de faixas que partilham uma mesma base rítmica. É esta história coletiva — muitas vezes dispersa entre discos, fóruns e a memória dos sound systems — que este catálogo reúne e torna consultável.',
  },
  ja: {
    metaTitle: 'WMCについて — World Music Contest',
    metaDescription:
      'WMCはジャマイカのriddimに関する世界的なリファレンスデータベースです。私たちのミッション、方法論、チームをご紹介します。',
    headerTitle: 'WMCについて',
    headerSubtitle: 'World Music Contest',
    missionAria: '私たちのミッション',
    missionTitle: '私たちのミッション',
    missionP1:
      'WMCはジャマイカのriddimに関する世界的なリファレンスデータベースです。2026年に設立され、私たちのミッションはすべてのriddim、すべてのvoicingを、世界のストリーミング人気順に分類して記録することです。',
    missionP2:
      'riddimはジャマイカ音楽の魂です — 数十組のアーティストに共有されるインストゥルメンタルであり、60年代以来のdancehallとreggaeの基盤です。Sly & RobbieのBam BamからLenky MarsdenのDiwaliまで、これらのインストゥルメンタルは世界の音楽を形づくってきました。',
    whyAria: 'WMCが存在する理由',
    whyTitle: 'WMCが存在する理由',
    whyP1:
      'WMC以前には、ジャマイカのriddimを、その完全なvoicing、プロデューサー、レーベル、歴史的背景とともに一元化した世界的なリファレンスは存在しませんでした。情報はフォーラム、専門ブログ、断片的なデータベースに散在していました。',
    whyP2:
      'WMCは、5言語で閲覧でき、各voicingの集計されたストリーミングデータを備えた構造化されたカタログを提供することで、この空白を埋めます。私たちの目標は、ジャマイカのriddimのDiscogsになることです。',
    methodAria: '私たちの方法論',
    methodTitle: '方法論の概要',
    methodP1:
      '人気データは、Spotify、Apple Music、YouTube Musicといった主要な世界的ストリーミングプラットフォームから得られています。数値は集計された概算値であり、voicingの相対的な人気を反映しています。',
    methodLink: '完全な方法論を見る →',
    contributeAria: '貢献する',
    contributeTitle: '貢献する',
    contributeP1:
      'WMCはジャマイカ音楽を愛する人々によって、そしてその人々のために作られています。まだ記録されていないriddimをご存知の場合は、私たちに投稿していただけます。',
    contributeLink: 'riddimを投稿する →',
    contactAria: 'お問い合わせ',
    contactTitle: 'お問い合わせ',
    contactP1:
      'WMC、データ、パートナーシップ、またはプレスに関するあらゆるご質問について。',
    contactLink: 'お問い合わせはこちら →',
    pressAria: 'プレス',
    pressTitle: 'プレス',
    pressP1:
      'WMCは、ジャマイカ文化と世界のdancehallに関連するインタビュー、編集協力、パートナーシップのご依頼に対応しています。',
    pressLink: 'プレスルーム →',
    teamAria: 'チーム',
    teamTitle: 'チーム',
    teamP1:
      'WMCは、ジャマイカ文化と世界の音楽を愛するチームによって開発された独立したプロジェクトです。私たちはいかなるレーベル、アーティスト、ストリーミングプラットフォームとも提携していません。',
    teamP2:
      '私たちの目標はシンプルです。ジャマイカの音楽遺産を保存し価値を高め、あらゆる言語で、できるだけ多くの人々がアクセスできるようにすることです。',
    understandAria: 'リディムを理解する',
    understandTitle: 'リディムを理解する',
    understandP1:
      'ジャマイカ音楽において、riddim とは楽曲のインストゥルメンタル——ベースライン、ドラム、伴奏——を、ボーカルとは切り離して指す言葉です。これは独特の特徴です。他の地域では 1 つの曲がメロディーを 1 人の歌手に固く結びつけるのに対し、ジャマイカは riddim を、何十人ものアーティストがそれぞれのやり方で録音し直す共有財としました。',
    understandP2:
      'それぞれの演奏は voicing と呼ばれます。最初の完全デジタル riddim とされる Sleng Teng（1985 年）のような画期的な riddim は、何百もの voicing を生み出しました。プロデューサーは中心的な役割を担います。スタジオで riddim を制作し、アーティストを招いてボーカルを乗せてもらう——このモデルが dancehall、reggae、lovers rock を形づくりました。',
    understandP3:
      'したがって riddim を記録するとは、1 つのエコシステム全体を地図化することを意味します。プロデューサーとそのレーベル、その周囲に集まるアーティスト、そして同じリズムの土台を共有する何千もの楽曲です。レコード、フォーラム、サウンドシステムの記憶に散らばりがちなこの集合的な歴史を、このカタログはまとめ、検索できるようにします。',
  },
};

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/about', locale);

  return {
    title: CONTENT[locale].metaTitle,
    description: CONTENT[locale].metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: hreflang,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const c = CONTENT[locale];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{c.headerTitle}</h1>
        <span className={styles.subtitle}>{c.headerSubtitle}</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        {/* ═══ MISSION ═══ */}
        <section id="mission" className={styles.section} aria-label={c.missionAria}>
          <h2 className={styles.sectionTitle}>{c.missionTitle}</h2>
          <p className={styles.paragraph}>{c.missionP1}</p>
          <p className={styles.paragraph}>{c.missionP2}</p>
        </section>

        {/* ═══ COMPRENDRE LES RIDDIMS ═══ */}
        <section className={styles.section} aria-label={c.understandAria}>
          <h2 className={styles.sectionTitle}>{c.understandTitle}</h2>
          <p className={styles.paragraph}>{c.understandP1}</p>
          <p className={styles.paragraph}>{c.understandP2}</p>
          <p className={styles.paragraph}>{c.understandP3}</p>
        </section>

        {/* ═══ POURQUOI ═══ */}
        <section className={styles.section} aria-label={c.whyAria}>
          <h2 className={styles.sectionTitle}>{c.whyTitle}</h2>
          <p className={styles.paragraph}>{c.whyP1}</p>
          <p className={styles.paragraph}>{c.whyP2}</p>
        </section>

        {/* ═══ MÉTHODOLOGIE ═══ */}
        <section id="methodologie" className={styles.section} aria-label={c.methodAria}>
          <h2 className={styles.sectionTitle}>{c.methodTitle}</h2>
          <p className={styles.paragraph}>{c.methodP1}</p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/methodologie`} className={styles.link}>
              {c.methodLink}
            </Link>
          </p>
        </section>

        {/* ═══ CONTRIBUER ═══ */}
        <section id="contribuer" className={styles.section} aria-label={c.contributeAria}>
          <h2 className={styles.sectionTitle}>{c.contributeTitle}</h2>
          <p className={styles.paragraph}>{c.contributeP1}</p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/ajouter-riddim`} className={styles.link}>
              {c.contributeLink}
            </Link>
          </p>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className={styles.section} aria-label={c.contactAria}>
          <h2 className={styles.sectionTitle}>{c.contactTitle}</h2>
          <p className={styles.paragraph}>{c.contactP1}</p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/contact`} className={styles.link}>
              {c.contactLink}
            </Link>
          </p>
        </section>

        {/* ═══ PRESSE ═══ */}
        <section id="presse" className={styles.section} aria-label={c.pressAria}>
          <h2 className={styles.sectionTitle}>{c.pressTitle}</h2>
          <p className={styles.paragraph}>{c.pressP1}</p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/presse`} className={styles.link}>
              {c.pressLink}
            </Link>
          </p>
        </section>

        {/* ═══ ÉQUIPE ═══ */}
        <section className={styles.section} aria-label={c.teamAria}>
          <h2 className={styles.sectionTitle}>{c.teamTitle}</h2>
          <p className={styles.paragraph}>{c.teamP1}</p>
          <p className={styles.paragraph}>{c.teamP2}</p>
        </section>
      </div>
    </main>
  );
}
