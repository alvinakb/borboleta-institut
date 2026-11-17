// Accès aux tarifs et helpers de calcul. Les données brutes sont dans tarifs.generated.ts.

import { CATEGORIES_SOINS, RESERVATION_PLANITY } from './tarifs.generated';
import type { CategorieSoins } from './types';

export { CATEGORIES_SOINS, RESERVATION_PLANITY };

const formatEuro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formate un montant en euros à la française : « 1 200 € ». */
export function formaterPrix(montant: number): string {
  return formatEuro.format(montant);
}

/** Durée lisible : « 30min » devient « 30 min », « 1h30 » devient « 1 h 30 ». */
export function formaterDuree(texte: string): string {
  return texte
    .replace(/(\d)\s*h\s*(\d*)/, (_, h: string, m: string) => `${h} h${m ? ' ' + m : ''}`)
    .replace(/(\d)\s*min/, '$1 min');
}

/** Retourne la catégorie correspondant à l’identifiant, ou undefined. */
export function categorieParId(id: string): CategorieSoins | undefined {
  return CATEGORIES_SOINS.find((c) => c.id === id);
}

/** Prix le plus bas d’une catégorie, ou null si elle ne contient aucun soin. */
export function prixMinimum(categorie: CategorieSoins): number | null {
  if (!categorie.soins.length) return null;
  return Math.min(...categorie.soins.map((s) => s.prix));
}

/** Texte « à partir de X € » pour une catégorie, ou null si elle n’a pas de prix. */
export function texteAPartirDe(categorie: CategorieSoins): string | null {
  const min = prixMinimum(categorie);
  return min === null ? null : `à partir de ${formaterPrix(min)}`;
}

/** Catégories qui contiennent des soins (les cartes cadeaux n’ont pas de prix fixe). */
export const CATEGORIES_AVEC_SOINS: readonly CategorieSoins[] = CATEGORIES_SOINS.filter(
  (c) => c.soins.length > 0,
);
