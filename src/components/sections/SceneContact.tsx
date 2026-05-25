import { type Variants, motion } from "framer-motion";
import { useScene } from "../../context/SceneEngine";
import EditableName from "../ui/EditableName";
import NameParticles from "../ui/NameParticles";
import SceneWrapper from "../ui/SceneWrapper";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const links = [
  { label: "Email", href: "mailto:austin@austinban.com", display: "Say hello" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/austin-ban-4b719a89",
    display: "in/austin-ban",
  },
  {
    label: "GitHub",
    href: "https://github.com/austinban",
    display: "austinban",
  },
  {
    label: "This site",
    href: "/portfolio-v2/about-this-site",
    display: "About this site",
  },
];

export default function SceneContact() {
  const { isRandomName, visitorName, t } = useScene();
  const c = t.scenes.contact;

  const headingStr = isRandomName ? c.headingRandom : c.headingDefault;
  const [headingBefore = "", headingAfter = ""] = headingStr.split("{name}");

  return (
    <>
      <NameParticles name={visitorName} />

      <SceneWrapper variants={container}>
        {/* Repeating name wallpaper */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-[-50%] flex flex-col justify-around"
            style={{ transform: "rotate(-12deg)" }}
          >
            {Array.from({ length: 40 }).map((_, row) => {
              const goLeft = row % 2 === 0;
              const offset = (row % 6) * 20;
              return (
                <div
                  key={row}
                  className="text-2xl font-bold whitespace-nowrap text-white/10"
                  style={{
                    animationName: goLeft ? "marquee-left" : "marquee-right",
                    animationDuration: `calc(var(--marquee-base) + ${offset}s)`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                  }}
                >
                  {Array(60).fill(visitorName).join("   ")}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative -mx-8 w-full max-w-2xl px-8 py-10">
          {/* Feathered background layer — mask stays off the content */}
          <div
            className="bg-dark/40 pointer-events-none absolute inset-0 backdrop-blur-sm"
            style={{
              maskImage:
                "radial-gradient(ellipse 100% 100% at 40% 50%, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 40% 50%, black 40%, transparent 80%)",
            }}
          />
          <div className="relative">
            <motion.h1
              variants={item}
              className="text-cream mb-4 text-5xl leading-none font-bold md:text-7xl"
            >
              {headingBefore}
              <EditableName className="text-pink text-5xl md:text-7xl" />
              {headingAfter}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-muted mb-14 text-xl font-light"
            >
              {isRandomName ? c.bodyRandom : c.bodyDefault}
            </motion.p>

            <div className="border-muted/20 flex flex-col gap-px border-t">
              {links.map(({ label, href, display }) => (
                <motion.a
                  key={label}
                  href={href}
                  variants={item}
                  whileHover={{ x: 8 }}
                  className="border-muted/20 group flex items-center justify-between border-b py-5 transition-colors duration-200"
                >
                  <span className="text-muted text-sm tracking-widest uppercase">
                    {label}
                  </span>
                  <span className="text-cream group-hover:text-yellow text-xl font-medium transition-colors duration-200">
                    {label === "Email" ? c.emailDisplay : display} →
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
