import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  FAMILLES_PRINCIPALES,
  IDS_SOINS_AVEC_PAGE,
  aUnePageSoin,
  detailSoin,
} from '../../data/soins-detail';
import { Apparition } from '../apparition/apparition';
import { EmplacementImage } from '../emplacement-image/emplacement-image';

interface ColonneSoin {
  readonly id: string;
  readonly nom: string;
}

function colonne(id: string): ColonneSoin {
  return { id, nom: detailSoin(id)?.nomCourt ?? id };
}

/**
 * Bandeau des soins en colonnes verticales (signature reprise du site Spa Renata França,
 * docs/DESIGN-SYSTEM.md, partie 10) : une colonne haute par famille de soins, photo en fond,
 * nom et lien « En savoir plus » vers /soins/<id>. Défilement horizontal au doigt sur mobile,
 * colonnes côte à côte sur ordinateur.
 *
 * Sur une page de soin, [exclure] retire le soin en cours ; les soins qui n’ont pas de colonne
 * sont proposés en liens texte sous le bandeau (« Voir aussi »).
 */
@Component({
  selector: 'app-colonnes-soins',
  imports: [RouterLink, Apparition, EmplacementImage],
  templateUrl: './colonnes-soins.html',
  styleUrl: './colonnes-soins.css',
})
export class ColonnesSoins {
  readonly surtitre = input('');
  readonly titre = input.required<string>();
  /** Identifiant du soin à ne pas afficher (page de soin en cours). */
  readonly exclure = input('');
  /** Affiche les liens vers les autres soins sous le bandeau. */
  readonly voirAussi = input(false);

  protected readonly idTitre = `titre-colonnes-${Math.random().toString(36).slice(2, 8)}`;

  protected readonly colonnes = computed(() =>
    FAMILLES_PRINCIPALES.filter((id) => id !== this.exclure() && aUnePageSoin(id)).map(colonne),
  );

  protected readonly autres = computed(() =>
    this.voirAussi()
      ? IDS_SOINS_AVEC_PAGE.filter(
          (id) => id !== this.exclure() && !FAMILLES_PRINCIPALES.includes(id),
        ).map(colonne)
      : [],
  );
}
