// Menu principal et liens du footer (décidés dans CLAUDE.md, section Menu).

import { RESERVATION_PLANITY } from './tarifs.generated';
import type { LienNav, MenuNav } from './types';

export const MENU_PRINCIPAL: readonly MenuNav[] = [
  { libelle: 'Accueil', lien: '/' },
  {
    libelle: 'L’institut',
    sousMenu: [
      { libelle: 'L’institut et l’approche', lien: '/institut' },
      { libelle: 'Nos soins', lien: '/soins' },
      { libelle: 'Tarifs', lien: '/tarifs' },
      { libelle: 'Cartes cadeaux', lien: '/cartes-cadeaux' },
      { libelle: 'Avis', lien: '/avis' },
      { libelle: 'Réserver sur Planity', lien: RESERVATION_PLANITY, externe: true },
    ],
  },
  {
    libelle: 'Centre de formation',
    sousMenu: [
      { libelle: 'Nos formations', lien: '/formations' },
      { libelle: 'Le parcours et le déroulement', lien: '/parcours' },
      { libelle: 'La formatrice', lien: '/formatrice' },
      { libelle: 'Financement', lien: '/financement' },
      { libelle: 'Calendrier des sessions', lien: '/calendrier' },
      { libelle: 'S’inscrire', lien: '/inscription' },
    ],
  },
  { libelle: 'Contact', lien: '/contact' },
];

export const LIENS_FOOTER: readonly LienNav[] = [
  { libelle: 'FAQ', lien: '/faq' },
  { libelle: 'Mentions légales', lien: '/mentions-legales' },
  { libelle: 'Politique de confidentialité', lien: '/confidentialite' },
];
