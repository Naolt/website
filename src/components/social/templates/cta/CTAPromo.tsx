import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function CTAPromoCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    eyebrow: 'Free Consultation',
    headline: "Let's Build\nSomething\nGreat.",
    description: '30 minutes. No commitment. Tell us what you need and we\'ll map out the next steps.',
    buttonText: 'Book a Call',
    brandName: 'Aurora Solutions',
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
        justifyContent: 'center',
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Geo circles */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 560,
          height: 560,
          background: 'rgba(0,0,0,0.06)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 700,
          height: 700,
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '50%',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: 'rgba(0,0,0,0.45)',
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          {d.eyebrow}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: COLORS.black,
            lineHeight: 1.05,
            marginBottom: 32,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
          }}
        >
          {d.headline}
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(0,0,0,0.55)',
            lineHeight: 1.6,
            marginBottom: 72,
            fontWeight: 400,
            maxWidth: 680,
          }}
        >
          {d.description}
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 24,
            background: COLORS.black,
            color: brand.primaryColor,
            padding: '32px 64px',
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 0.6,
          }}
        >
          {d.buttonText} <span style={{ fontSize: 36 }}>&rarr;</span>
        </div>
      </div>
      {/* Brand footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 112,
          fontSize: 20,
          color: 'rgba(0,0,0,0.3)',
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          fontWeight: 500,
          zIndex: 2,
        }}
      >
        {d.brandName}
      </div>
    </div>
  )
}

export const ctaPromo: TemplateDefinition = {
  id: 'cta-promo',
  name: 'CTA / Promo',
  category: 'cta',
  component: CTAPromoCard,
  defaults: {
    eyebrow: 'Free Consultation',
    headline: "Let's Build\nSomething\nGreat.",
    description: '30 minutes. No commitment. Tell us what you need and we\'ll map out the next steps.',
    buttonText: 'Book a Call',
    brandName: 'Aurora Solutions',
  },
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Free Consultation' },
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: "Let's Build\nSomething\nGreat." },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: '30 minutes. No commitment...' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Book a Call' },
    { key: 'brandName', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
  ],
}
