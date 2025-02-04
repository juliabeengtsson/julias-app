'use server';
import fetchAPI from '@/lib/graphQL/client';
import { PageSitemap } from '../../lib/graphQL/queries/pageSitemapQuery';

export default async function SitemapAction(){
    try {
      const response = await fetchAPI(PageSitemap);

      const pages = response?.data?.pages?.nodes || [];

      console.log(pages, 'pages')

      return pages;

    } catch(error) {
      console.error("Error in PostMeta:", error);
      throw error;
    }
}