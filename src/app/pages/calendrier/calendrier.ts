import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { DemandeFormation } from '../../shared/demande-formation/demande-formation';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Calendrier : « Prochaines sessions : nous consulter » et les mêmes cartes que
 * /formations#sessions (formulaire « Être informée des prochaines dates »).
 */
@Component({
  selector: 'app-calendrier',
  imports: [RouterLink, Apparition, BlocCta, DemandeFormation, EmplacementImage],
  templateUrl: './calendrier.html',
  styles: `
    :host {
      display: block;
    }
    .dates {
      scroll-margin-top: var(--hauteur-entete);
    }
    .dates__cartes {
      display: block;
      margin-top: var(--esp-6);
    }
  `,
})
export class Calendrier {
  private readonly defilement = inject(ViewportScroller);

  /** Si l’ancre est déjà dans l’adresse, le routeur ne refait pas défiler : on le fait ici. */
  protected allerAuxDates(): void {
    setTimeout(() => this.defilement.scrollToAnchor('dates'));
  }
}
