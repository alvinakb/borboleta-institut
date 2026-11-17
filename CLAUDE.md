# Borboleta Institut : site vitrine

Site de Borboleta Institut, institut de drainage lymphatique à Draveil (91) et centre de formation certifié Qualiopi. Cliente : Mariline Da Costa. Projet géré par Khady (consultante digitale).

## Technique (même organisation que le projet SAF Formation)

- Angular 21, composants standalone, routing, CSS simple (pas de framework CSS). Mêmes conventions que SAF : `public/` pour les fichiers statiques, `src/app/` pour le code, `src/assets/` pour les images, `.prettierrc`, `.editorconfig`.
- Une page = un composant dans `src/app/pages/`. Éléments communs (header, menu, footer, bouton réserver, carte de soin) dans `src/app/shared/`.
- Toutes les données (soins, prix, formations, infos de contact) viennent de fichiers dans `src/app/data/` générés à partir de `contenu/tarifs.json`. Jamais de prix écrit en dur dans un template.
- Build : `ng build` produit `dist/borboleta-site/browser/`, qu'on met dans `public_html` chez o2switch. Le site doit marcher en sous-dossiers avec un fichier `.htaccess` qui renvoie toutes les routes vers `index.html` (à mettre dans `public/`).
- Pas de SSR. Titres et meta description par page avec le service `Title` et `Meta` d'Angular.

## Design

- Modèle de structure : le site Spa Renata França (sparenatafranca.com), pages Accueil, Formation et Drainage. On reprend : la structure des pages, le menu, les grands visuels plein écran, le parcours de formation par niveaux, les piliers de la technique, le formulaire « En savoir plus », le bouton d'action répété après les sections. On ne copie aucun texte ni image de ce site.
- Palette Borboleta : crème `#F4F1EB`, beige `#E8DCC8`, doré (dégradé du logo, de `#E9CB86` à `#A97B3F`), anthracite `#2C2C2C`. Noir profond `#0E0E0E` possible pour des bandeaux, comme le logo sur fond noir.
- Typo : titres en serif élégante (Cormorant Garamond ou équivalent), un mot clé en italique doré. Petits surtitres en capitales espacées dorées. Corps en sans-serif léger (Jost ou équivalent).
- Logos : `public/images/logo-fond-clair.jpg` et `public/images/logo-fond-noir.jpg`. Les convertir en PNG transparent ou SVG propre si possible, sinon les utiliser tels quels sur un fond de la même couleur.
- Pas de photos pour l'instant : prévoir des emplacements d'image avec un fond dégradé élégant et un nom de fichier attendu (ex. `assets/images/accueil-hero.jpg`), faciles à remplacer. Aucune photo du visage de Mariline.
- 100 % responsive, menu burger sur mobile, contraste lisible.

## Menu (décidé)

- Accueil
- L'institut (menu déroulant) : L'institut et l'approche, Nos soins, Tarifs, Cartes cadeaux, Avis, Réserver sur Planity
- Centre de formation (menu déroulant) : Nos formations, Le parcours et le déroulement, La formatrice, Financement, Calendrier des sessions, S'inscrire
- Contact
- Dans le footer : FAQ, Mentions légales, Politique de confidentialité, Instagram, adresse, horaires.

## Contenu

- Textes : `contenu/textes-site-borboleta.txt` (document Word validé) et `contenu/seo-accueil.txt` (texte d'accueil optimisé pour Google). Les deux sont à fusionner : structure du Word, mots clés et FAQ du texte SEO.
- Prix : `contenu/tarifs.json`, une seule source. Sur les pages Soins, afficher « à partir de X € » par catégorie ; la page Tarifs affiche le détail complet. Bouton « Réserver » sur chaque soin vers Planity.
- Priorité : soins et formations à égalité sur l'accueil. Le mot clé principal reste « drainage lymphatique à Draveil (91) ».
- Formatrice : écrire **Da Costa Mariline** (demande de la cliente : ne plus écrire « Pinho »). Parcours public : CAP Esthétique Cosmétique Parfumerie (2021), formée à la méthode Renata França (drainage, remodelage, Miracle Face, 2021), rouleau anti-cellulite (2022), méthode Dr Vodder (2023), Kobido (2025). Fondatrice de Borboleta Institut depuis janvier 2022, expérience en cabinet de kinésithérapie en 2021. Langues : français, portugais, anglais. Jamais d'informations personnelles (adresse perso, date de naissance, téléphone perso).
- Formations : la formation drainage corps fait 21 h sur 3 jours. Durées et prix des formations 2 à 5 : « nous consulter » tant qu'ils ne sont pas fournis. Inscription : formulaire du site, téléphone ou WhatsApp, et Mon Compte Formation (CPF).
- Calendrier des sessions : pas de dates pour l'instant. La page affiche « Prochaines sessions : nous consulter » et un formulaire « Être informée des prochaines dates ».
- Avis : note Planity 5/5, 145 avis, avec lien vers Planity. Instagram : lien et bloc vers @borboletainstitut.
- Cartes cadeaux : mises en avant (bloc sur l'accueil et page dédiée), disponibles en institut.
- Mentions légales : Da Costa Mariline, SIRET 914 515 150 00011, 10 allée des Grandes Pièces, 91210 Draveil. Hébergeur : o2switch. Numéro de déclaration d'activité et certificat Qualiopi : à compléter (laisser un champ clairement marqué).
- Infos pratiques : 10 allée des Grandes Pièces, 91210 Draveil. Lundi au vendredi 9h à 19h30, mercredi à partir de 10h, samedi 9h à 14h, fermé le dimanche. Planity : https://www.planity.com/borboleta-institut-91210-draveil. Instagram : https://www.instagram.com/borboletainstitut/

## Règles d'écriture

- Vouvoiement, ton chaleureux et soigné.
- Pas de tirets cadratins ni de tirets pour séparer les idées : utiliser des virgules ou des deux-points.
- Ne pas présenter le drainage esthétique comme un traitement médical : pas de « booste l'immunité », « réduit les œdèmes », « affine dès la première séance ». Parler de bien-être, de légèreté, de silhouette, d'esthétique. Pour le post-opératoire, toujours rappeler l'accord du professionnel de santé.
- Pas de faux avis, pas de chiffres inventés.

## Formulaire de contact

- Champs : nom, e-mail, téléphone, objet (soin, formation, autre), formation visée, message, « Comment nous avez-vous connus ? », case RGPD.
- Envoi par un script `public/contact.php` (o2switch exécute le PHP) vers `contact@borboleta-institut-drainage.fr`, avec anti-spam (champ piège et délai minimum) et e-mail de confirmation au visiteur. L'adresse du destinataire est dans une constante en haut du fichier.
- Bouton WhatsApp à côté du formulaire (lien wa.me) : numéro à fournir, laisser une constante.
- `ng serve` n'exécute pas le PHP : en local, le formulaire affiche un message de test.

## Avant de dire qu'une tâche est finie

- `ng build` passe sans erreur.
- Toutes les pages s'affichent sur mobile (390 px) et sur ordinateur (1280 px), sans défilement horizontal.
- Aucun lien cassé, aucun prix différent de `contenu/tarifs.json`, aucun « Pinho ».
- Commit clair en français, une fonctionnalité par commit.
