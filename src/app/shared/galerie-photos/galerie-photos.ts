import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { EmplacementImage } from '../emplacement-image/emplacement-image';

export interface PhotoGalerie {
  /** Chemin de la photo, ex. « assets/images/institut-1.jpg » (jamais affiché). */
  readonly fichier: string;
  /** Texte alternatif. */
  readonly description: string;
}

/**
 * Galerie de photos en bande horizontale (docs/DESIGN-SYSTEM.md, parties 6 et 7) :
 * défilement au doigt avec aimantation, deux boutons « Photo précédente » et « Photo suivante »
 * (désactivés aux extrémités), bande focusable et défilable aux flèches gauche et droite.
 * Aucun défilement automatique. Défilement doux, instantané si l’utilisatrice préfère réduire
 * les animations. Trois photos visibles sur ordinateur, une et un peu sur mobile.
 */
@Component({
  selector: 'app-galerie-photos',
  imports: [EmplacementImage],
  template: `
    <ul
      #bande
      class="galerie__bande"
      tabindex="0"
      [attr.aria-label]="libelleBande()"
      (scroll)="planifierMiseAJour()"
      (keydown)="clavier($event)"
    >
      @for (p of photos(); track p.fichier) {
        <li class="galerie__photo">
          <app-emplacement-image
            [fichier]="p.fichier"
            [description]="p.description"
            ratio="3 / 2"
          />
        </li>
      }
    </ul>
    <div class="galerie__commandes">
      <button
        #precedent
        type="button"
        class="galerie__fleche"
        aria-label="Photo précédente"
        [disabled]="auDebut()"
        (click)="avancer(-1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M14.5 5.5 8 12l6.5 6.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        #suivant
        type="button"
        class="galerie__fleche"
        aria-label="Photo suivante"
        [disabled]="aLaFin()"
        (click)="avancer(1)"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M9.5 5.5 16 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  `,
  styleUrl: './galerie-photos.css',
})
export class GaleriePhotos {
  readonly photos = input.required<readonly PhotoGalerie[]>();
  /** Nom de la bande pour les lecteurs d’écran. */
  readonly libelleBande = input('Photos, faire défiler avec les flèches gauche et droite');

  protected readonly auDebut = signal(true);
  protected readonly aLaFin = signal(false);

  private readonly bande = viewChild.required<ElementRef<HTMLUListElement>>('bande');
  private readonly precedent = viewChild.required<ElementRef<HTMLButtonElement>>('precedent');
  private readonly suivant = viewChild.required<ElementRef<HTMLButtonElement>>('suivant');
  private image = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.mettreAJour();
      const surRedimension = () => this.planifierMiseAJour();
      window.addEventListener('resize', surRedimension, { passive: true });
      destroyRef.onDestroy(() => {
        window.removeEventListener('resize', surRedimension);
        cancelAnimationFrame(this.image);
      });
    });
  }

  /** Avance ou recule d’une photo. */
  protected avancer(sens: 1 | -1): void {
    const bande = this.bande().nativeElement;
    const items = bande.children as HTMLCollectionOf<HTMLElement>;
    if (items.length < 2) return;
    const pas = items[1].offsetLeft - items[0].offsetLeft;
    const max = bande.scrollWidth - bande.clientWidth;
    const indice = Math.round(bande.scrollLeft / pas) + sens;
    const reduire = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bande.scrollTo({
      left: Math.max(0, Math.min(max, indice * pas)),
      behavior: reduire ? 'auto' : 'smooth',
    });
  }

  protected clavier(e: KeyboardEvent): void {
    if (e.target !== this.bande().nativeElement) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.avancer(e.key === 'ArrowRight' ? 1 : -1);
    }
  }

  protected planifierMiseAJour(): void {
    cancelAnimationFrame(this.image);
    this.image = requestAnimationFrame(() => this.mettreAJour());
  }

  private mettreAJour(): void {
    const bande = this.bande().nativeElement;
    const max = bande.scrollWidth - bande.clientWidth;
    const debut = bande.scrollLeft <= 2;
    const fin = bande.scrollLeft >= max - 2;
    // Le bouton qui avait le focus va être désactivé : on garde le focus sur l’autre flèche.
    const actif = document.activeElement;
    if (fin && actif === this.suivant().nativeElement && !debut) {
      this.precedent().nativeElement.focus();
    } else if (debut && actif === this.precedent().nativeElement && !fin) {
      this.suivant().nativeElement.focus();
    }
    this.auDebut.set(debut);
    this.aLaFin.set(fin);
  }
}
