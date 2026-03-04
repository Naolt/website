'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Who owns the code and intellectual property after the project is delivered?',
    answer: 'You do — 100%. Every project is delivered under a "Work for Hire" agreement, meaning all source code, design assets, and documentation are fully transferred to you upon final payment. We sign NDAs on every project and provide full repository access at handoff. No lock-in, no hidden retentions.',
  },
  {
    question: 'How much can I save compared to a US or European agency?',
    answer: 'Typically 50–70% compared to North American rates, and 30–50% compared to Eastern European agencies — without sacrificing quality. Our engineers work at global standards because that is the only standard we know. The cost advantage comes from Ethiopia\'s lower cost of living, not from cutting corners. Junior developers start around $15–25/hr, senior engineers $45–75/hr.',
  },
  {
    question: 'How do you work with international clients across time zones?',
    answer: 'We operate on East Africa Time (EAT, GMT+3), which naturally overlaps with European business hours and accommodates early-morning calls for US teams. We work on Agile/Scrum methodology with two-week sprints, daily async updates via Slack, task tracking in Jira, and code reviews on GitHub. You always know what is happening — no black box.',
  },
  {
    question: 'How do you handle data security and GDPR compliance?',
    answer: 'Ethiopia enacted its Personal Data Protection Proclamation (No. 1321/2024) in April 2024, which is closely modelled on the EU GDPR — covering consent, data minimisation, breach notification, and cross-border transfer rules. We sign NDAs with every client, follow secure development practices, and can accommodate GDPR-compliant data handling requirements for EU-based projects.',
  },
  {
    question: 'What services does Aurora Solutions offer?',
    answer: 'Web development, mobile apps (iOS & Android), ERP/CRM systems, branding & visual identity, digital marketing, graphic design, and video production. One integrated team — no juggling multiple vendors.',
  },
  {
    question: 'How long does a project typically take?',
    answer: 'A standard website takes 2–4 weeks. Custom web apps and mobile apps typically take 2–4 months. ERP/CRM systems run 3–6 months depending on complexity. We give you a detailed timeline before we start and send progress updates throughout every sprint.',
  },
  {
    question: 'Do you support local Ethiopian businesses and NGOs?',
    answer: 'Absolutely. We offer flexible local pricing, support Telebirr and Chapa for payments, and can provide Amharic-language support for local projects. We understand the Ethiopian business ecosystem — from Merkato retail digitisation to Telebirr integrations — and we are priced to be accessible to local SMEs and NGOs.',
  },
  {
    question: 'How do I get started?',
    answer: 'Book a free 30-minute consultation through our calendar link, or send us a message via the contact form, email, or WhatsApp. We will discuss your needs, scope the project, and send you a clear proposal — usually within 48 hours. No commitment required.',
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
