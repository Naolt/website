import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { MessageSquare, Lightbulb, Code, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We start by understanding your vision, challenges, and goals to create a tailored strategy.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Design',
    description: 'Our team crafts intuitive designs and strategic plans that align with your brand identity.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'We build scalable, high-performance solutions using cutting-edge technologies.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing support to ensure continued success.',
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Simple gradient - no pattern for visual break */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 70% 50%, rgba(191, 255, 0, 0.05) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="How We Work"
          title="Our Process"
          description="A proven approach that delivers results from concept to launch"
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="relative">
                {/* Connecting line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -z-10" />
                )}

                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group h-full">
                  {/* Step number */}
                  <div className="text-5xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
