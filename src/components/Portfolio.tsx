import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneProvider, useScene, TOTAL_SCENES } from '../context/SceneEngine';
import NameScreen from './NameScreen';
import SceneNav from './ui/SceneNav';
import HintToast from './ui/HintToast';
import SceneGreeting from './sections/SceneGreeting';
import SceneWhatIDo from './sections/SceneWhatIDo';
import SceneWork from './sections/SceneWork';
import SceneAbout from './sections/SceneAbout';
import SceneContact from './sections/SceneContact';

const SCENES = [SceneGreeting, SceneWhatIDo, SceneWork, SceneAbout, SceneContact];

const sceneVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-60%' : '60%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PortfolioInner() {
  const { currentScene, direction, hasEnteredName, advance, retreat } = useScene();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') return;
      if (currentScene < 0) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); advance(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); retreat(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentScene, advance, retreat]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || currentScene < 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) advance();
    else retreat();
  };

  const Scene = currentScene >= 0 && currentScene < TOTAL_SCENES
    ? SCENES[currentScene]
    : null;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* NameScreen gets its own AnimatePresence so its exit isn't blocked by initial={false} */}
      <AnimatePresence>
        {!hasEnteredName && <NameScreen key="name-screen" />}
      </AnimatePresence>

      {/* Scene transitions use initial={false} so returning visitors skip the enter animation */}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {hasEnteredName && Scene && (
          <motion.div
            key={`scene-${currentScene}`}
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Scene />
          </motion.div>
        )}
      </AnimatePresence>

      {hasEnteredName && <SceneNav />}
      {hasEnteredName && <HintToast />}
    </div>
  );
}

export default function Portfolio() {
  return (
    <SceneProvider>
      <PortfolioInner />
    </SceneProvider>
  );
}
