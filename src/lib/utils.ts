
import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Data {
  canonical: string;
  cornerstone: boolean;
  focuskw: string;
  metaDesc: string;
  metaKeywords: string;
  metaRobotsNofollow: boolean;
  metaRobotsNoindex: boolean;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphImage: {
    mediaItemUrl: string | '';
  };
  opengraphPublisher: string;
  opengraphSiteName: string;
  opengraphTitle: string;
  opengraphType: string;
  opengraphUrl: string;
  readingTime: string; 
  title: string;
  twitterDescription: string;
  twitterTitle: string | null;
}

export async function getMetaDataObj(metaData: Data): Promise<Metadata>{
  const sliceUrl = metaData.opengraphUrl.endsWith("/") ? metaData.opengraphUrl.slice(0, -1) : metaData.opengraphUrl;

  return {
    title: metaData.title,
    description: metaData.metaDesc,
    authors: [{name: metaData.opengraphAuthor}],
    publisher: metaData.opengraphPublisher,
    keywords: metaData.metaKeywords,
    openGraph: { // sociala medier
      title: metaData.opengraphTitle,
      description: metaData.opengraphDescription,
      images: [metaData.opengraphImage?.mediaItemUrl],
      url: sliceUrl
    },
    twitter: {
      title: metaData.twitterTitle || metaData.title,
      description: metaData.twitterDescription || metaData.metaDesc,
    },
  };
}