import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang, jsonLdString, BASE_URL, DATASET_UPDATED } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FAQ
   Questions fréquentes sur les riddims, les voicings et la méthodologie.
   Réponses factuelles (40-150 mots) + données structurées FAQPage.
   ══════════════════════════════════════════════════════════════════════════════ */

type QA = { q: string; a: string };
type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  items: QA[];
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'FAQ — Riddims, voicings et méthodologie',
    metaDescription:
      'Questions fréquentes sur les riddims jamaïcains, les voicings, le comptage des vues et la méthodologie de la base World Music Contest.',
    title: 'FAQ',
    subtitle: 'questions fréquentes',
    items: [
      {
        q: "Qu'est-ce qu'un riddim ?",
        a: "Un riddim est l'instrumental d'un morceau jamaïcain — la section rythmique (basse, batterie, accompagnement) sur laquelle chantent les artistes. Un même riddim populaire peut servir de base à des dizaines, voire des centaines de chansons différentes. C'est une spécificité de la musique jamaïcaine (dancehall, reggae) : le producteur crée le riddim, puis plusieurs artistes l'enregistrent chacun à leur manière.",
      },
      {
        q: "Qu'est-ce qu'un voicing ?",
        a: "Un voicing est l'enregistrement d'un artiste sur un riddim donné. Quand plusieurs artistes chantent sur le même instrumental, chaque interprétation est un voicing distinct. Par exemple, le Diwali riddim compte plusieurs voicings dont « Get Busy » de Sean Paul. La base World Music Contest recense 1 253 voicings répartis sur 152 riddims.",
      },
      {
        q: "D'où viennent les statistiques de vues ?",
        a: "Les vues correspondent aux compteurs publics des principales plateformes de streaming (YouTube en particulier). Elles sont approximatives et servent à classer les voicings par popularité relative au sein d'un riddim. Certaines valeurs anciennes ou introuvables sont estimées et signalées comme telles. World Music Contest n'est affilié à aucune plateforme ni label.",
      },
      {
        q: "Combien de riddims et de voicings la base contient-elle ?",
        a: "La base documente 152 riddims et 1 253 voicings, pour un total d'environ 5,9 milliards de vues cumulées, couvrant la période 1967-2021. Chaque riddim dispose d'une fiche avec son producteur, son label, son année, son genre et le classement de ses voicings par nombre de vues.",
      },
      {
        q: "Quels genres sont couverts ?",
        a: "La base couvre les grandes familles de la musique jamaïcaine : dancehall, reggae, lovers rock et soca. Chaque riddim est étiqueté par genre, ce qui permet de filtrer le catalogue. Le dancehall numérique des années 1990-2000 y est particulièrement représenté, aux côtés de classiques roots des décennies précédentes.",
      },
      {
        q: "Comment sont classés les voicings d'un riddim ?",
        a: "Au sein de chaque riddim, les voicings sont classés par nombre de vues décroissant : le plus écouté apparaît en premier. Ce classement reflète la popularité relative des interprétations sur ce riddim précis, et non un jugement de qualité. Les vues estimées sont distinguées des vues vérifiées.",
      },
      {
        q: "Le site est-il affilié à un label ou à un artiste ?",
        a: "Non. World Music Contest est un projet de documentation indépendant. Il n'est affilié à aucun label, producteur, artiste ni plateforme de streaming. Les données sont collectées et structurées à des fins de référence sur la culture des riddims jamaïcains.",
      },
    ],
  },
  en: {
    metaTitle: 'FAQ — Riddims, voicings and methodology',
    metaDescription:
      'Frequently asked questions about Jamaican riddims, voicings, view counts and the methodology of the World Music Contest database.',
    title: 'FAQ',
    subtitle: 'frequently asked questions',
    items: [
      {
        q: 'What is a riddim?',
        a: "A riddim is the instrumental of a Jamaican track — the rhythm section (bass, drums, backing) that artists sing or deejay over. A single popular riddim can serve as the foundation for dozens, even hundreds, of different songs. It is a defining feature of Jamaican music (dancehall, reggae): the producer builds the riddim, then several artists each record their own version of it.",
      },
      {
        q: 'What is a voicing?',
        a: "A voicing is one artist's recording over a given riddim. When several artists perform over the same instrumental, each performance is a separate voicing. For example, the Diwali riddim has several voicings, including “Get Busy” by Sean Paul. The World Music Contest database catalogues 1,253 voicings across 152 riddims.",
      },
      {
        q: 'Where do the view statistics come from?',
        a: "Views reflect the public counters of the main streaming platforms (YouTube in particular). They are approximate and are used to rank voicings by relative popularity within a riddim. Some older or missing values are estimated and flagged as such. World Music Contest is not affiliated with any platform or label.",
      },
      {
        q: 'How many riddims and voicings does the database contain?',
        a: 'The database documents 152 riddims and 1,253 voicings, totalling roughly 5.9 billion cumulative views and spanning 1967 to 2021. Each riddim has a page with its producer, label, year, genre and its voicings ranked by view count.',
      },
      {
        q: 'Which genres are covered?',
        a: 'The database covers the main branches of Jamaican music: dancehall, reggae, lovers rock and soca. Each riddim is tagged by genre so the catalogue can be filtered. Digital dancehall from the 1990s-2000s is especially well represented, alongside roots classics from earlier decades.',
      },
      {
        q: 'How are a riddim’s voicings ranked?',
        a: "Within each riddim, voicings are ranked by descending view count: the most-played appears first. This ranking reflects the relative popularity of the performances on that specific riddim, not a judgement of quality. Estimated views are distinguished from verified ones.",
      },
      {
        q: 'Is the site affiliated with any label or artist?',
        a: 'No. World Music Contest is an independent documentation project. It is not affiliated with any label, producer, artist or streaming platform. The data is collected and structured as a reference on Jamaican riddim culture.',
      },
    ],
  },
  es: {
    metaTitle: 'FAQ — Riddims, voicings y metodología',
    metaDescription:
      'Preguntas frecuentes sobre los riddims jamaicanos, los voicings, el recuento de reproducciones y la metodología de la base World Music Contest.',
    title: 'FAQ',
    subtitle: 'preguntas frecuentes',
    items: [
      {
        q: '¿Qué es un riddim?',
        a: 'Un riddim es la instrumental de un tema jamaicano: la sección rítmica (bajo, batería, acompañamiento) sobre la que cantan los artistas. Un mismo riddim popular puede servir de base para decenas, incluso cientos, de canciones distintas. Es un rasgo característico de la música jamaicana (dancehall, reggae): el productor crea el riddim y luego varios artistas graban su propia versión.',
      },
      {
        q: '¿Qué es un voicing?',
        a: 'Un voicing es la grabación de un artista sobre un riddim dado. Cuando varios artistas cantan sobre la misma instrumental, cada interpretación es un voicing distinto. Por ejemplo, el Diwali riddim tiene varios voicings, incluido «Get Busy» de Sean Paul. La base World Music Contest reúne 1 253 voicings repartidos en 152 riddims.',
      },
      {
        q: '¿De dónde vienen las estadísticas de reproducciones?',
        a: 'Las reproducciones corresponden a los contadores públicos de las principales plataformas de streaming (YouTube en particular). Son aproximadas y sirven para clasificar los voicings por popularidad relativa dentro de un riddim. Algunos valores antiguos o no disponibles se estiman y se señalan como tales. World Music Contest no está afiliado a ninguna plataforma ni sello.',
      },
      {
        q: '¿Cuántos riddims y voicings contiene la base?',
        a: 'La base documenta 152 riddims y 1 253 voicings, con un total de unos 5,9 mil millones de reproducciones acumuladas, entre 1967 y 2021. Cada riddim tiene una ficha con su productor, sello, año, género y la clasificación de sus voicings por número de reproducciones.',
      },
      {
        q: '¿Qué géneros abarca?',
        a: 'La base abarca las grandes familias de la música jamaicana: dancehall, reggae, lovers rock y soca. Cada riddim está etiquetado por género para poder filtrar el catálogo. El dancehall digital de los años 1990-2000 está especialmente representado, junto a clásicos roots de décadas anteriores.',
      },
      {
        q: '¿Cómo se clasifican los voicings de un riddim?',
        a: 'Dentro de cada riddim, los voicings se ordenan por número de reproducciones descendente: el más escuchado aparece primero. Esta clasificación refleja la popularidad relativa de las interpretaciones en ese riddim concreto, no un juicio de calidad. Las reproducciones estimadas se distinguen de las verificadas.',
      },
      {
        q: '¿El sitio está afiliado a algún sello o artista?',
        a: 'No. World Music Contest es un proyecto de documentación independiente. No está afiliado a ningún sello, productor, artista ni plataforma de streaming. Los datos se recopilan y estructuran como referencia sobre la cultura de los riddims jamaicanos.',
      },
    ],
  },
  pt: {
    metaTitle: 'FAQ — Riddims, voicings e metodologia',
    metaDescription:
      'Perguntas frequentes sobre os riddims jamaicanos, os voicings, a contagem de visualizações e a metodologia da base World Music Contest.',
    title: 'FAQ',
    subtitle: 'perguntas frequentes',
    items: [
      {
        q: 'O que é um riddim?',
        a: 'Um riddim é a instrumental de uma faixa jamaicana: a seção rítmica (baixo, bateria, acompanhamento) sobre a qual os artistas cantam. Um mesmo riddim popular pode servir de base para dezenas, ou mesmo centenas, de músicas diferentes. É uma característica marcante da música jamaicana (dancehall, reggae): o produtor cria o riddim e vários artistas gravam sua própria versão.',
      },
      {
        q: 'O que é um voicing?',
        a: 'Um voicing é a gravação de um artista sobre um determinado riddim. Quando vários artistas cantam sobre a mesma instrumental, cada interpretação é um voicing distinto. Por exemplo, o Diwali riddim tem vários voicings, incluindo «Get Busy» de Sean Paul. A base World Music Contest reúne 1 253 voicings distribuídos em 152 riddims.',
      },
      {
        q: 'De onde vêm as estatísticas de visualizações?',
        a: 'As visualizações correspondem aos contadores públicos das principais plataformas de streaming (YouTube em particular). São aproximadas e servem para classificar os voicings por popularidade relativa dentro de um riddim. Alguns valores antigos ou indisponíveis são estimados e sinalizados como tal. A World Music Contest não é afiliada a nenhuma plataforma ou selo.',
      },
      {
        q: 'Quantos riddims e voicings a base contém?',
        a: 'A base documenta 152 riddims e 1 253 voicings, num total de cerca de 5,9 mil milhões de visualizações acumuladas, entre 1967 e 2021. Cada riddim tem uma página com o seu produtor, selo, ano, gênero e a classificação dos seus voicings por número de visualizações.',
      },
      {
        q: 'Quais gêneros são cobertos?',
        a: 'A base cobre as grandes famílias da música jamaicana: dancehall, reggae, lovers rock e soca. Cada riddim é etiquetado por gênero, permitindo filtrar o catálogo. O dancehall digital dos anos 1990-2000 é especialmente representado, ao lado de clássicos roots de décadas anteriores.',
      },
      {
        q: 'Como são classificados os voicings de um riddim?',
        a: 'Dentro de cada riddim, os voicings são ordenados por número de visualizações decrescente: o mais ouvido aparece primeiro. Essa classificação reflete a popularidade relativa das interpretações naquele riddim específico, não um juízo de qualidade. As visualizações estimadas são distinguidas das verificadas.',
      },
      {
        q: 'O site é afiliado a algum selo ou artista?',
        a: 'Não. A World Music Contest é um projeto de documentação independente. Não é afiliada a nenhum selo, produtor, artista ou plataforma de streaming. Os dados são coletados e estruturados como referência sobre a cultura dos riddims jamaicanos.',
      },
    ],
  },
  ja: {
    metaTitle: 'FAQ — リディム、ボイシング、方法論',
    metaDescription:
      'ジャマイカのリディム、ボイシング、再生回数のカウント、World Music Contestデータベースの方法論に関するよくある質問。',
    title: 'FAQ',
    subtitle: 'よくある質問',
    items: [
      {
        q: 'リディムとは何ですか？',
        a: 'リディムとは、ジャマイカの楽曲のインストゥルメンタル（ベース、ドラム、伴奏からなるリズムセクション）で、その上でアーティストが歌います。人気のリディム1つが、数十から数百もの異なる楽曲の土台になることがあります。プロデューサーがリディムを制作し、複数のアーティストがそれぞれ自分のバージョンを録音する——これがジャマイカ音楽（ダンスホール、レゲエ）の大きな特徴です。',
      },
      {
        q: 'ボイシングとは何ですか？',
        a: 'ボイシングとは、あるリディムに対する1人のアーティストの録音です。複数のアーティストが同じインストゥルメンタルで歌う場合、それぞれの演奏が別々のボイシングになります。たとえばDiwaliリディムには、Sean Paulの「Get Busy」など複数のボイシングがあります。World Music Contestのデータベースは、152のリディムにわたる1,253のボイシングを収録しています。',
      },
      {
        q: '再生回数の統計はどこから来ていますか？',
        a: '再生回数は、主要なストリーミングプラットフォーム（特にYouTube）の公開カウンターに基づいています。これは概算値で、リディム内でボイシングを相対的な人気順に並べるために使われます。古い、あるいは見つからない一部の値は推定値であり、その旨が示されます。World Music Contestは、いかなるプラットフォームやレーベルとも提携していません。',
      },
      {
        q: 'データベースにはいくつのリディムとボイシングがありますか？',
        a: 'データベースは152のリディムと1,253のボイシングを収録し、累計で約59億回の再生数、1967年から2021年までをカバーしています。各リディムには、プロデューサー、レーベル、年、ジャンル、再生回数順のボイシングランキングを掲載したページがあります。',
      },
      {
        q: 'どのジャンルが対象ですか？',
        a: 'データベースは、ジャマイカ音楽の主要なジャンル——ダンスホール、レゲエ、ラヴァーズロック、ソカ——を対象としています。各リディムはジャンルでタグ付けされ、カタログを絞り込めます。1990〜2000年代のデジタルダンスホールが特に充実しており、それ以前の時代のルーツの名曲も収録しています。',
      },
      {
        q: 'リディムのボイシングはどのように順位付けされますか？',
        a: '各リディム内では、ボイシングは再生回数の多い順に並べられ、最も再生されたものが最初に表示されます。この順位は、その特定のリディムにおける演奏の相対的な人気を反映するもので、品質の評価ではありません。推定再生回数は、確認済みの再生回数と区別されます。',
      },
      {
        q: 'サイトはレーベルやアーティストと提携していますか？',
        a: 'いいえ。World Music Contestは独立したドキュメンテーション・プロジェクトです。いかなるレーベル、プロデューサー、アーティスト、ストリーミングプラットフォームとも提携していません。データは、ジャマイカのリディム文化に関するリファレンスとして収集・構造化されています。',
      },
    ],
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
  const hreflang = generateHreflang('/faq', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: hreflang,
    },
  };
}

function generateFaqJsonLd(locale: Locale) {
  const c = CONTENT[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/${locale}/faq#faq`,
    inLanguage: locale,
    dateModified: DATASET_UPDATED,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: c.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export default async function FaqPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const c = CONTENT[locale];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(generateFaqJsonLd(locale)) }}
      />
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{c.title}</h1>
          <span className={styles.subtitle}>{c.subtitle}</span>
        </header>

        <div className={styles.separator} />

        <div className={styles.content}>
          {c.items.map((it, i) => (
            <section key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{it.q}</h2>
              <p className={styles.paragraph}>{it.a}</p>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
