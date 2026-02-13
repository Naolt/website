'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Camera, Video, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'
import { FooterNavButton } from './FooterNavButton'
import { useTheme } from '@/components/ThemeProvider'

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
}

// Default fallback data
const defaultSettings: SiteSettings = {
  _id: 'default',
  title: 'Aurora Solutions',
  email: 'AuroraSolutions11@gmail.com',
  phone: ['+251 9 10940419', '+251 9 10168641'],
  address: 'Addis Ababa, Ethiopia',
  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/aurora-horizon-solutions/',
    instagram: 'https://www.instagram.com/aurorasolutions_',
    facebook: 'https://www.facebook.com/share/1C7umcLZ6Z/',
    twitter: 'https://x.com/aurorasolution_',
  },
}

export function Footer() {
  const { theme } = useTheme()
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    // Fetch site settings from Sanity on mount
    async function fetchSettings() {
      try {
        const data = await client.fetch<SiteSettings>(siteSettingsQuery)
        if (data) {
          setSettings(data)
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
        // Keep using default settings
      }
    }

    fetchSettings()
  }, [])

  // Build social media array with icons
  const socialMedia = []
  if (settings.socialMedia?.linkedin) {
    socialMedia.push({ name: 'LinkedIn', href: settings.socialMedia.linkedin, icon: Linkedin })
  }
  if (settings.socialMedia?.instagram) {
    socialMedia.push({ name: 'Instagram', href: settings.socialMedia.instagram, icon: Camera })
  }
  if (settings.socialMedia?.facebook) {
    socialMedia.push({ name: 'Facebook', href: settings.socialMedia.facebook, icon: Facebook })
  }
  if (settings.socialMedia?.twitter) {
    socialMedia.push({ name: 'Twitter', href: settings.socialMedia.twitter, icon: Twitter })
  }
  if (settings.socialMedia?.tiktok) {
    socialMedia.push({ name: 'TikTok', href: settings.socialMedia.tiktok, icon: Video })
  }
  if (settings.socialMedia?.threads) {
    socialMedia.push({ name: 'Threads', href: settings.socialMedia.threads, icon: Send })
  }
  if (settings.socialMedia?.telegram) {
    socialMedia.push({ name: 'Telegram', href: settings.socialMedia.telegram, icon: Send })
  }

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden border-t border-gray-200 dark:border-white/10">
      {/* Subtle dot matrix background */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
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
                  src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}
                  alt="Aurora Solutions"
                  width={600}
                  height={180}
                  className="h-32 w-auto"
                  priority
                />
              </Link>
              <p className="text-sm text-gray-600 dark:text-white/60 mb-4 leading-relaxed">
                {settings.description || 'Empowering businesses through digital innovation. From Ethiopia to the world.'}
              </p>
              <div className="flex items-center gap-4">
                {socialMedia.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-white/60 hover:text-primary transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <FooterNavButton href={item.href}>{item.name}</FooterNavButton>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <FooterNavButton href={item.href}>{item.name}</FooterNavButton>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">Get in Touch</h3>
              <ul className="space-y-3">
                {settings.email && (
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm text-gray-600 dark:text-white/60 hover:text-primary transition-colors break-all"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings.phone && settings.phone.length > 0 && (
                  <li className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-600 dark:text-white/60">
                      {settings.phone.map((phoneNumber) => (
                        <a
                          key={phoneNumber}
                          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                          className="block hover:text-primary transition-colors"
                        >
                          {phoneNumber}
                        </a>
                      ))}
                    </div>
                  </li>
                )}
                {settings.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-white/60">
                      {settings.address}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-sm text-gray-500 dark:text-white/50 text-center md:text-left">
                  © {currentYear} Aurora Solutions. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/privacy"
                    className="text-gray-500 dark:text-white/50 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-gray-300 dark:text-white/30">•</span>
                  <Link
                    href="/terms"
                    className="text-gray-500 dark:text-white/50 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-white/50 text-center md:text-right">
                Built with purpose, faith, and innovation. 🇪🇹
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
