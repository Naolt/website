'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitMessage({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
      })
      reset()
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to send message. Please try again or email us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceValue = watch('service')

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Diagonal lines background (cross-hatch pattern from Services) */}
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

      {/* Gradient spotlight */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(191, 255, 0, 0.06) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="Get In Touch"
          title="Let's Build Something Amazing"
          description="Ready to transform your business? Reach out and let's discuss your project"
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <SlideIn direction="left" delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitMessage && (
                <div
                  className={`p-4 rounded-lg border ${
                    submitMessage.type === 'success'
                      ? 'bg-primary/10 border-primary/30 text-white'
                      : 'bg-red-500/10 border-red-500/30 text-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name *
                  </Label>
                  <Input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 h-11"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 h-11"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 h-11"
                    placeholder="+251 9 12345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company
                  </Label>
                  <Input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 h-11"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-white">
                  Service Interest
                </Label>
                <Select
                  value={serviceValue || ''}
                  onValueChange={(value) => setValue('service', value)}
                >
                  <SelectTrigger className="w-full bg-white/5 border-white/10 text-white data-[placeholder]:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 h-11">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/10">
                    <SelectItem value="web" className="text-white focus:bg-white/10 focus:text-white">
                      Web Development
                    </SelectItem>
                    <SelectItem value="mobile" className="text-white focus:bg-white/10 focus:text-white">
                      Mobile App Development
                    </SelectItem>
                    <SelectItem value="erp" className="text-white focus:bg-white/10 focus:text-white">
                      ERP / CRM Systems
                    </SelectItem>
                    <SelectItem value="branding" className="text-white focus:bg-white/10 focus:text-white">
                      Branding & Strategy
                    </SelectItem>
                    <SelectItem value="marketing" className="text-white focus:bg-white/10 focus:text-white">
                      Digital Marketing
                    </SelectItem>
                    <SelectItem value="design" className="text-white focus:bg-white/10 focus:text-white">
                      Design & Creative
                    </SelectItem>
                    <SelectItem value="video" className="text-white focus:bg-white/10 focus:text-white">
                      Video Production
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Message *
                </Label>
                <Textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/20 resize-none min-h-[150px]"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black hover:bg-primary/90 font-semibold py-6 text-base shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </SlideIn>

          {/* Contact Information */}
          <SlideIn direction="right" delay={0.4}>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 h-fit">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Email</p>
                    <a href="mailto:AuroraSolutions11@gmail.com" className="text-white hover:text-primary transition-colors">
                      AuroraSolutions11@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Phone</p>
                    <a href="tel:+251910940419" className="text-white hover:text-primary transition-colors block">
                      +251 9 10940419
                    </a>
                    <a href="tel:+251910168641" className="text-white hover:text-primary transition-colors block">
                      +251 9 10168641
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Location</p>
                    <p className="text-white">Addis Ababa, Ethiopia 🇪🇹</p>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  )
}
