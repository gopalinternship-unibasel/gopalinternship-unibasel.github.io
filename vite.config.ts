import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

import { projects } from './src/data/projects'

// Every page is static content, so the whole site is prerendered at build time.
// The output works on Vercel (zero config), Netlify, or any static host.
// Pages are listed explicitly (static routes are discovered, project pages
// come from the data file) so the sitemap holds real pages only, not the
// in-page anchors or the CV link that a crawl would pick up.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    nitro(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: true },
      pages: projects.map((p) => ({ path: `/projects/${p.slug}` })),
      // The published address (also in src/data/profile.ts and public/robots.txt).
      sitemap: { host: 'https://gopalinternship-unibasel.github.io' },
    }),
    viteReact(),
  ],
})
