import { Component, input } from '@angular/core';

import { SITE_INFO } from '../../data/site-info';

/** Bouton « Réserver » vers Planity (nouvel onglet). Principal par défaut, ou contour. */
@Component({
  selector: 'app-bouton-reserver',
  template: `
    <a
      class="bouton"
      [class.bouton--contour]="variante() === 'contour'"
      [href]="lien"
      target="_blank"
      rel="noopener"
      [attr.aria-label]="(aideAcces() || libelle()) + ' sur Planity (nouvel onglet)'"
      >{{ libelle() }}</a
    >
  `,
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class BoutonReserver {
  readonly libelle = input('Réserver');
  /** Texte complet pour les lecteurs d’écran (ex. « Réserver Miracle Face »). */
  readonly aideAcces = input('');
  readonly variante = input<'plein' | 'contour'>('plein');
  protected readonly lien = SITE_INFO.planity;
}
