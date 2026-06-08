import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useScene, TOTAL_SCENES } from "../../context/SceneEngine";

interface Props {
  drawerOpen?: boolean;
  drawerWidth?: number;
  onAdvance?: () => void;
}

export default function SceneNav({
  drawerOpen = false,
  drawerWidth = 0,
  onAdvance,
}: Props) {
  const { currentScene, advance, retreat, goTo, t } = useScene();
  const handleAdvance = onAdvance ?? advance;
  const [bouncing, setBouncing] = useState(false);

  const isFirst = currentScene === 0;
  const isLast = currentScene === TOTAL_SCENES - 1;

  useEffect(() => {
    setBouncing(false);
    if (isLast) return;

    let startTimer: ReturnType<typeof setTimeout>;
    let stopTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      startTimer = setTimeout(() => {
        setBouncing(true);
        stopTimer = setTimeout(() => {
          setBouncing(false);
          cycle();
        }, 2000);
      }, 8000);
    };

    cycle();
    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [currentScene, isLast]);

  const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 bottom-8 z-30 flex items-center justify-between px-8 md:px-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, x: drawerOpen ? drawerWidth : 0 }}
      transition={{
        opacity: { delay: 0.6, duration: 0.5 },
        y: { delay: 0.6, duration: 0.5 },
        x: slideTransition,
      }}
    >
      <button
        onClick={retreat}
        disabled={isFirst}
        className="text-muted hover:text-cream pointer-events-auto -mx-3 -my-2 px-3 py-2 text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-0"
      >
        {t.ui.nav.back}
      </button>

      <nav
        aria-label="Scene navigation"
        className="pointer-events-auto flex items-center gap-2"
      >
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to scene ${i + 1}`}
            aria-current={i === currentScene ? "step" : undefined}
            animate={{
              width: i === currentScene ? 24 : 8,
              backgroundColor:
                i === currentScene
                  ? "var(--color-yellow)"
                  : "rgba(122,112,96,0.4)",
            }}
            whileHover={{
              height: 8,
              width: i === currentScene ? 28 : 14,
              backgroundColor:
                i === currentScene
                  ? "var(--color-yellow)"
                  : "rgba(122,112,96,0.7)",
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 4 }}
            className="-my-2 cursor-pointer py-2"
          />
        ))}
      </nav>

      {!isLast ? (
        <motion.button
          onClick={handleAdvance}
          animate={bouncing ? { y: [0, -6, 0] } : { y: 0 }}
          transition={
            bouncing
              ? { repeat: Infinity, duration: 0.7, ease: "easeInOut" }
              : {}
          }
          className="text-cream hover:text-yellow pointer-events-auto -mx-3 -my-2 px-3 py-2 text-sm font-bold tracking-widest uppercase transition-colors duration-200"
        >
          {t.ui.nav.next}
        </motion.button>
      ) : (
        <div aria-hidden="true" className="pointer-events-auto" />
      )}
    </motion.div>
  );
}
