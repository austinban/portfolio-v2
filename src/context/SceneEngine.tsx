import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RANDOM_NAMES = [
  'Captain Waffles',
  'Gerald From Accounting',
  'A Concerned Citizen',
  "Someone's Aunt Karen",
  'The Mysterious Stranger',
  'Biscuit McCloud',
  'Professor Noodles',
  'Definitely Not A Robot',
  'Lord Fancypants',
  'Just Browsing',
  'The Algorithm',
  'A Sentient Spreadsheet',
  'Todd (You Know The One)',
  'Beef Wellington',
  'Your Future Employer',
  'Anonymous Coward',
  'Reginald Thicke III',
  'A Golden Retriever',
  'Mx. Potato Head',
  'Mysterious Dave',
];

export const TOTAL_SCENES = 5;
const STORAGE_KEY = 'portfolio_visitor';

type Direction = 1 | -1;

type SceneEngineState = {
  visitorName: string;
  isRandomName: boolean;
  currentScene: number;
  direction: Direction;
  hasEnteredName: boolean;
  setName: (name: string, isRandom?: boolean) => void;
  advance: () => void;
  retreat: () => void;
  goTo: (scene: number) => void;
  getRandomName: () => string;
};

const SceneContext = createContext<SceneEngineState | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [visitorName, setVisitorName] = useState('');
  const [isRandomName, setIsRandomName] = useState(false);
  const [currentScene, setCurrentScene] = useState(-1);
  const [direction, setDirection] = useState<Direction>(1);
  const [hasEnteredName, setHasEnteredName] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { name, isRandom } = JSON.parse(stored);
        setVisitorName(name);
        setIsRandomName(isRandom ?? false);
        setHasEnteredName(true);
        setCurrentScene(0);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

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
    () => RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]!,
    []
  );

  return (
    <SceneContext.Provider value={{
      visitorName, isRandomName, currentScene, direction, hasEnteredName,
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
