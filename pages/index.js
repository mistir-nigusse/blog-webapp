import  { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PostCard, Categories, PostWidgets } from '../components'
import {getPosts} from '../services';

const Home= ({posts}) => {
  return (
    <div className="contianer mx-auto px-10 mb-8 ">
     <Head>
      <title>CMS Blog</title>
     </Head>
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((posts)=>(
          
               <PostCard posts={posts.node} key={posts.title}/>
          
          ))}
          
        </div>
        <div className= "lg:col-span-4 col-span-1">
          <div className='lg:sticky realtive top-8'>
                  <PostWidgets/>
                  <Categories/>
          </div>
        </div>
     </div>
    </div>
  )
}

export async function getStaticProps(){
   const posts =( await getPosts()) || [];
   return {
    props: {posts}
   }
}   

export default Home
