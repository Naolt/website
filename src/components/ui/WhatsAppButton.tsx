'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState('+251910940419') // Default fallback
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Fetch WhatsApp number from Sanity
    async function fetchWhatsAppNumber() {
      try {
        const settings = await client.fetch<SiteSettings>(siteSettingsQuery)
        if (settings?.whatsappNumber) {
          setWhatsappNumber(settings.whatsappNumber)
        }
      } catch (error) {
        // Use default if fetch fails
        console.error('Failed to fetch WhatsApp number:', error)
      }
    }

    fetchWhatsAppNumber()

    // Show button after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I found your website and I\'m interested in your services.')
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-full shadow-2xl transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full">
          <MessageCircle className="w-6 h-6" />
        </div>

        {/* Expandable text */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-w-[200px] pr-4' : 'max-w-0'
          }`}
        >
          <span className="whitespace-nowrap font-semibold">Chat with us!</span>
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </button>

      {/* Tooltip on mobile (shows on first load) */}
      {isVisible && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-black/90 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm animate-bounce md:hidden">
          <div className="flex items-center gap-2">
            <span>Need help? Chat with us!</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black/90 transform translate-y-full" />
        </div>
      )}
    </>
  )
}
