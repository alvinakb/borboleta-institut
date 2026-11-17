import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ADRESSE_COMPLETE, SITE_INFO } from '../../data/site-info';

@Component({
  selector: 'app-confidentialite',
  imports: [RouterLink],
  templateUrl: './confidentialite.html',
})
export class Confidentialite {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
}
