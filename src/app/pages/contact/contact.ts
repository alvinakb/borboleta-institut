import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ADRESSE_COMPLETE,
  LIEN_ITINERAIRE,
  SITE_INFO,
  lienTelephone,
  lienWhatsApp,
} from '../../data/site-info';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, BoutonReserver],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly telephone = lienTelephone();
}
