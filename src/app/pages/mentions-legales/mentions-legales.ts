import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ADRESSE_COMPLETE, SITE_INFO, lienTelephone } from '../../data/site-info';

@Component({
  selector: 'app-mentions-legales',
  imports: [RouterLink],
  templateUrl: './mentions-legales.html',
})
export class MentionsLegales {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly telephone = lienTelephone();
}
