import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { SITE_INFO } from '../../data/site-info';
import { Accordeon } from '../../shared/accordeon/accordeon';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';

/** FAQ : en-tête simple, un accordéon par thème (un seul ouvert à la fois sur mobile). */
@Component({
  selector: 'app-faq',
  imports: [RouterLink, Accordeon, BlocCta],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly groupes = FAQ;
  protected readonly planity = SITE_INFO.planity;
}
