import { motion, type Variants } from "framer-motion";

interface Props {
  variants: Variants;
  align?: "center" | "col-center";
  children: React.ReactNode;
}

export default function SceneWrapper({
  variants,
  align = "center",
  children,
}: Props) {
  const flexClass =
    align === "col-center"
      ? "flex flex-col justify-center"
      : "flex items-center";

  return (
    <motion.div
      className="bg-dark absolute inset-0 overflow-y-auto"
      variants={variants}
      initial="hidden"
      animate="show"
    >
      <div
        className={`relative min-h-full ${flexClass} px-8 py-20 md:px-12 md:py-0`}
      >
        {children}
      </div>
    </motion.div>
  );
}
