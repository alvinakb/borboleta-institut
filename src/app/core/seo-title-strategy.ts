import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { SITE_INFO } from '../data/site-info';

/** Données SEO à placer dans `data` de chaque route. */
export interface DonneesSeo {
  /** Meta description de la page (150 à 160 caractères conseillés). */
  description: string;
  /** Si vrai, la page n’est pas indexée par les moteurs (ex. page 404). */
  noindex?: boolean;
}

/**
 * Met à jour le titre (service Title) et la meta description (service Meta) à chaque
 * navigation, à partir de `title` et `data.description` de la route active.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titrePage = this.buildTitle(snapshot);
    const titre = titrePage ?? `${SITE_INFO.nom}, drainage lymphatique à Draveil (91)`;
    this.title.setTitle(titre);

    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const { description, noindex } = route.data as Partial<DonneesSeo>;

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
