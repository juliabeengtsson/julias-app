'use server';
import fetchAPI from '@/lib/graphQL/client';
import { SlugMetaQuery } from '@/lib/graphQL/queries/slugMetaQueries';

export default async function MetaPostdata(slug: string){
    try {
      const response = await fetchAPI(SlugMetaQuery, {id: slug});
      return response;

    } catch(error) {
      console.error("Error in PostMeta:", error);
      throw error;
    }
}