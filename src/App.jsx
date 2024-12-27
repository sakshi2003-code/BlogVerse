


import { useState,useEffect } from 'react';
import {useDispatch} from'react-redux'

import authService from './appwrite/auth'
import { login,logout } from './store/authSlices';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom'
function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  console.log("inside header");
  
 const[loading,setLoading]=useState(true);
 const dispatch=useDispatch()
//  useeffect for loading hua ya nhi 
 useEffect(()=>{
 authService.getCurrentUser()
 .then((userData)=>{
  if(userData){
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }
 })
 .finally(()=>setLoading(false))
 },[])

  // conditional rendring 
  return !loading ? (
    <div className='min-h-screen  flex flex-wrap content-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'>
      <div className='w-full block'>
        <Header/>
        <main>
         <Outlet />
          {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
