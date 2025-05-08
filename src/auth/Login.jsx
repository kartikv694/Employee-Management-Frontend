// Login Page 

// Import Files

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`https://employee-management-backend-ime7.onrender.com/api/v2/emp/login`, {
        email, password
      }
      )
      if (res?.data?.success) {
        localStorage.setItem("auth",JSON.stringify(
          {user:res?.data?.user,
            token:res?.data?.token}))
        toast.success(res?.data?.message,{autoClose:1000,"position":"top-center"})
        setEmail("")
        setPassword("")

        res?.data?.user?.role == "admin"
        ? navigate('/admin/dashboard')
        : navigate('/employee/dashboard')
        window.location.reload()
      }

    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }
  return (
    <div
      className="bg-gradient-to-b from-teal-600 from-50% to-gray-200 to-50% space-y-6
    flex flex-col items-center justify-center h-screen
    "
    >
      <h1 className="text-[40px] text-white font-empFont font one ">
        Employee Management System
      </h1>
      <div className="border shadow p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <span style={{ color: "red", fontWeight: "bold",padding:"5px 0px" }}>{error}</span>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-3 border"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <button className="w-full bg-teal-600 text-white py-1">Login</button>
        </form>
      </div>
    </div>
  )
}
