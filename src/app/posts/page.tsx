// server component
import { QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getAllPosts, getPostsPage } from '../actions/postActions';
import Posts from './posts';
import { getMetaDataObj } from '@/lib/utils';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata(){
    const data = await getPostsPage('posts');

    const metaData = data.page.seo;
   
    return getMetaDataObj(metaData);
}

export default async function PostsPage(props: {
  searchParams: Promise<SearchParams | null>;
}) {

  const searchParams = await props.searchParams;
  const startCursor = searchParams?.startCursor;
  const endCursor = searchParams?.endCursor;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', startCursor, endCursor],
    queryFn: () => getAllPosts(startCursor, endCursor),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts startCursor={startCursor} endCursor={endCursor} />
    </HydrationBoundary>
  );
}
