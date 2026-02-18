import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function CTACleanCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    headline: "Let's Build\nSomething Great.",
    desc: 'Free consultation. No strings attached.',
    buttonText: 'Book a Call',
    ...data,
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: '#fafafa',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' as const,
        padding: 120,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Subtle corner dots */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 72,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 72,
          right: 72,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 72,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          right: 72,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.1)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Headline */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#111111',
            lineHeight: 1.15,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
            marginBottom: 40,
          }}
        >
          {d.headline}
        </div>
        {/* Description */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.6,
            marginBottom: 72,
            maxWidth: 640,
            whiteSpace: 'pre-line',
          }}
        >
          {d.desc}
        </div>
        {/* Button */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: brand.primaryColor,
            color: COLORS.black,
            padding: '36px 80px',
            borderRadius: 60,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 0.4,
          }}
        >
          {d.buttonText}
        </div>
      </div>
    </div>
  )
}

export const ctaClean: TemplateDefinition = {
  id: 'cta-clean',
  name: 'CTA Clean',
  category: 'cta',
  component: CTACleanCard,
  defaults: {
    headline: "Let's Build\nSomething Great.",
    desc: 'Free consultation. No strings attached.',
    buttonText: 'Book a Call',
  },
  fields: [
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: "Let's Build\nSomething Great." },
    { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'Free consultation. No strings attached.' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Book a Call' },
  ],
}
