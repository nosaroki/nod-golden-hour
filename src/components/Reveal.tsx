import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react';

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
  [key: string]: unknown;
};

// Révélation au défilement : fondu + légère translation vers le haut.
// Polymorphe via `as` pour ne pas casser les grilles (on applique la classe
// directement à l'élément plutôt que dans un wrapper).
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['reveal', visible ? 'reveal--visible' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={cls} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
