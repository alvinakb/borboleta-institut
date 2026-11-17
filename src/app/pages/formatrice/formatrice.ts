import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO } from '../../data/site-info';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

@Component({
  selector: 'app-formatrice',
  imports: [RouterLink, BlocCta, EmplacementImage],
  templateUrl: './formatrice.html',
})
export class Formatrice {
  protected readonly info = SITE_INFO;
  protected readonly parcours = [
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
  protected readonly langues = ['français', 'portugais', 'anglais'];
}
