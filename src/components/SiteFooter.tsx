import { profile } from '@/data/profile'

export function SiteFooter() {
  return (
    <footer className="site-footer bg-ink text-muted-on-ink">
      <div className="mx-auto max-w-[1440px] px-gutter py-6 border-t border-white/15 flex flex-wrap justify-between gap-x-8 gap-y-2 text-sm">
        <p>
          {profile.name}, {profile.location.split(',')[0]}. Updated {profile.lastUpdated}.
        </p>
        <p>
          Built with TanStack Start. No cookies, no tracking.{' '}
          <a href="#main" className="link">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
