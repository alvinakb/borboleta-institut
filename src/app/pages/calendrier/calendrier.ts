import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { DemandeFormation } from '../../shared/demande-formation/demande-formation';

/** Calendrier : « Prochaines sessions : nous consulter » et les mêmes cartes que /formations#sessions. */
@Component({
  selector: 'app-calendrier',
  imports: [RouterLink, BlocCta, DemandeFormation],
  templateUrl: './calendrier.html',
  styles: `
    .calendrier__cartes {
      margin-top: var(--esp-6);
    }
  `,
})
export class Calendrier {}
