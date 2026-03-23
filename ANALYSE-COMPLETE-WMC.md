# WMC (World Music Contest) — Analyse complète du projet

> Analyse exhaustive pour reproduction locale exacte du projet.
> Généré le 23 mars 2026.

---

## 1. Architecture générale

```
Pongperso-/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine (fonts, analytics, metadata)
│   ├── robots.ts                 # robots.txt dynamique
│   ├── sitemap.ts                # Sitemap dynamique (770+ URLs)
│   ├── api/
│   │   ├── auth/route.ts         # Login/logout/check (HMAC-SHA256)
│   │   └── riddims/route.ts      # CRUD riddims (@vercel/blob)
│   └── [lang]/
│       ├── layout.tsx            # Layout langue (Navbar, Footer, etc.)
│       ├── page.tsx              # Homepage
│       ├── page.module.css
│       ├── explorer/page.tsx     # Explorer (filtres + grille)
│       ├── riddim/[id]/page.tsx  # Détail riddim
│       ├── riddims/
│       │   ├── page.tsx          # Liste riddims
│       │   └── page.module.css
│       ├── artistes/
│       │   ├── page.tsx          # Répertoire artistes
│       │   ├── page.module.css
│       │   └── [slug]/page.tsx   # Détail artiste
│       ├── producteurs/
│       │   ├── page.tsx          # Répertoire producteurs
│       │   ├── page.module.css
│       │   └── [id]/
│       │       ├── page.tsx      # Détail producteur
│       │       └── page.module.css
│       ├── about/page.tsx
│       ├── methodologie/page.tsx
│       ├── contact/page.tsx
│       ├── ajouter-riddim/page.tsx
│       ├── presse/page.tsx
│       ├── conditions/page.tsx
│       ├── confidentialite/page.tsx
│       ├── mentions-legales/page.tsx
│       ├── audit/
│       │   ├── page.tsx          # Dashboard admin (noindex)
│       │   └── login/page.tsx    # Login admin (noindex)
│       └── ...
├── components/
│   ├── Navbar.tsx + .module.css
│   ├── Footer.tsx + .module.css
│   ├── PageWrapper.tsx + .module.css
│   ├── Logo.tsx
│   ├── HeroSection.tsx + .module.css
│   ├── ExplorerClient.tsx
│   ├── FilterBar.tsx + .module.css
│   ├── RiddimCard.tsx + .module.css
│   ├── RiddimDetail.tsx + .module.css
│   ├── RiddimExplorer.tsx + .module.css
│   ├── RiddimGrid.tsx + .module.css
│   ├── RiddimJsonLd.tsx
│   ├── ScrollToTop.tsx + .module.css
│   ├── ShareButton.tsx + .module.css
│   ├── ArtistCard.tsx + .module.css
│   ├── ArtistDetail.tsx + .module.css
│   ├── ArtistSearchBar.tsx + .module.css
│   ├── AuditDashboard.tsx + .module.css
│   ├── LoginForm.tsx + .module.css
│   ├── ProducerCard.tsx + .module.css
│   ├── ProducerDetail.tsx + .module.css
│   └── FormulaireSoumission.tsx
├── lib/
│   ├── data.ts                   # Data layer (allRiddims, getRiddimById, etc.)
│   └── i18n.ts                   # Système i18n (5 langues, 140+ clés)
├── types/
│   └── riddim.ts                 # Interfaces Riddim, Voicing, FilterState, etc.
├── data/
│   ├── riddims.json              # 152 riddims, 1253 voicings (8242 lignes)
│   ├── producers.ts              # 30 producteurs avec interface Producer
│   └── audit-report.json         # Rapport d'audit généré
├── utils/
│   ├── seo.ts                    # BASE_URL, hreflang, JSON-LD, slugs
│   ├── artists.ts                # buildArtistList, getRelatedArtists, JSON-LD
│   ├── generateContextText.ts    # Texte contextuel SEO pour riddim
│   └── performance.ts            # debounce, getInitials, hashStringToIndex, cn
├── styles/
│   ├── tokens.css                # Design tokens (couleurs, typo, espacement)
│   ├── globals.css               # Reset CSS, base styles, scrollbar
│   ├── typography.css            # Classes typographiques utilitaires
│   └── static-page.module.css    # Styles partagés pages statiques
├── scripts/
│   └── audit-voicings.js         # Script Node.js d'audit des données
├── public/
│   └── manifest.json             # PWA manifest
├── middleware.ts                  # i18n redirect, auth protection
├── _legacy/                      # Ancienne implémentation (HTML/CSS/JS)
├── package.json
├── tsconfig.json
├── next.config.mjs
├── .env.local
├── .gitignore
├── README.md
├── INTEGRATION.md
├── PRODUCTION-CHECKLIST.md
└── SEO-ADDITIONS.md
```

---

## 2. Stack technique

| Technologie | Version | Usage |
|---|---|---|
| Next.js | 14.2.0 | Framework React (App Router, SSR/SSG) |
| React | 18.3.0 | UI |
| TypeScript | strict | Typage |
| CSS Modules | — | Styles scopés par composant |
| @vercel/analytics | — | Web Analytics |
| @vercel/speed-insights | — | Core Web Vitals |
| @vercel/blob | — | Stockage persistant riddims.json |

---

## 3. Configuration

### package.json
- **Scripts**: `dev`, `build`, `start`, `lint`
- **Dependencies**: next, react, react-dom, @vercel/analytics, @vercel/speed-insights, @vercel/blob
- **DevDependencies**: typescript, @types/react, @types/node, eslint, eslint-config-next

### tsconfig.json
- Target: ES2017, Module: bundler
- Strict mode activé
- Path alias: `@/*` → `./`

### next.config.mjs
- `poweredByHeader: false`, `compress: true`
- Security headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, etc.
- Cache manifest.json: 86400s

### .env.local
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=WMC-riddim-2024!
AUTH_SECRET=<64-char hex>
BLOB_READ_WRITE_TOKEN=<vercel blob token>
DEPLOY_HOOK_URL=<vercel deploy hook URL>
```

### middleware.ts
- Redirige `/` vers `/{locale}` (détection Accept-Language)
- Protège POST `/api/riddims` (vérifie cookie `wmc-auth-token` via HMAC)
- Protège `/audit` (redirige vers `/audit/login` si non authentifié)

---

## 4. Design System (tokens.css)

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--color-bg-primary` | #0A0A0A | Fond principal |
| `--color-bg-card` | #161616 | Fond des cartes |
| `--color-brand-gold` | #F5A623 | Couleur principale (or) |
| `--color-brand-green` | #1DB954 | Reggae, Spotify |
| `--color-brand-red` | #E63946 | Lovers Rock, accents |
| `--color-text-primary` | #FFFFFF | Texte principal |
| `--color-text-secondary` | #A0A0A0 | Texte secondaire |
| `--color-text-muted` | #555555 | Texte atténué |

### Typographie
| Font | Variable | Usage |
|---|---|---|
| Dancing Script | `--font-display-script` | Accents expressifs |
| Bebas Neue | `--font-display-condensed` | Titres |
| Inter | `--font-body` | Corps de texte |

### Espacement (scale 4px)
`--space-1` (4px) → `--space-32` (128px)

### Radius
`--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (20px), `--radius-xl` (32px), `--radius-full` (9999px)

---

## 5. Système i18n

- **Langues**: fr (défaut), en, es, pt, ja
- **140+ clés** par langue dans `lib/i18n.ts`
- **Drapeaux**: 🇫🇷, 🇬🇧, 🇪🇸, 🇧🇷, 🇯🇵
- **Fonctions**: `getDictionary(locale)`, `isValidLocale(value)`
- **Interface Dictionary**: navigation, hero, filtres, footer, SEO, partage, etc.

---

## 6. Données

### riddims.json (152 riddims, 1253 voicings)
```typescript
interface Riddim {
  id: number;
  name: string;
  year: number;
  producer: string;
  label: string;
  type: string;        // "classique" | "ragga" | "digital"
  genre: string;       // "dancehall" | "reggae" | "lovers rock" | "soca"
  bpm: number;
  description: string;
  voicings: Voicing[];
}

interface Voicing {
  artist: string;
  title: string;
  views: number;
}
```

### producers.ts (30 producteurs)
```typescript
interface Producer {
  id: string;
  name: string;
  label: string;
  origin: string;
  founded: string;
  active: string;
  style: string[];
  description: string;
  notableRiddims: string[];
  keyArtists: string[];
  achievements: string[];
  riddimIds: string[];
}
```

Producteurs notables: Sly & Robbie, King Jammy, Dave Kelly, Lenky Marsden, Coxsone Dodd, Di Genius, Rvssian, Chimney Records, Daseca, Notnice, etc.

---

## 7. API Routes

### `/api/auth` (POST)
- **login**: Vérifie username/password, crée token HMAC-SHA256, set cookie httpOnly
- **logout**: Clear cookie
- **check**: Vérifie validité du token

### `/api/riddims`
- **GET**: Retourne tous les riddims depuis `@vercel/blob`
- **POST** (protégé): Actions CRUD
  - `create-riddim`: Créer un riddim
  - `add-voicing`: Ajouter un voicing
  - `edit-voicing`: Modifier un voicing
  - `delete-voicing`: Supprimer un voicing
  - `move-voicing`: Déplacer entre riddims
  - `reorder-voicing`: Réordonner dans un riddim

---

## 8. Composants clés

### Layout
- **Navbar**: Fixe, rétrécit au scroll (80→64px), burger mobile, drawer, sélecteur langue
- **Footer**: 3 colonnes liens, logo, mini stats, disclaimer, SVG triangle
- **PageWrapper**: Client, fadeIn animation, 64px padding-top

### Riddims
- **RiddimCard**: Carte avec barre accent par genre, watermark année, 3 tailles (lg/md/sm)
- **RiddimDetail**: Breadcrumb, triangles décoratifs, meta icons, voicings table, carousel similaires
- **RiddimGrid**: Bento grid 12 colonnes, skeleton loading, empty state
- **RiddimExplorer**: Wrapper FilterBar + RiddimGrid (page /riddims)
- **FilterBar**: Sticky, selects genre/décennie/producteur, search input, tri
- **RiddimJsonLd**: Injection JSON-LD serveur (MusicComposition + ItemList + BreadcrumbList)

### Artistes
- **ArtistCard**: Avatar gradient déterministe (hash), initiales, stats, pills décennies
- **ArtistDetail**: Avatar, stats, liens Spotify/YouTube, contexte, table riddims, artistes liés
- **ArtistSearchBar**: Client, search + grid 4 colonnes

### Producteurs
- **ProducerCard**: Border-left colorée par genre, label badge, description tronquée, riddim pills
- **ProducerDetail**: Breadcrumb, histoire, achievements, grille riddims matchés, artistes associés

### Utilitaires
- **Logo**: SVG 3 variantes (full/icon/horizontal), animations rotation/pulse/orbite
- **HeroSection**: Formes décoratives, badge, headline, stats, search bar
- **ScrollToTop**: Bouton fixe bas-droite, apparaît >400px
- **ShareButton**: FAB avec WhatsApp, X, Facebook, clipboard
- **AuditDashboard**: CRUD admin complet, détection doublons cross-riddim
- **LoginForm**: Formulaire auth simple
- **FormulaireSoumission**: Formulaire suggestion riddim (mailto)

---

## 9. SEO

- **Sitemap dynamique**: 5 langues × (pages statiques + 152 riddims) = 770+ URLs
- **robots.ts**: Autorise Google, Bing, GPTBot, ClaudeBot, PerplexityBot ; bloque /api/, /_next/
- **JSON-LD**: MusicComposition, ItemList, BreadcrumbList, Person/MusicGroup
- **hreflang**: Alternates pour 5 langues + x-default → en
- **Open Graph + Twitter Cards** sur toutes les pages
- **Canonical URLs** avec metadataBase

---

## 10. Sécurité

- Headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
- Auth: HMAC-SHA256 via Web Crypto API (Edge-compatible), httpOnly cookies
- Middleware: Protection API + pages admin
- `poweredByHeader: false`

---

## 11. Fichiers legacy (_legacy/)

Ancienne implémentation en HTML/CSS/JS pur :
- `index.html`, `explorer.html`, `riddim.html` — Pages HTML statiques
- `script.js`, `home.js`, `riddim.js` — JavaScript vanilla
- `i18n.js` — Ancien système i18n
- `style.css` — Styles globaux
- `manifest.json` — Ancien PWA manifest
- `assets/` — Logos (16px à 512px), favicon, og-image

---

## 12. Documentation

- **README.md**: Description originale du projet Pong (vestige initial)
- **INTEGRATION.md**: Guide d'intégration des composants (Navbar, PageWrapper, JsonLd, etc.)
- **PRODUCTION-CHECKLIST.md**: Checklist pré-déploiement (build, SEO, accessibilité, i18n, sécurité)
- **SEO-ADDITIONS.md**: Modifications SEO à apporter (metadata enrichie, headers sécurité)

---

## 13. Reproduction locale

### Prérequis
- Node.js 18+
- npm

### Installation
```bash
git clone <repo-url> Pongperso-
cd Pongperso-
npm install
```

### Variables d'environnement
Créer `.env.local` avec les variables listées en section 3.

### Développement
```bash
npm run dev
```

### Build production
```bash
npm run build
npm start
```

### Structure des pages générées
- 5 langues × pages statiques = ~50 pages
- 5 langues × 152 riddims = 760 pages riddim
- 5 langues × artistes (dynamique depuis voicings)
- 5 langues × 30 producteurs = 150 pages producteur
- Total: 1385+ pages statiques
