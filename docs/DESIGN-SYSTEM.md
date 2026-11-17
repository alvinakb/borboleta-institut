# Borboleta Institut : système de design

Référence pour tout le site. Toute décision visuelle doit pouvoir se justifier par ce document. Objectif : un site d'institut haut de gamme mais accessible, qui inspire confiance et fait réserver, pas un « template luxe ».

## 1. Principes

1. **Une page, un objectif.** Chaque page pousse une seule action principale : réserver un soin (Planity) ou demander une formation. Une seule action principale par section, l'autre en lien secondaire discret.
2. **La retenue fait le professionnalisme.** Peu d'effets, beaucoup d'espace, une hiérarchie nette. Pas de décor gratuit : pas de séparateurs dorés sous chaque titre, pas de mot en italique coloré, pas de capitales espacées partout, pas d'étoiles décoratives hors du bloc avis.
3. **Le contenu d'abord.** Les prix, les durées, l'adresse et les horaires se lisent en 3 secondes.
4. **Cohérence avec l'Instagram de Mariline** : tons nude rosé, brun espresso, photos de mains et de soins en lumière douce.
5. **Mobile d'abord.** La majorité des clientes arrivent par Instagram, donc sur téléphone.

## 2. Couleurs (tokens CSS)

```css
:root {
  --fond: #FBF7F4;          /* fond principal, presque blanc chaud */
  --fond-alt: #F4E9E1;      /* sections alternées */
  --nude: #EBD3C4;          /* aplats, boutons secondaires, survols */
  --taupe: #A38B7E;         /* décor uniquement (bordures, icônes) : jamais pour du texte */
  --brun: #7A513F;          /* liens, prix, petits titres : contraste 5,7 sur --fond-alt */
  --espresso: #2A211C;      /* texte principal, fonds sombres, bouton principal */
  --texte-doux: #5C4B43;    /* paragraphes secondaires */
  --ligne: #E6D6CB;         /* bordures fines */
  --or: #C8A160;            /* logo et un seul détail par écran maximum */
  --succes: #3F6B4F;
  --erreur: #A23B2E;
}
```

Règles :
- Texte courant : `--espresso` sur `--fond` ou `--fond-alt`. Jamais de texte en `--taupe` ni en `--or`.
- Bouton principal : fond `--espresso`, texte `--fond`. Bouton secondaire : contour `--espresso`, fond transparent. Sur fond sombre, inverser.
- Fonds sombres (`--espresso`) : utilisés comme sur le site Spa Renata França, pour l'en-tête des pages Formation, la bande des piliers et l'appel à l'action final. Jamais deux sections sombres à la suite.
- Contraste vérifié : 4,5 minimum pour tout texte, 3 pour les grands titres et les icônes.

## 3. Typographie

- Titres : **Fraunces**, poids 400 (h1, h2) et 500 (h3), sans italique, réglage optique automatique. Interlignage 1,1 à 1,2. Légère réduction d'espacement sur h1 (`letter-spacing: -0.01em`).
- Texte et interface : **Nunito Sans**, 400 pour le texte, 600 pour les boutons, labels et petits titres.
- Hébergées sur le site en woff2, seulement les graisses utilisées, `font-display: swap`.

Échelle (fluide avec `clamp`) :

| Rôle | Mobile | Ordinateur |
|---|---|---|
| h1 | 34 px | 56 px |
| h2 | 28 px | 40 px |
| h3 | 21 px | 24 px |
| Texte | 17 px | 18 px |
| Petit texte | 14 px | 15 px |
| Surtitre (Nunito 600, écriture normale) | 14 px | 15 px |

- Longueur de ligne : 60 à 72 caractères maximum (`max-width: 65ch`).
- Un seul h1 par page. Pas de capitales sur plus de trois mots.

## 4. Espacements et grille

- Échelle de 8 px : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Sections : 64 px de marge verticale sur mobile, 112 px sur ordinateur.
- Conteneur : 1160 px maximum, marges latérales 20 px sur mobile, 32 px sur ordinateur.
- Grille : 12 colonnes sur ordinateur, 1 colonne sur mobile. Cartes : 3 par ligne sur ordinateur, 2 sur tablette, 1 sur mobile.
- Rayons : 999px pour les boutons et les étiquettes, 16 px pour les cartes et les images, 8 px pour les champs de formulaire.
- Ombres : une seule, très douce, pour les cartes au survol (`0 12px 32px -18px rgba(42,33,28,.25)`).

## 5. Composants

**En-tête**
- Hauteur 72 px, fond `--fond` à 95 % avec flou, ligne fine en bas au défilement seulement.
- Logo version horizontale, 40 à 44 px de haut, assez grand pour être lisible.
- Menu : Accueil, L'institut ▾, Centre de formation ▾, Contact, et bouton « Réserver » toujours visible.

**Bouton réserver fixe sur mobile**
- Barre fixe en bas de l'écran sur mobile, à partir du deuxième écran : « Réserver un soin » (Planity) et une icône WhatsApp si le numéro existe. Elle disparaît sur les pages formation au profit de « Demander une formation ».

**Boutons**
- Hauteur 48 px minimum (zone tactile), texte en écriture normale, Nunito 600 16 px.
- États : survol (assombrir ou fond `--nude`), focus visible (anneau 2 px `--brun`, décalé de 2 px), désactivé.
- Deux boutons côte à côte au maximum. Sur mobile, le secondaire devient un lien texte sous le principal plutôt qu'un deuxième gros bouton.

**Carte de soin**
- Image 4:3 arrondie, nom (h3), une ligne de description, durée et prix « à partir de » alignés en bas, lien « Réserver » discret. Toute la carte est cliquable vers le détail.

**Ligne de tarif (page Tarifs)**
- Nom à gauche, durée en petit texte, prix à droite en `--brun` 600, alignement des prix avec chiffres tabulaires. Catégories repliables sur mobile, avec un sommaire d'ancres en haut.

**Bloc confiance**
- Note Planity 5/5 sur 145 avis, logo Qualiopi officiel (fichier fourni par Mariline), et une citation d'avis réelle quand on en a une. Rien d'inventé.

**FAQ**
- Accordéon accessible (`button` + `aria-expanded`), un seul ouvert à la fois sur mobile.

**Formulaires**
- Labels toujours visibles au-dessus du champ, jamais remplacés par le texte indicatif.
- Champs 48 px de haut, messages d'erreur sous le champ, en clair (« Indiquez un e-mail valide »).
- Après envoi : message de confirmation sur la page, avec le délai de réponse.

**Pied de page**
- Fond `--espresso`. Quatre colonnes sur ordinateur : l'institut (logo, phrase, réseaux), nous trouver (adresse, lien itinéraire), horaires, liens utiles (FAQ, mentions légales, confidentialité).

## 6. Images

- En attendant les vraies photos : aucun nom de fichier visible à l'écran. Les emplacements sont des aplats `--fond-alt` avec le papillon du logo en filigrane très léger. Les noms de fichiers attendus sont listés dans `docs/PHOTOS.md`.
- Vraies photos : lumière naturelle, tons chauds, mains et gestes, serviettes blanches, comme sur l'Instagram. Pas de visage de Mariline. Pas de banque d'images générique.
- Formats : AVIF ou WebP avec repli JPG, `srcset` en 480, 960 et 1600 px, `loading="lazy"` sauf l'image du haut, dimensions toujours indiquées pour éviter les sauts de mise en page.

## 7. Mouvement

- Une seule animation d'apparition, douce (opacité et 12 px de translation, 400 ms), déclenchée une fois.
- Pas de parallaxe, pas de carrousel automatique.
- Tout est désactivé avec `prefers-reduced-motion`.

## 8. Accessibilité et qualité

- Niveau visé : WCAG 2.2 AA.
- Navigation complète au clavier, lien d'évitement, focus toujours visible.
- Zones tactiles de 44 px minimum.
- Performance visée sur mobile : LCP sous 2,5 s, CLS sous 0,1, note Lighthouse 90 ou plus en performance, accessibilité, bonnes pratiques et SEO.

## 9. Ce qu'on ne fait pas

Pas de mot en italique doré, pas de capitales espacées en série, pas de trait doré sous chaque titre, pas de dégradés dorés sur les boutons, pas de texte en surimpression sur photo sans voile de contraste, pas d'emojis, pas de faux avis.

## 10. Structure reprise du site Spa Renata França

La cliente veut **la structure, le menu, les grands visuels plein écran, le parcours de formation par niveaux et le formulaire de demande** du site sparenatafranca.com (pages Accueil, Formation et Drainage), adaptés à Borboleta. On reprend la mise en page, jamais leurs textes ni leurs images. Le style (couleurs, typo) reste celui de ce document.

**En-tête (comme Spa Renata)**
- Logo Borboleta **centré**. Sur ordinateur : menu à gauche (Accueil, L'institut ▾, Centre de formation ▾, Contact), bouton « Réserver » à droite. Sur mobile : burger à gauche, logo au centre, « Réserver » à droite.
- Bouton WhatsApp flottant rond en bas à droite sur toutes les pages, dès que le numéro est fourni.

**Accueil**
1. Grand visuel plein écran (photo de soin, voile sombre léger), titre « Drainage lymphatique à Draveil », une phrase, un bouton principal « Réserver un soin » et un lien « Découvrir les formations ».
2. **Bandeau des soins en colonnes verticales** (signature du site Spa Renata) : une colonne haute par famille de soins (Drainage Renata França, Miracle Face, Remodelage, Kobido, Radiofréquence, Post-opératoire, Femme enceinte), photo en fond, nom du soin et lien « En savoir plus ». Défilement horizontal au doigt sur mobile.
3. Bloc partagé texte et image : l'institut à Draveil, l'approche, l'adresse, bouton « Réserver ».
4. Bloc partagé image et texte : le centre de formation, bouton « Découvrir les formations ».
5. Bande confiance : 5/5 sur 145 avis Planity, Qualiopi.
6. Cartes cadeaux, FAQ, Instagram, appel à l'action final.

**Page Centre de formation (comme la page Formation de Spa Renata)**
1. En-tête plein écran sombre : titre « Le drainage lymphatique, transmis avec soin », le logo en signature, paragraphe sur la méthode, bouton « Je veux me former ».
2. **Les piliers de la technique** en rangée de 4 à 5 colonnes sur fond espresso : le rythme, la pression, le pompage, le glissement, la précision du geste. Un titre court en brun clair et deux lignes de texte chacun.
3. Bloc partagé photo et texte : « Une pédagogie pensée pour apprendre avec ses mains », bouton « Je veux me former ».
4. **« À quoi ressemble une journée de formation ? »** en 3 étapes numérotées : 1. La théorie (anatomie, protocole, contre-indications), 2. La pratique en binôme avec corrections en direct, 3. L'évaluation finale et l'attestation.
5. **Le parcours par niveaux**, avec une image par formation : Niveau 1, le socle : Drainage lymphatique corps (21 h, 3 jours). Niveau 2, les spécialisations : Drainage visage, Remodelage anti-cellulite. Niveau 3, l'expertise : Drainage post-opératoire (prérequis corps et visage). En complément : Kobido. Chaque carte : durée, prérequis, « Programme détaillé », « Nous consulter ».
6. Les avantages en 3 colonnes : formation certifiée Qualiopi et finançable, petit groupe et pratique intensive, suivi après la formation.
7. La formatrice : Da Costa Mariline, parcours et certifications (sans photo de visage, on utilise une photo de mains ou le logo).
8. **Prochaines sessions avec formulaire « En savoir plus »** : une carte « Prochaines sessions : nous consulter » par formation ; au clic, elle s'ouvre sur un petit formulaire (nom, téléphone, e-mail, formation visée, case RGPD, bouton Envoyer), puis un message de confirmation avec le lien WhatsApp. Le même script contact.php reçoit ces demandes.
9. Financement (OPCO, CPF, FAFCEA, France Travail) et bouton « Je veux me former », répété comme sur Spa Renata après chaque grande section.

**Pages de soin (comme la page Drainage de Spa Renata)**
1. Visuel plein écran avec le nom du soin et une phrase.
2. En quoi consiste le soin, pour qui, déroulé d'une séance.
3. Les tarifs du soin (séance et cures), bouton « Réserver sur Planity ».
4. Précautions (post-opératoire : accord du professionnel de santé), questions fréquentes du soin.
5. Les autres soins en colonnes, comme sur l'accueil.

Ce qu'on ne reprend pas de Spa Renata : la boutique, la presse, le blog, la recherche de thérapeute, le mélange de langues.
