import { Component, input } from '@angular/core';

import { LOGO_QUALIOPI_PRESENT } from '../../data/tarifs.generated';

/**
 * Mention Qualiopi : logo officiel (public/images/qualiopi.png, affiché seulement s’il a été
 * déposé, détecté au build par scripts/generer-donnees.mjs) et catégorie d’actions certifiée.
 * Le logo est toujours posé sur un fond clair, comme l’exige sa charte d’usage.
 */
@Component({
  selector: 'app-mention-qualiopi',
  template: `
    <div class="qualiopi" [class.qualiopi--sombre]="sombre()" [class.qualiopi--centre]="centre()">
      @if (logo) {
        <span class="qualiopi__logo">
          <img
            src="images/qualiopi.png"
            alt="Logo Qualiopi, processus certifié, République française"
            width="240"
            height="120"
            loading="lazy"
            decoding="async"
          />
        </span>
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
      display: inline-flex;
      padding: var(--esp-2) var(--esp-3);
      background: #fff;
      border-radius: 8px;
    }
    .qualiopi__logo img {
      display: block;
      height: 56px;
      width: auto;
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
  /** Sur fond espresso (pied de page). */
  readonly sombre = input(false);
  /** Centré (bandeau confiance). */
  readonly centre = input(false);
  protected readonly logo = LOGO_QUALIOPI_PRESENT;
}
