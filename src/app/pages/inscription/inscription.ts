import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO, lienTelephone, lienWhatsApp } from '../../data/site-info';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';

@Component({
  selector: 'app-inscription',
  imports: [RouterLink, BlocCta],
  templateUrl: './inscription.html',
})
export class Inscription {
  protected readonly whatsapp = lienWhatsApp();
  protected readonly telephone = lienTelephone();
  protected readonly numero = SITE_INFO.telephone;
}
