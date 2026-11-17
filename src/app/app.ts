import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ActionsFixes } from './shared/actions-fixes/actions-fixes';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ActionsFixes],
  template: `
    <app-header />
    <main id="contenu" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-actions-fixes />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
      outline: none;
    }
  `,
})
export class App {}
