import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { EASTER_EGGS, type AnimationType, type EasterEggConfig } from '../../data/easterEggs';

const EGG_PREFIX = 'portfolio_egg_';

function r(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Particle {
  id: number;
  style: React.CSSProperties;
  initial: object;
  animate: object;
  transition: object;
}

function buildParticle(type: AnimationType, i: number, size: number): Particle {
  switch (type) {
    case 'fly-across':
      return {
        id: i,
        style: { position: 'fixed', left: 0, top: `${r(15, 65)}%`, fontSize: `${size}rem` },
        initial: { x: '-15vw', y: 0, rotate: r(-8, 8), opacity: 1 },
        animate: { x: '115vw', y: `${r(-10, 10)}vh`, rotate: r(-8, 8), opacity: 1 },
        transition: { duration: r(2.5, 3.5), ease: 'easeInOut' },
      };
    case 'fly-up':
      return {
        id: i,
        style: { position: 'fixed', left: `${r(40, 60)}%`, top: '95%', fontSize: `${size}rem` },
        initial: { y: 0, opacity: 1, scale: 0.8 },
        animate: { y: '-130vh', opacity: [1, 1, 0.8, 0], scale: [0.8, 1.3, 1.5] },
        transition: { duration: r(2, 2.5), ease: [0.22, 1, 0.36, 1] },
      };
    case 'rain':
      return {
        id: i,
        style: { position: 'fixed', left: `${r(3, 97)}%`, top: 0, fontSize: `${r(size * 0.7, size * 1.4)}rem` },
        initial: { y: '-10vh', opacity: 0, rotate: r(-30, 30) },
        animate: { y: '115vh', opacity: [0, 0.9, 0.9, 0], rotate: r(-60, 60) },
        transition: { duration: r(2.5, 4), ease: 'easeIn', delay: r(0, 2.5) },
      };
    case 'float-up':
      return {
        id: i,
        style: { position: 'fixed', left: `${r(3, 97)}%`, top: '100%', fontSize: `${r(size * 0.7, size * 1.3)}rem` },
        initial: { y: 0, x: 0, opacity: 0 },
        animate: { y: `${r(-40, -90)}vh`, x: `${r(-5, 5)}vw`, opacity: [0, 0.9, 0.9, 0] },
        transition: { duration: r(2.5, 4.5), ease: 'easeOut', delay: r(0, 2) },
      };
  }
}

function buildParticles(egg: EasterEggConfig): Particle[] {
  return Array.from({ length: egg.count }, (_, i) => buildParticle(egg.type, i, egg.size));
}

export default function EasterEgg({ name }: { name: string }) {
  const [egg, setEgg] = useState<EasterEggConfig | null>(null);
  const [active, setActive] = useState(false);

  const particles = useMemo(() => (egg ? buildParticles(egg) : []), [egg]);

  useEffect(() => {
    const normalized = name.trim().toLowerCase();
    const match = EASTER_EGGS.find(e => e.names.some(n => normalized.includes(n)));
    if (!match) return;

    const key = `${EGG_PREFIX}${match.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    setEgg(match);
    const showTimer = setTimeout(() => setActive(true), 800);
    const hideTimer = setTimeout(() => setActive(false), 8000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [name]);

  if (!active || !egg) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map(p => (
        <motion.span
          key={p.id}
          style={p.style as React.CSSProperties}
          initial={p.initial}
          animate={p.animate}
          transition={p.transition}
        >
          {egg.emoji}
        </motion.span>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 4, times: [0, 0.15, 0.75, 1], delay: 1 }}
        className="absolute bottom-32 inset-x-0 text-center text-muted text-xs uppercase tracking-widest"
      >
        {egg.quip}
      </motion.p>
    </div>
  );
}
