import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    defaultNotFoundComponent: NotFound,
  })
  return router
}

function NotFound() {
  return (
    <main className="bg-paper px-gutter py-32 max-w-[1440px] mx-auto">
      <h1 className="headline text-3xl">This page does not exist.</h1>
      <p className="mt-6 text-md max-w-[40ch]">
        The address may be old. Everything on this site is reachable from the{' '}
        <a href="/" className="link">
          front page
        </a>
        .
      </p>
    </main>
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
