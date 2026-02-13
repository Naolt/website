'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'What services does Aurora Solutions offer?',
    answer: 'We offer comprehensive digital solutions including web development, mobile app development, ERP/CRM systems, branding & strategy, digital marketing, design & creative services, and video production. We serve clients across Ethiopia, Kenya, Canada, Germany, and the USA.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer: 'Project timelines vary based on complexity. A basic website typically takes 2-4 weeks, while a custom web application or mobile app can take 2-4 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
  },
  {
    question: 'Can you work with international clients remotely?',
    answer: 'Absolutely! We have successfully delivered projects for clients across 5+ countries. We use modern collaboration tools, maintain clear communication, and work across different time zones to ensure smooth project delivery regardless of location.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'Our pricing is project-based and depends on scope, complexity, and timeline. We offer competitive rates while maintaining international quality standards. We also provide flexible payment options including milestone-based payments. Contact us for a free consultation and customized quote.',
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! We offer maintenance and support packages for all our projects. This includes bug fixes, updates, security patches, and feature enhancements. We believe in building long-term partnerships with our clients and ensuring your digital solutions continue to perform optimally.',
  },
  {
    question: 'How do I get started with Aurora Solutions?',
    answer: 'Getting started is easy! Contact us via WhatsApp, email, or our contact form. We\'ll schedule a free consultation to understand your needs, provide expert recommendations, and create a customized proposal. No obligation, just expert advice to help your business grow.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.3] dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(191, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(191, 255, 0, 0.04) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Got questions? We've got answers. Find everything you need to know about working with Aurora Solutions."
        />

        <div className="mt-16 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all text-left group"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white dark:group-hover:text-primary transition-colors pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-700 dark:text-primary flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-white/60 mb-4">
              Still have questions?
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Get in Touch
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
