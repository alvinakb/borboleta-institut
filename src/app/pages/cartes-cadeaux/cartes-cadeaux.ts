import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ADRESSE_COMPLETE, LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { categorieParId } from '../../data/tarifs';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Cartes cadeaux, disponibles en institut. Objectif : nous contacter ou passer à l’institut
 * (adresse et horaires lisibles tout de suite).
 */
@Component({
  selector: 'app-cartes-cadeaux',
  imports: [RouterLink, Apparition, BlocCta, EmplacementImage],
  templateUrl: './cartes-cadeaux.html',
  styleUrl: './cartes-cadeaux.css',
})
export class CartesCadeaux {
  protected readonly intro = categorieParId('cartes-cadeaux')?.intro ?? '';
  protected readonly info = SITE_INFO;
  protected readonly adresse = ADRESSE_COMPLETE;
  protected readonly itineraire = LIEN_ITINERAIRE;
}
