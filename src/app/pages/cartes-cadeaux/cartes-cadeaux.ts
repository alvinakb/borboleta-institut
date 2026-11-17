import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ADRESSE_COMPLETE, SITE_INFO } from '../../data/site-info';
import { categorieParId } from '../../data/tarifs';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

@Component({
  selector: 'app-cartes-cadeaux',
  imports: [RouterLink, BlocCta, EmplacementImage],
  templateUrl: './cartes-cadeaux.html',
})
export class CartesCadeaux {
  protected readonly intro = categorieParId('cartes-cadeaux')?.intro ?? '';
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
}
