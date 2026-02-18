import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ConditionalLayout } from '@/components/ConditionalLayout'
import { ThemeProvider } from '@/components/ThemeProvider'

const GA_MEASUREMENT_ID = 'G-6N0WKJ0B2C'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aurora Solutions | Premium Engineering. Fraction of the Cost.',
  description:
    'Elite engineers in Ethiopia delivering web development, mobile apps, ERP/CRM systems, branding, and digital marketing to global standards. Serving clients across Ethiopia, Kenya, Canada, Germany, and USA.',
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
    title: 'Aurora Solutions | Premium Engineering. Fraction of the Cost.',
    description:
      'Elite engineers delivering web, mobile, and business solutions to global standards. Based in Ethiopia, serving the world.',
    siteName: 'Aurora Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aurora Solutions - Premium Engineering. Fraction of the Cost.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora Solutions | Premium Engineering. Fraction of the Cost.',
    description:
      'Elite engineers delivering web, mobile, and business solutions to global standards. Based in Ethiopia, serving the world.',
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
    description: 'Elite engineers in Ethiopia delivering web, mobile, ERP/CRM, branding, and digital marketing solutions to global standards.',
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
      <body className={`${lexend.variable} font-sans antialiased bg-white dark:bg-black transition-colors duration-300`}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
