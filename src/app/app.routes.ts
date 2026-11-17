import { Routes } from '@angular/router';

// Une route par page. Titre (title) et meta description (data.description) par page,
// appliqués par core/seo-title-strategy.ts. Mot clé principal : drainage lymphatique à Draveil (91).

const SUFFIXE = ' | Borboleta Institut';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/accueil/accueil').then((m) => m.Accueil),
    title: 'Drainage lymphatique à Draveil (91)' + SUFFIXE,
    data: {
      description:
        'Borboleta Institut, drainage lymphatique à Draveil (91), méthode Renata França : soins corps et visage, remodelage, Kobido, et centre de formation certifié Qualiopi.',
    },
  },
  {
    path: 'institut',
    loadComponent: () => import('./pages/institut/institut').then((m) => m.Institut),
    title: "L'institut et l'approche, drainage lymphatique à Draveil" + SUFFIXE,
    data: {
      description:
        'Découvrez Borboleta Institut à Draveil (91) : un lieu calme dédié au drainage lymphatique méthode Renata França et au remodelage, pour votre bien-être et votre silhouette.',
    },
  },
  {
    path: 'soins',
    loadComponent: () => import('./pages/soins/soins').then((m) => m.Soins),
    title: 'Nos soins, drainage lymphatique à Draveil (91)' + SUFFIXE,
    data: {
      description:
        'Drainage lymphatique corps et visage, remodelage, rouleau brésilien, Kobido, soins LCP, radiofréquence et pressothérapie à Draveil (91). Réservation en ligne sur Planity.',
    },
  },
  {
    path: 'tarifs',
    loadComponent: () => import('./pages/tarifs/tarifs').then((m) => m.Tarifs),
    title: 'Tarifs des soins, drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Tous les tarifs de Borboleta Institut à Draveil (91) : drainage lymphatique méthode Renata França, remodelage, soins du visage, radiofréquence, cures et offres découverte.',
    },
  },
  {
    path: 'cartes-cadeaux',
    loadComponent: () =>
      import('./pages/cartes-cadeaux/cartes-cadeaux').then((m) => m.CartesCadeaux),
    title: 'Cartes cadeaux, drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Offrez un moment de bien-être chez Borboleta Institut à Draveil (91) : cartes cadeaux pour un soin, une cure ou un montant libre, disponibles en institut.',
    },
  },
  {
    path: 'avis',
    loadComponent: () => import('./pages/avis/avis').then((m) => m.Avis),
    title: 'Avis clientes, drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Borboleta Institut, drainage lymphatique à Draveil (91), noté 5 sur 5 par sa clientèle sur Planity. Découvrez les avis vérifiés et suivez-nous sur Instagram.',
    },
  },
  {
    path: 'formations',
    loadComponent: () => import('./pages/formations/formations').then((m) => m.Formations),
    title: 'Formations drainage lymphatique, certifiées Qualiopi' + SUFFIXE,
    data: {
      description:
        'Cinq formations professionnelles en présentiel et en petit groupe : drainage lymphatique corps et visage, remodelage, post-opératoire et Kobido. Centre certifié Qualiopi.',
    },
  },
  {
    path: 'parcours',
    loadComponent: () => import('./pages/parcours/parcours').then((m) => m.Parcours),
    title: 'Le parcours et le déroulement des formations' + SUFFIXE,
    data: {
      description:
        "De l'inscription à la fin de la formation : le parcours par niveaux et le déroulement des formations au drainage lymphatique de Borboleta Institut, en région parisienne.",
    },
  },
  {
    path: 'formatrice',
    loadComponent: () => import('./pages/formatrice/formatrice').then((m) => m.Formatrice),
    title: 'La formatrice, Da Costa Mariline' + SUFFIXE,
    data: {
      description:
        'Da Costa Mariline, praticienne et formatrice, fondatrice de Borboleta Institut à Draveil (91). Formée à la méthode Renata França, à la méthode Dr Vodder et au Kobido.',
    },
  },
  {
    path: 'financement',
    loadComponent: () => import('./pages/financement/financement').then((m) => m.Financement),
    title: 'Financement des formations, CPF et OPCO' + SUFFIXE,
    data: {
      description:
        'Organisme certifié Qualiopi : vos formations au drainage lymphatique peuvent être prises en charge par le CPF, les OPCO, le FAFCEA ou France Travail. Nous vous accompagnons.',
    },
  },
  {
    path: 'calendrier',
    loadComponent: () => import('./pages/calendrier/calendrier').then((m) => m.Calendrier),
    title: 'Calendrier des sessions de formation' + SUFFIXE,
    data: {
      description:
        'Prochaines sessions de formation au drainage lymphatique chez Borboleta Institut : nous consulter. Laissez vos coordonnées pour être informée des prochaines dates.',
    },
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/inscription/inscription').then((m) => m.Inscription),
    title: "S'inscrire à une formation" + SUFFIXE,
    data: {
      description:
        'Inscrivez-vous à une formation au drainage lymphatique chez Borboleta Institut : par le formulaire du site, par téléphone ou WhatsApp, ou via Mon Compte Formation (CPF).',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact, drainage lymphatique à Draveil (91)' + SUFFIXE,
    data: {
      description:
        'Contactez Borboleta Institut, 10 allée des Grandes Pièces, 91210 Draveil : horaires, accès, formulaire de contact et réservation de vos soins sur Planity.',
    },
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
    title: 'Questions fréquentes, drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Vos questions sur le drainage lymphatique à Draveil (91) et sur nos formations : déroulement des soins, réservation, contre-indications, financement et inscription.',
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./pages/mentions-legales/mentions-legales').then((m) => m.MentionsLegales),
    title: 'Mentions légales' + SUFFIXE,
    data: {
      description:
        'Mentions légales du site de Borboleta Institut, institut de drainage lymphatique et centre de formation à Draveil (91) : éditeur, hébergeur et informations légales.',
    },
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./pages/confidentialite/confidentialite').then((m) => m.Confidentialite),
    title: 'Politique de confidentialité' + SUFFIXE,
    data: {
      description:
        'Politique de confidentialité de Borboleta Institut : données collectées par le formulaire de contact, finalités, durée de conservation et exercice de vos droits.',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/page-404/page-404').then((m) => m.Page404),
    title: 'Page introuvable' + SUFFIXE,
    data: {
      description:
        "Cette page n'existe pas ou a été déplacée. Retrouvez les soins et les formations de Borboleta Institut, drainage lymphatique à Draveil (91).",
    },
  },
];
