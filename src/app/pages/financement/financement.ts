import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_INFO } from '../../data/site-info';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { MentionQualiopi } from '../../shared/mention-qualiopi/mention-qualiopi';

@Component({
  selector: 'app-financement',
  imports: [MentionQualiopi, RouterLink, BlocCta],
  templateUrl: './financement.html',
})
export class Financement {
  protected readonly legal = SITE_INFO.legal;
  protected readonly dispositifs = [
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
}
