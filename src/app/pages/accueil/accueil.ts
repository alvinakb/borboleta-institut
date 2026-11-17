import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { FORMATIONS, texteDuree } from '../../data/formations';
import { SITE_INFO } from '../../data/site-info';
import { categorieParId } from '../../data/tarifs';
import type { CategorieSoins } from '../../data/types';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { CarteSoin } from '../../shared/carte-soin/carte-soin';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

const SOINS_A_LA_UNE = ['drainage-renata-franca', 'miracle-face', 'remodelage'];

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, BlocCta, BoutonReserver, CarteSoin, EmplacementImage],
  templateUrl: './accueil.html',
})
export class Accueil {
  protected readonly info = SITE_INFO;
  protected readonly soins = SOINS_A_LA_UNE.map(categorieParId).filter(
    (c): c is CategorieSoins => !!c,
  );
  protected readonly formations = FORMATIONS;
  protected readonly texteDuree = texteDuree;
  protected readonly questions = FAQ[0].questions.slice(0, 3);
}
