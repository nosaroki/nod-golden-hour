import { Link } from 'react-router-dom';
import { url, vars } from '@/components/nod';
import { projets } from './projets';

/* Éventail de cartes projets. Au repos : un aplat dégradé de la marque et le
   nom du projet en filigrane. Au survol la carte se redresse et son visuel
   apparaît en fondu. Un seul mouvement, pas de rebond, pas d'ombre portée. */

interface Carte {
  id: string;
  tx: string;
  rot: string;
  z: number;
  fond: string;
}

const PLACES: Carte[] = [
  { id: 'idala', tx: '-273px', rot: '-9deg', z: 10, fond: 'linear-gradient(150deg,#F55F31,#FF914D)' },
  { id: 'jasminka', tx: '-195px', rot: '-6.5deg', z: 20, fond: 'linear-gradient(150deg,#112542,#2a4f7a)' },
  { id: 'unmatched', tx: '-117px', rot: '-4deg', z: 30, fond: 'linear-gradient(150deg,#FF914D,#FFD35F)' },
  { id: 'charly', tx: '-39px', rot: '-1.3deg', z: 38, fond: 'linear-gradient(150deg,#F55F31,#FF914D)' },
  { id: 'eva', tx: '39px', rot: '1.3deg', z: 40, fond: 'linear-gradient(150deg,#112542,#2a4f7a)' },
  { id: 'saloua', tx: '117px', rot: '4deg', z: 30, fond: 'linear-gradient(150deg,#FF914D,#FFD35F)' },
  { id: 'mangrove', tx: '195px', rot: '6.5deg', z: 20, fond: 'linear-gradient(150deg,#F55F31,#FF914D)' },
  { id: 'oda', tx: '273px', rot: '9deg', z: 10, fond: 'linear-gradient(150deg,#112542,#2a4f7a)' },
];

export default function ProjetsCartes() {
  return (
    <div className="cartes">
      {PLACES.map((place) => {
        const projet = projets.find((p) => p.id === place.id);
        if (!projet) return null;
        return (
          <Link
            key={projet.id}
            to={`/travail#${projet.id}`}
            className={'carte' + (projet.placeholder ? ' carte--sans-visuel' : '')}
            style={vars({
              '--carte-tx': place.tx,
              '--carte-rot': place.rot,
              '--carte-z': String(place.z),
              '--carte-fond': place.fond,
              '--carte-image': url(projet.image),
            })}
            aria-label={`${projet.titre}, ${projet.sousTitre}`}
          >
            <span className="carte__nom" aria-hidden="true">{projet.titre}</span>
            <span className="carte__visuel" aria-hidden="true" />
            <span className="carte__voile" aria-hidden="true" />
            <span className="carte__legende">
              <span className="carte__titre">{projet.titre}</span>
              <span className="carte__sous">{projet.sousTitre}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
