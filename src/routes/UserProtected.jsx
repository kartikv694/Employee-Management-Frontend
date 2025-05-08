// Employee Page

// Import Files
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/auth.jsx'
import { Outlet } from 'react-router-dom'
import Login from '../auth/Login.jsx'

export default function UserProtected() {
  const [ok,setOk] = useState()
  const [auth,setAuth] = useAuth()
  useEffect(()=>{
    async function authCheck() {
         const {data} =  await axios.get(`https://employee-management-backend-blond.vercel.app/api/v2/emp/user-protected`,{
        headers: {
          Authorization:`Bearer ${auth?.token}`
        }
      })
      if (data?.ok) {
        setOk(data?.ok)
      } else {
        setOk(false)
      }
    }
    if(auth?.token)  authCheck()
  },[auth?.token])
  return (
    <div>
      {ok === true ? <Outlet/> : <Login/>}
    </div>
  )
}
 