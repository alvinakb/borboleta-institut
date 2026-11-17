import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, BlocCta, BoutonReserver],
  templateUrl: './faq.html',
  styles: `
    details {
      border-bottom: 1px solid var(--beige);
      padding: 1rem 0;
    }
    summary {
      cursor: pointer;
      font-weight: 400;
    }
    details p {
      margin-top: 0.75rem;
    }
  `,
})
export class Faq {
  protected readonly groupes = FAQ;
}
