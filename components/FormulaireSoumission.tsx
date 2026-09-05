'use client';

import React, { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FORMULAIRE DE SOUMISSION DE RIDDIM
   Composant client — formulaire statique (mailto, pas de backend)
   ══════════════════════════════════════════════════════════════════════════════ */

export default function FormulaireSoumission({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(
      dict.formEmailSubject.replace('{name}', String(data.get('riddimName') ?? ''))
    );
    const body = encodeURIComponent(
      `${dict.formRiddimName} : ${data.get('riddimName') ?? ''}\n` +
      `${dict.formYearLabel} : ${data.get('year') ?? ''}\n` +
      `${dict.formProducerLabel} : ${data.get('producer') ?? ''}\n` +
      `${dict.filterGenre} : ${data.get('genre') ?? ''}\n\n` +
      `${dict.formVoicingsLabel} :\n${data.get('voicings') ?? ''}\n\n` +
      `${dict.formSourcesLabel} :\n${data.get('sources') ?? ''}`
    );

    window.location.href = `mailto:contact@wmc-riddims.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.infoBlock}>
        <p className={styles.infoValue}>{dict.formThankYou}</p>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
          {dict.formThankYouDesc}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label htmlFor="riddimName" className={styles.fieldLabel}>
          {dict.formRiddimName}
        </label>
        <input
          id="riddimName"
          name="riddimName"
          type="text"
          className={styles.fieldInput}
          placeholder={dict.formRiddimNamePlaceholder}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="year" className={styles.fieldLabel}>
          {dict.formYearLabel}
        </label>
        <input
          id="year"
          name="year"
          type="number"
          className={styles.fieldInput}
          placeholder={dict.formYearPlaceholder}
          min={1950}
          max={2030}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="producer" className={styles.fieldLabel}>
          {dict.formProducerLabel}
        </label>
        <input
          id="producer"
          name="producer"
          type="text"
          className={styles.fieldInput}
          placeholder={dict.formProducerPlaceholder}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="genre" className={styles.fieldLabel}>
          {dict.filterGenre}
        </label>
        <select id="genre" name="genre" className={styles.fieldSelect} required>
          <option value="">{dict.formGenreSelect}</option>
          <option value="dancehall">{dict.genreDancehall}</option>
          <option value="reggae">{dict.genreReggae}</option>
          <option value="lovers-rock">{dict.genreLovers}</option>
          <option value="autre">{dict.formGenreOther}</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="voicings" className={styles.fieldLabel}>
          {dict.formVoicingsLabel}
        </label>
        <textarea
          id="voicings"
          name="voicings"
          className={styles.fieldTextarea}
          placeholder={dict.formVoicingsPlaceholder}
          rows={5}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="sources" className={styles.fieldLabel}>
          {dict.formSourcesLabel}
        </label>
        <textarea
          id="sources"
          name="sources"
          className={styles.fieldTextarea}
          placeholder={dict.formSourcesPlaceholder}
          rows={3}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        {dict.formSubmit}
      </button>

      <p className={styles.formNote}>
        {dict.formNote}
      </p>
    </form>
  );
}
