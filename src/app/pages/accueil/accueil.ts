import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQ } from '../../data/faq';
import { FORMATIONS, texteDuree } from '../../data/formations';
import { ADRESSE_COMPLETE, LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { categorieParId } from '../../data/tarifs';
import { Accordeon } from '../../shared/accordeon/accordeon';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Bandeau des soins en colonnes verticales : une colonne par famille (identifiants de
 * contenu/tarifs.json). Les pages /soins/<id> arrivent en passe 2 : en attendant, chaque
 * colonne mène à la carte correspondante de la page Soins (/soins#<id>).
 */
const FAMILLES_SOINS = [
  { id: 'drainage-renata-franca', nom: 'Drainage Renata França' },
  { id: 'miracle-face', nom: 'Miracle Face' },
  { id: 'remodelage', nom: 'Remodelage' },
  { id: 'kobido', nom: 'Kobido' },
  { id: 'radiofrequence', nom: 'Radiofréquence' },
  { id: 'post-operatoire', nom: 'Post-opératoire' },
  { id: 'femme-enceinte', nom: 'Femme enceinte' },
] as const;

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Accordeon, Apparition, BlocCta, BoutonReserver, EmplacementImage],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  protected readonly info = SITE_INFO;
  protected readonly itineraire = LIEN_ITINERAIRE;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly familles = FAMILLES_SOINS.filter((f) => !!categorieParId(f.id));
  protected readonly formationSocle = FORMATIONS[0];
  protected readonly nombreFormations = FORMATIONS.length;
  protected readonly texteDuree = texteDuree;
  protected readonly questions = FAQ[0].questions;
  protected readonly vignettesInstagram = [1, 2, 3, 4];
}
