// server component
import fetchAPI from '@/lib/graphQL/client';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl?: HTMLImageElement;
    };
  };
}

export default async function page() {
  const myQuery = `
                    {
                        posts {
                            nodes {
                                title
                                id
                                content
                                slug
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                                }
                            }
                        }
                    }
`;

  try {
    const { data } = await fetchAPI(myQuery);
    const posts = data.posts.nodes;

    return (
      <div className="flex flex-col w-1/2 m-auto">
        {posts.map((post: Post) => {
          <header className="bg-yellow-300">
            <section>
              {post.featuredImage?.node.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt="bild"
                  width={500}
                  height={500}
                  className="object-cover object-center w-full h-44 my-5"
                />
              )}
            </section>
          </header>;
        })}

        <h1 className="text-4xl my-6">Wordpress Posts</h1>
        <section className="grid grid-cols-2 gap-5">
          {posts.map((post: Post) => (
            <div key={post.id} className="my-3 bg-beige-200">
              <h2 className="text-xl text-green-300 font-bold pb-3">
                {post.title}
              </h2>
              <div className="italic min-h-80">{parse(post.content)}</div>
              <Link
                href={`/about/${post.slug}`}
                className="mb-10 mt-3 bg-black text-white py-2 px-4 cursor-pointer rounded">
                Read more about {post.title}
              </Link>
              <div className="bg-auto">
                {post.featuredImage?.node.sourceUrl && (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt="bild"
                    width={500}
                    height={500}
                    className="object-cover object-center w-full h-44 my-5"
                  />
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}