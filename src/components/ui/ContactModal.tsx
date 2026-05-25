import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

interface Props {
  open: boolean;
  onClose: () => void;
  prefillName?: string;
}

export default function ContactModal({ open, onClose, prefillName }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-dark/80 fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-dark-surface border-muted/20 relative w-full max-w-lg border p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted text-xs tracking-widest uppercase">
                Send a message
              </p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-muted hover:text-cream -mr-1 transition-colors duration-150"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <ContactForm prefillName={prefillName} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
