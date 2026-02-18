import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function ServiceCardsSlide({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    title: 'What We Do',
    card1Title: 'Web Development',
    card1Desc: 'Modern, fast websites that convert',
    card2Title: 'Mobile Apps',
    card2Desc: 'Native and cross-platform solutions',
    card3Title: 'Branding',
    card3Desc: 'Identity that stands out',
    card4Title: 'Marketing',
    card4Desc: 'Strategies that drive growth',
    ...data,
  }

  const cards = [
    { title: d.card1Title, desc: d.card1Desc },
    { title: d.card2Title, desc: d.card2Desc },
    { title: d.card3Title, desc: d.card3Desc },
    { title: d.card4Title, desc: d.card4Desc },
  ]

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
      {/* Subtle grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '108px 108px',
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          letterSpacing: -1,
          marginBottom: 64,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {d.title}
        <span style={{ color: brand.primaryColor }}>.</span>
      </div>

      {/* 2x2 Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          flexGrow: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              width: 'calc(50% - 16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Icon placeholder */}
            <div
              style={{
                width: 48,
                height: 48,
                background: brand.primaryColor,
                borderRadius: 12,
                opacity: 0.9,
              }}
            />
            {/* Card title */}
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.white,
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </div>
            {/* Card description */}
            <div
              style={{
                fontSize: 22,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.5,
                fontWeight: 300,
              }}
            >
              {card.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const serviceCards: TemplateDefinition = {
  id: 'service-cards',
  name: 'Service Cards',
  category: 'service',
  component: ServiceCardsSlide,
  defaults: {
    title: 'What We Do',
    card1Title: 'Web Development',
    card1Desc: 'Modern, fast websites that convert',
    card2Title: 'Mobile Apps',
    card2Desc: 'Native and cross-platform solutions',
    card3Title: 'Branding',
    card3Desc: 'Identity that stands out',
    card4Title: 'Marketing',
    card4Desc: 'Strategies that drive growth',
  },
  fields: [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'What We Do' },
    { key: 'card1Title', label: 'Card 1 Title', type: 'text', placeholder: 'Web Development' },
    { key: 'card1Desc', label: 'Card 1 Description', type: 'text', placeholder: 'Modern, fast websites that convert' },
    { key: 'card2Title', label: 'Card 2 Title', type: 'text', placeholder: 'Mobile Apps' },
    { key: 'card2Desc', label: 'Card 2 Description', type: 'text', placeholder: 'Native and cross-platform solutions' },
    { key: 'card3Title', label: 'Card 3 Title', type: 'text', placeholder: 'Branding' },
    { key: 'card3Desc', label: 'Card 3 Description', type: 'text', placeholder: 'Identity that stands out' },
    { key: 'card4Title', label: 'Card 4 Title', type: 'text', placeholder: 'Marketing' },
    { key: 'card4Desc', label: 'Card 4 Description', type: 'text', placeholder: 'Strategies that drive growth' },
  ],
}
