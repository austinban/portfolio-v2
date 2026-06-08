import { useRef, useEffect, useId, useState } from "react";
import {
  type Variants,
  AnimatePresence,
  motion,
  MotionConfig,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { SceneProvider, useScene, TOTAL_SCENES } from "../context/SceneEngine";
import type { Translations } from "../i18n/types";
import NameScreen from "./NameScreen";
import SceneNav from "./ui/SceneNav";
import HintToast from "./ui/HintToast";
import SceneGreeting from "./sections/SceneGreeting";
import SceneWhatIDo from "./sections/SceneWhatIDo";
import SceneWork from "./sections/SceneWork";
import SceneAbout from "./sections/SceneAbout";
import SceneContact from "./sections/SceneContact";
import SceneAboutSite from "./sections/SceneAboutSite";
import LanguageSwitcher from "./ui/LanguageSwitcher";
import NavDrawer, { DRAWER_WIDTH } from "./ui/NavDrawer";
import NamePeek from "./ui/NamePeek";

const SCENES = [
  SceneGreeting,
  SceneWhatIDo,
  SceneWork,
  SceneAbout,
  SceneContact,
  SceneAboutSite,
];

const sceneVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-60%" : "60%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PortfolioInner() {
  const { currentScene, direction, hasEnteredName, advance, retreat, goTo, locale, t } =
    useScene();
  const announcerId = useId();
  const touchStartX = useRef<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actualDrawerWidth, setActualDrawerWidth] = useState(DRAWER_WIDTH);

  const advanceAndClose = () => {
    setDrawerOpen(false);
    advance();
  };

  useEffect(() => {
    const update = () =>
      setActualDrawerWidth(
        Math.min(DRAWER_WIDTH, Math.round(window.innerWidth * 0.85)),
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
        return;
      }
      const active = document.activeElement;
      if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") return;
      if (currentScene < 0) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advanceAndClose();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentScene === 0) setDrawerOpen(true);
        else retreat();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentScene, advanceAndClose, retreat, drawerOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || currentScene < 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) advanceAndClose();
    else retreat();
  };

  const Scene =
    currentScene >= 0 && currentScene < TOTAL_SCENES
      ? SCENES[currentScene]
      : null;

  const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <div role="main" className="relative h-full w-full overflow-hidden">
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onGoTo={goTo} />

      {/* Scene content panel — slides right to reveal drawer */}
      <motion.div
        animate={{
          x: drawerOpen ? actualDrawerWidth : 0,
          boxShadow: drawerOpen
            ? "-20px 0 40px rgba(0,0,0,0.75)"
            : "-20px 0 40px rgba(0,0,0,0)",
        }}
        transition={slideTransition}
        className="bg-dark absolute inset-0 z-20 overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          id={announcerId}
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {hasEnteredName && currentScene >= 0
            ? `${currentScene + 1} / ${TOTAL_SCENES}`
            : ""}
        </div>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {hasEnteredName && Scene && (
            <motion.div
              key={`scene-${currentScene}`}
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Scene />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap-to-close overlay when drawer is open */}
        {drawerOpen && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* NameScreen lives outside the sliding panel so its fixed overlay isn't offset */}
      <AnimatePresence>
        {!hasEnteredName && <NameScreen key="name-screen" />}
      </AnimatePresence>

      {hasEnteredName && (
        <SceneNav
          drawerOpen={drawerOpen}
          drawerWidth={actualDrawerWidth}
          onAdvance={advanceAndClose}
        />
      )}
      {hasEnteredName && <HintToast />}
      <NamePeek />

      <div className="pointer-events-auto fixed top-6 right-8 z-50">
        <LanguageSwitcher
          locale={locale}
          currentScene={currentScene}
          label={t.ui.langSwitcher.label}
        />
      </div>

      {/* Hamburger — hidden on the name entry screen */}
      <motion.button
        type="button"
        animate={{ x: drawerOpen ? actualDrawerWidth : 0, opacity: hasEnteredName ? 1 : 0 }}
        style={{ pointerEvents: hasEnteredName ? "auto" : "none" }}
        transition={slideTransition}
        onClick={() => setDrawerOpen((o) => !o)}
        aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={drawerOpen}
        aria-controls="site-nav"
        className="text-muted hover:text-cream fixed top-6 left-8 z-50 -m-2 p-2 transition-colors duration-150"
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
    </div>
  );
}

interface PortfolioProps {
  locale?: string;
  translations?: Translations;
}

export default function Portfolio({ locale, translations }: PortfolioProps) {
  return (
    <MotionConfig reducedMotion="user">
      <SceneProvider locale={locale} translations={translations}>
        <PortfolioInner />
      </SceneProvider>
    </MotionConfig>
  );
}
