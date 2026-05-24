import { motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import EditableName from '../ui/EditableName';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SceneAbout() {
  const { isRandomName } = useScene();

  return (
    <motion.div
      className="fixed inset-0 flex items-center px-8 md:px-20 bg-dark"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-2xl">
        <motion.p variants={item} className="text-muted text-sm uppercase tracking-widest mb-8">
          {isRandomName ? 'The person behind all this:' : 'A bit more:'}
        </motion.p>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-cream leading-none mb-10">
          I care about<br />
          <span className="text-pink">craft</span>.
        </motion.h1>

        <motion.div variants={item} className="flex flex-col gap-5 text-lg text-muted font-light leading-relaxed max-w-lg">
          <p>
            I've spent the last decade building at the intersection of frontend engineering and UX — shipping products across fintech, SaaS, and wellness. I work best at the seam between the two: close enough to the code to know what's hard, close enough to users to know what matters.
          </p>
          <p>
            Right now I'm a Senior UX Engineer at Thrive Global, building tools that help people beat burnout. Before that: Firstbase, Azura, Athena Advisory, and a handful of things that didn't make it to the portfolio.
          </p>
          <p>
            When I'm not working, I'm hiking in Maine, reading something I probably won't finish, or insisting my coffee order is not complicated.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
