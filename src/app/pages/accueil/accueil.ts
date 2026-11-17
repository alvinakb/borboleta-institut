import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { NIVEAUX_FORMATION, texteDuree } from '../../data/formations';
import { SITE_INFO } from '../../data/site-info';
import { categorieParId } from '../../data/tarifs';
import type { CategorieSoins } from '../../data/types';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { CarteSoin } from '../../shared/carte-soin/carte-soin';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

const SOINS_A_LA_UNE = ['drainage-renata-franca', 'miracle-face', 'remodelage'];

/** Les piliers de la technique (section « La méthode »). */
const PILIERS = [
  {
    titre: 'La pression',
    texte: 'Des pressions fermes et dosées, adaptées à chaque zone du corps et du visage.',
  },
  {
    titre: 'Le rythme',
    texte: 'Un rythme soutenu, qui fait de chaque séance un soin tonique et enveloppant.',
  },
  {
    titre: 'La précision',
    texte: 'Des gestes précis, répétés jusqu’à être parfaitement maîtrisés.',
  },
  {
    titre: 'L’écoute',
    texte:
      'Chaque rendez-vous commence par une écoute de vos attentes, pour vous orienter vers le soin le plus adapté.',
  },
] as const;

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Apparition, BlocCta, BoutonReserver, CarteSoin, EmplacementImage],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  protected readonly info = SITE_INFO;
  protected readonly soins = SOINS_A_LA_UNE.map(categorieParId).filter(
    (c): c is CategorieSoins => !!c,
  );
  protected readonly piliers = PILIERS;
  protected readonly niveaux = NIVEAUX_FORMATION;
  protected readonly texteDuree = texteDuree;
  protected readonly questions = FAQ[0].questions;
  protected readonly vignettesInstagram = [1, 2, 3, 4];
}
