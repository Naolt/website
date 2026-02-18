import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function ServiceBoldSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    serviceName: 'Web\nDevelopment',
    subtitle: 'Built for speed, designed to convert.',
    feature1: 'Lightning-fast load times',
    feature2: 'SEO-optimized from day one',
    feature3: 'Responsive on every device',
    ...data,
  }

  const features = [d.feature1, d.feature2, d.feature3]

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
      {/* Decorative corner element */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 320,
          height: 320,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          borderLeft: '1px solid rgba(0,0,0,0.08)',
        }}
      />

      {/* Service name */}
      <div
        style={{
          fontSize: 108,
          fontWeight: 800,
          lineHeight: 1.0,
          color: COLORS.black,
          letterSpacing: -3,
          whiteSpace: 'pre-line',
          marginBottom: 40,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {d.serviceName}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 400,
          color: 'rgba(0,0,0,0.6)',
          lineHeight: 1.4,
          marginBottom: 64,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {d.subtitle}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 80,
          height: 4,
          background: COLORS.black,
          marginBottom: 48,
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Features list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                background: COLORS.black,
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: COLORS.black,
                lineHeight: 1.3,
              }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const serviceBold: TemplateDefinition = {
  id: 'service-bold',
  name: 'Service Bold',
  category: 'service',
  component: ServiceBoldSlide,
  defaults: {
    serviceName: 'Web\nDevelopment',
    subtitle: 'Built for speed, designed to convert.',
    feature1: 'Lightning-fast load times',
    feature2: 'SEO-optimized from day one',
    feature3: 'Responsive on every device',
  },
  fields: [
    { key: 'serviceName', label: 'Service Name', type: 'textarea', placeholder: 'Web\nDevelopment' },
    { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Built for speed, designed to convert.' },
    { key: 'feature1', label: 'Feature 1', type: 'text', placeholder: 'Lightning-fast load times' },
    { key: 'feature2', label: 'Feature 2', type: 'text', placeholder: 'SEO-optimized from day one' },
    { key: 'feature3', label: 'Feature 3', type: 'text', placeholder: 'Responsive on every device' },
  ],
}
