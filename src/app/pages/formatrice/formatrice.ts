import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LANGUES_FORMATRICE, PARCOURS_FORMATRICE } from '../../data/formatrice';
import { SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * La formatrice, Da Costa Mariline. Jamais de photo de son visage : des mains, ou le logo.
 * Objectif : demander une formation (/formations#sessions).
 */
@Component({
  selector: 'app-formatrice',
  imports: [RouterLink, Apparition, BlocCta, EmplacementImage],
  templateUrl: './formatrice.html',
  styleUrl: './formatrice.css',
})
export class Formatrice {
  protected readonly info = SITE_INFO;
  protected readonly parcours = PARCOURS_FORMATRICE;
  protected readonly langues = LANGUES_FORMATRICE;
}
