import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FORMATIONS } from '../../data/formations';
import type { Formation } from '../../data/types';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';

interface Niveau {
  readonly numero: number;
  readonly titre: string;
  readonly texte: string;
  readonly formations: readonly Formation[];
}

const parId = (...ids: string[]) => FORMATIONS.filter((f) => ids.includes(f.id));

@Component({
  selector: 'app-parcours',
  imports: [RouterLink, BlocCta],
  templateUrl: './parcours.html',
})
export class Parcours {
  protected readonly niveaux: readonly Niveau[] = [
    {
      numero: 1,
      titre: 'Le socle',
      texte: 'La formation à suivre en premier, ouverte aux débutantes.',
      formations: parId('drainage-corps'),
    },
    {
      numero: 2,
      titre: 'Les spécialisations',
      texte:
        'Une fois le drainage corps acquis, vous choisissez les techniques à ajouter à votre carte.',
      formations: parId('drainage-visage', 'remodelage', 'kobido'),
    },
    {
      numero: 3,
      titre: 'L’expertise',
      texte: 'Le post-opératoire demande le drainage corps et visage en prérequis.',
      formations: parId('post-operatoire'),
    },
  ];

  protected readonly etapes = [
    {
      titre: 'Choisissez votre formation',
      texte:
        'Toutes les informations, les durées et les modalités sont présentées sur le site. Une question ? Contactez-nous.',
    },
    {
      titre: 'Réservez votre place',
      texte:
        'Par le formulaire du site, par téléphone ou WhatsApp, ou via Mon Compte Formation (CPF). L’adresse du lieu vous est transmise une semaine avant la session.',
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
