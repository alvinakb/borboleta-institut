# Guide o2switch : mise en ligne du site et messagerie

Ce guide s’adresse à Mariline et à Khady. Il explique, étape par étape, comment créer la boîte mail de l’institut, la lire sur votre téléphone, mettre le site en ligne chez o2switch et vérifier que le formulaire de contact fonctionne.

Les noms de menus de cPanel (l’espace de gestion d’o2switch) peuvent varier légèrement selon les mises à jour. Nous n’avons pas pu les vérifier dans la documentation o2switch au moment de la rédaction : quand vous lisez « le menu s’appelle généralement », cherchez un intitulé proche. En cas de doute, la FAQ d’o2switch (faq.o2switch.fr) et leur support répondent très bien.

**Règle d’or pour les mots de passe** : chaque personne choisit elle-même son mot de passe, directement dans cPanel. Ne l’envoyez jamais par e-mail, SMS ou WhatsApp, et ne l’écrivez jamais dans un fichier du site. Le site n’en a besoin d’aucun.

## Sommaire

1. Se connecter à cPanel
2. Créer la boîte mail contact@borboleta-institut-drainage.fr
3. Transférer les messages vers une autre adresse (facultatif)
4. Lire vos e-mails sur votre téléphone
5. Ce qu’il faut remplir avant la mise en ligne
6. Envoyer le site dans public_html
7. Activer le SSL (le cadenas https)
8. Enregistrements SPF et DKIM : éviter les spams
9. Tester le formulaire
10. Vérifier les spams
11. En cas de problème

## 1. Se connecter à cPanel

1. Retrouvez l’e-mail de bienvenue d’o2switch : il contient l’adresse de connexion à cPanel et votre identifiant.
2. Connectez-vous avec le mot de passe que vous avez choisi pour votre compte o2switch.
3. Vous arrivez sur une page avec de nombreuses icônes classées par rubriques (E-mail, Fichiers, Domaines, Sécurité…). Une barre de recherche en haut permet de trouver un outil en tapant son nom.

## 2. Créer la boîte mail contact@borboleta-institut-drainage.fr

C’est l’adresse qui reçoit les messages du formulaire du site.

1. Dans la rubrique **E-mail**, ouvrez l’outil de gestion des adresses. Le menu s’appelle généralement **« Comptes de messagerie »** (ou « Email Accounts »).
2. Cliquez sur **« Créer »**.
3. Choisissez le domaine **borboleta-institut-drainage.fr** et tapez **contact** comme nom d’utilisateur.
4. Mot de passe : **la personne qui utilisera la boîte le choisit elle-même** et le tape directement ici. Choisissez une phrase longue et facile à retenir pour vous (par exemple quatre mots sans rapport entre eux), que vous n’utilisez nulle part ailleurs. Notez-le dans un endroit sûr (un gestionnaire de mots de passe, ou un carnet rangé chez vous).
5. Espace de stockage : laissez la valeur proposée, ou choisissez « illimité » si l’option existe.
6. Validez avec **« Créer »**.

Pour lire vos messages depuis un ordinateur, sans rien installer : dans la liste des comptes de messagerie, cliquez sur **« Vérifier la messagerie »** (le menu s’appelle généralement ainsi, ou « Webmail »). Le webmail s’ouvre dans le navigateur.

### L’adresse d’envoi no-reply@ (facultatif mais conseillé)

Le formulaire envoie ses e-mails depuis **no-reply@borboleta-institut-drainage.fr**. Cette adresse n’a pas besoin d’être une vraie boîte mail. Pour ne rien perdre, vous pouvez cependant la rediriger vers contact@ : si un visiteur fait une faute de frappe dans son e-mail, le message d’erreur arrivera ainsi chez vous. Voir la partie 3 pour créer une redirection (de no-reply@ vers contact@).

## 3. Transférer les messages vers une autre adresse (facultatif)

Si vous préférez recevoir aussi les messages du site sur une autre adresse (par exemple une adresse Gmail personnelle) :

1. Dans la rubrique **E-mail**, le menu s’appelle généralement **« Redirecteurs »** (ou « Forwarders »).
2. Cliquez sur **« Ajouter un redirecteur »**.
3. Adresse à rediriger : **contact**, domaine **borboleta-institut-drainage.fr**.
4. Destination : choisissez **« Rediriger vers l’adresse e-mail »** et tapez l’autre adresse.
5. Validez.

Bon à savoir :

- Les messages restent aussi dans la boîte contact@ : rien n’est perdu.
- Les messages transférés vers Gmail ou Outlook arrivent parfois dans les spams de la boîte de destination. Lors des premiers jours, regardez le dossier « Spam » de l’autre adresse et marquez les messages comme « Non spam ».
- Plutôt que de transférer, vous pouvez aussi lire directement contact@ sur votre téléphone (partie 4) : c’est souvent plus simple pour répondre avec la bonne adresse.

## 4. Lire vos e-mails sur votre téléphone

### Trouver les réglages

Dans cPanel, sur la ligne de la boîte contact@ dans « Comptes de messagerie », cliquez sur **« Connecter les appareils »** (le menu s’appelle généralement ainsi, ou « Configurer le client de messagerie »). La page affiche les réglages à recopier :

- nom d’utilisateur : l’adresse complète, contact@borboleta-institut-drainage.fr ;
- mot de passe : celui que vous avez choisi pour cette boîte ;
- serveur entrant (IMAP) et serveur sortant (SMTP) : le nom du serveur indiqué sur cette page ;
- ports en connexion sécurisée (SSL) : en général **993** pour l’IMAP et **465** pour le SMTP. Fiez-vous à ce qu’affiche la page.

Choisissez toujours **IMAP** (et non POP) : vos messages restent synchronisés entre le téléphone, l’ordinateur et le webmail.

### Sur iPhone

1. Ouvrez **Réglages**, puis **Mail** (ou **Apps**, puis **Mail** selon la version), puis **Comptes**, puis **Ajouter un compte**.
2. Choisissez **Autre**, puis **Ajouter un compte Mail**.
3. Saisissez votre nom (« Borboleta Institut »), l’adresse contact@, le mot de passe et une description.
4. Choisissez **IMAP** et recopiez les serveurs entrant et sortant indiqués dans cPanel (le nom d’utilisateur est l’adresse complète dans les deux cas).
5. Validez. Les messages apparaissent dans l’application Mail.

### Sur Android (application Gmail)

1. Ouvrez l’application **Gmail**, touchez votre photo en haut à droite, puis **Ajouter un compte**.
2. Choisissez **Autre**, tapez l’adresse contact@, puis choisissez **Personnel (IMAP)**.
3. Tapez le mot de passe, puis recopiez les serveurs entrant et sortant indiqués dans cPanel, avec la sécurité **SSL/TLS**.
4. Validez. La boîte apparaît dans Gmail, à côté de vos autres adresses.

## 5. Ce qu’il faut remplir avant la mise en ligne

Ces informations ne sont pas encore connues. Tant qu’elles sont vides, **rien ne s’affiche sur le site** (pas de ligne vide, pas de texte « à compléter ») : le site peut donc être mis en ligne sans elles, puis complété plus tard.

Elles se remplissent dans le fichier **`src/app/data/site-info.ts`**, entre les apostrophes, puis on relance `npm run build` et on renvoie le site (partie 6).

| Constante | Ce qu’il faut y mettre | Exemple |
| --- | --- | --- |
| `WHATSAPP_NUMERO` | Numéro WhatsApp au format international, sans « + » ni espaces. Fait apparaître le bouton WhatsApp sur la page Contact et le bouton rond flottant. | `33612345678` |
| `TELEPHONE` | Numéro de téléphone affiché aux visiteurs. | `06 12 34 56 78` |
| `NUMERO_DECLARATION_ACTIVITE` | Numéro de déclaration d’activité de l’organisme de formation (DREETS), pour les mentions légales. | |
| `CERTIFICAT_QUALIOPI` | Référence ou lien du certificat Qualiopi. | |
| `STATUT_JURIDIQUE` | Statut de l’entreprise, pour les mentions légales. | `Entreprise individuelle, micro-entreprise` |
| `DELAI_REPONSE` | Délai de réponse annoncé après l’envoi d’un formulaire. Vide : « dans les meilleurs délais ». | `sous 48 heures ouvrées` |

À faire aussi :

- **Logo Qualiopi** : déposez le fichier officiel (fourni avec la certification) sous le nom exact **`public/images/qualiopi.png`**. Il s’affiche automatiquement au prochain `npm run build`.
- **Délai de réponse dans les e-mails** : si vous remplissez `DELAI_REPONSE`, recopiez la même phrase dans la constante `DELAI_REPONSE` en haut du fichier **`public/contact.php`**, pour que l’e-mail de confirmation dise la même chose que le site.
- **Horaires** : s’ils changent, modifiez-les dans `src/app/data/site-info.ts` et dans la constante `HORAIRES` en haut de `public/contact.php` (rappelés dans l’e-mail de confirmation).

## 6. Envoyer le site dans public_html

Le site est publié **à la racine** de `public_html` : il s’ouvre directement sur https://borboleta-institut-drainage.fr.

### Préparer les fichiers (Khady)

1. Dans le dossier du projet, lancez `npm run build`. La commande doit se terminer sans erreur.
2. Le site prêt à envoyer se trouve dans **`dist/borboleta-site/browser/`**. On envoie **le contenu** de ce dossier (pas le dossier lui-même).
3. Vérifiez que ce contenu comprend bien **`index.html`**, **`contact.php`** et le fichier caché **`.htaccess`** (sur Mac, Cmd + Maj + point affiche les fichiers cachés dans le Finder).
4. Faites un fichier zip de ce contenu. Le plus sûr, depuis un terminal : `cd dist/borboleta-site/browser && zip -r ../site.zip .` (le point inclut les fichiers cachés comme `.htaccess`).

### Envoyer les fichiers

1. Dans cPanel, rubrique **Fichiers**, ouvrez le gestionnaire de fichiers. Le menu s’appelle généralement **« Gestionnaire de fichiers »** (ou « File Manager »).
2. En haut à droite, ouvrez **« Paramètres »** et cochez l’option qui affiche les fichiers cachés (elle s’appelle généralement « Afficher les fichiers cachés (dotfiles) »).
3. Ouvrez le dossier **`public_html`**.
4. S’il contient d’anciens fichiers (page par défaut d’o2switch, ancien site), supprimez-les, **sauf** les dossiers `.well-known` et `cgi-bin` s’ils existent (ils servent au certificat SSL et au serveur).
5. Cliquez sur **« Charger »** (ou « Upload ») et envoyez `site.zip`.
6. De retour dans `public_html`, faites un clic droit sur `site.zip`, puis **« Extraire »** dans `public_html`.
7. Vérifiez que `index.html`, `contact.php` et `.htaccess` sont bien **directement** dans `public_html` (et non dans un sous-dossier). Supprimez ensuite `site.zip`.

Pour une mise à jour, on recommence de la même façon : les anciens fichiers `chunk-….js` peuvent être supprimés avant d’envoyer les nouveaux.

### Version de PHP

Le formulaire utilise un petit script PHP (`contact.php`) qui demande **PHP 8.1 ou plus récent**. Dans cPanel, le menu s’appelle généralement **« Sélectionner une version de PHP »** (ou « MultiPHP Manager »). Vérifiez qu’une version 8.1, 8.2, 8.3 ou plus récente est choisie pour le domaine.

## 7. Activer le SSL (le cadenas https)

Le SSL permet d’afficher le site en **https** avec le cadenas, indispensable pour la confiance des visiteurs et pour Google. Chez o2switch, le certificat est gratuit (Let’s Encrypt) et se renouvelle tout seul.

1. Dans cPanel, rubrique **Sécurité**, le menu s’appelle généralement **« Let’s Encrypt SSL »** ou **« État SSL/TLS »** (« SSL/TLS Status »).
2. Vérifiez que **borboleta-institut-drainage.fr** et **www.borboleta-institut-drainage.fr** ont un certificat valide.
3. Si ce n’est pas le cas, sélectionnez ces deux domaines et lancez la génération du certificat (le bouton s’appelle généralement « Générer » ou « Exécuter AutoSSL »). Comptez quelques minutes.
4. Pour que tous les visiteurs arrivent en https : dans la rubrique **Domaines**, le menu s’appelle généralement **« Domaines »**. Activez l’option **« Forcer la redirection HTTPS »** pour borboleta-institut-drainage.fr.
5. Ouvrez http://borboleta-institut-drainage.fr dans le navigateur : l’adresse doit passer toute seule en https, avec le cadenas.

Si le certificat ne se génère pas, c’est souvent que le nom de domaine ne pointe pas encore vers o2switch (après un changement, cela peut prendre plusieurs heures). Patientez, puis réessayez.

## 8. Enregistrements SPF et DKIM : éviter les spams

SPF et DKIM sont deux « signatures » techniques qui prouvent aux messageries (Gmail, Outlook, Orange…) que les e-mails envoyés au nom de borboleta-institut-drainage.fr viennent bien de votre hébergement. Sans elles, les e-mails du formulaire risquent de finir dans les spams.

Quand le nom de domaine est géré chez o2switch, ces enregistrements sont **en général déjà créés automatiquement**. Il suffit de le vérifier :

1. Dans cPanel, rubrique **E-mail**, le menu s’appelle généralement **« Délivrabilité des e-mails »** (ou « Email Deliverability »).
2. Sur la ligne **borboleta-institut-drainage.fr**, l’état doit être **valide** (coche verte) pour **DKIM** et pour **SPF**.
3. Si un problème est signalé, cliquez sur **« Gérer »** : cPanel propose généralement un bouton **« Réparer »** qui crée les enregistrements manquants.

**Si le nom de domaine est enregistré ailleurs** (chez un autre bureau d’enregistrement, avec les DNS chez lui) : cPanel affiche sur cette même page les enregistrements à recopier. Il faut alors les ajouter dans la zone DNS de ce bureau d’enregistrement, ou demander à Khady de le faire.

Pour aller plus loin (facultatif), un enregistrement **DMARC** renforce encore la confiance des messageries. Le support o2switch peut vous indiquer la valeur conseillée.

## 9. Tester le formulaire

À faire une fois le site en ligne, puis après chaque mise à jour importante.

1. Ouvrez https://borboleta-institut-drainage.fr/contact dans votre navigateur, de préférence depuis un téléphone **qui n’est pas connecté au wifi de l’institut** (ou demandez à une proche de le faire).
2. Remplissez le formulaire avec une adresse e-mail personnelle **différente** de contact@ (par exemple votre adresse Gmail), choisissez un objet, écrivez un court message et cochez la case de confidentialité.
3. **Attendez quelques secondes** avant de cliquer sur « Envoyer » : un envoi trop rapide est refusé, c’est une protection contre les robots.
4. Le message « Merci, votre message est bien envoyé » doit s’afficher.
5. Vérifiez la boîte **contact@** : vous devez recevoir « Demande de contact : » suivi du nom saisi, avec tous les champs.
6. Cliquez sur **« Répondre »** : la réponse doit partir vers l’adresse saisie dans le formulaire (et non vers no-reply@).
7. Vérifiez l’adresse personnelle utilisée : l’e-mail de confirmation « Votre demande à Borboleta Institut est bien reçue » doit être arrivé.
8. Recommencez avec le formulaire « Être informée des prochaines dates » de la page Formations : vous devez recevoir « Demande de dates de formation : » suivi du nom.

Bon à savoir :

- Un même appareil ne peut envoyer qu’**une demande toutes les 30 secondes**. Si vous faites plusieurs essais à la suite, patientez entre deux envois.
- Si le message « Mode test : le formulaire sera actif une fois le site en ligne » s’affiche sur le site en ligne, c’est que le PHP n’est pas exécuté : vérifiez que `contact.php` est bien dans `public_html` et la version de PHP (partie 6).
- Le formulaire n’enregistre rien sur le serveur : les demandes existent seulement dans la boîte contact@. Ne supprimez pas un message avant d’y avoir répondu.

## 10. Vérifier les spams

Pendant les premières semaines, prenez l’habitude de regarder les spams une ou deux fois par semaine.

- **Dans la boîte contact@** (webmail ou téléphone) : ouvrez le dossier **« Spam »** ou **« Junk »**. Si une demande d’un visiteur s’y trouve, déplacez-la dans la boîte de réception et marquez-la comme « Non spam ».
- **Côté visiteurs** : l’e-mail de confirmation peut arriver dans leurs spams, surtout les premiers jours. Le message affiché sur le site après l’envoi les invite déjà à vérifier.
- **Si les e-mails du formulaire arrivent souvent en spam** : vérifiez SPF et DKIM (partie 8), puis contactez le support o2switch.
- Dans cPanel, rubrique **E-mail**, le menu s’appelle généralement **« Filtres anti-spam »** (ou « Spam Filters ») : il permet de régler la sévérité du filtre et d’ajouter des expéditeurs de confiance. Laissez les réglages par défaut tant que tout fonctionne.

## 11. En cas de problème

- **Le site affiche une page blanche ou « introuvable » en rafraîchissant une page** : le fichier `.htaccess` manque dans `public_html` (partie 6, étape 7).
- **Le formulaire affiche une erreur** : le message indique en général quoi corriger (e-mail invalide, case à cocher…). Si l’erreur parle d’envoi qui n’a pas abouti, réessayez quelques minutes plus tard, puis contactez le support o2switch.
- **Aucun e-mail n’arrive dans contact@** : vérifiez que la boîte existe bien (partie 2), regardez les spams (partie 10), puis vérifiez SPF et DKIM (partie 8). Dans cPanel, le menu s’appelle généralement **« Suivi de la livraison »** (ou « Track Delivery ») : il montre si les e-mails sont partis et pourquoi ils auraient été refusés.
- **Changer l’adresse qui reçoit les demandes** : modifiez la constante `DESTINATAIRE` en haut de `public/contact.php`, relancez `npm run build` et renvoyez le fichier.
- **Support o2switch** : joignable depuis votre espace client, très réactif et en français. Ne communiquez jamais votre mot de passe, même au support : il n’en a pas besoin.
