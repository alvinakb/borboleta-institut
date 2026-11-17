import { Component, input } from '@angular/core';

import { LOGO_QUALIOPI_PRESENT } from '../../data/tarifs.generated';

/**
 * Mention Qualiopi : catégorie d’actions certifiée, et logo officiel
 * (public/images/qualiopi.png) affiché seulement s’il a été déposé (détecté au build par
 * scripts/generer-donnees.mjs) ET seulement sur fond clair : jamais dans le pied de page sombre,
 * qui reçoit la version texte (entrée « sombre »).
 */
@Component({
  selector: 'app-mention-qualiopi',
  template: `
    <div class="qualiopi" [class.qualiopi--sombre]="sombre()" [class.qualiopi--centre]="centre()">
      @if (logo && !sombre()) {
        <img
          class="qualiopi__logo"
          src="images/qualiopi.png"
          alt="Logo Qualiopi, processus certifié, République française"
          width="240"
          height="120"
          loading="lazy"
          decoding="async"
        />
      }
      @if (sombre()) {
        <p class="qualiopi__titre">Centre de formation certifié Qualiopi</p>
      }
      <p class="qualiopi__mention">
        La certification qualité a été délivrée au titre de la catégorie d’actions suivante :
        actions de formation.
      </p>
    </div>
  `,
  styles: `
    .qualiopi {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--esp-4);
    }
    .qualiopi--centre {
      justify-content: center;
      text-align: center;
    }
    .qualiopi__logo {
      display: block;
      height: 64px;
      width: auto;
    }
    .qualiopi--sombre {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--esp-1);
    }
    .qualiopi__titre {
      margin: 0;
      font-weight: 600;
      color: var(--fond);
    }
    .qualiopi__mention {
      margin: 0;
      max-width: 40ch;
      font-size: var(--taille-petit);
      color: var(--texte-doux);
    }
    .qualiopi--sombre .qualiopi__mention {
      color: var(--nude);
    }
  `,
})
export class MentionQualiopi {
  /** Sur fond espresso (pied de page) : version texte seule, jamais de logo. */
  readonly sombre = input(false);
  /** Centré (bandeau confiance). */
  readonly centre = input(false);
  protected readonly logo = LOGO_QUALIOPI_PRESENT;
}
