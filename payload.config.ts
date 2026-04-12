import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'pages',
      labels: {
        singular: 'Page',
        plural: 'Pages',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'services',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      slug: 'site-content',
      labels: {
        singular: 'Site Content',
        plural: 'Site Content',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique identifier for this content block (e.g. "hero_title", "about_text")',
          },
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'articles',
      labels: {
        singular: 'Article',
        plural: 'Articles',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'media',
      labels: {
        singular: 'Media',
        plural: 'Media',
      },
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://payload:payload@localhost:5432/hdlocalseo',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  typescript: {
    outputFile: './payload-types.ts',
  },
})
