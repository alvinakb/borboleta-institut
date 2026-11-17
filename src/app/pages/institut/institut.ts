import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * L’institut et l’approche. Objectif : réserver un soin (bouton répété après chaque section).
 * Visuel plein écran sombre, puis sections claires en alternance.
 */
@Component({
  selector: 'app-institut',
  imports: [RouterLink, Apparition, BlocCta, BoutonReserver, EmplacementImage],
  templateUrl: './institut.html',
  styleUrl: './institut.css',
})
export class Institut {
  protected readonly info = SITE_INFO;
  protected readonly itineraire = LIEN_ITINERAIRE;
}
