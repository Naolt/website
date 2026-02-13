import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { Users, Target, Heart } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden">
      {/* Dot matrix background */}
      <div
        className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(191, 255, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial spotlight from center */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(191, 255, 0, 0.08) 0%, transparent 50%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="Why Choose Us"
          title="Global-Class Digital Solutions"
          description="Delivering excellence in technology, design, and innovation across continents"
        />

        <div className="mt-16 space-y-16">
          {/* Value Proposition */}
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-lg md:text-xl text-gray-700 dark:text-white/80 leading-relaxed">
                  We combine <span className="font-semibold text-primary">cutting-edge technology</span> with{' '}
                  <span className="font-semibold text-primary">strategic thinking</span> to deliver digital solutions that drive real business results.
                  From startups to established enterprises across{' '}
                  <span className="font-semibold text-black dark:text-white">5+ countries</span>, we help businesses compete globally.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Core Strengths Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <SlideIn direction="left" delay={0.1}>
              <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Technical Excellence</h3>
                <p className="text-gray-600 dark:text-white/70">
                  Modern tech stack, best practices, and scalable architecture. We build solutions that perform, scale, and last.
                </p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.2}>
              <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Global Standards</h3>
                <p className="text-gray-600 dark:text-white/70">
                  International quality meets local understanding. We deliver world-class solutions tailored to your market.
                </p>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.3}>
              <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Results-Driven</h3>
                <p className="text-gray-600 dark:text-white/70">
                  Your success is our success. We focus on measurable outcomes that drive growth and ROI.
                </p>
              </div>
            </SlideIn>
          </div>

          {/* Capabilities Highlight - Redesigned */}
          <FadeIn delay={0.4}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                  End-to-End Digital Solutions
                </h3>
                <p className="text-gray-600 dark:text-white/70 text-lg">
                  Strategy · Design · Development · Growth
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="group relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl group-hover:bg-primary/10 transition-all" />
                  <div className="relative bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all text-center h-full flex flex-col justify-center">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight">Development</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-white/50">Web & Mobile</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl group-hover:bg-primary/10 transition-all" />
                  <div className="relative bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all text-center h-full flex flex-col justify-center">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight">ERP/CRM</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-white/50">Business Systems</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl group-hover:bg-primary/10 transition-all" />
                  <div className="relative bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all text-center h-full flex flex-col justify-center">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight">Branding</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-white/50">Visual Identity</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl group-hover:bg-primary/10 transition-all" />
                  <div className="relative bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all text-center h-full flex flex-col justify-center">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight">Marketing</div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-white/50">Digital Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
