import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import NavDrawer, { DRAWER_WIDTH } from "./NavDrawer";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  locale: string;
}

const BASE = "";

function goToScene(scene: number) {
  window.location.href = `${BASE}/?scene=${scene}`;
}

export default function SiteChrome({ locale }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <>
      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onGoTo={goToScene}
      />

      <div className="pointer-events-auto fixed top-6 right-8 z-50">
        <LanguageSwitcher locale={locale} />
      </div>

      <motion.button
        type="button"
        animate={{ x: drawerOpen ? DRAWER_WIDTH : 0 }}
        transition={slideTransition}
        onClick={() => setDrawerOpen((o) => !o)}
        aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={drawerOpen}
        aria-controls="site-nav"
        className="text-muted hover:text-cream fixed top-6 left-8 z-50 transition-colors duration-150"
      >
        <AnimatePresence mode="wait" initial={false}>
          {drawerOpen ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              style={{ display: "block" }}
            >
              <X size={18} strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "block" }}
            >
              <Menu size={18} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
