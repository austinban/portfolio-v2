import { motion, type Variants } from 'framer-motion';

interface Props {
  variants: Variants;
  align?: 'center' | 'col-center';
  children: React.ReactNode;
}

export default function SceneWrapper({ variants, align = 'center', children }: Props) {
  const flexClass = align === 'col-center'
    ? 'flex flex-col justify-center'
    : 'flex items-center';

  return (
    <motion.div
      className="absolute inset-0 overflow-y-auto bg-dark"
      variants={variants}
      initial="hidden"
      animate="show"
    >
      <div className={`relative min-h-full ${flexClass} px-8 md:px-12 py-20 md:py-0`}>
        {children}
      </div>
    </motion.div>
  );
}
