import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE CONTACT
   Coordonnées et informations de contact
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  contactAria: string;
  contactTitle: string;
  contactParagraph: string;
  emailAria: string;
  emailGeneralLabel: string;
  pressLabel: string;
  socialAria: string;
  socialTitle: string;
  delayAria: string;
  delayLabel: string;
  delayValue: string;
  delayParagraph: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Contact — Nous contacter',
    metaDescription:
      'Contactez l\'équipe WMC pour toute question sur la base de données des riddims jamaïcains, les partenariats ou les demandes presse.',
    title: 'Contact',
    subtitle: 'nous écrire',
    contactAria: 'Nous contacter',
    contactTitle: 'Nous contacter',
    contactParagraph:
      'Pour toute question concernant WMC, les données, les partenariats ou les demandes presse, n\'hésitez pas à nous écrire. Notre équipe se fera un plaisir de vous répondre.',
    emailAria: 'Email',
    emailGeneralLabel: 'Email général',
    pressLabel: 'Demandes presse',
    socialAria: 'Réseaux sociaux',
    socialTitle: 'Réseaux sociaux',
    delayAria: 'Délai de réponse',
    delayLabel: 'Délai de réponse',
    delayValue: '48 à 72 heures',
    delayParagraph:
      'Nous répondons à toutes les demandes dans un délai de 48 à 72 heures ouvrées. Pour les demandes urgentes, merci de le préciser dans l\'objet de votre message.',
  },
  en: {
    metaTitle: 'Contact — Get in touch',
    metaDescription:
      'Contact the WMC team with any question about the Jamaican riddims database, partnerships or press enquiries.',
    title: 'Contact',
    subtitle: 'write to us',
    contactAria: 'Get in touch',
    contactTitle: 'Get in touch',
    contactParagraph:
      'For any question about WMC, the data, partnerships or press enquiries, feel free to write to us. Our team will be glad to get back to you.',
    emailAria: 'Email',
    emailGeneralLabel: 'General email',
    pressLabel: 'Press enquiries',
    socialAria: 'Social media',
    socialTitle: 'Social media',
    delayAria: 'Response time',
    delayLabel: 'Response time',
    delayValue: '48 to 72 hours',
    delayParagraph:
      'We answer all enquiries within 48 to 72 business hours. For urgent requests, please indicate this in the subject line of your message.',
  },
  es: {
    metaTitle: 'Contacto — Escríbenos',
    metaDescription:
      'Ponte en contacto con el equipo de WMC para cualquier consulta sobre la base de datos de riddims jamaicanos, colaboraciones o solicitudes de prensa.',
    title: 'Contacto',
    subtitle: 'escríbenos',
    contactAria: 'Ponte en contacto',
    contactTitle: 'Ponte en contacto',
    contactParagraph:
      'Para cualquier consulta sobre WMC, los datos, las colaboraciones o las solicitudes de prensa, no dudes en escribirnos. Nuestro equipo estará encantado de responderte.',
    emailAria: 'Correo electrónico',
    emailGeneralLabel: 'Correo general',
    pressLabel: 'Solicitudes de prensa',
    socialAria: 'Redes sociales',
    socialTitle: 'Redes sociales',
    delayAria: 'Tiempo de respuesta',
    delayLabel: 'Tiempo de respuesta',
    delayValue: '48 a 72 horas',
    delayParagraph:
      'Respondemos a todas las consultas en un plazo de 48 a 72 horas hábiles. Para solicitudes urgentes, indícalo en el asunto de tu mensaje.',
  },
  pt: {
    metaTitle: 'Contato — Fale conosco',
    metaDescription:
      'Entre em contato com a equipe da WMC para qualquer dúvida sobre a base de dados de riddims jamaicanos, parcerias ou solicitações de imprensa.',
    title: 'Contato',
    subtitle: 'fale conosco',
    contactAria: 'Fale conosco',
    contactTitle: 'Fale conosco',
    contactParagraph:
      'Para qualquer dúvida sobre a WMC, os dados, as parcerias ou as solicitações de imprensa, não hesite em nos escrever. Nossa equipe terá o maior prazer em responder.',
    emailAria: 'E-mail',
    emailGeneralLabel: 'E-mail geral',
    pressLabel: 'Solicitações de imprensa',
    socialAria: 'Redes sociais',
    socialTitle: 'Redes sociais',
    delayAria: 'Prazo de resposta',
    delayLabel: 'Prazo de resposta',
    delayValue: '48 a 72 horas',
    delayParagraph:
      'Respondemos a todas as solicitações em um prazo de 48 a 72 horas úteis. Para solicitações urgentes, indique isso no assunto da sua mensagem.',
  },
  ja: {
    metaTitle: 'お問い合わせ — ご連絡ください',
    metaDescription:
      'ジャマイカのriddimデータベース、パートナーシップ、報道関係のお問い合わせなど、WMCチームまでお気軽にご連絡ください。',
    title: 'お問い合わせ',
    subtitle: 'ご連絡ください',
    contactAria: 'お問い合わせ',
    contactTitle: 'お問い合わせ',
    contactParagraph:
      'WMC、データ、パートナーシップ、報道関係のご質問など、どんなことでもお気軽にご連絡ください。私たちのチームが喜んでお答えいたします。',
    emailAria: 'メール',
    emailGeneralLabel: '一般のお問い合わせ',
    pressLabel: '報道関係のお問い合わせ',
    socialAria: 'ソーシャルメディア',
    socialTitle: 'ソーシャルメディア',
    delayAria: '返信までの目安',
    delayLabel: '返信までの目安',
    delayValue: '48〜72時間',
    delayParagraph:
      'すべてのお問い合わせには、営業時間ベースで48〜72時間以内に返信いたします。お急ぎの場合は、メッセージの件名にその旨をご記載ください。',
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
  const hreflang = generateHreflang('/contact', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/contact`,
      languages: hreflang,
    },
  };
}

export default async function ContactPage({
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
        <section className={styles.section} aria-label={c.contactAria}>
          <h2 className={styles.sectionTitle}>{c.contactTitle}</h2>
          <p className={styles.paragraph}>{c.contactParagraph}</p>
        </section>

        <section className={styles.section} aria-label={c.emailAria}>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.emailGeneralLabel}</p>
            <p className={styles.infoValue}>
              <a href="mailto:contact@wmc-riddims.com">contact@wmc-riddims.com</a>
            </p>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.pressLabel}</p>
            <p className={styles.infoValue}>
              <a href="mailto:presse@wmc-riddims.com">presse@wmc-riddims.com</a>
            </p>
          </div>
        </section>

        <section className={styles.section} aria-label={c.socialAria}>
          <h2 className={styles.sectionTitle}>{c.socialTitle}</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Instagram — @wmc_riddims
            </li>
            <li className={styles.listItem}>
              X (Twitter) — @wmc_riddims
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-label={c.delayAria}>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>{c.delayLabel}</p>
            <p className={styles.infoValue}>{c.delayValue}</p>
          </div>
          <p className={styles.paragraph}>{c.delayParagraph}</p>
        </section>
      </div>
    </main>
  );
}
