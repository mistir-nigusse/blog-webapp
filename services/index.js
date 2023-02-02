import {request, gql} from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async ()=>{
    const query = gql `
    query MyQuery{
            postsConnection {
              edges {
                node {
                  author {
                    name
                    photo {
                      url
                    }
                    bio
                  }
                  categories {
                    slug
                    name
                  }
                  content {
                    text
                  }
                  createdAt
                  title
                  excerpt
                  featuredImage {
                    url
                  }
                }
              }
            }
          
    }`
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
}
export const getRecentPosts = async ()=>{
    const query = gql`
    query GetPostDetails(){
      posts(orderBy: publishedAt_ASC, last: 1) {
        createdAt
        
        slug
        title
        featuredImage {
          url
        }
       
      }
    }`
    const result = await request (graphqlAPI,query);
    return result.posts;
}
export const getSimilarPosts = async ()=>{
  const query = gql `
  query GetPostDetails($slug:String!, $categories: [string]){
    posts(
       where: {slug_not:$slug, AND:{categories_som{slug_in: $categories}} }
       last:3
       )
       createdAt
        
       slug
       title
       featuredImage {
         url
       }
  }
}`
const result = await request (graphqlAPI,query);
return result.posts;
}