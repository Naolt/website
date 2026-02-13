'use client'

import { ArrowDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { Counter } from '@/components/animations/Counter'

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 pb-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-[#1a1a1a] dark:to-black overflow-hidden"
    >
      {/* Modern grid background with lime accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern - darker for light mode */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(191, 255, 0, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(191, 255, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.3
          }}
        />

        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 dark:from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 dark:from-primary/10 via-transparent to-transparent blur-3xl" />

        {/* Subtle glow spots */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-primary/10 backdrop-blur-sm rounded-full border border-gray-900 dark:border-primary/20 text-primary text-sm font-medium mb-8 shadow-lg shadow-primary/5">
              <Sparkles className="w-4 h-4" />
              <span>Digital Innovation from Ethiopia 🇪🇹</span>
            </div>
          </FadeIn>

          {/* Main Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">Digital Solutions That</span>
              <br />
              <span className="text-primary">Transform</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          {/* <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white/90 max-w-3xl mx-auto mb-4 font-medium">
              Ethiopian Businesses for Global Success
            </p>
          </FadeIn> */}

          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-gray-700 dark:text-white/70 max-w-2xl mx-auto mb-12">
              We build world-class web apps, mobile solutions, ERP systems, and brands that help businesses compete globally
            </p>
          </FadeIn>

          {/* CTAs */}
          <SlideIn direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 h-auto bg-primary text-black hover:bg-primary/90 text-base font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('portfolio')}
                className="px-6 py-3 h-auto bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 border-2 border-gray-300 dark:border-white/30 hover:border-primary/50 text-base font-medium backdrop-blur-sm transition-all"
              >
                View Our Work
              </Button>
            </div>
          </SlideIn>

          {/* Metrics */}
          <SlideIn direction="up" delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  <Counter value={15} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-white/70 font-medium text-sm md:text-base">Projects Delivered</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  <Counter value={5} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-white/70 font-medium text-sm md:text-base">Countries Served</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  <Counter value={100} suffix="%" />
                </div>
                <div className="text-gray-600 dark:text-white/70 font-medium text-sm md:text-base">Client Satisfaction</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  <Counter value={2} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-white/70 font-medium text-sm md:text-base">Years of Excellence</div>
              </div>
            </div>
          </SlideIn>

          {/* Scroll Indicator */}
          <FadeIn delay={0.8} className="mt-16">
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-2 text-gray-500 dark:text-white/50 hover:text-primary transition-colors group mx-auto"
              aria-label="Scroll to next section"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-primary" />
            </button>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
