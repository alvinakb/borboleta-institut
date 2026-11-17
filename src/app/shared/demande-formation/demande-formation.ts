import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EnvoiFormulaire, MESSAGE_MODE_TEST, horodatage } from '../../core/envoi-formulaire';
import { FORMATIONS, texteDuree } from '../../data/formations';
import { DELAI_REPONSE, lienWhatsApp } from '../../data/site-info';
import type { Formation } from '../../data/types';

type Etat = 'saisie' | 'envoi' | 'envoye' | 'test' | 'erreur';

/** Préfixe des ancres des cartes : /formations#session-drainage-corps ouvre la carte. */
export const PREFIXE_ANCRE_SESSION = 'session-';

const MESSAGES_ERREUR: Record<string, string> = {
  nom: 'Indiquez votre nom.',
  telephone: 'Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78.',
  email: 'Indiquez un e-mail valide, par exemple prenom@exemple.fr.',
  formation: 'Choisissez la formation qui vous intéresse.',
  rgpd: 'Cochez la case pour que nous puissions vous répondre.',
};

/**
 * Prochaines sessions (docs/DESIGN-SYSTEM.md, partie 10, section 8) : une carte
 * « Prochaines sessions : nous consulter » par formation. Au clic, la carte s’ouvre sur un
 * petit formulaire (nom, téléphone, e-mail, formation visée préremplie, case RGPD), envoyé à
 * contact.php avec type = « formation-dates », un champ piège (site_web) et l’horodatage
 * d’ouverture (debut). Une seule carte ouverte à la fois.
 * Utilisé sur /formations (section #sessions) et /calendrier.
 */
@Component({
  selector: 'app-demande-formation',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './demande-formation.html',
  styleUrl: './demande-formation.css',
})
export class DemandeFormation {
  private readonly envoi = inject(EnvoiFormulaire);
  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly formations = FORMATIONS;
  protected readonly texteDuree = texteDuree;
  protected readonly prefixe = PREFIXE_ANCRE_SESSION;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly delai = DELAI_REPONSE || 'dans les meilleurs délais';
  protected readonly messageTest = MESSAGE_MODE_TEST;

  /** Identifiant de la formation dont la carte est ouverte. */
  protected readonly ouverte = signal<string | null>(null);
  protected readonly etat = signal<Etat>('saisie');
  protected readonly messageErreur = signal('');
  protected readonly soumis = signal(false);

  protected readonly formulaire = new FormGroup({
    nom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    telephone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^\+?[0-9 .()-]{10,20}$/)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    formation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rgpd: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    /** Champ piège : invisible, laissé vide par les humains. */
    site_web: new FormControl('', { nonNullable: true }),
  });
  private debut = horodatage();

  constructor() {
    // /formations#session-<id> (lien « Nous consulter ») : ouvre la carte correspondante.
    inject(ActivatedRoute)
      .fragment.pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((fragment) => {
        const id = fragment?.startsWith(PREFIXE_ANCRE_SESSION)
          ? fragment.slice(PREFIXE_ANCRE_SESSION.length)
          : null;
        if (id && FORMATIONS.some((f) => f.id === id) && this.ouverte() !== id) {
          this.ouvrir(id);
        }
      });
  }

  protected basculer(f: Formation): void {
    if (this.ouverte() === f.id) {
      this.ouverte.set(null);
      return;
    }
    this.ouvrir(f.id);
    setTimeout(() => this.champ(f.id, 'nom')?.focus());
  }

  private ouvrir(id: string): void {
    this.ouverte.set(id);
    this.etat.set('saisie');
    this.soumis.set(false);
    this.messageErreur.set('');
    const garde = this.formulaire.getRawValue();
    this.formulaire.reset({
      nom: garde.nom,
      telephone: garde.telephone,
      email: garde.email,
      formation: id,
      rgpd: false,
      site_web: '',
    });
    this.debut = horodatage();
  }

  protected erreur(nom: string): string | null {
    const controle = this.formulaire.get(nom);
    if (!controle || controle.valid) return null;
    if (!controle.touched && !this.soumis()) return null;
    return MESSAGES_ERREUR[nom] ?? null;
  }

  protected async envoyer(f: Formation): Promise<void> {
    this.soumis.set(true);
    this.formulaire.markAllAsTouched();
    if (this.formulaire.invalid) {
      const premier = ['nom', 'telephone', 'email', 'formation', 'rgpd'].find(
        (n) => this.formulaire.get(n)?.invalid,
      );
      if (premier) this.champ(f.id, premier)?.focus();
      return;
    }

    this.etat.set('envoi');
    this.messageErreur.set('');
    const v = this.formulaire.getRawValue();
    const titreFormation = FORMATIONS.find((x) => x.id === v.formation)?.titre ?? v.formation;
    const resultat = await this.envoi.envoyer({
      type: 'formation-dates',
      nom: v.nom.trim(),
      telephone: v.telephone.trim(),
      email: v.email.trim(),
      formation: titreFormation,
      rgpd: v.rgpd,
      site_web: v.site_web,
      debut: this.debut,
    });

    if (resultat.statut === 'erreur') {
      this.etat.set('erreur');
      this.messageErreur.set(
        resultat.message ??
          'L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous depuis la page Contact.',
      );
      return;
    }
    this.etat.set(resultat.statut);
    setTimeout(() =>
      this.hote.nativeElement.querySelector<HTMLElement>(`#demande-${f.id}-resultat`)?.focus(),
    );
  }

  private champ(id: string, nom: string): HTMLElement | null {
    return this.hote.nativeElement.querySelector<HTMLElement>(`#demande-${id}-${nom}`);
  }
}
