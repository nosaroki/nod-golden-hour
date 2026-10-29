import { useEffect, useRef } from 'react';

// Texte long qui se révèle mot à mot au fil du scroll. La couleur reste celle
// du texte : seuls les mots pas encore « lus » sont plus transparents.
const DEPART = 0.25;

export default function TexteRevele({ texte, className }: { texte: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mots = Array.from(el.querySelectorAll<HTMLSpanElement>('.revele__mot'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mots.forEach((m) => { m.style.opacity = '1'; });
      return;
    }

    let raf = 0;
    const maj = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      if (r.bottom < -h || r.top > h * 2) return;
      // 0 quand le haut du texte entre à 85 % de l'écran, 1 quand son bas atteint la moitié.
      const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.35)));
      const lus = p * mots.length * 1.15;
      mots.forEach((m, i) => {
        const v = Math.min(1, Math.max(0, lus - i));
        m.style.opacity = String(DEPART + (1 - DEPART) * v);
      });
    };
    const demander = () => { if (!raf) raf = requestAnimationFrame(maj); };
    maj();
    window.addEventListener('scroll', demander, { passive: true });
    window.addEventListener('resize', demander);
    return () => {
      window.removeEventListener('scroll', demander);
      window.removeEventListener('resize', demander);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [texte]);

  const morceaux = texte.split(/(\s+)/);
  return (
    <p ref={ref} className={className ? `${className} revele` : 'revele'}>
      <span className="revele__lecteur">{texte}</span>
      <span aria-hidden="true">
        {morceaux.map((m, i) => (/^\s+$/.test(m) ? m : <span className="revele__mot" key={i}>{m}</span>))}
      </span>
    </p>
  );
}
