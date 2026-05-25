import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORTED_LOCALES } from "../../i18n";

const BASE = "";

function localeHref(locale: string, currentScene: number) {
  const sceneParam = currentScene >= 0 ? `?scene=${currentScene}` : "";
  if (locale === "en") return `${BASE}/${sceneParam}`;
  return `${BASE}/${locale}/${sceneParam}`;
}

interface Props {
  locale: string;
  currentScene?: number;
  label?: string;
}

export default function LanguageSwitcher({
  locale,
  currentScene = -1,
  label = "Language",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current =
    SUPPORTED_LOCALES.find((l) => l.locale === locale) ?? SUPPORTED_LOCALES[0]!;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        className="text-muted hover:text-cream flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors duration-200"
      >
        <Globe size={14} strokeWidth={1.5} />
        <span>
          {current.flag} {current.locale.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="bg-dark border-muted/20 absolute top-full right-0 z-50 mt-2 min-w-32 border py-1"
          >
            {SUPPORTED_LOCALES.map(({ locale: loc, label, flag }) => (
              <a
                key={loc}
                role="menuitem"
                href={localeHref(loc, currentScene)}
                aria-current={loc === locale ? "true" : undefined}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150 ${
                  loc === locale ? "text-yellow" : "text-muted hover:text-cream"
                }`}
                onClick={() => {
                  setOpen(false);
                  localStorage.setItem("portfolio_locale_pref", loc);
                }}
              >
                <span aria-hidden="true">{flag}</span>
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
