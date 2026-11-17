import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FINANCEMENTS } from '../../data/formations';
import { SITE_INFO } from '../../data/site-info';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';
import { MentionQualiopi } from '../../shared/mention-qualiopi/mention-qualiopi';

/**
 * Financement des formations (CPF, OPCO, FAFCEA, France Travail) et certification Qualiopi.
 * Objectif : demander une formation (/formations#sessions). Le numéro de déclaration d’activité
 * et le certificat Qualiopi s’affichent dès qu’ils sont renseignés dans data/site-info.ts.
 */
@Component({
  selector: 'app-financement',
  imports: [RouterLink, Apparition, BlocCta, EmplacementImage, MentionQualiopi],
  templateUrl: './financement.html',
  styleUrl: './financement.css',
})
export class Financement {
  protected readonly legal = SITE_INFO.legal;
  protected readonly dispositifs = FINANCEMENTS;
}
