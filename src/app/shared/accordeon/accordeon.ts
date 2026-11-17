import { Component, input, signal } from '@angular/core';

import type { QuestionFaq } from '../../data/faq';

let compteur = 0;

/**
 * Accordéon de questions fréquentes (docs/DESIGN-SYSTEM.md, partie 5) : bouton +
 * aria-expanded + aria-controls. Sur mobile (moins de 960 px), une seule réponse ouverte à la
 * fois ; sur ordinateur, plusieurs peuvent rester ouvertes.
 */
@Component({
  selector: 'app-accordeon',
  template: `
    <div class="accordeon">
      @for (q of questions(); track q.question; let i = $index) {
        <div class="accordeon__item">
          <h3 class="accordeon__titre">
            <button
              type="button"
              class="accordeon__bouton"
              [id]="prefixe + '-bouton-' + i"
              [attr.aria-expanded]="ouvertes().has(i)"
              [attr.aria-controls]="prefixe + '-reponse-' + i"
              (click)="basculer(i)"
            >
              <span>{{ q.question }}</span>
              <span class="accordeon__icone" aria-hidden="true"></span>
            </button>
          </h3>
          <div
            class="accordeon__reponse"
            role="region"
            [id]="prefixe + '-reponse-' + i"
            [attr.aria-labelledby]="prefixe + '-bouton-' + i"
            [hidden]="!ouvertes().has(i)"
          >
            <p>{{ q.reponse }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './accordeon.css',
})
export class Accordeon {
  readonly questions = input.required<readonly QuestionFaq[]>();
  protected readonly prefixe = `faq-${++compteur}`;
  protected readonly ouvertes = signal<ReadonlySet<number>>(new Set());

  protected basculer(index: number): void {
    const unSeul = window.matchMedia('(max-width: 959px)').matches;
    this.ouvertes.update((actuelles) => {
      if (actuelles.has(index)) {
        const suite = new Set(actuelles);
        suite.delete(index);
        return suite;
      }
      return unSeul ? new Set([index]) : new Set(actuelles).add(index);
    });
  }
}
