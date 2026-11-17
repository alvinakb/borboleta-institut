import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { Accordeon } from '../../shared/accordeon/accordeon';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, Accordeon, BlocCta, BoutonReserver],
  templateUrl: './faq.html',
})
export class Faq {
  protected readonly groupes = FAQ;
}
