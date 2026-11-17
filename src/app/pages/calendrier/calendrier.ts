import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FORMATIONS } from '../../data/formations';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';

@Component({
  selector: 'app-calendrier',
  imports: [RouterLink, BlocCta],
  templateUrl: './calendrier.html',
})
export class Calendrier {
  protected readonly formations = FORMATIONS;
}
