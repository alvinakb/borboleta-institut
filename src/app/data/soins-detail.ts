// Textes des pages de soin /soins/<id> (docs/DESIGN-SYSTEM.md, partie 10, « Pages de soin »).
//
// Écrits uniquement à partir des textes validés : document Word (contenu/textes-site-borboleta.txt),
// intros de contenu/tarifs.json et texte SEO d’accueil (contenu/seo-accueil.txt).
// Règles : bien-être, légèreté, silhouette, esthétique ; aucune allégation médicale, aucun
// chiffre inventé. Les prix ne sont jamais écrits ici : ils viennent de tarifs.generated.ts.
//
// SEO : titre de 60 caractères maximum, suffixe « | Borboleta Institut » compris ;
// meta description de 155 caractères maximum.

import type { QuestionFaq } from './faq';
import { CATEGORIES_SOINS, categorieParId, formaterPrix } from './tarifs';
import type { CategorieSoins, Soin } from './types';

export const SUFFIXE_TITRE = ' | Borboleta Institut';

/** Lignes de tarif d’une autre catégorie à afficher sur la page (offres, cures). */
export interface ComplementTarif {
  /** Identifiant de la catégorie dans contenu/tarifs.json. */
  readonly categorie: string;
  /** Noms exacts des soins à reprendre (ignorés s’ils n’existent plus). */
  readonly noms: readonly string[];
}

export interface DetailSoin {
  readonly id: string;
  /** Nom court : colonnes de soins, fil de la page. */
  readonly nomCourt: string;
  /** Titre principal (h1) du visuel plein écran. */
  readonly titre: string;
  /** Phrase sous le titre. */
  readonly phrase: string;
  /** Titre SEO sans le suffixe (39 caractères maximum). */
  readonly seoTitre: string;
  /** Meta description (155 caractères maximum). */
  readonly seoDescription: string;
  /** En quoi consiste le soin. */
  readonly consiste: readonly string[];
  /** Pour qui (facultatif : absent si l’information n’est pas validée). */
  readonly pourQui?: string;
  /** Déroulé d’une séance, en étapes courtes. */
  readonly deroule: readonly { readonly titre: string; readonly texte: string }[];
  readonly precautions: readonly string[];
  readonly faq: readonly QuestionFaq[];
  readonly complements?: readonly ComplementTarif[];
}

/** Prix d’un soin lu dans les données, formaté (« 90 € »), ou chaîne vide s’il n’existe plus. */
/** Prix d’un soin retrouvé par son nom exact dans contenu/tarifs.json (jamais par sa position). */
function prix(categorie: string, nom: string): string {
  const soin = categorieParId(categorie)?.soins.find((s) => s.nom === nom);
  return soin ? formaterPrix(soin.prix) : '';
}

const ECOUTE = {
  titre: 'L’accueil',
  texte:
    'Chaque rendez-vous commence par une écoute de vos attentes, pour vous orienter vers le soin le plus adapté.',
};

const CONTRE_INDICATIONS =
  'Certaines situations nécessitent un avis préalable : n’hésitez pas à les signaler lors de la prise de rendez-vous.';

const RESERVER: QuestionFaq = {
  question: 'Comment réserver ?',
  reponse: 'La réservation se fait en ligne, à tout moment, via notre page Planity.',
};

const premiereSeance = prix(
  'offres-decouverte',
  'Première séance de drainage lymphatique méthode Renata França',
);

export const SOINS_DETAIL: readonly DetailSoin[] = [
  {
    id: 'drainage-renata-franca',
    nomCourt: 'Drainage Renata França',
    titre: 'Drainage lymphatique méthode Renata França',
    phrase: 'Le soin signature de l’institut, pour une vraie sensation de légèreté.',
    seoTitre: 'Drainage Renata França à Draveil',
    seoDescription:
      'Drainage lymphatique méthode Renata França à Draveil (91) : corps entier ou membres inférieurs, en séance ou en cure. Réservation en ligne sur Planity.',
    consiste: [
      'Le drainage lymphatique méthode Renata França se pratique par des pressions fermes, à un rythme soutenu. Un bon drainage se reconnaît à la main : la pression, le rythme, la précision.',
      'C’est le soin signature de Borboleta Institut : une vraie sensation de légèreté et un moment pour prendre soin de votre silhouette, dans le calme d’un institut pensé pour vous déconnecter.',
    ],
    pourQui:
      'Le drainage du corps est exclusivement réservé aux femmes. Il se pratique sur le corps entier ou sur les membres inférieurs.',
    deroule: [
      ECOUTE,
      {
        titre: 'Le drainage',
        texte:
          'Des pressions fermes et rythmées, sur le corps entier ou sur les membres inférieurs, selon le soin choisi.',
      },
      {
        titre: 'Après la séance',
        texte:
          'Vous repartez avec une sensation de légèreté. Les cures, à tarif dégressif, prolongent ce bien-être dans le temps.',
      },
    ],
    precautions: [
      CONTRE_INDICATIONS,
      'Après une chirurgie esthétique, choisissez le drainage post-opératoire, toujours avec l’accord du professionnel de santé qui assure votre suivi.',
      'Pendant la grossesse, le soin bien-être femme enceinte est proposé à partir de 3 mois.',
    ],
    faq: [
      {
        question: 'Le drainage est-il réservé aux femmes ?',
        reponse:
          'Le drainage et le remodelage du corps sont exclusivement réservés aux femmes. Le drainage du visage, Miracle Face, est ouvert aux femmes et aux hommes.',
      },
      {
        question: 'Que ressent-on après une première séance ?',
        reponse:
          'La plupart des clientes décrivent une agréable sensation de légèreté et de détente. Les cures prolongent ce bien-être dans le temps.',
      },
      {
        question: 'Existe-t-il une offre pour une première fois ?',
        reponse: premiereSeance
          ? `Oui : la première séance de drainage lymphatique méthode Renata França est proposée en offre découverte, à ${premiereSeance}.`
          : 'Oui : une première séance de drainage lymphatique méthode Renata França est proposée en offre découverte.',
      },
    ],
    complements: [
      {
        categorie: 'offres-decouverte',
        noms: [
          'Première séance de drainage lymphatique méthode Renata França',
          'Drainage lymphatique visage et corps, le combo parfait',
        ],
      },
      {
        categorie: 'cures',
        noms: [
          'Summer Express : drainage corps, 5 séances',
          'Drainage full body, visage et corps, 10 séances',
        ],
      },
    ],
  },
  {
    id: 'miracle-face',
    nomCourt: 'Miracle Face',
    titre: 'Miracle Face, le drainage lymphatique du visage',
    phrase: 'Un effet bonne mine, des traits reposés. Pour les femmes comme pour les hommes.',
    seoTitre: 'Miracle Face, drainage visage Draveil',
    seoDescription:
      'Miracle Face, drainage lymphatique du visage méthode Renata França à Draveil (91) : effet bonne mine, traits reposés. Pour les femmes et les hommes.',
    consiste: [
      'Le Miracle Face est le drainage du visage selon la méthode Renata França. Il associe des gestes manuels spécifiques pour un moment de détente et une sensation de fraîcheur.',
      'Un effet bonne mine, des traits reposés, un regard défatigué.',
    ],
    pourQui: 'Le Miracle Face est ouvert aux femmes et aux hommes.',
    deroule: [
      ECOUTE,
      {
        titre: 'Le drainage du visage',
        texte: 'Des gestes manuels précis sur le visage, selon la méthode Renata França.',
      },
      {
        titre: 'Après la séance',
        texte:
          'Un effet bonne mine et une sensation de fraîcheur. Le soin existe aussi en cure, à tarif dégressif.',
      },
    ],
    precautions: [CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Le Miracle Face est-il ouvert aux hommes ?',
        reponse:
          'Oui. Le drainage du visage, Miracle Face, est ouvert aux femmes et aux hommes. Le drainage et le remodelage du corps sont réservés aux femmes.',
      },
      {
        question: 'Peut-on l’associer au drainage du corps ?',
        reponse:
          'Oui : le combo parfait réunit le drainage lymphatique du corps et le Miracle Face dans une même séance.',
      },
      RESERVER,
    ],
    complements: [
      {
        categorie: 'drainage-renata-franca',
        noms: ['Le combo parfait : drainage lymphatique RF et Miracle Face'],
      },
    ],
  },
  {
    id: 'remodelage',
    nomCourt: 'Remodelage',
    titre: 'Remodelage méthode Renata França',
    phrase: 'Des manœuvres fermes et précises pour sculpter et redessiner la silhouette.',
    seoTitre: 'Remodelage Renata França à Draveil',
    seoDescription:
      'Remodelage méthode Renata França et soin Body Signature à Draveil (91) : des manœuvres fermes et précises pour redessiner la silhouette.',
    consiste: [
      'Palper rouler, glissements, pincements : le remodelage travaille la silhouette par des manœuvres fermes et précises. La silhouette se redessine, joliment galbée.',
      'Le soin Body Signature réunit drainage et remodelage en une seule prestation.',
    ],
    pourQui:
      'Le remodelage du corps est exclusivement réservé aux femmes. Il se pratique sur le corps entier ou sur les membres inférieurs.',
    deroule: [
      ECOUTE,
      {
        titre: 'Le remodelage',
        texte:
          'Des manœuvres fermes et vigoureuses, sur le corps entier ou sur les membres inférieurs.',
      },
      {
        titre: 'Dans la durée',
        texte: 'Le remodelage existe en cure, à tarif dégressif, pour installer le résultat.',
      },
    ],
    precautions: [CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Quelle différence avec le drainage ?',
        reponse:
          'Le drainage se pratique par des pressions fermes à un rythme soutenu, pour une sensation de légèreté. Le remodelage, plus vigoureux, travaille la silhouette : palper rouler, glissements, pincements.',
      },
      {
        question: 'Qu’est-ce que le soin Body Signature ?',
        reponse: 'Le soin Body Signature réunit drainage et remodelage en une seule prestation.',
      },
      {
        question: 'Le remodelage est-il réservé aux femmes ?',
        reponse:
          'Oui. Le drainage et le remodelage du corps sont exclusivement réservés aux femmes.',
      },
    ],
    complements: [
      {
        categorie: 'cures',
        noms: [
          'Summer Express : remodelage corps anti-cellulite, 5 séances',
          'Body Signature, drainage et remodelage, 10 séances',
        ],
      },
    ],
  },
  {
    id: 'rouleau-bresilien',
    nomCourt: 'Rouleau brésilien',
    titre: 'Soin corps au rouleau brésilien',
    phrase: 'Un soin ciblé qui prolonge le drainage lymphatique.',
    seoTitre: 'Soin au rouleau brésilien à Draveil',
    seoDescription:
      'Soin corps anti-cellulite au rouleau brésilien à Draveil (91) : un soin ciblé par zone, qui prolonge le drainage lymphatique. Réservation sur Planity.',
    consiste: [
      'Un soin ciblé du corps au rouleau brésilien, qui prolonge le drainage lymphatique. Il se pratique par zone : bras, ventre, cuisses ou fessiers.',
      'Il peut être associé à un drainage des membres inférieurs dans la même séance.',
    ],
    deroule: [
      ECOUTE,
      {
        titre: 'Le soin',
        texte: 'Le rouleau brésilien est travaillé sur une ou deux zones, selon le soin choisi.',
      },
      {
        titre: 'Avec le drainage',
        texte: 'Le soin prolonge le drainage lymphatique, réalisé au préalable.',
      },
    ],
    precautions: [
      'Une séance de drainage lymphatique au préalable est indispensable.',
      CONTRE_INDICATIONS,
    ],
    faq: [
      {
        question: 'Faut-il avoir fait un drainage avant ?',
        reponse:
          'Oui. Une séance de drainage lymphatique au préalable est indispensable. Vous pouvez aussi choisir la formule qui associe drainage des membres inférieurs et rouleau brésilien.',
      },
      {
        question: 'Sur quelles zones ?',
        reponse: 'Bras, ventre, cuisses ou fessiers, sur une ou deux zones selon le soin choisi.',
      },
    ],
    complements: [
      {
        categorie: 'cures',
        noms: ['Summer Express : drainage jambes et rouleau brésilien 1 zone, 5 séances'],
      },
    ],
  },
  {
    id: 'visage-lcp',
    nomCourt: 'Soins visage LCP',
    titre: 'Soins du visage sur mesure LCP',
    phrase: 'Des soins professionnels, chacun complété par un drainage visage express.',
    seoTitre: 'Soins du visage LCP à Draveil',
    seoDescription:
      'Soins du visage sur mesure LCP à Draveil (91) : Pro Age+, Hydra Fresh, Pollution Control, Boost Sculpt, complétés par un drainage visage express.',
    consiste: [
      'Des soins professionnels LCP, 97 % d’origine naturelle, made in France et vegan, chacun complété par un drainage visage express.',
      'Quatre soins au choix : Pro Age+ pour la fermeté et la nutrition, Hydra Fresh pour l’hydratation et l’éclat, Pollution Control pour purifier et matifier, Boost Sculpt pour la tonicité et l’éclat.',
    ],
    deroule: [
      ECOUTE,
      { titre: 'Le soin', texte: 'Le soin LCP choisi, adapté à votre peau.' },
      {
        titre: 'Le drainage express',
        texte: 'Chaque soin se termine par un drainage du visage express.',
      },
    ],
    precautions: [CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Quel soin choisir ?',
        reponse:
          'Chaque rendez-vous commence par une écoute de vos attentes, pour vous orienter vers le soin le plus adapté.',
      },
      RESERVER,
    ],
  },
  {
    id: 'kobido',
    nomCourt: 'Kobido',
    titre: 'Kobido, le lifting japonais du visage',
    phrase: 'Lissage, drainage et digitopression pour un effet rajeunissant naturel.',
    seoTitre: 'Kobido, lifting japonais à Draveil',
    seoDescription:
      'Kobido, lifting japonais du visage à Draveil (91) : lissage, drainage et digitopression pour un effet rajeunissant naturel. En séance ou en cure.',
    consiste: [
      'Le Kobido est une technique japonaise qui associe lissage, drainage et digitopression, pour un effet rajeunissant naturel, sans maquillage.',
      'Un vrai moment de reconnexion et de bien-être.',
    ],
    deroule: [
      ECOUTE,
      { titre: 'Le soin', texte: 'Lissage, drainage et digitopression, sur tout le visage.' },
      {
        titre: 'Dans la durée',
        texte: 'Le Kobido existe aussi en cure, à tarif dégressif.',
      },
    ],
    precautions: [CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Le Kobido existe-t-il en cure ?',
        reponse: 'Oui, le Kobido se réserve à la séance ou en cure, à tarif dégressif.',
      },
      {
        question: 'Peut-on apprendre le Kobido ?',
        reponse:
          'Oui. Le centre de formation de Borboleta Institut propose une formation au Kobido, en présentiel et en petit groupe.',
      },
    ],
  },
  {
    id: 'radiofrequence',
    nomCourt: 'Radiofréquence',
    titre: 'Radiofréquence visage et corps avec Bloomea',
    phrase: 'Une radiofréquence non invasive pour raffermir et redessiner.',
    seoTitre: 'Radiofréquence Bloomea à Draveil',
    seoDescription:
      'Radiofréquence visage et corps avec Bloomea à Draveil (91) : un soin non invasif pour raffermir et redessiner. Bilan personnalisé avant toute cure.',
    consiste: [
      'Une radiofréquence non invasive, avec Bloomea, pour raffermir et redessiner la silhouette. Elle se pratique sur le corps, par zone (ventre, cuisses, bras ou dos), et sur le visage.',
      'Un bilan personnalisé précède toute cure.',
    ],
    deroule: [
      {
        titre: 'Le bilan personnalisé',
        texte:
          'Un premier rendez-vous pour faire le point sur vos attentes et les zones à travailler.',
      },
      {
        titre: 'La séance',
        texte: 'La radiofréquence est appliquée sur une ou deux zones du corps, ou sur le visage.',
      },
      {
        titre: 'La cure',
        texte: 'Les cures, à tarif dégressif, installent le résultat dans le temps.',
      },
    ],
    precautions: ['Un bilan personnalisé précède toute cure.', CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Pourquoi un bilan avant la cure ?',
        reponse:
          'Un bilan personnalisé précède toute cure : il permet de définir avec vous les zones à travailler et le rythme des séances.',
      },
      {
        question: 'Peut-on essayer avant de s’engager ?',
        reponse:
          'Oui : l’offre découverte réunit le bilan personnalisé et une première zone de radiofréquence.',
      },
    ],
    complements: [
      {
        categorie: 'cures',
        noms: ['Summer Express : radiofréquence 1 zone corps, 5 séances'],
      },
    ],
  },
  {
    id: 'pressotherapie',
    nomCourt: 'Pressothérapie',
    titre: 'Pressothérapie',
    phrase: 'Une agréable sensation de légèreté dans les jambes.',
    seoTitre: 'Pressothérapie à Draveil',
    seoDescription:
      'Pressothérapie à Draveil (91) : des bottes de pression enveloppantes, pour un moment de détente et une agréable sensation de légèreté dans les jambes.',
    consiste: [
      'Des bottes de pression enveloppantes, pour un moment de détente et une agréable sensation de légèreté dans les jambes.',
    ],
    deroule: [
      ECOUTE,
      {
        titre: 'Le soin',
        texte:
          'Vous êtes installée confortablement, les bottes de pression enveloppent les jambes.',
      },
      {
        titre: 'Après la séance',
        texte: 'Une agréable sensation de légèreté dans les jambes.',
      },
    ],
    precautions: [CONTRE_INDICATIONS],
    faq: [
      {
        question: 'Y a-t-il des contre-indications ?',
        reponse:
          'Certaines situations nécessitent un avis préalable. N’hésitez pas à les signaler lors de la prise de rendez-vous.',
      },
      RESERVER,
    ],
  },
  {
    id: 'post-operatoire',
    nomCourt: 'Post-opératoire',
    titre: 'Drainage post-opératoire, chirurgie esthétique',
    phrase:
      'Un drainage adapté pour accompagner la récupération, avec l’accord du professionnel de santé qui assure votre suivi.',
    seoTitre: 'Drainage post-opératoire à Draveil',
    seoDescription:
      'Drainage post-opératoire après chirurgie esthétique à Draveil (91), méthode Renata França ou Dr Vodder, avec l’accord de votre professionnel de santé.',
    consiste: [
      'Un drainage adapté pour accompagner la récupération après une chirurgie esthétique, avec l’accord et dans le respect des consignes du professionnel de santé qui assure le suivi.',
      'Deux protocoles sont proposés en cure : la méthode Renata França sur le corps entier, ou la méthode Dr Vodder, par zone.',
    ],
    pourQui:
      'Pour les personnes qui ont eu une chirurgie esthétique et dont le professionnel de santé a donné son accord.',
    deroule: [
      {
        titre: 'L’accord médical',
        texte:
          'Avant de commencer, l’accord du professionnel de santé qui assure votre suivi est indispensable.',
      },
      {
        titre: 'Les séances',
        texte: 'Un drainage doux et adapté à la zone opérée, dans le respect des consignes reçues.',
      },
      {
        titre: 'La cure',
        texte: 'Les séances se suivent en cure, au rythme convenu avec vous.',
      },
    ],
    precautions: [
      'Les séances se font toujours avec l’accord du professionnel de santé qui assure votre suivi, et dans le respect de ses recommandations.',
      'Signalez votre intervention et sa date lors de la prise de rendez-vous.',
    ],
    faq: [
      {
        question: 'Peut-on prendre rendez-vous pour un drainage post-opératoire ?',
        reponse:
          'Oui. Après une intervention de chirurgie esthétique, les séances se font toujours avec l’accord du professionnel de santé qui assure votre suivi, et dans le respect de ses recommandations.',
      },
      {
        question: 'Méthode Renata França ou méthode Dr Vodder ?',
        reponse:
          'La cure méthode Renata França concerne le corps entier, la méthode Dr Vodder se pratique par zone. Le choix se fait selon votre intervention et les consignes du professionnel de santé.',
      },
    ],
  },
  {
    id: 'dr-vodder',
    nomCourt: 'Méthode Dr Vodder',
    titre: 'Drainage lymphatique méthode Dr Vodder',
    phrase: 'Un drainage manuel, zone par zone.',
    seoTitre: 'Drainage méthode Dr Vodder à Draveil',
    seoDescription:
      'Drainage lymphatique manuel méthode Dr Vodder à Draveil (91), par zone : visage et cou, bras, abdomen, jambes, dos. En séance ou en cure de 10 séances.',
    consiste: [
      'La méthode Dr Vodder est un drainage manuel pratiqué zone par zone : visage et cou, nuque, poitrine, bras, abdomen, membres inférieurs, lombaires, dos.',
      'Mariline s’est formée à la méthode Dr Vodder en 2023.',
    ],
    deroule: [
      ECOUTE,
      { titre: 'Le drainage', texte: 'Un drainage manuel, concentré sur la zone choisie.' },
      {
        titre: 'La cure',
        texte: 'Le soin existe aussi en cure de 10 séances, par zone.',
      },
    ],
    precautions: [
      CONTRE_INDICATIONS,
      'Après une chirurgie esthétique, la cure post-opératoire méthode Dr Vodder se fait toujours avec l’accord du professionnel de santé qui assure votre suivi.',
    ],
    faq: [
      {
        question: 'Quelles zones peut-on choisir ?',
        reponse:
          'Visage et cou, nuque, poitrine, bras, abdomen, membres inférieurs, lombaires ou dos. Chaque séance porte sur une zone.',
      },
      {
        question: 'La méthode Dr Vodder est-elle proposée après une chirurgie ?',
        reponse:
          'Oui, en cure post-opératoire par zone, toujours avec l’accord du professionnel de santé qui assure votre suivi.',
      },
    ],
    complements: [
      {
        categorie: 'post-operatoire',
        noms: ['10 séances post-opératoires, méthode Dr Vodder, par zone'],
      },
    ],
  },
  {
    id: 'femme-enceinte',
    nomCourt: 'Femme enceinte',
    titre: 'Bien-être de la femme enceinte',
    phrase: 'Un soin tout en douceur pour retrouver de la légèreté dans les jambes.',
    seoTitre: 'Drainage femme enceinte à Draveil',
    seoDescription:
      'Drainage lymphatique bien-être pour la femme enceinte à Draveil (91), à partir de 3 mois : un soin tout en douceur pour la légèreté des jambes.',
    consiste: [
      'Un drainage lymphatique méthode Renata França adapté à la grossesse, tout en douceur, pour retrouver de la légèreté dans les jambes.',
      'Il peut aussi être associé au Miracle Face, le drainage du visage.',
    ],
    pourQui: 'Pour les femmes enceintes, à partir de 3 mois de grossesse.',
    deroule: [
      ECOUTE,
      {
        titre: 'Le soin',
        texte: 'Un drainage tout en douceur, dans une position confortable.',
      },
      {
        titre: 'Après la séance',
        texte: 'Une sensation de légèreté. Le soin existe aussi en cure, à tarif dégressif.',
      },
    ],
    precautions: [
      'Le soin est proposé à partir de 3 mois de grossesse.',
      'Signalez votre grossesse lors de la prise de rendez-vous. En cas de doute, demandez l’avis de votre sage-femme ou de votre médecin.',
    ],
    faq: [
      {
        question: 'À partir de quand peut-on venir ?',
        reponse: 'Le soin bien-être femme enceinte est proposé à partir de 3 mois de grossesse.',
      },
      {
        question: 'Existe-t-il en cure ?',
        reponse: 'Oui, le drainage femme enceinte existe en cure de 5 séances.',
      },
    ],
  },
];

const PAR_ID = new Map(SOINS_DETAIL.map((d) => [d.id, d]));

/** Détail d’un soin, ou undefined si l’identifiant n’a pas de page. */
export function detailSoin(id: string | null | undefined): DetailSoin | undefined {
  return id ? PAR_ID.get(id) : undefined;
}

/** Vrai si /soins/<id> existe (et si la catégorie a encore des soins dans les tarifs). */
export function aUnePageSoin(id: string): boolean {
  return PAR_ID.has(id) && !!categorieParId(id)?.soins.length;
}

/** Lien vers la page d’un soin, ou vers sa catégorie sur la page Tarifs à défaut. */
export function lienPageSoin(id: string): { lien: string; fragment?: string } {
  return aUnePageSoin(id) ? { lien: `/soins/${id}` } : { lien: '/tarifs', fragment: id };
}

/** Lignes de tarif complémentaires (offres découverte, cures) d’un soin, lues dans les données. */
export function tarifsComplementaires(detail: DetailSoin): readonly Soin[] {
  return (detail.complements ?? []).flatMap((c) => {
    const categorie: CategorieSoins | undefined = categorieParId(c.categorie);
    return categorie ? categorie.soins.filter((s) => c.noms.includes(s.nom)) : [];
  });
}

/** Les familles affichées en colonnes sur l’accueil (docs/DESIGN-SYSTEM.md, partie 10). */
export const FAMILLES_PRINCIPALES: readonly string[] = [
  'drainage-renata-franca',
  'miracle-face',
  'remodelage',
  'kobido',
  'radiofrequence',
  'post-operatoire',
  'femme-enceinte',
];

/** Ordre des soins tel que dans contenu/tarifs.json. */
export const IDS_SOINS_AVEC_PAGE: readonly string[] = CATEGORIES_SOINS.map((c) => c.id).filter(
  aUnePageSoin,
);
