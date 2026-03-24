'use client';

import React, { useState } from 'react';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FORMULAIRE DE SOUMISSION DE RIDDIM
   Composant client — formulaire statique (mailto, pas de backend)
   ══════════════════════════════════════════════════════════════════════════════ */

export default function FormulaireSoumission() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(
      `[WMC] Suggestion de riddim : ${data.get('riddimName') ?? ''}`
    );
    const body = encodeURIComponent(
      `Nom du riddim : ${data.get('riddimName') ?? ''}\n` +
      `Année : ${data.get('year') ?? ''}\n` +
      `Producteur / Label : ${data.get('producer') ?? ''}\n` +
      `Genre : ${data.get('genre') ?? ''}\n\n` +
      `Voicings connus :\n${data.get('voicings') ?? ''}\n\n` +
      `Sources / liens :\n${data.get('sources') ?? ''}`
    );

    window.location.href = `mailto:contact@wmc-riddims.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.infoBlock}>
        <p className={styles.infoValue}>Merci pour votre suggestion !</p>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
          Votre client email devrait s&apos;ouvrir avec les informations pré-remplies.
          L&apos;équipe WMC examinera votre soumission.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label htmlFor="riddimName" className={styles.fieldLabel}>
          Nom du riddim
        </label>
        <input
          id="riddimName"
          name="riddimName"
          type="text"
          className={styles.fieldInput}
          placeholder="Ex : Bam Bam Riddim"
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="year" className={styles.fieldLabel}>
          Année de sortie
        </label>
        <input
          id="year"
          name="year"
          type="number"
          className={styles.fieldInput}
          placeholder="Ex : 1982"
          min={1950}
          max={2030}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="producer" className={styles.fieldLabel}>
          Producteur / Label
        </label>
        <input
          id="producer"
          name="producer"
          type="text"
          className={styles.fieldInput}
          placeholder="Ex : Sly & Robbie / Taxi Records"
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="genre" className={styles.fieldLabel}>
          Genre
        </label>
        <select id="genre" name="genre" className={styles.fieldSelect} required>
          <option value="">— Sélectionner —</option>
          <option value="dancehall">Dancehall</option>
          <option value="reggae">Reggae</option>
          <option value="lovers-rock">Lovers Rock</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="voicings" className={styles.fieldLabel}>
          Voicings connus (artiste + titre, un par ligne)
        </label>
        <textarea
          id="voicings"
          name="voicings"
          className={styles.fieldTextarea}
          placeholder={'Sean Paul — Get Busy\nBounty Killer — Sufferer\nWayne Wonder — No Letting Go'}
          rows={5}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="sources" className={styles.fieldLabel}>
          Sources / liens
        </label>
        <textarea
          id="sources"
          name="sources"
          className={styles.fieldTextarea}
          placeholder="Liens YouTube, Spotify, Wikipedia, Discogs..."
          rows={3}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Envoyer la suggestion
      </button>

      <p className={styles.formNote}>
        Les soumissions sont examinées par l&apos;équipe WMC avant intégration.
        Nous ne garantissons pas l&apos;ajout de chaque suggestion.
      </p>
    </form>
  );
}
