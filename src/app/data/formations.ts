// Les cinq formations du centre de formation.
// Durées et prix des formations 2 à 5 : « nous consulter » tant qu'ils ne sont pas fournis
// (valeur null). La formation drainage corps fait 21 h sur 3 jours ; son prix n'est pas encore
// fourni non plus.

import { formaterPrix } from './tarifs';
import type { Formation } from './types';

export const NOUS_CONSULTER = 'nous consulter';

export const FORMATIONS: readonly Formation[] = [
  {
    id: 'drainage-corps',
    numero: 1,
    titre: 'Drainage lymphatique corps',
    surtitre: 'Présentiel · 21 h · 3 jours',
    accroche:
      'Trois jours pour apprendre à drainer avec la bonne pression et le bon rythme. La formation socle, à suivre en premier.',
    dureeHeures: 21,
    jours: 3,
    format: '3 jours en présentiel',
    niveau: 'Débutant accepté',
    groupe: 'Petit groupe',
    programme:
      'Anatomie du système lymphatique et voies de drainage, techniques manuelles (pression, pompage, appel et réabsorption), pratique intensive sur mannequin puis entre participants avec corrections en temps réel, indications et contre-indications.',
    prix: null,
  },
  {
    id: 'drainage-visage',
    numero: 2,
    titre: 'Drainage lymphatique visage',
    surtitre: 'Présentiel · Format à confirmer',
    accroche:
      'Le drainage du visage à visée esthétique : effet bonne mine, traits reposés, regard défatigué.',
    dureeHeures: null,
    jours: null,
    format: 'Présentiel',
    niveau: 'Drainage corps recommandé',
    groupe: 'Petit groupe',
    programme:
      'Spécificités du visage, du cou et de la nuque, protocole visage complet, dosage de la pression sur les zones sensibles, intégration du soin dans une prestation plus large.',
    prix: null,
  },
  {
    id: 'remodelage',
    numero: 3,
    titre: 'Remodelage, massage anti-cellulite',
    surtitre: 'Présentiel · Format à confirmer',
    accroche:
      'La technique qui sculpte : lisser l’aspect de la cellulite et redessiner la silhouette par des manœuvres fermes et précises.',
    dureeHeures: null,
    jours: null,
    format: 'Présentiel',
    niveau: 'Drainage corps recommandé',
    groupe: 'Petit groupe',
    programme:
      'Compréhension du tissu adipeux et de la cellulite, palper rouler, pincements et glissements, remodelage corps entier et membres inférieurs, le soin signature qui associe drainage et remodelage.',
    prix: null,
  },
  {
    id: 'post-operatoire',
    numero: 4,
    titre: 'Drainage post-opératoire, chirurgie esthétique',
    surtitre: 'Présentiel · Format à confirmer',
    accroche:
      'Accompagner la récupération après une chirurgie esthétique du visage et du corps, toujours avec l’accord du professionnel de santé qui assure le suivi.',
    dureeHeures: null,
    jours: null,
    format: 'Présentiel',
    niveau: 'Drainage corps et visage en prérequis',
    groupe: 'Petit groupe',
    programme:
      'Phases de la récupération, précautions et signaux d’alerte, protocoles adaptés visage et corps, douceur des manœuvres selon chaque zone, traçabilité des séances.',
    prix: null,
  },
  {
    id: 'kobido',
    numero: 5,
    titre: 'Lifting japonais, Kobido',
    surtitre: 'Présentiel · Format à confirmer',
    accroche:
      'La technique japonaise qui associe lissage, drainage et digitopression pour un effet rajeunissant naturel. Un soin de reconnexion, à intégrer à votre carte.',
    dureeHeures: null,
    jours: null,
    format: 'Présentiel',
    niveau: 'Ouvert, soin complémentaire',
    groupe: 'Petit groupe',
    programme:
      'Origine et principes du Kobido, lecture du visage et points de digitopression, enchaînement complet du protocole liftant, travail du rythme et de la précision, mise en valeur du soin en cabine.',
    prix: null,
  },
];

/** « 21 h sur 3 jours », ou « nous consulter ». */
export function texteDuree(f: Formation): string {
  if (f.dureeHeures === null) return NOUS_CONSULTER;
  return f.jours ? `${f.dureeHeures} h sur ${f.jours} jours` : `${f.dureeHeures} h`;
}

/** Prix formaté, ou « nous consulter ». */
export function textePrixFormation(f: Formation): string {
  return f.prix === null ? NOUS_CONSULTER : formaterPrix(f.prix);
}
