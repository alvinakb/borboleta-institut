# Les messages à envoyer à Claude Code

Avant de commencer : mets tout le contenu de ce kit (CLAUDE.md, le dossier .claude, le dossier contenu, le dossier public) à la racine du dépôt borboleta-institut, puis ouvre ce dépôt dans Claude Code. Envoie les messages un par un : attends la fin de chaque étape et vérifie avant de passer à la suivante.

## Message 1 : la base

Lis CLAUDE.md et tout le dossier contenu. Regarde ce que contient déjà le dépôt et dis-moi ce que tu gardes ou remplaces avant de toucher à quoi que ce soit. Ensuite, utilise l'agent architecte-angular pour créer la structure du site, puis l'agent testeur-qualite pour vérifier. Montre-moi la liste des pages et des fichiers créés.

## Message 2 : le design

Utilise l'agent integrateur-design pour mettre en forme le header, le footer et la page d'accueil selon la charte de CLAUDE.md, avec la structure du site Spa Renata França. Fais des captures à 390 px et 1280 px et montre-les-moi avant de continuer sur les autres pages.

## Message 3 : les textes et les prix

Lance en parallèle l'agent redacteur-seo pour placer tous les textes, et l'agent tarifs-planity pour brancher les soins et les prix. Ensuite, l'agent integrateur-design finit la mise en forme de toutes les pages. Termine avec l'agent testeur-qualite et corrige ce qu'il trouve.

## Message 4 : le contact et o2switch

Utilise l'agent contact-o2switch pour le formulaire, le script contact.php, le bouton WhatsApp et le guide docs/GUIDE-O2SWITCH.md. Puis lance l'agent testeur-qualite.

## Message 5 : la mise en ligne

Fais ng build, prépare le dossier à envoyer dans public_html chez o2switch avec le .htaccess, et explique-moi étape par étape comment l'envoyer. Fais un commit et pousse sur GitHub.

## Quand Mariline envoie quelque chose de nouveau

- Nouveau prix ou nouveau soin : « Utilise l'agent tarifs-planity avec cette capture. »
- Nouveau texte ou nouvelle info : « Utilise l'agent redacteur-seo pour ajouter ceci. »
- Nouvelles photos : « Mets ces photos à la place des emplacements, optimise-les pour le web, puis lance testeur-qualite. »
