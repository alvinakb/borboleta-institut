import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';
import { MentionQualiopi } from '../../shared/mention-qualiopi/mention-qualiopi';

/**
 * Avis : bloc confiance (note Planity 5/5 sur 145 avis, avec lien) dans le visuel du haut.
 * Aucun avis inventé : les citations réelles viendront de Planity. Objectif : réserver un soin.
 */
@Component({
  selector: 'app-avis',
  imports: [RouterLink, Apparition, BlocCta, BoutonReserver, EmplacementImage, MentionQualiopi],
  templateUrl: './avis.html',
  styleUrl: './avis.css',
})
export class Avis {
  protected readonly info = SITE_INFO;
}
