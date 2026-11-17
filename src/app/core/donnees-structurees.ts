import { DOCUMENT, Injectable, inject } from '@angular/core';

import type { QuestionFaq } from '../data/faq';
import { HORAIRES_SCHEMA, SITE_INFO } from '../data/site-info';

/** Identifiants des balises <script type="application/ld+json"> gérées par le site. */
const ID_ETABLISSEMENT = 'jsonld-etablissement';
const ID_FAQ = 'jsonld-faq';

/**
 * Données structurées JSON-LD (schema.org), sans SSR : les balises sont injectées dans <head>
 * et identifiées par un id, donc remplacées (jamais empilées) à chaque navigation.
 * - Fiche établissement (BeautySalon) : posée une fois, sur toutes les pages.
 * - FAQPage : posée sur les pages qui affichent une FAQ (/faq, pages de soin), retirée ailleurs.
 * Appelé par core/seo-title-strategy.ts après chaque navigation.
 */
@Injectable({ providedIn: 'root' })
export class DonneesStructurees {
  private readonly document = inject(DOCUMENT);

  /** Fiche établissement : idempotent, la balise existante est simplement réécrite. */
  definirEtablissement(): void {
    this.ecrire(ID_ETABLISSEMENT, ficheEtablissement(this.document.baseURI));
  }

  /** FAQ de la page courante ; liste vide ou absente : la balise est retirée. */
  definirFaq(questions: readonly QuestionFaq[] | undefined): void {
    this.ecrire(ID_FAQ, questions?.length ? pageFaq(questions) : null);
  }

  private ecrire(id: string, donnees: object | null): void {
    const existant = this.document.getElementById(id);
    if (!donnees) {
      existant?.remove();
      return;
    }
    const script = existant ?? this.document.createElement('script');
    script.id = id;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(donnees);
    if (!existant) this.document.head.appendChild(script);
  }
}

/** BeautySalon : nom, adresse, horaires, Planity et Instagram, note Planity. Pas de téléphone. */
function ficheEtablissement(urlBase: string): object {
  const url = new URL('.', urlBase).href;
  const { adresse, avis } = SITE_INFO;
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${url}#institut`,
    name: SITE_INFO.nom,
    description:
      'Institut de drainage lymphatique à Draveil (91), méthode Renata França, et centre de formation certifié Qualiopi.',
    url,
    logo: new URL('images/logo-borboleta.png', url).href,
    image: new URL('images/logo-borboleta.png', url).href,
    email: SITE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: adresse.rue,
      postalCode: adresse.codePostal,
      addressLocality: adresse.ville,
      addressRegion: adresse.departement,
      addressCountry: 'FR',
    },
    openingHoursSpecification: HORAIRES_SCHEMA.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.jours.map((j) => `https://schema.org/${j}`),
      opens: h.ouverture,
      closes: h.fermeture,
    })),
    sameAs: [SITE_INFO.planity, SITE_INFO.instagram.url],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avis.note,
      bestRating: avis.noteMax,
      worstRating: 1,
      ratingCount: avis.nombre,
      reviewCount: avis.nombre,
    },
  };
}

function pageFaq(questions: readonly QuestionFaq[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };
}
