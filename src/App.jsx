// steps
// 1.create .env file in root and add required variable
// 2.create conf folder for exporting env variable
// 3.create appwrite and create authServices.js file in it
// 4 config.js file in appwrite folder
// 5  create store folder ,authSlice.js,store.js for global store 
//6. create components folder , header,footer folder and file and index.js
// 7.create loading hook
// 8.definge  dispatch
// 9.define useEffect for loading
// 10.remove return statement (apne hisab se  return krenge ise condintional rendering kehte h )
// main m provider m wrap krna sbko
// 11.create components folder ->container folder and file create
// 12. footer m functionality add and create Logo .jsx in src
// 13.LogoutBtn.jsx in header and add functionality
// 14.footer and header m funtionaliy add
// 15.button.jsx create
// input.jsx create
// create Select.jsx
// create postCard.jsx
// create Login.jsx
// create signup.jsx
// create AuthLayout.jsx
// create RTE.jsx(real time editor)
// create post-form folder and postForm.jsx in it


import { useState,useEffect } from 'react';
import {useDispatch} from'react-redux'
import './App.css'
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
    <div className='min-h-screen  flex flex-wrap content-between bg-zinc-600'>
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
