import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES_AVEC_SOINS, formaterPrix } from '../../data/tarifs';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-tarifs',
  imports: [RouterLink, BlocCta, BoutonReserver],
  templateUrl: './tarifs.html',
  styles: `
    .categorie {
      scroll-margin-top: 6rem;
    }
    .categorie + .categorie {
      margin-top: 3.5rem;
    }
    .liste-tarifs {
      list-style: none;
      margin: 1.5rem 0 0;
      padding: 0;
      border-top: 1px solid var(--beige);
    }
    .ligne {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--beige);
    }
    .ligne__nom {
      flex: 1 1 16rem;
      min-width: 0;
    }
    .ligne__duree {
      font-size: 0.9rem;
      opacity: 0.75;
    }
    .ligne__prix {
      font-family: var(--police-titre);
      font-size: 1.35rem;
      font-weight: 500;
      color: var(--dore-texte);
      white-space: nowrap;
    }
  `,
})
export class Tarifs {
  protected readonly categories = CATEGORIES_AVEC_SOINS;
  protected readonly formaterPrix = formaterPrix;
}
