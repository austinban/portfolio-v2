import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScene, TOTAL_SCENES } from '../../context/SceneEngine';

interface Props {
  drawerOpen?: boolean;
  drawerWidth?: number;
}

export default function SceneNav({ drawerOpen = false, drawerWidth = 0 }: Props) {
  const { currentScene, advance, retreat, t } = useScene();
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
    return () => { clearTimeout(startTimer); clearTimeout(stopTimer); };
  }, [currentScene, isLast]);

  const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <motion.div
      className="fixed bottom-8 inset-x-0 flex items-center justify-between px-8 md:px-16 pointer-events-none z-30"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, x: drawerOpen ? drawerWidth : 0 }}
      transition={{
        opacity: { delay: 0.6, duration: 0.5 },
        y:       { delay: 0.6, duration: 0.5 },
        x:       slideTransition,
      }}
    >
      <button
        onClick={retreat}
        disabled={isFirst}
        className="pointer-events-auto text-muted text-sm uppercase tracking-widest hover:text-cream disabled:opacity-0 transition-all duration-200 px-3 py-2 -mx-3 -my-2"
      >
        {t.ui.nav.back}
      </button>

      <div
        role="progressbar"
        aria-valuenow={currentScene + 1}
        aria-valuemin={1}
        aria-valuemax={TOTAL_SCENES}
        aria-label={`${currentScene + 1} / ${TOTAL_SCENES}`}
        className="flex gap-2 pointer-events-auto"
      >
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`h-1 transition-all duration-300 ${
              i === currentScene ? 'w-6 bg-yellow' : 'w-2 bg-muted/40'
            }`}
          />
        ))}
      </div>

      {!isLast ? (
        <motion.button
          onClick={advance}
          animate={bouncing ? { y: [0, -6, 0] } : { y: 0 }}
          transition={bouncing ? { repeat: Infinity, duration: 0.7, ease: 'easeInOut' } : {}}
          className="pointer-events-auto text-sm uppercase tracking-widest font-bold text-cream hover:text-yellow transition-colors duration-200 px-3 py-2 -mx-3 -my-2"
        >
          {t.ui.nav.next}
        </motion.button>
      ) : (
        <div aria-hidden="true" className="pointer-events-auto" />
      )}
    </motion.div>
  );
}
