import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        {
          'text-center': align === 'center',
          'text-left': align === 'left',
        },
        className
      )}
    >
      {subtitle && (
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full",
          "bg-primary/10 backdrop-blur-sm border border-primary/20",
          align === 'center' ? 'mx-auto' : ''
        )}>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {subtitle}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-base md:text-lg text-white/70",
          align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
