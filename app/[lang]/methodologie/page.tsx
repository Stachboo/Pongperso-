import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE MÉTHODOLOGIE
   Explication de la collecte des données et des critères de classement
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  ariaCollecte: string;
  collecteTitle: string;
  collecteP1: string;
  collecteP2: string;
  ariaCriteres: string;
  criteresTitle: string;
  criteresIntro: string;
  criteresItem1: string;
  criteresItem2: string;
  criteresItem3: string;
  ariaMaj: string;
  majTitle: string;
  majP1: string;
  majP2: string;
  ariaAjouter: string;
  ajouterTitle: string;
  ajouterP1: string;
  ajouterLink: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Méthodologie — Comment nous collectons les données | WMC',
    metaDescription:
      'Découvrez comment WMC collecte les données de streaming, classe les voicings par popularité et met à jour son catalogue de riddims jamaïcains.',
    title: 'Méthodologie',
    subtitle: 'nos sources et critères',
    ariaCollecte: 'Collecte des données',
    collecteTitle: 'Comment nous collectons les données',
    collecteP1:
      'Les données de popularité proviennent des principales plateformes de streaming : Spotify, Apple Music, YouTube Music. Les chiffres de vues et de streams sont agrégés et approximatifs — ils reflètent la popularité relative des voicings, non des chiffres certifiés par les plateformes.',
    collecteP2:
      'Chaque riddim est documenté avec son producteur, son label, son année de sortie, son genre et son tempo (BPM). Les voicings sont associés à leurs artistes respectifs et classés par nombre de streams estimés.',
    ariaCriteres: 'Critères de classement',
    criteresTitle: 'Critères de classement',
    criteresIntro:
      'Le classement des voicings par riddim est établi selon trois critères principaux :',
    criteresItem1:
      'Le nombre de streams estimés sur les plateformes majeures (Spotify, Apple Music, YouTube Music). C’est le critère principal de classement.',
    criteresItem2:
      'La notoriété de l’artiste dans le genre. Un voicing de Vybz Kartel ou Sean Paul aura naturellement plus de visibilité qu’un artiste émergent.',
    criteresItem3:
      'L’impact culturel du titre dans la communauté dancehall. Certains morceaux sont des classiques incontournables malgré des chiffres de streaming modestes, car ils sont antérieurs à l’ère du streaming digital.',
    ariaMaj: 'Mise à jour',
    majTitle: 'Mise à jour des données',
    majP1:
      'Le catalogue est mis à jour manuellement par l’équipe WMC. Les données ne sont pas en temps réel. Les chiffres de streaming sont des estimations basées sur les données publiquement disponibles au moment de la dernière mise à jour.',
    majP2:
      'Nous nous efforçons de maintenir le catalogue aussi complet et précis que possible, mais des erreurs ou omissions peuvent exister. Si vous constatez une inexactitude, n’hésitez pas à nous la signaler.',
    ariaAjouter: 'Ajouter un riddim',
    ajouterTitle: 'Ajouter un riddim',
    ajouterP1:
      'Vous connaissez un riddim qui n’est pas encore dans notre base de données ? Notre formulaire de soumission vous permet de nous le suggérer avec toutes les informations nécessaires.',
    ajouterLink: 'Soumettre un riddim →',
  },
  en: {
    metaTitle: 'Methodology — How we collect the data | WMC',
    metaDescription:
      'Learn how WMC collects streaming data, ranks voicings by popularity and keeps its catalogue of Jamaican riddims up to date.',
    title: 'Methodology',
    subtitle: 'our sources and criteria',
    ariaCollecte: 'Data collection',
    collecteTitle: 'How we collect the data',
    collecteP1:
      'Popularity data comes from the main streaming platforms: Spotify, Apple Music, YouTube Music. View and stream figures are aggregated and approximate — they reflect the relative popularity of voicings, not figures certified by the platforms.',
    collecteP2:
      'Each riddim is documented with its producer, label, release year, genre and tempo (BPM). Voicings are matched to their respective artists and ranked by estimated number of streams.',
    ariaCriteres: 'Ranking criteria',
    criteresTitle: 'Ranking criteria',
    criteresIntro:
      'The ranking of voicings within a riddim is based on three main criteria:',
    criteresItem1:
      'The estimated number of streams on the major platforms (Spotify, Apple Music, YouTube Music). This is the primary ranking criterion.',
    criteresItem2:
      'The artist’s standing within the genre. A voicing by Vybz Kartel or Sean Paul will naturally have more visibility than one by an emerging artist.',
    criteresItem3:
      'The cultural impact of the track within the dancehall community. Some tracks are essential classics despite modest streaming figures, because they predate the digital streaming era.',
    ariaMaj: 'Updates',
    majTitle: 'Data updates',
    majP1:
      'The catalogue is updated manually by the WMC team. The data is not real-time. Streaming figures are estimates based on publicly available data at the time of the last update.',
    majP2:
      'We strive to keep the catalogue as complete and accurate as possible, but errors or omissions may occur. If you spot an inaccuracy, please feel free to report it to us.',
    ariaAjouter: 'Add a riddim',
    ajouterTitle: 'Add a riddim',
    ajouterP1:
      'Do you know a riddim that is not yet in our database? Our submission form lets you suggest it to us with all the necessary information.',
    ajouterLink: 'Submit a riddim →',
  },
  es: {
    metaTitle: 'Metodología — Cómo recopilamos los datos | WMC',
    metaDescription:
      'Descubre cómo WMC recopila los datos de streaming, clasifica los voicings por popularidad y actualiza su catálogo de riddims jamaicanos.',
    title: 'Metodología',
    subtitle: 'nuestras fuentes y criterios',
    ariaCollecte: 'Recopilación de datos',
    collecteTitle: 'Cómo recopilamos los datos',
    collecteP1:
      'Los datos de popularidad provienen de las principales plataformas de streaming: Spotify, Apple Music, YouTube Music. Las cifras de reproducciones y streams son agregadas y aproximadas: reflejan la popularidad relativa de los voicings, no cifras certificadas por las plataformas.',
    collecteP2:
      'Cada riddim está documentado con su productor, su sello, su año de lanzamiento, su género y su tempo (BPM). Los voicings se asocian a sus artistas respectivos y se clasifican por número estimado de streams.',
    ariaCriteres: 'Criterios de clasificación',
    criteresTitle: 'Criterios de clasificación',
    criteresIntro:
      'La clasificación de los voicings por riddim se establece según tres criterios principales:',
    criteresItem1:
      'El número estimado de streams en las plataformas principales (Spotify, Apple Music, YouTube Music). Es el criterio principal de clasificación.',
    criteresItem2:
      'La notoriedad del artista dentro del género. Un voicing de Vybz Kartel o Sean Paul tendrá naturalmente más visibilidad que el de un artista emergente.',
    criteresItem3:
      'El impacto cultural del tema en la comunidad dancehall. Algunos temas son clásicos imprescindibles a pesar de cifras de streaming modestas, ya que son anteriores a la era del streaming digital.',
    ariaMaj: 'Actualización',
    majTitle: 'Actualización de los datos',
    majP1:
      'El catálogo se actualiza manualmente por el equipo de WMC. Los datos no son en tiempo real. Las cifras de streaming son estimaciones basadas en los datos disponibles públicamente en el momento de la última actualización.',
    majP2:
      'Nos esforzamos por mantener el catálogo lo más completo y preciso posible, pero pueden existir errores u omisiones. Si detectas una inexactitud, no dudes en comunicárnosla.',
    ariaAjouter: 'Añadir un riddim',
    ajouterTitle: 'Añadir un riddim',
    ajouterP1:
      '¿Conoces un riddim que todavía no está en nuestra base de datos? Nuestro formulario de envío te permite sugerírnoslo con toda la información necesaria.',
    ajouterLink: 'Enviar un riddim →',
  },
  pt: {
    metaTitle: 'Metodologia — Como coletamos os dados | WMC',
    metaDescription:
      'Descubra como a WMC coleta os dados de streaming, classifica os voicings por popularidade e atualiza seu catálogo de riddims jamaicanos.',
    title: 'Metodologia',
    subtitle: 'nossas fontes e critérios',
    ariaCollecte: 'Coleta de dados',
    collecteTitle: 'Como coletamos os dados',
    collecteP1:
      'Os dados de popularidade vêm das principais plataformas de streaming: Spotify, Apple Music, YouTube Music. Os números de visualizações e de streams são agregados e aproximados — refletem a popularidade relativa dos voicings, não números certificados pelas plataformas.',
    collecteP2:
      'Cada riddim é documentado com seu produtor, seu selo, seu ano de lançamento, seu gênero e seu andamento (BPM). Os voicings são associados a seus respectivos artistas e classificados pelo número estimado de streams.',
    ariaCriteres: 'Critérios de classificação',
    criteresTitle: 'Critérios de classificação',
    criteresIntro:
      'A classificação dos voicings por riddim é estabelecida segundo três critérios principais:',
    criteresItem1:
      'O número estimado de streams nas principais plataformas (Spotify, Apple Music, YouTube Music). É o critério principal de classificação.',
    criteresItem2:
      'A notoriedade do artista dentro do gênero. Um voicing de Vybz Kartel ou Sean Paul terá naturalmente mais visibilidade do que o de um artista emergente.',
    criteresItem3:
      'O impacto cultural da faixa na comunidade dancehall. Algumas faixas são clássicos indispensáveis apesar de números de streaming modestos, pois são anteriores à era do streaming digital.',
    ariaMaj: 'Atualização',
    majTitle: 'Atualização dos dados',
    majP1:
      'O catálogo é atualizado manualmente pela equipe da WMC. Os dados não são em tempo real. Os números de streaming são estimativas baseadas nos dados publicamente disponíveis no momento da última atualização.',
    majP2:
      'Nós nos esforçamos para manter o catálogo o mais completo e preciso possível, mas erros ou omissões podem existir. Se você notar uma imprecisão, não hesite em nos informar.',
    ariaAjouter: 'Adicionar um riddim',
    ajouterTitle: 'Adicionar um riddim',
    ajouterP1:
      'Você conhece um riddim que ainda não está em nosso banco de dados? Nosso formulário de envio permite que você o sugira com todas as informações necessárias.',
    ajouterLink: 'Enviar um riddim →',
  },
  ja: {
    metaTitle: 'メソドロジー — データの収集方法 | WMC',
    metaDescription:
      'WMC がどのようにストリーミングデータを収集し、voicing を人気順にランク付けし、ジャマイカの riddim カタログを更新しているかをご紹介します。',
    title: 'メソドロジー',
    subtitle: '情報源と基準',
    ariaCollecte: 'データの収集',
    collecteTitle: 'データの収集方法',
    collecteP1:
      '人気度のデータは主要なストリーミングプラットフォーム（Spotify、Apple Music、YouTube Music）から取得しています。再生回数やストリーム数は集計された概算値であり、voicing の相対的な人気を反映するものであって、プラットフォームによって認定された数値ではありません。',
    collecteP2:
      '各 riddim はプロデューサー、レーベル、リリース年、ジャンル、テンポ（BPM）とともに記録されています。voicing はそれぞれのアーティストに紐付けられ、推定ストリーム数によってランク付けされます。',
    ariaCriteres: 'ランキングの基準',
    criteresTitle: 'ランキングの基準',
    criteresIntro:
      'riddim ごとの voicing のランキングは、主に 3 つの基準に基づいて決定されます。',
    criteresItem1:
      '主要プラットフォーム（Spotify、Apple Music、YouTube Music）における推定ストリーム数。これがランキングの主要な基準です。',
    criteresItem2:
      'そのジャンルにおけるアーティストの知名度。Vybz Kartel や Sean Paul の voicing は、新進アーティストのものよりも自然と高い注目度を得ます。',
    criteresItem3:
      'dancehall コミュニティにおけるその楽曲の文化的影響力。一部の楽曲は、ストリーミング数が控えめであっても欠かせない名曲です。デジタルストリーミング時代よりも前のものだからです。',
    ariaMaj: '更新',
    majTitle: 'データの更新',
    majP1:
      'カタログは WMC チームによって手動で更新されます。データはリアルタイムではありません。ストリーミングの数値は、最終更新時点で公開されているデータに基づく推定値です。',
    majP2:
      'カタログをできる限り完全かつ正確に保つよう努めていますが、誤りや漏れが存在する可能性があります。不正確な点にお気づきの場合は、遠慮なくお知らせください。',
    ariaAjouter: 'riddim を追加する',
    ajouterTitle: 'riddim を追加する',
    ajouterP1:
      'まだ私たちのデータベースに登録されていない riddim をご存じですか？投稿フォームから、必要な情報とともにご提案いただけます。',
    ajouterLink: 'riddim を投稿する →',
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
  const hreflang = generateHreflang('/methodologie', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/methodologie`,
      languages: hreflang,
    },
  };
}

export default async function MethodologiePage({
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
        {/* ═══ COLLECTE ═══ */}
        <section className={styles.section} aria-label={c.ariaCollecte}>
          <h2 className={styles.sectionTitle}>{c.collecteTitle}</h2>
          <p className={styles.paragraph}>{c.collecteP1}</p>
          <p className={styles.paragraph}>{c.collecteP2}</p>
        </section>

        {/* ═══ CRITÈRES ═══ */}
        <section className={styles.section} aria-label={c.ariaCriteres}>
          <h2 className={styles.sectionTitle}>{c.criteresTitle}</h2>
          <p className={styles.paragraph}>{c.criteresIntro}</p>
          <ol className={styles.orderedList}>
            <li className={styles.orderedItem}>{c.criteresItem1}</li>
            <li className={styles.orderedItem}>{c.criteresItem2}</li>
            <li className={styles.orderedItem}>{c.criteresItem3}</li>
          </ol>
        </section>

        {/* ═══ MISE À JOUR ═══ */}
        <section className={styles.section} aria-label={c.ariaMaj}>
          <h2 className={styles.sectionTitle}>{c.majTitle}</h2>
          <p className={styles.paragraph}>{c.majP1}</p>
          <p className={styles.paragraph}>{c.majP2}</p>
        </section>

        {/* ═══ AJOUTER ═══ */}
        <section className={styles.section} aria-label={c.ariaAjouter}>
          <h2 className={styles.sectionTitle}>{c.ajouterTitle}</h2>
          <p className={styles.paragraph}>{c.ajouterP1}</p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/ajouter-riddim`} className={styles.link}>
              {c.ajouterLink}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
