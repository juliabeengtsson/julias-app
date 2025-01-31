'use client';

import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { getAllPosts } from '../actions/postActions';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Navbar from '../../components/ui/navbar';

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl?: string;
    };
  };
}

interface PostsProps {
  startCursor?: string | string[] | undefined;
  endCursor?: string | string[] | undefined;
}

export default function Posts({ startCursor, endCursor }: PostsProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error,
  } = useQuery({
    queryKey: ['posts', startCursor, endCursor],
    queryFn: async () => getAllPosts(startCursor, endCursor),
  });

  if (postLoading) {
    return <p>Loading...</p>;
  }
  if (postError) {
    return <p>Error: {error.message}</p>;
  }

  const posts = postData?.posts?.nodes || [];
  const nextPage = postData.posts.pageInfo.hasNextPage;
  const previousPage = postData.posts.pageInfo.hasPreviousPage;
  const startCursorData = postData?.posts?.pageInfo.startCursor;
  const endCursorData = postData?.posts?.pageInfo.endCursor;

  const handleNextPage = () => {
    if (!nextPage) return;

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('startCursor');
    newUrl.searchParams.set('endCursor', endCursorData || '');

    router.push(newUrl.toString());

    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (!previousPage) return;

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('endCursor');
    newUrl.searchParams.set('startCursor', startCursorData || '');

    router.push(newUrl.toString());
    setPage(page - 1);
  };

  return (
    <main className="flex flex-col w-3/4 m-auto">
      <header>
        <Navbar/>
      </header>
      <h1 className="text-4xl my-6">Wordpress Posts</h1>
      <section className="md:grid md:grid-cols-2 md:gap-12">
        {posts.map((post: Post) => (
          <article key={post.id} className="my-3 bg-stone-200 p-8 rounded">
            <h2 className="text-xl text-orange-950 font-bold pb-3">
              {post.title}
            </h2>
            <div className="italic min-h-80">{parse(post.content)}</div>
            <div className="bg-auto">
              {post.featuredImage?.node.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt="bild"
                  width={500}
                  height={500}
                  className="object-cover object-center w-full h-60 my-5 rounded"
                />
              )}
            </div>
            <div className="flex justify-center md:justify-end">
              <Link
                href={`/about/${post.slug}`}
                className="mt-3 bg-orange-950 text-white py-2 px-4 cursor-pointer rounded">
                Read more about {post.title}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={previousPage ? '' : 'cursor-not-allowed'}
              onClick={handlePreviousPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className={nextPage ? '' : 'cursor-not-allowed'}
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
