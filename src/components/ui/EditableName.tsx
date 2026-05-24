import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../../context/SceneEngine';
import { isProfane, getProfanityResponse } from '../../utils/profanity';
import { MAX_NAME_LENGTH } from '../../utils/nameConfig';

interface Props {
  className?: string;
}

export default function EditableName({ className = '' }: Props) {
  const { visitorName, setName, isRandomName } = useScene();
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
      setError(`That's still too long. Keep it under ${MAX_NAME_LENGTH} characters.`);
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

  if (editing) {
    return (
      <span className="inline-flex flex-col">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={e => { setDraft(e.target.value); setError(''); }}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          maxLength={40}
          className={`bg-transparent border-b-2 border-yellow outline-none text-yellow font-bold leading-none ${className}`}
          style={{ width: `${Math.max(draft.length, 4)}ch` }}
        />
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-pink text-xs mt-1 font-normal normal-case tracking-normal"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    );
  }

  return (
    <motion.button
      onClick={() => setEditing(true)}
      className={`group relative inline-flex items-baseline gap-1.5 cursor-pointer ${className}`}
      whileHover={{ opacity: 0.85 }}
      title="Click to edit your name"
    >
      {visitorName}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="opacity-0 group-hover:opacity-60 text-[0.45em] font-normal uppercase tracking-widest text-muted transition-opacity duration-150 select-none"
      >
        edit
      </motion.span>
    </motion.button>
  );
}
