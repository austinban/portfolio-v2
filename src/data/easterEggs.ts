import type { LucideIcon } from 'lucide-react';
import {
  Plane, Rocket, Atom, Music, ScrollText, Guitar,
  Sparkles, Zap, FlaskConical, Compass, Moon, Wand2, Bird, Flower2,
  Code2, Crown, Dna, Search, Flag, Star, Mic2, Landmark, Trophy, Heart, Users, Sun, PartyPopper,
  Lightbulb, Telescope, Orbit, Globe, Waves, Microscope, Cpu, Monitor,
  Satellite, Palette, Stethoscope, Wrench, Calculator, Swords, Sword,
  Megaphone, Leaf, Shield, Scroll, BookOpen, Flame, Map, Music2,
  Headphones, Radio, Drum, Clapperboard, Film, Camera, Feather, Pen,
  Package, Timer, Dumbbell, Medal, Award, Hammer, BrainCircuit, Pi,
  GraduationCap, ChefHat, Sailboat, Anchor, Quote, Glasses, Scale,
  Newspaper, Brush, Mountain, TreePine, Sprout, Globe2, Binary, Apple,
} from 'lucide-react';

export type AnimationType = 'fly-across' | 'fly-up' | 'rain' | 'float-up';

export interface EasterEggConfig {
  id: string;
  names: string[];
  Icon: LucideIcon;
  type: AnimationType;
  count: number;
  size: number;
  quip: string;
}

export const EASTER_EGGS: EasterEggConfig[] = [
  // ── Scientists & Inventors ──────────────────────────────────────────────────
  { id: 'amelia-earhart',   names: ['amelia earhart', 'amelia'],        Icon: Plane,        type: 'fly-across', count: 1,  size: 5,   quip: 'Bold navigator. Bold choice.' },
  { id: 'neil-armstrong',   names: ['neil armstrong'],                   Icon: Rocket,       type: 'fly-up',     count: 1,  size: 5,   quip: 'One small step for a name drop.' },
  { id: 'einstein',         names: ['einstein', 'albert einstein'],      Icon: Atom,         type: 'rain',       count: 12, size: 2.5, quip: 'Relatively speaking, great name.' },
  { id: 'curie',            names: ['marie curie'],                      Icon: FlaskConical, type: 'float-up',   count: 12, size: 2.5, quip: 'Radioactively cool.' },
  { id: 'tesla',            names: ['nikola tesla', 'tesla'],            Icon: Zap,          type: 'rain',       count: 10, size: 3,   quip: 'Shockingly good taste.' },
  { id: 'ada-lovelace',     names: ['ada lovelace', 'ada'],              Icon: Code2,        type: 'rain',       count: 12, size: 2.5, quip: 'First programmer. Respect.' },
  { id: 'darwin',           names: ['darwin', 'charles darwin'],         Icon: Dna,          type: 'float-up',   count: 10, size: 2.5, quip: 'Survival of the coolest names.' },
  { id: 'newton',           names: ['newton', 'isaac newton'],           Icon: Apple,        type: 'rain',       count: 8,  size: 3,   quip: "Watch your head. Just in case." },
  { id: 'galileo',          names: ['galileo'],                          Icon: Telescope,    type: 'fly-up',     count: 1,  size: 5,   quip: 'And yet, it moves.' },
  { id: 'hawking',          names: ['hawking', 'stephen hawking'],       Icon: Orbit,        type: 'float-up',   count: 10, size: 3,   quip: 'A brief history of great names.' },
  { id: 'copernicus',       names: ['copernicus'],                       Icon: Globe,        type: 'float-up',   count: 8,  size: 3,   quip: 'Everything revolves around this name.' },
  { id: 'archimedes',       names: ['archimedes'],                       Icon: Waves,        type: 'float-up',   count: 10, size: 2.5, quip: 'Eureka! A legendary name appears.' },
  { id: 'turing',           names: ['turing', 'alan turing'],            Icon: Cpu,          type: 'rain',       count: 12, size: 2.5, quip: 'Computing legend. We approve.' },
  { id: 'pasteur',          names: ['pasteur', 'louis pasteur'],         Icon: Microscope,   type: 'float-up',   count: 10, size: 2.5, quip: 'Germ theory approved this message.' },
  { id: 'fleming',          names: ['fleming', 'alexander fleming'],     Icon: Stethoscope,  type: 'float-up',   count: 8,  size: 3,   quip: 'The name that saved a billion lives.' },
  { id: 'edison',           names: ['edison', 'thomas edison'],          Icon: Lightbulb,    type: 'rain',       count: 12, size: 2.5, quip: '1% inspiration, 99% great name.' },
  { id: 'faraday',          names: ['faraday', 'michael faraday'],       Icon: Zap,          type: 'rain',       count: 10, size: 2.5, quip: 'The force is strong with this one.' },
  { id: 'ramanujan',        names: ['ramanujan'],                        Icon: Pi,           type: 'rain',       count: 15, size: 2,   quip: 'Infinitely good name.' },
  { id: 'pythagoras',       names: ['pythagoras'],                       Icon: Calculator,   type: 'rain',       count: 10, size: 2.5, quip: 'The proof is in the name.' },
  { id: 'watt',             names: ['james watt'],                       Icon: Wrench,       type: 'float-up',   count: 8,  size: 3,   quip: "You've got a lot of energy." },
  { id: 'jobs',             names: ['steve jobs'],                       Icon: Monitor,      type: 'fly-up',     count: 1,  size: 5,   quip: 'One more thing... welcome.' },
  { id: 'gates',            names: ['bill gates'],                       Icon: Binary,       type: 'rain',       count: 12, size: 2.5, quip: 'Windows of opportunity detected.' },
  { id: 'musk',             names: ['elon musk'],                        Icon: Satellite,    type: 'fly-up',     count: 1,  size: 5,   quip: 'First, we colonize the portfolio.' },
  { id: 'salk',             names: ['salk', 'jonas salk'],               Icon: Stethoscope,  type: 'float-up',   count: 8,  size: 3,   quip: 'Patent pending on this great name.' },

  // ── Historical Leaders & Thinkers ──────────────────────────────────────────
  { id: 'cleopatra',        names: ['cleopatra'],                        Icon: Crown,        type: 'float-up',   count: 10, size: 3,   quip: 'Royalty detected.' },
  { id: 'napoleon',         names: ['napoleon'],                         Icon: Flag,         type: 'fly-across', count: 1,  size: 5,   quip: 'Not compensating for anything.' },
  { id: 'lincoln',          names: ['lincoln', 'abraham lincoln'],       Icon: Landmark,     type: 'float-up',   count: 8,  size: 3,   quip: 'Fourscore and seven pages ago.' },
  { id: 'caesar',           names: ['caesar', 'julius caesar'],          Icon: Sword,        type: 'fly-across', count: 1,  size: 5,   quip: 'Et tu, portfolio?' },
  { id: 'alexander',        names: ['alexander the great'],              Icon: Globe,        type: 'float-up',   count: 10, size: 3,   quip: "You've conquered the name screen." },
  { id: 'washington',       names: ['george washington'],                Icon: Flag,         type: 'fly-across', count: 1,  size: 5,   quip: "Cannot tell a lie — that's a great name." },
  { id: 'churchill',        names: ['churchill', 'winston churchill'],   Icon: Megaphone,    type: 'fly-up',     count: 1,  size: 5,   quip: "We shall never surrender... to a boring name." },
  { id: 'gandhi',           names: ['gandhi', 'mahatma gandhi'],         Icon: Leaf,         type: 'float-up',   count: 15, size: 2,   quip: 'Be the name you wish to see in the world.' },
  { id: 'mlk',              names: ['martin luther king'],               Icon: Megaphone,    type: 'float-up',   count: 10, size: 2.5, quip: "I have a dream — and it starts with your name." },
  { id: 'mandela',          names: ['mandela', 'nelson mandela'],        Icon: Shield,       type: 'float-up',   count: 10, size: 3,   quip: 'A name that changed history.' },
  { id: 'joan-of-arc',      names: ['joan of arc', 'joan'],              Icon: Flame,        type: 'float-up',   count: 12, size: 2.5, quip: 'Fearless. Iconic. You.' },
  { id: 'harriet-tubman',   names: ['harriet tubman', 'harriet'],        Icon: Map,          type: 'float-up',   count: 10, size: 2.5, quip: 'The north star of great names.' },
  { id: 'socrates',         names: ['socrates'],                         Icon: Scroll,       type: 'float-up',   count: 10, size: 2.5, quip: 'Know thyself. And thy portfolio.' },
  { id: 'plato',            names: ['plato'],                            Icon: BookOpen,     type: 'float-up',   count: 10, size: 2.5, quip: 'The allegory of the cave had a better name.' },
  { id: 'aristotle',        names: ['aristotle'],                        Icon: Glasses,      type: 'float-up',   count: 8,  size: 3,   quip: 'Excellence is a habit. So is a great name.' },
  { id: 'sun-tzu',          names: ['sun tzu'],                          Icon: Swords,       type: 'fly-across', count: 1,  size: 5,   quip: 'The art of war requires the art of a great name.' },
  { id: 'confucius',        names: ['confucius'],                        Icon: Quote,        type: 'float-up',   count: 10, size: 2.5, quip: 'Confucius say: excellent name choice.' },
  { id: 'genghis',          names: ['genghis khan', 'genghis'],          Icon: Globe2,       type: 'rain',       count: 10, size: 2.5, quip: "You've conquered our form. Impressive." },
  { id: 'jfk',              names: ['jfk', 'john kennedy', 'kennedy'],  Icon: Landmark,     type: 'float-up',   count: 8,  size: 3,   quip: 'Ask not what your portfolio can do for you.' },
  { id: 'obama',            names: ['obama', 'barack obama'],            Icon: Landmark,     type: 'float-up',   count: 8,  size: 3,   quip: 'Yes we can... browse this portfolio.' },

  // ── Artists & Creatives ─────────────────────────────────────────────────────
  { id: 'shakespeare',      names: ['shakespeare'],                      Icon: ScrollText,   type: 'float-up',   count: 10, size: 2.5, quip: "What's in a name? A lot, apparently." },
  { id: 'picasso',          names: ['picasso', 'pablo picasso'],         Icon: Palette,      type: 'float-up',   count: 12, size: 2.5, quip: 'Every name is a work of art.' },
  { id: 'da-vinci',         names: ['da vinci', 'leonardo da vinci'],   Icon: Palette,      type: 'float-up',   count: 10, size: 2.5, quip: 'Renaissance person energy detected.' },
  { id: 'michelangelo',     names: ['michelangelo'],                     Icon: Brush,        type: 'float-up',   count: 12, size: 2.5, quip: "We would sculpt your name if we could." },
  { id: 'van-gogh',         names: ['van gogh', 'vincent van gogh'],    Icon: Palette,      type: 'rain',       count: 12, size: 2.5, quip: "Starry name. Very beautiful." },
  { id: 'warhol',           names: ['warhol', 'andy warhol'],            Icon: Camera,       type: 'float-up',   count: 15, size: 2,   quip: 'In the future, everyone gets 15 seconds on this site.' },
  { id: 'dali',             names: ['dali', 'salvador dali'],            Icon: Palette,      type: 'rain',       count: 10, size: 2.5, quip: 'Surreally good name.' },
  { id: 'frida-kahlo',      names: ['frida kahlo', 'frida'],             Icon: Flower2,      type: 'float-up',   count: 15, size: 2,   quip: 'An icon lands.' },
  { id: 'rembrandt',        names: ['rembrandt'],                        Icon: Brush,        type: 'float-up',   count: 10, size: 2.5, quip: 'Chiaroscuro? More like chiaroscool name.' },

  // ── Literary Figures ────────────────────────────────────────────────────────
  { id: 'austen',           names: ['austen', 'jane austen'],            Icon: Pen,          type: 'float-up',   count: 10, size: 2.5, quip: 'It is a truth universally acknowledged: great name.' },
  { id: 'dickens',          names: ['dickens', 'charles dickens'],       Icon: BookOpen,     type: 'float-up',   count: 10, size: 2.5, quip: 'It was the best of names, it was...' },
  { id: 'twain',            names: ['twain', 'mark twain'],              Icon: Quote,        type: 'float-up',   count: 8,  size: 3,   quip: 'The secret of getting ahead is a good name.' },
  { id: 'hemingway',        names: ['hemingway'],                        Icon: Anchor,       type: 'float-up',   count: 8,  size: 3,   quip: 'Short name. Big feelings.' },
  { id: 'orwell',           names: ['orwell', 'george orwell'],          Icon: Newspaper,    type: 'rain',       count: 10, size: 2.5, quip: 'Big Browser is watching... your great name.' },
  { id: 'tolkien',          names: ['tolkien'],                          Icon: Map,          type: 'float-up',   count: 10, size: 2.5, quip: 'Not all who wander are lost. You, however, found this.' },
  { id: 'rowling',          names: ['rowling', 'jk rowling'],            Icon: BookOpen,     type: 'float-up',   count: 10, size: 2.5, quip: "The name that lived." },
  { id: 'woolf',            names: ['woolf', 'virginia woolf'],          Icon: Feather,      type: 'float-up',   count: 12, size: 2.5, quip: 'Stream of consciousness: great name.' },
  { id: 'poe',              names: ['poe', 'edgar allan poe'],           Icon: Feather,      type: 'rain',       count: 12, size: 2.5, quip: 'Nevermore shall a name be forgotten.' },
  { id: 'kafka',            names: ['kafka'],                            Icon: BrainCircuit, type: 'rain',       count: 10, size: 2.5, quip: "One morning you woke up with a great name." },

  // ── Musicians ───────────────────────────────────────────────────────────────
  { id: 'composer',         names: ['mozart', 'beethoven', 'bach'],      Icon: Music,        type: 'rain',       count: 15, size: 2,   quip: 'The classics. Literally.' },
  { id: 'elvis',            names: ['elvis', 'elvis presley'],           Icon: Guitar,       type: 'fly-across', count: 1,  size: 5,   quip: 'The king has entered the portfolio.' },
  { id: 'beyonce',          names: ['beyoncé', 'beyonce'],               Icon: Sparkles,     type: 'float-up',   count: 20, size: 2,   quip: 'We are not worthy.' },
  { id: 'bowie',            names: ['david bowie', 'bowie'],             Icon: Zap,          type: 'fly-across', count: 1,  size: 5,   quip: 'Starman. Respect.' },
  { id: 'lennon',           names: ['lennon', 'john lennon'],            Icon: Music2,       type: 'float-up',   count: 12, size: 2.5, quip: 'Imagine all the portfolios...' },
  { id: 'prince',           names: ['prince'],                           Icon: Music2,       type: 'rain',       count: 15, size: 2,   quip: 'The portfolio formerly known as loading.' },
  { id: 'hendrix',          names: ['hendrix', 'jimi hendrix'],          Icon: Music2,       type: 'fly-across', count: 1,  size: 5,   quip: 'Are you experienced? You are now.' },
  { id: 'cash',             names: ['johnny cash'],                      Icon: Music2,       type: 'fly-across', count: 1,  size: 5,   quip: "I walked the line to get here." },
  { id: 'sinatra',          names: ['sinatra', 'frank sinatra'],         Icon: Headphones,   type: 'float-up',   count: 10, size: 2.5, quip: 'They did it their way. So did you.' },
  { id: 'whitney',          names: ['whitney houston', 'whitney'],       Icon: Music2,       type: 'fly-up',     count: 1,  size: 5,   quip: 'And IIIIII will always remember your name.' },
  { id: 'mariah',           names: ['mariah', 'mariah carey'],           Icon: Music2,       type: 'rain',       count: 12, size: 2.5, quip: "We don't know her. But we know this name." },
  { id: 'eminem',           names: ['eminem'],                           Icon: Mic2,         type: 'rain',       count: 12, size: 2,   quip: 'Will the real visitor please stand up.' },
  { id: 'adele',            names: ['adele'],                            Icon: Music2,       type: 'float-up',   count: 10, size: 2.5, quip: 'Hello. From the other side of the screen.' },
  { id: 'marilyn',          names: ['marilyn monroe', 'marilyn'],        Icon: Star,         type: 'float-up',   count: 15, size: 2.5, quip: 'Some like it portfolio.' },
  { id: 'oprah',            names: ['oprah'],                            Icon: Mic2,         type: 'fly-up',     count: 1,  size: 5,   quip: 'You get a scroll! And you get a scroll!' },
  { id: 'cobain',           names: ['cobain', 'kurt cobain'],            Icon: Music2,       type: 'rain',       count: 10, size: 2.5, quip: 'Here we are now, on the portfolio.' },
  { id: 'aretha',           names: ['aretha', 'aretha franklin'],        Icon: Music2,       type: 'fly-up',     count: 1,  size: 5,   quip: 'R-E-S-P-E-C-T. This name has it.' },

  // ── Film & Television ───────────────────────────────────────────────────────
  { id: 'hitchcock',        names: ['hitchcock', 'alfred hitchcock'],    Icon: Clapperboard, type: 'fly-across', count: 1,  size: 5,   quip: 'Suspenseful name choice. Deliberate.' },
  { id: 'spielberg',        names: ['spielberg', 'steven spielberg'],    Icon: Clapperboard, type: 'fly-across', count: 1,  size: 5,   quip: 'You have a need for speed. And portfolios.' },
  { id: 'chaplin',          names: ['chaplin', 'charlie chaplin'],       Icon: Film,         type: 'fly-across', count: 1,  size: 5,   quip: 'The tramp has excellent taste in portfolios.' },
  { id: 'kubrick',          names: ['kubrick', 'stanley kubrick'],       Icon: Clapperboard, type: 'rain',       count: 10, size: 2.5, quip: 'Open the pod bay portfolio, please.' },
  { id: 'tarantino',        names: ['tarantino'],                        Icon: Film,         type: 'fly-across', count: 1,  size: 5,   quip: 'Non-linear storytelling. Love the name.' },
  { id: 'meryl',            names: ['meryl streep', 'meryl'],            Icon: Award,        type: 'float-up',   count: 12, size: 2.5, quip: "Most Oscar nominations. Most legendary name." },

  // ── Athletes ────────────────────────────────────────────────────────────────
  { id: 'michael-jordan',   names: ['michael jordan'],                   Icon: Trophy,       type: 'fly-up',     count: 1,  size: 5,   quip: 'GOAT energy detected.' },
  { id: 'ali',              names: ['ali', 'muhammad ali'],              Icon: Flame,        type: 'fly-up',     count: 1,  size: 5,   quip: 'Float like a butterfly. Sting like this name.' },
  { id: 'serena',           names: ['serena', 'serena williams'],        Icon: Medal,        type: 'float-up',   count: 12, size: 2.5, quip: 'Serving up a legendary name.' },
  { id: 'messi',            names: ['messi', 'lionel messi'],            Icon: Trophy,       type: 'fly-up',     count: 1,  size: 5,   quip: 'The GOAT of goal names.' },
  { id: 'bolt',             names: ['usain bolt'],                       Icon: Timer,        type: 'fly-across', count: 1,  size: 5,   quip: "World's fastest name entry." },
  { id: 'phelps',           names: ['phelps', 'michael phelps'],         Icon: Waves,        type: 'float-up',   count: 10, size: 2.5, quip: '23 golds. One unforgettable name.' },
  { id: 'tiger',            names: ['tiger woods'],                      Icon: Award,        type: 'float-up',   count: 8,  size: 3,   quip: 'In the zone. Obviously.' },
  { id: 'federer',          names: ['federer', 'roger federer'],         Icon: Medal,        type: 'float-up',   count: 10, size: 2.5, quip: 'Graceful. Effortless. Like this name.' },

  // ── Pop Culture & Fiction ───────────────────────────────────────────────────
  { id: 'indiana-jones',    names: ['indiana jones'],                    Icon: Compass,      type: 'fly-across', count: 1,  size: 5,   quip: "We almost used a boulder. You're welcome." },
  { id: 'batman',           names: ['batman'],                           Icon: Moon,         type: 'rain',       count: 12, size: 2.5, quip: "We know that's not your real name." },
  { id: 'gandalf',          names: ['gandalf'],                          Icon: Wand2,        type: 'float-up',   count: 8,  size: 3,   quip: 'You shall not pass... without a warm welcome.' },
  { id: 'harry-potter',     names: ['harry potter'],                     Icon: Bird,         type: 'fly-across', count: 1,  size: 5,   quip: 'The chosen one has arrived.' },
  { id: 'sherlock',         names: ['sherlock holmes', 'sherlock'],      Icon: Search,       type: 'rain',       count: 10, size: 2.5, quip: 'Elementary, my dear portfolio.' },
  { id: 'hermione',         names: ['hermione'],                         Icon: BookOpen,     type: 'rain',       count: 12, size: 2.5, quip: "It's Hermione. And she read the docs." },
  { id: 'james-bond',       names: ['james bond'],                       Icon: Glasses,      type: 'fly-across', count: 1,  size: 5,   quip: 'Bond. JavaScript Bond.' },
  { id: 'dracula',          names: ['dracula'],                          Icon: Moon,         type: 'rain',       count: 12, size: 2.5, quip: 'I vant to see your portfolio.' },
  { id: 'thor',             names: ['thor'],                             Icon: Hammer,       type: 'fly-up',     count: 1,  size: 5,   quip: 'Worthy. Absolutely worthy.' },
  { id: 'yoda',             names: ['yoda'],                             Icon: Wand2,        type: 'float-up',   count: 10, size: 2.5, quip: 'Strong with this name, the Force is.' },
  { id: 'dumbledore',       names: ['dumbledore', 'albus'],              Icon: Star,         type: 'float-up',   count: 12, size: 2.5, quip: 'After all this time? Always a great name.' },
  { id: 'katniss',          names: ['katniss'],                          Icon: Flame,        type: 'float-up',   count: 12, size: 2.5, quip: 'The odds are ever in your favour.' },
  { id: 'aragorn',          names: ['aragorn'],                          Icon: Crown,        type: 'fly-up',     count: 1,  size: 5,   quip: 'The return of the visitor.' },
  { id: 'leia',             names: ['leia', 'princess leia'],            Icon: Orbit,        type: 'float-up',   count: 10, size: 2.5, quip: 'Help us, visitor. You are our only hope.' },
  { id: 'luke',             names: ['luke skywalker'],                   Icon: Orbit,        type: 'fly-up',     count: 1,  size: 5,   quip: "I am not your portfolio. But use it I will." },

  // ── Explorers & Adventurers ─────────────────────────────────────────────────
  { id: 'columbus',         names: ['columbus', 'christopher columbus'], Icon: Sailboat,     type: 'fly-across', count: 1,  size: 5,   quip: "You've discovered this portfolio. Congratulations." },
  { id: 'marco-polo',       names: ['marco polo'],                       Icon: Map,          type: 'fly-across', count: 1,  size: 5,   quip: 'Explorer. Traveller. Name legend.' },
  { id: 'magellan',         names: ['magellan'],                         Icon: Globe2,       type: 'fly-across', count: 1,  size: 5,   quip: "You've circumnavigated the name screen." },
  { id: 'vespucci',         names: ['vespucci', 'amerigo vespucci'],     Icon: Sailboat,     type: 'fly-across', count: 1,  size: 5,   quip: 'A whole new world. Just like this portfolio.' },
  { id: 'hillary',          names: ['hillary', 'edmund hillary'],        Icon: Mountain,     type: 'float-up',   count: 8,  size: 3,   quip: "Because it's there." },
  { id: 'cousteau',         names: ['cousteau', 'jacques cousteau'],     Icon: Anchor,       type: 'float-up',   count: 10, size: 2.5, quip: "The ocean of this portfolio is yours to explore." },

  // ── Chefs & Food ────────────────────────────────────────────────────────────
  { id: 'escoffier',        names: ['escoffier', 'julia child', 'julia'], Icon: ChefHat,    type: 'float-up',   count: 10, size: 2.5, quip: "Bon appétit! Also, great name." },
  { id: 'gordon',           names: ['gordon ramsay', 'gordon'],           Icon: ChefHat,    type: 'fly-up',     count: 1,  size: 5,   quip: 'This name is RAW. Beautifully RAW.' },
  { id: 'bourdain',         names: ['bourdain', 'anthony bourdain'],      Icon: ChefHat,    type: 'float-up',   count: 10, size: 2.5, quip: 'No reservations about this name.' },

  // ── Tech & Entrepreneurs ─────────────────────────────────────────────────────
  { id: 'bezos',            names: ['bezos', 'jeff bezos'],               Icon: Package,    type: 'rain',       count: 12, size: 2.5, quip: "This name ships in two days." },
  { id: 'zuckerberg',       names: ['zuckerberg', 'mark zuckerberg'],     Icon: Globe,      type: 'rain',       count: 10, size: 2.5, quip: 'This information will not be shared with anyone.' },
  { id: 'wozniak',          names: ['wozniak', 'steve wozniak'],           Icon: Cpu,        type: 'rain',       count: 12, size: 2.5, quip: 'The engineer behind the legend.' },

  // ── Academics & Philosophers ─────────────────────────────────────────────────
  { id: 'freud',            names: ['freud', 'sigmund freud'],            Icon: BrainCircuit, type: 'rain',     count: 10, size: 2.5, quip: 'Sometimes a great name is just a great name.' },
  { id: 'nietzsche',        names: ['nietzsche'],                          Icon: Quote,      type: 'float-up',  count: 10, size: 2.5, quip: 'What does not kill your loading screen makes it stronger.' },
  { id: 'descartes',        names: ['descartes'],                          Icon: Glasses,    type: 'float-up',  count: 8,  size: 3,   quip: 'I type, therefore I am... on the right portfolio.' },
  { id: 'feynman',          names: ['feynman', 'richard feynman'],         Icon: Atom,       type: 'rain',      count: 12, size: 2.5, quip: "If you can't explain your name simply, it's still great." },
  { id: 'sagan',            names: ['sagan', 'carl sagan'],                Icon: Telescope,  type: 'float-up',  count: 12, size: 2.5, quip: 'Billions and billions of great names. Yours included.' },
  { id: 'chomsky',          names: ['chomsky', 'noam chomsky'],            Icon: BookOpen,   type: 'float-up',  count: 8,  size: 3,   quip: 'The syntax of this name is impeccable.' },

  // ── Nature & Environmentalists ───────────────────────────────────────────────
  { id: 'attenborough',     names: ['attenborough', 'david attenborough'], Icon: TreePine,  type: 'float-up',  count: 15, size: 2,   quip: "Here we observe the rare visitor in its natural habitat." },
  { id: 'muir',             names: ['muir', 'john muir'],                  Icon: Mountain,  type: 'float-up',  count: 10, size: 2.5, quip: 'The mountains are calling. So is this portfolio.' },
  { id: 'goodall',          names: ['goodall', 'jane goodall'],             Icon: Sprout,    type: 'float-up',  count: 15, size: 2,   quip: 'Every individual matters. Especially this name.' },

  // ── Comedians & Entertainers ────────────────────────────────────────────────
  { id: 'robin',            names: ['robin williams'],                     Icon: Radio,      type: 'float-up',  count: 15, size: 2,   quip: "O Captain, my Captain. Welcome." },
  { id: 'carlin',           names: ['carlin', 'george carlin'],            Icon: Mic2,       type: 'float-up',  count: 8,  size: 3,   quip: "Seven words you can type in this portfolio." },

  // ── Royalty ──────────────────────────────────────────────────────────────────
  { id: 'victoria',         names: ['victoria', 'queen victoria'],         Icon: Crown,      type: 'float-up',  count: 10, size: 3,   quip: 'We are not amused. We are delighted.' },
  { id: 'diana',            names: ['diana', 'princess diana'],            Icon: Crown,      type: 'float-up',  count: 12, size: 2.5, quip: "The people's name." },
  { id: 'elizabeth',        names: ['queen elizabeth'],                    Icon: Crown,      type: 'float-up',  count: 10, size: 3,   quip: 'A reign of excellent taste. As expected.' },
  { id: 'henry',            names: ['henry viii'],                         Icon: Crown,      type: 'rain',      count: 10, size: 2.5, quip: "Six visits. We won't judge." },

  // ── Mathematicians ───────────────────────────────────────────────────────────
  { id: 'euclid',           names: ['euclid'],                             Icon: Pi,         type: 'rain',      count: 12, size: 2.5, quip: 'Point. Line. Portfolio.' },
  { id: 'gauss',            names: ['gauss', 'carl gauss'],                Icon: Calculator, type: 'rain',      count: 10, size: 2.5, quip: 'Normally distributed excellence.' },
  { id: 'euler',            names: ['euler'],                              Icon: Pi,         type: 'float-up',  count: 10, size: 2.5, quip: "e to the i-pi plus one equals a great name." },
  { id: 'babbage',          names: ['babbage', 'charles babbage'],         Icon: Cpu,        type: 'rain',      count: 10, size: 2.5, quip: 'The original computer. Still impressive.' },

  // ── Personal ─────────────────────────────────────────────────────────────────
  { id: 'austin',           names: ['austin'],                             Icon: PartyPopper, type: 'float-up',  count: 16, size: 2.5, quip: "No way. We have the same name." },
  { id: 'marianne',         names: ['marianne'],                           Icon: Heart,      type: 'float-up',  count: 18, size: 2.5, quip: "That's my mom's name!" },
  { id: 'ban',              names: [' ban'],                               Icon: Users,      type: 'float-up',  count: 14, size: 2.5, quip: 'Wait, are we related?' },
  { id: 'goldie',           names: ['goldie'],                             Icon: Sun,        type: 'float-up',  count: 16, size: 2.5, quip: "Hi, Goldie! (that's my daughter's name)" },
];
