import { motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import EditableName from '../ui/EditableName';

const disciplines = [
  { label: 'Product Design', detail: 'Systems thinking, 0→1 products, and interaction design that earns trust' },
  { label: 'Frontend Dev', detail: 'React, TypeScript, performance obsession, design systems that ship' },
  { label: 'Design Systems', detail: 'Tokens, components, and documentation people actually read' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function SceneWhatIDo() {
  const { isRandomName } = useScene();

  return (
    <motion.div
      className="fixed inset-0 flex items-center px-8 md:px-20 bg-dark"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-2xl w-full">
        <motion.p variants={item} className="text-muted text-sm uppercase tracking-widest mb-8">
          {isRandomName ? "Here's the pitch:" : "Here's what I do:"}
        </motion.p>

        <div className="flex flex-col gap-px">
          {disciplines.map(({ label, detail }) => (
            <motion.div
              key={label}
              variants={item}
              className="group flex flex-col gap-1 border-b border-muted/20 py-6 first:border-t"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-cream group-hover:text-yellow transition-colors duration-200">
                {label}
              </h2>
              <p className="text-muted text-base font-light">{detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={item} className="text-muted text-sm mt-8">
          Currently{' '}
          <span className="text-cream font-medium">Head of Design at Thrive Global</span>
          {' '}— helping people build resilience through better habits and tools.
        </motion.p>
      </div>
    </motion.div>
  );
}
