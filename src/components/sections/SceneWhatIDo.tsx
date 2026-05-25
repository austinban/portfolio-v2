import { type Variants, motion } from "framer-motion";
import { useScene } from "../../context/SceneEngine";
import SceneWrapper from "../ui/SceneWrapper";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SceneWhatIDo() {
  const { isRandomName, t } = useScene();
  const w = t.scenes.whatIDo;

  return (
    <SceneWrapper variants={container}>
      <div className="w-full max-w-2xl">
        <motion.p
          variants={item}
          className="text-muted mb-8 text-sm tracking-widest uppercase"
        >
          {isRandomName ? w.labelRandom : w.labelDefault}
        </motion.p>

        <div className="flex flex-col gap-px">
          {w.disciplines.map(({ label, detail }) => (
            <motion.div
              key={label}
              variants={item}
              className="group border-muted/20 flex flex-col gap-1 border-b py-6 first:border-t"
            >
              <h2 className="text-cream group-hover:text-yellow text-3xl font-bold transition-colors duration-200 md:text-5xl">
                {label}
              </h2>
              <p className="text-muted text-base font-light">{detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={item} className="text-muted mt-8 text-sm">
          {w.currently}
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
