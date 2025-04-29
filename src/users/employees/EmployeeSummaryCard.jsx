import React from 'react'
import { useAuth } from '../../context/auth'

function EmployeeSummaryCard({icon,text,number,color}) {
  const [auth,setAuth] = useAuth()
  return (
    <div className='rounded flex bg-white'>
    <div className={`text-3xl flex justify-center ${color} items-center text-white px-4`}>
           {icon}
        </div>
        <div className='pl-4 py-3 mx-3'>
            <p className='text-lg font-bold'>Welcome Back</p>
            <p className='text-xl font-semibold'>{auth?.user?.name}</p>
        </div>
    </div>
  )
}

export default EmployeeSummaryCard