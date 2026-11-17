import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { aUnePageSoin } from '../../data/soins-detail';
import { CATEGORIES_AVEC_SOINS, formaterPrix, texteAPartirDe } from '../../data/tarifs';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

/** Largeur à partir de laquelle toutes les catégories sont ouvertes (ordinateur). */
const REQUETE_ORDINATEUR = '(min-width: 960px)';

/**
 * Page Tarifs (docs/DESIGN-SYSTEM.md, partie 5, « Ligne de tarif ») : sommaire d’ancres,
 * nom à gauche, durée en petit texte, prix à droite en brun 600 et chiffres tabulaires.
 * Catégories repliables sur mobile, toutes ouvertes sur ordinateur. Un seul bouton « Réserver »
 * par catégorie, et un lien vers la page du soin quand elle existe.
 */
@Component({
  selector: 'app-tarifs',
  imports: [RouterLink, BlocCta, BoutonReserver],
  templateUrl: './tarifs.html',
  styleUrl: './tarifs.css',
})
export class Tarifs {
  protected readonly categories = CATEGORIES_AVEC_SOINS;
  protected readonly formaterPrix = formaterPrix;
  protected readonly aPartirDe = texteAPartirDe;
  protected readonly aUnePage = aUnePageSoin;

  protected readonly ordinateur = signal(window.matchMedia(REQUETE_ORDINATEUR).matches);
  /** Catégories ouvertes sur mobile. */
  protected readonly ouvertes = signal<ReadonlySet<string>>(new Set());

  constructor() {
    const requete = window.matchMedia(REQUETE_ORDINATEUR);
    const ecoute = (e: MediaQueryListEvent) => this.ordinateur.set(e.matches);
    requete.addEventListener('change', ecoute);
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => requete.removeEventListener('change', ecoute));

    // Lien du sommaire (ou /tarifs#<id> depuis une autre page) : la catégorie s’ouvre.
    inject(ActivatedRoute)
      .fragment.pipe(takeUntilDestroyed(destroyRef))
      .subscribe((id) => {
        if (id && this.categories.some((c) => c.id === id)) {
          this.ouvertes.update((o) => new Set(o).add(id));
        }
      });
  }

  protected estOuverte(id: string): boolean {
    return this.ordinateur() || this.ouvertes().has(id);
  }

  protected basculer(id: string): void {
    this.ouvertes.update((o) => {
      const suite = new Set(o);
      if (suite.has(id)) suite.delete(id);
      else suite.add(id);
      return suite;
    });
  }

  /** « 30min » devient « 30 min », « 1h30 » devient « 1 h 30 ». */
  protected duree(texte: string): string {
    return texte
      .replace(/(\d)\s*h\s*(\d*)/, (_, h, m) => `${h} h${m ? ' ' + m : ''}`)
      .replace(/(\d)\s*min/, '$1 min');
  }
}
