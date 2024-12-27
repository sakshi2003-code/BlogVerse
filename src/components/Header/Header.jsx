import React from 'react'
import {Container,Logo,LogoutBtn}from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus =useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  // ye array  return krta h 
  const navItems=[
    {
      name:'Home',
      slug:'/',
      active:true
    },{
      name:'Login',
      slug:'/login',
      active:!authStatus,
    },
    {
      name:'Signup',
      slug:'/signup',
      active:!authStatus,
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus,
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus,
    },
  ]
  return (
   
    <header className="py-4 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black">
    <Container>
      <nav className="flex items-center justify-between">
        <div className="mr-3">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
  
        {/* Navigation Links */}
        <ul className="flex ml-auto space-x-8">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white font-medium text-md tracking-wide py-2 px-3 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
  
          {/* Authentication Status */}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
  
  
  )
}

export default Header
