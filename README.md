# World Music Contest — Riddim Database

La référence des riddims jamaïcains : **152 riddims, 1 253 voicings, ~5,9 milliards de vues**, de 1967 à 2021. Dancehall, reggae, lovers rock et soca — avec pages artistes, producteurs et administration intégrée.

🌐 **Site** : https://wmc-iota.vercel.app

## Stack

- **Next.js 14** (App Router, SSG — ~1 385 pages générées) + **TypeScript** + CSS Modules
- **Vercel Blob** pour la persistance des données éditées via l'admin
- **5 langues** : français (défaut), anglais, espagnol, portugais, japonais
- SEO complet : sitemap dynamique (770+ URLs), JSON-LD (MusicComposition, ItemList), hreflang, Open Graph

## Fonctionnalités

- **Explorer** : recherche, filtres (genre, décennie, producteur), tri, grille bento
- **Fiches riddim** : description, BPM, classement des voicings par vues, liens YouTube, riddims similaires
- **Artistes** : répertoire auto-généré depuis les voicings (400+), pages détail avec stats
- **Producteurs** : 30 producteurs documentés (histoire, riddims, artistes clés)
- **Admin** (`/fr/audit`) : connexion sécurisée (HMAC + cookie httpOnly), CRUD riddims/voicings, détection de doublons, redéploiement automatique après édition
- Pages : à propos, méthodologie, contact, ajouter un riddim, presse, mentions légales

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # serveur de production
npm run audit      # audit des données → data/audit-report.json
```

### Variables d'environnement (`.env.local`)

```
ADMIN_USERNAME=…
ADMIN_PASSWORD=…
AUTH_SECRET=…               # 64 caractères hex
BLOB_READ_WRITE_TOKEN=…     # fourni par Vercel Blob
DEPLOY_HOOK_URL=…           # deploy hook Vercel (optionnel)
```

## Structure

Voir `ANALYSE-COMPLETE-WMC.md` pour l'architecture détaillée fichier par fichier, et `CLAUDE.md` pour la mémoire de projet des sessions d'assistance IA. L'ancienne version statique du site est conservée dans `_legacy/`.
