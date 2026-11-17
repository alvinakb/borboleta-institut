// Informations pratiques et légales du site. Une seule source : ne pas les recopier en dur
// dans les templates.
//
// Informations à fournir par la cliente : tant qu’une constante ci-dessous est vide, la ligne
// correspondante est simplement masquée sur le site (rien n’est affiché aux visiteurs).
// Il suffit de la remplir puis de relancer `npm run build`.

import { RESERVATION_PLANITY } from './tarifs.generated';
import type { Horaire } from './types';

/** Numéro WhatsApp au format international, sans « + » ni espaces (ex. 33612345678). */
export const WHATSAPP_NUMERO: string = '';

/** Numéro de téléphone affiché aux visiteurs (ex. « 06 12 34 56 78 »). */
export const TELEPHONE: string = '';

/** Numéro de déclaration d’activité de l’organisme de formation (DREETS). */
export const NUMERO_DECLARATION_ACTIVITE: string = '';

/** Référence (ou lien) du certificat Qualiopi. */
export const CERTIFICAT_QUALIOPI: string = '';

/** Statut juridique (ex. « Entreprise individuelle, micro-entreprise »). */
export const STATUT_JURIDIQUE: string = '';

/**
 * Délai de réponse annoncé après l’envoi d’un formulaire (ex. « sous 48 heures ouvrées »).
 * À fixer par la cliente : tant qu’il est vide, le message dit « dans les meilleurs délais ».
 */
export const DELAI_REPONSE: string = '';

/** Lien wa.me, ou null tant que le numéro n’est pas renseigné. */
export function lienWhatsApp(): string | null {
  return WHATSAPP_NUMERO ? `https://wa.me/${WHATSAPP_NUMERO}` : null;
}

/** Lien tel:, ou null tant que le numéro n’est pas renseigné. */
export function lienTelephone(): string | null {
  return TELEPHONE ? `tel:${TELEPHONE.replace(/[^0-9+]/g, '')}` : null;
}

export const SITE_INFO = {
  nom: 'Borboleta Institut',
  signature: 'Le geste juste, transmis avec soin',
  motCle: 'drainage lymphatique à Draveil (91)',
  responsable: 'Da Costa Mariline',
  email: 'contact@borboleta-institut-drainage.fr',
  telephone: TELEPHONE,
  adresse: {
    rue: '10 allée des Grandes Pièces',
    codePostal: '91210',
    ville: 'Draveil',
    departement: 'Essonne',
    complement: 'Au sud-est de Paris',
  },
  horaires: [
    { jours: 'Lundi, mardi, jeudi, vendredi', heures: '9h à 19h30' },
    { jours: 'Mercredi', heures: '10h à 19h30' },
    { jours: 'Samedi', heures: '9h à 14h' },
    { jours: 'Dimanche', heures: 'Fermé' },
  ] as readonly Horaire[],
  planity: RESERVATION_PLANITY,
  instagram: {
    compte: '@borboletainstitut',
    url: 'https://www.instagram.com/borboletainstitut/',
  },
  avis: {
    note: 5,
    noteMax: 5,
    nombre: 145,
    source: 'Planity',
    url: RESERVATION_PLANITY,
  },
  legal: {
    siret: '914 515 150 00011',
    statutJuridique: STATUT_JURIDIQUE,
    hebergeur: {
      nom: 'o2switch',
      raisonSociale: 'SAS o2switch',
      adresse: '222 boulevard Gustave Flaubert, 63000 Clermont-Ferrand',
      site: 'https://www.o2switch.fr',
    },
    numeroDeclarationActivite: NUMERO_DECLARATION_ACTIVITE,
    certificatQualiopi: CERTIFICAT_QUALIOPI,
  },
} as const;

/** Adresse sur une ligne : « 10 allée des Grandes Pièces, 91210 Draveil ». */
export const ADRESSE_COMPLETE = `${SITE_INFO.adresse.rue}, ${SITE_INFO.adresse.codePostal} ${SITE_INFO.adresse.ville}`;

/** Lien Google Maps vers l’institut. */
export const LIEN_ITINERAIRE = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE_INFO.nom} ${ADRESSE_COMPLETE}`,
)}`;
