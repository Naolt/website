'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'What services does Aurora Solutions offer?',
    answer: 'We cover web development, mobile apps, ERP/CRM systems, branding, digital marketing, design, and video production. One team, every digital need.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer: 'A standard website takes 2 to 4 weeks. Custom web apps and mobile apps typically take 2 to 4 months. We give you a clear timeline upfront and keep you updated throughout.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes. We work with businesses across Ethiopia, Kenya, Canada, Germany, and the USA. We use modern collaboration tools and communicate across time zones without friction.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'Project-based pricing that depends on scope and complexity. Because our team is based in Ethiopia, you get global-standard quality at significantly lower rates than US or European agencies. We offer milestone-based payments for flexibility.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes. Every project comes with a post-launch support window. After that, we offer maintenance packages that cover bug fixes, updates, security patches, and new features.',
  },
  {
    question: 'How do I get started?',
    answer: 'Reach out through our contact form, email, or WhatsApp. We will set up a free consultation to understand your needs and put together a proposal. No commitment required.',
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
          description="Common questions about working with us."
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
