import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "../../context/SceneEngine";

interface LetterVar {
  r: number;
  s: number;
}
interface PeekPos {
  x: number;
  y: number;
  rotate: number;
  fontSize: number;
  driftX: number;
  driftY: number;
  letters: LetterVar[];
}

interface ConfettiPiece {
  id: number;
  color: string;
  angle: number;
  distance: number;
  extraY: number;
  size: number;
  rotation: number;
  endRotation: number;
  duration: number;
  isRound: boolean;
}

const COLORS = [
  "#eeab12",
  "#e8437a",
  "#f5f0e8",
  "#ffd040",
  "#ff9040",
  "#eeab12",
];
const PEEK_DURATION = 1400;
const MIN_INTERVAL = 18000;
const MAX_INTERVAL = 50000;

function randomPeek(): PeekPos {
  return {
    x: 20 + Math.random() * 60,
    y: 15 + Math.random() * 70,
    rotate: (Math.random() - 0.5) * 44,
    fontSize: 1.2 + Math.random() * 4.2,
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 40,
    letters: Array.from({ length: 40 }, () => ({
      r: (Math.random() - 0.5) * 18,
      s: 0.82 + Math.random() * 0.36,
    })),
  };
}

function buildConfetti(count = 32): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length]!,
    angle: (360 / count) * i + (Math.random() - 0.5) * 12,
    distance: 60 + Math.random() * 130,
    extraY: 20 + Math.random() * 60,
    size: 5 + Math.random() * 9,
    rotation: Math.random() * 360,
    endRotation: (Math.random() - 0.5) * 720,
    duration: 0.7 + Math.random() * 0.6,
    isRound: i % 3 !== 0,
  }));
}

export default function NamePeek() {
  const { visitorName, hasEnteredName } = useScene();
  const [isTabletOrAbove, setIsTabletOrAbove] = useState(false);
  const [peek, setPeek] = useState<PeekPos | null>(null);
  const [burst, setBurst] = useState<{
    x: number;
    y: number;
    pieces: ConfettiPiece[];
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedule = useCallback(() => {
    clear();
    timerRef.current = setTimeout(
      () => {
        setPeek(randomPeek());
        timerRef.current = setTimeout(() => {
          setPeek(null);
          schedule();
        }, PEEK_DURATION);
      },
      MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL),
    );
  }, [clear]);

  const triggerNow = useCallback(() => {
    clear();
    setPeek(randomPeek());
    timerRef.current = setTimeout(() => {
      setPeek(null);
      schedule();
    }, PEEK_DURATION);
  }, [clear, schedule]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsTabletOrAbove(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTabletOrAbove(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!hasEnteredName || !isTabletOrAbove) return;
    schedule();
    return clear;
  }, [hasEnteredName, isTabletOrAbove, schedule, clear]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      clear();
      setPeek(null);
      setBurst({ x: e.clientX, y: e.clientY, pieces: buildConfetti() });
      timerRef.current = setTimeout(() => {
        setBurst(null);
        schedule();
      }, 1800);
    },
    [clear, schedule],
  );

  if (!hasEnteredName || !isTabletOrAbove) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <AnimatePresence>
        {peek && (
          <motion.div
            key="peek"
            style={{
              position: "absolute",
              left: `${peek.x}%`,
              top: `${peek.y}%`,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: peek.rotate - 12,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: peek.rotate,
              x: peek.driftX,
              y: peek.driftY,
            }}
            exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.25 } }}
            transition={{
              opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 0.4 },
              x: { duration: PEEK_DURATION / 1000, ease: "linear" },
              y: { duration: PEEK_DURATION / 1000, ease: "linear" },
            }}
            onClick={handleClick}
          >
            <span
              className="text-pink/50 flex overflow-hidden font-bold select-none"
              style={{
                fontSize: `${peek.fontSize}rem`,
                maxWidth: "min(70vw, 520px)",
                padding: "0.3em 0.25em",
                margin: "-0.3em -0.25em",
              }}
            >
              {[...visitorName].map((ch, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    transform: `rotate(${peek.letters[i % peek.letters.length]!.r}deg)`,
                    fontSize: `${peek.letters[i % peek.letters.length]!.s}em`,
                    lineHeight: 1,
                  }}
                >
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {burst?.pieces.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance + p.extraY;
        return (
          <motion.div
            key={p.id}
            style={{
              position: "fixed",
              left: burst.x,
              top: burst.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.isRound ? "50%" : "2px",
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: p.rotation, scale: 1 }}
            animate={{
              x: tx,
              y: ty,
              opacity: 0,
              rotate: p.rotation + p.endRotation,
              scale: 0,
            }}
            transition={{ duration: p.duration, ease: [0.22, 0.8, 0.36, 1] }}
          />
        );
      })}
      {/* {import.meta.env.DEV && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-3">
          <button
            onClick={triggerNow}
            className="text-xs uppercase tracking-widest text-muted/50 hover:text-yellow border border-muted/20 hover:border-yellow/40 px-4 py-2 transition-colors duration-150"
          >
            test peek
          </button>
          <button
            onClick={() => {
              setBurst({ x: window.innerWidth / 2, y: window.innerHeight / 2, pieces: buildConfetti() });
              timerRef.current = setTimeout(() => { setBurst(null); schedule(); }, 1800);
            }}
            className="text-xs uppercase tracking-widest text-muted/50 hover:text-yellow border border-muted/20 hover:border-yellow/40 px-4 py-2 transition-colors duration-150"
          >
            test confetti
          </button>
        </div>
      )} */}
    </div>
  );
}
