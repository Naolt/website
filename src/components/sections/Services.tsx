import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { Video, ArrowRight } from 'lucide-react'
import { servicesData } from '@/lib/services-data'

export function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Diagonal lines background */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(191, 255, 0, 0.6) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(191, 255, 0, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle gradient spotlight */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(191, 255, 0, 0.06) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="What We Do"
          title="Comprehensive Digital Services"
          description="From strategy to execution, we provide end-to-end digital solutions that transform businesses"
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.1}>
              <Link
                href={`/services/${service.slug}`}
                className="group block p-8 h-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 mb-6 flex-grow">
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-white/60">
                        <ArrowRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover indicator */}
                  <div className="text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Aurora Video Production Highlight */}
        <FadeIn delay={0.8}>
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 hover:border-primary/30 transition-all">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Aurora Video Production</h3>
              <p className="text-white/70 text-lg mb-6">
                Cinematic storytelling that makes brands unforgettable.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80">Video Editing</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80">Cinematography</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80">Motion Graphics</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80">Event Coverage</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
