import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { MENU_PRINCIPAL } from '../../data/navigation';
import type { MenuNav } from '../../data/types';
import { BoutonReserver } from '../bouton-reserver/bouton-reserver';

/** Délai avant fermeture quand la souris quitte un menu déroulant (ms). */
const DELAI_FERMETURE_SURVOL = 250;

/**
 * En-tête : logo, menu principal avec deux menus déroulants (L’institut, Centre de formation),
 * menu burger sous 1180 px.
 *
 * - Ordinateur (souris, 1180 px et plus) : le sous-menu s’ouvre au survol, se referme avec un
 *   petit délai quand la souris s’en va ; il s’ouvre aussi au clic et au clavier.
 * - Mobile / tactile : ouverture au toucher dans le menu burger.
 * - Clavier : Entrée ou Espace sur le bouton ouvre/ferme, Échap ferme et rend le focus au
 *   bouton, aria-expanded est tenu à jour. Le sous-menu se ferme quand le focus en sort.
 * - Tout clic sur un lien du menu (y compris celui de la page en cours) ferme tout.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, BoutonReserver],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:click)': 'clicDocument($event)',
    '(keydown.escape)': 'echap()',
    '(window:scroll)': 'surDefilement()',
    '[class.defile]': 'defile()',
    '[class.menu-ouvert]': 'menuMobileOuvert()',
  },
})
export class Header {
  protected readonly menu = MENU_PRINCIPAL;
  /** Index du sous-menu ouvert, ou null. */
  protected readonly sousMenuOuvert = signal<number | null>(null);
  protected readonly menuMobileOuvert = signal(false);
  /** Adresse de la page en cours, pour marquer la rubrique active du menu. */
  private readonly url = signal('');
  /** Vrai dès que la page a défilé : ombre légère sous l’en-tête. */
  protected readonly defile = signal(false);

  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Le sous-menu ouvert l’a été par survol (et non par clic ou clavier). */
  private ouvertParSurvol = false;
  private minuteurFermeture: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((e) => {
        this.url.set(e.urlAfterRedirects);
        this.toutFermer();
      });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.minuteurFermeture));
  }

  /** Lien d’évitement : donne le focus au contenu sans changer de page (le <base href> ferait revenir à l’accueil). */
  allerAuContenu(evenement: Event): void {
    evenement.preventDefault();
    const contenu = document.getElementById('contenu');
    contenu?.focus();
    contenu?.scrollIntoView();
  }

  /** Survol possible et menu horizontal affiché (ordinateur). */
  private survolActif(): boolean {
    return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1180px)').matches;
  }

  protected entreeSurvol(index: number): void {
    if (!this.survolActif()) return;
    clearTimeout(this.minuteurFermeture);
    if (this.sousMenuOuvert() !== index) {
      this.sousMenuOuvert.set(index);
      this.ouvertParSurvol = true;
    }
  }

  protected sortieSurvol(index: number): void {
    if (!this.survolActif()) return;
    clearTimeout(this.minuteurFermeture);
    this.minuteurFermeture = setTimeout(() => {
      if (this.sousMenuOuvert() === index) this.sousMenuOuvert.set(null);
    }, DELAI_FERMETURE_SURVOL);
  }

  protected basculerSousMenu(index: number): void {
    clearTimeout(this.minuteurFermeture);
    // Sur ordinateur, le survol a déjà ouvert le menu : le clic le garde ouvert au lieu de le refermer.
    if (this.sousMenuOuvert() === index && this.ouvertParSurvol) {
      this.ouvertParSurvol = false;
      return;
    }
    this.ouvertParSurvol = false;
    this.sousMenuOuvert.update((actuel) => (actuel === index ? null : index));
  }

  protected basculerMenuMobile(): void {
    this.menuMobileOuvert.update((v) => !v);
    this.sousMenuOuvert.set(null);
  }

  protected toutFermer(): void {
    clearTimeout(this.minuteurFermeture);
    this.ouvertParSurvol = false;
    this.sousMenuOuvert.set(null);
    this.menuMobileOuvert.set(false);
  }

  /** Clic dans le menu : tout lien (interne, externe, page en cours) referme les menus. */
  protected clicMenu(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('a')) {
      this.toutFermer();
    }
  }

  protected clicDocument(event: MouseEvent): void {
    if (!this.hote.nativeElement.contains(event.target as Node)) {
      this.toutFermer();
    }
  }

  protected echap(): void {
    const index = this.sousMenuOuvert();
    if (index !== null) {
      this.sousMenuOuvert.set(null);
      this.ouvertParSurvol = false;
      this.hote.nativeElement.querySelector<HTMLElement>(`#bouton-sous-menu-${index}`)?.focus();
    } else if (this.menuMobileOuvert()) {
      this.menuMobileOuvert.set(false);
      this.hote.nativeElement.querySelector<HTMLElement>('.burger')?.focus();
    }
  }

  /** Ferme le sous-menu quand le focus clavier en sort. */
  protected focusSorti(event: FocusEvent, index: number): void {
    const conteneur = event.currentTarget as HTMLElement;
    const suivant = event.relatedTarget as Node | null;
    if (suivant && !conteneur.contains(suivant) && this.sousMenuOuvert() === index) {
      this.sousMenuOuvert.set(null);
    }
  }

  /** Une page du sous-menu est la page en cours : la rubrique est marquée active. */
  protected rubriqueActive(entree: MenuNav): boolean {
    const chemin = this.url().split(/[?#]/)[0];
    return !!entree.sousMenu?.some(
      (lien) => !lien.externe && (lien.lien === chemin || chemin.startsWith(lien.lien + '/')),
    );
  }

  protected surDefilement(): void {
    const defile = window.scrollY > 8;
    if (defile !== this.defile()) this.defile.set(defile);
  }
}
