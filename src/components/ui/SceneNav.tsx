import { motion } from 'framer-motion';
import { useScene, TOTAL_SCENES } from '../../context/SceneEngine';

export default function SceneNav() {
  const { currentScene, advance, retreat, t } = useScene();

  const isFirst = currentScene === 0;
  const isLast = currentScene === TOTAL_SCENES - 1;

  return (
    <motion.div
      className="fixed bottom-8 inset-x-0 flex items-center justify-between px-8 md:px-16 pointer-events-none z-30"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <button
        onClick={retreat}
        disabled={isFirst}
        className="pointer-events-auto text-muted text-sm uppercase tracking-widest hover:text-cream disabled:opacity-0 transition-all duration-200"
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
        <button
          onClick={advance}
          className="pointer-events-auto text-sm uppercase tracking-widest font-bold text-cream hover:text-yellow transition-colors duration-200"
        >
          {t.ui.nav.next}
        </button>
      ) : (
        <div aria-hidden="true" className="pointer-events-auto" />
      )}
    </motion.div>
  );
}
