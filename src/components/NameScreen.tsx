import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../context/SceneEngine';
import { isProfane, getProfanityResponse } from '../utils/profanity';
import { MAX_NAME_LENGTH } from '../utils/nameConfig';

const TOO_LONG_RESPONSES = [
  "That's a name, a nickname, and a backstory. Trim it down.",
  "Your parents kept it shorter than that. Probably.",
  "Is that a name or your WiFi password?",
  "Wonderful. Now pick the part you actually go by.",
  "I'd display that but we'd need a smaller font. A lot smaller.",
  "That's a biography, not a name.",
  "Even your email address is shorter than that.",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function NameScreen() {
  const { setName, getRandomName } = useScene();
  const [input, setInput] = useState('');
  const [randomName, setRandomName] = useState('');
  const [phase, setPhase] = useState<'input' | 'random'>('input');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = input.trim();
  const isTooLong = trimmed.length > MAX_NAME_LENGTH;
  const showCounter = input.length > MAX_NAME_LENGTH - 8;
  const charsOver = trimmed.length - MAX_NAME_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || isTooLong) return;

    if (isProfane(trimmed)) {
      setErrorMsg(getProfanityResponse());
      setInput('');
      inputRef.current?.focus();
      return;
    }

    setName(trimmed, false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (errorMsg) setErrorMsg('');

    // Set a length-specific message once they go over (only on first breach)
    if (val.trim().length === MAX_NAME_LENGTH + 1) {
      setErrorMsg(TOO_LONG_RESPONSES[Math.floor(Math.random() * TOO_LONG_RESPONSES.length)]!);
    } else if (val.trim().length <= MAX_NAME_LENGTH) {
      setErrorMsg('');
    }
  };

  const handleSkip = () => {
    setRandomName(getRandomName());
    setPhase('random');
  };

  const handleReroll = () => setRandomName(getRandomName());
  const handleAccept = () => setName(randomName, true);

  const hasError = !!errorMsg;
  const borderColor = hasError || isTooLong ? 'border-pink' : 'border-muted focus:border-yellow';

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-dark px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {phase === 'input' ? (
            <motion.div
              key="input-phase"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            >
              <motion.p variants={item} className="text-muted text-sm uppercase tracking-widest mb-4">
                Before we start
              </motion.p>

              <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-cream leading-none mb-10">
                What's your<br />
                <span className="text-yellow">name?</span>
              </motion.h1>

              <motion.form variants={item} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type it here"
                    className={`w-full bg-transparent border-b-2 text-cream text-2xl md:text-3xl font-light py-3 outline-none placeholder:text-muted/40 transition-colors duration-200 ${borderColor}`}
                  />

                  <AnimatePresence>
                    {showCounter && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute right-0 bottom-3 text-xs tabular-nums transition-colors duration-200 ${
                          isTooLong ? 'text-pink' : 'text-muted/60'
                        }`}
                      >
                        {isTooLong ? `${charsOver} over` : `${MAX_NAME_LENGTH - trimmed.length} left`}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {errorMsg && (
                    <motion.p
                      key={errorMsg}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-pink text-sm"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-muted text-sm hover:text-pink transition-colors duration-200 underline underline-offset-4"
                  >
                    I'd rather not say
                  </button>

                  <button
                    type="submit"
                    disabled={!trimmed || isTooLong}
                    className="px-6 py-3 bg-yellow text-dark text-sm font-bold uppercase tracking-wider hover:bg-yellow-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Let's go →
                  </button>
                </div>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="random-phase"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.p variants={item} className="text-muted text-sm uppercase tracking-widest mb-4">
                Fair enough.
              </motion.p>

              <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold text-cream leading-tight mb-3">
                We'll call you
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={randomName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-4xl md:text-6xl font-bold text-pink mb-10"
                >
                  {randomName}.
                </motion.h2>
              </AnimatePresence>

              <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-yellow text-dark text-sm font-bold uppercase tracking-wider hover:bg-yellow-light transition-colors duration-200"
                >
                  that works actually →
                </button>

                <button
                  onClick={handleReroll}
                  className="text-muted text-sm hover:text-cream transition-colors duration-200 underline underline-offset-4"
                >
                  try another
                </button>

                <button
                  onClick={() => setPhase('input')}
                  className="text-muted text-sm hover:text-cream transition-colors duration-200 underline underline-offset-4"
                >
                  wait, I'll tell you
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
