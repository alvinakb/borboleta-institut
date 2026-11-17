// ============================================================================
// FICHIER GÉNÉRÉ, NE PAS MODIFIER.
// Source : contenu/tarifs.json. Pour changer un prix, modifier contenu/tarifs.json
// puis lancer « npm run donnees » (lancé aussi automatiquement par npm start et npm run build).
// ============================================================================

import type { CategorieSoins } from './types';

export const RESERVATION_PLANITY = 'https://www.planity.com/borboleta-institut-91210-draveil';

/** Vrai si le logo officiel Qualiopi a été déposé dans public/images/qualiopi.png. */
export const LOGO_QUALIOPI_PRESENT = false;

export const CATEGORIES_SOINS: readonly CategorieSoins[] = [
  {
    id: 'offres-decouverte',
    titre: 'Offres découverte',
    intro: 'La première fois, on prend le temps de faire connaissance avec la méthode.',
    soins: [
      {
        nom: 'Première séance de drainage lymphatique méthode Renata França',
        duree: '1h',
        prix: 90,
      },
      {
        nom: 'Drainage lymphatique visage et corps, le combo parfait',
        duree: '1h30',
        prix: 140,
      },
      {
        nom: 'Bilan personnalisé radiofréquence',
        duree: '30min',
        prix: 20,
      },
      {
        nom: 'Bilan personnalisé et 1 zone de radiofréquence',
        duree: '1h',
        prix: 69,
      },
    ],
  },
  {
    id: 'drainage-renata-franca',
    titre: 'Drainage lymphatique méthode Renata França',
    intro: 'Le soin signature de l’institut, pour une vraie sensation de légèreté.',
    soins: [
      {
        nom: 'Corps entier',
        duree: '1h',
        prix: 120,
      },
      {
        nom: 'Le combo parfait : drainage lymphatique RF et Miracle Face',
        duree: '1h30',
        prix: 140,
      },
      {
        nom: 'Corps entier, cure de 5 séances',
        duree: '1h',
        prix: 500,
      },
      {
        nom: 'Membres inférieurs',
        duree: '30min',
        prix: 50,
      },
      {
        nom: 'Membres inférieurs, cure de 5 séances',
        duree: '30min',
        prix: 230,
      },
      {
        nom: 'Corps entier, cure de 10 séances',
        duree: '1h',
        prix: 800,
      },
    ],
  },
  {
    id: 'miracle-face',
    titre: 'Drainage lymphatique visage, Miracle Face',
    intro: 'Un effet bonne mine, des traits reposés. Pour les femmes comme pour les hommes.',
    soins: [
      {
        nom: 'Miracle Face, drainage visage méthode Renata França',
        duree: '30min',
        prix: 50,
      },
      {
        nom: 'Miracle Face, cure de 5 séances',
        duree: '30min',
        prix: 230,
      },
    ],
  },
  {
    id: 'remodelage',
    titre: 'Remodelage méthode Renata França et soin signature',
    intro:
      'Palper rouler, glissements, pincements : des manœuvres fermes et précises. Le Body Signature réunit drainage et remodelage.',
    soins: [
      {
        nom: 'Remodelage corps entier',
        duree: '1h15',
        prix: 130,
      },
      {
        nom: 'Soin Body Signature, drainage et remodelage',
        duree: '1h15',
        prix: 120,
      },
      {
        nom: 'Remodelage corps entier, cure de 5 séances',
        duree: '1h15',
        prix: 550,
      },
      {
        nom: 'Remodelage membres inférieurs',
        duree: '40min',
        prix: 60,
      },
      {
        nom: 'Remodelage membres inférieurs, cure de 5 séances',
        duree: '40min',
        prix: 275,
      },
    ],
  },
  {
    id: 'rouleau-bresilien',
    titre: 'Soin corps anti-cellulite au rouleau brésilien',
    intro:
      'Un soin ciblé qui prolonge le drainage. Une séance de drainage au préalable est indispensable.',
    soins: [
      {
        nom: 'Drainage membres inférieurs et rouleau brésilien, 1 zone (bras, ventre ou cuisses/fessiers)',
        duree: '50min',
        prix: 80,
      },
      {
        nom: 'Rouleau brésilien, 1 zone (bras, cuisses, ventre ou fessiers)',
        duree: '20min',
        prix: 30,
      },
      {
        nom: 'Rouleau brésilien, 2 zones (bras, jambes ou fessiers)',
        duree: '40min',
        prix: 50,
      },
    ],
  },
  {
    id: 'visage-lcp',
    titre: 'Soins du visage sur mesure LCP',
    intro:
      'Soins professionnels LCP, 97 % d’origine naturelle, made in France et vegan, chacun complété par un drainage visage express. Tous en 1h, au tarif de 90 €.',
    soins: [
      {
        nom: 'Pro Age+ : anti-âge, fermeté, nutrition, à l’extrait de caviar',
        duree: '1h',
        prix: 90,
      },
      {
        nom: 'Hydra Fresh : hydratation, repulpe, éclat',
        duree: '1h',
        prix: 90,
      },
      {
        nom: 'Pollution Control : purifiant, détoxifiant, matifiant',
        duree: '1h',
        prix: 90,
      },
      {
        nom: 'Boost Sculpt : tonicité, anti-fatigue, éclat, à la vitamine C',
        duree: '1h',
        prix: 90,
      },
    ],
  },
  {
    id: 'kobido',
    titre: 'Kobido, lifting japonais du visage',
    intro:
      'Nouveau soin visage. Lissage, drainage et digitopression pour un effet rajeunissant naturel.',
    soins: [
      {
        nom: 'Kobido, 1 séance',
        duree: '1h',
        prix: 90,
      },
      {
        nom: 'Kobido, cure de 5 séances',
        duree: '1h',
        prix: 400,
      },
    ],
  },
  {
    id: 'radiofrequence',
    titre: 'Radiofréquence visage et corps avec Bloomea',
    intro:
      'Nouvelle technologie. Une radiofréquence non invasive pour raffermir et redessiner. Un bilan personnalisé précède toute cure.',
    soins: [
      {
        nom: 'Bilan personnalisé',
        duree: '30min',
        prix: 20,
      },
      {
        nom: 'Offre découverte : bilan personnalisé et 1 zone de radiofréquence',
        duree: '1h',
        prix: 69,
      },
      {
        nom: 'Corps, 1 zone (ventre, cuisses, bras ou dos)',
        duree: '45min',
        prix: 80,
      },
      {
        nom: 'Corps, cure de 10 séances 1 zone (-10 %)',
        duree: '45min',
        prix: 720,
      },
      {
        nom: 'Corps, 2 zones',
        duree: '1h30',
        prix: 140,
      },
      {
        nom: 'Corps, cure de 10 séances 2 zones (-15 %)',
        duree: '1h30',
        prix: 1200,
      },
      {
        nom: 'Soin visage anti-âge global avec radiofréquence by Bloomea',
        duree: '1h',
        prix: 120,
      },
      {
        nom: 'Radiofréquence visage complet',
        duree: '50min',
        prix: 80,
      },
      {
        nom: 'Radiofréquence visage complet, cure de 6 séances',
        duree: '50min',
        prix: 400,
      },
    ],
  },
  {
    id: 'pressotherapie',
    titre: 'Pressothérapie',
    intro:
      'Des bottes de pression enveloppantes, pour un moment de détente et une agréable sensation de légèreté dans les jambes.',
    soins: [
      {
        nom: 'Pressothérapie',
        duree: '30min',
        prix: 25,
      },
    ],
  },
  {
    id: 'post-operatoire',
    titre: 'Soins post-opératoires, chirurgie esthétique',
    intro:
      'Un drainage adapté pour accompagner la récupération après une chirurgie esthétique, avec l’accord et dans le respect des consignes du professionnel de santé qui assure le suivi.',
    soins: [
      {
        nom: '10 séances de drainage post-opératoire corps entier, méthode Renata França',
        duree: '1h',
        prix: 800,
      },
      {
        nom: '10 séances post-opératoires, méthode Dr Vodder, par zone',
        duree: '35min',
        prix: 450,
      },
    ],
  },
  {
    id: 'dr-vodder',
    titre: 'Drainage lymphatique méthode Dr Vodder',
    intro:
      'Un drainage manuel par zone : visage et cou, poitrine, bras, abdomen, membres inférieurs, lombaires, dos, nuque.',
    soins: [
      {
        nom: 'Séance par zone',
        duree: '35min',
        prix: 50,
      },
      {
        nom: 'Cure de 10 séances par zone',
        duree: '35min',
        prix: 450,
      },
    ],
  },
  {
    id: 'femme-enceinte',
    titre: 'Bien-être femme enceinte, à partir de 3 mois',
    intro: 'Un soin tout en douceur pour retrouver de la légèreté dans les jambes.',
    soins: [
      {
        nom: 'Drainage lymphatique méthode Renata França',
        duree: '50min',
        prix: 75,
      },
      {
        nom: 'Drainage lymphatique, cure de 5 séances',
        duree: '50min',
        prix: 350,
      },
      {
        nom: 'Drainage lymphatique RF et Miracle Face',
        duree: '1h20',
        prix: 100,
      },
    ],
  },
  {
    id: 'cures',
    titre: 'Cures et formules',
    intro: 'Cure Summer Express et cures méthode Renata França.',
    soins: [
      {
        nom: 'Summer Express : drainage visage et corps, 5 séances',
        duree: '1h30',
        prix: 650,
      },
      {
        nom: 'Summer Express : remodelage corps anti-cellulite, 5 séances',
        duree: '1h15',
        prix: 550,
      },
      {
        nom: 'Summer Express : drainage corps, 5 séances',
        duree: '1h',
        prix: 500,
      },
      {
        nom: 'Summer Express : radiofréquence 1 zone corps, 5 séances',
        duree: '45min',
        prix: 400,
      },
      {
        nom: 'Summer Express : drainage jambes et rouleau brésilien 1 zone, 5 séances',
        duree: '50min',
        prix: 400,
      },
      {
        nom: 'Drainage full body, visage et corps, 10 séances',
        duree: '1h30',
        prix: 1200,
      },
      {
        nom: 'Body Signature, drainage et remodelage, 10 séances',
        duree: '1h20',
        prix: 1100,
      },
    ],
  },
  {
    id: 'cartes-cadeaux',
    titre: 'Cartes cadeaux',
    intro: 'Disponibles en institut. À offrir pour un soin, une cure ou un montant libre.',
    soins: [],
  },
];
