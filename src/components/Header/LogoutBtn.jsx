// define dispatch 
// create logoutbtn handler


import React from 'react'
import{useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlices'

function LogoutBtn() {
const dispatch=useDispatch()
const logoutHandler=()=>{
    authService.logout().then(()=>{
        dispatch(logout())
    })
}
  return (
    <button
    className='text-white font-medium text-md tracking-wide py-2 px-3 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500'
    onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
