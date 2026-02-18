import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function TipsNumberedCard({ data }: { data: Record<string, string> }) {
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
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Diagonal bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(191,255,0,0.02) 60px, rgba(191,255,0,0.02) 62px)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div />
          <div
            style={{
              background: brand.primaryColor,
              color: COLORS.black,
              fontSize: 22,
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: 40,
            }}
          >
            {d.badge}
          </div>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.2,
            marginBottom: 56,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {d.title}
        </div>
        {/* Tips */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {tipList.map((tip, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 36,
                padding: '28px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                style={{
                  width: 64,
                  height: 64,
                  border: '3px solid rgba(191,255,0,0.25)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  color: brand.primaryColor,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.65)', fontWeight: 400, lineHeight: 1.4 }}>
                {tip}
              </span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', letterSpacing: 4, textTransform: 'uppercase' as const }}>
            {d.brandName}
          </span>
          <span style={{ fontSize: 22, color: brand.primaryColor, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12 }}>
            Save this <span style={{ fontSize: 32 }}>&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export const tipsNumbered: TemplateDefinition = {
  id: 'tips-numbered',
  name: 'Tips (Numbered)',
  category: 'tips',
  component: TipsNumberedCard,
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
