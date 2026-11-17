import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { aUnePageSoin } from '../../data/soins-detail';
import { CATEGORIES_SOINS, texteAPartirDe } from '../../data/tarifs';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { LigneTarif } from '../../shared/carte-soin/ligne-tarif';

/** Largeur à partir de laquelle toutes les catégories sont ouvertes (ordinateur). */
const REQUETE_ORDINATEUR = '(min-width: 960px)';

/** Catégories sans soin tarifé (contenu/tarifs.json) : renvoi vers leur page dédiée. */
const RENVOIS_SANS_TARIF: Readonly<Record<string, { lien: string; libelle: string }>> = {
  'cartes-cadeaux': { lien: '/cartes-cadeaux', libelle: 'Découvrir les cartes cadeaux' },
};

/**
 * Page Tarifs (docs/DESIGN-SYSTEM.md, partie 5, « Ligne de tarif ») : sommaire d’ancres,
 * nom à gauche, durée en petit texte, prix à droite en brun 600 et chiffres tabulaires.
 * Catégories repliables sur mobile, toutes ouvertes sur ordinateur. Chaque ligne a un lien
 * « Réserver » discret vers Planity ; un bouton principal « Réserver » par catégorie, et un lien
 * vers la page du soin quand elle existe. Les catégories sans soin (cartes cadeaux) renvoient
 * vers leur page.
 */
@Component({
  selector: 'app-tarifs',
  imports: [RouterLink, BlocCta, BoutonReserver, LigneTarif],
  templateUrl: './tarifs.html',
  styleUrl: './tarifs.css',
})
export class Tarifs {
  /** Toutes les catégories de contenu/tarifs.json, dans l’ordre du fichier. */
  protected readonly categories = CATEGORIES_SOINS;
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

  protected renvoiSansTarif(id: string): { lien: string; libelle: string } {
    return RENVOIS_SANS_TARIF[id] ?? { lien: '/contact', libelle: 'Nous contacter' };
  }
}
