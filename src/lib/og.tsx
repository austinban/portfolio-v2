/**
 * OG Image System
 *
 * Uses Satori (JSX → SVG) + @resvg/resvg-js (SVG → PNG) to generate
 * static OG images at build time.
 *
 * To design a new template, add a component below and export a generator
 * function. Wire it up in src/pages/og/.
 *
 * Design tokens match src/styles/global.css exactly.
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ── Tokens ────────────────────────────────────────────────────────────────────

const C = {
  dark: "#0c0b09",
  cream: "#fffbf0",
  yellow: "#eeab12",
  pink: "#fe826a",
  muted: "#7a7060",
  border: "#2a2620",
} as const;

// ── Font loader (lazy + cached) ───────────────────────────────────────────────

const _fontCache: Record<string, ArrayBuffer> = {};

function font(filename: string): ArrayBuffer {
  if (_fontCache[filename]) return _fontCache[filename]!;
  const buf = readFileSync(resolve(process.cwd(), "public", filename));
  _fontCache[filename] = new Uint8Array(buf).buffer;
  return _fontCache[filename]!;
}

// ── Core renderer ─────────────────────────────────────────────────────────────

async function render(node: React.ReactElement): Promise<Uint8Array> {
  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "CooperHewitt",
        data: font("cooperhewitt-heavy-webfont.woff"),
        weight: 800,
        style: "normal",
      },
      {
        name: "CooperHewitt",
        data: font("cooperhewitt-medium-webfont.woff"),
        weight: 500,
        style: "normal",
      },
      {
        name: "CooperHewitt",
        data: font("cooperhewitt-book-webfont.woff"),
        weight: 400,
        style: "normal",
      },
    ],
  });
  return new Resvg(svg).render().asPng();
}

// ── Shared layout pieces ──────────────────────────────────────────────────────

function Label({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: "CooperHewitt",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: C.muted,
        display: "flex",
      }}
    >
      {children}
    </span>
  );
}

// ── Template: Default (home page + fallback) ──────────────────────────────────

function DefaultTemplate() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: C.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        fontFamily: "CooperHewitt",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label>austinban.com</Label>
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: C.yellow,
            display: "flex",
          }}
        >
          AB
        </span>
      </div>

      {/* Main heading */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Label>Senior UX Engineer &amp; Frontend Developer</Label>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: C.cream,
            lineHeight: 0.92,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Austin Ban.
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: C.muted,
            marginTop: 8,
            display: "flex",
          }}
        >
          I build things that are fast, opinionated, and a little hard to
          forget.
        </div>
      </div>

      {/* Footer tags */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {["React", "TypeScript", "Design Systems", "9+ years"].map(
          (tag, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && (
                <span
                  style={{
                    color: C.border,
                    marginRight: 24,
                    fontSize: 18,
                    display: "flex",
                  }}
                >
                  ·
                </span>
              )}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.muted,
                  display: "flex",
                }}
              >
                {tag}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export async function defaultOgImage(): Promise<Uint8Array> {
  return render(<DefaultTemplate />);
}

// ── Template: Work / case study ───────────────────────────────────────────────

export interface WorkOgProps {
  title: string;
  description: string;
  role: string;
  tags: string[];
  year: string;
}

function WorkTemplate({ title, description, role, tags, year }: WorkOgProps) {
  const titleSize = title.length > 22 ? 64 : title.length > 14 ? 76 : 92;

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: C.dark,
        display: "flex",
        fontFamily: "CooperHewitt",
      }}
    >
      {/* Yellow left accent bar */}
      <div
        style={{
          width: 4,
          background: C.yellow,
          flexShrink: 0,
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>
            {role} · {year}
          </Label>
          <Label>austinban.com</Label>
        </div>

        {/* Title + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: C.cream,
              lineHeight: 1,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 21,
              fontWeight: 400,
              color: C.muted,
              maxWidth: 700,
              display: "flex",
              flexWrap: "wrap",
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 10 }}>
          {tags.slice(0, 5).map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.muted,
                border: `1px solid ${C.border}`,
                padding: "6px 14px",
                display: "flex",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function workOgImage(props: WorkOgProps): Promise<Uint8Array> {
  return render(<WorkTemplate {...props} />);
}
