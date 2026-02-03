import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Primary Category',
      type: 'string',
      description: 'Main service category for this project',
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'Mobile Development', value: 'mobile-dev' },
          { title: 'ERP/CRM', value: 'erp-crm' },
          { title: 'Branding', value: 'branding' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Design', value: 'design' },
          { title: 'IT Consulting', value: 'it-consulting' },
          { title: 'Video Production', value: 'video-production' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      description: 'All services included in this project (can select multiple)',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'Mobile Development', value: 'mobile-dev' },
          { title: 'ERP/CRM', value: 'erp-crm' },
          { title: 'Branding', value: 'branding' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Design & Creative', value: 'design' },
          { title: 'IT Consulting', value: 'it-consulting' },
          { title: 'Video Production', value: 'video-production' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Display this project prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, client, media } = selection
      return {
        title: title,
        subtitle: client,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Completion Date, New',
      name: 'completionDateDesc',
      by: [{ field: 'completionDate', direction: 'desc' }],
    },
  ],
})
