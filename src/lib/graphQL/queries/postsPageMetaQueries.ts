

export const pageMetaQuery = `query postsPageMetaQuery($id: ID = "") {
  page(id: $id, idType: URI) {
    title
    content
    seo {
      canonical
      cornerstone
      focuskw
      metaDesc
      metaKeywords
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphAuthor
      opengraphDescription
      opengraphImage {
        mediaItemUrl
      }
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
      readingTime
      title
      twitterDescription
      twitterTitle
    }
  }
}`