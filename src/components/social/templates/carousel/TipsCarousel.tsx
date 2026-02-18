import type { CarouselDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'
import { SlideFooter, CTASlide } from './shared'

function HookSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '108px 108px' }} />
      <div style={{ position: 'absolute', top: -240, right: -240, width: 840, height: 840, background: 'radial-gradient(circle, rgba(191,255,0,0.15) 0%, rgba(191,255,0,0.03) 40%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: brand.primaryColor, color: COLORS.black, fontSize: 22, fontWeight: 700, padding: '12px 32px', borderRadius: 40, marginBottom: 48 }}>
          {data.badge || '5 Signs'}
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.white, lineHeight: 1.08, letterSpacing: -2, whiteSpace: 'pre-line' }}>
          {data.hookTitle || 'Your Website Is\nLosing You'}
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, color: brand.primaryColor, lineHeight: 1.08, letterSpacing: -2 }}>
          {data.hookHighlight || 'Customers'}
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', marginTop: 36, fontWeight: 300, lineHeight: 1.5 }}>
          {data.hookSub || 'Swipe to find out if yours is one of them.'}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, right: 112, fontSize: 22, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: 16, zIndex: 5 }}>
        Swipe <span style={{ fontSize: 36, color: brand.primaryColor }}>&rarr;</span>
      </div>
      <SlideFooter slideIndex={0} totalSlides={7} />
    </div>
  )
}

function TipSlide({ data, index }: { data: Record<string, string>; index: number }) {
  const brand = useBrand()
  const tipTitle = data[`tip${index}Title`] || `Tip ${index} Title`
  const tipDesc = data[`tip${index}Desc`] || `Description for tip ${index}`
  return (
    <div style={{ width: 1080, height: 1080, background: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 112, fontFamily: brand.fontFamily }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 8, background: `linear-gradient(to bottom, ${brand.primaryColor}, rgba(191,255,0,0.05))` }} />
      <div style={{ position: 'relative', zIndex: 2, paddingLeft: 24 }}>
        <div style={{ fontSize: 180, fontWeight: 900, color: `${brand.primaryColor}1F`, lineHeight: 0.85, marginBottom: 36 }}>
          {String(index).padStart(2, '0')}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, marginBottom: 32, letterSpacing: -1, whiteSpace: 'pre-line' }}>
          {tipTitle}
        </div>
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontWeight: 300, maxWidth: 750 }}>
          {tipDesc}
        </div>
      </div>
      <SlideFooter slideIndex={index} totalSlides={7} />
    </div>
  )
}

function Tip1({ data }: { data: Record<string, string> }) { return <TipSlide data={data} index={1} /> }
function Tip2({ data }: { data: Record<string, string> }) { return <TipSlide data={data} index={2} /> }
function Tip3({ data }: { data: Record<string, string> }) { return <TipSlide data={data} index={3} /> }
function Tip4({ data }: { data: Record<string, string> }) { return <TipSlide data={data} index={4} /> }
function Tip5({ data }: { data: Record<string, string> }) { return <TipSlide data={data} index={5} /> }
function CTAEnd({ data }: { data: Record<string, string> }) { return <CTASlide data={data} slideIndex={6} totalSlides={7} /> }

export const tipsCarousel: CarouselDefinition = {
  id: 'carousel-tips',
  name: 'Tips Carousel (7 slides)',
  category: 'carousel',
  type: 'carousel',
  slides: [
    { id: 'hook', name: 'Hook', component: HookSlide },
    { id: 'tip-1', name: 'Tip 1', component: Tip1 },
    { id: 'tip-2', name: 'Tip 2', component: Tip2 },
    { id: 'tip-3', name: 'Tip 3', component: Tip3 },
    { id: 'tip-4', name: 'Tip 4', component: Tip4 },
    { id: 'tip-5', name: 'Tip 5', component: Tip5 },
    { id: 'cta', name: 'CTA', component: CTAEnd },
  ],
  defaults: {
    badge: '5 Signs',
    hookTitle: 'Your Website Is\nLosing You',
    hookHighlight: 'Customers',
    hookSub: 'Swipe to find out if yours is one of them.',
    tip1Title: 'Takes More Than\n3 Seconds to Load',
    tip1Desc: '53% of mobile visitors leave a site that takes longer than 3 seconds. Speed is not optional.',
    tip2Title: 'Not Optimized\nfor Mobile',
    tip2Desc: 'Over 60% of web traffic comes from phones. If your site breaks on mobile, you are invisible.',
    tip3Title: 'No Clear\nCall-to-Action',
    tip3Desc: "Visitors land on your homepage and don't know what to do next. Every page needs a clear next step.",
    tip4Title: 'Outdated Design\nThat Kills Trust',
    tip4Desc: "75% of users judge a company's credibility based on its website design. First impressions matter.",
    tip5Title: 'Invisible on\nGoogle Search',
    tip5Desc: 'If your site is not optimized for SEO, your competitors are getting the traffic you should have.',
    ctaEyebrow: 'Free Consultation',
    ctaHeadline: "We Fix All Five.\nLet's Talk.",
    ctaDesc: '30 minutes. No commitment. We will review your site and give you an honest assessment.',
    ctaButton: 'Book a Call',
  },
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', placeholder: '5 Signs' },
    { key: 'hookTitle', label: 'Hook Title', type: 'textarea', placeholder: 'Your Website Is\nLosing You' },
    { key: 'hookHighlight', label: 'Hook Highlight', type: 'text', placeholder: 'Customers' },
    { key: 'hookSub', label: 'Hook Subtitle', type: 'text', placeholder: 'Swipe to find out...' },
    { key: 'tip1Title', label: 'Tip 1 Title', type: 'textarea' },
    { key: 'tip1Desc', label: 'Tip 1 Description', type: 'textarea' },
    { key: 'tip2Title', label: 'Tip 2 Title', type: 'textarea' },
    { key: 'tip2Desc', label: 'Tip 2 Description', type: 'textarea' },
    { key: 'tip3Title', label: 'Tip 3 Title', type: 'textarea' },
    { key: 'tip3Desc', label: 'Tip 3 Description', type: 'textarea' },
    { key: 'tip4Title', label: 'Tip 4 Title', type: 'textarea' },
    { key: 'tip4Desc', label: 'Tip 4 Description', type: 'textarea' },
    { key: 'tip5Title', label: 'Tip 5 Title', type: 'textarea' },
    { key: 'tip5Desc', label: 'Tip 5 Description', type: 'textarea' },
    { key: 'ctaEyebrow', label: 'CTA Eyebrow', type: 'text' },
    { key: 'ctaHeadline', label: 'CTA Headline', type: 'textarea' },
    { key: 'ctaDesc', label: 'CTA Description', type: 'textarea' },
    { key: 'ctaButton', label: 'CTA Button', type: 'text' },
  ],
}
