import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { servicesData } from '@/lib/services-data'
import { CAL_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Our Services | Aurora Solutions - Everything You Need Under One Roof',
  description:
    'Web development, mobile apps, ERP/CRM systems, branding, digital marketing, design, and video production. One team, global standards, competitive rates.',
  openGraph: {
    title: 'Our Services | Aurora Solutions',
    description:
      'Full-service digital solutions for businesses across Ethiopia, Kenya, Canada, Germany, and the USA.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
      {/* Grid pattern background */}
      <div
        className="fixed inset-0 opacity-[0.3] dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(191, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(191, 255, 0, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 bg-gray-900 dark:bg-primary/10 rounded-full border border-gray-900 dark:border-primary/20 mb-6">
              <span className="text-primary font-semibold text-sm">Our Services</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
              Everything You Need Under One Roof
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-white/70 leading-relaxed">
              Design, development, branding, marketing. One team that handles it all.
              Choose a service below to see how we can help.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {servicesData.map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-200 dark:hover:bg-white/10 transition-all p-8"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <service.icon className="w-8 h-8 text-gray-700 dark:text-primary" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white dark:group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-white/70 mb-6 flex-grow leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Key Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-gray-500 dark:text-white/60">
                        <CheckCircle className="w-4 h-4 text-gray-700 dark:text-primary mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center text-gray-700 dark:text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.6}>
          <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 dark:text-white/70 text-lg mb-8">
                Tell us about your project. We will put together a proposal within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Book a Free Consultation
                </a>
                <a
                  href="https://wa.me/251910940419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gray-200 dark:bg-white/10 backdrop-blur-sm text-black dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Why Choose Us */}
        <FadeIn delay={0.7}>
          <div className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-12">
              Why Choose Aurora Solutions?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 dark:text-primary text-2xl font-bold">5+</span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Countries Served</h3>
                <p className="text-gray-500 dark:text-white/60">
                  Ethiopia, Kenya, Canada, Germany, and USA
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 dark:text-primary text-2xl font-bold">7</span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Service Areas</h3>
                <p className="text-gray-500 dark:text-white/60">
                  Every digital need covered by one team
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 dark:text-primary text-2xl font-bold">100%</span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Client Satisfaction</h3>
                <p className="text-gray-500 dark:text-white/60">
                  We deliver what we promise, every time
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
