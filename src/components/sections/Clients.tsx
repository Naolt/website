import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { clientsQuery } from '@/lib/sanity/queries'
import type { Client } from '@/types/sanity'

export async function Clients() {
  // Fetch clients from Sanity
  const clients = await client.fetch<Client[]>(
    clientsQuery,
    {},
    { next: { revalidate: 60 } }
  )
  return (
    <section id="clients" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-[#0a0a0a] dark:to-black relative overflow-hidden">
      {/* Grid pattern background (matching Hero visibility) */}
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
          subtitle="Our Clients"
          title="Trusted Partners"
          description="Proud to work with organizations across Ethiopia, Kenya, Canada, Germany, and USA"
        />

        <FadeIn delay={0.2}>
          {clients.length === 0 ? (
            <div className="mt-16 text-center py-12">
              <p className="text-gray-500 dark:text-white/60">No clients added yet. Add some in the Sanity Studio!</p>
            </div>
          ) : (
            <div className="mt-16 relative">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

              {/* Infinite scrolling container */}
              <div className="overflow-hidden">
                <div className="flex animate-scroll" style={{ width: 'max-content' }}>
                  {/* Duplicate clients array for seamless loop */}
                  {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map((clientItem, index) => (
                    <div
                      key={`${clientItem._id}-${index}`}
                      className="flex-shrink-0 mx-4"
                    >
                      <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm px-8 py-6 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all flex items-center justify-center min-w-[180px] h-24 group">
                        {clientItem.logo?.asset?.url ? (
                          <div className="relative flex items-center justify-center">
                            <Image
                              src={clientItem.logo.asset.url}
                              alt={clientItem.logo.alt || clientItem.name}
                              width={100}
                              height={50}
                              className="object-contain opacity-60 group-hover:opacity-100 transition-opacity dark:filter dark:brightness-0 dark:invert"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-xl font-bold tracking-tight text-gray-700 dark:text-white/70 group-hover:text-primary transition-colors uppercase" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif', letterSpacing: '0.05em' }}>
                              {clientItem.name}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </FadeIn>

        {/* Trust badge */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-white/60 text-sm">
              Trusted by organizations across{' '}
              <span className="text-primary font-semibold">5+ countries</span>
              {' '}and{' '}
              <span className="text-primary font-semibold">3 continents</span>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
