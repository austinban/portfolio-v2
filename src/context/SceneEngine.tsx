import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MAX_NAME_LENGTH } from '../utils/nameConfig';
import { isProfane } from '../utils/profanity';
import type { Translations } from '../i18n/types';
import { en } from '../i18n';

export const TOTAL_SCENES = 5;
const STORAGE_KEY = 'portfolio_visitor';

type Direction = 1 | -1;

type SceneEngineState = {
  visitorName: string;
  isRandomName: boolean;
  currentScene: number;
  direction: Direction;
  hasEnteredName: boolean;
  locale: string;
  t: Translations;
  setName: (name: string, isRandom?: boolean) => void;
  advance: () => void;
  retreat: () => void;
  goTo: (scene: number) => void;
  getRandomName: () => string;
};

const SceneContext = createContext<SceneEngineState | null>(null);

interface SceneProviderProps {
  children: React.ReactNode;
  locale?: string;
  translations?: Translations;
}

export function SceneProvider({ children, locale = 'en', translations = en }: SceneProviderProps) {
  const [visitorName, setVisitorName] = useState('');
  const [isRandomName, setIsRandomName] = useState(false);
  const [currentScene, setCurrentScene] = useState(-1);
  const [direction, setDirection] = useState<Direction>(1);
  const [hasEnteredName, setHasEnteredName] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const urlScene = (() => {
      const p = new URLSearchParams(window.location.search).get('scene');
      if (p === null) return null;
      const n = parseInt(p, 10);
      return n >= 0 && n < TOTAL_SCENES ? n : null;
    })();

    if (stored) {
      try {
        const { name, isRandom } = JSON.parse(stored);
        if (
          typeof name !== 'string' ||
          name.trim().length === 0 ||
          name.trim().length > MAX_NAME_LENGTH ||
          isProfane(name)
        ) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }
        setVisitorName(name);
        setIsRandomName(isRandom ?? false);
        setHasEnteredName(true);
        setCurrentScene(urlScene ?? 0);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (currentScene < 0) return;
    const url = new URL(window.location.href);
    url.searchParams.set('scene', String(currentScene));
    window.history.replaceState(null, '', url.toString());
  }, [currentScene]);

  const setName = useCallback((name: string, isRandom = false) => {
    setVisitorName(name);
    setIsRandomName(isRandom);
    setHasEnteredName(true);
    setDirection(1);
    setCurrentScene(0);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, isRandom }));
  }, []);

  const advance = useCallback(() => {
    setDirection(1);
    setCurrentScene(s => Math.min(s + 1, TOTAL_SCENES - 1));
  }, []);

  const retreat = useCallback(() => {
    setDirection(-1);
    setCurrentScene(s => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback((scene: number) => {
    setDirection(scene > currentScene ? 1 : -1);
    setCurrentScene(scene);
  }, [currentScene]);

  const getRandomName = useCallback(
    () => translations.randomNames[Math.floor(Math.random() * translations.randomNames.length)]!,
    [translations]
  );

  return (
    <SceneContext.Provider value={{
      visitorName, isRandomName, currentScene, direction, hasEnteredName,
      locale, t: translations,
      setName, advance, retreat, goTo, getRandomName,
    }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be used within SceneProvider');
  return ctx;
}
