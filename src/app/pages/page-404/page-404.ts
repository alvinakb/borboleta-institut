import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-404',
  imports: [RouterLink],
  template: `
    <section class="section texte-centre">
      <div class="conteneur flux">
        <p class="surtitre">Erreur 404</p>
        <h1 class="titre-page">Page introuvable</h1>
        <p class="chapo">
          Cette page n’existe pas ou a été déplacée. Voici quelques pistes pour retrouver votre
          chemin.
        </p>
        <div class="groupe-boutons">
          <a class="bouton" routerLink="/">Retour à l’accueil</a>
          <a class="bouton bouton--contour" routerLink="/soins">Nos soins</a>
        </div>
        <p><a class="lien-fleche" routerLink="/formations">Nos formations</a></p>
      </div>
    </section>
  `,
})
export class Page404 {}
