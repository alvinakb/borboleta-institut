import { LowerCasePipe } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NIVEAUX_FORMATION, texteDuree } from '../../data/formations';
import { LANGUES_FORMATRICE, PARCOURS_FORMATRICE } from '../../data/formatrice';
import { SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import {
  DemandeFormation,
  PREFIXE_ANCRE_SESSION,
} from '../../shared/demande-formation/demande-formation';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Page Centre de formation (docs/DESIGN-SYSTEM.md, partie 10), sections 1 à 9 dans l’ordre :
 * en-tête sombre, piliers, pédagogie, journée de formation, parcours par niveaux, avantages,
 * formatrice, prochaines sessions (#sessions), financement. Bouton « Je veux me former »
 * (vers #sessions) répété après chaque grande section. Jamais deux sections sombres à la suite :
 * les piliers forment un bandeau espresso posé dans une section claire.
 */
@Component({
  selector: 'app-formations',
  imports: [LowerCasePipe, RouterLink, Apparition, DemandeFormation, EmplacementImage],
  templateUrl: './formations.html',
  styleUrl: './formations.css',
})
export class Formations {
  protected readonly niveaux = NIVEAUX_FORMATION;
  protected readonly texteDuree = texteDuree;
  protected readonly parcours = PARCOURS_FORMATRICE;
  protected readonly langues = LANGUES_FORMATRICE.join(', ');
  protected readonly formatrice = SITE_INFO.responsable;
  protected readonly prefixeSession = PREFIXE_ANCRE_SESSION;
  /** Formations dont le programme détaillé est déplié. */
  protected readonly programmesOuverts = signal<ReadonlySet<string>>(new Set());

  protected readonly piliers = [
    {
      titre: 'Le rythme',
      texte: 'Un tempo régulier et soutenu, tenu du début à la fin de la séance.',
    },
    {
      titre: 'La pression',
      texte: 'Ferme sans être brusque, dosée selon la zone et la personne.',
    },
    {
      titre: 'Le pompage',
      texte: 'Le geste qui appelle et accompagne, répété jusqu’à devenir naturel.',
    },
    {
      titre: 'Le glissement',
      texte: 'Des mains qui enchaînent les manœuvres sans rupture ni hésitation.',
    },
    {
      titre: 'La précision du geste',
      texte: 'Le bon endroit, le bon sens, la bonne intensité : c’est là que tout se joue.',
    },
  ];

  protected readonly journee = [
    {
      titre: 'La théorie',
      texte:
        'Anatomie, protocole et contre-indications, expliqués simplement et sans diaporamas interminables.',
      photo: 'formation-journee-theorie',
      description: 'Support de cours et planche d’anatomie sur la table de formation',
    },
    {
      titre: 'La pratique en binôme',
      texte:
        'Vous pratiquez sur table, en binôme, avec des corrections en direct de la formatrice.',
      photo: 'formation-journee-pratique',
      description: 'Deux stagiaires en pratique sur une table de soin',
    },
    {
      titre: 'L’évaluation et l’attestation',
      texte:
        'Une évaluation finale du geste, puis la remise de votre attestation de fin de formation.',
      photo: 'formation-journee-attestation',
      description: 'Une attestation de fin de formation posée sur la table',
    },
  ];

  protected readonly avantages = [
    {
      titre: 'Certifiée Qualiopi et finançable',
      texte:
        'Borboleta Institut est un organisme certifié Qualiopi : votre formation peut faire l’objet d’une prise en charge.',
    },
    {
      titre: 'Petit groupe et pratique intensive',
      texte:
        'La pratique occupe l’essentiel du temps. On montre, on fait faire, on corrige, on recommence.',
    },
    {
      titre: 'Un suivi après la formation',
      texte:
        'Une question en cabine, un geste à revoir : la formatrice reste disponible une fois la formation terminée.',
    },
  ];

  protected readonly financements = [
    { nom: 'CPF', texte: 'Mon Compte Formation, pour mobiliser vos droits à la formation.' },
    {
      nom: 'OPCO',
      texte: 'Pour les salariées, selon l’opérateur de compétences de votre branche.',
    },
    { nom: 'FAFCEA', texte: 'Pour les cheffes d’entreprise artisanale.' },
    {
      nom: 'France Travail',
      texte: 'Pour les personnes en recherche d’emploi ou en reconversion.',
    },
  ];

  private readonly defilement = inject(ViewportScroller);

  /**
   * Les boutons « Je veux me former » pointent vers #sessions (routerLink + fragment). Si l’ancre
   * est déjà dans l’adresse, le routeur ne refait pas défiler : on le fait ici.
   */
  protected allerAuxSessions(): void {
    setTimeout(() => this.defilement.scrollToAnchor('sessions'));
  }

  protected basculerProgramme(id: string): void {
    this.programmesOuverts.update((actuels) => {
      const suite = new Set(actuels);
      if (suite.has(id)) suite.delete(id);
      else suite.add(id);
      return suite;
    });
  }
}
