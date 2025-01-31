// server component

import fetchAPI from "@/lib/graphQL/client";
import Image from "next/image";
import parse from 'html-react-parser';
import Link from "next/link";
import { getMetaDataObj } from "@/lib/utils";
import MetaPostdata from "@/app/actions/metaPostActions";
 
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props){
    const { slug } = await params;
    const data = await MetaPostdata(slug);

    const metaData = data.data.post.seo;
   
    return getMetaDataObj(metaData);
}

export default async function About({ params }: { params: Promise<{ slug: string }>}) {
    const { slug } = await params;

    const getPost = `query getPost($id: ID!) {
        post(idType: SLUG, id: $id) {
            slug
            title
            content
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }`

    try {
        const res = await fetchAPI(getPost, { id: slug });
        const post = res.data.post;

        return(
            <main className="bg-white">
                <header>
                    {post.featuredImage?.node.sourceUrl && <Image src={post.featuredImage.node.sourceUrl} alt="bild" width={500} height={500} className="max-h-1/2 w-full"/>}
                </header>

                <section className="lg:mx-24 lg:my-12 px-12 my-6">
                    <h1 className="text-2xl text-black font-bold flex justify-center py-5">{post.title}</h1>
                    <div className="text-black text-center italic sm:text-md">{parse(post.content)}</div>
                </section>

                <section className="lg:flex lg:flex-row px-12 my-6 flex flex-col justify-center">
                    <div className="lg:w-1/2 lg:flex lg:flex-col lg:mx-12">
                        <h2 className="lg:text-2xl text-xl text-black font-bold py-5 flex justify-center">{post.title}</h2>
                        <div className="text-black italic pb-6 text-center">{parse(post.content)}</div>
                    </div>
                    <div className="lg:justify-center">
                        {post.featuredImage?.node.sourceUrl && <Image src={post.featuredImage.node.sourceUrl} alt="bild" width={500} height={500} />}
                    </div>
                </section>

                <div className="flex justify-center pb-6">
                    <Link href={'/posts'}>
                        <button className="bg-orange-950 rounded text-white py-2 px-4">Tillbaka</button>
                    </Link>
                </div>
            </main>
        )
    } catch(e) {
        console.error(e);
    }
}