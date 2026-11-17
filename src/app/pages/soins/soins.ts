import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES_AVEC_SOINS } from '../../data/tarifs';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { CarteSoin } from '../../shared/carte-soin/carte-soin';

@Component({
  selector: 'app-soins',
  imports: [RouterLink, BlocCta, BoutonReserver, CarteSoin],
  templateUrl: './soins.html',
})
export class Soins {
  protected readonly categories = CATEGORIES_AVEC_SOINS;
}
