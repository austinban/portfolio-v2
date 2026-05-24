import { AnimatePresence, motion } from 'framer-motion';
import { SceneProvider, useScene, TOTAL_SCENES } from '../context/SceneEngine';
import NameScreen from './NameScreen';
import SceneNav from './ui/SceneNav';
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
  const { currentScene, direction, hasEnteredName } = useScene();

  const Scene = currentScene >= 0 && currentScene < TOTAL_SCENES
    ? SCENES[currentScene]
    : null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {!hasEnteredName && (
          <NameScreen key="name-screen" />
        )}

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
