# CLAUDE.md — Mémoire du projet WMC (World Music Contest)

> Fichier de connaissance pour les sessions Claude Code. Lire ce fichier AVANT toute
> modification. Règle immuable du propriétaire : **analyser l'entièreté du repo
> fichier par fichier avant de proposer des modifications de code.**

## Ce que ce projet EST

Base de données de riddims jamaïcains en **Next.js 14 (App Router) + TypeScript**.
**152 riddims, 1 253 voicings, ~5,9 Md de vues**, 5 langues (fr par défaut, en, es, pt, ja).
Le nom du repo (« Pongperso- ») est un vestige historique — aucun rapport avec Pong.

- **Prod** : https://wmc-iota.vercel.app (projet Vercel « wmc », équipe `abdus-projects-57f170e1`, plan Hobby, preset **Next.js**)
- **Propriétaire** : Stachboo (stachboo@gmail.com)
- Architecture détaillée complète : voir `ANALYSE-COMPLETE-WMC.md` (fiable, vérifié)
- `_legacy/` = ancienne version statique HTML/JS (obsolète, conservée pour référence)

## Historique critique (à connaître absolument)

1. **Mars 2026** : le site a été réécrit de statique vers Next.js sur la branche
   `claude/analyze-project-modifications-7ZzR0` (PR #6, jamais mergée). Cette version
   Next.js tournait en prod sur Vercel (preset Next.js configuré pour elle).
2. **Mars→août 2026** : `main` contenait encore l'ancienne version statique (44 riddims).
   Tout déploiement depuis `main` échouait (« No Next.js version detected »).
3. **19 août 2026** : audit + corrections SEO appliqués par erreur sur la version
   statique de `main` (PR #7, mergée) avec un `vercel.json` forçant le mode statique
   → la prod a servi la vieille version 44 riddims → le propriétaire a signalé le site
   cassé (« il manque la base de données »).
4. **Correction** : restauration de la version Next.js originale (152 riddims) sur `main`,
   suppression du `vercel.json` (le preset Next.js du dashboard Vercel doit rester).

⚠️ **Ne JAMAIS remettre un `vercel.json` avec `framework: null`** — ça casse le build Next.js.

## Architecture données (ISR à la demande — refonte 19/08/2026)

Source de vérité runtime = **Vercel Blob** (`riddims.json`). `data/riddims.json`
du repo n'est plus que le **seed** (repli au build / si Blob indisponible).

- `lib/data.ts` : `getAllRiddims()` = `unstable_cache(readBlob, ['all-riddims'],
  { tags: ['riddims'] })`. Lit le Blob avec cache-busting `?v=uploadedAt`.
- Toutes les pages publiques + composants détail (RiddimDetail/ArtistDetail/
  ProducerDetail) sont des **async server components** qui `await getAllRiddims()`.
  Elles restent **SSG** (servies depuis le cache = rapides).
- `/api/riddims` POST : après écriture Blob → `revalidateTag('riddims')` →
  régénération **live des pages, sans redéploiement**. `cacheControlMaxAge: 0`
  sur `put` pour éviter le CDN périmé. Plus de `DEPLOY_HOOK_URL`.
- Helpers async : `getAllRiddims`, `getRiddimById`, `getRiddimsByPopularity`,
  `getCatalogStats`. Helpers purs sync : `getTotalViews`, `formatViews`,
  `getYoutubeSearchUrl`.

⚠️ Ne PAS revenir à `import riddimsData from 'data/riddims.json'` dans les pages :
ça re-fige les données au build (le bug qu'on a corrigé). Le seed ne sert qu'au repli.

## Admin (« page gestion »)

- `/{lang}/audit/login` → login (cookie httpOnly `wmc-auth`, HMAC-SHA256)
- `/{lang}/audit` → AuditDashboard : CRUD voicings (add/edit/delete/move/reorder),
  création de riddims, détection de doublons cross-riddim
- Protégé par `middleware.ts` (pages + POST /api/riddims)
- Env vars attendues (Vercel, 3 configurées + Blob auto) : `ADMIN_USERNAME`,
  `ADMIN_PASSWORD`, `AUTH_SECRET`, `DEPLOY_HOOK_URL`, `BLOB_READ_WRITE_TOKEN` (auto via Blob store).
  Le code a des valeurs par défaut de dev — en prod les env vars doivent les écraser.

## Commandes

```bash
npm install
npm run dev          # dev local
npm run build        # build prod (≈1 385 pages SSG)
npm start            # serveur prod local
npm run audit        # scripts/audit-voicings.js → data/audit-report.json
```

Test local vérifié OK (19/08/2026) : build complet, toutes pages, login admin
(valeurs par défaut du code en local), dashboard fonctionnel.

## Points d'attention connus

- `BASE_URL` en dur dans `utils/seo.ts` + `metadataBase` dans `app/layout.tsx`
  (= https://wmc-iota.vercel.app) — à changer si domaine personnalisé un jour
- `public/Logo.png` (6,2 Mo) : référencé nulle part, candidat à suppression/compression
- 78 riddims sans BPM (affichage conditionnel, pas un bug)
- 7 doublons cross-riddim connus (visibles dans le dashboard admin)
- `data/audit-report.json` : rapport généré par `npm run audit`, committé
- PR #6 : contient l'historique de cette version Next.js ; obsolète une fois la
  restauration mergée sur main — à fermer avec un commentaire, pas à merger
- Sessions sandbox Claude : Chromium ne peut pas atteindre l'extérieur (proxy) —
  tester les URLs prod avec curl ; Playwright fonctionne uniquement sur localhost

## Revue multi-agents (19/08/2026) — état des 21 findings confirmés

✅ CORRIGÉS (commit 83e5ae4, PR #8) :
- XSS stockée JSON-LD (échappement `jsonLdString`, 5 sites)
- Token : expiration 24h vérifiée + comparaison temps constant
- producers.ts riddimIds suffixe `-riddim` (liaison producteur→riddims était morte)
- Filtre genre "Roots" mort (retiré)
- Collisions de slugs artistes (fusion par slug dans buildArtistList)
- Division par zéro maxViews (`??`→`||`)
- Validation entrées CRUD (views entier≥0, strings non vides, Array.isArray)
- Dashboard admin resync Blob au montage (useEffect)
- Sitemap complété (~2300 URLs : artistes/producteurs/pages) + hreflang pages riddim

✅ RÉGLÉ par la refonte ISR (commit suivant) :
- Éditions admin live sur pages publiques (revalidateTag, plus de redeploy)
- Race/cache Blob 1 an atténué (cache-busting uploadedAt + cacheControlMaxAge 0).
  Reste possible : version optimiste (409) sur écritures concurrentes — faible
  priorité (admin unique).

⏳ DÉCISIONS EN ATTENTE :
- **[HIGH sécurité]** Secrets/creds par défaut codés en dur. → Propriétaire a dit
  "ne pas toucher pour l'instant" (19/08). À reprendre : retirer les fallbacks +
  faire tourner le mot de passe (présent dans l'historique git).
- **[HIGH i18n — À FAIRE, choix "traduire pour de vrai"]** Composants publics
  (ArtistDetail, ProducerDetail, ArtistSearchBar, FormulaireSoumission) + pages
  éditoriales (about, methodologie, contact, presse, pages légales) 100% français
  en dur sur les 5 langues, avec hreflang mensonger, + `<html lang="fr">` codé en
  dur (app/layout.tsx:66). Chantier : extraire tous les textes vers lib/i18n.ts et
  traduire dans les 5 langues, remonter <html lang> dans app/[lang]/layout.tsx.
  → prochain gros bloc de travail demandé par le propriétaire.
- **[LOW]** x-default(en) vs DEFAULT_LOCALE(fr) ; middleware skip chemin avec point ;
  invariant de tri CRUD ; /explorer vs /riddims duplication ; 5 keyArtists → 404.

Rapport complet archivé (tokens) : la revue a produit 21 findings avec verdict
adversarial ; si besoin de les revoir, relancer la revue ou demander au propriétaire.

## Branche de travail Claude

`claude/salam-akhi-uqmwmb` — toujours développer dessus, PR vers `main`.
