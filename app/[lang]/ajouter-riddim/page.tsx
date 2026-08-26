import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, getDictionary, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import FormulaireSoumission from '@/components/FormulaireSoumission';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE AJOUTER UN RIDDIM
   Formulaire de soumission de riddim (statique, mailto)
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  contributeAria: string;
  contributeTitle: string;
  paragraph1: string;
  paragraph2: string;
  formAria: string;
  formTitle: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Ajouter un riddim — Contribuer à la base de données',
    metaDescription:
      'Soumettez un riddim jamaïcain non encore documenté dans la base de données WMC. Contribuez à préserver le patrimoine musical jamaïcain.',
    title: 'Ajouter un riddim',
    subtitle: 'contribuer à WMC',
    contributeAria: 'Contribuer à WMC',
    contributeTitle: 'Contribuer à WMC',
    paragraph1:
      'WMC est construit par et pour les passionnés de musique jamaïcaine. Si vous connaissez un riddim non encore documenté, vous pouvez nous le soumettre via le formulaire ci-dessous.',
    paragraph2:
      'Renseignez le maximum d’informations disponibles : nom du riddim, année de sortie, producteur, label, et surtout les voicings connus avec les artistes et titres associés.',
    formAria: 'Formulaire de soumission',
    formTitle: 'Soumettre un riddim',
  },
  en: {
    metaTitle: 'Add a riddim — Contribute to the database',
    metaDescription:
      'Submit a Jamaican riddim not yet documented in the WMC database. Help preserve Jamaica’s musical heritage.',
    title: 'Add a riddim',
    subtitle: 'contribute to WMC',
    contributeAria: 'Contribute to WMC',
    contributeTitle: 'Contribute to WMC',
    paragraph1:
      'WMC is built by and for lovers of Jamaican music. If you know a riddim that is not yet documented, you can submit it to us through the form below.',
    paragraph2:
      'Provide as much information as possible: the riddim name, release year, producer, label, and above all the known voicings with their associated artists and titles.',
    formAria: 'Submission form',
    formTitle: 'Submit a riddim',
  },
  es: {
    metaTitle: 'Añadir un riddim — Contribuir a la base de datos',
    metaDescription:
      'Envía un riddim jamaicano aún no documentado en la base de datos de WMC. Contribuye a preservar el patrimonio musical jamaicano.',
    title: 'Añadir un riddim',
    subtitle: 'contribuir a WMC',
    contributeAria: 'Contribuir a WMC',
    contributeTitle: 'Contribuir a WMC',
    paragraph1:
      'WMC está construido por y para los apasionados de la música jamaicana. Si conoces un riddim aún no documentado, puedes enviárnoslo a través del formulario que aparece a continuación.',
    paragraph2:
      'Indica la mayor cantidad de información disponible: nombre del riddim, año de lanzamiento, productor, sello y, sobre todo, los voicings conocidos con los artistas y títulos asociados.',
    formAria: 'Formulario de envío',
    formTitle: 'Enviar un riddim',
  },
  pt: {
    metaTitle: 'Adicionar um riddim — Contribuir para a base de dados',
    metaDescription:
      'Envie um riddim jamaicano ainda não documentado na base de dados do WMC. Contribua para preservar o patrimônio musical jamaicano.',
    title: 'Adicionar um riddim',
    subtitle: 'contribuir para o WMC',
    contributeAria: 'Contribuir para o WMC',
    contributeTitle: 'Contribuir para o WMC',
    paragraph1:
      'O WMC é construído por e para os apaixonados por música jamaicana. Se você conhece um riddim ainda não documentado, pode enviá-lo para nós pelo formulário abaixo.',
    paragraph2:
      'Informe o máximo de dados disponíveis: nome do riddim, ano de lançamento, produtor, gravadora e, sobretudo, os voicings conhecidos com os artistas e títulos associados.',
    formAria: 'Formulário de envio',
    formTitle: 'Enviar um riddim',
  },
  ja: {
    metaTitle: 'リディムを追加 — データベースに貢献する',
    metaDescription:
      'WMCデータベースにまだ記載されていないジャマイカのriddimを投稿しましょう。ジャマイカの音楽遺産の保存に貢献してください。',
    title: 'リディムを追加',
    subtitle: 'WMCに貢献する',
    contributeAria: 'WMCに貢献する',
    contributeTitle: 'WMCに貢献する',
    paragraph1:
      'WMCはジャマイカ音楽を愛する人々によって、その人々のために作られています。まだ記載されていないriddimをご存じの場合は、下のフォームから投稿できます。',
    paragraph2:
      'できるだけ多くの情報を記入してください。riddim名、リリース年、プロデューサー、レーベル、そして何よりも、関連するアーティストとタイトルを含む既知のvoicingsをお願いします。',
    formAria: '投稿フォーム',
    formTitle: 'リディムを投稿',
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
  const hreflang = generateHreflang('/ajouter-riddim', locale);

  return {
    title: CONTENT[locale].metaTitle,
    description: CONTENT[locale].metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/ajouter-riddim`,
      languages: hreflang,
    },
  };
}

export default async function AjouterRiddimPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const c = CONTENT[locale];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{c.title}</h1>
        <span className={styles.subtitle}>{c.subtitle}</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        <section className={styles.section} aria-label={c.contributeAria}>
          <h2 className={styles.sectionTitle}>{c.contributeTitle}</h2>
          <p className={styles.paragraph}>{c.paragraph1}</p>
          <p className={styles.paragraph}>{c.paragraph2}</p>
        </section>

        <section className={styles.section} aria-label={c.formAria}>
          <h2 className={styles.sectionTitle}>{c.formTitle}</h2>
          <FormulaireSoumission dict={dict} />
        </section>
      </div>
    </main>
  );
}
