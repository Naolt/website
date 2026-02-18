import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { MessageSquare, Lightbulb, Code, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We learn about your business, your goals, and what success looks like for you.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Design',
    description: 'We map out the user experience, create mockups, and get your sign-off before writing a single line of code.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our engineers build your product with clean code, modern frameworks, and regular progress updates.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We ship your product, monitor performance, and stay available for support and iterations.',
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden">
      {/* Simple gradient - no pattern for visual break */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 70% 50%, rgba(191, 255, 0, 0.05) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="How We Work"
          title="From Idea to Launch"
          description="A clear, proven process that keeps you in the loop at every step."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="relative">
                {/* Connecting line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-primary/30 to-transparent -z-10" />
                )}

                <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group h-full">
                  {/* Step number */}
                  <div className="text-5xl font-bold text-gray-300 dark:text-primary/20 mb-4 dark:group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <step.icon className="w-6 h-6 text-gray-700 dark:text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white dark:group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">
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
