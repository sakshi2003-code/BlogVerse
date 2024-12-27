// isme prompt m id $ ke sath hi bhejni pdti h appwrite ka syntax h ye


import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from'react-router-dom'
function PostCard({
    $id,title,featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl 
        p-4 '>
            <div className='w-full h-auto justify-center
            mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)}
                alt={title} 
                className=' m-auto rounded-xl size-24 '/>
            </div>
            <h2 
            className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
