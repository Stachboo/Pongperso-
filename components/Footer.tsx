import React from 'react';
import type { Dictionary } from '@/lib/i18n';
import styles from './Footer.module.css';

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{dict.footerText}</p>
      <p className={styles.note}>{dict.footerNote}</p>
      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} World Music Contest
      </p>
    </footer>
  );
}
