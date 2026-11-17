import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

@Component({
  selector: 'app-institut',
  imports: [RouterLink, BlocCta, BoutonReserver, EmplacementImage],
  templateUrl: './institut.html',
})
export class Institut {}
