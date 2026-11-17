import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LIEN_ITINERAIRE, SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';
import { GaleriePhotos, PhotoGalerie } from '../../shared/galerie-photos/galerie-photos';

/**
 * L’institut et l’approche. Objectif : réserver un soin (bouton répété après chaque section).
 * Visuel plein écran sombre, puis sections claires en alternance (fond, fond-alt, fond, fond-alt).
 */
@Component({
  selector: 'app-institut',
  imports: [RouterLink, Apparition, BlocCta, BoutonReserver, EmplacementImage, GaleriePhotos],
  templateUrl: './institut.html',
  styleUrl: './institut.css',
})
export class Institut {
  protected readonly info = SITE_INFO;
  protected readonly itineraire = LIEN_ITINERAIRE;

  /** Galerie « L’institut en images » : photos prévues dans docs/PHOTOS.md. */
  protected readonly photos: readonly PhotoGalerie[] = [
    {
      fichier: 'assets/images/institut-1.jpg',
      description: 'La cabine de soin de Borboleta Institut à Draveil',
    },
    { fichier: 'assets/images/institut-2.jpg', description: 'L’espace d’accueil de l’institut' },
    {
      fichier: 'assets/images/institut-3.jpg',
      description: 'Les produits utilisés pendant les soins',
    },
    {
      fichier: 'assets/images/institut-4.jpg',
      description: 'La table de soin préparée avec du linge blanc',
    },
    {
      fichier: 'assets/images/institut-5.jpg',
      description: 'Un détail de la décoration de l’institut',
    },
    {
      fichier: 'assets/images/institut-6.jpg',
      description: 'L’ambiance calme et lumineuse de l’institut',
    },
  ];
}
