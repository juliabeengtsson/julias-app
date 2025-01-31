"use server"
import { pageMetaQuery } from "@/lib/graphQL/queries/postsPageMetaQueries";
import fetchAPI from "../../lib/graphQL/client";
import { POSTS } from "../../lib/graphQL/queries/postQueries";

export async function getAllPosts(startCursor?: string | string[] | undefined, endCursor?: string | string[] | undefined) {
    try {
      let res = null;
      if (endCursor) {
        res = await fetchAPI(POSTS, { first: 2, after: endCursor });
      } else if(startCursor) {
        res = await fetchAPI(POSTS, { last: 2, before: startCursor});
      } else {
        res = await fetchAPI(POSTS, { first: 2});
      }
  
      if (!res || !res.data) {
        throw new Error("Data not found in response");
      }
  
      return res.data;

    } catch (e) {
      console.error("Error in getAllPosts:", e);
      throw e;
    }
}

export async function getPostsPage(pathName: string) {
  const response = await fetchAPI(pageMetaQuery, {id: pathName});

  if (!response || !response.data) {
    throw new Error("Data not found in response");
  }

  return response.data;
}

