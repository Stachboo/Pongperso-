import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE CONDITIONS D'UTILISATION
   Règles d'utilisation du site et des données — multilingue (fr/en/es/pt/ja)
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  legalDate: string;
  s1Title: string;
  s1P1: string;
  s2Title: string;
  s2P1: string;
  s3Title: string;
  s3P1: string;
  s3P2: string;
  s4Title: string;
  s4P1: string;
  s5Title: string;
  s5P1: string;
  s6Title: string;
  s6P1: string;
  s7Title: string;
  s7P1: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: "Conditions d'utilisation",
    metaDescription:
      "Conditions d'utilisation du site World Music Contest. Règles d'accès, propriété intellectuelle et limitations de responsabilité.",
    title: "Conditions d'utilisation",
    subtitle: "règles d'usage",
    legalDate: "Dernière mise à jour : mars 2026",
    s1Title: "Acceptation des conditions",
    s1P1:
      "En accédant au site World Music Contest (WMC), vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.",
    s2Title: "Accès au service",
    s2P1:
      "Le contenu de WMC est fourni à titre informatif et documentaire. L'accès au site est gratuit et ne nécessite aucune inscription. WMC se réserve le droit de modifier, suspendre ou interrompre l'accès au site à tout moment, sans préavis ni indemnité.",
    s3Title: "Données de streaming",
    s3P1:
      "Les données de streaming présentées sur WMC sont approximatives et basées sur des estimations issues de sources publiquement disponibles. Ces chiffres ne constituent pas des données officielles certifiées par les plateformes de streaming (Spotify, Apple Music, YouTube Music).",
    s3P2:
      "WMC ne garantit pas l'exactitude, l'exhaustivité ou la mise à jour en temps réel de ces données. Les utilisateurs sont invités à consulter les plateformes officielles pour des chiffres certifiés.",
    s4Title: "Propriété intellectuelle",
    s4P1:
      "La reproduction du contenu de WMC (textes originaux, descriptions, organisation des données, design) sans autorisation préalable écrite est interdite. Les noms d'artistes, de riddims et de labels sont la propriété de leurs détenteurs respectifs.",
    s5Title: "Limitation de responsabilité",
    s5P1:
      "WMC n'est pas responsable des erreurs ou omissions dans les données présentées. Le site est fourni « en l'état » sans garantie d'aucune sorte, expresse ou implicite. WMC ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation du site.",
    s6Title: "Liens externes",
    s6P1:
      "WMC peut contenir des liens vers des sites tiers (YouTube, Spotify, etc.). Ces liens sont fournis à titre de commodité. WMC n'exerce aucun contrôle sur le contenu de ces sites et n'assume aucune responsabilité quant à leur contenu ou leurs pratiques de confidentialité.",
    s7Title: "Droit applicable",
    s7P1:
      "Les présentes conditions d'utilisation sont régies par le droit français. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux français.",
  },
  en: {
    metaTitle: "Terms of Use",
    metaDescription:
      "Terms of use for the World Music Contest website. Access rules, intellectual property and limitations of liability.",
    title: "Terms of Use",
    subtitle: "usage rules",
    legalDate: "Last updated: March 2026",
    s1Title: "Acceptance of the terms",
    s1P1:
      "By accessing the World Music Contest (WMC) website, you accept these terms of use in their entirety. If you do not accept these terms, please do not use the site.",
    s2Title: "Access to the service",
    s2P1:
      "WMC content is provided for informational and documentary purposes. Access to the site is free and requires no registration. WMC reserves the right to modify, suspend or discontinue access to the site at any time, without notice or compensation.",
    s3Title: "Streaming data",
    s3P1:
      "The streaming data presented on WMC is approximate and based on estimates derived from publicly available sources. These figures do not constitute official data certified by the streaming platforms (Spotify, Apple Music, YouTube Music).",
    s3P2:
      "WMC does not guarantee the accuracy, completeness or real-time updating of this data. Users are invited to consult the official platforms for certified figures.",
    s4Title: "Intellectual property",
    s4P1:
      "Reproduction of WMC content (original texts, descriptions, data organization, design) without prior written authorization is prohibited. The names of artists, riddims and labels are the property of their respective owners.",
    s5Title: "Limitation of liability",
    s5P1:
      "WMC is not responsible for errors or omissions in the data presented. The site is provided “as is” without warranty of any kind, express or implied. WMC cannot be held liable for any direct or indirect damage arising from the use of the site.",
    s6Title: "External links",
    s6P1:
      "WMC may contain links to third-party sites (YouTube, Spotify, etc.). These links are provided for convenience. WMC has no control over the content of these sites and assumes no responsibility for their content or their privacy practices.",
    s7Title: "Applicable law",
    s7P1:
      "These terms of use are governed by French law. Any dispute relating to the use of the site shall be subject to the exclusive jurisdiction of the French courts.",
  },
  es: {
    metaTitle: "Condiciones de uso",
    metaDescription:
      "Condiciones de uso del sitio World Music Contest. Normas de acceso, propiedad intelectual y limitaciones de responsabilidad.",
    title: "Condiciones de uso",
    subtitle: "normas de uso",
    legalDate: "Última actualización: marzo de 2026",
    s1Title: "Aceptación de las condiciones",
    s1P1:
      "Al acceder al sitio World Music Contest (WMC), usted acepta las presentes condiciones de uso en su totalidad. Si no acepta estas condiciones, le rogamos que no utilice el sitio.",
    s2Title: "Acceso al servicio",
    s2P1:
      "El contenido de WMC se proporciona con fines informativos y documentales. El acceso al sitio es gratuito y no requiere ningún registro. WMC se reserva el derecho de modificar, suspender o interrumpir el acceso al sitio en cualquier momento, sin previo aviso ni indemnización.",
    s3Title: "Datos de streaming",
    s3P1:
      "Los datos de streaming presentados en WMC son aproximados y se basan en estimaciones procedentes de fuentes disponibles públicamente. Estas cifras no constituyen datos oficiales certificados por las plataformas de streaming (Spotify, Apple Music, YouTube Music).",
    s3P2:
      "WMC no garantiza la exactitud, la exhaustividad ni la actualización en tiempo real de estos datos. Se invita a los usuarios a consultar las plataformas oficiales para obtener cifras certificadas.",
    s4Title: "Propiedad intelectual",
    s4P1:
      "Queda prohibida la reproducción del contenido de WMC (textos originales, descripciones, organización de los datos, diseño) sin autorización previa por escrito. Los nombres de artistas, de riddims y de sellos discográficos son propiedad de sus respectivos titulares.",
    s5Title: "Limitación de responsabilidad",
    s5P1:
      "WMC no se hace responsable de los errores u omisiones en los datos presentados. El sitio se proporciona «tal cual» sin garantía de ningún tipo, expresa o implícita. WMC no podrá ser considerado responsable de ningún daño directo o indirecto derivado del uso del sitio.",
    s6Title: "Enlaces externos",
    s6P1:
      "WMC puede contener enlaces a sitios de terceros (YouTube, Spotify, etc.). Estos enlaces se ofrecen a título de comodidad. WMC no ejerce ningún control sobre el contenido de estos sitios y no asume ninguna responsabilidad en cuanto a su contenido o sus prácticas de privacidad.",
    s7Title: "Legislación aplicable",
    s7P1:
      "Las presentes condiciones de uso se rigen por la legislación francesa. Todo litigio relativo al uso del sitio se someterá a la competencia exclusiva de los tribunales franceses.",
  },
  pt: {
    metaTitle: "Condições de uso",
    metaDescription:
      "Condições de uso do site World Music Contest. Regras de acesso, propriedade intelectual e limitações de responsabilidade.",
    title: "Condições de uso",
    subtitle: "regras de uso",
    legalDate: "Última atualização: março de 2026",
    s1Title: "Aceitação das condições",
    s1P1:
      "Ao acessar o site World Music Contest (WMC), você aceita integralmente as presentes condições de uso. Se você não aceitar estas condições, por favor, não utilize o site.",
    s2Title: "Acesso ao serviço",
    s2P1:
      "O conteúdo do WMC é fornecido para fins informativos e documentais. O acesso ao site é gratuito e não requer nenhum cadastro. O WMC reserva-se o direito de modificar, suspender ou interromper o acesso ao site a qualquer momento, sem aviso prévio nem indenização.",
    s3Title: "Dados de streaming",
    s3P1:
      "Os dados de streaming apresentados no WMC são aproximados e baseados em estimativas provenientes de fontes disponíveis publicamente. Esses números não constituem dados oficiais certificados pelas plataformas de streaming (Spotify, Apple Music, YouTube Music).",
    s3P2:
      "O WMC não garante a exatidão, a integralidade ou a atualização em tempo real desses dados. Os usuários são convidados a consultar as plataformas oficiais para obter números certificados.",
    s4Title: "Propriedade intelectual",
    s4P1:
      "A reprodução do conteúdo do WMC (textos originais, descrições, organização dos dados, design) sem autorização prévia por escrito é proibida. Os nomes de artistas, de riddims e de gravadoras são propriedade de seus respectivos detentores.",
    s5Title: "Limitação de responsabilidade",
    s5P1:
      "O WMC não é responsável por erros ou omissões nos dados apresentados. O site é fornecido “no estado em que se encontra”, sem garantia de qualquer natureza, expressa ou implícita. O WMC não poderá ser responsabilizado por qualquer dano direto ou indireto resultante do uso do site.",
    s6Title: "Links externos",
    s6P1:
      "O WMC pode conter links para sites de terceiros (YouTube, Spotify, etc.). Esses links são fornecidos por conveniência. O WMC não exerce nenhum controle sobre o conteúdo desses sites e não assume nenhuma responsabilidade quanto ao seu conteúdo ou às suas práticas de privacidade.",
    s7Title: "Lei aplicável",
    s7P1:
      "As presentes condições de uso são regidas pela lei francesa. Qualquer litígio relativo ao uso do site será submetido à competência exclusiva dos tribunais franceses.",
  },
  ja: {
    metaTitle: "利用規約",
    metaDescription:
      "World Music Contest ウェブサイトの利用規約。アクセス規則、知的財産権および責任の制限について。",
    title: "利用規約",
    subtitle: "利用のルール",
    legalDate: "最終更新日：2026年3月",
    s1Title: "規約への同意",
    s1P1:
      "World Music Contest（WMC）のウェブサイトにアクセスすることにより、お客様は本利用規約の全内容に同意したものとみなされます。本規約に同意されない場合は、当サイトをご利用にならないでください。",
    s2Title: "サービスへのアクセス",
    s2P1:
      "WMC のコンテンツは、情報提供および資料としての目的で提供されます。当サイトへのアクセスは無料であり、登録は一切必要ありません。WMC は、予告または補償なしに、いつでも当サイトへのアクセスを変更、停止または中断する権利を留保します。",
    s3Title: "ストリーミングデータ",
    s3P1:
      "WMC に掲載されるストリーミングデータは概算であり、一般に公開されている情報源から得られた推定値に基づいています。これらの数値は、ストリーミングプラットフォーム（Spotify、Apple Music、YouTube Music）によって認証された公式データではありません。",
    s3P2:
      "WMC は、これらのデータの正確性、網羅性またはリアルタイムでの更新を保証するものではありません。認証された数値については、公式プラットフォームをご確認いただくようお願いいたします。",
    s4Title: "知的財産権",
    s4P1:
      "事前の書面による許可なく WMC のコンテンツ（オリジナルの文章、説明、データの構成、デザイン）を複製することは禁止されています。アーティスト名、riddim 名およびレーベル名は、それぞれの権利者に帰属します。",
    s5Title: "責任の制限",
    s5P1:
      "WMC は、掲載されたデータの誤りや欠落について責任を負いません。当サイトは、明示または黙示を問わず、いかなる保証もなく「現状のまま」提供されます。WMC は、当サイトの利用に起因する直接的または間接的ないかなる損害についても責任を負いません。",
    s6Title: "外部リンク",
    s6P1:
      "WMC には、第三者のサイト（YouTube、Spotify など）へのリンクが含まれる場合があります。これらのリンクは利便性のために提供されています。WMC は、これらのサイトのコンテンツを一切管理しておらず、その内容やプライバシーに関する取り扱いについて一切の責任を負いません。",
    s7Title: "準拠法",
    s7P1:
      "本利用規約は、フランス法に準拠します。当サイトの利用に関するあらゆる紛争は、フランスの裁判所の専属的管轄に服するものとします。",
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
  const hreflang = generateHreflang('/conditions', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/conditions`,
      languages: hreflang,
    },
  };
}

export default async function ConditionsPage({
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
        <section className={styles.section} aria-label={c.s1Title}>
          <h2 className={styles.sectionTitle}>{c.s1Title}</h2>
          <p className={styles.paragraph}>{c.s1P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s2Title}>
          <h2 className={styles.sectionTitle}>{c.s2Title}</h2>
          <p className={styles.paragraph}>{c.s2P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s3Title}>
          <h2 className={styles.sectionTitle}>{c.s3Title}</h2>
          <p className={styles.paragraph}>{c.s3P1}</p>
          <p className={styles.paragraph}>{c.s3P2}</p>
        </section>

        <section className={styles.section} aria-label={c.s4Title}>
          <h2 className={styles.sectionTitle}>{c.s4Title}</h2>
          <p className={styles.paragraph}>{c.s4P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s5Title}>
          <h2 className={styles.sectionTitle}>{c.s5Title}</h2>
          <p className={styles.paragraph}>{c.s5P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s6Title}>
          <h2 className={styles.sectionTitle}>{c.s6Title}</h2>
          <p className={styles.paragraph}>{c.s6P1}</p>
        </section>

        <section className={styles.section} aria-label={c.s7Title}>
          <h2 className={styles.sectionTitle}>{c.s7Title}</h2>
          <p className={styles.paragraph}>{c.s7P1}</p>
        </section>
      </div>
    </main>
  );
}
