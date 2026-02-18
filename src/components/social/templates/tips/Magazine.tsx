import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function TipsMagazineCard({ data }: { data: Record<string, string> }) {
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
      {/* Top header band */}
      <div
        style={{
          background: brand.primaryColor,
          padding: '40px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.black, lineHeight: 1.15, whiteSpace: 'pre-line', maxWidth: 700 }}>
          {d.title}
        </div>
        <div
          style={{
            background: COLORS.black,
            color: brand.primaryColor,
            fontSize: 20,
            fontWeight: 700,
            padding: '10px 24px',
            borderRadius: 30,
            flexShrink: 0,
          }}
        >
          {d.badge}
        </div>
      </div>

      {/* Tips rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {tipList.map((tip, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px',
              borderBottom: i < tipList.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              gap: 48,
            }}
          >
            {/* Big number */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: brand.primaryColor,
                opacity: 0.25,
                width: 100,
                flexShrink: 0,
                textAlign: 'right' as const,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            {/* Divider line */}
            <div style={{ width: 2, height: 40, background: 'rgba(191,255,0,0.2)', flexShrink: 0 }} />
            {/* Text */}
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.4 }}>
              {tip}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '28px 80px',
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
          Save this &rarr;
        </span>
      </div>
    </div>
  )
}

export const tipsMagazine: TemplateDefinition = {
  id: 'tips-magazine',
  name: 'Tips (Magazine)',
  category: 'tips',
  component: TipsMagazineCard,
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
