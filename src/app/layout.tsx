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
  metadataBase: new URL('https://aurorasolutions.et'), // Update with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aurorasolutions.et',
    title: 'Aurora Solutions | Digital Innovation in Ethiopia',
    description:
      'Empowering businesses through digital innovation. Web development, mobile apps, ERP/CRM systems, and IT consulting.',
    siteName: 'Aurora Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aurora Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora Solutions | Digital Innovation in Ethiopia',
    description:
      'Empowering businesses through digital innovation. Web development, mobile apps, ERP/CRM systems, and IT consulting.',
    images: ['/og-image.jpg'],
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
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${lexend.variable} font-sans antialiased bg-black`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
