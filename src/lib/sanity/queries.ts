import { groq } from 'next-sanity'

// Portfolio Queries
export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    category,
    services,
    shortDescription,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    technologies,
    projectUrl,
    completionDate,
    featured,
    order
  }
`

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    client,
    category,
    services,
    shortDescription,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    technologies,
    projectUrl,
    completionDate,
    order
  }
`

export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    category,
    services,
    shortDescription,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    technologies,
    projectUrl,
    completionDate,
    order
  }
`

// Testimonial Queries
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    clientName,
    clientRole,
    company,
    avatar {
      asset->{
        _id,
        url
      },
      alt
    },
    testimonial,
    rating,
    featured,
    order,
    dateReceived
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) [0...4] {
    _id,
    clientName,
    clientRole,
    company,
    avatar {
      asset->{
        _id,
        url
      },
      alt
    },
    testimonial,
    rating,
    order
  }
`

// Client Queries
export const clientsQuery = groq`
  *[_type == "client"] | order(order asc) {
    _id,
    name,
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    type,
    website,
    order
  }
`
