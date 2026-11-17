import { Component, computed, input } from '@angular/core';

import { RESERVATION_PLANITY, formaterDuree, formaterPrix } from '../../data/tarifs';
import type { Soin } from '../../data/types';

/**
 * Ligne de tarif (docs/DESIGN-SYSTEM.md, partie 5) : nom à gauche, durée en petit texte,
 * prix à droite en brun 600 et chiffres tabulaires, lien « Réserver » discret vers Planity
 * (zone tactile de 44 px). S’utilise sur un élément de liste :
 * `<li appLigneTarif [soin]="s"></li>` dans une `<ul class="liste-tarifs">`.
 * Les styles de base (.liste-tarifs, .ligne-tarif) sont dans src/styles.css.
 */
@Component({
  selector: 'li[appLigneTarif]',
  host: { class: 'ligne-tarif' },
  template: `
    <span class="ligne-tarif__nom"
      >{{ soin().nom }} <span class="ligne-tarif__duree">{{ duree() }}</span></span
    >
    <span class="ligne-tarif__droite">
      <span class="ligne-tarif__prix">{{ prix() }}</span>
      <a
        class="ligne-tarif__reserver"
        [href]="planity"
        target="_blank"
        rel="noopener"
        [attr.aria-label]="'Réserver : ' + soin().nom + ' (nouvel onglet)'"
        >Réserver</a
      >
    </span>
  `,
  styles: `
    .ligne-tarif__droite {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    /* Lien discret : pas un bouton, mais une zone tactile de 44 px. */
    .ligne-tarif__reserver {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      min-height: 44px;
      min-width: 44px;
      margin-bottom: calc(-1 * var(--esp-3));
      font-size: var(--taille-petit);
      font-weight: 600;
      color: var(--espresso);
      text-decoration: underline;
      text-decoration-color: var(--taupe);
      text-underline-offset: 0.3em;
      white-space: nowrap;
    }
    .ligne-tarif__reserver:hover {
      color: var(--brun);
      text-decoration-color: currentColor;
    }
    @media (min-width: 600px) {
      .ligne-tarif__droite {
        flex-direction: row;
        align-items: baseline;
        gap: var(--esp-5);
      }
      .ligne-tarif__reserver {
        margin-block: calc(-1 * var(--esp-3));
      }
    }
  `,
})
export class LigneTarif {
  readonly soin = input.required<Soin>();
  protected readonly planity = RESERVATION_PLANITY;
  protected readonly prix = computed(() => formaterPrix(this.soin().prix));
  protected readonly duree = computed(() => formaterDuree(this.soin().duree));
}
