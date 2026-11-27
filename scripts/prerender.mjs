// Pré-génère chaque page en HTML complet après `vite build`, pour que Google
// et les robots des outils d'IA lisent le contenu sans exécuter le JavaScript.
// Chaque page est écrite dans dist/<page>.html : Cloudflare sert /travail depuis travail.html.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const racine = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(racine, 'dist');
const serveur = path.join(racine, 'dist-ssr', 'entry-server.js');
const { render, PAGES, SITE } = await import(pathToFileURL(serveur).href);

const modele = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const ROUTES = ['/', '/travail', '/la-maison', '/a-la-carte', '/contact', '/mentions-legales', '/confidentialite'];
const attr = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const route of ROUTES) {
  const corps = await render(route);
  let html = modele.replace('<div id="root"></div>', () => `<div id="root" data-page="${route}">${corps}</div>`);
  const page = PAGES[route];
  if (page) {
    const adresse = SITE + (route === '/' ? '/' : route);
    html = html
      .replace(/<title>[^<]*<\/title>/, () => `<title>${attr(page.titre)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => a + attr(page.description) + b)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => a + attr(page.titre) + b)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => a + attr(page.description) + b)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => a + adresse + b)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + adresse + b);
  }
  const fichier = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, fichier), html);
  console.log(`pré-généré : ${route} -> dist/${fichier} (${Math.round(corps.length / 1024)} ko)`);
}
