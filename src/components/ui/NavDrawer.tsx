import { type Variants, motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

export const DRAWER_WIDTH = 280;

// Links that navigate to a scene within the SPA (no page reload)
const SCENE_LINKS: { label: string; scene: number }[] = [
  { label: "Home", scene: 0 },
  { label: "About", scene: 3 },
  { label: "Work", scene: 2 },
  { label: "Contact", scene: 4 },
  { label: "About this site", scene: 5 },
];

const SOCIAL_LINKS = [
  { label: "Resume", href: "/AustinBanResume2024.pdf", target: "_blank" as const },
  { label: "GitHub", href: "https://github.com/austinban", target: "_blank" as const },
  { label: "LinkedIn", href: "https://linkedin.com/in/austin-ban-4b719a89", target: "_blank" as const },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface Props {
  open: boolean;
  onClose: () => void;
  onGoTo: (scene: number) => void;
}

export default function NavDrawer({ open, onClose, onGoTo }: Props) {
  const handleSceneNav = (scene: number) => {
    onGoTo(scene);
    onClose();
  };

  const allNavItems = SCENE_LINKS.map((l, i) => ({ ...l, index: i }));

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="site-nav"
          initial={{ x: -DRAWER_WIDTH }}
          animate={{ x: 0 }}
          exit={{ x: -DRAWER_WIDTH }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 bottom-0 left-0 z-10 flex flex-col justify-between px-10 py-10"
          style={{
            width: DRAWER_WIDTH,
            maxWidth: "85vw",
            backgroundColor: "var(--color-dark-surface)",
          }}
          aria-label="Site navigation"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.3 }}
            className="text-muted text-xs tracking-widest uppercase"
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
                <button
                  onClick={() => handleSceneNav(item.scene)}
                  className="text-cream hover:text-yellow text-left text-2xl leading-none font-bold transition-colors duration-150"
                >
                  {item.label}
                </button>
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
                href="/lockpicking"
                className="text-muted hover:text-yellow group flex items-center gap-2 leading-none transition-colors duration-150"
              >
                <Lock
                  size={14}
                  strokeWidth={2}
                  className="transition-colors duration-150"
                />
                <span className="text-sm tracking-widest uppercase">
                  Locked content
                </span>
              </a>
            </motion.li>
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            {SOCIAL_LINKS.map(({ label, href, target }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className="text-muted hover:text-cream text-xs tracking-widest uppercase transition-colors duration-150"
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
