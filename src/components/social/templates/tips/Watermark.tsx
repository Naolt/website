import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function TipsWatermarkCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    badge: '5 Signs',
    title: 'Your Website Is Losing\nYou Customers',
    tips: 'Takes more than 3 seconds to load\nNot optimized for mobile devices\nNo clear call-to-action on homepage\nOutdated design that kills trust\nInvisible on Google search results',
    brandName: 'Aurora Solutions',
    ...data,
  }
  const tipList = d.tips.split('\n').filter(Boolean)

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: COLORS.black,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Left stripe accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 6,
          background: `linear-gradient(to bottom, ${brand.primaryColor}, rgba(191,255,0,0.05))`,
        }}
      />

      {/* Title area */}
      <div style={{ padding: '72px 80px 40px 80px' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(191,255,0,0.1)',
            color: brand.primaryColor,
            fontSize: 18,
            fontWeight: 600,
            padding: '8px 22px',
            borderRadius: 8,
            marginBottom: 20,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
          }}
        >
          {d.badge}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.1,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {d.title}
        </div>
      </div>

      {/* Tips stacked */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 80px' }}>
        {tipList.map((tip, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            {/* Watermark number */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                fontSize: 120,
                fontWeight: 900,
                color: 'rgba(191,255,0,0.06)',
                lineHeight: 1,
                userSelect: 'none' as const,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            {/* Text */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                paddingLeft: 120,
                fontSize: 28,
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {tip}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '24px 80px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.2)', letterSpacing: 4, textTransform: 'uppercase' as const }}>
          {d.brandName}
        </span>
        <span style={{ fontSize: 20, color: brand.primaryColor, fontWeight: 500 }}>
          aurorasolve.com
        </span>
      </div>
    </div>
  )
}

export const tipsWatermark: TemplateDefinition = {
  id: 'tips-watermark',
  name: 'Tips (Watermark)',
  category: 'tips',
  component: TipsWatermarkCard,
  defaults: {
    badge: '5 Signs',
    title: 'Your Website Is Losing\nYou Customers',
    tips: 'Takes more than 3 seconds to load\nNot optimized for mobile devices\nNo clear call-to-action on homepage\nOutdated design that kills trust\nInvisible on Google search results',
    brandName: 'Aurora Solutions',
  },
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', placeholder: '5 Signs' },
    { key: 'title', label: 'Title', type: 'textarea', placeholder: 'Your Website Is Losing...' },
    { key: 'tips', label: 'Tips (one per line)', type: 'textarea', placeholder: 'Takes more than 3 seconds...' },
    { key: 'brandName', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
  ],
}
