'use client'

import { useMemo } from 'react'
import type { AnyTemplate } from './templates/types'
import { isCarousel } from './templates/types'
import { BrandProvider } from './BrandContext'
import type { BrandOverrides } from './templates/types'

const THUMB_SIZE = 80
const SCALE = THUMB_SIZE / 1080

export function TemplateThumbnail({
  template,
  brand,
}: {
  template: AnyTemplate
  brand: BrandOverrides
}) {
  const Component = useMemo(() => {
    if (isCarousel(template)) return template.slides[0].component
    return template.component
  }, [template])

  return (
    <div
      style={{
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        overflow: 'hidden',
        borderRadius: 6,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
          width: 1080,
          height: 1080,
          pointerEvents: 'none',
        }}
      >
        <BrandProvider value={brand}>
          <Component data={template.defaults} />
        </BrandProvider>
      </div>
    </div>
  )
}
