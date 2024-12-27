// mechanishm h kese pages ko routes ko save kra jata h
// create container {ye ek protected container hota h
// iske ander value show krni ni krni ye decide krta h}
// hm conditional render krenge

import React ,{useEffect,useState}from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)
    useEffect(()=>{
        // todo make it more easy
        // if(authStatus ==true){
        //     navigate('/')
        // }else if(authStatus==false){
        //     navigate('/login')
        // }

        // let authValue=authStatus === true?true:false
        if(authentication&& authStatus !== authentication){
        //    hmne user se authentication liya h usne true diya pr hm status b check krenge uska
        navigate('/login')

        }else if(!authentication && authStatus !==authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
  return loader ? <h1>Loading...</h1>:<>{children}</>
   
  
}


