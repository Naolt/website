import type { CarouselDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'
import { SlideFooter, CTASlide } from './shared'

function CompHookSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' as const, padding: 120, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '108px 108px' }} />
      {[500, 900].map((size, i) => (
        <div key={i} style={{ position: 'absolute', width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,255,0,0.04)', borderRadius: '50%' }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: brand.primaryColor, color: COLORS.black, fontSize: 24, fontWeight: 700, padding: '14px 40px', borderRadius: 40, marginBottom: 56, letterSpacing: 2 }}>
          {data.badge || 'Before vs After'}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, letterSpacing: -1, whiteSpace: 'pre-line' }}>
          {data.hookTitle || 'What Happens When\nYou Invest in a'}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, color: brand.primaryColor, lineHeight: 1.2, letterSpacing: -1 }}>
          {data.hookHighlight || 'Real Website'}
        </div>
      </div>
      <SlideFooter slideIndex={0} totalSlides={4} />
    </div>
  )
}

function ProblemSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const problems = (data.problems || 'Slow, outdated website that drives visitors away\nInconsistent branding across every channel\nNo mobile experience for 60% of your traffic\nZero leads from your online presence').split('\n').filter(Boolean)
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', fontWeight: 600, marginBottom: 64 }}>
          {data.problemsLabel || 'The Problem'}
        </div>
        {problems.map((point, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 44 }}>
            <div style={{ width: 56, height: 56, border: '2px solid rgba(255,68,68,0.3)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4444', fontSize: 32, fontWeight: 700, flexShrink: 0 }}>
              &times;
            </div>
            <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, fontWeight: 400, paddingTop: 8 }}>
              {point}
            </span>
          </div>
        ))}
      </div>
      <SlideFooter slideIndex={1} totalSlides={4} />
    </div>
  )
}

function SolutionSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const solutions = (data.solutions || 'Fast, modern platform that builds trust instantly\nCohesive brand identity across all touchpoints\nMobile-first design that works on every screen\nReal leads and conversions from day one').split('\n').filter(Boolean)
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', bottom: -200, left: -200, width: 700, height: 700, background: 'radial-gradient(circle, rgba(191,255,0,0.1) 0%, transparent 60%)', borderRadius: '50%' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' as const, color: brand.primaryColor, fontWeight: 600, marginBottom: 64 }}>
          {data.solutionsLabel || 'With Aurora'}
        </div>
        {solutions.map((point, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 44 }}>
            <div style={{ width: 56, height: 56, border: '2px solid rgba(191,255,0,0.3)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: brand.primaryColor, fontSize: 32, fontWeight: 700, flexShrink: 0 }}>
              &check;
            </div>
            <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, fontWeight: 400, paddingTop: 8 }}>
              {point}
            </span>
          </div>
        ))}
      </div>
      <SlideFooter slideIndex={2} totalSlides={4} />
    </div>
  )
}

function CompCTA({ data }: { data: Record<string, string> }) { return <CTASlide data={data} slideIndex={3} totalSlides={4} /> }

export const comparisonCarousel: CarouselDefinition = {
  id: 'carousel-comparison',
  name: 'Comparison Carousel (4 slides)',
  category: 'carousel',
  type: 'carousel',
  slides: [
    { id: 'hook', name: 'Hook', component: CompHookSlide },
    { id: 'problems', name: 'Problems', component: ProblemSlide },
    { id: 'solutions', name: 'Solutions', component: SolutionSlide },
    { id: 'cta', name: 'CTA', component: CompCTA },
  ],
  defaults: {
    badge: 'Before vs After',
    hookTitle: 'What Happens When\nYou Invest in a',
    hookHighlight: 'Real Website',
    problemsLabel: 'The Problem',
    problems: 'Slow, outdated website that drives visitors away\nInconsistent branding across every channel\nNo mobile experience for 60% of your traffic\nZero leads from your online presence',
    solutionsLabel: 'With Aurora',
    solutions: 'Fast, modern platform that builds trust instantly\nCohesive brand identity across all touchpoints\nMobile-first design that works on every screen\nReal leads and conversions from day one',
    ctaEyebrow: 'Make the Switch',
    ctaHeadline: 'Ready for a\nWebsite That\nWorks?',
    ctaDesc: 'Book a free consultation. We will show you exactly what needs to change.',
    ctaButton: 'Book a Call',
  },
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Before vs After' },
    { key: 'hookTitle', label: 'Hook Title', type: 'textarea' },
    { key: 'hookHighlight', label: 'Hook Highlight', type: 'text' },
    { key: 'problemsLabel', label: 'Problems Label', type: 'text', placeholder: 'The Problem' },
    { key: 'problems', label: 'Problems (one per line)', type: 'textarea' },
    { key: 'solutionsLabel', label: 'Solutions Label', type: 'text', placeholder: 'With Aurora' },
    { key: 'solutions', label: 'Solutions (one per line)', type: 'textarea' },
    { key: 'ctaEyebrow', label: 'CTA Eyebrow', type: 'text' },
    { key: 'ctaHeadline', label: 'CTA Headline', type: 'textarea' },
    { key: 'ctaDesc', label: 'CTA Description', type: 'textarea' },
    { key: 'ctaButton', label: 'CTA Button', type: 'text' },
  ],
}
