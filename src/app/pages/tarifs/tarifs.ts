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
      border-top: 1px solid var(--ligne);
    }
    .ligne {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--ligne);
    }
    .ligne__nom {
      flex: 1 1 16rem;
      min-width: 0;
    }
    .ligne__duree {
      font-size: var(--taille-petit);
      color: var(--texte-doux);
    }
    /* Prix : brun 600, chiffres tabulaires (6,4:1 sur --fond). */
    .ligne__prix {
      font-weight: 600;
      color: var(--brun);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .sommaire {
      display: flex;
      flex-wrap: wrap;
      gap: var(--esp-2) var(--esp-5);
      margin-top: var(--esp-5);
    }
  `,
})
export class Tarifs {
  protected readonly categories = CATEGORIES_AVEC_SOINS;
  protected readonly formaterPrix = formaterPrix;
}
