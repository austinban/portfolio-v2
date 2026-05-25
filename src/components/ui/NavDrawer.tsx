import { type Variants, motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useScene } from '../../context/SceneEngine';

export const DRAWER_WIDTH = 280;

// Links that navigate to a scene within the SPA (no page reload)
const SCENE_LINKS: { label: string; scene: number }[] = [
  { label: 'About',    scene: 3 },
  { label: 'Work',     scene: 2 },
  { label: 'Contact',  scene: 4 },
];

// Regular href links
const HREF_LINKS = [
  { label: 'Resume',         href: '#' },
  { label: 'About this site', href: '/portfolio-v2/about-this-site' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/austinban' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austin-ban-4b719a89' },
  { label: 'Dribbble', href: '#' },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NavDrawer({ open, onClose }: Props) {
  const { goTo } = useScene();

  const handleSceneNav = (scene: number) => {
    goTo(scene);
    onClose();
  };

  const allNavItems = [
    ...SCENE_LINKS.map((l, i) => ({ ...l, type: 'scene' as const, index: i })),
    ...HREF_LINKS.map((l, i) => ({ ...l, type: 'href' as const, index: SCENE_LINKS.length + i })),
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="site-nav"
          initial={{ x: -DRAWER_WIDTH }}
          animate={{ x: 0 }}
          exit={{ x: -DRAWER_WIDTH }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 top-0 bottom-0 z-10 flex flex-col justify-between py-10 px-10"
          style={{ width: DRAWER_WIDTH, maxWidth: '85vw', backgroundColor: 'var(--color-dark-surface)' }}
          aria-label="Site navigation"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.3 }}
            className="text-muted text-xs uppercase tracking-widest"
          >
            Austin Ban
          </motion.p>

          <ul className="flex flex-col gap-5">
            {allNavItems.map((item) => (
              <motion.li
                key={item.label}
                custom={item.index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {item.type === 'scene' ? (
                  <button
                    onClick={() => handleSceneNav(item.scene)}
                    className="text-cream text-2xl font-bold hover:text-yellow transition-colors duration-150 leading-none text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-cream text-2xl font-bold hover:text-yellow transition-colors duration-150 leading-none"
                  >
                    {item.label}
                  </a>
                )}
              </motion.li>
            ))}

            {/* Locked content — easter egg link */}
            <motion.li
              custom={allNavItems.length}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <a
                href="/portfolio-v2/lockpicking"
                className="flex items-center gap-2 text-muted hover:text-yellow transition-colors duration-150 leading-none group"
              >
                <Lock
                  size={14}
                  strokeWidth={2}
                  className="transition-colors duration-150"
                />
                <span className="text-sm uppercase tracking-widest">Locked content</span>
              </a>
            </motion.li>
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-muted text-xs uppercase tracking-widest hover:text-cream transition-colors duration-150"
              >
                {label} ↗
              </a>
            ))}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
