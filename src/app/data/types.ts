// Types des données du site. Les valeurs viennent de contenu/tarifs.json (via le script
// scripts/generer-donnees.mjs) et des fichiers site-info.ts et formations.ts.

/** Un soin tel qu'il apparaît sur Planity. Prix en euros TTC. */
export interface Soin {
  readonly nom: string;
  readonly duree: string;
  readonly prix: number;
}

/** Une catégorie de soins (page Soins et page Tarifs). */
export interface CategorieSoins {
  readonly id: string;
  readonly titre: string;
  readonly intro: string;
  readonly soins: readonly Soin[];
}

/** Une formation du centre de formation. */
export interface Formation {
  readonly id: string;
  readonly numero: number;
  readonly titre: string;
  readonly surtitre: string;
  readonly accroche: string;
  /** Durée en heures, ou null si elle n'est pas encore fixée (« nous consulter »). */
  readonly dureeHeures: number | null;
  /** Nombre de jours, ou null si non fixé. */
  readonly jours: number | null;
  readonly format: string;
  readonly niveau: string;
  readonly groupe: string;
  readonly programme: string;
  /** Prix en euros, ou null tant qu'il n'est pas fourni (« nous consulter »). */
  readonly prix: number | null;
}

export interface Horaire {
  readonly jours: string;
  readonly heures: string;
}

/** Un lien de navigation (menu, footer). */
export interface LienNav {
  readonly libelle: string;
  /** Route interne (ex. « /soins ») ou URL externe complète. */
  readonly lien: string;
  readonly externe?: boolean;
}

export interface MenuNav {
  readonly libelle: string;
  readonly lien?: string;
  readonly sousMenu?: readonly LienNav[];
}
