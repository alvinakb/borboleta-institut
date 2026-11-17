import { Component, input } from '@angular/core';

/**
 * Emplacement d'image en attendant les photos : fond dégradé élégant et nom du fichier attendu.
 * Pour remplacer : déposer le fichier au chemin indiqué (src/assets/images/...) puis remplacer
 * ce composant par une balise <img>.
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
      <span class="emplacement__fichier" aria-hidden="true">{{ fichier() }}</span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .emplacement {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 1rem;
      background:
        radial-gradient(circle at 25% 20%, rgba(233, 203, 134, 0.45), transparent 55%),
        linear-gradient(135deg, var(--beige) 0%, var(--creme) 45%, #d9c39c 100%);
      overflow: hidden;
    }
    .emplacement--sombre {
      background:
        radial-gradient(circle at 70% 30%, rgba(233, 203, 134, 0.25), transparent 55%),
        linear-gradient(135deg, var(--noir) 0%, var(--anthracite) 100%);
    }
    .emplacement--plein-ecran {
      min-height: min(85vh, 760px);
    }
    .emplacement__fichier {
      font-family: var(--police-texte);
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      color: var(--anthracite);
      background: rgba(244, 241, 235, 0.8);
      padding: 0.25rem 0.5rem;
      border-radius: 2px;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
  `,
})
export class EmplacementImage {
  /** Chemin attendu de la future photo, ex. « assets/images/accueil-hero.jpg ». */
  readonly fichier = input.required<string>();
  /** Description de l'image (texte alternatif). */
  readonly description = input('');
  /** Rapport largeur / hauteur, ex. « 4 / 3 ». */
  readonly ratio = input('4 / 3');
  readonly pleinEcran = input(false);
  readonly sombre = input(false);
}
