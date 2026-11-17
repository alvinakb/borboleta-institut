import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { texteAPartirDe } from '../../data/tarifs';
import type { CategorieSoins } from '../../data/types';
import { BoutonReserver } from '../bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../emplacement-image/emplacement-image';

/** Carte d’une catégorie de soins : « à partir de X € » calculé depuis les données + Réserver. */
@Component({
  selector: 'app-carte-soin',
  imports: [RouterLink, BoutonReserver, EmplacementImage],
  template: `
    <article class="carte" [attr.id]="categorie().id">
      <app-emplacement-image
        [fichier]="'assets/images/soin-' + categorie().id + '.jpg'"
        [description]="categorie().titre"
        ratio="3 / 2"
      />
      <div class="carte__corps">
        <h3 class="carte__titre">{{ categorie().titre }}</h3>
        <p class="carte__intro">{{ categorie().intro }}</p>
        @if (aPartirDe(); as prix) {
          <p class="carte__prix">{{ prix }}</p>
        }
        <div class="carte__actions">
          <app-bouton-reserver [aideAcces]="'Réserver : ' + categorie().titre" />
          <a class="lien-fleche" routerLink="/tarifs" [fragment]="categorie().id">Voir le détail</a>
        </div>
      </div>
    </article>
  `,
  styleUrl: './carte-soin.css',
})
export class CarteSoin {
  readonly categorie = input.required<CategorieSoins>();
  protected readonly aPartirDe = computed(() => texteAPartirDe(this.categorie()));
}
