import { Component, input } from '@angular/core';

/**
 * Bloc d'appel à l'action, répété après les sections.
 * Les boutons sont passés en contenu : <app-bloc-cta ...><a class="bouton">...</a></app-bloc-cta>
 */
@Component({
  selector: 'app-bloc-cta',
  template: `
    <section class="cta" [class.cta--sombre]="sombre()" [attr.aria-label]="titre()">
      <div class="conteneur cta__contenu">
        @if (surtitre()) {
          <p class="surtitre">{{ surtitre() }}</p>
        }
        <h2 class="titre">
          {{ titre() }}
          @if (motCle()) {
            <em>{{ motCle() }}</em>
          }
        </h2>
        @if (texte()) {
          <p class="cta__texte">{{ texte() }}</p>
        }
        <div class="groupe-boutons">
          <ng-content />
        </div>
      </div>
    </section>
  `,
  styles: `
    .cta {
      padding-block: var(--espace-section);
      background: var(--beige);
      text-align: center;
    }
    .cta--sombre {
      background: var(--noir);
      color: var(--creme);
    }
    .cta__contenu {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .cta__texte {
      max-width: 40rem;
    }
    .groupe-boutons {
      justify-content: center;
    }
  `,
})
export class BlocCta {
  readonly surtitre = input('');
  readonly titre = input.required<string>();
  /** Mot clé affiché en italique doré après le titre. */
  readonly motCle = input('');
  readonly texte = input('');
  readonly sombre = input(false);
}
