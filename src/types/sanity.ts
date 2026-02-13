export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface SanityImageWithCaption extends SanityImage {
  caption?: string
}

export interface Portfolio {
  _id: string
  title: string
  slug: {
    current: string
  }
  client: string
  category: string
  services?: string[]
  shortDescription: string
  featuredImage: SanityImage
  technologies?: string[]
  projectUrl?: string
  completionDate: string
  featured: boolean
  order: number
}

export interface Testimonial {
  _id: string
  clientName: string
  clientRole: string
  company: string
  avatar?: SanityImage
  testimonial: string
  rating: number
  projectReference?: {
    _ref: string
    _type: 'reference'
  }
  featured: boolean
  order: number
  dateReceived: string
}

export interface Client {
  _id: string
  name: string
  logo: SanityImage
  type: 'client' | 'partner' | 'both'
  website?: string
  order: number
}

export interface SiteSettings {
  _id: string
  title: string
  description?: string
  email?: string
  phone?: string[]
  address?: string
  whatsappNumber?: string
  socialMedia?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
    tiktok?: string
    threads?: string
    telegram?: string
  }
}
