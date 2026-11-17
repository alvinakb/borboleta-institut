import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Un seul observateur partagé par toutes les directives de la page. */
let observateur: IntersectionObserver | null = null;

function observateurPartage(): IntersectionObserver {
  observateur ??= new IntersectionObserver(
    (entrees, obs) => {
      for (const entree of entrees) {
        if (entree.isIntersecting) {
          entree.target.classList.add('apparition--visible');
          obs.unobserve(entree.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  return observateur;
}

/**
 * Apparition douce d’un élément quand il entre dans l’écran.
 * Usage : <div appApparition> ou <li appApparition [delaiApparition]="i * 0.1">.
 * Rien n’est masqué si l’utilisatrice préfère réduire les animations, ni si le navigateur
 * ne connaît pas IntersectionObserver : le contenu reste toujours visible.
 * Styles : classes .apparition et .apparition--visible dans src/styles.css.
 */
@Directive({ selector: '[appApparition]' })
export class Apparition {
  /** Délai en secondes, pour décaler les éléments d’une même grille. */
  readonly delaiApparition = input(0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduire = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduire || !('IntersectionObserver' in window)) return;

      // Déjà à l’écran au chargement (haut de page) : on n’anime pas, pour éviter un flash.
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;

      if (this.delaiApparition()) {
        element.style.setProperty('--delai-apparition', `${this.delaiApparition()}s`);
      }
      element.classList.add('apparition');
      const obs = observateurPartage();
      obs.observe(element);
      destroyRef.onDestroy(() => obs.unobserve(element));
    });
  }
}
