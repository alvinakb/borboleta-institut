# Borboleta Institut : photos attendues

Liste de toutes les photos prévues sur le site. En attendant, chaque emplacement affiche un aplat `--fond-alt` (ou `--espresso` voilé pour les grands visuels sombres) avec le papillon du logo en filigrane. Aucun nom de fichier n’est visible à l’écran : le chemin attendu est noté dans l’attribut `data-photo` de l’emplacement (composant `src/app/shared/emplacement-image`).

## Consignes (docs/DESIGN-SYSTEM.md, partie 6)

- **Ce que l’on montre** : des mains, des gestes, des soins, des serviettes blanches, une lumière naturelle et douce, des tons chauds (nude rosé, brun), comme sur l’Instagram @borboletainstitut.
- **Jamais le visage de Mariline.** Pour les clientes ou stagiaires photographiées : accord écrit, visage hors cadre ou de dos de préférence.
- **Pas de banque d’images générique.**
- **Formats** : AVIF ou WebP, avec repli JPG. Exporter chaque photo en 480, 960 et 1600 px de large (`srcset`), avec le même nom suivi de la largeur : `accueil-hero-480.webp`, `accueil-hero-960.webp`, `accueil-hero-1600.webp`, `accueil-hero-1600.jpg`.
- **Chargement** : `loading="lazy"` partout sauf l’image du haut de page (grand visuel), qui reçoit `fetchpriority="high"`.
- **Dimensions** : toujours indiquer `width` et `height` (ou le ratio) pour éviter les sauts de mise en page.
- **Contraste** : sur les grands visuels sombres, le texte reste posé sur un voile sombre (déjà prévu dans l’emplacement) ; sur les colonnes de soins, il reste dans le panneau clair.
- **Poids visé** : moins de 200 ko pour la version 1600 px en WebP, moins de 120 ko pour les vignettes.
- Les fichiers vont dans `src/assets/images/` (publiés sous `assets/images/`).

## Photos en place sur le site (passe 1)

| Fichier | Page | Emplacement | Format conseillé | Ce qu’elle doit montrer |
|---|---|---|---|---|
| `assets/images/accueil-hero.jpg` | Accueil | Grand visuel plein écran (sous le titre « Drainage lymphatique à Draveil ») | Paysage 16:9 (1600 × 900) et recadrage portrait 9:16 pour mobile ; sujet centré, zone calme au centre pour le texte | Mains en plein drainage sur une jambe ou un dos, serviette blanche, lumière douce. Image du haut : pas de lazy. |
| `assets/images/accueil-soin-drainage-renata-franca.jpg` | Accueil | Colonne « Drainage Renata França » | Portrait haut 1:2 à 1:3 (800 × 1800), sujet dans le tiers haut (le bas est couvert par le panneau du nom) | Mains, geste de pompage sur la jambe |
| `assets/images/accueil-soin-miracle-face.jpg` | Accueil | Colonne « Miracle Face » | Portrait haut 1:2 à 1:3 | Mains sur le visage d’une cliente (pas Mariline), cadrage serré sur les mains |
| `assets/images/accueil-soin-remodelage.jpg` | Accueil | Colonne « Remodelage » | Portrait haut 1:2 à 1:3 | Geste de remodelage (palper rouler) sur la cuisse ou le ventre |
| `assets/images/accueil-soin-kobido.jpg` | Accueil | Colonne « Kobido » | Portrait haut 1:2 à 1:3 | Mains en geste de Kobido, lumière tamisée |
| `assets/images/accueil-soin-radiofrequence.jpg` | Accueil | Colonne « Radiofréquence » | Portrait haut 1:2 à 1:3 | Appareil Bloomea en cours de soin, détail de la main et de la pièce à main |
| `assets/images/accueil-soin-post-operatoire.jpg` | Accueil | Colonne « Post-opératoire » | Portrait haut 1:2 à 1:3 | Mains douces sur l’abdomen, ambiance calme et rassurante (aucune cicatrice visible) |
| `assets/images/accueil-soin-femme-enceinte.jpg` | Accueil | Colonne « Femme enceinte » | Portrait haut 1:2 à 1:3 | Mains posées sur un ventre arrondi, serviette blanche |
| `assets/images/accueil-institut.jpg` | Accueil | Bloc « L’institut à Draveil » | Paysage 4:3 (1600 × 1200) | La cabine : table de soin, linge blanc, lumière naturelle |
| `assets/images/accueil-formation.jpg` | Accueil | Bloc « Centre de formation » | Paysage 4:3 | Mains d’une stagiaire guidées par celles de la formatrice (visage hors cadre) |
| `assets/images/accueil-carte-cadeau.jpg` | Accueil | Bloc « Les cartes cadeaux » | Paysage 3:2 (1600 × 1067) | Carte cadeau Borboleta posée sur une serviette ou un plateau, détail doré |
| `assets/images/instagram-1.jpg` à `instagram-4.jpg` | Accueil | Aperçu Instagram (4 vignettes) | Carré 1:1 (960 × 960) | Quatre publications récentes du compte, choisies parmi les plus représentatives |
| `assets/images/soin-<id>.jpg` | Soins (cartes) | Image de chaque carte de soin | Paysage 4:3 (960 × 720) | Le geste propre à chaque soin. Une photo par identifiant de `contenu/tarifs.json` : `offres-decouverte`, `drainage-renata-franca`, `miracle-face`, `remodelage`, `rouleau-bresilien`, `visage-lcp`, `kobido`, `radiofrequence`, `pressotherapie`, `post-operatoire`, `dr-vodder`, `femme-enceinte`, `cures` |
| `assets/images/institut-cabine.jpg` | L’institut | Bloc « Le drainage et le remodelage » | Paysage 4:3 | La cabine, vue d’ensemble, lumière douce |
| `assets/images/cartes-cadeaux.jpg` | Cartes cadeaux | Bloc principal | Paysage 4:3 | Carte cadeau en main ou dans son enveloppe |
| `assets/images/formation-<id>.jpg` | Nos formations | Image de chaque formation | Paysage 4:3 | Une photo par formation : `drainage-corps`, `drainage-visage`, `remodelage`, `post-operatoire`, `kobido` ; pratique en binôme, mains et gestes |
| `assets/images/formatrice-mains.jpg` | La formatrice | Bloc « Sa pédagogie » | Paysage 4:3 | Les mains de Mariline pendant une démonstration, jamais son visage |

## Photos prévues pour la passe 2

| Fichier | Page | Emplacement | Format conseillé | Ce qu’elle doit montrer |
|---|---|---|---|---|
| `assets/images/soin-<id>-hero.jpg` | Pages de soin `/soins/<id>` | Grand visuel plein écran | Paysage 16:9 + recadrage portrait 9:16 | Le soin en cours, cadrage large sur les mains. Pour `drainage-renata-franca`, `miracle-face`, `remodelage`, `kobido`, `radiofrequence`, `post-operatoire`, `femme-enceinte` |
| `assets/images/soin-<id>-deroule.jpg` | Pages de soin | Bloc « Déroulé d’une séance » | Paysage 4:3 | Un détail du geste ou de la préparation (huile, serviettes) |
| `assets/images/formation-hero.jpg` | Centre de formation | En-tête plein écran sombre | Paysage 16:9 + portrait 9:16 | Salle de formation, tables de soin, binômes en pratique, lumière douce |
| `assets/images/formation-pedagogie.jpg` | Centre de formation | Bloc « Une pédagogie pensée pour apprendre avec ses mains » | Paysage 4:3 | Correction du geste en direct, mains de la formatrice sur celles d’une stagiaire |
| `assets/images/formation-journee-theorie.jpg` | Centre de formation | « Une journée de formation », étape 1 | Paysage 3:2 | Support de cours, planche d’anatomie, carnet |
| `assets/images/formation-journee-pratique.jpg` | Centre de formation | « Une journée de formation », étape 2 | Paysage 3:2 | Pratique en binôme sur table |
| `assets/images/formation-journee-attestation.jpg` | Centre de formation | « Une journée de formation », étape 3 | Paysage 3:2 | Attestation de fin de formation posée sur la table (sans nom lisible) |
| `assets/images/formatrice-portrait-mains.jpg` | Centre de formation | Bloc « La formatrice » | Portrait 4:5 | Mains de Mariline, ou le logo sur fond espresso à défaut |
| `assets/images/contact-facade.jpg` | Contact | À côté des infos pratiques | Paysage 4:3 | Entrée de l’institut, plaque, sans passants reconnaissables |

## Logos et fichiers graphiques (déjà en place)

| Fichier | Usage |
|---|---|
| `public/images/logo-borboleta-horizontal.png` | En-tête : papillon et nom côte à côte, version resserrée tirée du logo d’origine (668 × 132, affichée à 36 px sur mobile et 44 px sur ordinateur) |
| `public/images/logo-borboleta-clair.png` | Pied de page sur fond espresso |
| `public/images/papillon.png` | Filigrane des emplacements photo (papillon du logo, transparent) |
| Logo Qualiopi officiel | À fournir par Mariline : à placer dans la bande confiance de l’accueil et sur la page Financement. Ne pas utiliser de logo redessiné. |
