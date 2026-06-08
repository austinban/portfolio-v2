import { type Variants, motion } from "framer-motion";
import { useScene } from "../../context/SceneEngine";
import SceneWrapper from "../ui/SceneWrapper";

const projects = [
  {
    slug: "alpaca",
    title: "Alpaca",
    tags: ["Product Design", "Fintech"],
    year: "2022",
  },
  {
    slug: "venture360",
    title: "Venture360",
    tags: ["UX", "SaaS"],
    year: "2021",
  },
  {
    slug: "veripharm",
    title: "Veripharm",
    tags: ["Design System", "Healthcare"],
    year: "2020",
  },
  {
    slug: "glorieta",
    title: "Glorieta",
    tags: ["Mobile", "React Native"],
    year: "2019",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SceneWork() {
  const { isRandomName, t } = useScene();
  const w = t.scenes.work;

  return (
    <SceneWrapper variants={container} align="col-center">
      <motion.h1
        variants={card}
        className="text-cream mb-6 text-5xl leading-none font-bold md:mb-12 md:text-7xl"
      >
        {isRandomName ? w.headingRandom : w.headingDefault}
      </motion.h1>

      <div className="border-muted/20 grid grid-cols-1 gap-px border md:grid-cols-2">
        {projects.map(({ slug, title, tags, year }) => (
          <motion.a
            key={slug}
            href={`/work/${slug}`}
            variants={card}
            whileHover={{ backgroundColor: "rgba(238,171,18,0.06)" }}
            className="group border-muted/20 hover:border-yellow/30 flex min-h-40 flex-col justify-between p-8 transition-colors duration-200"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted text-xs tracking-widest uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between">
              <h2 className="text-cream group-hover:text-yellow text-2xl font-bold transition-colors duration-200 md:text-3xl">
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
