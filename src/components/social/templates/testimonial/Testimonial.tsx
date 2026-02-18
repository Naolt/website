import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function TestimonialCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    quote: 'Aurora delivered our platform ahead of schedule. The quality matched agencies charging',
    highlightPhrase: '3x the price',
    clientName: 'Sarah Johnson',
    clientRole: 'CEO, TechVenture Inc.',
    initials: 'SJ',
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
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 8,
          background: `linear-gradient(to bottom, ${brand.primaryColor}, rgba(191,255,0,0.1))`,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingLeft: 16,
        }}
      >
        {/* Quote mark */}
        <div
          style={{
            fontSize: 128,
            color: brand.primaryColor,
            lineHeight: 0.7,
            fontWeight: 900,
            marginBottom: 56,
            opacity: 0.8,
          }}
        >
          &ldquo;
        </div>
        {/* Quote */}
        <div
          style={{
            fontSize: 42,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.55,
            fontWeight: 400,
            flexGrow: 1,
            letterSpacing: -0.4,
          }}
        >
          {d.quote}{' '}
          <strong style={{ color: brand.primaryColor, fontWeight: 600 }}>
            {d.highlightPhrase}
          </strong>
          .
        </div>
        {/* Attribution */}
        <div
          style={{
            paddingTop: 56,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              background: `linear-gradient(135deg, ${brand.primaryColor}, rgba(191,255,0,0.4))`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.black,
              flexShrink: 0,
            }}
          >
            {d.initials}
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 600, color: COLORS.white, marginBottom: 4 }}>
              {d.clientName}
            </div>
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
              {d.clientRole}
            </div>
          </div>
          {/* Stars */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  background: brand.primaryColor,
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const testimonial: TemplateDefinition = {
  id: 'testimonial',
  name: 'Client Testimonial',
  category: 'testimonial',
  component: TestimonialCard,
  defaults: {
    quote: 'Aurora delivered our platform ahead of schedule. The quality matched agencies charging',
    highlightPhrase: '3x the price',
    clientName: 'Sarah Johnson',
    clientRole: 'CEO, TechVenture Inc.',
    initials: 'SJ',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Aurora delivered...' },
    { key: 'highlightPhrase', label: 'Highlight Phrase', type: 'text', placeholder: '3x the price' },
    { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'Sarah Johnson' },
    { key: 'clientRole', label: 'Client Role', type: 'text', placeholder: 'CEO, TechVenture Inc.' },
    { key: 'initials', label: 'Initials', type: 'text', placeholder: 'SJ' },
  ],
}
