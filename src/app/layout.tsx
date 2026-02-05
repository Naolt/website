import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { ConditionalLayout } from '@/components/ConditionalLayout'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aurora Solutions | Digital Innovation in Ethiopia',
  description:
    'Leading digital solutions company in Ethiopia. We offer web development, mobile apps, ERP/CRM systems, branding, and IT consulting services. Serving clients across Ethiopia, Kenya, Canada, Germany, and USA.',
  keywords: [
    'web development ethiopia',
    'mobile app development',
    'ERP system',
    'CRM software',
    'branding agency ethiopia',
    'digital marketing',
    'IT consulting',
    'software company addis ababa',
    'Aurora Solutions',
  ],
  authors: [{ name: 'Aurora Solutions' }],
  creator: 'Aurora Solutions',
  publisher: 'Aurora Solutions',
  metadataBase: new URL('https://aurorasolve.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aurorasolve.com',
    title: 'Aurora Solutions | Digital Innovation in Ethiopia',
    description:
      'Empowering businesses through digital innovation. Web development, mobile apps, ERP/CRM systems, and IT consulting.',
    siteName: 'Aurora Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aurora Solutions - Digital Innovation in Ethiopia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora Solutions | Digital Innovation in Ethiopia',
    description:
      'Empowering businesses through digital innovation. Web development, mobile apps, ERP/CRM systems, and IT consulting.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aurora Solutions',
    url: 'https://aurorasolve.com',
    logo: 'https://aurorasolve.com/images/logo-light.png',
    description: 'Leading digital solutions company providing web development, mobile apps, ERP/CRM systems, branding, and IT consulting services.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ET',
      addressLocality: 'Addis Ababa',
    },
    sameAs: [
      'https://www.linkedin.com/company/aurora-horizon-solutions/',
      'https://www.instagram.com/aurorasolutions_',
      'https://www.facebook.com/share/1C7umcLZ6Z/',
      'https://x.com/aurorasolution_',
      'https://www.tiktok.com/@aurora_solutions11',
      'https://www.threads.com/@aurorasolutions_',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'am'],
    },
    areaServed: ['ET', 'KE', 'CA', 'DE', 'US'],
    founder: {
      '@type': 'Organization',
      name: 'Aurora Solutions',
    },
  }

  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${lexend.variable} font-sans antialiased bg-black`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
