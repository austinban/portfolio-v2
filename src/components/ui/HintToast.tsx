import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "../../context/SceneEngine";

export default function HintToast() {
  const { t } = useScene();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
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
          className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center"
        >
          <span className="bg-dark border-muted/20 text-muted border px-5 py-2.5 text-xs tracking-widest uppercase">
            {isMobile ? t.ui.hint.mobile : t.ui.hint.desktop}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
