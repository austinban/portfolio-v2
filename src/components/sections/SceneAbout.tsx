import { type Variants, motion } from "framer-motion";
import { useScene } from "../../context/SceneEngine";
import SceneWrapper from "../ui/SceneWrapper";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SceneAbout() {
  const { isRandomName, t } = useScene();
  const a = t.scenes.about;

  return (
    <SceneWrapper variants={container}>
      <div className="max-w-2xl">
        <motion.p
          variants={item}
          className="text-muted mb-8 text-sm tracking-widest uppercase"
        >
          {isRandomName ? a.labelRandom : a.labelDefault}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-cream mb-10 text-5xl leading-none font-bold md:text-7xl"
        >
          {a.heading}
          <br />
          <span className="text-pink">{a.headingAccent}</span>.
        </motion.h1>

        <motion.div
          variants={item}
          className="text-muted flex max-w-lg flex-col gap-5 text-lg leading-relaxed font-light"
        >
          <p>{a.p1}</p>
          <p>{a.p2}</p>
          <p>{a.p3}</p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
