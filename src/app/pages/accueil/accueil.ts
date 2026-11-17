import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { FORMATIONS, texteDuree } from '../../data/formations';
import { ADRESSE_COMPLETE, LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { Accordeon } from '../../shared/accordeon/accordeon';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { ColonnesSoins } from '../../shared/colonnes-soins/colonnes-soins';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

@Component({
  selector: 'app-accueil',
  imports: [
    RouterLink,
    Accordeon,
    Apparition,
    BlocCta,
    BoutonReserver,
    ColonnesSoins,
    EmplacementImage,
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  protected readonly info = SITE_INFO;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly formationSocle = FORMATIONS[0];
  protected readonly nombreFormations = FORMATIONS.length;
  protected readonly texteDuree = texteDuree;
  protected readonly questions = FAQ[0].questions;
  protected readonly vignettesInstagram = [1, 2, 3, 4];
}
