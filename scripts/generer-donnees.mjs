// Génère src/app/data/tarifs.generated.ts à partir de contenu/tarifs.json.
// contenu/tarifs.json est la seule source des prix du site : ne jamais écrire un prix ailleurs.
// Lancement : npm run donnees (lancé automatiquement avant npm start et npm run build).

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(racine, 'contenu/tarifs.json');
const cible = resolve(racine, 'src/app/data/tarifs.generated.ts');

const erreurs = [];
const brut = JSON.parse(readFileSync(source, 'utf8'));

if (
  typeof brut.reservation_planity !== 'string' ||
  !brut.reservation_planity.startsWith('https://')
) {
  erreurs.push('reservation_planity manquant ou invalide');
}
if (!Array.isArray(brut.categories)) {
  erreurs.push('categories doit être un tableau');
}

const ids = new Set();
const categories = (brut.categories ?? []).map((cat, i) => {
  for (const champ of ['id', 'titre', 'intro']) {
    if (typeof cat[champ] !== 'string' || !cat[champ].trim()) {
      erreurs.push(`catégorie n°${i + 1} : champ « ${champ} » manquant`);
    }
  }
  if (ids.has(cat.id)) erreurs.push(`identifiant de catégorie en double : ${cat.id}`);
  ids.add(cat.id);
  const soins = (cat.soins ?? []).map((soin, j) => {
    if (typeof soin.nom !== 'string' || !soin.nom.trim()) {
      erreurs.push(`${cat.id}, soin n°${j + 1} : nom manquant`);
    }
    if (typeof soin.duree !== 'string') erreurs.push(`${cat.id}, ${soin.nom} : durée manquante`);
    if (typeof soin.prix !== 'number' || !Number.isFinite(soin.prix) || soin.prix < 0) {
      erreurs.push(`${cat.id}, ${soin.nom} : prix invalide`);
    }
    return { nom: soin.nom, duree: soin.duree, prix: soin.prix };
  });
  return { id: cat.id, titre: cat.titre, intro: cat.intro, soins };
});

if (erreurs.length) {
  console.error('Erreurs dans contenu/tarifs.json :\n- ' + erreurs.join('\n- '));
  process.exit(1);
}

const contenu = `// ============================================================================
// FICHIER GÉNÉRÉ, NE PAS MODIFIER.
// Source : contenu/tarifs.json. Pour changer un prix, modifier contenu/tarifs.json
// puis lancer « npm run donnees » (lancé aussi automatiquement par npm start et npm run build).
// ============================================================================

import type { CategorieSoins } from './types';

export const RESERVATION_PLANITY = ${JSON.stringify(brut.reservation_planity)};

/** Vrai si le logo officiel Qualiopi a été déposé dans public/images/qualiopi.png. */
export const LOGO_QUALIOPI_PRESENT = ${existsSync(resolve(racine, 'public/images/qualiopi.png'))};

export const CATEGORIES_SOINS: readonly CategorieSoins[] = ${JSON.stringify(categories, null, 2)};
`;

// Mise en forme Prettier (même style que le reste du code, pas de diff inutile).
// Si Prettier n’est pas installé, le fichier est écrit tel quel.
let sortie = contenu;
try {
  const prettier = await import('prettier');
  const options = (await prettier.resolveConfig(cible)) ?? {};
  sortie = await prettier.format(contenu, { ...options, filepath: cible });
} catch (e) {
  if (e?.code !== 'ERR_MODULE_NOT_FOUND') {
    console.warn('Prettier : mise en forme ignorée (' + (e?.message ?? e) + ')');
  }
}

mkdirSync(dirname(cible), { recursive: true });
writeFileSync(cible, sortie, 'utf8');
const nbSoins = categories.reduce((n, c) => n + c.soins.length, 0);
console.log(
  `Données générées : ${categories.length} catégories, ${nbSoins} soins -> src/app/data/tarifs.generated.ts`,
);
