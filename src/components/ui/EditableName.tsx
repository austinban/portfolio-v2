import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import { isProfane, getProfanityResponse } from '../../utils/profanity';
import { MAX_NAME_LENGTH } from '../../utils/nameConfig';

interface Props {
  className?: string;
}

export default function EditableName({ className = '' }: Props) {
  const { visitorName, setName } = useScene();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(visitorName);
      setError('');
      setTimeout(() => inputRef.current?.select(), 20);
    }
  }, [editing, visitorName]);

  const commit = () => {
    const trimmed = draft.trim();
    if (!trimmed) { setEditing(false); return; }

    if (trimmed.length > MAX_NAME_LENGTH) {
      setError(`Keep it under ${MAX_NAME_LENGTH} characters.`);
      inputRef.current?.focus();
      return;
    }

    if (isProfane(trimmed)) {
      setError(getProfanityResponse());
      setDraft('');
      inputRef.current?.focus();
      return;
    }

    setName(trimmed, false);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <>
      <span
        onClick={() => setEditing(true)}
        className={`cursor-pointer hover:opacity-75 transition-opacity duration-150 ${className}`}
        title="Click to edit"
      >
        {visitorName}
      </span>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
            onClick={() => setEditing(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 px-8"
              onClick={e => e.stopPropagation()}
            >
              <p className="text-muted text-xs uppercase tracking-widest">Edit name</p>

              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={e => { setDraft(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                maxLength={40}
                className="bg-transparent border-b-2 border-yellow outline-none text-cream font-bold text-5xl md:text-7xl text-center leading-none"
                style={{ width: `${Math.max(draft.length, 6)}ch` }}
              />

              <AnimatePresence mode="wait">
                {error ? (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-pink text-sm"
                  >
                    {error}
                  </motion.span>
                ) : (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-muted text-xs uppercase tracking-widest">
                      Enter to save · Esc to cancel
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-muted/50 text-xs tracking-wide italic"
                    >
                      Psst — certain names come with a surprise.
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
