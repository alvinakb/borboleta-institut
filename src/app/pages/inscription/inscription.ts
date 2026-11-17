import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO, lienTelephone, lienWhatsApp } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * S’inscrire : page courte, complémentaire de /formations. Les façons de s’inscrire (site,
 * téléphone ou WhatsApp quand le numéro est renseigné, CPF) ; la demande principale se fait sur
 * /formations#sessions.
 */
@Component({
  selector: 'app-inscription',
  imports: [RouterLink, Apparition, BlocCta, EmplacementImage],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  protected readonly whatsapp = lienWhatsApp();
  protected readonly telephone = lienTelephone();
  protected readonly numero = SITE_INFO.telephone;
}
