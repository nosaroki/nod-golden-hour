import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { fanCards } from '../data/projects';

// Éventail de cartes projets. Au repos : couleurs NOD ; au survol la carte
// passe au premier plan et révèle son image (ou son nom fantôme).
export default function ProjectFan() {
  return (
    <div className="fan">
      {fanCards.map((c) => (
        <Link
          key={c.id}
          to={`/travail#${c.id}`}
          className="card"
          style={{ '--tx': c.tx, '--ty': c.ty, '--rot': c.rot, zIndex: c.z, background: c.bg } as CSSProperties}
        >
          {c.img && <div className="card__img" style={{ background: c.img }} />}
          <span className="card__label" style={{ color: c.labelColor }}>{c.label}</span>
          {c.ghost && (
            <span className="card__ghost" style={{ color: c.ghostColor, fontSize: c.ghostSize }}>{c.ghost}</span>
          )}
          <div className="card__overlay" style={{ height: c.ovH, background: `linear-gradient(transparent,${c.ov})` }} />
          <div className="card__meta">
            <div className="card__title">{c.title} <span className="card__arrow">→</span></div>
            <div className="card__sub">{c.sub}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
