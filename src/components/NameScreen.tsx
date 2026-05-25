import { useState, useRef, useEffect, useId } from "react";
import { type Variants, motion, AnimatePresence } from "framer-motion";
import { useScene } from "../context/SceneEngine";
import { isProfane, getProfanityResponse } from "../utils/profanity";
import { MAX_NAME_LENGTH } from "../utils/nameConfig";
import { t } from "../i18n";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function NameScreen() {
  const { setName, getRandomName, t: tr } = useScene();
  const ns = tr.ui.nameScreen;
  const [input, setInput] = useState("");
  const [randomName, setRandomName] = useState("");
  const [phase, setPhase] = useState<"input" | "random">("input");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const errorId = useId();
  const counterId = useId();

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
      setInput("");
      inputRef.current?.focus();
      return;
    }

    setName(trimmed, false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (errorMsg) setErrorMsg("");

    if (val.trim().length === MAX_NAME_LENGTH + 1) {
      const responses = ns.tooLong;
      setErrorMsg(responses[Math.floor(Math.random() * responses.length)]!);
    } else if (val.trim().length <= MAX_NAME_LENGTH) {
      setErrorMsg("");
    }
  };

  const handleSkip = () => {
    setRandomName(getRandomName());
    setPhase("random");
  };

  const handleReroll = () => setRandomName(getRandomName());
  const handleAccept = () => setName(randomName, true);

  const hasError = !!errorMsg;
  const borderColor =
    hasError || isTooLong ? "border-pink" : "border-muted focus:border-yellow";

  return (
    <motion.div
      className="bg-dark fixed inset-0 z-30 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {phase === "input" ? (
            <motion.div
              key="input-phase"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            >
              <motion.p
                variants={item}
                className="text-muted mb-4 text-sm tracking-widest uppercase"
              >
                {ns.before}
              </motion.p>

              <motion.h1
                id={headingId}
                variants={item}
                className="text-cream mb-4 text-5xl leading-none font-bold md:text-7xl"
              >
                {ns.headingLine1}
                <br />
                <span className="text-yellow">{ns.headingLine2}</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-muted/60 mb-8 text-sm italic"
              >
                {ns.disclaimer}
              </motion.p>

              <motion.form
                variants={item}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={ns.placeholder}
                    aria-labelledby={headingId}
                    aria-describedby={
                      [errorMsg ? errorId : "", showCounter ? counterId : ""]
                        .filter(Boolean)
                        .join(" ") || undefined
                    }
                    aria-invalid={hasError || isTooLong || undefined}
                    className={`text-cream placeholder:text-muted/40 w-full border-b-2 bg-transparent py-3 text-2xl font-light transition-colors duration-200 outline-none md:text-3xl ${borderColor}`}
                  />

                  <AnimatePresence>
                    {showCounter && (
                      <motion.span
                        id={counterId}
                        aria-live="polite"
                        aria-atomic="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute right-0 bottom-3 text-xs tabular-nums transition-colors duration-200 ${
                          isTooLong ? "text-pink" : "text-muted/60"
                        }`}
                      >
                        {isTooLong
                          ? t(ns.charsOver, { n: charsOver })
                          : t(ns.charsLeft, {
                              n: MAX_NAME_LENGTH - trimmed.length,
                            })}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {errorMsg && (
                    <motion.p
                      key={errorMsg}
                      id={errorId}
                      role="alert"
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

                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-muted hover:text-pink text-sm underline underline-offset-4 transition-colors duration-200"
                  >
                    {ns.skip}
                  </button>

                  <button
                    type="submit"
                    disabled={!trimmed || isTooLong}
                    className="bg-yellow text-dark hover:bg-yellow-light px-6 py-3 text-sm font-bold tracking-wider uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {ns.submit}
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
              <motion.p
                variants={item}
                className="text-muted mb-4 text-sm tracking-widest uppercase"
              >
                {ns.random.label}
              </motion.p>

              <motion.h1
                variants={item}
                className="text-cream mb-3 text-4xl leading-tight font-bold md:text-6xl"
              >
                {ns.random.weCalled}
              </motion.h1>

              <div aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={randomName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-pink mb-10 text-4xl font-bold md:text-6xl"
                  >
                    {randomName}.
                  </motion.h2>
                </AnimatePresence>
              </div>

              <motion.div
                variants={item}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={handleAccept}
                  className="bg-yellow text-dark hover:bg-yellow-light px-6 py-3 text-sm font-bold tracking-wider uppercase transition-colors duration-200"
                >
                  {ns.random.accept}
                </button>

                <button
                  onClick={handleReroll}
                  className="text-muted hover:text-cream text-sm underline underline-offset-4 transition-colors duration-200"
                >
                  {ns.random.reroll}
                </button>

                <button
                  onClick={() => setPhase("input")}
                  className="text-muted hover:text-cream text-sm underline underline-offset-4 transition-colors duration-200"
                >
                  {ns.random.goBack}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
