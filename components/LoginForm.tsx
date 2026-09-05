'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDictionary, isValidLocale } from '@/lib/i18n';
import styles from './LoginForm.module.css';

export default function LoginForm({ lang }: { lang: string }) {
  const router = useRouter();
  const dict = getDictionary(isValidLocale(lang) ? lang : 'fr');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });

      if (res.ok) {
        router.push(`/${lang}/audit`);
        router.refresh();
      } else {
        setError(dict.loginErrorCredentials);
      }
    } catch {
      setError(dict.loginErrorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bloom} aria-hidden="true" />
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <span className={styles.vinyl} aria-hidden="true">
            <span className={styles.vinylLabel} />
            <span className={styles.vinylHole} />
          </span>
          <h1 className={styles.title}>
            RIDDIM CONSOLE <span className={styles.script} aria-hidden="true">admin</span>
          </h1>
          <p className={styles.subtitle}>{dict.loginSubtitle}</p>
        </div>

        {error && <div className={styles.error} role="alert">{error}</div>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">{dict.loginUsername}</label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">{dict.loginPassword}</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? dict.loginSubmitting : dict.loginSubmit}
        </button>
      </form>
    </div>
  );
}
