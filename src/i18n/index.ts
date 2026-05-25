import type { Translations } from './types';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { it } from './locales/it';
import { de } from './locales/de';
import { zh } from './locales/zh';
import { ja } from './locales/ja';
import { ar } from './locales/ar';

export type Locale = 'en' | 'es' | 'fr' | 'it' | 'de' | 'zh' | 'ja' | 'ar';

export const SUPPORTED_LOCALES: { locale: Locale; label: string; flag: string }[] = [
  { locale: 'en', label: 'English',  flag: '🇬🇧' },
  { locale: 'es', label: 'Español',  flag: '🇪🇸' },
  { locale: 'fr', label: 'Français', flag: '🇫🇷' },
  { locale: 'it', label: 'Italiano', flag: '🇮🇹' },
  { locale: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { locale: 'zh', label: '中文',      flag: '🇨🇳' },
  { locale: 'ja', label: '日本語',    flag: '🇯🇵' },
  { locale: 'ar', label: 'العربية',  flag: '🇸🇦' },
];

export function getTranslations(locale: string): Translations {
  switch (locale) {
    case 'es': return es;
    case 'fr': return fr;
    case 'it': return it;
    case 'de': return de;
    case 'zh': return zh;
    case 'ja': return ja;
    case 'ar': return ar;
    default:   return en;
  }
}

export { en };

/** Replace a {key} placeholder in a string */
export function t(str: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce<string>(
    (s, [k, v]) => s.replace(`{${k}}`, String(v)),
    str
  );
}
