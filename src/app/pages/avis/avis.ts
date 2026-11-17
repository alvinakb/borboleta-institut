import { Component } from '@angular/core';

import { SITE_INFO } from '../../data/site-info';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-avis',
  imports: [BlocCta, BoutonReserver],
  templateUrl: './avis.html',
})
export class Avis {
  protected readonly info = SITE_INFO;
}
