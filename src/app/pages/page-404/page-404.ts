import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';

@Component({
  selector: 'app-page-404',
  imports: [RouterLink, BoutonReserver],
  template: `
    <section class="section texte-centre">
      <div class="conteneur flux">
        <p class="surtitre">Erreur 404</p>
        <h1 class="titre-page">Page <em>introuvable</em></h1>
        <p class="chapo" style="margin-inline: auto">
          Cette page n’existe pas ou a été déplacée. Voici quelques pistes pour retrouver votre
          chemin.
        </p>
        <div class="groupe-boutons" style="justify-content: center">
          <a class="bouton" routerLink="/">Retour à l’accueil</a>
          <a class="bouton bouton--contour" routerLink="/soins">Nos soins</a>
          <a class="bouton bouton--contour" routerLink="/formations">Nos formations</a>
          <app-bouton-reserver variante="contour" />
        </div>
      </div>
    </section>
  `,
})
export class Page404 {}
