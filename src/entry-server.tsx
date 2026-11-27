import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Racine } from './App';

export { PAGES, SITE } from './seo';

/* Rend une page en HTML complet, une fois toutes les pages chargées à la demande prêtes. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const sortie = new Writable({
      write(morceau, _codage, suite) { html += morceau.toString(); suite(); },
    });
    sortie.on('finish', () => resolve(html));
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}><Racine /></StaticRouter>,
      {
        onAllReady() { pipe(sortie); },
        onShellError: reject,
        onError(erreur) { reject(erreur); },
      },
    );
  });
}
