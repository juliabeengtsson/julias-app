
export const POSTS = `query getPosts($after: String, $before: String, $first: Int, $last: Int) {
  posts(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      title
      content
      id
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}`