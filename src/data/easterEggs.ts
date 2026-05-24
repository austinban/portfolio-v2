export type AnimationType = 'fly-across' | 'fly-up' | 'rain' | 'float-up';

export interface EasterEggConfig {
  id: string;
  names: string[];
  emoji: string;
  type: AnimationType;
  count: number;
  size: number;
  quip: string;
}

export const EASTER_EGGS: EasterEggConfig[] = [
  { id: 'amelia-earhart',  names: ['amelia earhart', 'amelia'],    emoji: '✈️', type: 'fly-across', count: 1,  size: 5,   quip: 'Bold navigator. Bold choice.' },
  { id: 'neil-armstrong',  names: ['neil armstrong'],              emoji: '🚀', type: 'fly-up',     count: 1,  size: 5,   quip: 'One small step for a name drop.' },
  { id: 'einstein',        names: ['einstein', 'albert einstein'], emoji: '⚛️', type: 'rain',       count: 12, size: 2.5, quip: 'Relatively speaking, great name.' },
  { id: 'composer',        names: ['mozart', 'beethoven', 'bach'], emoji: '🎵', type: 'rain',       count: 15, size: 2,   quip: 'The classics. Literally.' },
  { id: 'shakespeare',     names: ['shakespeare'],                 emoji: '📜', type: 'float-up',   count: 10, size: 2.5, quip: "What's in a name? A lot, apparently." },
  { id: 'elvis',           names: ['elvis', 'elvis presley'],      emoji: '🎸', type: 'fly-across', count: 1,  size: 5,   quip: 'The king has entered the portfolio.' },
  { id: 'beyonce',         names: ['beyoncé', 'beyonce'],          emoji: '✨', type: 'float-up',   count: 20, size: 2,   quip: 'We are not worthy.' },
  { id: 'bowie',           names: ['david bowie'],                 emoji: '⚡', type: 'fly-across', count: 1,  size: 5,   quip: 'Starman. Respect.' },
  { id: 'tesla',           names: ['nikola tesla', 'tesla'],       emoji: '⚡', type: 'rain',       count: 10, size: 3,   quip: 'Shockingly good taste.' },
  { id: 'curie',           names: ['marie curie'],                 emoji: '⚗️', type: 'float-up',   count: 12, size: 2.5, quip: 'Radioactively cool.' },
  { id: 'indiana-jones',   names: ['indiana jones'],               emoji: '🎩', type: 'fly-across', count: 1,  size: 5,   quip: "We almost used a boulder. You're welcome." },
  { id: 'batman',          names: ['batman'],                      emoji: '🦇', type: 'rain',       count: 12, size: 2.5, quip: "We know that's not your real name." },
  { id: 'gandalf',         names: ['gandalf'],                     emoji: '🧙', type: 'float-up',   count: 8,  size: 3,   quip: 'You shall not pass... without a warm welcome.' },
  { id: 'harry-potter',    names: ['harry potter'],                emoji: '🦉', type: 'fly-across', count: 1,  size: 5,   quip: 'The chosen one has arrived.' },
  { id: 'frida-kahlo',     names: ['frida kahlo', 'frida'],        emoji: '🌸', type: 'float-up',   count: 15, size: 2,   quip: 'An icon lands.' },
];
