# Audit qualité des données — Top 25 riddims (par vues)

Audit sourcé mené pendant la rédaction des fiches éditoriales « History & influence »
(objectif d3 : profondeur éditoriale sur le top 25). Chaque constat ci-dessous s'appuie
sur des sources web vérifiables (Wikipedia, Discogs, Riddims World, United Reggae,
World A Reggae, presse spécialisée). **Aucune donnée n'est inventée** ; les points
incertains sont signalés comme tels.

## Résumé

| Catégorie | Riddims | Décision |
| :--- | :--- | :--- |
| ✅ Propre (métadonnées + voicings vérifiés) | #1, #4, #8, #10, #11, #12, #13, #21, #23, #27, #34, #42, #47, #52, #73, #75, #86, #115, + #2 (voix phare correcte) | Fiche éditoriale rédigée |
| ⚠️ Riddim réel, mais **voicings mal attribués** | #20 Juice, #7 Punaany, #6 Coolie Dance | Éditorial **en attente** — nettoyer les voicings d'abord |
| ⛔ Entrée **factice / à corriger** (pas un vrai riddim) | #18 Head Concussion, #16 Love Bump, #9 Diseases | **Ne pas éditorialiser** — décision utilisateur (retrait/reconstruction) |

## Corrections de métadonnées appliquées (sourcées)

Appliquées au *seed* `data/riddims.json`. **Rappel : le site live lit le Blob Vercel,
pas le seed** — il faut donc rejouer ces corrections en live via l'admin
« ✎ Métadonnées » après merge.

| Riddim | Champ | Avant | Après | Source |
| :--- | :--- | :--- | :--- | :--- |
| #2 Bam Bam | année | 1982 | 1992 | Le riddim dancehall « Bam Bam/Murder She Wrote » est un build Sly & Robbie/Taxi (~1992) ; 1982 = confusion avec Stalag (Sister Nancy). |
| #27 Overproof | label | JA Productions / Full Strength | JA Productions | « Full Strength » est le sous-titre de la sortie, pas un label. |
| #34 Tropical Escape | année | 2013 | 2012 | Promo complète parue en décembre 2012 (Chimney Records). |
| #73 Nobody Has To Know | année | 2014 | 2013 | Sortie originale 2013 (le remix Ty Dolla $ign/Atlantic est de 2015). |
| #115 Soul Survivor | producteur | Tru Ambassador Entertainment | Jahvel Morrison | Le champ contenait le label ; producteur = Jahvel Morrison (« Jahvy Ambassador »). |
| #47 Lost Angel | producteur | So Unique Records | Elvis Redwood | Le champ contenait le label ; producteur = Elvis Redwood. |

## ⚠️ Voicings mal attribués (à nettoyer)

Ces riddims sont **réels et importants**, mais la liste de voicings du seed contient des
titres qui appartiennent à **d'autres** riddims. Corriger les voicings modifie les vues et
donc le classement — **décision utilisateur requise** (pas de données de vues fiables pour
les vrais titres). Fiche éditoriale volontairement **différée** pour éviter une
contradiction visible sur la page.

### #20 Juice (Richard « Shams » Browne, 2001) — métadonnées OK
Les 4 voicings listés appartiennent à d'autres riddims :
- Beenie Man « Who Am I (Sim Simma) » → **Playground** (Jeremy Harding, 1997)
- Mr. Vegas « Heads High » → **Filthy** (Danny Browne, 1998)
- Buju Banton « Champion » → **Champion** (Donovan Germain, ~1994)
- Bounty Killer « It's a Party » → production Refugee Camp (Wyclef, 1998), pas un riddim JA
- **Vrais cuts Juice :** T.O.K « Shake Yuh Bam Bam », Beenie Man « My Wish », Mr. Vegas « Go Up », Elephant Man « Behave ».

### #7 Punaany (King Jammy, 1986 ; construit par Steely & Clevie) — métadonnées OK
Les 4 voicings listés n'appartiennent **pas** à Punaany :
- Shabba Ranks « Ting-A-Ling » → Bobby Digital, 1992
- Beenie Man « Slam » → **Arab Attack** (Dave Kelly, 1995)
- Buju Banton « Batty Rider » → **Bogle** (Dave Kelly, 1992)
- Bounty Killer « Down in the Ghetto » → **Shank I Shek** (même producteur, autre riddim)
- **Vrais cuts Punaany :** Admiral Bailey « Punaany » (l'hymne), Shabba Ranks « Needle Eye Pum-Pum », Cocoa Tea « Sonia ».

### #6 Coolie Dance (Cordell « Scatta » Burrell, 2003) — métadonnées OK
Les 4 voicings listés appartiennent à d'autres riddims :
- Sean Paul « Never Gonna Be the Same » → **Seasons** (Don Corleon). Son cut Coolie Dance = « Feel Alright ».
- Elephant Man « Willie Bounce » → **Willie Bounce** riddim. Son cut Coolie Dance = « Head Gone ».
- Vybz Kartel « Most Wanted » → compilation 2009. Son cut Coolie Dance = « Please ».
- Busy Signal « Step Out » → **Step Out** riddim (2005 ; Busy débute après 2003).
- **Vrais cuts Coolie Dance :** Beenie Man, Bounty Killer, Kiprich, Elephant Man « Head Gone », Vybz Kartel « Please », Sean Paul « Feel Alright ».

## ⛔ Entrées factices / à corriger

### #18 Head Concussion — **pas un riddim** (c'est un label)
« Head Concussion Records » est le label de Rvssian, pas un riddim. Les 4 titres listés
proviennent de 4 productions non liées (Konshens « Gal a Bubble » = Subkonshus ; Sean Paul
« Other Side of Love » = pop, Benny Blanco/The Cataracs). **Recommandation : retirer ou
remplacer** par un vrai riddim Rvssian (ex. Boom, Whine & Kotch, Remedy).

### #16 Love Bump — **conflation synthétique**
Aucun riddim « Love Bump » Penthouse/Donovan Germain 2007 vérifiable. Les 4 voicings
appartiennent chacun à un riddim différent : Jah Cure « Longing For » → **Drop Leaf** ;
Alaine « Sacrifice » → **Sacrifice** (Don Corleon) ; Tarrus Riley « Start Anew » → **Nylon** ;
Beres Hammond « I Feel Good » → **I Feel Good** (VP, 2009). **Recommandation : retirer ou
reconstruire.**

### #9 Diseases — attribution invérifiable
L'entrée (Stephen « Di Genius » McGregor / Big Ship / 2006) **n'a pas pu être vérifiée**.
Le vrai « Diseases » est le tube de Michigan & Smiley (Henry « Junjo » Lawes / Roots Radics,
Volcano, 1982), sur la famille de riddims **Mad Mad / Golden Hen**. Les voicings listés
n'appartiennent pas à un riddim Diseases : Vybz Kartel « Emergency » → **Siren** (2005) ;
Mavado « Weh Dem A Do » → **Red Bull & Guinness** (2006). **Recommandation : corriger vers
l'original Michigan & Smiley/Junjo Lawes, ou retirer.**

## Note transverse

L'audit révèle un **problème systémique de rattachement des voicings** au-delà de ces
entrées : plusieurs riddims du top affichent des titres célèbres qui appartiennent en fait
à d'autres rythmes. Un passage de nettoyage des voicings (avec une source de vues fiable)
renforcerait nettement la crédibilité du catalogue avant la migration de domaine.
