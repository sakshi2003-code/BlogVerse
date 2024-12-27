import React ,{useState,useEffect}from 'react'
import appwriteService from '../appwrite/config';
import { Container,PostCard } from '../components';
function AllPosts() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    appwriteService.getPost([]).then((posts)=>{
        if (posts) {
            setPosts(posts.documents)
            
        }
    })
  return (
    <div className="w-full py-20  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
  <Container>
    <div className="flex flex-wrap items-center justify-center gap-6">
      {
        posts.map((post) => (
          <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
              <PostCard {...post} />
            </div>
          </div>
        ))
      }
    </div>
  </Container>
</div>

  
  )
}

export default AllPosts
