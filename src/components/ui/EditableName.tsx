import { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import { isProfane, getProfanityResponse } from '../../utils/profanity';
import { MAX_NAME_LENGTH } from '../../utils/nameConfig';
import { t as interpolate } from '../../i18n';

interface Props {
  className?: string;
}

export default function EditableName({ className = '' }: Props) {
  const { visitorName, setName, t } = useScene();
  const en = t.ui.editName;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogTitleId = useId();
  const inputId = useId();
  const errorId = useId();

  useEffect(() => {
    if (editing) {
      setDraft(visitorName);
      setError('');
      setTimeout(() => inputRef.current?.select(), 20);
    } else {
      // Return focus to trigger when dialog closes
      triggerRef.current?.focus();
    }
  }, [editing, visitorName]);

  const commit = () => {
    const trimmed = draft.trim();
    if (!trimmed) { setEditing(false); return; }

    if (trimmed.length > MAX_NAME_LENGTH) {
      setError(interpolate(en.tooLong, { max: MAX_NAME_LENGTH }));
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
    if (e.key === 'Escape') setEditing(false);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setEditing(true);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setEditing(true)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={`${en.label}: ${visitorName}`}
        className={`cursor-pointer hover:opacity-75 transition-opacity duration-150 bg-transparent border-none p-0 font-inherit ${className}`}
      >
        {visitorName}
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
            onClick={() => setEditing(false)}
            onKeyDown={e => { if (e.key === 'Escape') setEditing(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 px-8"
              onClick={e => e.stopPropagation()}
            >
              <p
                id={dialogTitleId}
                className="text-muted text-xs uppercase tracking-widest"
              >
                {en.label}
              </p>

              <form onSubmit={e => { e.preventDefault(); commit(); }} className="contents">
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  value={draft}
                  onChange={e => { setDraft(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  maxLength={40}
                  aria-label={en.label}
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={!!error}
                  className="bg-transparent border-b-2 border-yellow outline-none focus-visible:outline-none text-cream font-bold text-5xl md:text-7xl text-center leading-none"
                  style={{ width: `${Math.max(draft.length, 6)}ch` }}
                />
              </form>

              <AnimatePresence mode="wait">
                {error ? (
                  <motion.span
                    key="error"
                    id={errorId}
                    role="alert"
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
                      {en.hint}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-muted/50 text-xs tracking-wide italic"
                    >
                      {en.eggHint}
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
