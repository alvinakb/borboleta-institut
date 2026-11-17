import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  ResolveFn,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

import type { QuestionFaq } from '../data/faq';
import { SITE_INFO } from '../data/site-info';
import { SUFFIXE_TITRE, aUnePageSoin, detailSoin } from '../data/soins-detail';
import { DonneesStructurees } from './donnees-structurees';

/** Données SEO à placer dans `data` de chaque route. */
export interface DonneesSeo {
  /** Meta description de la page (155 caractères maximum). */
  description: string;
  /** Si vrai, la page n’est pas indexée par les moteurs (ex. page 404). */
  noindex?: boolean;
  /** Questions affichées sur la page : données structurées FAQPage (JSON-LD). */
  faq?: readonly QuestionFaq[];
}

/**
 * Met à jour le titre (service Title) et la meta description (service Meta) à chaque
 * navigation, à partir de `title` et `data.description` de la route active.
 *
 * Routes dynamiques (ex. /soins/:id) : `title` est une fonction de résolution et
 * `resolve: { description }` fournit la description ; Angular fusionne les données résolues
 * dans `data`, la stratégie les lit donc de la même façon. Voir les résolveurs plus bas.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly donneesStructurees = inject(DonneesStructurees);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titrePage = this.buildTitle(snapshot);
    const titre = titrePage ?? `${SITE_INFO.nom}, drainage lymphatique à Draveil (91)`;
    this.title.setTitle(titre);

    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const { description, noindex, faq } = route.data as Partial<DonneesSeo>;

    // JSON-LD : fiche établissement sur toutes les pages, FAQPage seulement là où une FAQ
    // est affichée (balises remplacées à chaque navigation, jamais accumulées).
    this.donneesStructurees.definirEtablissement();
    this.donneesStructurees.definirFaq(noindex ? undefined : faq);

    if (noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.removeTag("name='robots'");
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    this.meta.updateTag({ property: 'og:title', content: titre });
  }
}

// ---------- Pages de soin /soins/:id ----------

/** La route /soins/:id ne s’applique qu’aux soins qui ont une page : sinon, page 404 (noindex). */
export const soinExiste: CanMatchFn = (_route, segments) => aUnePageSoin(segments[1]?.path ?? '');

/** Titre SEO du soin, suffixe compris (60 caractères maximum). */
export const titreSoin: ResolveFn<string> = (route: ActivatedRouteSnapshot) =>
  (detailSoin(route.paramMap.get('id'))?.seoTitre ?? 'Nos soins') + SUFFIXE_TITRE;

/** Meta description du soin (155 caractères maximum). */
export const descriptionSoin: ResolveFn<string> = (route: ActivatedRouteSnapshot) =>
  detailSoin(route.paramMap.get('id'))?.seoDescription ?? '';

/** Questions fréquentes du soin, pour les données structurées FAQPage. */
export const faqSoin: ResolveFn<readonly QuestionFaq[]> = (route: ActivatedRouteSnapshot) =>
  detailSoin(route.paramMap.get('id'))?.faq ?? [];
