import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { detailSoin, tarifsComplementaires } from '../../data/soins-detail';
import { categorieParId } from '../../data/tarifs';
import { Accordeon } from '../../shared/accordeon/accordeon';
import { Apparition } from '../../shared/apparition/apparition';
import { BlocCta } from '../../shared/bloc-cta/bloc-cta';
import { BoutonReserver } from '../../shared/bouton-reserver/bouton-reserver';
import { LigneTarif } from '../../shared/ligne-tarif/ligne-tarif';
import { ColonnesSoins } from '../../shared/colonnes-soins/colonnes-soins';
import { EmplacementImage } from '../../shared/emplacement-image/emplacement-image';

/**
 * Page d’un soin /soins/<id> (docs/DESIGN-SYSTEM.md, partie 10, « Pages de soin ») :
 * 1. visuel plein écran, 2. le soin, pour qui, déroulé, 3. tarifs (séance et cures, depuis
 * contenu/tarifs.json), 4. précautions et questions fréquentes, 5. les autres soins en colonnes.
 * Textes : data/soins-detail.ts. La route n’existe que pour les identifiants connus
 * (garde soinExiste), le reste mène à la page 404.
 */
@Component({
  selector: 'app-soin-detail',
  imports: [
    RouterLink,
    Accordeon,
    Apparition,
    BlocCta,
    BoutonReserver,
    ColonnesSoins,
    EmplacementImage,
    LigneTarif,
  ],
  templateUrl: './soin-detail.html',
  styleUrl: './soin-detail.css',
})
export class SoinDetail {
  private readonly id = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: '' },
  );

  protected readonly detail = computed(() => detailSoin(this.id()));
  protected readonly categorie = computed(() => categorieParId(this.id()));
  protected readonly complements = computed(() => {
    const d = this.detail();
    return d ? tarifsComplementaires(d) : [];
  });
}
