import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { DEMANDE_FORMATION, ROUTES_FORMATION } from '../../data/navigation';
import { SITE_INFO, lienWhatsApp } from '../../data/site-info';

/**
 * Actions toujours à portée de main (docs/DESIGN-SYSTEM.md, parties 5 et 10) :
 * - Mobile (moins de 960 px), à partir du deuxième écran : barre fixe en bas,
 *   « Réserver un soin » (Planity), ou « Demander une formation » sur les pages formation,
 *   avec une icône WhatsApp si le numéro est renseigné.
 * - Toutes les pages : bouton WhatsApp flottant rond en bas à droite, seulement si le numéro
 *   est renseigné (WHATSAPP_NUMERO dans data/site-info.ts). Sur mobile, il s’efface quand la
 *   barre est affichée (elle contient déjà WhatsApp) : aucun chevauchement.
 */
@Component({
  selector: 'app-actions-fixes',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './actions-fixes.html',
  styleUrl: './actions-fixes.css',
  host: {
    '(window:scroll)': 'surDefilement()',
    '(window:resize)': 'surDefilement()',
  },
})
export class ActionsFixes {
  protected readonly planity = SITE_INFO.planity;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly demande = DEMANDE_FORMATION;
  /** Page du centre de formation en cours. */
  protected readonly pageFormation = signal(false);
  /** La page en cours est déjà la cible de « Demander une formation » : pas de barre. */
  protected readonly pageCible = signal(false);
  /** Vrai à partir du deuxième écran. */
  protected readonly barreVisible = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((e) => {
        const chemin = e.urlAfterRedirects.split(/[?#]/)[0];
        const formation = ROUTES_FORMATION.includes(chemin);
        this.pageFormation.set(formation);
        this.pageCible.set(
          formation && !DEMANDE_FORMATION.fragment && chemin === DEMANDE_FORMATION.lien,
        );
        this.surDefilement();
      });
  }

  protected surDefilement(): void {
    const visible = window.scrollY > window.innerHeight * 0.9;
    if (visible !== this.barreVisible()) this.barreVisible.set(visible);
  }
}
