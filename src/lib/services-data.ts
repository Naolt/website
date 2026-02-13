import {
  Code2,
  Smartphone,
  Database,
  Palette,
  TrendingUp,
  Sparkles,
  Video,
  type LucideIcon,
} from 'lucide-react'

export interface Service {
  slug: string
  icon: LucideIcon
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  benefits: string[]
  technologies?: string[]
  process: {
    step: string
    description: string
  }[]
  deliverables: string[]
  pricing: {
    starting: string
    description: string
  }
}

export const servicesData: Service[] = [
  {
    slug: 'web-development',
    icon: Code2,
    title: 'Web Development',
    shortDescription:
      'Fast, modern websites and e-commerce platforms that convert visitors into customers.',
    fullDescription:
      'We build high-performance websites and web applications using cutting-edge technologies. From simple landing pages to complex e-commerce platforms, we create digital experiences that are fast, secure, and optimized for conversions. Our websites are responsive, SEO-friendly, and built to scale with your business.',
    features: [
      'React & Next.js Development',
      'E-commerce Solutions (Shopify, WooCommerce, Custom)',
      'Progressive Web Apps (PWA)',
      'Custom Web Applications',
      'API Development & Integration',
      'Content Management Systems (CMS)',
    ],
    benefits: [
      'Lightning-fast page load speeds for better user experience',
      'SEO-optimized for maximum visibility',
      'Mobile-first responsive design',
      'Secure and scalable architecture',
      'Easy-to-manage content updates',
      'Integration with third-party services',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Vercel',
      'AWS',
    ],
    process: [
      {
        step: 'Discovery & Planning',
        description:
          'We analyze your business goals, target audience, and technical requirements to create a detailed project roadmap.',
      },
      {
        step: 'Design & Prototyping',
        description:
          'Our designers create intuitive wireframes and high-fidelity mockups that bring your vision to life.',
      },
      {
        step: 'Development',
        description:
          'Our developers build your website using modern technologies, following best practices for performance and security.',
      },
      {
        step: 'Testing & QA',
        description:
          'Rigorous testing across devices and browsers to ensure flawless functionality.',
      },
      {
        step: 'Launch & Support',
        description:
          'We handle deployment and provide ongoing support to keep your website running smoothly.',
      },
    ],
    deliverables: [
      'Fully functional, responsive website',
      'Source code and documentation',
      'Content Management System (if applicable)',
      'SEO optimization',
      'Performance optimization',
      '30 days of post-launch support',
      'Training on how to manage content',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'Every project is unique. We provide customized pricing based on your specific requirements, project scope, and timeline. Contact us for a free consultation and tailored proposal.',
    },
  },
  {
    slug: 'mobile-app-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    shortDescription:
      'Native and cross-platform apps with beautiful UI and secure, optimized code.',
    fullDescription:
      'Transform your ideas into powerful mobile applications that users love. We develop native iOS and Android apps, as well as cross-platform solutions using Flutter and React Native. Our apps are designed for performance, security, and exceptional user experience, from concept to App Store deployment.',
    features: [
      'iOS & Android Native Development',
      'Cross-Platform (Flutter & React Native)',
      'UI/UX Design for Mobile',
      'App Store & Google Play Deployment',
      'Push Notifications',
      'Offline Functionality',
      'In-App Purchases & Subscriptions',
      'Third-Party API Integrations',
    ],
    benefits: [
      'Reach millions of users on iOS and Android',
      'Beautiful, intuitive user interfaces',
      'Fast performance and smooth animations',
      'Secure data storage and transmission',
      'Offline capabilities for uninterrupted use',
      'Regular updates and maintenance',
    ],
    technologies: [
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin',
      'Firebase',
      'PostgreSQL',
      'GraphQL',
      'REST APIs',
    ],
    process: [
      {
        step: 'Concept & Strategy',
        description:
          'We define your app\'s core features, target audience, and unique value proposition.',
      },
      {
        step: 'UI/UX Design',
        description:
          'Our designers create pixel-perfect interfaces optimized for mobile interactions.',
      },
      {
        step: 'Development & Integration',
        description:
          'Building robust features, integrating APIs, and implementing secure backend systems.',
      },
      {
        step: 'Testing & QA',
        description:
          'Comprehensive testing on real devices to ensure quality and performance.',
      },
      {
        step: 'App Store Deployment',
        description:
          'We handle the submission process to Apple App Store and Google Play Store.',
      },
    ],
    deliverables: [
      'Fully functional mobile app (iOS and/or Android)',
      'App Store & Google Play listings',
      'Source code and documentation',
      'Backend API (if applicable)',
      'Admin dashboard (if applicable)',
      'User analytics setup',
      '60 days of post-launch support',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'App pricing is tailored to your needs, complexity, and platform requirements. We offer flexible payment plans and milestone-based billing. Get in touch for a personalized quote.',
    },
  },
  {
    slug: 'erp-crm-systems',
    icon: Database,
    title: 'ERP / CRM Systems',
    shortDescription:
      'Custom business solutions that automate workflows and provide real-time insights.',
    fullDescription:
      'Streamline your business operations with custom ERP and CRM systems tailored to your unique processes. We build powerful management platforms that centralize your data, automate workflows, and provide actionable insights. From inventory management to customer relationships, we help you work smarter, not harder.',
    features: [
      'Custom ERP Development',
      'CRM Solutions',
      'Inventory & Warehouse Management',
      'Sales & Order Processing',
      'Customer Data Management',
      'Real-Time Analytics & Reporting',
      'Multi-User Access Control',
      'Third-Party System Integration',
    ],
    benefits: [
      'Centralized business data in one platform',
      'Automated workflows save time and reduce errors',
      'Real-time insights for better decision-making',
      'Improved customer relationships and retention',
      'Scalable solutions that grow with your business',
      'Role-based access for security and privacy',
    ],
    technologies: [
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'GraphQL',
      'Docker',
      'AWS',
      'Kubernetes',
    ],
    process: [
      {
        step: 'Business Analysis',
        description:
          'We study your current processes, pain points, and requirements to design the perfect solution.',
      },
      {
        step: 'System Architecture',
        description:
          'Creating a scalable, secure architecture that handles your data and workflows efficiently.',
      },
      {
        step: 'Development & Integration',
        description:
          'Building custom modules and integrating with your existing tools and databases.',
      },
      {
        step: 'Training & Onboarding',
        description:
          'Comprehensive training for your team to ensure smooth adoption.',
      },
      {
        step: 'Deployment & Support',
        description:
          'We deploy your system and provide ongoing support and maintenance.',
      },
    ],
    deliverables: [
      'Custom ERP/CRM platform',
      'User management and access control',
      'Analytics and reporting dashboard',
      'Mobile-responsive interface',
      'API for third-party integrations',
      'Comprehensive documentation',
      'Training materials and sessions',
      '90 days of post-launch support',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'ERP/CRM systems are priced based on your business size, required modules, and integration needs. We provide transparent, milestone-based pricing. Schedule a consultation for your custom quote.',
    },
  },
  {
    slug: 'branding-strategy',
    icon: Palette,
    title: 'Branding & Strategy',
    shortDescription:
      'Memorable brands that connect with your audience and stand out in the market.',
    fullDescription:
      'Build a brand that resonates. We create distinctive brand identities that capture your essence and connect with your target audience. From logo design to comprehensive brand guidelines, we ensure consistency across all touchpoints. Our strategic approach combines creativity with market insights to position your brand for success.',
    features: [
      'Logo Design & Brand Identity',
      'Brand Strategy & Positioning',
      'Visual Identity System',
      'Brand Guidelines',
      'Color Palette & Typography',
      'Business Card & Stationery Design',
      'Brand Messaging & Voice',
      'Market Research & Analysis',
    ],
    benefits: [
      'Stand out from competitors with unique branding',
      'Build trust and recognition with consistent identity',
      'Connect emotionally with your target audience',
      'Professional presentation across all channels',
      'Clear brand guidelines for team alignment',
      'Scalable brand system that grows with you',
    ],
    process: [
      {
        step: 'Brand Discovery',
        description:
          'Deep dive into your values, mission, target audience, and competitive landscape.',
      },
      {
        step: 'Strategy Development',
        description:
          'Define your brand positioning, personality, and messaging framework.',
      },
      {
        step: 'Visual Identity Creation',
        description:
          'Design your logo, color palette, typography, and visual elements.',
      },
      {
        step: 'Guidelines & Assets',
        description:
          'Create comprehensive brand guidelines and deliver all necessary assets.',
      },
      {
        step: 'Implementation Support',
        description:
          'Help you roll out your new brand across all touchpoints.',
      },
    ],
    deliverables: [
      'Primary and secondary logo designs',
      'Brand guidelines document',
      'Color palette and typography system',
      'Business card and stationery designs',
      'Social media templates',
      'Brand asset library',
      'Logo files in all formats (AI, PNG, SVG, PDF)',
      'Brand messaging framework',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'Branding packages are customized to your business needs, from startup branding to complete rebrands. We create proposals that fit your budget and goals. Contact us to discuss your vision.',
    },
  },
  {
    slug: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    shortDescription:
      'Data-driven campaigns that grow your visibility, engagement, and conversions.',
    fullDescription:
      'Amplify your digital presence with strategic marketing campaigns that deliver results. We combine creativity with data-driven insights to increase your visibility, engage your audience, and drive conversions. From social media management to SEO and content strategy, we help you reach the right people at the right time.',
    features: [
      'Social Media Management',
      'Content Strategy & Creation',
      'SEO (Search Engine Optimization)',
      'Google Ads & Social Media Ads',
      'Email Marketing Campaigns',
      'Analytics & Performance Tracking',
      'Influencer Marketing',
      'Community Management',
    ],
    benefits: [
      'Increase brand visibility and awareness',
      'Drive qualified traffic to your website',
      'Engage and grow your audience',
      'Generate leads and conversions',
      'Build loyal customer communities',
      'Data-driven optimization for better ROI',
    ],
    technologies: [
      'Google Analytics',
      'Google Ads',
      'Meta Ads Manager',
      'Mailchimp',
      'Hootsuite',
      'SEMrush',
      'Canva',
      'Adobe Creative Suite',
    ],
    process: [
      {
        step: 'Audit & Strategy',
        description:
          'Analyze your current presence and develop a comprehensive marketing strategy.',
      },
      {
        step: 'Content Planning',
        description:
          'Create content calendars and campaigns aligned with your business goals.',
      },
      {
        step: 'Execution & Management',
        description:
          'Implement campaigns, manage channels, and engage with your audience.',
      },
      {
        step: 'Monitoring & Optimization',
        description:
          'Track performance metrics and continuously optimize for better results.',
      },
      {
        step: 'Reporting & Insights',
        description:
          'Provide detailed reports and actionable insights to inform strategy.',
      },
    ],
    deliverables: [
      'Monthly content calendar',
      'Social media posts and graphics',
      'Blog articles and SEO content',
      'Ad campaign management',
      'Email marketing campaigns',
      'Performance reports and analytics',
      'Competitor analysis',
      'Strategic recommendations',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'Marketing packages are tailored to your goals, channels, and budget. We offer flexible monthly retainers and project-based pricing for campaigns. Let\'s discuss what works best for you.',
    },
  },
  {
    slug: 'design-creative',
    icon: Sparkles,
    title: 'Design & Creative',
    shortDescription:
      'High-quality visuals and motion design that elevate your brand presence.',
    fullDescription:
      'Captivate your audience with stunning visual content. Our creative team produces high-quality graphics, social media content, and motion designs that make your brand stand out. From eye-catching social posts to animated explainer videos, we turn ideas into visual stories that resonate.',
    features: [
      'Graphic Design (Posters, Flyers, Brochures)',
      'Social Media Graphics & Templates',
      'Infographics & Data Visualization',
      'Presentation Design',
      'Motion Graphics & Animation',
      'Illustration & Icon Design',
      'Print Design',
      'Packaging Design',
    ],
    benefits: [
      'Professional, polished visual assets',
      'Consistent brand presentation',
      'Increased engagement on social media',
      'Effective communication of complex ideas',
      'Stand out in crowded markets',
      'Flexible design support as you need it',
    ],
    technologies: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe After Effects',
      'Figma',
      'Canva',
      'Procreate',
      'Blender',
    ],
    process: [
      {
        step: 'Creative Brief',
        description:
          'Understand your vision, target audience, and design requirements.',
      },
      {
        step: 'Concept Development',
        description:
          'Create initial concepts and mood boards for your approval.',
      },
      {
        step: 'Design & Refinement',
        description:
          'Produce high-quality designs and refine based on your feedback.',
      },
      {
        step: 'Finalization & Delivery',
        description:
          'Deliver final files in all required formats for print and digital use.',
      },
    ],
    deliverables: [
      'High-resolution design files',
      'Files in multiple formats (AI, PSD, PNG, JPG, PDF)',
      'Print-ready files (if applicable)',
      'Editable source files',
      'Design assets and templates',
      'Usage guidelines',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'Design pricing is based on project scope, complexity, and turnaround time. We offer both per-project pricing and monthly retainers for ongoing needs. Get in touch for your custom quote.',
    },
  },
  {
    slug: 'video-production',
    icon: Video,
    title: 'Video Production',
    shortDescription:
      'Cinematic video content through Aurora Video Production that brings your message to life.',
    fullDescription:
      'Tell your story through the power of video. Aurora Video Production delivers cinematic video content that captivates audiences and drives results. From brand stories to event coverage, we handle everything from concept to final edit. Our team combines technical expertise with creative storytelling to produce videos that leave lasting impressions.',
    features: [
      'Brand Story Videos',
      'Product & Service Videos',
      'Event Coverage & Highlights',
      'Corporate Videos',
      'Social Media Video Content',
      'Testimonial Videos',
      'Explainer Videos & Tutorials',
      'Motion Graphics & Animation',
    ],
    benefits: [
      'Professional, cinematic quality',
      'Compelling storytelling that connects',
      'Increased engagement and conversions',
      'Versatile content for multiple platforms',
      'Expert videography and editing',
      'Fast turnaround times',
    ],
    technologies: [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'DaVinci Resolve',
      'Cinema Cameras',
      'Professional Lighting',
      'Audio Equipment',
      'Drones (Aerial Footage)',
    ],
    process: [
      {
        step: 'Pre-Production',
        description:
          'Concept development, scriptwriting, storyboarding, and planning.',
      },
      {
        step: 'Production',
        description:
          'Professional filming with high-quality equipment and expert crew.',
      },
      {
        step: 'Post-Production',
        description:
          'Video editing, color grading, sound design, and motion graphics.',
      },
      {
        step: 'Review & Revisions',
        description:
          'Client feedback and revisions to ensure perfect final product.',
      },
      {
        step: 'Delivery & Distribution',
        description:
          'Final video delivery in all required formats for various platforms.',
      },
    ],
    deliverables: [
      'Final edited video in HD/4K',
      'Multiple format versions (social media, website, etc.)',
      'Raw footage (optional)',
      'Project files (optional)',
      'Captions/subtitles (if requested)',
      'Thumbnail images',
      'Behind-the-scenes content (optional)',
    ],
    pricing: {
      starting: 'Custom Quote',
      description:
        'Video production pricing depends on project scope, duration, location, and production requirements. We provide transparent quotes and flexible packages. Contact us to discuss your video project.',
    },
  },
]

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((service) => service.slug === slug)
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug)
}
