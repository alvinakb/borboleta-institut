import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { MEDIAS_PRESENTS } from '../../data/tarifs.generated';

const PRESENTS = new Set(MEDIAS_PRESENTS);
const LARGEURS_WEBP = [480, 960, 1600] as const;

/** Connexion réseau (API Network Information, absente de certains navigateurs). */
interface Connexion {
  readonly saveData?: boolean;
  readonly effectiveType?: string;
}

/**
 * Vrai si une vidéo décorative peut être chargée : pas de préférence « réduire les animations »,
 * pas de mode économie de données, pas de connexion lente (2G partout, 3G aussi sur mobile).
 */
function videoAutorisee(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connexion = (navigator as Navigator & { connection?: Connexion }).connection;
  if (connexion?.saveData) return false;
  const type = connexion?.effectiveType ?? '';
  if (type === 'slow-2g' || type === '2g') return false;
  if (type === '3g' && window.innerWidth < 768) return false;
  return true;
}

/**
 * Image d’un emplacement photo (docs/DESIGN-SYSTEM.md, partie 6).
 *
 * Détection automatique : la liste MEDIAS_PRESENTS (générée par « npm run donnees » à partir du
 * contenu de src/assets/images/) dit si le fichier attendu a été déposé.
 * - Fichier présent : vraie photo <img> (width/height, alt = description, chargement différé
 *   sauf [prioritaire] pour l’image du haut), même ratio et même rayon que l’emplacement.
 *   Si des versions WebP « nom-480.webp », « nom-960.webp », « nom-1600.webp » sont aussi
 *   présentes, elles sont proposées en srcset.
 * - Fichier absent : aplat --fond-alt (ou --espresso avec voile) et papillon en filigrane,
 *   masqué aux lecteurs d’écran. Aucun nom de fichier visible : le chemin attendu est gardé
 *   dans data-photo et listé dans docs/PHOTOS.md.
 *
 * [video] (grand visuel de l’accueil) : vidéo courte en boucle, muette, décorative, insérée
 * seulement côté navigateur et seulement si videoAutorisee() ; sinon la photo (ou l’aplat).
 */
@Component({
  selector: 'app-emplacement-image',
  template: `
    <div
      class="emplacement"
      [class.emplacement--plein-ecran]="pleinEcran()"
      [class.emplacement--sombre]="sombre()"
      [class.emplacement--photo]="photoPresente()"
      [class.emplacement--zoom-lent]="zoomLent() && photoPresente() && !lireVideo()"
      [style.aspect-ratio]="pleinEcran() ? null : ratio()"
      [attr.data-photo]="fichier()"
      [attr.data-description]="description() || null"
      [attr.aria-hidden]="photoPresente() && description() ? null : 'true'"
    >
      @if (photoPresente()) {
        <picture>
          @if (srcsetWebp()) {
            <source
              type="image/webp"
              [attr.srcset]="srcsetWebp()"
              [attr.sizes]="taillesEffectives()"
            />
          }
          <img
            class="emplacement__photo"
            [src]="fichier()"
            [alt]="description()"
            [attr.width]="dimensions().largeur"
            [attr.height]="dimensions().hauteur"
            [attr.loading]="prioritaire() ? 'eager' : 'lazy'"
            [attr.fetchpriority]="prioritaire() ? 'high' : null"
            decoding="async"
          />
        </picture>
      } @else {
        <img
          class="emplacement__papillon"
          src="images/papillon.png"
          alt=""
          width="400"
          height="243"
          loading="lazy"
          decoding="async"
        />
      }
      @if (lireVideo()) {
        <video
          #video
          class="emplacement__video"
          autoplay
          muted
          loop
          playsinline
          disablepictureinpicture
          preload="metadata"
          [attr.poster]="photoPresente() ? fichier() : null"
          tabindex="-1"
        >
          <source [src]="sourceVideo()" type="video/mp4" />
        </video>
      }
    </div>
    @if (lireVideo()) {
      <button
        type="button"
        class="emplacement__pause"
        [attr.aria-label]="
          enPause() ? 'Relancer la vidéo de fond' : 'Mettre en pause la vidéo de fond'
        "
        (click)="basculerPause()"
      >
        @if (enPause()) {
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
          </svg>
        }
      </button>
    }
  `,
  styleUrl: './emplacement-image.css',
})
export class EmplacementImage {
  /** Chemin de la photo, ex. « assets/images/accueil-hero.jpg » (jamais affiché). */
  readonly fichier = input.required<string>();
  /** Texte alternatif de la photo. Vide : image décorative (alt=""), masquée aux lecteurs d’écran. */
  readonly description = input('');
  /** Rapport largeur / hauteur, ex. « 4 / 3 ». */
  readonly ratio = input('4 / 3');
  /** Remplit toute la hauteur de son parent (visuel plein écran). */
  readonly pleinEcran = input(false);
  /** Aplat espresso avec voile (visuels sombres plein écran). */
  readonly sombre = input(false);
  /** Image du haut de page : chargement immédiat et prioritaire (pas de lazy). */
  readonly prioritaire = input(false);
  /** Valeur « sizes » pour le srcset WebP (par défaut : pleine largeur ou demi-largeur). */
  readonly tailles = input('');
  /** Zoom très lent sur la photo (grand visuel de l’accueil sans vidéo). */
  readonly zoomLent = input(false);
  /** Vidéo décorative en boucle, ex. « assets/images/accueil-hero.mp4 » (si présente). */
  readonly video = input('');

  protected readonly photoPresente = computed(() => PRESENTS.has(this.fichier()));

  protected readonly dimensions = computed(() => {
    if (this.pleinEcran()) return { largeur: 1600, hauteur: 900 };
    const [l, h] = this.ratio()
      .split('/')
      .map((n) => parseFloat(n));
    return l > 0 && h > 0
      ? { largeur: 1600, hauteur: Math.round((1600 * h) / l) }
      : { largeur: 1600, hauteur: 1200 };
  });

  protected readonly taillesEffectives = computed(
    () => this.tailles() || (this.pleinEcran() ? '100vw' : '(min-width: 1024px) 50vw, 100vw'),
  );

  protected readonly srcsetWebp = computed(() => {
    const base = this.fichier().replace(/\.(jpe?g|png)$/i, '');
    return LARGEURS_WEBP.filter((l) => PRESENTS.has(`${base}-${l}.webp`))
      .map((l) => `${base}-${l}.webp ${l}w`)
      .join(', ');
  });

  /** Décidé dans le navigateur, avant d’insérer la source : la vidéo n’est jamais téléchargée pour rien. */
  protected readonly lireVideo = signal(false);
  protected readonly sourceVideo = signal('');
  protected readonly enPause = signal(false);
  private readonly elementVideo = viewChild<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const video = this.video();
      if (!video || !PRESENTS.has(video) || !videoAutorisee()) return;
      // Version 1280 × 720 pour mobile si elle a été déposée (« nom-720.mp4 »).
      const mobile = video.replace(/\.mp4$/i, '-720.mp4');
      this.sourceVideo.set(window.innerWidth < 768 && PRESENTS.has(mobile) ? mobile : video);
      this.lireVideo.set(true);

      // Préférence changée en cours de visite : on retire la vidéo, la photo fixe reste.
      const requete = window.matchMedia('(prefers-reduced-motion: reduce)');
      const surChangement = () => requete.matches && this.lireVideo.set(false);
      requete.addEventListener('change', surChangement);
      destroyRef.onDestroy(() => requete.removeEventListener('change', surChangement));
    });

    // Lecture muette garantie (certains navigateurs ignorent l’attribut muted posé par le modèle).
    effect(() => {
      const v = this.elementVideo()?.nativeElement;
      if (!v) return;
      v.muted = true;
      v.play().catch(() => this.enPause.set(true));
    });
  }

  protected basculerPause(): void {
    const v = this.elementVideo()?.nativeElement;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
      this.enPause.set(false);
    } else {
      v.pause();
      this.enPause.set(true);
    }
  }
}
