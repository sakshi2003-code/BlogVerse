import React ,{useState,useEffect}from 'react'
import appwriteService from '../appwrite/config';
import { Container,PostCard } from '../components';
import 'animate.css';



function Home() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{ 
        appwriteService.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
                
            }
        })
    },[])
    
    if (posts.length === 0) {
        return (
          <div className="w-full py-16 mt-4 text-center bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500">
            <Container>
              <div className="flex flex-wrap">
                <div className="p-4 w-full">
                  <h1 className="text-4xl font-bold text-white hover:text-indigo-300 transition-all duration-300 ease-in-out">
                    Login to read posts
                  </h1>
                </div>
              </div>
            </Container>
          </div>
        );
      }
      
      return (
        <div className="w-full py-16 from-indigo-100 via-purple-100 to-pink-100">
          <Container>
            <div className="flex flex-wrap justify-start">
              {posts.map((post) => (
                <div
                  key={post.$id}
                  className="p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 animate__animated animate__fadeInUp animate__delay-1s"
                >
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
      
    
}

export default Home
