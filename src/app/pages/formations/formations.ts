import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FORMATIONS, textePrixFormation, texteDuree } from '../../data/formations';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

@Component({
  selector: 'app-formations',
  imports: [RouterLink, BlocCta, EmplacementImage],
  templateUrl: './formations.html',
  styles: `
    .formation {
      scroll-margin-top: 6rem;
    }
    .formation + .formation {
      margin-top: 4rem;
    }
    .fiche {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
      gap: 1rem 2rem;
      margin: 1.5rem 0 0;
    }
    .fiche dt {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--dore-fonce);
    }
  `,
})
export class Formations {
  protected readonly formations = FORMATIONS;
  protected readonly texteDuree = texteDuree;
  protected readonly textePrix = textePrixFormation;
}
