import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function TipsGridCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    badge: '5 Signs',
    title: 'Your Website Is Losing\nYou Customers',
    tips: 'Takes more than 3 seconds to load\nNot optimized for mobile devices\nNo clear call-to-action on homepage\nOutdated design that kills trust\nInvisible on Google search results',
    brandName: 'Aurora Solutions',
    ...data,
  }
  const tipList = d.tips.split('\n').filter(Boolean)

  // Arrange into 2 columns
  const col1 = tipList.filter((_, i) => i % 2 === 0)
  const col2 = tipList.filter((_, i) => i % 2 === 1)

  const renderTip = (tip: string, index: number) => (
    <div
      key={index}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: '2px solid rgba(191,255,0,0.3)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: brand.primaryColor,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.45 }}>
        {tip}
      </div>
    </div>
  )

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
        padding: 80,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              background: brand.primaryColor,
              color: COLORS.black,
              fontSize: 18,
              fontWeight: 700,
              padding: '8px 22px',
              borderRadius: 30,
            }}
          >
            {d.badge}
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.15,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {d.title}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {col1.map((tip, i) => renderTip(tip, i * 2))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {col2.map((tip, i) => renderTip(tip, i * 2 + 1))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
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

export const tipsGrid: TemplateDefinition = {
  id: 'tips-grid',
  name: 'Tips (Grid)',
  category: 'tips',
  component: TipsGridCard,
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
