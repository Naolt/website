import type { CarouselDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'
import { SlideFooter, CTASlide } from './shared'

function QuoteSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' as const, padding: 120, fontFamily: brand.fontFamily }}>
      {[500, 900].map((size, i) => (
        <div key={i} style={{ position: 'absolute', width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,255,0,0.04)', borderRadius: '50%' }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 160, color: brand.primaryColor, lineHeight: 0.6, fontWeight: 900, marginBottom: 56, opacity: 0.7 }}>&ldquo;</div>
        <div style={{ fontSize: 52, fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, letterSpacing: -0.5 }}>
          {data.quote || 'Aurora delivered our platform ahead of schedule. The quality matched agencies charging'}{' '}
          <strong style={{ fontWeight: 700, color: brand.primaryColor }}>{data.highlightPhrase || '3x the price'}</strong>.
        </div>
      </div>
      <SlideFooter slideIndex={0} totalSlides={4} />
    </div>
  )
}

function DetailSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const details = [
    { key: 'Service', val: data.service || 'Full-Stack Web Application' },
    { key: 'Timeline', val: data.timeline || '8 weeks (delivered in 6)' },
    { key: 'Tech Stack', val: data.techStack || 'Next.js, PostgreSQL, Vercel' },
    { key: 'Result', val: data.result || '40% increase in conversions', highlight: true },
  ]
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 8, background: `linear-gradient(to bottom, ${brand.primaryColor}, rgba(191,255,0,0.05))` }} />
      <div style={{ position: 'relative', zIndex: 2, paddingLeft: 24 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' as const, color: brand.primaryColor, fontWeight: 600, marginBottom: 64 }}>
          Project Details
        </div>
        {details.map((d, i) => (
          <div key={i} style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: 3, marginBottom: 10 }}>
              {d.key}
            </div>
            <div style={{ fontSize: 36, color: d.highlight ? brand.primaryColor : 'rgba(255,255,255,0.8)', fontWeight: d.highlight ? 700 : 500 }}>
              {d.val}
            </div>
          </div>
        ))}
      </div>
      <SlideFooter slideIndex={1} totalSlides={4} />
    </div>
  )
}

function ClientSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' as const, padding: 120, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', top: 80, left: 80, width: 120, height: 120, borderTop: '3px solid rgba(191,255,0,0.25)', borderLeft: '3px solid rgba(191,255,0,0.25)' }} />
      <div style={{ position: 'absolute', bottom: 80, right: 80, width: 120, height: 120, borderBottom: '3px solid rgba(191,255,0,0.25)', borderRight: '3px solid rgba(191,255,0,0.25)' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ width: 160, height: 160, background: `linear-gradient(135deg, ${brand.primaryColor}, rgba(191,255,0,0.3))`, borderRadius: '50%', margin: '0 auto 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 700, color: COLORS.black }}>
          {data.initials || 'SJ'}
        </div>
        <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>
          {data.clientName || 'Sarah Johnson'}
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.35)', marginBottom: 40 }}>
          {data.clientRole || 'CEO, TechVenture Inc.'}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 36, height: 36, background: brand.primaryColor, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
          ))}
        </div>
      </div>
      <SlideFooter slideIndex={2} totalSlides={4} />
    </div>
  )
}

function TestCTA({ data }: { data: Record<string, string> }) { return <CTASlide data={data} slideIndex={3} totalSlides={4} /> }

export const testimonialCarousel: CarouselDefinition = {
  id: 'carousel-testimonial',
  name: 'Testimonial Carousel (4 slides)',
  category: 'carousel',
  type: 'carousel',
  slides: [
    { id: 'quote', name: 'Quote', component: QuoteSlide },
    { id: 'details', name: 'Details', component: DetailSlide },
    { id: 'client', name: 'Client', component: ClientSlide },
    { id: 'cta', name: 'CTA', component: TestCTA },
  ],
  defaults: {
    quote: 'Aurora delivered our platform ahead of schedule. The quality matched agencies charging',
    highlightPhrase: '3x the price',
    service: 'Full-Stack Web Application',
    timeline: '8 weeks (delivered in 6)',
    techStack: 'Next.js, PostgreSQL, Vercel',
    result: '40% increase in conversions',
    clientName: 'Sarah Johnson',
    clientRole: 'CEO, TechVenture Inc.',
    initials: 'SJ',
    ctaEyebrow: 'Your Turn',
    ctaHeadline: "Let's Build\nYour Success\nStory.",
    ctaDesc: "Book a free consultation and let's talk about what we can build together.",
    ctaButton: 'Book a Call',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'highlightPhrase', label: 'Highlight Phrase', type: 'text', placeholder: '3x the price' },
    { key: 'service', label: 'Service', type: 'text' },
    { key: 'timeline', label: 'Timeline', type: 'text' },
    { key: 'techStack', label: 'Tech Stack', type: 'text' },
    { key: 'result', label: 'Result (highlighted)', type: 'text' },
    { key: 'clientName', label: 'Client Name', type: 'text' },
    { key: 'clientRole', label: 'Client Role', type: 'text' },
    { key: 'initials', label: 'Initials', type: 'text' },
    { key: 'ctaEyebrow', label: 'CTA Eyebrow', type: 'text' },
    { key: 'ctaHeadline', label: 'CTA Headline', type: 'textarea' },
    { key: 'ctaDesc', label: 'CTA Description', type: 'textarea' },
    { key: 'ctaButton', label: 'CTA Button', type: 'text' },
  ],
}
