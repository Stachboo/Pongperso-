# World Music Contest — Riddim Database

La référence des riddims jamaïcains : une base de données interactive recensant les riddims les plus emblématiques du dancehall, du reggae et du lovers rock, avec leurs voicings et leurs statistiques de streaming.

**44 riddims · 441 voicings · ~4,9 milliards de vues cumulées · de 1967 à 2016**

## Fonctionnalités

- **Catalogue explorable** : recherche plein texte (riddim, producteur, label, artiste, titre) avec surlignage des résultats
- **Filtres** : par genre (reggae, dancehall, lovers rock), type (classique, ragga, digital) et décennie (1960s–2010s)
- **Tri** : par vues totales, nom, année ou nombre de voicings
- **Fiches riddim** : description, producteur, label, BPM, et classement des voicings par popularité avec lien d'écoute YouTube
- **Multilingue** : français, anglais, espagnol, portugais, japonais (détection automatique de la langue du navigateur)
- **PWA** : installable sur mobile (manifest + icônes)
- **Partage** : bouton flottant WhatsApp, X, Facebook et copie de lien

## Structure du projet

```
├── index.html          # Redirection vers la langue du navigateur
├── fr/ en/ es/ pt/ ja/ # Pages par langue : index, explorer, riddim
├── data/riddims.json   # La base de données des riddims
├── i18n.js             # Traductions + détection de langue + partage
├── utils.js            # Fonctions partagées (formatage, traduction des tags…)
├── home.js             # Logique de la page d'accueil
├── script.js           # Logique du catalogue (recherche, filtres, tri)
├── riddim.js           # Logique des fiches riddim
├── style.css           # Thème sombre or/noir, responsive
├── sitemap.xml         # Plan du site (toutes langues + fiches riddim)
└── assets/             # Logo, favicons, image Open Graph
```

Site 100 % statique, sans framework ni build : HTML, CSS et JavaScript vanilla.

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

(Un serveur local est nécessaire car les données sont chargées via `fetch`.)

## Données

Chaque riddim dans `data/riddims.json` contient : `id`, `name`, `year`, `producer`, `label`, `type`, `genre`, `bpm`, `description` et la liste des `voicings` (`artist`, `title`, `views`). Les vues sont approximatives et proviennent des principales plateformes de streaming.

## Licence

Ce projet est publié sous licence MIT — voir le fichier [LICENSE](LICENSE).
