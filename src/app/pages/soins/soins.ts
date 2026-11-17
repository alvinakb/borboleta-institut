import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES_AVEC_SOINS } from '../../data/tarifs';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { CarteSoin } from '../../shared/carte-soin/carte-soin';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Nos soins : visuel plein écran, cartes de soin (3 par ligne sur ordinateur, 2 sur tablette,
 * 1 sur mobile), rappel post-opératoire, appel à l’action. Objectif : réserver un soin.
 */
@Component({
  selector: 'app-soins',
  imports: [RouterLink, Apparition, BlocCta, BoutonReserver, CarteSoin, EmplacementImage],
  templateUrl: './soins.html',
  styleUrl: './soins.css',
})
export class Soins {
  protected readonly categories = CATEGORIES_AVEC_SOINS;
  private readonly defilement = inject(ViewportScroller);

  /** Si l’ancre est déjà dans l’adresse, le routeur ne refait pas défiler : on le fait ici. */
  protected allerALaListe(): void {
    setTimeout(() => this.defilement.scrollToAnchor('liste-soins'));
  }
}
