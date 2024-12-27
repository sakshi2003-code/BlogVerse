
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
    <div className='flex items-center justify-center :w-full'>
                    <div className={`mx-auto w-full
                    max-w-lg bg-gray-100 rounded-xl
                    p-10 border border-black/10 `}>
                                    <div className='mb-2 flex justify-center'>
                                                <span className='inline-block w-full
                                                max-w-[100px]'>
                                                <Logo width='100%'/>
                                                </span>
                                    </div>
                         <h2 className='text-center text-2xl font-bold
                         leading-tight'> Sign in to your account</h2>

                         <p className='mt-2 text-center
                         text-base text-black/60'>
                           Don&apos;t have any account?&nbsp;
                            <Link
                            to="/signup"
                            className='font-medium text-primary
                            transition-all
                            duration-200
                            hover:underline'>Sign Up
                            </Link>
                         </p>
                         {error && <p className='
                         text-red-600 mt-8 text-center
                         '>{error}</p> }

                         {/* form */}
                        {/* form jb b use hoga handlesubmit hi use hoga 
                        kyuki handlesubmit jo event return krta h
                         uski state register khud manage krta h hme 
                         manage krne ki jarurat nhi h*/}
                         {/* isme register ko ese hi spread krke pass krwana compulsory h 
                         iska sytax hi esa h
                         kyuki ye override kr dega values wrna or iske ander
                         value uniue name hi pass krte hn ye important h or hm ek
                         object pass krte hn jisme bht sare options pass kr skte hn*/}
                         <form onSubmit={handleSubmit(login)} className='mt-8'>
                            <div className='space-y-5'>
                                <Input
                                label="Email:"
                                placeholder="Enter your email "
                                type="email"
                                {...register("email",{
                                    required:true,
                                    // regex pattern
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                                })}/>
                               
                                <Input
                                label="Password:"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password",{
                                    required:true,
                                })

                                }/>
                               <Button
                               type="submit"
                               className="w-full">Sign In</Button>
                            </div>

                         </form>
                    </div>
      
    </div>
  )
}

export default Login
