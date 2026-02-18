import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function BrandSplitCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    leftNumber: '01',
    headline: 'We Don\'t Just\nBuild Websites',
    desc: 'We build growth engines for businesses ready to scale.',
    brandLine: 'Aurora Solutions',
    ...data,
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Left half — primary color */}
      <div
        style={{
          width: 540,
          height: 1080,
          background: brand.primaryColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle radial highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
        />
        {/* Large number / icon */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: 220,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1,
            letterSpacing: -6,
          }}
        >
          {d.leftNumber}
        </div>
      </div>
      {/* Right half — black */}
      <div
        style={{
          width: 540,
          height: 1080,
          background: COLORS.black,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 72px',
          position: 'relative',
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.15,
            color: COLORS.white,
            letterSpacing: -1,
            whiteSpace: 'pre-line',
          }}
        >
          {d.headline}
        </div>
        {/* Accent bar */}
        <div
          style={{
            width: 56,
            height: 5,
            background: brand.primaryColor,
            borderRadius: 3,
            marginTop: 40,
            marginBottom: 40,
          }}
        />
        {/* Description */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
            whiteSpace: 'pre-line',
          }}
        >
          {d.desc}
        </div>
        {/* Brand line at bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 72,
            right: 72,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: brand.primaryColor,
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: 18,
              letterSpacing: 5,
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 500,
            }}
          >
            {d.brandLine}
          </span>
        </div>
      </div>
    </div>
  )
}

export const brandSplit: TemplateDefinition = {
  id: 'brand-split',
  name: 'Brand Split',
  category: 'brand',
  component: BrandSplitCard,
  defaults: {
    leftNumber: '01',
    headline: 'We Don\'t Just\nBuild Websites',
    desc: 'We build growth engines for businesses ready to scale.',
    brandLine: 'Aurora Solutions',
  },
  fields: [
    { key: 'leftNumber', label: 'Left Number', type: 'text', placeholder: '01' },
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'We Don\'t Just\nBuild Websites' },
    { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'We build growth engines...' },
    { key: 'brandLine', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
  ],
}
