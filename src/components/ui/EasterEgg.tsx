import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import {
  EASTER_EGGS,
  makeShortNameEgg,
  DEV_NAME_QUIPS,
  makeDevNameEgg,
  COMMON_NAME_QUIPS,
  makeCommonNameEgg,
  type AnimationType,
  type EasterEggConfig,
} from "../../data/easterEggs";
import { useScene } from "../../context/SceneEngine";

function r(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Particle {
  id: number;
  style: React.CSSProperties;
  iconSize: number;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

function buildParticle(type: AnimationType, i: number, size: number): Particle {
  const px = size * 16;
  switch (type) {
    case "fly-across":
      return {
        id: i,
        style: { position: "fixed", left: 0, top: `${r(15, 65)}%` },
        iconSize: px,
        initial: { x: "-15vw", y: 0, rotate: r(-8, 8), opacity: 1 },
        animate: {
          x: "115vw",
          y: `${r(-10, 10)}vh`,
          rotate: r(-8, 8),
          opacity: 1,
        },
        transition: { duration: r(4, 6), ease: "easeInOut" },
      };
    case "fly-up":
      return {
        id: i,
        style: { position: "fixed", left: `${r(40, 60)}%`, top: "95%" },
        iconSize: px,
        initial: { y: 0, opacity: 1, scale: 0.8 },
        animate: {
          y: "-130vh",
          opacity: [1, 1, 0.8, 0],
          scale: [0.8, 1.3, 1.5],
        },
        transition: { duration: r(4, 5.5), ease: [0.22, 1, 0.36, 1] },
      };
    case "rain":
      return {
        id: i,
        style: { position: "fixed", left: `${r(3, 97)}%`, top: 0 },
        iconSize: r(size * 0.7, size * 1.4) * 16,
        initial: { y: "-10vh", opacity: 0, rotate: r(-30, 30) },
        animate: { y: "115vh", opacity: [0, 0.9, 0.9, 0], rotate: r(-60, 60) },
        transition: { duration: r(3.5, 5.5), ease: "easeIn", delay: r(0, 2) },
      };
    case "float-up":
      return {
        id: i,
        style: { position: "fixed", left: `${r(3, 97)}%`, top: "100%" },
        iconSize: r(size * 0.7, size * 1.3) * 16,
        initial: { y: 0, x: 0, opacity: 0 },
        animate: {
          y: `${r(-40, -90)}vh`,
          x: `${r(-5, 5)}vw`,
          opacity: [0, 0.9, 0.9, 0],
        },
        transition: {
          duration: r(3.5, 5.5),
          ease: "easeOut",
          delay: r(0, 1.5),
        },
      };
  }
}

function buildParticles(egg: EasterEggConfig): Particle[] {
  return Array.from({ length: egg.count }, (_, i) =>
    buildParticle(egg.type, i, egg.size),
  );
}

export default function EasterEgg({
  name,
  onQuip,
}: {
  name: string;
  onQuip?: (quip: string | null) => void;
}) {
  const { t } = useScene();
  const [egg, setEgg] = useState<EasterEggConfig | null>(null);
  const [active, setActive] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const particles = useMemo(() => (egg ? buildParticles(egg) : []), [egg]);

  useEffect(() => {
    setActive(false);
    setEgg(null);
    onQuip?.(null);

    const normalized = name.trim().toLowerCase();

    // Short name check — fires before regular egg lookup
    if (normalized.length > 0 && normalized.length < 2) {
      const shortEgg = makeShortNameEgg();
      setEgg(shortEgg);
      const showTimer = setTimeout(() => {
        setActive(true);
        onQuip?.(shortEgg.quip);
      }, 800);
      const hideTimer = setTimeout(() => {
        setActive(false);
        onQuip?.(null);
      }, 10000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    // Named easter egg check (random/fun names)
    const match = EASTER_EGGS.find((e) =>
      e.names.some((n) => normalized.includes(n)),
    );
    if (match) {
      setEgg(match);
      const quip = t.eggs[match.id] ?? match.quip;
      const showTimer = setTimeout(() => {
        setActive(true);
        onQuip?.(quip);
      }, 800);
      const hideTimer = setTimeout(() => {
        setActive(false);
        onQuip?.(null);
      }, 10000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    // Dev name check (test, hello world, foo, null, etc.)
    const devQuip = DEV_NAME_QUIPS[normalized];
    if (devQuip) {
      const devEgg = makeDevNameEgg(devQuip);
      setEgg(devEgg);
      const showTimer = setTimeout(() => {
        setActive(true);
        onQuip?.(devQuip);
      }, 800);
      const hideTimer = setTimeout(() => {
        setActive(false);
        onQuip?.(null);
      }, 10000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    // Common name check (~100 most common names with etymology quips)
    const commonQuip = COMMON_NAME_QUIPS[normalized];
    if (commonQuip) {
      const commonEgg = makeCommonNameEgg(commonQuip);
      setEgg(commonEgg);
      const showTimer = setTimeout(() => {
        setActive(true);
        onQuip?.(commonQuip);
      }, 800);
      const hideTimer = setTimeout(() => {
        setActive(false);
        onQuip?.(null);
      }, 10000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [name]);

  if (!active || !egg) return null;

  const Icon = egg.Icon;
  const quip = t.eggs[egg.id] ?? egg.quip;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Decorative particles — hidden from assistive technology */}
      <div aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            style={
              {
                ...p.style,
                color: "#eeab12",
                display: "block",
              } as React.CSSProperties
            }
            initial={p.initial}
            animate={p.animate}
            transition={p.transition}
          >
            <Icon size={Math.round(p.iconSize)} strokeWidth={1.5} />
          </motion.span>
        ))}
      </div>

      {/* Quip announced to screen readers via live region */}
      <p
        ref={liveRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {quip}
      </p>
    </div>
  );
}
