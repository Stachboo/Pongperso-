import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE POLITIQUE DE CONFIDENTIALITÉ
   Protection des données personnelles et cookies
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  legalDate: string;
  s1Label: string;
  s1Title: string;
  s1P1: string;
  s2Label: string;
  s2Title: string;
  s2P1: string;
  s2P2: string;
  s3Label: string;
  s3Title: string;
  s3P1: string;
  s4Label: string;
  s4Title: string;
  s4P1: string;
  s4P2Intro: string;
  s5Label: string;
  s5Title: string;
  s5P1: string;
};

const CONTACT_EMAIL = 'contact@wmc-riddims.com';

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Politique de confidentialité | WMC',
    metaDescription:
      'Politique de confidentialité de World Music Contest. Protection des données personnelles, cookies et conformité RGPD.',
    title: 'Politique de confidentialité',
    subtitle: 'protection des données',
    legalDate: 'Dernière mise à jour : mars 2026',
    s1Label: 'Données personnelles',
    s1Title: 'Collecte des données personnelles',
    s1P1:
      'WMC ne collecte aucune donnée personnelle identifiable. Aucun compte utilisateur n’est requis pour accéder à l’ensemble du catalogue. Vous pouvez naviguer librement sur le site sans fournir aucune information personnelle.',
    s2Label: 'Cookies',
    s2Title: 'Cookies et traceurs',
    s2P1:
      'Des analyses de trafic anonymes peuvent être collectées via des outils d’analyse web dans le respect du Règlement Général sur la Protection des Données (RGPD). Ces données sont strictement anonymisées et utilisées uniquement pour améliorer l’expérience utilisateur du site.',
    s2P2:
      'Aucun cookie publicitaire n’est déposé sans votre consentement explicite. WMC n’utilise aucune technologie de ciblage publicitaire et ne revend aucune donnée à des tiers.',
    s3Label: 'Cookies techniques',
    s3Title: 'Cookies techniques',
    s3P1:
      'Le site peut utiliser des cookies strictement nécessaires à son fonctionnement technique (préférence de langue, état de la navigation). Ces cookies ne collectent aucune donnée personnelle et sont exemptés de consentement conformément aux directives de la CNIL.',
    s4Label: 'Vos droits',
    s4Title: 'Vos droits',
    s4P1:
      'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression et de portabilité de vos données. Puisque WMC ne collecte aucune donnée personnelle identifiable, ces droits s’exercent principalement dans le cadre d’une éventuelle correspondance par email.',
    s4P2Intro: 'Pour exercer vos droits, contactez-nous à : ',
    s5Label: 'Hébergement des données',
    s5Title: 'Hébergement des données',
    s5P1:
      'Le site est hébergé par Vercel Inc. aux États-Unis. Les données de navigation anonymisées transitent par les serveurs de Vercel Edge Network, répartis mondialement pour garantir des temps de chargement optimaux.',
  },
  en: {
    metaTitle: 'Privacy Policy | WMC',
    metaDescription:
      'Privacy policy of World Music Contest. Protection of personal data, cookies and GDPR compliance.',
    title: 'Privacy Policy',
    subtitle: 'data protection',
    legalDate: 'Last updated: March 2026',
    s1Label: 'Personal data',
    s1Title: 'Collection of personal data',
    s1P1:
      'WMC does not collect any identifiable personal data. No user account is required to access the entire catalogue. You may browse the site freely without providing any personal information.',
    s2Label: 'Cookies',
    s2Title: 'Cookies and trackers',
    s2P1:
      'Anonymous traffic analytics may be collected via web analytics tools in accordance with the General Data Protection Regulation (GDPR). This data is strictly anonymised and used solely to improve the user experience of the site.',
    s2P2:
      'No advertising cookie is placed without your explicit consent. WMC does not use any advertising targeting technology and does not resell any data to third parties.',
    s3Label: 'Technical cookies',
    s3Title: 'Technical cookies',
    s3P1:
      'The site may use cookies strictly necessary for its technical operation (language preference, browsing state). These cookies do not collect any personal data and are exempt from consent in accordance with the guidelines of the CNIL.',
    s4Label: 'Your rights',
    s4Title: 'Your rights',
    s4P1:
      'In accordance with the GDPR, you have the right to access, rectify, erase and port your data. Since WMC does not collect any identifiable personal data, these rights are exercised mainly in the context of any correspondence by email.',
    s4P2Intro: 'To exercise your rights, contact us at: ',
    s5Label: 'Data hosting',
    s5Title: 'Data hosting',
    s5P1:
      'The site is hosted by Vercel Inc. in the United States. Anonymised browsing data passes through the servers of the Vercel Edge Network, distributed worldwide to guarantee optimal loading times.',
  },
  es: {
    metaTitle: 'Política de privacidad | WMC',
    metaDescription:
      'Política de privacidad de World Music Contest. Protección de los datos personales, cookies y conformidad con el RGPD.',
    title: 'Política de privacidad',
    subtitle: 'protección de datos',
    legalDate: 'Última actualización: marzo de 2026',
    s1Label: 'Datos personales',
    s1Title: 'Recopilación de datos personales',
    s1P1:
      'WMC no recopila ningún dato personal identificable. No se requiere ninguna cuenta de usuario para acceder a todo el catálogo. Puede navegar libremente por el sitio sin proporcionar ninguna información personal.',
    s2Label: 'Cookies',
    s2Title: 'Cookies y rastreadores',
    s2P1:
      'Pueden recopilarse análisis de tráfico anónimos mediante herramientas de análisis web, respetando el Reglamento General de Protección de Datos (RGPD). Estos datos están estrictamente anonimizados y se utilizan únicamente para mejorar la experiencia de usuario del sitio.',
    s2P2:
      'No se deposita ninguna cookie publicitaria sin su consentimiento explícito. WMC no utiliza ninguna tecnología de segmentación publicitaria y no revende ningún dato a terceros.',
    s3Label: 'Cookies técnicas',
    s3Title: 'Cookies técnicas',
    s3P1:
      'El sitio puede utilizar cookies estrictamente necesarias para su funcionamiento técnico (preferencia de idioma, estado de la navegación). Estas cookies no recopilan ningún dato personal y están exentas de consentimiento conforme a las directrices de la CNIL.',
    s4Label: 'Sus derechos',
    s4Title: 'Sus derechos',
    s4P1:
      'De conformidad con el RGPD, usted dispone de un derecho de acceso, rectificación, supresión y portabilidad de sus datos. Dado que WMC no recopila ningún dato personal identificable, estos derechos se ejercen principalmente en el marco de una eventual correspondencia por correo electrónico.',
    s4P2Intro: 'Para ejercer sus derechos, contáctenos en: ',
    s5Label: 'Alojamiento de los datos',
    s5Title: 'Alojamiento de los datos',
    s5P1:
      'El sitio está alojado por Vercel Inc. en los Estados Unidos. Los datos de navegación anonimizados transitan por los servidores de Vercel Edge Network, distribuidos mundialmente para garantizar tiempos de carga óptimos.',
  },
  pt: {
    metaTitle: 'Política de privacidade | WMC',
    metaDescription:
      'Política de privacidade do World Music Contest. Proteção dos dados pessoais, cookies e conformidade com a LGPD/RGPD.',
    title: 'Política de privacidade',
    subtitle: 'proteção de dados',
    legalDate: 'Última atualização: março de 2026',
    s1Label: 'Dados pessoais',
    s1Title: 'Coleta de dados pessoais',
    s1P1:
      'A WMC não coleta nenhum dado pessoal identificável. Nenhuma conta de usuário é necessária para acessar todo o catálogo. Você pode navegar livremente pelo site sem fornecer nenhuma informação pessoal.',
    s2Label: 'Cookies',
    s2Title: 'Cookies e rastreadores',
    s2P1:
      'Análises de tráfego anônimas podem ser coletadas por meio de ferramentas de análise web, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD). Esses dados são estritamente anonimizados e utilizados unicamente para melhorar a experiência do usuário do site.',
    s2P2:
      'Nenhum cookie publicitário é depositado sem o seu consentimento explícito. A WMC não utiliza nenhuma tecnologia de segmentação publicitária e não revende nenhum dado a terceiros.',
    s3Label: 'Cookies técnicos',
    s3Title: 'Cookies técnicos',
    s3P1:
      'O site pode utilizar cookies estritamente necessários ao seu funcionamento técnico (preferência de idioma, estado da navegação). Esses cookies não coletam nenhum dado pessoal e estão isentos de consentimento em conformidade com as diretrizes da CNIL.',
    s4Label: 'Seus direitos',
    s4Title: 'Seus direitos',
    s4P1:
      'Em conformidade com o RGPD, você dispõe de um direito de acesso, retificação, exclusão e portabilidade dos seus dados. Como a WMC não coleta nenhum dado pessoal identificável, esses direitos são exercidos principalmente no âmbito de uma eventual correspondência por e-mail.',
    s4P2Intro: 'Para exercer os seus direitos, entre em contato conosco em: ',
    s5Label: 'Hospedagem dos dados',
    s5Title: 'Hospedagem dos dados',
    s5P1:
      'O site é hospedado pela Vercel Inc. nos Estados Unidos. Os dados de navegação anonimizados transitam pelos servidores da Vercel Edge Network, distribuídos mundialmente para garantir tempos de carregamento ideais.',
  },
  ja: {
    metaTitle: 'プライバシーポリシー | WMC',
    metaDescription:
      'World Music Contest のプライバシーポリシー。個人データの保護、cookies、および GDPR への準拠について。',
    title: 'プライバシーポリシー',
    subtitle: 'データ保護',
    legalDate: '最終更新日：2026年3月',
    s1Label: '個人データ',
    s1Title: '個人データの収集',
    s1P1:
      'WMC は、識別可能な個人データを一切収集しません。カタログ全体にアクセスするためにユーザーアカウントは必要ありません。個人情報を一切提供することなく、自由にサイトを閲覧いただけます。',
    s2Label: 'Cookies',
    s2Title: 'Cookies およびトラッカー',
    s2P1:
      '一般データ保護規則（GDPR）を遵守したうえで、ウェブ解析ツールを通じて匿名のトラフィック分析が収集される場合があります。これらのデータは厳密に匿名化され、サイトのユーザー体験を向上させる目的にのみ使用されます。',
    s2P2:
      'お客様の明示的な同意なしに広告用の cookie が設置されることはありません。WMC は広告ターゲティング技術を一切使用せず、いかなるデータも第三者に転売しません。',
    s3Label: '技術的な cookies',
    s3Title: '技術的な cookies',
    s3P1:
      '本サイトは、その技術的な動作に厳密に必要な cookie（言語設定、ナビゲーションの状態）を使用する場合があります。これらの cookie は個人データを一切収集せず、CNIL の指針に従い同意が免除されます。',
    s4Label: 'お客様の権利',
    s4Title: 'お客様の権利',
    s4P1:
      'GDPR に従い、お客様はご自身のデータに対するアクセス、訂正、削除、およびポータビリティの権利を有します。WMC は識別可能な個人データを一切収集しないため、これらの権利は主にメールによるやり取りの範囲で行使されます。',
    s4P2Intro: '権利を行使するには、次のアドレスまでご連絡ください：',
    s5Label: 'データのホスティング',
    s5Title: 'データのホスティング',
    s5P1:
      '本サイトは、米国の Vercel Inc. によってホスティングされています。匿名化された閲覧データは、最適な読み込み時間を保証するために世界中に分散配置された Vercel Edge Network のサーバーを経由します。',
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
  const hreflang = generateHreflang('/confidentialite', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/confidentialite`,
      languages: hreflang,
    },
  };
}

export default async function ConfidentialitePage({
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

      <p className={styles.legalDate}>{c.legalDate}</p>

      <div className={styles.content}>
        <section className={styles.section} aria-label={c.s1Label}>
          <h2 className={styles.sectionTitle}>{c.s1Title}</h2>
          <p className={styles.paragraph}>{c.s1P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s2Label}>
          <h2 className={styles.sectionTitle}>{c.s2Title}</h2>
          <p className={styles.paragraph}>{c.s2P1}</p>
          <p className={styles.paragraph}>{c.s2P2}</p>
        </section>

        <section className={styles.section} aria-label={c.s3Label}>
          <h2 className={styles.sectionTitle}>{c.s3Title}</h2>
          <p className={styles.paragraph}>{c.s3P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s4Label}>
          <h2 className={styles.sectionTitle}>{c.s4Title}</h2>
          <p className={styles.paragraph}>{c.s4P1}</p>
          <p className={styles.paragraph}>
            {c.s4P2Intro}
            {CONTACT_EMAIL}
          </p>
        </section>

        <section className={styles.section} aria-label={c.s5Label}>
          <h2 className={styles.sectionTitle}>{c.s5Title}</h2>
          <p className={styles.paragraph}>{c.s5P1}</p>
        </section>
      </div>
    </main>
  );
}
