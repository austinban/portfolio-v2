import { motion } from "framer-motion";

const STAT_CARDS = [
  { id: "bundle", stat: "10", unit: "KB", label: "Bundle", desc: "Gzipped, this page" },
  { id: "performance", stat: "<1", unit: "s", label: "Load time", desc: "First Contentful Paint" },
  { id: "languages", stat: "8", unit: "", label: "Languages", desc: "With auto-detection" },
  { id: "accessibility", stat: "AA", unit: "", label: "Accessibility", desc: "WCAG 2.1 compliant" },
  { id: "stack", stat: "12", unit: "", label: "Tools", desc: "The deliberate stack" },
];

const BUNDLE_BARS = [
  { label: "Global CSS", size: "6KB", width: "32%", dim: false },
  { label: "Nav chrome", size: "4KB", width: "21%", dim: false },
  { label: "Portfolio scenes (homepage only)", size: "167KB", width: "100%", dim: true },
  { label: "Framer Motion (homepage only)", size: "124KB", width: "74%", dim: true },
];

const PERFORMANCE_ITEMS = [
  { label: "Static generation", desc: "Build once, serve forever" },
  { label: "CDN delivery", desc: "GitHub Pages edge network" },
  { label: "Zero hydration", desc: "No framework on most pages" },
  { label: "Lazy images", desc: "Assets load as needed" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

const STACK = [
  { name: "Astro 5", role: "Static site framework" },
  { name: "React 18", role: "UI components / islands" },
  { name: "Tailwind CSS v4", role: "Styling" },
  { name: "Framer Motion", role: "Animations" },
  { name: "TypeScript", role: "Type safety" },
  { name: "MDX", role: "Case study content" },
  { name: "Formspree", role: "Contact form" },
  { name: "lucide-react", role: "Icons" },
  { name: "Prettier", role: "Code formatting" },
  { name: "GitHub Actions", role: "CI / CD" },
  { name: "GitHub Pages", role: "Hosting" },
  { name: "Cloudflare Analytics", role: "Privacy-first analytics" },
];

const TIMELINE = [
  { date: "Apr 2025", event: "Decided to rebuild from scratch", note: "Previous site was Express + EJS. Time to move on." },
  { date: "Apr 2025", event: "Migrated to Astro", note: "Ported all existing pages, case studies, and assets." },
  { date: "May 2025", event: "Designed the scene-based UX", note: "Name-gated entry, linear navigation, editorial aesthetic." },
  { date: "May 2025", event: "Built core portfolio experience", note: "React islands, SceneEngine, 6 scenes, Framer Motion transitions." },
  { date: "May 2025", event: "Internationalisation", note: "8-language support with auto-detection and RTL layout." },
  { date: "May 2025", event: "Accessibility pass", note: "ARIA roles, keyboard nav, focus management, reduced-motion support." },
  { date: "May 2025", event: "Easter egg system", note: "Name recognition triggers personalised animations. 20+ names covered — try a few." },
  { date: "May 2025", event: "Contact form", note: "Formspree integration in a modal. Catches you if you submit under an alias." },
  { date: "May 2025", event: "Nav drawer & cross-page chrome", note: "Consistent hamburger, drawer, and language switcher on every page." },
  { date: "May 2025", event: "Deployed via GitHub Actions", note: "Automated build and deploy to GitHub Pages on every push to main." },
  { date: "May 2025", event: "Launched on austinban.com", note: "Custom domain via Namecheap. HTTPS enforced." },
];

export default function SceneAboutSite() {
  return (
    <motion.div
      className="bg-dark absolute inset-0 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-8 pt-20 pb-28 md:px-20">

        {/* Hero */}
        <div className="mb-16">
          <p className="text-muted mb-5 text-sm tracking-widest uppercase">About this site</p>
          <h1 className="text-cream mb-4 text-5xl leading-[1.05] font-bold md:text-7xl">
            Made with<br /><span className="text-yellow">intention.</span>
          </h1>
          <p className="text-muted max-w-lg text-base leading-relaxed font-light md:text-lg">
            From the architecture to the copy, every decision was deliberate. Here's the receipt.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {STAT_CARDS.map(({ id, stat, unit, label, desc }) => (
              <a
                key={id}
                href={`#scene-about-${id}`}
                className="border-muted/15 bg-dark-surface group flex flex-col gap-2 rounded-xl border p-5 transition-colors duration-200 hover:border-yellow/40"
              >
                <span className="text-yellow font-bold leading-none">
                  <span className="text-4xl md:text-5xl">{stat}</span>
                  {unit && <span className="text-lg">{unit}</span>}
                </span>
                <span className="text-cream text-sm font-medium tracking-widest uppercase">{label}</span>
                <span className="text-muted text-sm font-light leading-tight">{desc}</span>
              </a>
            ))}
          </div>

          <p className="text-muted mt-8 text-sm tracking-widest uppercase">Scroll to dive deeper ↓</p>
        </div>

        {/* Honest intro */}
        <div className="border-muted/20 mb-0 flex max-w-xl flex-col gap-5 border-t py-16 text-lg leading-relaxed font-light text-muted">
          <p>
            This site was built collaboratively with Claude Sonnet, Anthropic's AI coding assistant. The design direction, content, copy, and every architectural decision are mine — Claude helped translate them into production-quality code faster than I could have alone.
          </p>
          <p>
            I want to be upfront about that. AI was a real part of this build, not a shortcut and not something to hide. I used it the same way I'd use any powerful tool: deliberately, with judgment, and with full ownership of the outcome.
          </p>
        </div>

        <div className="border-muted/20 flex flex-col gap-px border-t">

          {/* Bundle size */}
          <section id="scene-about-bundle" className="border-muted/20 scroll-mt-24 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Bundle size</p>
            <p className="text-cream mb-4 text-4xl font-bold">~10KB<span className="text-muted text-xl font-light"> gzipped</span></p>
            <p className="text-muted mb-6 max-w-lg text-base leading-relaxed font-light">
              Most pages on this site ship just the global CSS (~6KB) and a small navigation chunk (~4KB).
              No React, no Framer Motion, no virtual DOM — unless you're on the homepage, which intentionally
              loads the full scene engine for the interactive experience.
            </p>
            <div className="flex flex-col gap-3">
              {BUNDLE_BARS.map(({ label, size, width, dim }) => (
                <div key={label} className="grid items-center gap-3" style={{ gridTemplateColumns: "14rem 1fr 3.5rem" }}>
                  <span className={`text-sm ${dim ? "text-muted/40" : "text-muted"}`}>{label}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full rounded-full ${dim ? "bg-muted/20" : "bg-yellow"}`} style={{ width }} />
                  </div>
                  <span className={`text-right text-sm font-medium ${dim ? "text-muted/40" : "text-cream"}`}>{size}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Performance */}
          <section id="scene-about-performance" className="border-muted/20 scroll-mt-24 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Load time</p>
            <p className="text-cream mb-4 text-4xl font-bold">&lt; 1s<span className="text-muted text-xl font-light"> First Contentful Paint</span></p>
            <p className="text-muted mb-8 max-w-lg text-base leading-relaxed font-light">
              Every page is a pre-rendered static HTML file. GitHub Pages serves it straight from a CDN
              edge — no server, no database, no API calls on the critical path. Time to First Byte is
              typically under 50ms.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {PERFORMANCE_ITEMS.map(({ label, desc }) => (
                <div key={label} className="border-l-2 border-yellow/40 pl-4">
                  <p className="text-cream mb-1 text-sm font-medium">{label}</p>
                  <p className="text-muted text-sm font-light">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section id="scene-about-languages" className="border-muted/20 scroll-mt-24 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Languages</p>
            <p className="text-cream mb-4 text-4xl font-bold">8<span className="text-muted text-xl font-light"> languages supported</span></p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {LANGUAGES.map(({ code, label, flag }) => (
                <div key={code} className="border-muted/10 flex items-center gap-3 border-b py-3">
                  <span aria-hidden="true">{flag}</span>
                  <div>
                    <p className="text-cream text-sm font-medium">{label}</p>
                    <p className="text-muted text-sm tracking-widest uppercase">{code}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted mt-6 text-sm leading-relaxed font-light">
              Browser language is detected on first visit and redirects automatically. RTL layout is fully supported for Arabic.
            </p>
          </section>

          {/* Accessibility */}
          <section id="scene-about-accessibility" className="border-muted/20 scroll-mt-24 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Accessibility</p>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-yellow text-4xl font-bold">WCAG 2.1 AA</span>
            </div>
            <ul className="text-muted mt-1 flex flex-col gap-2 text-base leading-relaxed font-light">
              <li>↳ ARIA roles, labels, and live regions throughout</li>
              <li>↳ Full keyboard navigation (arrow keys, Enter, Escape)</li>
              <li>↳ Focus management on modal open/close</li>
              <li>↳ Screen reader announcements for scene changes</li>
              <li>↳ Reduced-motion support via <code className="text-cream/70 text-sm">prefers-reduced-motion</code></li>
              <li>↳ Colour contrast meets AA minimums</li>
            </ul>
          </section>

          {/* Stack */}
          <section id="scene-about-stack" className="border-muted/20 scroll-mt-24 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Stack</p>
            <p className="text-cream mb-6 text-4xl font-bold">12<span className="text-muted text-xl font-light"> tools, all pulling weight</span></p>
            <div className="grid grid-cols-1 gap-x-16 gap-y-4 md:grid-cols-2">
              {STACK.map(({ name, role }) => (
                <div key={name} className="border-muted/10 flex items-baseline justify-between gap-4 border-b py-2">
                  <span className="text-cream font-medium">{name}</span>
                  <span className="text-muted text-right text-sm">{role}</span>
                </div>
              ))}
            </div>
          </section>

          {/* AI */}
          <section className="border-muted/20 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">AI</p>
            <div className="flex max-w-xl flex-col gap-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-cream font-medium">Model</span>
                <span className="text-muted text-sm">Claude Sonnet 4 (claude-sonnet-4-6)</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-cream font-medium">Interface</span>
                <span className="text-muted text-sm">Claude Code (CLI)</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-cream font-medium">Tokens used</span>
                <span className="text-muted text-sm">[TBD — tracking in progress]</span>
              </div>
              <p className="text-muted mt-2 text-base leading-relaxed font-light">
                Claude Code operated in an agentic loop across the full build —
                reading files, writing components, resolving TypeScript errors,
                running builds, and fixing whatever broke. I directed every
                meaningful decision: the design, the UX model, the copy, and every
                architectural call.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="border-muted/20 border-b py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Timeline</p>
            <div className="flex flex-col gap-0">
              {TIMELINE.map(({ date, event, note }) => (
                <div key={event} className="border-muted/10 flex gap-6 border-b py-5">
                  <span className="text-muted w-20 shrink-0 pt-1 text-sm tracking-widest uppercase">{date}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-cream font-medium">{event}</span>
                    <span className="text-muted text-base font-light">{note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Source */}
          <section className="py-10">
            <p className="text-muted mb-6 text-sm tracking-widest uppercase">Source</p>
            <a
              href="https://github.com/austinban/portfolio-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-yellow group inline-flex items-center gap-3 transition-colors duration-200"
            >
              <span className="text-xl font-bold">github.com/austinban/portfolio-v2</span>
              <span className="text-muted group-hover:text-yellow transition-colors duration-200">↗</span>
            </a>
            <p className="text-muted mt-4 max-w-lg text-base font-light">
              MIT licensed. If something here is useful, take it. If something is
              broken,{" "}
              <a
                href="mailto:austin@austinban.com"
                className="text-cream hover:text-yellow transition-colors duration-200"
              >
                let me know
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
