import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';

export default function HintToast() {
  const { t } = useScene();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsMobile(mobile);
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 inset-x-0 flex justify-center pointer-events-none z-50"
        >
          <span className="px-5 py-2.5 bg-dark border border-muted/20 text-muted text-xs uppercase tracking-widest">
            {isMobile ? t.ui.hint.mobile : t.ui.hint.desktop}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
