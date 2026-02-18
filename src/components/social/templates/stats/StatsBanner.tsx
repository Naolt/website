import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function StatsBannerCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    eyebrow: 'Did You Know?',
    statValue: '73%',
    statLabel: 'of users judge credibility by website design',
    contextLine: 'Source: Stanford Web Credibility Research',
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
        fontFamily: brand.fontFamily,
        textAlign: 'center' as const,
      }}
    >
      {/* Background glow behind stat */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${brand.primaryColor}08 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase' as const,
          letterSpacing: 6,
          marginBottom: 48,
          zIndex: 2,
        }}
      >
        {d.eyebrow}
      </div>

      {/* Top accent line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          marginBottom: 56,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 120,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${brand.primaryColor})`,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            background: brand.primaryColor,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            width: 120,
            height: 2,
            background: `linear-gradient(90deg, ${brand.primaryColor}, transparent)`,
          }}
        />
      </div>

      {/* Hero stat value */}
      <div
        style={{
          fontSize: 280,
          fontWeight: 900,
          color: brand.primaryColor,
          lineHeight: 0.85,
          letterSpacing: -14,
          marginBottom: 24,
          zIndex: 2,
        }}
      >
        {d.statValue}
      </div>

      {/* Stat label / description */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.white,
          lineHeight: 1.4,
          maxWidth: 700,
          marginBottom: 56,
          zIndex: 2,
        }}
      >
        {d.statLabel}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          marginBottom: 48,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 120,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${brand.primaryColor})`,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            background: brand.primaryColor,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            width: 120,
            height: 2,
            background: `linear-gradient(90deg, ${brand.primaryColor}, transparent)`,
          }}
        />
      </div>

      {/* Context / source line */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: 2,
          zIndex: 2,
        }}
      >
        {d.contextLine}
      </div>
    </div>
  )
}

export const statsBanner: TemplateDefinition = {
  id: 'stats-banner',
  name: 'Stats Banner',
  category: 'stats',
  component: StatsBannerCard,
  defaults: {
    eyebrow: 'Did You Know?',
    statValue: '73%',
    statLabel: 'of users judge credibility by website design',
    contextLine: 'Source: Stanford Web Credibility Research',
  },
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Did You Know?' },
    { key: 'statValue', label: 'Stat Value', type: 'text', placeholder: '73%' },
    { key: 'statLabel', label: 'Stat Label', type: 'textarea', placeholder: 'of users judge credibility by website design' },
    { key: 'contextLine', label: 'Context Line', type: 'text', placeholder: 'Source: Stanford Web Credibility Research' },
  ],
}
