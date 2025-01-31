

export const PostsQueryPagination = `gql
    query Pagination(
        $after: String
        $before: String
        $first: Int
        $last: Int
    ) {
        posts(after: $after, before: $before, first: $first, last: $last) {
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
            nodes {
                title
        }
    }  
}
`

