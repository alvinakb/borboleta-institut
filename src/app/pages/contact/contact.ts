import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ADRESSE_COMPLETE,
  DELAI_REPONSE,
  LIEN_ITINERAIRE,
  SITE_INFO,
  lienTelephone,
  lienWhatsApp,
} from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';
import { FormulaireContact } from '../../shared/formulaire-contact/formulaire-contact';

/**
 * Contact : adresse, horaires et itinéraire lisibles en 3 secondes, puis le formulaire de
 * contact (#formulaire-contact, envoyé à public/contact.php) et le bouton WhatsApp.
 */
@Component({
  selector: 'app-contact',
  imports: [RouterLink, Apparition, BoutonReserver, EmplacementImage, FormulaireContact],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly telephone = lienTelephone();
  protected readonly delai = DELAI_REPONSE || 'dans les meilleurs délais';
  private readonly defilement = inject(ViewportScroller);

  /** Si l’ancre est déjà dans l’adresse, le routeur ne refait pas défiler : on le fait ici. */
  protected allerAuFormulaire(): void {
    setTimeout(() => this.defilement.scrollToAnchor('formulaire-contact'));
  }
}
