import { Link } from 'react-router-dom';
import { url, vars } from '@/components/nod';
import { enLangue, projets } from './projets';
import { useLanguage } from '@/contexts/LanguageContext';

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
  { id: 'idala', tx: '-312px', rot: '-6deg', z: 10, fond: 'linear-gradient(150deg,#F55F31,#FF914D)' },
  { id: 'jasminka', tx: '-156px', rot: '-3deg', z: 20, fond: 'linear-gradient(150deg,#112542,#2a4f7a)' },
  { id: 'unmatched', tx: '0px', rot: '0deg', z: 40, fond: 'linear-gradient(150deg,#FF914D,#FFD35F)' },
  { id: 'drugs', tx: '156px', rot: '3deg', z: 20, fond: 'linear-gradient(150deg,#112542,#2a4f7a)' },
  { id: 'oda', tx: '312px', rot: '6deg', z: 10, fond: 'linear-gradient(150deg,#F55F31,#FF914D)' },
];

export default function ProjetsCartes() {
  const { language } = useLanguage();
  return (
    <div className="cartes">
      {PLACES.map((place) => {
        const trouve = projets.find((p) => p.id === place.id);
        if (!trouve) return null;
        const projet = enLangue(trouve, language);
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
              '--carte-image': url(projet.carte ?? projet.image),
            })}
            aria-label={`${projet.titre}, ${projet.sousTitre}`}
          >
            {/* Le lien garde sa place ; seul le corps bouge au survol. Sinon la
                carte se dérobe sous la souris et le survol clignote. */}
            <span className="carte__corps">
              <span className="carte__nom" aria-hidden="true">{projet.titre}</span>
              <span className="carte__visuel" aria-hidden="true" />
              <span className="carte__voile" aria-hidden="true" />
              <span className="carte__legende">
                <span className="carte__titre">{projet.titre}</span>
                <span className="carte__sous">{projet.sousTitre}</span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
