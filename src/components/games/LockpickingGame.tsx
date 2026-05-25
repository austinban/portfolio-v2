import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ── Constants ──────────────────────────────────────────────────────────────────
const C          = 160;   // SVG centre
const SVG_SIZE   = 320;
const OUTER_R    = 118;   // outer lock ring
const INNER_R    = 52;    // rotating cylinder
const SWEET_HALF = 11;    // half-width of sweet spot in degrees
const TURN_RATE  = 150;   // degrees / second when at sweet spot
const BREAK_MS   = 900;   // ms before pick breaks outside sweet spot
const MAX_PICKS  = 5;

// ── Helpers ────────────────────────────────────────────────────────────────────
function norm(deg: number) { return ((deg % 360) + 360) % 360; }
function angDiff(a: number, b: number) {
  const d = norm(a - b);
  return d > 180 ? 360 - d : d;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function LockpickingGame() {
  const [pickAngle,     setPickAngle]     = useState(0);
  const [cylinderAngle, setCylinderAngle] = useState(0);
  const [sweetSpot,     setSweetSpot]     = useState(() => Math.random() * 360);
  const [picks,         setPicks]         = useState(MAX_PICKS);
  const [gameState,     setGameState]     = useState<'playing' | 'won' | 'lost'>('playing');
  const [breakState,    setBreakState]    = useState<'none' | 'bending' | 'broken'>('none');
  const [turning,       setTurning]       = useState(false);
  const [animKey,       setAnimKey]       = useState(0); // bump to hard-reset motion.div animation

  // Refs — avoid stale closures in RAF / timer callbacks
  const pickRef      = useRef(0);
  const cylRef       = useRef(0);
  const sweetRef     = useRef(sweetSpot);
  const turningRef   = useRef(false);
  const picksRef     = useRef(MAX_PICKS);
  const gameRef      = useRef<'playing' | 'won' | 'lost'>('playing');
  const rafRef        = useRef<number | undefined>(undefined);
  const lastTimeRef   = useRef<number | undefined>(undefined);
  const breakTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const bendTimerRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const svgRef        = useRef<SVGSVGElement>(null);

  useEffect(() => { sweetRef.current = sweetSpot; }, [sweetSpot]);

  // ── Pointer → angle ─────────────────────────────────────────────────────────
  const angleFromPointer = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return 0;
    const r = svgRef.current.getBoundingClientRect();
    return norm(Math.atan2(clientY - (r.top + r.height / 2), clientX - (r.left + r.width / 2)) * 180 / Math.PI + 90);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (gameRef.current !== 'playing') return;
      const a = angleFromPointer(e.clientX, e.clientY);
      pickRef.current = a; setPickAngle(a);
    };
    const onTouch = (e: TouchEvent) => {
      if (gameRef.current !== 'playing') return;
      const a = angleFromPointer(e.touches[0].clientX, e.touches[0].clientY);
      pickRef.current = a; setPickAngle(a);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch); };
  }, [angleFromPointer]);

  // Arrow keys nudge the pick
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameRef.current !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const a = norm(pickRef.current + (e.key === 'ArrowLeft' ? -3 : 3));
        pickRef.current = a; setPickAngle(a);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Break pick ───────────────────────────────────────────────────────────────
  const breakPick = useCallback(() => {
    turningRef.current = false;
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    setTurning(false);
    setBreakState('broken');
    setAnimKey(k => k + 1); // remount motion.div to kill any in-flight repeat animation
    cylRef.current = 0;
    setCylinderAngle(0);

    const n = picksRef.current - 1;
    picksRef.current = n;
    setPicks(n);

    setTimeout(() => {
      setBreakState('none');
      if (n <= 0) {
        gameRef.current = 'lost'; setGameState('lost');
      } else {
        const s = Math.random() * 360;
        sweetRef.current = s; setSweetSpot(s);
      }
    }, 650);
  }, []);

  // ── Turn RAF loop ────────────────────────────────────────────────────────────
  const startTurning = useCallback(() => {
    if (turningRef.current || gameRef.current !== 'playing') return;
    turningRef.current = true;
    setTurning(true);
    lastTimeRef.current = undefined;

    const tick = (t: number) => {
      if (!turningRef.current) return;
      const dt = lastTimeRef.current === undefined ? 0 : (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      const atSpot = angDiff(pickRef.current, sweetRef.current) < SWEET_HALF;

      if (atSpot) {
        if (breakTimerRef.current !== undefined) { clearTimeout(breakTimerRef.current); breakTimerRef.current = undefined; }
        if (bendTimerRef.current  !== undefined) { clearTimeout(bendTimerRef.current);  bendTimerRef.current  = undefined; }
        setBreakState('none');
        cylRef.current = Math.min(360, cylRef.current + TURN_RATE * dt);
        setCylinderAngle(cylRef.current);
        if (cylRef.current >= 360) {
          gameRef.current = 'won'; setGameState('won');
          turningRef.current = false; return;
        }
      } else {
        if (!bendTimerRef.current)
          bendTimerRef.current = setTimeout(() => setBreakState('bending'), BREAK_MS * 0.45);
        if (!breakTimerRef.current)
          breakTimerRef.current = setTimeout(() => {
            breakTimerRef.current = undefined; bendTimerRef.current = undefined;
            breakPick();
          }, BREAK_MS);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [breakPick]);

  const stopTurning = useCallback(() => {
    if (!turningRef.current) return;
    turningRef.current = false; setTurning(false);
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    if (breakTimerRef.current) { clearTimeout(breakTimerRef.current); breakTimerRef.current = undefined; }
    if (bendTimerRef.current)  { clearTimeout(bendTimerRef.current);  bendTimerRef.current  = undefined; }
    setBreakState('none');
  }, []);

  // Spacebar
  useEffect(() => {
    const dn = (e: KeyboardEvent) => { if (e.code === 'Space') { e.preventDefault(); startTurning(); } };
    const up = (e: KeyboardEvent) => { if (e.code === 'Space') stopTurning(); };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, [startTurning, stopTurning]);

  useEffect(() => () => {
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    if (breakTimerRef.current) clearTimeout(breakTimerRef.current);
    if (bendTimerRef.current)  clearTimeout(bendTimerRef.current);
  }, []);

  // ── Win confetti ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState !== 'won') return;

    const COLORS = ['#eeab12', '#f5c842', '#fffbf0', '#fe826a', '#ff9f8a'];

    // Central burst from the lock
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { x: 0.5, y: 0.42 },
      colors: COLORS,
      startVelocity: 38,
      gravity: 0.85,
      ticks: 280,
      scalar: 0.9,
    });

    // Side cannons fire slightly after
    const t = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 65,
        spread: 55,
        origin: { x: 0.1, y: 0.55 },
        colors: COLORS,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 220,
      });
      confetti({
        particleCount: 50,
        angle: 115,
        spread: 55,
        origin: { x: 0.9, y: 0.55 },
        colors: COLORS,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 220,
      });
    }, 180);

    return () => clearTimeout(t);
  }, [gameState]);

  // ── Restart ──────────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    stopTurning();
    cylRef.current = 0; picksRef.current = MAX_PICKS; gameRef.current = 'playing';
    const s = Math.random() * 360; sweetRef.current = s;
    setSweetSpot(s); setCylinderAngle(0); setPicks(MAX_PICKS);
    setGameState('playing'); setBreakState('none');
    setAnimKey(k => k + 1); // remount motion.div to kill any in-flight repeat animation
  }, [stopTurning]);

  // ── Derived visual values ────────────────────────────────────────────────────
  const d      = angDiff(pickAngle, sweetSpot);
  const atSpot = d < SWEET_HALF;

  // Ring colour — only visible while turning; gradient red → amber → gold
  const ringColor = !turning
    ? '#2e2a24'
    : d < SWEET_HALF       ? '#eeab12'   // gold  – at spot
    : d < SWEET_HALF * 2   ? '#d4880c'   // amber – very close
    : d < SWEET_HALF * 4   ? '#c05020'   // orange – moderate
    : d < SWEET_HALF * 7   ? '#c02828'   // red   – far
    :                         '#bf1c1c';  // deep red – very far

  const rad  = (pickAngle - 90) * (Math.PI / 180);
  const pc   = Math.cos(rad);
  const ps   = Math.sin(rad);
  const x1   = C + pc * (OUTER_R - 30);
  const y1   = C + ps * (OUTER_R - 30);
  const x2   = C + pc * (OUTER_R + 24);
  const y2   = C + ps * (OUTER_R + 24);
  const tipX = x2 + ps * 10;
  const tipY = y2 - pc * 10;

  const pickColor =
    breakState === 'broken' ? '#e8437a' :
    breakState === 'bending' ? '#d06040' :
    atSpot ? '#eeab12' : '#b09070';

  const circumference = 2 * Math.PI * INNER_R;
  const arcLen = (cylinderAngle / 360) * circumference;

  // Progress glow — eased so it's subtle early, dramatic near the end
  const progress  = cylinderAngle / 360;          // 0 → 1
  const glowEased = progress * progress;           // ease-in: mostly invisible until ~50%

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-dark flex flex-col items-center justify-center gap-8 px-6 py-16"
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-muted text-xs uppercase tracking-widest mb-2">Mini game</p>
        <h1 className="text-3xl font-bold text-cream">Lockpicking</h1>
      </div>

      {/* Lock SVG */}
      <motion.div
        key={animKey}
        animate={
          breakState === 'broken'
            ? { x: [0, -6, 6, -5, 5, -3, 3, 0] }
            : turning && !atSpot
              ? breakState === 'bending'
                ? { x: [0, -3.5, 3.5, -3.5, 3.5, 0] }
                : { x: [0, -2,   2,   -2,   2,   0] }
              : { x: 0 }
        }
        transition={
          breakState === 'broken'
            ? { duration: 0.35, ease: 'easeInOut' }
            : turning && !atSpot
              ? { duration: 0.2, repeat: Infinity, ease: 'linear' }
              : { duration: 0.1 }
        }
      >
        <svg
          ref={svgRef}
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="overflow-visible"
        >
          {/* Tick marks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
            return (
              <line key={i}
                x1={C + Math.cos(a) * (OUTER_R - 7)} y1={C + Math.sin(a) * (OUTER_R - 7)}
                x2={C + Math.cos(a) * (OUTER_R + 7)} y2={C + Math.sin(a) * (OUTER_R + 7)}
                stroke="#1e1b17" strokeWidth={1.5}
              />
            );
          })}

          {/* Progress glow — deep soft halo that builds with cylinderAngle */}
          {progress > 0.01 && (
            <>
              {/* Wide diffuse layer */}
              <circle cx={C} cy={C} r={OUTER_R}
                fill="none" stroke="#eeab12" strokeWidth={28}
                opacity={glowEased * 0.13}
              />
              {/* Tighter, brighter layer */}
              <circle cx={C} cy={C} r={OUTER_R}
                fill="none" stroke="#eeab12" strokeWidth={10}
                opacity={glowEased * 0.28}
              />
            </>
          )}

          {/* Turning proximity glow — amplified by progress */}
          {turning && d < SWEET_HALF * 4 && (
            <circle cx={C} cy={C} r={OUTER_R}
              fill="none"
              stroke={ringColor}
              strokeWidth={10}
              opacity={(d < SWEET_HALF ? 0.18 : 0.08) * (1 + glowEased * 1.5)}
              style={{ transition: 'opacity 0.15s, stroke 0.15s' }}
            />
          )}

          {/* Outer ring */}
          <circle cx={C} cy={C} r={OUTER_R}
            fill="none"
            stroke={ringColor}
            strokeWidth={turning && atSpot ? 2.5 : 2}
            style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
          />

          {/* Cylinder (rotates with cylinderAngle) */}
          <g transform={`rotate(${cylinderAngle}, ${C}, ${C})`}>
            <circle cx={C} cy={C} r={INNER_R} fill="#131109" stroke="#272420" strokeWidth={2} />
            {/* Keyhole */}
            <circle cx={C} cy={C - 14} r={9} fill="#1e1b17" />
            <rect x={C - 5} y={C - 14} width={10} height={22} rx={1} fill="#1e1b17" />
          </g>

          {/* Inner cylinder progress bloom — gold fill that breathes in with progress */}
          {progress > 0.01 && (
            <circle cx={C} cy={C} r={INNER_R}
              fill="#eeab12"
              opacity={glowEased * 0.12}
            />
          )}

          {/* Progress arc — brightens and widens as the lock nears open */}
          {cylinderAngle > 1 && (
            <circle cx={C} cy={C} r={INNER_R}
              fill="none"
              stroke="#eeab12"
              strokeWidth={3 + glowEased * 3}
              strokeDasharray={`${arcLen} ${circumference}`}
              transform={`rotate(-90, ${C}, ${C})`}
              opacity={0.45 + glowEased * 0.5}
            />
          )}

          {/* Lock pick */}
          {gameState === 'playing' && (
            <>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={pickColor} strokeWidth={2.5} strokeLinecap="round"
                opacity={breakState === 'broken' ? 0.35 : 1}
                style={{ transition: 'stroke 0.12s' }}
              />
              <line x1={x2} y1={y2} x2={tipX} y2={tipY}
                stroke={pickColor} strokeWidth={2.5} strokeLinecap="round"
                opacity={breakState === 'broken' ? 0.35 : 1}
                style={{ transition: 'stroke 0.12s' }}
              />
            </>
          )}

          {/* Win glow */}
          {gameState === 'won' && (
            <circle cx={C} cy={C} r={INNER_R}
              fill="none"
              stroke="#eeab12"
              strokeWidth={6}
              opacity={0.6}
            />
          )}
        </svg>
      </motion.div>

      {/* Picks remaining */}
      <div className="flex items-center gap-4">
        <span className="text-muted text-xs uppercase tracking-widest">Picks</span>
        <div className="flex gap-2 items-end">
          {Array.from({ length: MAX_PICKS }).map((_, i) => (
            <div key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: 5, height: i < picks ? 20 : 10,
                backgroundColor: i < picks ? '#eeab12' : '#2a2520',
              }}
            />
          ))}
        </div>
      </div>

      {/* State-driven UI */}
      <AnimatePresence mode="wait">
        {gameState === 'playing' && (
          <motion.div key="controls"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onMouseDown={startTurning}
              onMouseUp={stopTurning}
              onMouseLeave={stopTurning}
              onTouchStart={(e) => { e.preventDefault(); startTurning(); }}
              onTouchEnd={stopTurning}
              className={`border px-10 py-4 text-xs uppercase tracking-widest transition-all duration-150 select-none ${
                turning
                  ? 'border-yellow/80 text-yellow'
                  : 'border-muted/25 text-muted hover:border-muted/50 hover:text-cream'
              }`}
            >
              {turning ? 'Turning…' : 'Hold to turn'}
            </button>
            <p className="text-muted/35 text-xs text-center leading-relaxed">
              Move mouse to rotate pick · Space or hold button to turn
            </p>
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div key="won"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <p className="text-yellow text-2xl font-bold tracking-tight">Lock opened.</p>
            <button onClick={restart}
              className="border border-muted/25 text-muted text-xs uppercase tracking-widest px-8 py-3 hover:border-muted/50 hover:text-cream transition-all duration-150"
            >
              Try again
            </button>
          </motion.div>
        )}

        {gameState === 'lost' && (
          <motion.div key="lost"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <p className="text-pink text-2xl font-bold tracking-tight">Out of picks.</p>
            <button onClick={restart}
              className="border border-muted/25 text-muted text-xs uppercase tracking-widest px-8 py-3 hover:border-muted/50 hover:text-cream transition-all duration-150"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a href="/portfolio-v2"
        className="text-muted/35 text-xs uppercase tracking-widest hover:text-muted/60 transition-colors"
      >
        ← Back to portfolio
      </a>
    </div>
  );
}
