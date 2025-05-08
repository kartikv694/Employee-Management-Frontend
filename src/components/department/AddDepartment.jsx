// This File is for Adding the Departments

// Import Files
import React, { useState } from 'react'
import AdminSidebar from '../AdminSidebar'
import AdminNavbar from '../AdminNavbar'
import axios from "axios"
import { useAuth } from '../../context/auth'
import {toast} from 'react-toastify'
import { data } from 'react-router-dom'

export default function AddDepartment() {
  const [auth,setAuth] = useAuth()
  const [department,setDepartment] = useState({
    dept_name : "",
    description: ""
  })

  const handleDepartment = (e)=>{
    setDepartment({...department,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`http://localhost:8000/api/v2/department/add`,
        department,
        {headers:{
          Authorization: `Bearer ${auth?.token}`
        }
      })
      if(data?.success)
      {
        toast.success(data?.message,{autoClose:1000})
        setDepartment({dept_name:"",description:""})
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-white'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Departments</h3>
                    </div>
                    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                    <div className='mt-10'>
                        <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label htmlFor="" className='text-sm font-medium text-gray-500'>Department Name</label>
                            <input type="text" placeholder='Enter Dept Name' 
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            name='dept_name'
                            value={department.dept_name}
                            onChange={handleDepartment} />
                          </div>
                          <div>
                          <label htmlFor="">Description</label>
                          <textarea placeholder='Description'
                          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                          name="description"
                          value={department.description}
                          onChange={handleDepartment}></textarea>
                          </div>
                          <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 p-2
                          text-white font-bold'>Add Department</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}