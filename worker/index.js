// Petit script devant les fichiers statiques. Il ne sert qu'aux vidéos :
// Safari exige de pouvoir les lire par morceaux (requêtes « Range »),
// ce que l'hébergement statique de Cloudflare ne fait pas tout seul.
// Tout le reste du site est servi directement, sans passer par ici.
export default {
  async fetch(request, env) {
    const reponse = await env.ASSETS.fetch(request.url);
    if (!reponse.ok) return reponse;

    const entetes = new Headers(reponse.headers);
    entetes.set("Accept-Ranges", "bytes");
    entetes.set("Cache-Control", "public, max-age=604800");

    const plage = request.headers.get("Range");
    const correspondance = plage && /^bytes=(\d*)-(\d*)$/.exec(plage.trim());
    if (!correspondance) {
      return new Response(request.method === "HEAD" ? null : reponse.body, { status: 200, headers: entetes });
    }

    const donnees = await reponse.arrayBuffer();
    const taille = donnees.byteLength;
    let debut = correspondance[1] === "" ? NaN : Number(correspondance[1]);
    let fin = correspondance[2] === "" ? taille - 1 : Number(correspondance[2]);
    if (Number.isNaN(debut)) {
      // « bytes=-500 » : les 500 derniers octets.
      debut = Math.max(0, taille - fin);
      fin = taille - 1;
    }
    fin = Math.min(fin, taille - 1);
    if (debut > fin || debut >= taille) {
      entetes.set("Content-Range", `bytes */${taille}`);
      return new Response(null, { status: 416, headers: entetes });
    }

    entetes.set("Content-Range", `bytes ${debut}-${fin}/${taille}`);
    entetes.set("Content-Length", String(fin - debut + 1));
    return new Response(request.method === "HEAD" ? null : donnees.slice(debut, fin + 1), { status: 206, headers: entetes });
  },
};
