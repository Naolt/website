import type { CarouselDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'
import { SlideFooter, CTASlide } from './shared'

function SvcHookSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '108px 108px' }} />
      <div style={{ position: 'absolute', top: -240, right: -240, width: 840, height: 840, background: 'radial-gradient(circle, rgba(191,255,0,0.15) 0%, rgba(191,255,0,0.03) 40%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' as const, color: brand.primaryColor, fontWeight: 600, marginBottom: 48, display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ width: 48, height: 3, background: brand.primaryColor, display: 'inline-block' }} />
          {data.eyebrow || 'Web Development'}
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, color: COLORS.white, lineHeight: 1.05, letterSpacing: -2, whiteSpace: 'pre-line' }}>
          {data.hookTitle || 'Websites That\nLoad Fast and'}
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, color: brand.primaryColor, lineHeight: 1.05, letterSpacing: -2 }}>
          {data.hookHighlight || 'Convert.'}
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', marginTop: 36, fontWeight: 300 }}>
          {data.hookSub || 'Built with React, Next.js, and modern tools.'}
        </div>
      </div>
      <SlideFooter slideIndex={0} totalSlides={5} />
    </div>
  )
}

function FeatureSlide({ data, index, slideIndex }: { data: Record<string, string>; index: number; slideIndex: number }) {
  const brand = useBrand()
  const tag = data[`feature${index}Tag`] || `Feature ${index}`
  const title = data[`feature${index}Title`] || `Feature ${index} Title`
  const desc = data[`feature${index}Desc`] || `Description for feature ${index}`
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(191,255,0,0.02) 60px, rgba(191,255,0,0.02) 62px)' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ width: 96, height: 96, border: '3px solid rgba(191,255,0,0.3)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 56 }}>
          <div style={{ width: 40, height: 40, background: brand.primaryColor, borderRadius: 8 }} />
        </div>
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
          {tag}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: COLORS.white, lineHeight: 1.15, marginBottom: 32, letterSpacing: -1, whiteSpace: 'pre-line' }}>
          {title}
        </div>
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontWeight: 300, maxWidth: 750 }}>
          {desc}
        </div>
      </div>
      <SlideFooter slideIndex={slideIndex} totalSlides={5} />
    </div>
  )
}

function Feature1({ data }: { data: Record<string, string> }) { return <FeatureSlide data={data} index={1} slideIndex={1} /> }
function Feature2({ data }: { data: Record<string, string> }) { return <FeatureSlide data={data} index={2} slideIndex={2} /> }
function Feature3({ data }: { data: Record<string, string> }) { return <FeatureSlide data={data} index={3} slideIndex={3} /> }
function SvcCTA({ data }: { data: Record<string, string> }) { return <CTASlide data={data} slideIndex={4} totalSlides={5} /> }

export const serviceCarousel: CarouselDefinition = {
  id: 'carousel-service',
  name: 'Service Carousel (5 slides)',
  category: 'carousel',
  type: 'carousel',
  slides: [
    { id: 'hook', name: 'Hook', component: SvcHookSlide },
    { id: 'feature-1', name: 'Feature 1', component: Feature1 },
    { id: 'feature-2', name: 'Feature 2', component: Feature2 },
    { id: 'feature-3', name: 'Feature 3', component: Feature3 },
    { id: 'cta', name: 'CTA', component: SvcCTA },
  ],
  defaults: {
    eyebrow: 'Web Development',
    hookTitle: 'Websites That\nLoad Fast and',
    hookHighlight: 'Convert.',
    hookSub: 'Built with React, Next.js, and modern tools.',
    feature1Tag: 'Performance',
    feature1Title: 'Lightning-Fast\nPage Speeds',
    feature1Desc: 'Server-side rendering, optimized images, and clean code. Your site loads in under 2 seconds.',
    feature2Tag: 'SEO Built In',
    feature2Title: 'Rank Higher\non Google',
    feature2Desc: 'Semantic HTML, structured data, and technical SEO baked into every page from day one.',
    feature3Tag: 'Mobile First',
    feature3Title: 'Looks Perfect\non Every Screen',
    feature3Desc: 'Responsive from the start. Phone, tablet, desktop. Your site adapts and stays sharp.',
    ctaEyebrow: 'Get Started',
    ctaHeadline: 'Need a Website\nThat Works?',
    ctaDesc: 'Tell us what you need. We will put together a proposal within 48 hours.',
    ctaButton: 'Book a Call',
  },
  fields: [
    { key: 'eyebrow', label: 'Service Category', type: 'text', placeholder: 'Web Development' },
    { key: 'hookTitle', label: 'Hook Title', type: 'textarea' },
    { key: 'hookHighlight', label: 'Hook Highlight', type: 'text', placeholder: 'Convert.' },
    { key: 'hookSub', label: 'Hook Subtitle', type: 'text' },
    { key: 'feature1Tag', label: 'Feature 1 Tag', type: 'text' },
    { key: 'feature1Title', label: 'Feature 1 Title', type: 'textarea' },
    { key: 'feature1Desc', label: 'Feature 1 Description', type: 'textarea' },
    { key: 'feature2Tag', label: 'Feature 2 Tag', type: 'text' },
    { key: 'feature2Title', label: 'Feature 2 Title', type: 'textarea' },
    { key: 'feature2Desc', label: 'Feature 2 Description', type: 'textarea' },
    { key: 'feature3Tag', label: 'Feature 3 Tag', type: 'text' },
    { key: 'feature3Title', label: 'Feature 3 Title', type: 'textarea' },
    { key: 'feature3Desc', label: 'Feature 3 Description', type: 'textarea' },
    { key: 'ctaEyebrow', label: 'CTA Eyebrow', type: 'text' },
    { key: 'ctaHeadline', label: 'CTA Headline', type: 'textarea' },
    { key: 'ctaDesc', label: 'CTA Description', type: 'textarea' },
    { key: 'ctaButton', label: 'CTA Button', type: 'text' },
  ],
}
