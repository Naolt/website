import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { featuredPortfolioQuery } from '@/lib/sanity/queries'
import type { Portfolio as PortfolioType } from '@/types/sanity'

// Category display mapping
const categoryLabels: Record<string, string> = {
  'web-dev': 'Web Development',
  'mobile-dev': 'Mobile Development',
  'erp-crm': 'ERP/CRM',
  'branding': 'Branding',
  'digital-marketing': 'Digital Marketing',
  'design': 'Design & Creative',
  'it-consulting': 'IT Consulting',
  'video-production': 'Video Production',
}

export async function Portfolio() {
  // Fetch portfolio items from Sanity
  const projects = await client.fetch<PortfolioType[]>(
    featuredPortfolioQuery,
    {},
    { next: { revalidate: 60 } }
  )

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Grid pattern background (matching Hero visibility) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(191, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Gradient spotlight */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(191, 255, 0, 0.06) 0%, transparent 60%)'
      }} />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="Our Work"
          title="Featured Projects"
          description="Transforming ideas into impactful digital solutions across industries and continents"
        />

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-white/60">No projects to display yet. Add some in the Sanity Studio!</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <FadeIn key={project._id} delay={index * 0.1}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 overflow-hidden transition-all cursor-pointer">
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    {project.featuredImage?.asset?.url ? (
                      <Image
                        src={project.featuredImage.asset.url}
                        alt={project.featuredImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-primary/30 text-6xl font-bold">{project.title.charAt(0)}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                          {categoryLabels[project.category] || project.category}
                        </p>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/50 mt-1">{project.client}</p>
                      </div>
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0"
                          aria-label="View project"
                        >
                          <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                        </a>
                      )}
                    </div>

                    <p className="text-white/70 text-sm mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Services */}
                    {project.services && project.services.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-white/50 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="px-3 py-1 text-xs bg-primary/10 rounded-full text-primary border border-primary/20"
                            >
                              {categoryLabels[service] || service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/60 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
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
