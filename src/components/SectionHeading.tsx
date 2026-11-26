/**
 * Every section opens the same way: a heavy heading on the left and a
 * one-line lede on the right, over a single rule. The rule marks the start
 * of a section; nothing else on the site uses one for decoration.
 */
export function SectionHeading({
  id,
  title,
  lede,
  as: Tag = 'h2',
}: {
  id: string
  title: string
  lede?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-ink pt-5">
      <Tag id={id} className="headline text-3xl col-span-12 md:col-span-6">
        {title}
      </Tag>
      {lede && (
        <p className="col-span-12 md:col-span-5 md:col-start-8 text-base md:text-md text-muted max-w-[42ch] md:pt-2">
          {lede}
        </p>
      )}
    </div>
  )
}
