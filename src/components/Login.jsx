
// steps
// declare function like navigate,dispatch,login etc



import React ,{useState}from 'react'
import{Link,useNavigate} from 'react-router-dom'
import {login as authLogin}  from '../store/authSlices'
import {Button ,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")
    const login=async(data)=>{
        // sbse phle error ko empty out kr do 

        setError("")
        try {
          const session=  await authService.login(data)
        //   agar session h to user logged in h 
        if(session){
            // hmesa ese hi userdata lena pdega
            const userData=await authService.getCurrentUser()
            if(userData) dispatch(authLogin(userData));
            // agar user logged in ho gya h to use route pe bhej do
            // link se click krne pe hi jata h navigate m 
            // programmetically chale jata h 
        navigate("/")        }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
      <div className="mb-6 flex justify-center">
        <span className="block w-24">
          <Logo width="100%" />
        </span>
      </div>
  
      <h2 className="text-center text-3xl font-extrabold text-gray-800">
        Sign in to your account
      </h2>
  
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300"
        >
          Sign Up
        </Link>
      </p>
  
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
  
      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
  
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
  
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  </div>
  
  
  
  )
}

export default Login
