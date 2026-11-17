import { Component, input } from '@angular/core';

/**
 * Emplacement d’image en attendant les photos (docs/DESIGN-SYSTEM.md, partie 6) :
 * aplat --fond-alt (ou --espresso avec voile pour les visuels sombres) et papillon du logo
 * en filigrane très léger. Aucun nom de fichier n’est affiché : le chemin attendu est gardé
 * dans l’attribut data-photo et listé dans docs/PHOTOS.md.
 *
 * Pour remplacer : déposer la photo (AVIF/WebP + JPG, 480/960/1600 px) puis remplacer ce
 * composant par une balise <img> ou <picture> avec width/height, srcset et loading="lazy"
 * (sauf l’image du haut de page), object-fit: cover pour le visuel plein écran.
 */
@Component({
  selector: 'app-emplacement-image',
  template: `
    <div
      class="emplacement"
      [class.emplacement--plein-ecran]="pleinEcran()"
      [class.emplacement--sombre]="sombre()"
      [style.aspect-ratio]="pleinEcran() ? null : ratio()"
      [attr.data-photo]="fichier()"
      [attr.role]="description() ? 'img' : null"
      [attr.aria-label]="description() || null"
      [attr.aria-hidden]="description() ? null : 'true'"
    >
      <img
        class="emplacement__papillon"
        src="images/papillon.png"
        alt=""
        aria-hidden="true"
        width="400"
        height="243"
        loading="lazy"
        decoding="async"
      />
    </div>
  `,
  styleUrl: './emplacement-image.css',
})
export class EmplacementImage {
  /** Chemin attendu de la future photo, ex. « assets/images/accueil-hero.jpg » (non affiché). */
  readonly fichier = input.required<string>();
  /** Description de l’image (texte alternatif). Vide : image décorative, ignorée des lecteurs d’écran. */
  readonly description = input('');
  /** Rapport largeur / hauteur, ex. « 4 / 3 ». */
  readonly ratio = input('4 / 3');
  /** Remplit toute la hauteur de son parent (visuel plein écran). */
  readonly pleinEcran = input(false);
  /** Aplat espresso avec voile (visuels sombres plein écran). */
  readonly sombre = input(false);
}
