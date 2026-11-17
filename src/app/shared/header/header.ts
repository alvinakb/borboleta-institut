import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { MENU_PRINCIPAL } from '../../data/navigation';
import { BoutonReserver } from '../bouton-reserver/bouton-reserver';

/**
 * En-tête : logo, menu principal avec deux menus déroulants (L'institut, Centre de formation),
 * menu burger sous 960 px. Accessible au clavier : boutons avec aria-expanded, Échap ferme.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, BoutonReserver],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:click)': 'clicDocument($event)',
    '(keydown.escape)': 'echap()',
  },
})
export class Header {
  protected readonly menu = MENU_PRINCIPAL;
  /** Index du sous-menu ouvert, ou null. */
  protected readonly sousMenuOuvert = signal<number | null>(null);
  protected readonly menuMobileOuvert = signal(false);

  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Lien d'évitement : donne le focus au contenu sans changer de page (le <base href> ferait revenir à l'accueil). */
  allerAuContenu(evenement: Event): void {
    evenement.preventDefault();
    const contenu = document.getElementById('contenu');
    contenu?.focus();
    contenu?.scrollIntoView();
  }

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.toutFermer());
  }

  protected basculerSousMenu(index: number): void {
    this.sousMenuOuvert.update((actuel) => (actuel === index ? null : index));
  }

  protected basculerMenuMobile(): void {
    this.menuMobileOuvert.update((v) => !v);
    this.sousMenuOuvert.set(null);
  }

  protected toutFermer(): void {
    this.sousMenuOuvert.set(null);
    this.menuMobileOuvert.set(false);
  }

  protected clicDocument(event: MouseEvent): void {
    if (!this.hote.nativeElement.contains(event.target as Node)) {
      this.sousMenuOuvert.set(null);
    }
  }

  protected echap(): void {
    const index = this.sousMenuOuvert();
    if (index !== null) {
      this.sousMenuOuvert.set(null);
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
}
