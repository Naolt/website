import { useBrand } from '../../BrandContext'
import { COLORS } from '../types'

export function SlideFooter({ slideIndex, totalSlides }: { slideIndex: number; totalSlides: number }) {
  const brand = useBrand()
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 80px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        zIndex: 5,
      }}
    >
      <span
        style={{
          fontSize: 20,
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.2)',
          fontWeight: 500,
        }}
      >
        {brand.brandName}
      </span>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: i === slideIndex ? brand.primaryColor : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function CTASlide({ data, slideIndex, totalSlides }: { data: Record<string, string>; slideIndex: number; totalSlides: number }) {
  const brand = useBrand()
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
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 560,
          height: 560,
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '50%',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: 'rgba(0,0,0,0.4)',
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          {data.ctaEyebrow || 'Free Consultation'}
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
          {data.ctaHeadline || "We Fix All Five.\nLet's Talk."}
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 1.5,
            marginBottom: 64,
            fontWeight: 400,
            maxWidth: 680,
          }}
        >
          {data.ctaDesc || '30 minutes. No commitment.'}
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
          }}
        >
          {data.ctaButton || 'Book a Call'} <span style={{ fontSize: 36 }}>&rarr;</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 112,
          fontSize: 20,
          color: 'rgba(0,0,0,0.25)',
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          fontWeight: 500,
          zIndex: 2,
        }}
      >
        {brand.brandName}
      </div>
    </div>
  )
}
