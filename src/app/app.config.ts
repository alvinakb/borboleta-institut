import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ViewportScroller, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo-title-strategy';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    { provide: LOCALE_ID, useValue: 'fr' },
    // Décalage pour que les ancres ne passent pas sous le header collant.
    provideAppInitializer(() => inject(ViewportScroller).setOffset([0, 96])),
  ],
};
