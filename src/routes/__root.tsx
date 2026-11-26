import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '../styles.css?url'
import { profile } from '@/data/profile'
import { ViewProvider } from '@/lib/view'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

const description =
  'Gopal Krishna, MSc Data Science student at the University of Basel. Machine learning, data pipelines and the software around them.'

// Applies the saved view before first paint so the page never flashes.
const earlyViewScript = "try{if(localStorage.getItem('gk-view')==='immersive'){document.documentElement.dataset.view='immersive'}}catch(e){}"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Gopal Krishna' },
      { name: 'description', content: description },
      { name: 'theme-color', content: '#fbfbf8' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Gopal Krishna' },
      { property: 'og:title', content: 'Gopal Krishna' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${profile.siteUrl}/og.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Gopal Krishna' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${profile.siteUrl}/og.png` },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      {
        rel: 'preload',
        href: '/fonts/bricolage-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [{ children: earlyViewScript }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <ViewProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-xs"
      >
        Skip to content
      </a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </ViewProvider>
  )
}
