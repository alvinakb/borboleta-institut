// Parcours public de la formatrice (CLAUDE.md, section Contenu). Écrire « Da Costa Mariline ».
// Jamais d’informations personnelles (adresse, date de naissance, téléphone personnel).

export interface EtapeParcours {
  readonly annee: string;
  readonly texte: string;
}

export const PARCOURS_FORMATRICE: readonly EtapeParcours[] = [
  { annee: '2021', texte: 'CAP Esthétique Cosmétique Parfumerie' },
  {
    annee: '2021',
    texte: 'Formée à la méthode Renata França : drainage lymphatique, remodelage et Miracle Face',
  },
  { annee: '2021', texte: 'Expérience en cabinet de kinésithérapie' },
  { annee: '2022', texte: 'Fondatrice de Borboleta Institut, depuis janvier 2022' },
  { annee: '2022', texte: 'Formation au rouleau anti-cellulite' },
  { annee: '2023', texte: 'Formation à la méthode Dr Vodder' },
  { annee: '2025', texte: 'Formation au Kobido' },
];

export const LANGUES_FORMATRICE: readonly string[] = ['français', 'portugais', 'anglais'];
