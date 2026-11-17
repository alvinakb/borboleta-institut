import { Component, computed, input } from '@angular/core';

/**
 * Emplacement d’image en attendant les photos : fond dégradé élégant et nom du fichier attendu.
 * Pour remplacer : déposer le fichier au chemin indiqué (src/assets/images/...) puis remplacer
 * ce composant par une balise <img> (object-fit: cover pour le visuel plein écran).
 */
@Component({
  selector: 'app-emplacement-image',
  template: `
    <div
      class="emplacement"
      [class.emplacement--plein-ecran]="pleinEcran()"
      [class.emplacement--sombre]="sombre()"
      [style.aspect-ratio]="pleinEcran() ? null : ratio()"
      role="img"
      [attr.aria-label]="description()"
    >
      <span class="emplacement__fichier" aria-hidden="true">{{ fichierCoupe() }}</span>
    </div>
  `,
  styleUrl: './emplacement-image.css',
})
export class EmplacementImage {
  /** Chemin attendu de la future photo, ex. « assets/images/accueil-hero.jpg ». */
  readonly fichier = input.required<string>();
  /** Description de l’image (texte alternatif). */
  readonly description = input('');
  /** Rapport largeur / hauteur, ex. « 4 / 3 ». */
  readonly ratio = input('4 / 3');
  /** Remplit toute la hauteur de son parent (visuel plein écran). */
  readonly pleinEcran = input(false);
  readonly sombre = input(false);
  /** Nom de fichier avec un point de coupure invisible après chaque « / » (petites vignettes). */
  protected readonly fichierCoupe = computed(() => this.fichier().replaceAll('/', '/\u200b'));
}
