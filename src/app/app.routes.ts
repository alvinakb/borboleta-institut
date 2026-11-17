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
        'Borboleta Institut, drainage lymphatique à Draveil (91) méthode Renata França : soins corps et visage, remodelage, Kobido. Centre de formation Qualiopi.',
    },
  },
  {
    path: 'institut',
    loadComponent: () => import('./pages/institut/institut').then((m) => m.Institut),
    title: 'L’institut et l’approche à Draveil' + SUFFIXE,
    data: {
      description:
        'Borboleta Institut à Draveil (91) : un lieu calme dédié au drainage lymphatique méthode Renata França et au remodelage, pour votre bien-être.',
    },
  },
  {
    path: 'soins',
    loadComponent: () => import('./pages/soins/soins').then((m) => m.Soins),
    title: 'Soins de drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Drainage lymphatique corps et visage, remodelage, Kobido, soins LCP, radiofréquence et pressothérapie à Draveil (91). Réservation sur Planity.',
    },
  },
  {
    path: 'tarifs',
    loadComponent: () => import('./pages/tarifs/tarifs').then((m) => m.Tarifs),
    title: 'Tarifs drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Tous les tarifs de Borboleta Institut à Draveil (91) : drainage méthode Renata França, remodelage, soins visage, radiofréquence, cures et offres.',
    },
  },
  {
    path: 'cartes-cadeaux',
    loadComponent: () =>
      import('./pages/cartes-cadeaux/cartes-cadeaux').then((m) => m.CartesCadeaux),
    title: 'Cartes cadeaux bien-être à Draveil' + SUFFIXE,
    data: {
      description:
        'Offrez un moment de bien-être chez Borboleta Institut à Draveil (91) : cartes cadeaux pour un soin, une cure ou un montant libre, en institut.',
    },
  },
  {
    path: 'avis',
    loadComponent: () => import('./pages/avis/avis').then((m) => m.Avis),
    title: 'Avis clientes, note de 5/5 sur Planity' + SUFFIXE,
    data: {
      description:
        'Borboleta Institut, drainage lymphatique à Draveil (91) : note de 5/5 sur 145 avis Planity. Lisez les avis et suivez-nous sur Instagram.',
    },
  },
  {
    path: 'formations',
    loadComponent: () => import('./pages/formations/formations').then((m) => m.Formations),
    title: 'Formations drainage lymphatique' + SUFFIXE,
    data: {
      description:
        'Cinq formations en présentiel et en petit groupe : drainage corps et visage, remodelage, post-opératoire et Kobido. Centre certifié Qualiopi.',
    },
  },
  {
    path: 'parcours',
    loadComponent: () => import('./pages/parcours/parcours').then((m) => m.Parcours),
    title: 'Parcours et déroulement des formations' + SUFFIXE,
    data: {
      description:
        'De l’inscription à la fin de la formation : le parcours par niveaux et le déroulement des formations au drainage lymphatique de Borboleta Institut.',
    },
  },
  {
    path: 'formatrice',
    loadComponent: () => import('./pages/formatrice/formatrice').then((m) => m.Formatrice),
    title: 'La formatrice, Da Costa Mariline' + SUFFIXE,
    data: {
      description:
        'Da Costa Mariline, praticienne et formatrice, fondatrice de Borboleta Institut à Draveil (91). Méthode Renata França, Dr Vodder et Kobido.',
    },
  },
  {
    path: 'financement',
    loadComponent: () => import('./pages/financement/financement').then((m) => m.Financement),
    title: 'Financement des formations, CPF et OPCO' + SUFFIXE,
    data: {
      description:
        'Organisme certifié Qualiopi : vos formations au drainage lymphatique peuvent être financées par le CPF, les OPCO, le FAFCEA ou France Travail.',
    },
  },
  {
    path: 'calendrier',
    loadComponent: () => import('./pages/calendrier/calendrier').then((m) => m.Calendrier),
    title: 'Calendrier des sessions de formation' + SUFFIXE,
    data: {
      description:
        'Prochaines sessions de formation au drainage lymphatique chez Borboleta Institut : nous consulter. Soyez informée des prochaines dates.',
    },
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/inscription/inscription').then((m) => m.Inscription),
    title: 'S’inscrire à une formation' + SUFFIXE,
    data: {
      description:
        'Inscrivez-vous à une formation au drainage lymphatique chez Borboleta Institut : par le formulaire du site ou via Mon Compte Formation (CPF).',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact, drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Contactez Borboleta Institut, 10 allée des Grandes Pièces, 91210 Draveil : horaires, accès, formulaire de contact et réservation sur Planity.',
    },
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
    title: 'FAQ drainage lymphatique à Draveil' + SUFFIXE,
    data: {
      description:
        'Vos questions sur le drainage lymphatique à Draveil (91) et nos formations : déroulement des soins, réservation, financement et inscription.',
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./pages/mentions-legales/mentions-legales').then((m) => m.MentionsLegales),
    title: 'Mentions légales' + SUFFIXE,
    data: {
      description:
        'Mentions légales du site de Borboleta Institut, institut de drainage lymphatique et centre de formation à Draveil (91) : éditeur et hébergeur.',
    },
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./pages/confidentialite/confidentialite').then((m) => m.Confidentialite),
    title: 'Politique de confidentialité' + SUFFIXE,
    data: {
      description:
        'Politique de confidentialité de Borboleta Institut : données du formulaire de contact, finalités, durée de conservation et exercice de vos droits.',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/page-404/page-404').then((m) => m.Page404),
    title: 'Page introuvable' + SUFFIXE,
    data: {
      noindex: true,
      description:
        'Cette page n’existe pas ou a été déplacée. Retrouvez les soins et les formations de Borboleta Institut, drainage lymphatique à Draveil (91).',
    },
  },
];
