import { Injectable } from '@angular/core';

/**
 * Résultat d’un envoi :
 * - « envoye » : contact.php a répondu {"ok": true} ;
 * - « test » : la réponse n’est pas le JSON attendu (ng serve ou serveur de test qui n’exécute
 *   pas le PHP : contact.php n’existe pas ou renvoie la page du site) ;
 * - « erreur » : contact.php a refusé la demande ({"ok": false}) ou le réseau a échoué.
 */
export type ResultatEnvoi =
  | { readonly statut: 'envoye' }
  | { readonly statut: 'test' }
  | { readonly statut: 'erreur'; readonly message?: string };

/** Script d’envoi, chemin relatif (le site peut être publié dans un sous-dossier). */
export const SCRIPT_ENVOI = 'contact.php';

/** Texte affiché quand le PHP n’est pas exécuté (CLAUDE.md : en local, message de test). */
export const MESSAGE_MODE_TEST = 'Mode test : le formulaire sera actif une fois le site en ligne.';

/**
 * Envoi des formulaires du site vers public/contact.php (o2switch exécute le PHP).
 * Les champs sont envoyés en FormData (POST). Chaque formulaire ajoute :
 * - « type » : nature de la demande (ex. « formation-dates », « contact ») ;
 * - « site_web » : champ piège anti-spam, laissé vide par les humains ;
 * - « debut » : horodatage d’ouverture du formulaire (secondes Unix), pour le délai minimum.
 * Réutilisable par le formulaire de contact.
 */
@Injectable({ providedIn: 'root' })
export class EnvoiFormulaire {
  async envoyer(champs: Readonly<Record<string, string | boolean>>): Promise<ResultatEnvoi> {
    const donnees = new FormData();
    for (const [nom, valeur] of Object.entries(champs)) {
      if (typeof valeur === 'boolean') {
        if (valeur) donnees.append(nom, 'oui');
      } else {
        donnees.append(nom, valeur);
      }
    }

    let reponse: Response;
    try {
      reponse = await fetch(SCRIPT_ENVOI, {
        method: 'POST',
        body: donnees,
        headers: { Accept: 'application/json' },
      });
    } catch {
      return {
        statut: 'erreur',
        message: 'La connexion a échoué. Vérifiez votre connexion puis réessayez.',
      };
    }

    let corps: unknown;
    try {
      corps = await reponse.json();
    } catch {
      // Pas de JSON : le PHP n’est pas exécuté (ng serve, serveur de test).
      return { statut: 'test' };
    }

    if (corps && typeof corps === 'object' && 'ok' in corps) {
      const r = corps as { ok: unknown; message?: unknown };
      if (r.ok === true) return { statut: 'envoye' };
      return {
        statut: 'erreur',
        message: typeof r.message === 'string' ? r.message : undefined,
      };
    }
    return { statut: 'test' };
  }
}

/** Horodatage à placer dans le champ « debut » à l’ouverture du formulaire (secondes Unix). */
export function horodatage(): string {
  return String(Math.floor(Date.now() / 1000));
}
