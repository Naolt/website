import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function StatsProofCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    bigNumber: '15+',
    bigLabel: 'Projects Delivered',
    stat1: '5+',
    stat1Label: 'Countries',
    stat2: '100%',
    stat2Label: 'Satisfaction',
    stat3: '7',
    stat3Label: 'Services',
    ...data,
  }

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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' as const,
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Rings */}
      {[600, 1000, 1400].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            border: '1px solid rgba(191,255,0,0.05)',
            borderRadius: '50%',
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            fontSize: 240,
            fontWeight: 900,
            color: brand.primaryColor,
            lineHeight: 0.9,
            letterSpacing: -12,
            marginBottom: 16,
          }}
        >
          {d.bigNumber}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 72,
            letterSpacing: 2,
          }}
        >
          {d.bigLabel}
        </div>
        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            marginBottom: 72,
          }}
        >
          <div style={{ width: 80, height: 1, background: 'rgba(255,255,255,0.15)' }} />
          <div
            style={{
              width: 12,
              height: 12,
              background: brand.primaryColor,
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ width: 80, height: 1, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        {/* Sub stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 96,
          }}
        >
          {[
            { num: d.stat1, label: d.stat1Label },
            { num: d.stat2, label: d.stat2Label },
            { num: d.stat3, label: d.stat3Label },
          ].map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: COLORS.white,
                  marginBottom: 4,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase' as const,
                  letterSpacing: 3,
                  fontWeight: 400,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 0,
          right: 0,
          textAlign: 'center' as const,
          fontSize: 20,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          zIndex: 2,
        }}
      >
        Aurora Solutions
      </div>
    </div>
  )
}

export const statsProof: TemplateDefinition = {
  id: 'stats-proof',
  name: 'Stats / Social Proof',
  category: 'stats',
  component: StatsProofCard,
  defaults: {
    bigNumber: '15+',
    bigLabel: 'Projects Delivered',
    stat1: '5+',
    stat1Label: 'Countries',
    stat2: '100%',
    stat2Label: 'Satisfaction',
    stat3: '7',
    stat3Label: 'Services',
  },
  fields: [
    { key: 'bigNumber', label: 'Big Number', type: 'text', placeholder: '15+' },
    { key: 'bigLabel', label: 'Big Label', type: 'text', placeholder: 'Projects Delivered' },
    { key: 'stat1', label: 'Stat 1 Number', type: 'text', placeholder: '5+' },
    { key: 'stat1Label', label: 'Stat 1 Label', type: 'text', placeholder: 'Countries' },
    { key: 'stat2', label: 'Stat 2 Number', type: 'text', placeholder: '100%' },
    { key: 'stat2Label', label: 'Stat 2 Label', type: 'text', placeholder: 'Satisfaction' },
    { key: 'stat3', label: 'Stat 3 Number', type: 'text', placeholder: '7' },
    { key: 'stat3Label', label: 'Stat 3 Label', type: 'text', placeholder: 'Services' },
  ],
}
