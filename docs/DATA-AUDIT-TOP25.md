# Audit qualité des données — Top 25 riddims (par vues)

Audit sourcé mené pendant la rédaction des fiches éditoriales « History & influence »
(objectif d3 : profondeur éditoriale sur le top 25). Chaque constat s'appuie sur des
sources web vérifiables (Wikipedia, Discogs, Riddims World, United Reggae, World A Reggae,
presse spécialisée). **Aucune donnée n'est inventée** ; les points incertains sont
signalés comme tels.

## État final

| Catégorie | Riddims | Statut |
| :--- | :--- | :--- |
| ✅ Fiche éditoriale rédigée (22 riddims) | #1, #2, #4, #6, #7, #8, #10, #11, #12, #13, #20, #21, #23, #27, #34, #42, #47, #52, #73, #75, #86, #115 | En ligne (PR #16) |
| 🧹 Voicings nettoyés (vraies vues sourcées) | #20 Juice, #7 Punaany, #6 Coolie Dance | Fait |
| 🗑️ Entrées factices retirées du catalogue | #18 Head Concussion, #16 Love Bump, #9 Diseases | Fait (152 → 149 riddims) |

## Corrections de métadonnées appliquées (sourcées)

Appliquées au *seed* `data/riddims.json`. **Rappel : le site live lit le Blob Vercel,
pas le seed** — il faut donc rejouer ces corrections en live via l'admin
« ✎ Métadonnées » après merge.

| Riddim | Champ | Avant | Après | Source |
| :--- | :--- | :--- | :--- | :--- |
| #2 Bam Bam | année | 1982 | 1992 | Build dancehall Sly & Robbie/Taxi (« Murder She Wrote ») ; 1982 = confusion avec Stalag. |
| #27 Overproof | label | JA Productions / Full Strength | JA Productions | « Full Strength » = sous-titre de la sortie, pas un label. |
| #34 Tropical Escape | année | 2013 | 2012 | Promo complète parue en décembre 2012 (Chimney Records). |
| #73 Nobody Has To Know | année | 2014 | 2013 | Sortie originale 2013 (remix Ty Dolla $ign/Atlantic = 2015). |
| #115 Soul Survivor | producteur | Tru Ambassador Entertainment | Jahvel Morrison | Le champ contenait le label. |
| #47 Lost Angel | producteur | So Unique Records | Elvis Redwood | Le champ contenait le label. |

## 🧹 Voicings nettoyés

Ces riddims sont réels, mais le seed listait des titres appartenant à **d'autres** riddims.
Voicings remplacés par les vrais cuts sourcés, avec des vues **réelles** relevées sur le
compteur YouTube (approximatives, arrondies — septembre 2026). Conséquence assumée : le
total de vues chute fortement, donc le classement de ces riddims baisse (les gros chiffres
d'avant provenaient de titres célèbres mal rattachés).

### #20 Juice (Richard « Shams » Browne, 2001) — total ~1,83 M
T.O.K « Shake Yuh Bam Bam » (600K) · Mr. Vegas « Go Up » (550K) · T.O.K & Bounty Killer
« Man Ah Bad Man » (290K) · Mad Cobra « Anything » (270K) · Elephant Man « Behave » (85K) ·
Beenie Man « My Wish » (31K).

### #7 Punaany (King Jammy / Steely & Clevie, 1986) — total ~0,81 M
Admiral Bailey « Punaany » (600K) · Shabba Ranks « Needle Eye Pum-Pum » (211K) · Cocoa Tea
« Sonia Come Back » (0) · Beenie Man « Roll Deep » (0) · Lady Saw « It's All About The
Money » (0).
**⚠️ Vues = 0 → non récupérées** (YouTube a throttlé la recherche). Ce sont de vrais cuts
Punaany ; les chiffres restent à compléter en live via l'admin.

### #6 Coolie Dance (Cordell « Scatta » Burrell, 2003) — total ~2,69 M
Sean Paul « Feel Alright » (1,89M) · Vybz Kartel « Please » (634K) · Bounty Killer « Yuh
Gawn » (109K) · Elephant Man « Head Gone » (33K) · Beenie Man « Good Ohh » (13K) · Kiprich
« Dat Man » (7K).

## 🗑️ Entrées factices retirées

- **#18 Head Concussion** — « Head Concussion Records » est le *label* de Rvssian, pas un
  riddim ; les 4 titres venaient de 4 productions non liées.
- **#16 Love Bump** — aucun riddim Penthouse/Germain 2007 vérifiable ; les 4 voicings
  appartenaient chacun à un riddim différent (Drop Leaf, Sacrifice, Nylon, I Feel Good).
- **#9 Diseases** — attribution McGregor/Big Ship/2006 invérifiable ; le vrai « Diseases »
  est le tube de Michigan & Smiley (Junjo Lawes / Roots Radics, Volcano, 1982) sur la
  famille Mad Mad. Les voicings listés (Kartel « Emergency » = Siren ; Mavado « Weh Dem A
  Do » = Red Bull & Guinness) ne rattachaient à aucun riddim Diseases.

> Piste pour plus tard : #9 Diseases et #18 Head Concussion pourraient être **recréés** en
> vrais riddims (Michigan & Smiley/Junjo Lawes ; un vrai riddim Rvssian) plutôt que
> simplement retirés, si l'on veut regonfler le catalogue avec des entrées correctes.

## Note transverse

L'audit a révélé un **problème systémique de rattachement des voicings** : des titres
célèbres attribués au mauvais rythme gonflaient artificiellement certains riddims. Le
nettoyage du top a corrigé les cas les plus visibles ; une passe plus large (avec une
source de vues fiable) renforcerait encore la crédibilité du catalogue avant la migration
de domaine.
