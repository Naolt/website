import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { featuredTestimonialsQuery } from '@/lib/sanity/queries'
import type { Testimonial } from '@/types/sanity'

export async function Testimonials() {
  // Fetch testimonials from Sanity
  const testimonials = await client.fetch<Testimonial[]>(
    featuredTestimonialsQuery,
    {},
    { next: { revalidate: 60 } }
  )
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden">
      {/* Dot matrix background (reused from About) */}
      <div
        className="absolute inset-0 opacity-[0.3] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(191, 255, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial spotlight */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(191, 255, 0, 0.05) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="Client Testimonials"
          title="Trusted by Businesses Worldwide"
          description="See what our clients say about working with Aurora Solutions"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 dark:text-white/60">No testimonials yet. Add some in the Sanity Studio!</p>
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial._id} delay={index * 0.1}>
                <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all h-full flex flex-col">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 dark:text-white/80 mb-6 flex-grow leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar?.asset?.url && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.avatar.asset.url}
                            alt={testimonial.avatar.alt || testimonial.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-black dark:text-white mb-1">{testimonial.clientName}</p>
                        <p className="text-sm text-gray-500 dark:text-white/60">{testimonial.clientRole}</p>
                        <span className="inline-block text-sm text-primary font-medium px-2 py-0.5 bg-gray-900 dark:bg-transparent rounded mt-1">
                          {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>
      </Container>
    </section>
  )
}
