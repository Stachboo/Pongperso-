import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE PRESSE
   Kit presse, chiffres clés et contact média
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  mediaTitle: string;
  mediaPara: string;
  kitTitle: string;
  kitPara: string;
  contactLabel: string;
  statsTitle: string;
  stat1Label: string;
  stat2Label: string;
  stat3Label: string;
  stat4Label: string;
  aboutTitle: string;
  aboutPara: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Presse — Espace média et kit presse | WMC',
    metaDescription:
      'Espace presse de WMC. Retrouvez les chiffres clés, le kit presse et les coordonnées média de la base de données des riddims jamaïcains.',
    title: 'Presse',
    subtitle: 'espace média',
    mediaTitle: 'WMC dans les médias',
    mediaPara:
      'WMC est disponible pour les interviews, collaborations éditoriales et demandes de partenariat liées à la culture jamaïcaine et au dancehall mondial. Nous collaborons avec les médias spécialisés en musique caribéenne, les chercheurs en musicologie et les institutions culturelles.',
    kitTitle: 'Kit presse',
    kitPara:
      'Le logo WMC et les visuels du projet sont disponibles sur demande pour tout usage éditorial ou promotionnel en lien avec la couverture de WMC.',
    contactLabel: 'Contact presse',
    statsTitle: 'Chiffres clés',
    stat1Label: 'Riddims documentés',
    stat2Label: 'Voicings référencés',
    stat3Label: 'Langues disponibles',
    stat4Label: 'Pages indexées',
    aboutTitle: 'À propos de WMC',
    aboutPara:
      'World Music Contest (WMC) est la première base de données mondiale de référence dédiée aux riddims jamaïcains. Fondée en 2026, WMC documente chaque riddim, chaque voicing et chaque producteur, classés par popularité de streaming mondiale. Le projet couvre plus de 60 ans d’histoire musicale jamaïcaine, du ska au dancehall contemporain.',
  },
  en: {
    metaTitle: 'Press — Media center and press kit | WMC',
    metaDescription:
      'WMC press center. Find the key figures, press kit and media contact details for the database of Jamaican riddims.',
    title: 'Press',
    subtitle: 'media center',
    mediaTitle: 'WMC in the media',
    mediaPara:
      'WMC is available for interviews, editorial collaborations and partnership requests related to Jamaican culture and global dancehall. We work with media specializing in Caribbean music, musicology researchers and cultural institutions.',
    kitTitle: 'Press kit',
    kitPara:
      'The WMC logo and the project visuals are available on request for any editorial or promotional use connected with coverage of WMC.',
    contactLabel: 'Press contact',
    statsTitle: 'Key figures',
    stat1Label: 'Documented riddims',
    stat2Label: 'Referenced voicings',
    stat3Label: 'Available languages',
    stat4Label: 'Indexed pages',
    aboutTitle: 'About WMC',
    aboutPara:
      'World Music Contest (WMC) is the world’s leading reference database dedicated to Jamaican riddims. Founded in 2026, WMC documents every riddim, every voicing and every producer, ranked by global streaming popularity. The project spans more than 60 years of Jamaican music history, from ska to contemporary dancehall.',
  },
  es: {
    metaTitle: 'Prensa — Espacio de medios y kit de prensa | WMC',
    metaDescription:
      'Espacio de prensa de WMC. Consulta las cifras clave, el kit de prensa y los datos de contacto para medios de la base de datos de los riddims jamaicanos.',
    title: 'Prensa',
    subtitle: 'espacio de medios',
    mediaTitle: 'WMC en los medios',
    mediaPara:
      'WMC está disponible para entrevistas, colaboraciones editoriales y solicitudes de colaboración relacionadas con la cultura jamaicana y el dancehall mundial. Colaboramos con medios especializados en música caribeña, investigadores en musicología e instituciones culturales.',
    kitTitle: 'Kit de prensa',
    kitPara:
      'El logotipo de WMC y los materiales visuales del proyecto están disponibles bajo petición para cualquier uso editorial o promocional relacionado con la cobertura de WMC.',
    contactLabel: 'Contacto de prensa',
    statsTitle: 'Cifras clave',
    stat1Label: 'Riddims documentados',
    stat2Label: 'Voicings referenciados',
    stat3Label: 'Idiomas disponibles',
    stat4Label: 'Páginas indexadas',
    aboutTitle: 'Acerca de WMC',
    aboutPara:
      'World Music Contest (WMC) es la primera base de datos mundial de referencia dedicada a los riddims jamaicanos. Fundada en 2026, WMC documenta cada riddim, cada voicing y cada productor, clasificados por popularidad de streaming mundial. El proyecto abarca más de 60 años de historia musical jamaicana, del ska al dancehall contemporáneo.',
  },
  pt: {
    metaTitle: 'Imprensa — Espaço de mídia e kit de imprensa | WMC',
    metaDescription:
      'Espaço de imprensa da WMC. Confira os números-chave, o kit de imprensa e os contatos de mídia do banco de dados dos riddims jamaicanos.',
    title: 'Imprensa',
    subtitle: 'espaço de mídia',
    mediaTitle: 'WMC na mídia',
    mediaPara:
      'A WMC está disponível para entrevistas, colaborações editoriais e solicitações de parceria relacionadas à cultura jamaicana e ao dancehall mundial. Colaboramos com veículos especializados em música caribenha, pesquisadores de musicologia e instituições culturais.',
    kitTitle: 'Kit de imprensa',
    kitPara:
      'O logotipo da WMC e os materiais visuais do projeto estão disponíveis mediante solicitação para qualquer uso editorial ou promocional relacionado à cobertura da WMC.',
    contactLabel: 'Contato de imprensa',
    statsTitle: 'Números-chave',
    stat1Label: 'Riddims documentados',
    stat2Label: 'Voicings referenciados',
    stat3Label: 'Idiomas disponíveis',
    stat4Label: 'Páginas indexadas',
    aboutTitle: 'Sobre a WMC',
    aboutPara:
      'O World Music Contest (WMC) é o primeiro banco de dados mundial de referência dedicado aos riddims jamaicanos. Fundada em 2026, a WMC documenta cada riddim, cada voicing e cada produtor, classificados por popularidade de streaming mundial. O projeto abrange mais de 60 anos de história musical jamaicana, do ska ao dancehall contemporâneo.',
  },
  ja: {
    metaTitle: 'プレス — メディア窓口とプレスキット | WMC',
    metaDescription:
      'WMCのプレス窓口。ジャマイカのriddimデータベースに関する主要データ、プレスキット、メディア連絡先をご覧いただけます。',
    title: 'プレス',
    subtitle: 'メディア窓口',
    mediaTitle: 'メディアで見るWMC',
    mediaPara:
      'WMCは、ジャマイカ文化と世界のdancehallに関するインタビュー、編集面での協力、パートナーシップのご依頼に対応しています。カリブ音楽を専門とするメディア、音楽学の研究者、文化機関と連携しています。',
    kitTitle: 'プレスキット',
    kitPara:
      'WMCのロゴおよびプロジェクトのビジュアル素材は、WMCの報道に関する編集または宣伝目的での利用について、ご依頼に応じて提供いたします。',
    contactLabel: 'プレス窓口',
    statsTitle: '主要データ',
    stat1Label: '収録riddim数',
    stat2Label: '登録voicing数',
    stat3Label: '対応言語数',
    stat4Label: 'インデックス済みページ数',
    aboutTitle: 'WMCについて',
    aboutPara:
      'World Music Contest（WMC）は、ジャマイカのriddimに特化した世界初のリファレンスデータベースです。2026年に設立されたWMCは、あらゆるriddim、voicing、プロデューサーを世界のストリーミング人気順に分類して収録しています。本プロジェクトは、skaから現代のdancehallまで、60年以上にわたるジャマイカ音楽史を網羅しています。',
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
  const hreflang = generateHreflang('/presse', locale);

  return {
    title: CONTENT[locale].metaTitle,
    description: CONTENT[locale].metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/presse`,
      languages: hreflang,
    },
  };
}

export default async function PressePage({
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
        <h1 className={styles.title}>{c.title}</h1>
        <span className={styles.subtitle}>{c.subtitle}</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        <section className={styles.section} aria-label={c.mediaTitle}>
          <h2 className={styles.sectionTitle}>{c.mediaTitle}</h2>
          <p className={styles.paragraph}>{c.mediaPara}</p>
        </section>

        <section className={styles.section} aria-label={c.kitTitle}>
          <h2 className={styles.sectionTitle}>{c.kitTitle}</h2>
          <p className={styles.paragraph}>{c.kitPara}</p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.contactLabel}</p>
            <p className={styles.infoValue}>presse@wmc-riddims.com</p>
          </div>
        </section>

        <section className={styles.section} aria-label={c.statsTitle}>
          <h2 className={styles.sectionTitle}>{c.statsTitle}</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>{c.stat1Label}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>5 000+</span>
              <span className={styles.statLabel}>{c.stat2Label}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>5</span>
              <span className={styles.statLabel}>{c.stat3Label}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>1 400+</span>
              <span className={styles.statLabel}>{c.stat4Label}</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-label={c.aboutTitle}>
          <h2 className={styles.sectionTitle}>{c.aboutTitle}</h2>
          <p className={styles.paragraph}>{c.aboutPara}</p>
        </section>
      </div>
    </main>
  );
}
