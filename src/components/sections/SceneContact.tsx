import { motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import EditableName from '../ui/EditableName';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const links = [
  { label: 'Email', href: 'mailto:austin@austinban.com', display: 'Say hello' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austin-ban-4b719a89', display: 'in/austin-ban' },
  { label: 'GitHub', href: 'https://github.com/austinban', display: 'austinban' },
];

export default function SceneContact() {
  const { isRandomName } = useScene();

  return (
    <motion.div
      className="fixed inset-0 flex items-center px-8 md:px-20 bg-dark"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-2xl w-full">
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-cream leading-none mb-4">
          {isRandomName ? (
            <>That's the tour,{' '}<EditableName className="text-pink text-5xl md:text-7xl" />.</>
          ) : (
            <>That's everything,{' '}<EditableName className="text-cream text-5xl md:text-7xl" />.</>
          )}
        </motion.h1>

        <motion.p variants={item} className="text-xl text-muted font-light mb-14">
          {isRandomName
            ? 'Even mysterious strangers are welcome to reach out.'
            : 'If something here resonated, let\'s talk.'}
        </motion.p>

        <div className="flex flex-col gap-px border-t border-muted/20">
          {links.map(({ label, href, display }) => (
            <motion.a
              key={label}
              href={href}
              variants={item}
              whileHover={{ x: 8 }}
              className="flex items-center justify-between py-5 border-b border-muted/20 group transition-colors duration-200"
            >
              <span className="text-muted text-sm uppercase tracking-widest">{label}</span>
              <span className="text-cream text-xl font-medium group-hover:text-yellow transition-colors duration-200">
                {display} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
