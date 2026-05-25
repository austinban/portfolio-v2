# Portfolio V2 — Claude Code Rules

## Translation files (`src/i18n/locales/`)

### Always use double quotes for all string values

Every string value in a locale file **must** use double quotes. Never single quotes.

```ts
// CORRECT
label: "Modifier le prénom",
body: "J'ai passé la dernière décennie...",
sub: "C'était la visite guidée, {name}.",

// WRONG — breaks on any apostrophe in the translated text
label: 'Modifier le prénom',
body: 'J'ai passé la dernière décennie...',  // syntax error
```

This rule applies unconditionally. Even strings that don't currently contain apostrophes should use double quotes, because future edits to the copy may add one. Romance languages (French, Italian, Spanish, Portuguese) and many others use apostrophes heavily in contractions — assume every string might need one.

### Never use single quotes for string values. Ever.

The only single quotes allowed in locale files are:
- The TypeScript import statement: `import type { Translations } from '../types';`
- Object keys: `'amelia-earhart': "..."` — key in single quotes, value in double quotes

### Placeholder tokens must be preserved exactly

These tokens are used for runtime interpolation and must appear verbatim:

| Token | Used for |
|---|---|
| `{name}` | Visitor's name (splits string for `<EditableName />` component) |
| `{austin}` | Austin's name (splits string for the `<span className="text-yellow">` span) |
| `{n}` | A number (character count, etc.) |
| `{max}` | Max character length |

Rules:
- Copy the token character-for-character including the braces
- Do not translate, localize, or reformat the token itself
- Do not add spaces inside: `{ name }` is wrong, `{name}` is correct
- Place the token at the correct position for the target language's word order — the text before/after it will be split and rendered as separate React nodes

### The `eggs` object must be complete

Every key from the English `en.ts` `eggs` object must be present in every locale file. TypeScript enforces this via `Record<EggId, string>` — a missing key is a compile error. Do not remove keys, even if the quip doesn't translate well. Adapt it instead.

### Adapting egg quips

- Quips are 1–2 sentences max. Short, punchy, slightly irreverent.
- English wordplay often doesn't translate literally. Find the equivalent joke in the target language rather than translating word-for-word.
- The personal eggs (`austin`, `ban`, `marianne`, `goldie`, `callie`) can stay in English or be lightly adapted — they reference personal relationships and the humor is universal.

### Validation

After writing or editing any locale file, run:

```sh
npm run check:types   # TypeScript: catches missing keys, wrong types, bad placeholders
npm run check:i18n    # Runtime: catches untranslated strings, stale keys, placeholder mismatches
npm run build         # Full Astro build: final confirmation all routes generate
```

All three must pass with zero errors before the translation is considered complete.

---

## Easter eggs (`src/data/easterEggs.ts`)

When adding a new entry to `EASTER_EGGS`:

1. Add the entry to the array with a unique `id` string (kebab-case)
2. Add the English quip to `src/i18n/locales/en.ts` under `eggs`
3. `npm run check:types` will immediately error on every other locale file that's missing the new key — that's intentional. Add the translated quip to each locale file before committing.

The `EggId` type is derived automatically from the array, so no manual type maintenance is needed.

---

## Components that consume translations

Translations flow through `SceneContext`. Every component that needs translated text calls `const { t } = useScene()`.

- Use `t.ui.*` for UI chrome (nav, inputs, hints)
- Use `t.scenes.*` for scene content
- Use `t.eggs[egg.id]` for easter egg quips (with `?? egg.quip` fallback for safety)
- Use the `t(str, vars)` helper from `src/i18n/index.ts` for `{placeholder}` interpolation

For strings that contain `{name}` or `{austin}` — these are split at the token boundary to insert React components inline. The pattern is:

```tsx
const [before = '', after = ''] = t.scenes.greeting.heading.split('{name}');
// render: {before}<EditableName />{after}
```
