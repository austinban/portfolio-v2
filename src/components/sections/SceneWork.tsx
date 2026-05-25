import { type Variants, motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import SceneWrapper from '../ui/SceneWrapper';

const projects = [
  { slug: 'alpaca', title: 'Alpaca', tags: ['Product Design', 'Fintech'], year: '2022' },
  { slug: 'venture360', title: 'Venture360', tags: ['UX', 'SaaS'], year: '2021' },
  { slug: 'veripharm', title: 'Veripharm', tags: ['Design System', 'Healthcare'], year: '2020' },
  { slug: 'glorieta', title: 'Glorieta', tags: ['Mobile', 'React Native'], year: '2019' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function SceneWork() {
  const { isRandomName, t } = useScene();
  const w = t.scenes.work;

  return (
    <SceneWrapper variants={container} align="col-center">
        <motion.h1 variants={card} className="text-5xl md:text-7xl font-bold text-cream mb-12 leading-none">
          {isRandomName ? w.headingRandom : w.headingDefault}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-muted/20">
          {projects.map(({ slug, title, tags, year }) => (
            <motion.a
              key={slug}
              href={`/work/${slug}`}
              variants={card}
              whileHover={{ backgroundColor: 'rgba(238,171,18,0.06)' }}
              className="group flex flex-col justify-between p-8 border-muted/20 hover:border-yellow/30 transition-colors duration-200 min-h-40"
            >
              <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="text-xs uppercase tracking-widest text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-end justify-between mt-6">
                <h2 className="text-2xl md:text-3xl font-bold text-cream group-hover:text-yellow transition-colors duration-200">
                  {title}
                </h2>
                <span className="text-muted text-sm">{year} →</span>
              </div>
            </motion.a>
          ))}
        </div>
    </SceneWrapper>
  );
}
