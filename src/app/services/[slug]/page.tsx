import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign } from 'lucide-react'
import { servicesData, getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Aurora Solutions',
    }
  }

  return {
    title: `${service.title} | Aurora Solutions`,
    description: service.fullDescription,
    openGraph: {
      title: `${service.title} | Aurora Solutions`,
      description: service.shortDescription,
      type: 'website',
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  // Get related services (next 2 services in the list)
  const currentIndex = servicesData.findIndex((s) => s.slug === slug)
  const relatedServices = [
    servicesData[(currentIndex + 1) % servicesData.length],
    servicesData[(currentIndex + 2) % servicesData.length],
  ]

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Grid pattern background */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
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
        {/* Back Button */}
        <FadeIn>
          <Link
            href="/services"
            className="inline-flex items-center text-white/60 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </FadeIn>

        {/* Hero Section */}
        <div className="mb-16">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">{service.title}</h1>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-white/70 leading-relaxed max-w-4xl">
              {service.fullDescription}
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <FadeIn delay={0.3}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Benefits */}
            <FadeIn delay={0.4}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Key Benefits</h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Process */}
            <FadeIn delay={0.5}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Our Process</h2>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{step.step}</h3>
                        <p className="text-white/70">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Technologies (if available) */}
            {service.technologies && service.technologies.length > 0 && (
              <FadeIn delay={0.6}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Technologies We Use</h2>
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Deliverables */}
            <FadeIn delay={0.7}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">What You&apos;ll Receive</h2>
                <ul className="space-y-3">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing */}
              <FadeIn delay={0.3}>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-xl border border-primary/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-white">Pricing</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-white mb-2">
                      {service.pricing.starting}
                    </p>
                    <p className="text-white/70 text-sm">{service.pricing.description}</p>
                  </div>
                  <Link
                    href="/#contact"
                    className="block w-full px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all text-center shadow-lg shadow-primary/20"
                  >
                    Get a Quote
                  </Link>
                </div>
              </FadeIn>

              {/* Quick Contact */}
              <FadeIn delay={0.4}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Have Questions?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Let&apos;s discuss your project and find the best solution for your needs.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/251910940419"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all text-center text-sm"
                    >
                      Chat on WhatsApp
                    </a>
                    <a
                      href="mailto:AuroraSolutions11@gmail.com"
                      className="block w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all text-center text-sm"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <FadeIn delay={0.8}>
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Other Services You Might Like
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  className="group block bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <relatedService.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                        {relatedService.title}
                      </h3>
                      <p className="text-white/70 text-sm">{relatedService.shortDescription}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Final CTA */}
        <FadeIn delay={0.9}>
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s bring your vision to life. Contact us today for a free consultation and
              custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-block px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
