# Gopal Krishna, portfolio

Personal site built with TanStack Start (React 19, TypeScript), TanStack
Router, Tailwind CSS 4 and Motion. Every page is prerendered to static HTML at
build time, so it can be hosted anywhere; Vercel needs no configuration.

## Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:3200>. Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | production build, prerenders every page into `.output/public` |
| `npm run start` | serves the production build with Node |
| `npm run typecheck` | TypeScript check |
| `npm run og` | regenerates `public/og.png` (needs Python 3 with Pillow) |

## Two views

The header has an "Immersive view" switch (also offered in the hero and the
phone menu). The choice is remembered in the browser.

- **Plain**: the editorial version. Quiet, fast, paper and ink.
- **Immersive**: the same content with colour-blocked sections (black,
  ultramarine, paper), a live field of drifting points behind the name that
  reacts to the pointer, a greeting with the current time in Basel, project
  spreads that take the whole screen and stack as you scroll, and a
  "what are you hiring for?" selector. Picking a focus puts the matching
  projects first, pre-highlights the skills map and tailors the contact line.

Both views share one set of components; the immersive look is the token
variables swapped per section in `src/styles.css`. The logic lives in
`src/lib/view.tsx`, the focus options in `src/data/roles.ts`, and each project
declares its `roles` in `projects.ts`.

## Change the content

All content lives in `src/data`. No component needs editing to update it.

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | name, links, hero statement and intro, About paragraphs, the fact sheet, what you are open to, the site URL |
| `src/data/projects.ts` | the projects: titles, taglines, descriptions, "how it is built" bullets, stack, repository link, screenshots, which sketch to show |
| `src/data/skills.ts` | the skills map: clusters, the position of each skill, and which project or job used which skills |
| `src/data/timeline.ts` | education, work, hackathons, volunteering, certificates |

Notes on the content fields:

- `siteUrl` in `profile.ts`, the `sitemap.host` in `vite.config.ts` and the
  sitemap line in `public/robots.txt` hold the published address; change all
  three together if the site moves to another domain.
- `repo` on a project links its code. Without `repo` (and without `repoNote`,
  a short note for deliberately unpublished code) the project page shows no
  Code block. `repoLabel` changes the link text, for example for a team's
  repository.
- `cvPath` in `profile.ts` is `null`, so the contact block shows no CV link. Put
  a PDF in `public/` and set the path to show one.
- Screenshots go in `public/projects/` and are listed per project in
  `projects.ts` with alt text and a caption. The AI research assistant has two.
  Give `width` and `height` for files that are not 1600 × 875, and
  `pixelated: true` for small generated images that should stay sharp.
- Group projects can state `myPart`, shown as "My part" on the project page.

### Adding a project

Add an entry to `projects.ts`. The index, the hover preview, the project page
and the skills map pick it up. For the sketch, either reuse one of the
`DiagramId`s or draw a new one in `src/components/diagrams.tsx` (600 × 380
canvas, use the `.box`, `.box-ink`, `.box-accent`, `.line`, `.lbl` classes) and
add its id to the `DiagramId` union.

### Adding a skill

Add it to a cluster in `skills.ts` with an `x, y` inside that cluster's `box`
where no other label sits, then list its id under the contexts that used it.

## Deploy

**GitHub Pages (how it is published).** Every push to `main` runs
`.github/workflows/pages.yml`: install, build, typecheck, then publish
`.output/public` to <https://gopalinternship-unibasel.github.io/>. The
repository's Pages source is set to "GitHub Actions".

**Vercel.** Import the repository; the framework is detected as Vite. Build
command `npm run build`, output directory `.output/public`. Alternatively
leave the output directory empty: Nitro detects Vercel and produces a serverless
build that serves the same prerendered pages.

**Static hosts (Netlify, Cloudflare Pages, GitHub Pages).** Upload
`.output/public` after `npm run build`. Every route has its own `index.html`.

## Structure

```
src/
  routes/            __root (shell, metadata), index (front page),
                     projects.index, projects.$slug
  components/        one file per section, plus diagrams.tsx and the header
  data/              all editable content
  styles.css         tokens (@theme), type settings, interactions, motion
public/
  fonts/             Bricolage Grotesque, variable, latin and latin-ext
  projects/          screenshots
  og.png favicon.svg robots.txt
scripts/make-og.py   renders the social image in the site's own type
DESIGN.md            the design system in words
```

## Accessibility and performance

Semantic landmarks, a skip link, visible focus rings, keyboard-operable menu
and skill filters, the skills map mirrored as a text list, `prefers-reduced-motion`
respected, fonts self-hosted and preloaded, no third-party requests, no
tracking. Lighthouse should sit near 100 on every category.
