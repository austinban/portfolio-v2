import { type Variants, motion } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import EditableName from '../ui/EditableName';
import NameParticles from '../ui/NameParticles';
import SceneWrapper from '../ui/SceneWrapper';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const links = [
  { label: 'Email', href: 'mailto:austin@austinban.com', display: 'Say hello' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austin-ban-4b719a89', display: 'in/austin-ban' },
  { label: 'GitHub', href: 'https://github.com/austinban', display: 'austinban' },
];

export default function SceneContact() {
  const { isRandomName, visitorName, t } = useScene();
  const c = t.scenes.contact;

  const headingStr = isRandomName ? c.headingRandom : c.headingDefault;
  const [headingBefore = '', headingAfter = ''] = headingStr.split('{name}');

  return (
    <>
    <NameParticles name={visitorName} />

    <SceneWrapper variants={container}>
      {/* Repeating name wallpaper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute inset-[-50%] flex flex-col justify-around"
          style={{ transform: 'rotate(-12deg)' }}
        >
          {Array.from({ length: 40 }).map((_, row) => {
            const goLeft = row % 2 === 0;
            const offset = (row % 6) * 20;
            return (
              <div
                key={row}
                className="text-2xl font-bold text-white/10 whitespace-nowrap"
                style={{
                  animationName: goLeft ? 'marquee-left' : 'marquee-right',
                  animationDuration: `calc(var(--marquee-base) + ${offset}s)`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {Array(60).fill(visitorName).join('   ')}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative max-w-2xl w-full px-8 py-10 -mx-8">
        {/* Feathered background layer — mask stays off the content */}
        <div
          className="absolute inset-0 backdrop-blur-sm bg-dark/40 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 100% 100% at 40% 50%, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 40% 50%, black 40%, transparent 80%)',
          }}
        />
        <div className="relative">
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-cream leading-none mb-4">
          {headingBefore}
          <EditableName className={isRandomName ? 'text-pink text-5xl md:text-7xl' : 'text-cream text-5xl md:text-7xl'} />
          {headingAfter}
        </motion.h1>

        <motion.p variants={item} className="text-xl text-muted font-light mb-14">
          {isRandomName ? c.bodyRandom : c.bodyDefault}
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
                {label === 'Email' ? c.emailDisplay : display} →
              </span>
            </motion.a>
          ))}
        </div>
        </div>
      </div>
    </SceneWrapper>
    </>
  );
}
