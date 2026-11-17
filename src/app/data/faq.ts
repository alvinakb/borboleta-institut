// Questions fréquentes (fusion du document Word validé et du texte SEO d'accueil).
// Règles : pas d'allégation médicale, toujours rappeler l'accord du professionnel de santé
// pour le post-opératoire.

export interface QuestionFaq {
  readonly question: string;
  readonly reponse: string;
}

export interface GroupeFaq {
  readonly titre: string;
  readonly questions: readonly QuestionFaq[];
}

export const FAQ: readonly GroupeFaq[] = [
  {
    titre: 'Le drainage lymphatique à Draveil',
    questions: [
      {
        question: 'Où faire un drainage lymphatique à Draveil ?',
        reponse:
          'Borboleta Institut vous reçoit au 10 allée des Grandes Pièces, 91210 Draveil, en Essonne, au sud-est de Paris. La clientèle vient de Draveil et des communes voisines : Vigneux-sur-Seine, Montgeron, Juvisy-sur-Orge, Athis-Mons, Viry-Châtillon, Yerres et Brunoy.',
      },
      {
        question: 'Quel drainage lymphatique propose Borboleta Institut ?',
        reponse:
          'L’institut propose le drainage lymphatique méthode Renata França, corps entier ou membres inférieurs, le drainage du visage Miracle Face, la méthode Dr Vodder par zone, ainsi que des prestations de drainage post-opératoire.',
      },
      {
        question: 'Proposez-vous le drainage lymphatique du visage ?',
        reponse:
          'Oui. Le Miracle Face, drainage du visage selon la méthode Renata França, est ouvert aux femmes comme aux hommes.',
      },
      {
        question: 'Peut-on prendre rendez-vous pour un drainage post-opératoire ?',
        reponse:
          'Oui. Après une intervention de chirurgie esthétique, les séances se font toujours avec l’accord du professionnel de santé qui assure votre suivi, et dans le respect de ses recommandations.',
      },
    ],
  },
  {
    titre: 'Les soins',
    questions: [
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
        question: 'Y a-t-il des contre-indications ?',
        reponse:
          'Certaines situations nécessitent un avis préalable. N’hésitez pas à les signaler lors de la prise de rendez-vous ou du bilan.',
      },
      {
        question: 'Comment réserver ?',
        reponse: 'La réservation se fait en ligne, à tout moment, via notre page Planity.',
      },
    ],
  },
  {
    titre: 'Les formations',
    questions: [
      {
        question: 'Faut-il déjà être professionnelle ?',
        reponse:
          'Non. La formation socle au drainage corps accepte les débutantes. Les esthéticiennes, masseuses, praticiennes bien-être et personnes en reconversion y trouvent leur place.',
      },
      {
        question: 'Où ont lieu les formations ?',
        reponse:
          'En présentiel, en région parisienne. L’adresse exacte vous est communiquée une semaine avant la session.',
      },
      {
        question: 'Repart-on avec un document ?',
        reponse:
          'Oui. Une attestation de fin de formation vous est remise, et vous repartez avec des bases solides, pas seulement des notes à relire.',
      },
      {
        question: 'La formation est-elle finançable ?',
        reponse:
          'L’institut est certifié Qualiopi. Une prise en charge est possible, notamment via le CPF (Mon Compte Formation), les OPCO, le FAFCEA ou France Travail.',
      },
      {
        question: 'Que se passe-t-il en cas d’annulation ?',
        reponse: 'Les conditions d’annulation vous sont précisées à l’inscription.',
      },
    ],
  },
];
