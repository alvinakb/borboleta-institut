import { Component, computed, input } from '@angular/core';

import { Apparition } from '../apparition/apparition';

/**
 * Bloc d’appel à l’action, répété après les sections.
 * Les boutons sont passés en contenu : un bouton principal, au plus un secondaire.
 * <app-bloc-cta titre="..." texte="..."><a class="bouton">...</a></app-bloc-cta>
 * Fond : clair (--fond) par défaut, [alt]="true" pour --fond-alt, [sombre]="true" pour --espresso.
 * Jamais deux sections sombres à la suite.
 */
@Component({
  selector: 'app-bloc-cta',
  imports: [Apparition],
  template: `
    <section
      class="cta"
      [class.cta--alt]="alt() && !sombre()"
      [class.fond-sombre]="sombre()"
      [attr.aria-label]="titreComplet()"
    >
      <div class="conteneur cta__contenu" appApparition>
        @if (surtitre()) {
          <p class="surtitre">{{ surtitre() }}</p>
        }
        <h2 class="titre">{{ titreComplet() }}</h2>
        @if (texte()) {
          <p class="cta__texte">{{ texte() }}</p>
        }
        <div class="groupe-boutons">
          <ng-content />
        </div>
      </div>
    </section>
  `,
  styleUrl: './bloc-cta.css',
})
export class BlocCta {
  readonly surtitre = input('');
  readonly titre = input.required<string>();
  /** Fin du titre (écrite dans le même style que le titre, sans mise en valeur décorative). */
  readonly motCle = input('');
  readonly texte = input('');
  readonly sombre = input(false);
  readonly alt = input(false);
  protected readonly titreComplet = computed(() =>
    [this.titre(), this.motCle()].filter(Boolean).join(' '),
  );
}
