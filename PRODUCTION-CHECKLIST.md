# WMC — Checklist de Production

> Vérifications à effectuer avant le déploiement en production.

---

## Build & Déploiement

- [ ] `npm run build` réussit sans erreurs
- [ ] `npm run lint` passe sans avertissements bloquants
- [ ] Toutes les pages statiques sont générées (1385+ pages)
- [ ] Variables d'environnement vérifiées (si applicables)
- [ ] Déploiement Vercel en preview testé

---

## SEO & Métadonnées

- [ ] `metadataBase` défini dans `app/layout.tsx`
- [ ] Chaque page a un `title` et `description` uniques
- [ ] Balises `canonical` présentes sur toutes les pages
- [ ] `hreflang` alternates pour les 5 langues (fr, en, es, pt, ja)
- [ ] `x-default` pointe vers la version anglaise
- [ ] OpenGraph (`og:title`, `og:description`, `og:type`, `og:url`)
- [ ] Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`)
- [ ] `manifest.json` accessible et valide

---

## Données structurées (JSON-LD)

- [ ] `MusicComposition` sur chaque page riddim
- [ ] `ItemList` des voicings sur chaque page riddim
- [ ] `BreadcrumbList` sur les pages riddim et artiste
- [ ] `Person` / `MusicGroup` sur chaque page artiste
- [ ] Validation via [Schema.org Validator](https://validator.schema.org/)
- [ ] Validation via [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Indexation & Crawl

- [ ] `robots.ts` autorise les crawlers principaux
- [ ] `robots.ts` bloque `/api/`, `/_next/`, `/static/`
- [ ] Bots IA autorisés : GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] `sitemap.ts` génère toutes les URLs avec alternates
- [ ] Sitemap soumis dans Google Search Console

---

## Performance

- [ ] `poweredByHeader: false` dans next.config
- [ ] `compress: true` dans next.config
- [ ] Headers de sécurité configurés (X-Frame-Options, X-Content-Type-Options)
- [ ] Images optimisées (si ajoutées ultérieurement)
- [ ] Fonts chargées avec `next/font` (Inter, Playfair Display)
- [ ] CSS Modules — pas de CSS global inutile
- [ ] `prefers-reduced-motion` respecté sur toutes les animations

---

## Accessibilité

- [ ] Navigation au clavier fonctionnelle
- [ ] `aria-label` sur les éléments interactifs
- [ ] `role="button"` avec `tabIndex={0}` et `onKeyDown`
- [ ] Contrastes de couleurs suffisants (WCAG AA)
- [ ] Focus visible (`focus-visible`) sur tous les éléments interactifs
- [ ] Skip to content link (optionnel, recommandé)

---

## Composants & Fonctionnalités

- [ ] **Navbar** : fixe, rétrécit au scroll, burger mobile, langue switcher
- [ ] **Footer** : 3 colonnes de liens, stats, disclaimer
- [ ] **PageWrapper** : fadeIn animation, padding-top correct
- [ ] **ScrollToTop** : apparaît après 400px, accessible au clavier
- [ ] **RiddimDetail** : tags, voicings table, YouTube links, similar riddims
- [ ] **ArtistDetail** : avatar, stats, riddims table, related artists
- [ ] **ArtistCard** : gradient déterministe, badges, decades
- [ ] **ShareButton** : Web Share API avec fallback clipboard

---

## i18n

- [ ] 5 langues supportées : fr, en, es, pt, ja
- [ ] Dictionnaire complet pour chaque langue
- [ ] Routes `[lang]` fonctionnelles
- [ ] Drapeaux / sélecteur de langue dans la Navbar
- [ ] Pas de texte en dur dans les composants (utiliser `dict`)

---

## Sécurité

- [ ] `X-Frame-Options: DENY`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] Pas de secrets exposés dans le code client
- [ ] `dangerouslySetInnerHTML` uniquement pour JSON-LD contrôlé

---

## Tests manuels

- [ ] Page d'accueil — chargement, navigation
- [ ] Explorer — filtres, tri, pagination
- [ ] Page riddim — détail complet, voicings, YouTube links
- [ ] Page artistes — liste, recherche, filtrage
- [ ] Page artiste — détail, riddims table, related artists
- [ ] Navigation mobile — burger menu, drawer
- [ ] Changement de langue — toutes les pages
- [ ] Scroll to top — apparition, clic, clavier
- [ ] Share button — partage natif ou copie clipboard
- [ ] 404 — page non trouvée gérée correctement
