import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'

const NOTES: Array<{ slug: string; publishedAt: string }> = [
  { slug: 'identity-within-discipline', publishedAt: '2024-11-03' },
  { slug: 'hidden-drive-behind-my-hustle', publishedAt: '2024-09-14' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: WEBSITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/notes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...NOTES.map((n) => ({
      url: `${WEBSITE_URL}/notes/${n.slug}`,
      lastModified: new Date(n.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
