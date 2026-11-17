import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LIENS_FOOTER } from '../../data/navigation';
import { ADRESSE_COMPLETE, LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { BoutonReserver } from '../bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, BoutonReserver],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly liens = LIENS_FOOTER;
  protected readonly annee = new Date().getFullYear();
}
