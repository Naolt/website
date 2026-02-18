import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function StatsGridCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    title: 'By The Numbers',
    stat1Value: '50+',
    stat1Label: 'Projects Delivered',
    stat2Value: '98%',
    stat2Label: 'Client Satisfaction',
    stat3Value: '2x',
    stat3Label: 'Average ROI',
    stat4Value: '24h',
    stat4Label: 'Response Time',
    ...data,
  }

  const stats = [
    { value: d.stat1Value, label: d.stat1Label },
    { value: d.stat2Value, label: d.stat2Label },
    { value: d.stat3Value, label: d.stat3Label },
    { value: d.stat4Value, label: d.stat4Label },
  ]

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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Subtle corner accents */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 48,
          width: 40,
          height: 40,
          borderTop: `3px solid ${brand.primaryColor}`,
          borderLeft: `3px solid ${brand.primaryColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 48,
          width: 40,
          height: 40,
          borderTop: `3px solid ${brand.primaryColor}`,
          borderRight: `3px solid ${brand.primaryColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
          width: 40,
          height: 40,
          borderBottom: `3px solid ${brand.primaryColor}`,
          borderLeft: `3px solid ${brand.primaryColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          right: 48,
          width: 40,
          height: 40,
          borderBottom: `3px solid ${brand.primaryColor}`,
          borderRight: `3px solid ${brand.primaryColor}`,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.white,
          textTransform: 'uppercase' as const,
          letterSpacing: 6,
          marginBottom: 16,
          textAlign: 'center' as const,
          zIndex: 2,
        }}
      >
        {d.title}
      </div>

      {/* Title underline */}
      <div
        style={{
          width: 80,
          height: 4,
          background: brand.primaryColor,
          marginBottom: 72,
          zIndex: 2,
        }}
      />

      {/* 2x2 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          width: '100%',
          maxWidth: 800,
          zIndex: 2,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center' as const,
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: brand.primaryColor,
                lineHeight: 1,
                marginBottom: 12,
                letterSpacing: -2,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase' as const,
                letterSpacing: 2,
                lineHeight: 1.3,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const statsGrid: TemplateDefinition = {
  id: 'stats-grid',
  name: 'Stats Grid',
  category: 'stats',
  component: StatsGridCard,
  defaults: {
    title: 'By The Numbers',
    stat1Value: '50+',
    stat1Label: 'Projects Delivered',
    stat2Value: '98%',
    stat2Label: 'Client Satisfaction',
    stat3Value: '2x',
    stat3Label: 'Average ROI',
    stat4Value: '24h',
    stat4Label: 'Response Time',
  },
  fields: [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'By The Numbers' },
    { key: 'stat1Value', label: 'Stat 1 Value', type: 'text', placeholder: '50+' },
    { key: 'stat1Label', label: 'Stat 1 Label', type: 'text', placeholder: 'Projects Delivered' },
    { key: 'stat2Value', label: 'Stat 2 Value', type: 'text', placeholder: '98%' },
    { key: 'stat2Label', label: 'Stat 2 Label', type: 'text', placeholder: 'Client Satisfaction' },
    { key: 'stat3Value', label: 'Stat 3 Value', type: 'text', placeholder: '2x' },
    { key: 'stat3Label', label: 'Stat 3 Label', type: 'text', placeholder: 'Average ROI' },
    { key: 'stat4Value', label: 'Stat 4 Value', type: 'text', placeholder: '24h' },
    { key: 'stat4Label', label: 'Stat 4 Label', type: 'text', placeholder: 'Response Time' },
  ],
}
