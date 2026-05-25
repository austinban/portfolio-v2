import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const BURST_KEY = "portfolio_name_burst";
const COUNT = 60;
const COLORS = ["#eeab12", "#eeab12", "#eeab12", "#f2ede4", "#fe826a"];

interface Particle {
  id: number;
  char: string;
  left: number;
  top: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
  rotate: number;
  startOpacity: number;
}

function buildParticles(name: string): Particle[] {
  const chars = name.toUpperCase().split("");
  return Array.from({ length: COUNT }, (_, i) => {
    const fromCenter = i % 3 === 0;
    return {
      id: i,
      char: chars[i % chars.length]!,
      left: fromCenter ? 25 + Math.random() * 50 : Math.random() * 100,
      top: fromCenter ? 25 + Math.random() * 50 : Math.random() * 100,
      size: 2 + Math.random() * 11,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      delay: Math.random() * 1.4,
      duration: 2.5 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 70,
      dy: -(20 + Math.random() * 80),
      rotate: (Math.random() - 0.5) * 540,
      startOpacity: 0.4 + Math.random() * 0.6,
    };
  });
}

export default function NameParticles({ name }: { name: string }) {
  const [show, setShow] = useState(false);
  const particles = useMemo(() => buildParticles(name), [name]);

  useEffect(() => {
    if (sessionStorage.getItem(BURST_KEY)) return;
    sessionStorage.setItem(BURST_KEY, "1");

    // Small delay so the scene entrance animation finishes first
    const show = setTimeout(() => setShow(true), 600);
    const hide = setTimeout(() => setShow(false), 7500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ scale: 0, opacity: p.startOpacity, rotate: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.4, 0.9, 0],
            opacity: [p.startOpacity, p.startOpacity, p.startOpacity * 0.6, 0],
            x: `${p.dx}vw`,
            y: `${p.dy}vh`,
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}rem`,
            color: p.color,
            fontWeight: 700,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}
