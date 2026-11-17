<?php
/**
 * Borboleta Institut : envoi des formulaires du site (o2switch, PHP 8).
 *
 * Reçoit en POST les demandes du site Angular (service src/app/core/envoi-formulaire.ts) :
 *   - type « contact »         : formulaire de la page Contact ;
 *   - type « formation-dates » : formulaire « Être informée des prochaines dates ».
 * Envoie un e-mail à DESTINATAIRE (Reply-To : le visiteur), puis un e-mail de confirmation
 * au visiteur. Répond toujours en JSON : {"ok": true|false, "message": "..."}.
 *
 * Anti-spam : champ piège « site_web », délai minimum entre l'ouverture du formulaire
 * (« debut », secondes Unix) et l'envoi, et une demande au plus par adresse IP toutes les
 * 30 secondes (fichier vide dans le dossier temporaire du serveur, hors du site).
 * Aucune donnée n'est enregistrée sur le serveur : les demandes arrivent seulement par e-mail.
 * Aucun mot de passe dans ce fichier : mail() utilise le serveur d'envoi d'o2switch.
 */

declare(strict_types=1);

// ---------------------------------------------------------------------------------------
// Réglages (à modifier ici si besoin)
// ---------------------------------------------------------------------------------------

/** Adresse qui reçoit les demandes. */
const DESTINATAIRE = 'contact@borboleta-institut-drainage.fr';

/** Adresse d'expédition (doit appartenir au domaine pour ne pas finir en spam). */
const EXPEDITEUR = 'no-reply@borboleta-institut-drainage.fr';

const NOM_SITE = 'Borboleta Institut';
const ADRESSE_INSTITUT = '10 allée des Grandes Pièces, 91210 Draveil';
const LIEN_PLANITY = 'https://www.planity.com/borboleta-institut-91210-draveil';

/** Horaires rappelés dans l'e-mail de confirmation (à garder identiques à src/app/data/site-info.ts). */
const HORAIRES = [
    'Lundi, mardi, jeudi, vendredi : 9h à 19h30',
    'Mercredi : 10h à 19h30',
    'Samedi : 9h à 14h',
    'Dimanche : fermé',
];

/**
 * Délai de réponse annoncé (ex. « sous 48 heures ouvrées »), comme DELAI_REPONSE dans
 * src/app/data/site-info.ts. Vide : « dans les meilleurs délais ».
 */
const DELAI_REPONSE = '';

/** Délai minimum (secondes) entre l'ouverture du formulaire et l'envoi. */
const DELAI_MINIMUM = 3;

/** Âge maximum (secondes) d'un formulaire ouvert : au delà, on demande de recharger la page. */
const DELAI_MAXIMUM = 86400;

/** Une demande au plus par adresse IP pendant ce nombre de secondes (0 pour désactiver). */
const LIMITE_SECONDES = 30;

/** Taille maximale de la requête (octets). */
const TAILLE_MAXIMUM = 20000;

/** Objets autorisés pour le formulaire de contact. */
const OBJETS = [
    'soin' => 'Un soin',
    'formation' => 'Une formation',
    'autre' => 'Autre demande',
];

/** Formations autorisées (identifiants et titres de src/app/data/formations.ts). */
const FORMATIONS = [
    'drainage-corps' => 'Drainage lymphatique corps',
    'drainage-visage' => 'Drainage lymphatique visage',
    'remodelage' => 'Remodelage, massage anti-cellulite',
    'post-operatoire' => 'Drainage post-opératoire, chirurgie esthétique',
    'kobido' => 'Lifting japonais, Kobido',
];

/** Réponses autorisées à « Comment nous avez-vous connus ? » (facultatif). */
const CONNU = [
    'instagram' => 'Instagram',
    'planity' => 'Planity',
    'google' => 'Google',
    'bouche-a-oreille' => 'Bouche-à-oreille',
    'autre' => 'Autre',
];

// ---------------------------------------------------------------------------------------
// Réponse JSON
// ---------------------------------------------------------------------------------------

mb_internal_encoding('UTF-8');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** Envoie la réponse JSON et arrête le script. */
function repondre(int $code, bool $ok, string $message): never
{
    http_response_code($code);
    echo json_encode(
        ['ok' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

// ---------------------------------------------------------------------------------------
// Contrôles de la requête
// ---------------------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    repondre(405, false, 'Méthode non autorisée.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > TAILLE_MAXIMUM) {
    repondre(413, false, 'Votre message est trop long.');
}

// Si le navigateur indique l'origine de la page, elle doit être ce site.
$origine = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origine !== '') {
    $hoteOrigine = strtolower((string) parse_url($origine, PHP_URL_HOST));
    $hoteSite = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
    if ($hoteOrigine === '' || $hoteOrigine !== $hoteSite) {
        repondre(403, false, 'Demande refusée.');
    }
}

/** Valeur brute d'un champ POST (chaîne, jamais un tableau). */
function brut(string $nom): string
{
    $valeur = $_POST[$nom] ?? '';
    return is_string($valeur) ? $valeur : '';
}

// Champ piège rempli : un robot. Réponse « ok » sans rien envoyer, pour ne pas le renseigner.
if (trim(brut('site_web')) !== '') {
    repondre(200, true, 'Merci, votre demande est bien envoyée.');
}

// Délai minimum et cohérence de l'horodatage d'ouverture du formulaire.
$debut = trim(brut('debut'));
if ($debut === '' || !ctype_digit($debut) || strlen($debut) > 12) {
    repondre(400, false, 'Le formulaire est incomplet. Rechargez la page puis réessayez.');
}
$ecoule = time() - (int) $debut;
if ($ecoule < DELAI_MINIMUM) {
    repondre(429, false, 'Votre envoi a été trop rapide. Patientez quelques secondes puis réessayez.');
}
if ($ecoule > DELAI_MAXIMUM) {
    repondre(400, false, 'Le formulaire a expiré. Rechargez la page puis réessayez.');
}

// ---------------------------------------------------------------------------------------
// Nettoyage et validation des champs
// ---------------------------------------------------------------------------------------

/** Vrai si la valeur contient un retour à la ligne (tentative d'injection d'en-tête). */
function contientRetourLigne(string $valeur): bool
{
    return preg_match('/[\r\n]|%0a|%0d/i', $valeur) === 1;
}

/** Texte sur une ligne : UTF-8 valide, sans caractères de contrôle, espaces resserrés. */
function ligne(string $valeur): string
{
    if (!mb_check_encoding($valeur, 'UTF-8')) {
        return '';
    }
    $valeur = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $valeur) ?? '';
    $valeur = preg_replace('/\s+/u', ' ', $valeur) ?? '';
    return trim($valeur);
}

/** Texte sur plusieurs lignes (message) : retours à la ligne gardés, autres contrôles retirés. */
function paragraphe(string $valeur): string
{
    if (!mb_check_encoding($valeur, 'UTF-8')) {
        return '';
    }
    $valeur = str_replace(["\r\n", "\r"], "\n", $valeur);
    $valeur = preg_replace('/[\x00-\x08\x0B-\x1F\x7F]/u', '', $valeur) ?? '';
    $valeur = preg_replace("/\n{3,}/", "\n\n", $valeur) ?? '';
    return trim($valeur);
}

/** Retrouve une formation par identifiant ou par titre exact ; null si inconnue. */
function formationAutorisee(string $valeur): ?string
{
    if (isset(FORMATIONS[$valeur])) {
        return FORMATIONS[$valeur];
    }
    return in_array($valeur, FORMATIONS, true) ? $valeur : null;
}

$type = brut('type');
if ($type !== 'contact' && $type !== 'formation-dates') {
    repondre(400, false, 'Type de demande inconnu.');
}

// Nom, e-mail et objet vont dans les en-têtes : aucun retour à la ligne accepté.
foreach (['nom', 'email', 'objet'] as $champ) {
    if (contientRetourLigne(brut($champ))) {
        repondre(400, false, 'Votre demande contient des caractères non autorisés.');
    }
}

$erreurs = [];

$nom = ligne(brut('nom'));
if ($nom === '') {
    $erreurs[] = 'Indiquez votre nom.';
} elseif (mb_strlen($nom) > 100) {
    $erreurs[] = 'Votre nom est trop long (100 caractères au maximum).';
}

$email = trim(brut('email'));
if ($email === '' || strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $erreurs[] = 'Indiquez un e-mail valide.';
}

$telephone = ligne(brut('telephone'));
if ($telephone !== '' && preg_match('/^\+?[0-9 .()\-]{10,20}$/', $telephone) !== 1) {
    $erreurs[] = 'Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78.';
}

$objet = '';
$formation = '';
$message = '';
$connu = '';

if ($type === 'contact') {
    $cleObjet = ligne(brut('objet'));
    if (!isset(OBJETS[$cleObjet])) {
        $erreurs[] = 'Choisissez l’objet de votre demande.';
    } else {
        $objet = OBJETS[$cleObjet];
    }

    $saisieFormation = ligne(brut('formation'));
    if ($cleObjet === 'formation') {
        $formation = formationAutorisee($saisieFormation) ?? '';
        if ($formation === '') {
            $erreurs[] = 'Choisissez la formation qui vous intéresse.';
        }
    }

    $message = paragraphe(brut('message'));
    if ($message === '') {
        $erreurs[] = 'Écrivez votre message.';
    } elseif (mb_strlen($message) > 5000) {
        $erreurs[] = 'Votre message est trop long (5000 caractères au maximum).';
    }

    $cleConnu = ligne(brut('connu'));
    if ($cleConnu !== '') {
        if (!isset(CONNU[$cleConnu])) {
            $erreurs[] = 'Choisissez une réponse dans la liste « Comment nous avez-vous connus ? ».';
        } else {
            $connu = CONNU[$cleConnu];
        }
    }
} else {
    $formation = formationAutorisee(ligne(brut('formation'))) ?? '';
    if ($formation === '') {
        $erreurs[] = 'Choisissez la formation qui vous intéresse.';
    }
}

if (brut('rgpd') !== 'oui') {
    $erreurs[] = 'Cochez la case pour que nous puissions vous répondre.';
}

if ($erreurs !== []) {
    repondre(422, false, implode(' ', $erreurs));
}

// ---------------------------------------------------------------------------------------
// Limiteur : une demande par adresse IP toutes les LIMITE_SECONDES secondes
// ---------------------------------------------------------------------------------------

/**
 * Fichier vide dans le dossier temporaire du serveur (hors de public_html, privé au compte
 * chez o2switch). Son nom est une empreinte de l'adresse IP, l'adresse elle-même n'est pas
 * enregistrée. Les fichiers de plus d'une heure sont supprimés au passage.
 */
function limiteAtteinte(): bool
{
    if (LIMITE_SECONDES <= 0) {
        return false;
    }
    $dossier = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'borboleta-contact';
    if (!is_dir($dossier) && !@mkdir($dossier, 0700, true) && !is_dir($dossier)) {
        return false; // Pas de dossier temporaire : on n'empêche pas l'envoi.
    }
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    $fichier = $dossier . DIRECTORY_SEPARATOR . hash('sha256', 'borboleta|' . $ip);
    clearstatcache();
    if (is_file($fichier) && time() - (int) filemtime($fichier) < LIMITE_SECONDES) {
        return true;
    }
    @touch($fichier);

    if (random_int(1, 20) === 1) {
        foreach (glob($dossier . DIRECTORY_SEPARATOR . '*') ?: [] as $ancien) {
            if (is_file($ancien) && time() - (int) filemtime($ancien) > 3600) {
                @unlink($ancien);
            }
        }
    }
    return false;
}

if (limiteAtteinte()) {
    repondre(429, false, 'Une demande vient déjà d’être envoyée. Patientez une minute avant de réessayer.');
}

// ---------------------------------------------------------------------------------------
// E-mails
// ---------------------------------------------------------------------------------------

/** En-tête encodé en UTF-8 (accents) : « =?UTF-8?B?...?= ». */
function enTete(string $texte): string
{
    return mb_encode_mimeheader($texte, 'UTF-8', 'B', "\r\n");
}

/** « Nom <adresse> » avec le nom encodé. */
function adresseNommee(string $nom, string $adresse): string
{
    return enTete($nom) . ' <' . $adresse . '>';
}

/** Envoie un e-mail texte en UTF-8 depuis EXPEDITEUR. */
function envoyerMail(string $a, string $sujet, string $corps, array $entetes): bool
{
    $entetes = array_merge([
        'From' => adresseNommee(NOM_SITE, EXPEDITEUR),
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
    ], $entetes);
    $corps = str_replace("\n", "\r\n", $corps);
    return mail($a, enTete($sujet), quoted_printable_encode($corps), $entetes, '-f' . EXPEDITEUR);
}

$delai = DELAI_REPONSE !== '' ? DELAI_REPONSE : 'dans les meilleurs délais';
$date = (new DateTimeImmutable('now', new DateTimeZone('Europe/Paris')))->format('d/m/Y à H:i');

// 1. E-mail à l'institut, avec Reply-To du visiteur : « Répondre » écrit directement au visiteur.
if ($type === 'contact') {
    $sujet = 'Demande de contact : ' . $nom;
    $lignes = [
        'Nouvelle demande envoyée depuis le formulaire de contact du site, le ' . $date . '.',
        '',
        'Nom : ' . $nom,
        'E-mail : ' . $email,
        'Téléphone : ' . ($telephone !== '' ? $telephone : 'non indiqué'),
        'Objet : ' . $objet,
    ];
    if ($formation !== '') {
        $lignes[] = 'Formation visée : ' . $formation;
    }
    $lignes[] = 'Comment nous avez-vous connus ? ' . ($connu !== '' ? $connu : 'non indiqué');
    $lignes[] = '';
    $lignes[] = 'Message :';
    $lignes[] = $message;
} else {
    $sujet = 'Demande de dates de formation : ' . $nom;
    $lignes = [
        'Nouvelle demande « Être informée des prochaines dates », envoyée le ' . $date . '.',
        '',
        'Nom : ' . $nom,
        'E-mail : ' . $email,
        'Téléphone : ' . ($telephone !== '' ? $telephone : 'non indiqué'),
        'Formation visée : ' . $formation,
    ];
}
$lignes[] = '';
$lignes[] = 'Le visiteur a accepté la politique de confidentialité.';
$lignes[] = 'Pour lui répondre, utilisez simplement « Répondre » dans votre messagerie.';

$envoye = envoyerMail(
    DESTINATAIRE,
    $sujet,
    implode("\n", $lignes),
    ['Reply-To' => adresseNommee($nom, $email)]
);

if (!$envoye) {
    repondre(
        500,
        false,
        'L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous directement à ' . DESTINATAIRE . '.'
    );
}

// 2. E-mail de confirmation au visiteur. Le texte libre du message n'y est pas recopié,
// pour que le formulaire ne puisse pas servir à envoyer un texte choisi à un inconnu.
if ($type === 'contact') {
    $rappel = 'Objet : ' . $objet . ($formation !== '' ? ', formation ' . $formation : '');
    $intro = 'Nous avons bien reçu votre message et nous vous répondons ' . $delai . '.';
} else {
    $rappel = 'Formation : ' . $formation;
    $intro = 'Nous avons bien reçu votre demande. Nous vous prévenons dès qu’une session est ouverte,'
        . ' et nous vous répondons ' . $delai . '.';
}

$confirmation = [
    'Bonjour ' . $nom . ',',
    '',
    'Merci de votre confiance. ' . $intro,
    '',
    'Rappel de votre demande',
    $rappel,
    '',
    'Pour réserver un soin, rendez-vous sur Planity :',
    LIEN_PLANITY,
    '',
    'Nous vous accueillons au ' . ADRESSE_INSTITUT . '.',
    'Horaires :',
];
foreach (HORAIRES as $horaire) {
    $confirmation[] = $horaire;
}
array_push(
    $confirmation,
    '',
    'À très bientôt,',
    'Mariline, ' . NOM_SITE,
    '',
    'Pour compléter votre demande, répondez simplement à cet e-mail ou écrivez à ' . DESTINATAIRE . '.',
    'Vous recevez ce message parce que vous avez rempli le formulaire du site ' . NOM_SITE . '.',
    'Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet e-mail.'
);

envoyerMail(
    $email,
    'Votre demande à ' . NOM_SITE . ' est bien reçue',
    implode("\n", $confirmation),
    [
        'Reply-To' => adresseNommee(NOM_SITE, DESTINATAIRE),
        'Auto-Submitted' => 'auto-replied',
    ]
);

repondre(200, true, 'Merci, votre demande est bien envoyée.');
