// Prépare la version de prévisualisation à envoyer sur le sous-domaine
// nouveau.borboleta-institut-drainage.fr (à la racine du sous-domaine).
//
// À lancer avec « npm run build:previsualisation », qui fait d'abord un build avec
// PREVISUALISATION=1 (toutes les pages en « noindex, nofollow » côté Angular), puis ce script :
// 1. ajoute <meta name="robots" content="noindex, nofollow"> dans index.html (avant même le JS) ;
// 2. ajoute l'en-tête HTTP « X-Robots-Tag: noindex, nofollow » dans le .htaccess (toutes les
//    réponses, y compris images et PDF) ;
// 3. vérifie que .htaccess, contact.php et index.html sont bien présents ;
// 4. copie le tout dans livraison/previsualisation/ et crée livraison/borboleta-previsualisation.zip
//    (dossier ignoré par git).
//
// Le build normal (« npm run build ») n'est jamais modifié par ce script.

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const build = resolve(racine, 'dist/borboleta-site/browser');
const livraison = resolve(racine, 'livraison');
const dossier = resolve(livraison, 'previsualisation');
const archive = resolve(livraison, 'borboleta-previsualisation.zip');

function arreter(message) {
  console.error(`Préparation de la prévisualisation impossible : ${message}`);
  process.exit(1);
}

// Le build doit avoir été fait en mode prévisualisation.
const genere = readFileSync(resolve(racine, 'src/app/data/tarifs.generated.ts'), 'utf8');
if (!/PREVISUALISATION = true/.test(genere)) {
  arreter(
    'lancez « npm run build:previsualisation » (le build n’est pas en mode prévisualisation).',
  );
}

for (const fichier of ['index.html', '.htaccess', 'contact.php']) {
  if (!existsSync(resolve(build, fichier))) arreter(`${fichier} manque dans ${build}.`);
}

// Copie propre du build dans livraison/previsualisation/.
rmSync(dossier, { recursive: true, force: true });
mkdirSync(livraison, { recursive: true });
cpSync(build, dossier, { recursive: true });

// 1. Balise robots dans index.html.
const cheminIndex = resolve(dossier, 'index.html');
let index = readFileSync(cheminIndex, 'utf8');
if (!index.includes('name="robots"')) {
  index = index.replace(
    /<meta charset="utf-8"\s*\/?>/i,
    (m) => `${m}\n    <meta name="robots" content="noindex, nofollow" />`,
  );
}
if (!index.includes('content="noindex, nofollow"'))
  arreter('balise robots non ajoutée à index.html.');
writeFileSync(cheminIndex, index, 'utf8');

// 2. En-tête X-Robots-Tag dans le .htaccess.
const cheminHtaccess = resolve(dossier, '.htaccess');
let htaccess = readFileSync(cheminHtaccess, 'utf8');
if (!htaccess.includes('X-Robots-Tag')) {
  htaccess += `
# PRÉVISUALISATION (nouveau.borboleta-institut-drainage.fr) : aucune page indexée par Google.
# À ne pas recopier sur le site définitif.
<IfModule mod_headers.c>
  Header always set X-Robots-Tag "noindex, nofollow"
</IfModule>
`;
  writeFileSync(cheminHtaccess, htaccess, 'utf8');
}

// 4. Archive zip (le .htaccess caché est bien inclus).
rmSync(archive, { force: true });
execFileSync('zip', ['-r', '-q', '-X', archive, '.'], { cwd: dossier });

// Remet les données générées en mode normal (PREVISUALISATION = false) pour ne jamais commiter
// ni construire le site définitif avec le noindex par erreur.
execFileSync(process.execPath, [resolve(racine, 'scripts/generer-donnees.mjs')], {
  cwd: racine,
  env: { ...process.env, PREVISUALISATION: '' },
  stdio: 'ignore',
});

console.log('Prévisualisation prête :');
console.log(`- dossier : ${dossier}`);
console.log(`- archive : ${archive}`);
