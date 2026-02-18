import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function TestimonialDarkCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    quote:
      'The team at Aurora transformed our online presence completely. Our conversions doubled within the first month.',
    author: 'Michael Chen',
    role: 'Founder, DataFlow',
    stars: '5',
    ...data,
  }

  const starCount = Math.max(0, Math.min(5, parseInt(d.stars, 10) || 0))

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
        fontFamily: brand.fontFamily,
        padding: 120,
      }}
    >
      {/* Concentric circle rings */}
      {[340, 480, 620, 760].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(255,255,255,${0.06 - i * 0.01})`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Large quotation mark watermark */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 360,
          fontWeight: 900,
          color: brand.primaryColor,
          opacity: 0.06,
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center' as const,
          maxWidth: 800,
        }}
      >
        {/* Small quote mark */}
        <div
          style={{
            fontSize: 80,
            color: brand.primaryColor,
            lineHeight: 0.8,
            fontWeight: 900,
            marginBottom: 40,
          }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize: 44,
            color: COLORS.white,
            lineHeight: 1.5,
            fontWeight: 400,
            letterSpacing: -0.3,
            marginBottom: 56,
          }}
        >
          {d.quote}
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          {[...Array(starCount)].map((_, i) => (
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

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: brand.primaryColor,
            opacity: 0.5,
            marginBottom: 36,
          }}
        />

        {/* Author */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.white,
            marginBottom: 8,
          }}
        >
          {d.author}
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1,
            textTransform: 'uppercase' as const,
          }}
        >
          {d.role}
        </div>
      </div>
    </div>
  )
}

export const testimonialDark: TemplateDefinition = {
  id: 'testimonial-dark',
  name: 'Testimonial Dark',
  category: 'testimonial',
  component: TestimonialDarkCard,
  defaults: {
    quote:
      'The team at Aurora transformed our online presence completely. Our conversions doubled within the first month.',
    author: 'Michael Chen',
    role: 'Founder, DataFlow',
    stars: '5',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Client testimonial text...' },
    { key: 'author', label: 'Author', type: 'text', placeholder: 'Michael Chen' },
    { key: 'role', label: 'Role', type: 'text', placeholder: 'Founder, DataFlow' },
    { key: 'stars', label: 'Stars', type: 'text', placeholder: '1-5' },
  ],
}
