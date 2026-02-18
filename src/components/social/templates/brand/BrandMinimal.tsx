import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function BrandMinimalCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    tagline: 'We Build Digital Experiences',
    subtext: 'Web • Mobile • Brand',
    brandLine: brand.brandName || 'Aurora Solutions',
    ...data,
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: brand.primaryColor,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Subtle grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Main tagline */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.05,
          color: COLORS.white,
          textAlign: 'center',
          letterSpacing: -3,
          padding: '0 100px',
          whiteSpace: 'pre-line',
        }}
      >
        {d.tagline}
      </div>
      {/* Subtext */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 28,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          marginTop: 40,
          letterSpacing: 6,
          textTransform: 'uppercase' as const,
        }}
      >
        {d.subtext}
      </div>
      {/* Divider */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 64,
          height: 4,
          background: COLORS.white,
          borderRadius: 2,
          marginTop: 48,
        }}
      />
      {/* Brand name at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 22,
          letterSpacing: 8,
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 600,
          zIndex: 1,
        }}
      >
        {d.brandLine}
      </div>
    </div>
  )
}

export const brandMinimal: TemplateDefinition = {
  id: 'brand-minimal',
  name: 'Brand Minimal',
  category: 'brand',
  component: BrandMinimalCard,
  defaults: {
    tagline: 'We Build Digital Experiences',
    subtext: 'Web • Mobile • Brand',
    brandLine: 'Aurora Solutions',
  },
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'textarea', placeholder: 'We Build Digital Experiences' },
    { key: 'subtext', label: 'Subtext', type: 'text', placeholder: 'Web • Mobile • Brand' },
    { key: 'brandLine', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
  ],
}
