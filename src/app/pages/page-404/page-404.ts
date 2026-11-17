import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Page 404 (noindex) : en-tête simple et sobre, trois pistes pour retrouver son chemin. */
@Component({
  selector: 'app-page-404',
  imports: [RouterLink],
  template: `
    <section class="entete-page introuvable texte-centre">
      <div class="conteneur flux">
        <img
          class="introuvable__papillon"
          src="images/papillon.png"
          alt=""
          width="400"
          height="243"
        />
        <p class="surtitre">Erreur 404</p>
        <h1 class="titre-page">Page introuvable</h1>
        <p class="chapo">
          Cette page n’existe pas ou a été déplacée. Voici quelques pistes pour retrouver votre
          chemin.
        </p>
        <div class="groupe-boutons">
          <a class="bouton" routerLink="/">Retour à l’accueil</a>
          <a class="lien-texte" routerLink="/soins">Nos soins</a>
          <a class="lien-texte" routerLink="/formations">Nos formations</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .introuvable {
      min-height: calc(70vh - var(--hauteur-entete));
      display: grid;
      align-items: center;
    }
    .introuvable__papillon {
      width: 5rem;
      height: auto;
      margin-inline: auto;
      opacity: 0.5;
    }
    .groupe-boutons {
      column-gap: var(--esp-6);
    }
  `,
})
export class Page404 {}
