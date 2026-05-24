import { motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import EditableName from '../ui/EditableName';
import EasterEgg from '../ui/EasterEgg';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const line = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SceneGreeting() {
  const { isRandomName, visitorName } = useScene();

  const sub = isRandomName
    ? 'Bold choice, embracing the alias. I respect it.'
    : visitorName.trim().toLowerCase() === 'austin'
      ? 'Might I just say, what a beautiful name you have.'
      : 'Good to meet you. If that is your real name.';

  return (
    <>
    <EasterEgg name={visitorName} />
    <motion.div
      className="fixed inset-0 flex items-center px-8 md:px-20 bg-dark"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-3xl">
        <motion.p variants={line} className="text-muted text-sm uppercase tracking-widest mb-6">
          {sub}
        </motion.p>

        <motion.h1 variants={line} className="text-6xl md:text-8xl font-bold text-cream leading-none mb-2">
          Hey{' '}
          <EditableName className="text-cream" />.
        </motion.h1>

        <motion.h2 variants={line} className="text-6xl md:text-8xl font-bold leading-none mb-10">
          I'm <span className="text-yellow">Austin</span>{visitorName.trim().toLowerCase() === 'austin' ? ' too' : ''}.
        </motion.h2>

        <motion.p variants={line} className="text-xl md:text-2xl text-muted font-light max-w-lg leading-relaxed">
          I design and build digital products — the kind that feel fast, make sense immediately, and are genuinely hard to put down.
        </motion.p>
      </div>
    </motion.div>
    </>
  );
}
