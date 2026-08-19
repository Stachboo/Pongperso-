import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE MENTIONS LÉGALES
   Informations légales obligatoires
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  lastUpdate: string;
  ariaEditor: string;
  editorTitle: string;
  editorIntro: string;
  editorProjectLabel: string;
  editorProjectValue: string;
  editorPublisherLabel: string;
  editorPublisherValue: string;
  editorContactLabel: string;
  editorContactValue: string;
  ariaHosting: string;
  hostingTitle: string;
  hostingIntro: string;
  hostingLabel: string;
  hostingValue: string;
  hostingAddress: string;
  ariaIntellectualProperty: string;
  intellectualPropertyTitle: string;
  intellectualPropertyP1: string;
  intellectualPropertyP2: string;
  ariaDataResponsibility: string;
  dataResponsibilityTitle: string;
  dataResponsibilityP1: string;
  dataResponsibilityP2: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Mentions légales | WMC',
    metaDescription:
      'Mentions légales du site World Music Contest (WMC). Éditeur, hébergement, responsable de publication et informations juridiques.',
    title: 'Mentions légales',
    subtitle: 'informations juridiques',
    lastUpdate: 'Dernière mise à jour : mars 2026',
    ariaEditor: 'Éditeur du site',
    editorTitle: 'Éditeur du site',
    editorIntro:
      'Le site World Music Contest (WMC) est édité par le projet World Music Contest, projet indépendant de documentation musicale.',
    editorProjectLabel: 'Nom du projet',
    editorProjectValue: 'World Music Contest (WMC)',
    editorPublisherLabel: 'Responsable de publication',
    editorPublisherValue: 'Équipe WMC',
    editorContactLabel: 'Contact',
    editorContactValue: 'contact@wmc-riddims.com',
    ariaHosting: 'Hébergement',
    hostingTitle: 'Hébergement',
    hostingIntro: 'Le site est hébergé par :',
    hostingLabel: 'Hébergeur',
    hostingValue: 'Vercel Inc.',
    hostingAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.',
    ariaIntellectualProperty: 'Propriété intellectuelle',
    intellectualPropertyTitle: 'Propriété intellectuelle',
    intellectualPropertyP1:
      "L'ensemble du contenu du site WMC (textes, descriptions, organisation des données, design, code source) est protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion, en tout ou partie, sans autorisation préalable écrite, est interdite.",
    intellectualPropertyP2:
      "Les noms d'artistes, de riddims, de labels et de producteurs mentionnés sur le site sont la propriété de leurs détenteurs respectifs. WMC les utilise à des fins de documentation et de référencement uniquement.",
    ariaDataResponsibility: 'Données et responsabilité',
    dataResponsibilityTitle: 'Données et responsabilité',
    dataResponsibilityP1:
      'Les données de streaming présentées sur WMC sont approximatives et proviennent de sources publiquement disponibles. Elles sont fournies à titre indicatif et ne constituent pas des chiffres officiels certifiés par les plateformes de streaming.',
    dataResponsibilityP2:
      "WMC n'est affilié à aucun label, aucun artiste, aucune plateforme de streaming ni aucun organisme de certification musicale.",
  },
  en: {
    metaTitle: 'Legal notice | WMC',
    metaDescription:
      'Legal notice for the World Music Contest (WMC) website. Publisher, hosting, publication manager and legal information.',
    title: 'Legal notice',
    subtitle: 'legal information',
    lastUpdate: 'Last updated: March 2026',
    ariaEditor: 'Website publisher',
    editorTitle: 'Website publisher',
    editorIntro:
      'The World Music Contest (WMC) website is published by the World Music Contest project, an independent music documentation project.',
    editorProjectLabel: 'Project name',
    editorProjectValue: 'World Music Contest (WMC)',
    editorPublisherLabel: 'Publication manager',
    editorPublisherValue: 'WMC Team',
    editorContactLabel: 'Contact',
    editorContactValue: 'contact@wmc-riddims.com',
    ariaHosting: 'Hosting',
    hostingTitle: 'Hosting',
    hostingIntro: 'The website is hosted by:',
    hostingLabel: 'Host',
    hostingValue: 'Vercel Inc.',
    hostingAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, United States.',
    ariaIntellectualProperty: 'Intellectual property',
    intellectualPropertyTitle: 'Intellectual property',
    intellectualPropertyP1:
      'All content on the WMC website (texts, descriptions, data organization, design, source code) is protected by copyright. Any reproduction, representation or distribution, in whole or in part, without prior written authorization, is prohibited.',
    intellectualPropertyP2:
      'The names of artists, riddims, labels and producers mentioned on the site are the property of their respective owners. WMC uses them for documentation and referencing purposes only.',
    ariaDataResponsibility: 'Data and liability',
    dataResponsibilityTitle: 'Data and liability',
    dataResponsibilityP1:
      'The streaming data presented on WMC is approximate and comes from publicly available sources. It is provided for informational purposes and does not constitute official figures certified by the streaming platforms.',
    dataResponsibilityP2:
      'WMC is not affiliated with any label, artist, streaming platform or music certification body.',
  },
  es: {
    metaTitle: 'Aviso legal | WMC',
    metaDescription:
      'Aviso legal del sitio World Music Contest (WMC). Editor, alojamiento, responsable de publicación e información jurídica.',
    title: 'Aviso legal',
    subtitle: 'información jurídica',
    lastUpdate: 'Última actualización: marzo de 2026',
    ariaEditor: 'Editor del sitio',
    editorTitle: 'Editor del sitio',
    editorIntro:
      'El sitio World Music Contest (WMC) está editado por el proyecto World Music Contest, un proyecto independiente de documentación musical.',
    editorProjectLabel: 'Nombre del proyecto',
    editorProjectValue: 'World Music Contest (WMC)',
    editorPublisherLabel: 'Responsable de publicación',
    editorPublisherValue: 'Equipo WMC',
    editorContactLabel: 'Contacto',
    editorContactValue: 'contact@wmc-riddims.com',
    ariaHosting: 'Alojamiento',
    hostingTitle: 'Alojamiento',
    hostingIntro: 'El sitio está alojado por:',
    hostingLabel: 'Proveedor de alojamiento',
    hostingValue: 'Vercel Inc.',
    hostingAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos.',
    ariaIntellectualProperty: 'Propiedad intelectual',
    intellectualPropertyTitle: 'Propiedad intelectual',
    intellectualPropertyP1:
      'Todo el contenido del sitio WMC (textos, descripciones, organización de los datos, diseño, código fuente) está protegido por los derechos de autor. Queda prohibida toda reproducción, representación o difusión, total o parcial, sin autorización previa por escrito.',
    intellectualPropertyP2:
      'Los nombres de artistas, riddims, sellos y productores mencionados en el sitio son propiedad de sus respectivos titulares. WMC los utiliza únicamente con fines de documentación y referencia.',
    ariaDataResponsibility: 'Datos y responsabilidad',
    dataResponsibilityTitle: 'Datos y responsabilidad',
    dataResponsibilityP1:
      'Los datos de streaming presentados en WMC son aproximados y proceden de fuentes de acceso público. Se ofrecen a título indicativo y no constituyen cifras oficiales certificadas por las plataformas de streaming.',
    dataResponsibilityP2:
      'WMC no está afiliado a ningún sello, artista, plataforma de streaming ni organismo de certificación musical.',
  },
  pt: {
    metaTitle: 'Aviso legal | WMC',
    metaDescription:
      'Aviso legal do site World Music Contest (WMC). Editor, hospedagem, responsável pela publicação e informações jurídicas.',
    title: 'Aviso legal',
    subtitle: 'informações jurídicas',
    lastUpdate: 'Última atualização: março de 2026',
    ariaEditor: 'Editor do site',
    editorTitle: 'Editor do site',
    editorIntro:
      'O site World Music Contest (WMC) é editado pelo projeto World Music Contest, um projeto independente de documentação musical.',
    editorProjectLabel: 'Nome do projeto',
    editorProjectValue: 'World Music Contest (WMC)',
    editorPublisherLabel: 'Responsável pela publicação',
    editorPublisherValue: 'Equipe WMC',
    editorContactLabel: 'Contato',
    editorContactValue: 'contact@wmc-riddims.com',
    ariaHosting: 'Hospedagem',
    hostingTitle: 'Hospedagem',
    hostingIntro: 'O site é hospedado por:',
    hostingLabel: 'Provedor de hospedagem',
    hostingValue: 'Vercel Inc.',
    hostingAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos.',
    ariaIntellectualProperty: 'Propriedade intelectual',
    intellectualPropertyTitle: 'Propriedade intelectual',
    intellectualPropertyP1:
      'Todo o conteúdo do site WMC (textos, descrições, organização dos dados, design, código-fonte) é protegido por direitos autorais. É proibida qualquer reprodução, representação ou divulgação, total ou parcial, sem autorização prévia por escrito.',
    intellectualPropertyP2:
      'Os nomes de artistas, riddims, gravadoras e produtores mencionados no site são propriedade de seus respectivos detentores. A WMC os utiliza apenas para fins de documentação e referência.',
    ariaDataResponsibility: 'Dados e responsabilidade',
    dataResponsibilityTitle: 'Dados e responsabilidade',
    dataResponsibilityP1:
      'Os dados de streaming apresentados na WMC são aproximados e provêm de fontes disponíveis publicamente. São fornecidos a título indicativo e não constituem números oficiais certificados pelas plataformas de streaming.',
    dataResponsibilityP2:
      'A WMC não é afiliada a nenhuma gravadora, artista, plataforma de streaming ou organismo de certificação musical.',
  },
  ja: {
    metaTitle: '法的通知 | WMC',
    metaDescription:
      'World Music Contest（WMC）ウェブサイトの法的通知。編集者、ホスティング、公開責任者および法的情報。',
    title: '法的通知',
    subtitle: '法的情報',
    lastUpdate: '最終更新：2026年3月',
    ariaEditor: 'サイト編集者',
    editorTitle: 'サイト編集者',
    editorIntro:
      'World Music Contest（WMC）のウェブサイトは、独立した音楽ドキュメンテーションプロジェクトである World Music Contest プロジェクトによって編集されています。',
    editorProjectLabel: 'プロジェクト名',
    editorProjectValue: 'World Music Contest (WMC)',
    editorPublisherLabel: '公開責任者',
    editorPublisherValue: 'WMC チーム',
    editorContactLabel: '連絡先',
    editorContactValue: 'contact@wmc-riddims.com',
    ariaHosting: 'ホスティング',
    hostingTitle: 'ホスティング',
    hostingIntro: '当サイトは以下によってホスティングされています：',
    hostingLabel: 'ホスティング事業者',
    hostingValue: 'Vercel Inc.',
    hostingAddress: '340 S Lemon Ave #4133, Walnut, CA 91789, アメリカ合衆国。',
    ariaIntellectualProperty: '知的財産',
    intellectualPropertyTitle: '知的財産',
    intellectualPropertyP1:
      'WMC サイトのすべてのコンテンツ（テキスト、説明、データの構成、デザイン、ソースコード）は著作権によって保護されています。事前の書面による許可なく、その全部または一部を複製、表示、配布することは禁止されています。',
    intellectualPropertyP2:
      'サイト上で言及されているアーティスト、riddim、レーベルおよびプロデューサーの名称は、それぞれの権利者に帰属します。WMC はこれらをドキュメンテーションおよび参照の目的にのみ使用しています。',
    ariaDataResponsibility: 'データと責任',
    dataResponsibilityTitle: 'データと責任',
    dataResponsibilityP1:
      'WMC に掲載されているストリーミングデータは概算であり、一般に公開されている情報源に基づいています。これらは参考として提供されるものであり、ストリーミングプラットフォームによって認証された公式な数値ではありません。',
    dataResponsibilityP2:
      'WMC は、いかなるレーベル、アーティスト、ストリーミングプラットフォーム、音楽認証機関とも提携していません。',
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
  const hreflang = generateHreflang('/mentions-legales', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/mentions-legales`,
      languages: hreflang,
    },
  };
}

export default async function MentionsLegalesPage({
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

      <p className={styles.legalDate}>{c.lastUpdate}</p>

      <div className={styles.content}>
        <section className={styles.section} aria-label={c.ariaEditor}>
          <h2 className={styles.sectionTitle}>{c.editorTitle}</h2>
          <p className={styles.paragraph}>{c.editorIntro}</p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.editorProjectLabel}</p>
            <p className={styles.infoValue}>{c.editorProjectValue}</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.editorPublisherLabel}</p>
            <p className={styles.infoValue}>{c.editorPublisherValue}</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.editorContactLabel}</p>
            <p className={styles.infoValue}>{c.editorContactValue}</p>
          </div>
        </section>

        <section className={styles.section} aria-label={c.ariaHosting}>
          <h2 className={styles.sectionTitle}>{c.hostingTitle}</h2>
          <p className={styles.paragraph}>{c.hostingIntro}</p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.hostingLabel}</p>
            <p className={styles.infoValue}>{c.hostingValue}</p>
          </div>
          <p className={styles.paragraph}>{c.hostingAddress}</p>
        </section>

        <section className={styles.section} aria-label={c.ariaIntellectualProperty}>
          <h2 className={styles.sectionTitle}>{c.intellectualPropertyTitle}</h2>
          <p className={styles.paragraph}>{c.intellectualPropertyP1}</p>
          <p className={styles.paragraph}>{c.intellectualPropertyP2}</p>
        </section>

        <section className={styles.section} aria-label={c.ariaDataResponsibility}>
          <h2 className={styles.sectionTitle}>{c.dataResponsibilityTitle}</h2>
          <p className={styles.paragraph}>{c.dataResponsibilityP1}</p>
          <p className={styles.paragraph}>{c.dataResponsibilityP2}</p>
        </section>
      </div>
    </main>
  );
}
