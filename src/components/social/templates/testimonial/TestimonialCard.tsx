import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function TestimonialCardComponent({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    quote:
      'Working with Aurora was seamless. They understood our vision from day one and delivered beyond expectations.',
    author: 'Lisa Park',
    role: 'CEO, Horizon Labs',
    badge: 'Client Story',
    ...data,
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: brand.fontFamily,
        padding: 80,
      }}
    >
      {/* Subtle background dots pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Floating card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 840,
          background: COLORS.white,
          borderRadius: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Primary color accent stripe on left edge */}
        <div
          style={{
            width: 8,
            flexShrink: 0,
            background: brand.primaryColor,
          }}
        />

        {/* Card content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '72px 72px 64px 64px',
          }}
        >
          {/* Badge */}
          {d.badge && (
            <div
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                padding: '8px 20px',
                background: `${brand.primaryColor}18`,
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 600,
                color: brand.primaryColor,
                letterSpacing: 1.5,
                textTransform: 'uppercase' as const,
                marginBottom: 40,
                border: `1px solid ${brand.primaryColor}30`,
              }}
            >
              {d.badge}
            </div>
          )}

          {/* Quote mark */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: brand.primaryColor,
              lineHeight: 0.8,
              marginBottom: 24,
              opacity: 0.35,
            }}
          >
            &ldquo;
          </div>

          {/* Quote text */}
          <div
            style={{
              fontSize: 38,
              color: '#1A1A1A',
              lineHeight: 1.55,
              fontWeight: 400,
              letterSpacing: -0.3,
              flexGrow: 1,
              marginBottom: 48,
            }}
          >
            {d.quote}
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(0,0,0,0.08)',
              marginBottom: 32,
            }}
          />

          {/* Author info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Author avatar circle */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.primaryColor}88)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.black,
                flexShrink: 0,
              }}
            >
              {d.author
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#1A1A1A',
                  marginBottom: 4,
                }}
              >
                {d.author}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: 'rgba(0,0,0,0.45)',
                }}
              >
                {d.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand watermark in bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 40,
          fontSize: 14,
          color: 'rgba(255,255,255,0.15)',
          letterSpacing: 3,
          textTransform: 'uppercase' as const,
          fontFamily: brand.fontFamily,
        }}
      >
        {brand.brandName}
      </div>
    </div>
  )
}

export const testimonialCard: TemplateDefinition = {
  id: 'testimonial-card',
  name: 'Testimonial Card',
  category: 'testimonial',
  component: TestimonialCardComponent,
  defaults: {
    quote:
      'Working with Aurora was seamless. They understood our vision from day one and delivered beyond expectations.',
    author: 'Lisa Park',
    role: 'CEO, Horizon Labs',
    badge: 'Client Story',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Client testimonial text...' },
    { key: 'author', label: 'Author', type: 'text', placeholder: 'Lisa Park' },
    { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, Horizon Labs' },
    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Client Story' },
  ],
}
