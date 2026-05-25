import { useState } from "react";
import { type Variants, AnimatePresence, motion } from "framer-motion";
import { useScene } from "../../context/SceneEngine";
import EditableName from "../ui/EditableName";
import EasterEgg from "../ui/EasterEgg";
import SceneWrapper from "../ui/SceneWrapper";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SceneGreeting() {
  const { isRandomName, visitorName, t } = useScene();
  const g = t.scenes.greeting;
  const [activeQuip, setActiveQuip] = useState<string | null>(null);

  const defaultSub = isRandomName
    ? g.subtitleRandom
    : visitorName.trim().toLowerCase() === "austin"
      ? g.subtitleAustin
      : g.subtitleDefault;

  const sub = activeQuip ?? defaultSub;

  const isAustin = visitorName.trim().toLowerCase() === "austin";
  const iAmStr = isAustin ? g.iAmToo : g.iAm;
  const [iAmBefore = "", iAmAfter = ""] = iAmStr.split("{austin}");
  const [headingBefore = "", headingAfter = ""] = g.heading.split("{name}");

  return (
    <>
      <EasterEgg name={visitorName} onQuip={setActiveQuip} />
      <SceneWrapper variants={container}>
        <div className="w-full">
          <motion.div variants={line} className="mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={sub}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-muted text-sm tracking-widest uppercase"
              >
                {sub}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.h1
            variants={line}
            className="text-cream mb-2 text-6xl leading-none font-bold md:text-8xl"
          >
            {headingBefore}
            <EditableName className="text-pink" />
            {headingAfter}
          </motion.h1>

          <motion.h2
            variants={line}
            className="mb-10 text-6xl leading-none font-bold md:text-8xl"
          >
            {iAmBefore}
            <span className="text-yellow">Austin</span>
            {iAmAfter}
          </motion.h2>

          <motion.p
            variants={line}
            className="text-muted max-w-lg text-xl leading-relaxed font-light md:text-2xl"
          >
            {g.body}
          </motion.p>
        </div>
      </SceneWrapper>
    </>
  );
}
