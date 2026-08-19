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

## Architecture données (spécificité importante)

Deux sources de données qui peuvent DIVERGER :
- **Pages publiques** (statiques, SSG) : construites au build depuis `data/riddims.json` (repo)
- **Admin + API** (`/api/riddims`) : lit/écrit `riddims.json` dans **Vercel Blob**
  (seed depuis le fichier repo au premier appel si Blob vide)

Quand l'admin modifie des données : écriture dans le Blob + déclenchement d'un
redeploy via `DEPLOY_HOOK_URL`… mais le build relit le fichier du REPO, pas le Blob.
→ Après des éditions admin, `data/riddims.json` du repo doit être resynchronisé depuis
le Blob (GET https://wmc-iota.vercel.app/api/riddims) sinon les pages publiques restent
en retard. Vérifier cette dérive à chaque session qui touche aux données.

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

## Branche de travail Claude

`claude/salam-akhi-uqmwmb` — toujours développer dessus, PR vers `main`.
