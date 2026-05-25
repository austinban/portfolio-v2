import { type Variants, motion, AnimatePresence } from 'framer-motion';

export const DRAWER_WIDTH = 280;

const NAV_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Resume', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
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
}

export default function NavDrawer({ open }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ x: -DRAWER_WIDTH }}
          animate={{ x: 0 }}
          exit={{ x: -DRAWER_WIDTH }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 top-0 bottom-0 z-10 flex flex-col justify-between py-10 px-10"
          style={{ width: DRAWER_WIDTH, backgroundColor: 'var(--color-dark-surface)' }}
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
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.li
                key={label}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={href}
                  className="text-cream text-2xl font-bold hover:text-yellow transition-colors duration-150 leading-none"
                >
                  {label}
                </a>
              </motion.li>
            ))}
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
