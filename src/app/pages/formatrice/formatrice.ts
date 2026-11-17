import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LANGUES_FORMATRICE, PARCOURS_FORMATRICE } from '../../data/formatrice';
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
  protected readonly parcours = PARCOURS_FORMATRICE;
  protected readonly langues = LANGUES_FORMATRICE;
}
