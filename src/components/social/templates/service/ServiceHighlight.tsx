import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function ServiceHighlightCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    tag: 'Our Services',
    title: 'Web Development\nThat Converts',
    features: 'React & Next.js applications\nE-commerce platforms\nSEO-optimized, mobile-first\nFast, secure, and scalable',
    brandName: 'Aurora Solutions',
    url: 'aurorasolve.com',
    ...data,
  }
  const featureList = d.features.split('\n').filter(Boolean)

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
      {/* Corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 360,
          height: 360,
          borderBottom: '1px solid rgba(191,255,0,0.15)',
          borderLeft: '1px solid rgba(191,255,0,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 360,
          height: 360,
          background:
            'radial-gradient(circle at 100% 0%, rgba(191,255,0,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Icon */}
      <div
        style={{
          width: 96,
          height: 96,
          border: '3px solid rgba(191,255,0,0.3)',
          borderRadius: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 56,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: brand.primaryColor,
            borderRadius: 8,
          }}
        />
      </div>
      {/* Tag */}
      <div
        style={{
          fontSize: 20,
          letterSpacing: 6,
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 500,
          marginBottom: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {d.tag}
      </div>
      {/* Title */}
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
          color: COLORS.white,
          marginBottom: 64,
          letterSpacing: -1,
          position: 'relative',
          zIndex: 1,
          whiteSpace: 'pre-line',
        }}
      >
        {d.title}
      </div>
      {/* Features */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {featureList.map((feature, i) => (
          <div
            key={i}
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.55)',
              padding: '20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              fontWeight: 300,
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                border: '3px solid rgba(191,255,0,0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  background: brand.primaryColor,
                  borderRadius: '50%',
                }}
              />
            </span>
            {feature}
          </div>
        ))}
      </div>
      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          paddingTop: 48,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
            fontWeight: 500,
          }}
        >
          {d.brandName}
        </span>
        <span style={{ fontSize: 22, color: brand.primaryColor, fontWeight: 500 }}>
          {d.url}
        </span>
      </div>
    </div>
  )
}

export const serviceHighlight: TemplateDefinition = {
  id: 'service-highlight',
  name: 'Service Highlight',
  category: 'service',
  component: ServiceHighlightCard,
  defaults: {
    tag: 'Our Services',
    title: 'Web Development\nThat Converts',
    features: 'React & Next.js applications\nE-commerce platforms\nSEO-optimized, mobile-first\nFast, secure, and scalable',
    brandName: 'Aurora Solutions',
    url: 'aurorasolve.com',
  },
  fields: [
    { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Our Services' },
    { key: 'title', label: 'Title', type: 'textarea', placeholder: 'Web Development\nThat Converts' },
    { key: 'features', label: 'Features (one per line)', type: 'textarea', placeholder: 'React & Next.js...' },
    { key: 'brandName', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
    { key: 'url', label: 'URL', type: 'text', placeholder: 'aurorasolve.com' },
  ],
}
