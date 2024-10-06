import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN

  if (!siteDomain) {
    throw new Error('Please define NEXT_PUBLIC_SITE_DOMAIN in your .env file')
  }

  return [
    {
      url: process.env.NEXT_PUBLIC_SITE_DOMAIN as string,
      lastModified: '2024-10-06',
      changeFrequency: 'never',
      priority: 1.0,
    },
  ]
}
