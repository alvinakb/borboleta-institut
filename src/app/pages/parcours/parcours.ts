import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NIVEAUX_FORMATION } from '../../data/formations';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Le parcours et le déroulement : page courte, complémentaire de /formations. Les niveaux en
 * bref (le détail, les durées et les programmes restent sur /formations) et les quatre étapes de
 * l’inscription à la fin de la formation. La demande se fait sur /formations#sessions.
 */
@Component({
  selector: 'app-parcours',
  imports: [RouterLink, Apparition, BlocCta, EmplacementImage],
  templateUrl: './parcours.html',
  styleUrl: './parcours.css',
})
export class Parcours {
  protected readonly niveaux = NIVEAUX_FORMATION;

  protected readonly etapes = [
    {
      titre: 'Choisissez votre formation',
      texte:
        'Toutes les informations, les durées et les modalités sont présentées sur le site. Une question ? Contactez-nous.',
    },
    {
      titre: 'Réservez votre place',
      texte:
        'Par le formulaire de demande du site, ou via Mon Compte Formation (CPF). L’adresse du lieu vous est transmise une semaine avant la session.',
    },
    {
      titre: 'Formez-vous en pratique',
      texte:
        'Des journées qui alternent théorie, démonstrations et pratique en binôme, sous la guidance attentive de la formatrice.',
    },
    {
      titre: 'Repartez outillée',
      texte:
        'Avec les gestes maîtrisés, une attestation de fin de formation et la confiance nécessaire pour intégrer la technique à votre pratique.',
    },
  ];
}
