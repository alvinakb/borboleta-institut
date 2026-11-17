import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { A_COMPLETER, ADRESSE_COMPLETE, SITE_INFO } from '../../data/site-info';

@Component({
  selector: 'app-mentions-legales',
  imports: [RouterLink],
  templateUrl: './mentions-legales.html',
})
export class MentionsLegales {
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly aCompleter = A_COMPLETER;
}
