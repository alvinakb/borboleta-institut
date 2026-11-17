import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ADRESSE_COMPLETE,
  LIEN_ITINERAIRE,
  SITE_INFO,
  lienTelephone,
  lienWhatsApp,
} from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Contact : adresse, horaires et itinéraire lisibles en 3 secondes, puis l’emplacement du
 * formulaire (#formulaire-contact), complété au message 4 (contact.php, o2switch).
 */
@Component({
  selector: 'app-contact',
  imports: [RouterLink, Apparition, BoutonReserver, EmplacementImage],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly telephone = lienTelephone();
  private readonly defilement = inject(ViewportScroller);

  /** Si l’ancre est déjà dans l’adresse, le routeur ne refait pas défiler : on le fait ici. */
  protected allerAuFormulaire(): void {
    setTimeout(() => this.defilement.scrollToAnchor('formulaire-contact'));
  }
}
