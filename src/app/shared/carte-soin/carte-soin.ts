import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO } from '../../data/site-info';
import { lienPageSoin } from '../../data/soins-detail';
import { texteAPartirDe } from '../../data/tarifs';
import type { CategorieSoins } from '../../data/types';
import { EmplacementImage } from '../emplacement-image/emplacement-image';

/**
 * Carte d’une catégorie de soins (docs/DESIGN-SYSTEM.md, partie 5) : image 4:3, nom,
 * une ligne de description, durée et « à partir de X € » en bas, lien « Réserver » discret.
 * Toute la carte est cliquable vers le détail (lien du titre étendu à la carte).
 */
@Component({
  selector: 'app-carte-soin',
  imports: [RouterLink, EmplacementImage],
  template: `
    <article class="carte" [attr.id]="categorie().id">
      <app-emplacement-image [fichier]="'assets/images/soin-' + categorie().id + '.jpg'" />
      <div class="carte__corps">
        <h3 class="carte__titre">
          <a class="carte__lien" [routerLink]="lien().lien" [fragment]="lien().fragment">{{
            categorie().titre
          }}</a>
        </h3>
        <p class="carte__intro">{{ categorie().intro }}</p>
        <div class="carte__bas">
          <p class="carte__infos">
            @if (duree(); as d) {
              <span class="carte__duree">{{ d }}</span>
            }
            @if (aPartirDe(); as prix) {
              <span class="carte__prix">{{ prix }}</span>
            }
          </p>
          <a
            class="carte__reserver"
            [href]="planity"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="'Réserver : ' + categorie().titre + ' sur Planity (nouvel onglet)'"
            >Réserver</a
          >
        </div>
      </div>
    </article>
  `,
  styleUrl: './carte-soin.css',
})
export class CarteSoin {
  readonly categorie = input.required<CategorieSoins>();
  /** Page de détail /soins/<id>, ou la catégorie sur la page Tarifs (offres, cures). */
  protected readonly lien = computed(() => lienPageSoin(this.categorie().id));
  protected readonly planity = SITE_INFO.planity;
  protected readonly aPartirDe = computed(() => texteAPartirDe(this.categorie()));
  /** Durée du soin le moins cher de la catégorie (celui du « à partir de »). */
  protected readonly duree = computed(() => {
    const soins = this.categorie().soins;
    if (!soins.length) return null;
    const moinsCher = soins.reduce((a, b) => (b.prix < a.prix ? b : a));
    return moinsCher.duree.replace(/(\d)\s*min/, '$1 min');
  });
}
