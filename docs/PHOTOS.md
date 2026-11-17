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
| `assets/images/soin-<id>.jpg` | Soins (cartes de la page `/soins`) | Image de chaque carte de soin | Paysage 4:3 (960 × 720) | Le geste propre à chaque soin. Une photo par identifiant de `contenu/tarifs.json` : `offres-decouverte`, `drainage-renata-franca`, `miracle-face`, `remodelage`, `rouleau-bresilien`, `visage-lcp`, `kobido`, `radiofrequence`, `pressotherapie`, `post-operatoire`, `dr-vodder`, `femme-enceinte`, `cures` |

## Photos ajoutées en passe 2

### Pages de soin `/soins/<id>` (une page par soin, onze pages)

Chaque page a deux photos : le grand visuel du haut et la photo du bloc « En quoi consiste ce soin ? ». Le bandeau « Découvrir les autres soins » en bas de page réutilise les photos des colonnes de l’accueil (`accueil-soin-<id>.jpg`).

| Fichier | Page | Emplacement | Format conseillé | Ce qu’elle doit montrer |
|---|---|---|---|---|
| `assets/images/soin-drainage-renata-franca-hero.jpg` | `/soins/drainage-renata-franca` | Grand visuel plein écran (Drainage lymphatique méthode Renata França) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains en geste de pompage sur la jambe, serviette blanche. Image du haut : pas de lazy. |
| `assets/images/soin-drainage-renata-franca-deroule.jpg` | `/soins/drainage-renata-franca` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Huile et serviettes prêtes sur la table, ou détail des mains sur le mollet |
| `assets/images/soin-miracle-face-hero.jpg` | `/soins/miracle-face` | Grand visuel plein écran (Miracle Face) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains sur le visage d’une cliente (pas Mariline), cadrage serré sur les mains. Image du haut : pas de lazy. |
| `assets/images/soin-miracle-face-deroule.jpg` | `/soins/miracle-face` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Détail des doigts le long de la mâchoire |
| `assets/images/soin-remodelage-hero.jpg` | `/soins/remodelage` | Grand visuel plein écran (Remodelage) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Geste de palper rouler sur la cuisse. Image du haut : pas de lazy. |
| `assets/images/soin-remodelage-deroule.jpg` | `/soins/remodelage` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Détail des mains en pincement ou en glissement |
| `assets/images/soin-rouleau-bresilien-hero.jpg` | `/soins/rouleau-bresilien` | Grand visuel plein écran (Rouleau brésilien) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Le rouleau en bois en cours de soin sur la cuisse ou le bras. Image du haut : pas de lazy. |
| `assets/images/soin-rouleau-bresilien-deroule.jpg` | `/soins/rouleau-bresilien` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Le rouleau posé sur une serviette blanche |
| `assets/images/soin-visage-lcp-hero.jpg` | `/soins/visage-lcp` | Grand visuel plein écran (Soins du visage LCP) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Soin du visage en cours, produits LCP en arrière-plan. Image du haut : pas de lazy. |
| `assets/images/soin-visage-lcp-deroule.jpg` | `/soins/visage-lcp` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Les produits LCP alignés, lumière douce |
| `assets/images/soin-kobido-hero.jpg` | `/soins/kobido` | Grand visuel plein écran (Kobido) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains en geste de Kobido sur le visage, lumière tamisée. Image du haut : pas de lazy. |
| `assets/images/soin-kobido-deroule.jpg` | `/soins/kobido` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Détail de la digitopression |
| `assets/images/soin-radiofrequence-hero.jpg` | `/soins/radiofrequence` | Grand visuel plein écran (Radiofréquence Bloomea) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Appareil Bloomea en cours de soin, main et pièce à main. Image du haut : pas de lazy. |
| `assets/images/soin-radiofrequence-deroule.jpg` | `/soins/radiofrequence` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | L’appareil Bloomea seul, dans la cabine |
| `assets/images/soin-pressotherapie-hero.jpg` | `/soins/pressotherapie` | Grand visuel plein écran (Pressothérapie) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Les bottes de pression en place sur les jambes, cliente allongée (visage hors cadre). Image du haut : pas de lazy. |
| `assets/images/soin-pressotherapie-deroule.jpg` | `/soins/pressotherapie` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Détail des bottes et de l’appareil |
| `assets/images/soin-post-operatoire-hero.jpg` | `/soins/post-operatoire` | Grand visuel plein écran (Post-opératoire) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains douces sur l’abdomen, ambiance calme (aucune cicatrice visible). Image du haut : pas de lazy. |
| `assets/images/soin-post-operatoire-deroule.jpg` | `/soins/post-operatoire` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Mains posées à plat, geste lent |
| `assets/images/soin-dr-vodder-hero.jpg` | `/soins/dr-vodder` | Grand visuel plein écran (Méthode Dr Vodder) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains en drainage manuel sur une zone (nuque ou bras). Image du haut : pas de lazy. |
| `assets/images/soin-dr-vodder-deroule.jpg` | `/soins/dr-vodder` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Détail d’un geste circulaire sur la peau |
| `assets/images/soin-femme-enceinte-hero.jpg` | `/soins/femme-enceinte` | Grand visuel plein écran (Femme enceinte) | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains posées sur un ventre arrondi, serviette blanche. Image du haut : pas de lazy. |
| `assets/images/soin-femme-enceinte-deroule.jpg` | `/soins/femme-enceinte` | Bloc « En quoi consiste ce soin ? » | Paysage 4:3 (1600 × 1200) | Jambes drainées en position confortable, coussins |

### Page Centre de formation `/formations`

| Fichier | Page | Emplacement | Format conseillé | Ce qu’elle doit montrer |
|---|---|---|---|---|
| `assets/images/formation-hero.jpg` | Centre de formation | 1. En-tête plein écran sombre (sous le titre « Le drainage lymphatique, transmis avec soin ») | Paysage 16:9 + portrait 9:16 | Salle de formation, tables de soin, binômes en pratique, lumière douce. Image du haut : pas de lazy. |
| `assets/images/formation-pedagogie.jpg` | Centre de formation | 3. Bloc « Une pédagogie pensée pour apprendre avec ses mains » | Paysage 4:3 | Correction du geste en direct : mains de la formatrice sur celles d’une stagiaire (visages hors cadre) |
| `assets/images/formation-journee-theorie.jpg` | Centre de formation | 4. Journée de formation, étape 1 | Paysage 3:2 | Support de cours, planche d’anatomie, carnet |
| `assets/images/formation-journee-pratique.jpg` | Centre de formation | 4. Journée de formation, étape 2 | Paysage 3:2 | Pratique en binôme sur table |
| `assets/images/formation-journee-attestation.jpg` | Centre de formation | 4. Journée de formation, étape 3 | Paysage 3:2 | Attestation de fin de formation posée sur la table (sans nom lisible) |
| `assets/images/formation-drainage-corps.jpg` | Centre de formation | 5. Parcours, carte Niveau 1 | Paysage 4:3 | Pratique du drainage corps en binôme, mains sur la jambe |
| `assets/images/formation-drainage-visage.jpg` | Centre de formation | 5. Parcours, carte Niveau 2 | Paysage 4:3 | Pratique du drainage visage en binôme |
| `assets/images/formation-remodelage.jpg` | Centre de formation | 5. Parcours, carte Niveau 2 | Paysage 4:3 | Geste de remodelage enseigné sur table |
| `assets/images/formation-post-operatoire.jpg` | Centre de formation | 5. Parcours, carte Niveau 3 | Paysage 4:3 | Démonstration d’un geste doux sur l’abdomen (aucune cicatrice visible) |
| `assets/images/formation-kobido.jpg` | Centre de formation | 5. Parcours, carte En complément | Paysage 4:3 | Geste de Kobido enseigné, mains sur le visage |
| `assets/images/formatrice-portrait-mains.jpg` | Centre de formation | 7. Bloc « Votre formatrice » | Portrait 4:5 (1200 × 1500) | Les mains de Mariline, jamais son visage ; à défaut, le logo sur fond espresso |

## Pages de l’institut et du centre de formation (message 3)

Chaque page de contenu s’ouvre sur un grand visuel plein écran sombre : le texte est posé sur un voile, il reste lisible quelle que soit la photo. Image du haut : pas de lazy, `fetchpriority="high"`.

| Fichier | Page | Emplacement | Format conseillé | Ce qu’elle doit montrer |
|---|---|---|---|---|
| `assets/images/institut-hero.jpg` | `/institut` | Grand visuel plein écran (« Borboleta, prendre soin autrement ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | L’ambiance de l’institut : linge blanc, lumière douce, mains posées sur une serviette |
| `assets/images/institut-cabine.jpg` | `/institut` | Bloc « Le drainage et le remodelage » | Paysage 4:3 (1600 × 1200) | La cabine, vue d’ensemble, lumière douce |
| `assets/images/soins-hero.jpg` | `/soins` | Grand visuel plein écran (« Nos soins à Draveil ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Mains en plein geste de drainage, serviette blanche |
| `assets/images/cartes-cadeaux-hero.jpg` | `/cartes-cadeaux` | Grand visuel plein écran (« Les cartes cadeaux ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Cartes cadeaux et enveloppes sur un plateau, détail doré, tons nude |
| `assets/images/cartes-cadeaux.jpg` | `/cartes-cadeaux` | Bloc « Un moment de bien-être à offrir » | Paysage 4:3 (1600 × 1200) | Carte cadeau en main ou dans son enveloppe |
| `assets/images/avis-hero.jpg` | `/avis` | Grand visuel plein écran (« Une note de 5 sur 5 ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Une cliente détendue après le soin, de dos ou visage hors cadre (accord écrit), ou un détail de la cabine |
| `assets/images/parcours-hero.jpg` | `/parcours` | Grand visuel plein écran (« Le parcours et le déroulement ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Une table de formation préparée : supports de cours, huiles, serviettes |
| `assets/images/formatrice-hero.jpg` | `/formatrice` | Grand visuel plein écran (« Da Costa Mariline, praticienne et formatrice ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Les mains de Mariline en geste de drainage, **jamais son visage** |
| `assets/images/formatrice-mains.jpg` | `/formatrice` | Bloc « Montrer, faire faire, corriger » | Paysage 4:3 (1600 × 1200) | Les mains de Mariline pendant une démonstration, jamais son visage |
| `assets/images/financement-hero.jpg` | `/financement` | Grand visuel plein écran (« Une formation finançable ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Une stagiaire prend des notes à côté de la table de soin (visage hors cadre) |
| `assets/images/calendrier-hero.jpg` | `/calendrier` | Grand visuel plein écran (« Calendrier des sessions ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | La salle de formation prête à accueillir un groupe |
| `assets/images/inscription-hero.jpg` | `/inscription` | Grand visuel plein écran (« S’inscrire à une formation ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Binôme de stagiaires en pratique, mains sur la jambe |
| `assets/images/contact-facade.jpg` | `/contact` | Grand visuel plein écran (« Venez nous rencontrer ») | Paysage 16:9 (1600 × 900) + recadrage portrait 9:16 pour mobile, zone calme au centre pour le texte | Entrée de l’institut, plaque, sans passants reconnaissables |

## Logos et fichiers graphiques (déjà en place)

| Fichier | Usage |
|---|---|
| `public/images/logo-borboleta-horizontal.png` | En-tête : papillon et nom côte à côte, version resserrée tirée du logo d’origine (668 × 132, affichée à 36 px sur mobile et 44 px sur ordinateur) |
| `public/images/logo-borboleta-clair.png` | Pied de page sur fond espresso |
| `public/images/papillon.png` | Filigrane des emplacements photo (papillon du logo, transparent) |
| Logo Qualiopi officiel | À fournir par Mariline : à placer dans la bande confiance de l’accueil et sur la page Financement. Ne pas utiliser de logo redessiné. |

## Logo Qualiopi (à fournir par Mariline)

| Fichier | Où | Consigne |
|---|---|---|
| `public/images/qualiopi.png` | Bandeau confiance de l’accueil et page Financement (fonds clairs uniquement) | Logo officiel Qualiopi tel que remis avec le certificat (environ 480 px de large). Il suffit de déposer le fichier puis de relancer `npm run build` : il s’affiche automatiquement, sans cadre, à côté de la mention « actions de formation ». Tant qu’il manque, seule la mention est affichée. Le pied de page sombre n’affiche jamais le logo, seulement le texte « Centre de formation certifié Qualiopi » et la mention. |
