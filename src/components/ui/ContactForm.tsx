import { useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  prefillName?: string;
}

const ALIAS_QUIPS = [
  (alias: string, real: string) =>
    `"${alias}"? The site has "${real}" on file.`,
  (alias: string, real: string) =>
    `${real} walked in. ${alias} sent the email.`,
  (alias: string, real: string) =>
    `Going by "${alias}" now? Bold pivot from "${real}".`,
  (_alias: string, real: string) =>
    `Alias detected. "${real}" was right there.`,
  (alias: string, _real: string) =>
    `"${alias}." Sure. We'll allow it.`,
  (alias: string, real: string) =>
    `${real} → ${alias}. Interesting character arc.`,
];

function getAliasQuip(submitted: string, original: string) {
  const idx = Math.floor(Math.random() * ALIAS_QUIPS.length);
  return ALIAS_QUIPS[idx]!(submitted, original);
}

export default function ContactForm({ prefillName = "" }: Props) {
  const [state, handleSubmit] = useForm("mnjrgpek");
  const [name, setName] = useState(prefillName);
  const submittedNameRef = useRef("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    submittedNameRef.current = name.trim();
    handleSubmit(e);
  };

  if (state.succeeded) {
    const submitted = submittedNameRef.current;
    const original = prefillName.trim();
    const usedAlias =
      original.length > 0 &&
      submitted.length > 0 &&
      submitted.toLowerCase() !== original.toLowerCase();

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-4"
      >
        <p className="text-cream text-sm font-medium">Message sent.</p>
        <p className="text-muted mt-1 text-sm font-light">
          I'll be in touch soon.
        </p>
        {usedAlias && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-muted/70 mt-5 text-2xl leading-snug font-bold"
          >
            {getAliasQuip(submitted, original)}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 py-2">
      {/* Honeypot — invisible to humans, bots fill it in, Formspree rejects those */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          label="Name"
          error={
            <ValidationError
              field="name"
              errors={state.errors}
              className="text-pink mt-1 text-xs"
            />
          }
        >
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </Field>

        <Field
          label="Email"
          error={
            <ValidationError
              field="email"
              errors={state.errors}
              className="text-pink mt-1 text-xs"
            />
          }
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field
        label="Message"
        error={
          <ValidationError
            field="message"
            errors={state.errors}
            className="text-pink mt-1 text-xs"
          />
        }
      >
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What's on your mind?"
        />
      </Field>

      <div className="flex items-center justify-between">
        <AnimatePresence>
          {state.errors && Object.keys(state.errors).length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-pink text-xs"
            >
              Something went wrong — try emailing directly.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={state.submitting}
          className="text-dark bg-yellow hover:bg-yellow-light ml-auto px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-150 disabled:opacity-50"
        >
          {state.submitting ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: React.ReactNode;
  children: React.ReactElement;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted text-xs tracking-widest uppercase">
        {label}
      </label>
      <div className="[&_input]:text-cream [&_input]:placeholder:text-muted/40 [&_input]:border-muted/20 [&_input]:focus:border-yellow [&_input]:w-full [&_input]:border-b [&_input]:bg-transparent [&_input]:py-2 [&_input]:text-sm [&_input]:outline-none [&_input]:transition-colors [&_input]:duration-150 [&_textarea]:text-cream [&_textarea]:placeholder:text-muted/40 [&_textarea]:border-muted/20 [&_textarea]:focus:border-yellow [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:border-b [&_textarea]:bg-transparent [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:transition-colors [&_textarea]:duration-150">
        {children}
      </div>
      {error}
    </div>
  );
}
