
import type { MetadataRoute } from 'next'
import SitemapAction from './actions/sitemapActions';

type SitemapURL = {
  slug: string;
  modified: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await SitemapAction();
    const baseURL = process.env.NEXT_PUBLIC_URL;

    const URLs: SitemapURL[] = data.map((page: SitemapURL) => {

      return {
        url: page.slug === 'home' ? `${baseURL}/` : `${baseURL}/${page.slug}`,
        lastModified: page.modified,
        priority: 1
      }
    });

    return URLs;
}