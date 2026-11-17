import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EnvoiFormulaire, MESSAGE_MODE_TEST, horodatage } from '../../core/envoi-formulaire';
import { FORMATIONS } from '../../data/formations';
import { DELAI_REPONSE, SITE_INFO, lienWhatsApp } from '../../data/site-info';

type Etat = 'saisie' | 'envoi' | 'envoye' | 'test' | 'erreur';

/** Objets proposés (mêmes clés que OBJETS dans public/contact.php). */
export const OBJETS_CONTACT = [
  { id: 'soin', libelle: 'Un soin' },
  { id: 'formation', libelle: 'Une formation' },
  { id: 'autre', libelle: 'Autre demande' },
] as const;

/** « Comment nous avez-vous connus ? » (mêmes clés que CONNU dans public/contact.php). */
export const CONNU_CONTACT = [
  { id: 'instagram', libelle: 'Instagram' },
  { id: 'planity', libelle: 'Planity' },
  { id: 'google', libelle: 'Google' },
  { id: 'bouche-a-oreille', libelle: 'Bouche-à-oreille' },
  { id: 'autre', libelle: 'Autre' },
] as const;

/** Longueurs maximales, identiques aux contrôles de public/contact.php. */
const MAX_NOM = 100;
const MAX_MESSAGE = 5000;

/** Ordre des champs, pour placer le focus sur le premier en erreur. */
const ORDRE_CHAMPS = ['nom', 'email', 'telephone', 'objet', 'formation', 'message', 'rgpd'];

const MESSAGES_ERREUR: Record<string, Record<string, string>> = {
  nom: {
    required: 'Indiquez votre nom.',
    maxlength: `Votre nom est trop long (${MAX_NOM} caractères au maximum).`,
  },
  email: { defaut: 'Indiquez un e-mail valide, par exemple prenom@exemple.fr.' },
  telephone: { defaut: 'Indiquez un numéro de téléphone valide, par exemple 06 12 34 56 78.' },
  objet: { defaut: 'Choisissez l’objet de votre demande.' },
  formation: { defaut: 'Choisissez la formation qui vous intéresse.' },
  message: {
    required: 'Écrivez votre message.',
    maxlength: `Votre message est trop long (${MAX_MESSAGE} caractères au maximum).`,
  },
  rgpd: { defaut: 'Cochez la case pour que nous puissions vous répondre.' },
};

/**
 * Formulaire de contact de la page /contact (CLAUDE.md, « Formulaire de contact ») :
 * nom, e-mail, téléphone, objet, formation visée (si l’objet est « Une formation »), message,
 * « Comment nous avez-vous connus ? » et case RGPD. Envoi à public/contact.php avec
 * type = « contact », le champ piège site_web et l’horodatage debut (anti-spam).
 * Préremplissage possible par l’adresse : /contact?objet=formation&formation=drainage-corps.
 */
@Component({
  selector: 'app-formulaire-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulaire-contact.html',
  styleUrl: './formulaire-contact.css',
})
export class FormulaireContact {
  private readonly envoi = inject(EnvoiFormulaire);
  private readonly hote = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly objets = OBJETS_CONTACT;
  protected readonly connus = CONNU_CONTACT;
  protected readonly formations = FORMATIONS;
  protected readonly email = SITE_INFO.email;
  protected readonly whatsapp = lienWhatsApp();
  protected readonly delai = DELAI_REPONSE || 'dans les meilleurs délais';
  protected readonly messageTest = MESSAGE_MODE_TEST;
  protected readonly maxMessage = MAX_MESSAGE;

  protected readonly etat = signal<Etat>('saisie');
  protected readonly messageErreur = signal('');
  protected readonly soumis = signal(false);

  protected readonly formulaire = new FormGroup({
    nom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_NOM)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(254),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ],
    }),
    telephone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^\+?[0-9 .()-]{10,20}$/)],
    }),
    objet: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    formation: new FormControl('', { nonNullable: true }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_MESSAGE)],
    }),
    connu: new FormControl('', { nonNullable: true }),
    rgpd: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    /** Champ piège : invisible, laissé vide par les humains. */
    site_web: new FormControl('', { nonNullable: true }),
  });
  private debut = horodatage();

  constructor() {
    const detruit = inject(DestroyRef);

    // La formation visée n’est demandée (et obligatoire) que si l’objet est « Une formation ».
    this.formulaire.controls.objet.valueChanges
      .pipe(takeUntilDestroyed(detruit))
      .subscribe((objet) => this.ajusterFormation(objet));

    // Préremplissage : /contact?objet=formation&formation=<id>.
    inject(ActivatedRoute)
      .queryParamMap.pipe(takeUntilDestroyed(detruit))
      .subscribe((params) => {
        const objet = params.get('objet');
        const formation = params.get('formation');
        if (objet && OBJETS_CONTACT.some((o) => o.id === objet)) {
          this.formulaire.controls.objet.setValue(objet);
        }
        if (formation && FORMATIONS.some((f) => f.id === formation)) {
          this.formulaire.controls.objet.setValue('formation');
          this.formulaire.controls.formation.setValue(formation);
        }
      });
  }

  protected get afficheFormation(): boolean {
    return this.formulaire.controls.objet.value === 'formation';
  }

  private ajusterFormation(objet: string): void {
    const controle = this.formulaire.controls.formation;
    controle.setValidators(objet === 'formation' ? [Validators.required] : []);
    controle.updateValueAndValidity({ emitEvent: false });
  }

  protected erreur(nom: string): string | null {
    const controle = this.formulaire.get(nom);
    if (!controle || controle.valid || !controle.errors) return null;
    if (!controle.touched && !this.soumis()) return null;
    const messages = MESSAGES_ERREUR[nom] ?? {};
    const cle = Object.keys(controle.errors).find((c) => messages[c]);
    return (cle ? messages[cle] : messages['defaut']) ?? null;
  }

  protected async envoyer(): Promise<void> {
    this.soumis.set(true);
    this.formulaire.markAllAsTouched();
    if (this.formulaire.invalid) {
      const premier = ORDRE_CHAMPS.find((n) => this.formulaire.get(n)?.invalid);
      if (premier) this.element(`contact-${premier}`)?.focus();
      return;
    }

    this.etat.set('envoi');
    this.messageErreur.set('');
    const v = this.formulaire.getRawValue();
    const resultat = await this.envoi.envoyer({
      type: 'contact',
      nom: v.nom.trim(),
      email: v.email.trim(),
      telephone: v.telephone.trim(),
      objet: v.objet,
      formation: v.objet === 'formation' ? v.formation : '',
      message: v.message.trim(),
      connu: v.connu,
      rgpd: v.rgpd,
      site_web: v.site_web,
      debut: this.debut,
    });

    if (resultat.statut === 'erreur') {
      this.etat.set('erreur');
      this.messageErreur.set(
        resultat.message ??
          `L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous à ${this.email}.`,
      );
      setTimeout(() => this.element('contact-echec')?.focus());
      return;
    }
    this.etat.set(resultat.statut);
    setTimeout(() => this.element('contact-resultat')?.focus());
  }

  /** Après un envoi : formulaire vide pour une nouvelle demande. */
  protected nouveauMessage(): void {
    this.formulaire.reset();
    this.soumis.set(false);
    this.messageErreur.set('');
    this.debut = horodatage();
    this.etat.set('saisie');
    setTimeout(() => this.element('contact-nom')?.focus());
  }

  private element(id: string): HTMLElement | null {
    return this.hote.nativeElement.querySelector<HTMLElement>(`#${id}`);
  }
}
