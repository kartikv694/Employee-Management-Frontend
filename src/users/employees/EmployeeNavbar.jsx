// Employee Navbar

// Import Files
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

export default function EmployeeNavbar() {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    setAuth({ user: null, token: "" })
    navigate('/')
  }
  return (
    <div className="flex justify-between  items-center text-white h-12 bg-teal-600 px-5">
      <p className='two'>Welcome, <span>{auth?.user?.name}</span></p>
      <button className='px-5 py-1 bg-teal-700  hover:bg-teal-800 cursor-pointer rounded'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}