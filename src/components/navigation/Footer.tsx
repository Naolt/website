'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const navigation = {
  company: [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Web Development', href: '#services' },
    { name: 'Mobile Apps', href: '#services' },
    { name: 'ERP/CRM Systems', href: '#services' },
    { name: 'Branding & Design', href: '#services' },
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/AuroraSolutions',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@AuroraSolutions11',
      icon: Send, // Using Send as placeholder for TikTok
    },
    {
      name: 'Telegram',
      href: 'https://t.me/AuroraSolutions',
      icon: Send,
    },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <footer className="bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden border-t border-white/10">
      {/* Subtle dot matrix background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(191, 255, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(191, 255, 0, 0.03) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
              <Image
              src="/images/logo-dark.png"
              alt="Aurora Solutions"
              width={600}
              height={180}
              className="h-32 w-auto brightness-0 invert"
              priority
            />
              </Link>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Empowering businesses through digital innovation. From Ethiopia to the world.
              </p>
              <div className="flex items-center gap-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <a
                    href="mailto:AuroraSolutions11@gmail.com"
                    className="text-sm text-white/60 hover:text-primary transition-colors break-all"
                  >
                    AuroraSolutions11@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm text-white/60">
                    <a
                      href="tel:+251910940419"
                      className="block hover:text-primary transition-colors"
                    >
                      +251-9-10940419
                    </a>
                    <a
                      href="tel:+251910168641"
                      className="block hover:text-primary transition-colors"
                    >
                      +251-9-10168641
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60">
                    Addis Ababa, Ethiopia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/50 text-center md:text-left">
                © {currentYear} Aurora Solutions. All rights reserved.
              </p>
              <p className="text-sm text-white/50 text-center md:text-right">
                Built with purpose, faith, and innovation. 🇪🇹
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
