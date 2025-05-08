// Leave Apply By Employee

// Import Files
import React, { useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeeSidebar from './EmployeeSidebar'
import { useAuth } from '../../context/auth'
import axios from 'axios'

export default function EmployeeLeaves() {
  const [auth,setAuth] = useAuth()
  const [leave,setLeave] = useState({
    userId : auth?.user?.id,
    leaveType:"",
    startDate:"",
    endDate:"",
    reson:""
  }) 
  const  handleChange = (e)=>{
    setLeave({...leave,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      // api calling 
      const {data} = await axios.post(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/leave/apply`,
        leave,
        {
          headers:{
              Authorization:`Bearer ${auth?.token}`
          }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
     <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-60 ">
                 <EmployeeNavbar/>
                 <form className="px-8" onSubmit={handleSubmit}>
                 <h1 className='text-2xl mb-2 font-semibold text-center'>Request for Leave</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-5">

            {/* leave type */}
            <div className="w-full">
              <label htmlFor="" className="block text-sm  font-medium text-gray-700">Leave Type</label>

              <select name="leaveType"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                <option value={''}>Select Leave Type</option>
                <option value="seek leave">Seek Leave</option>
                <option value="casual leave">Casual Leave</option>
                <option value="annual leave">Annual Leave</option>
              </select>
            </div>

            {/* From date */}
            <div>
              <label htmlFor="" className="block text-sm  font-medium text-gray-700">From Date</label>
              <input type="date"
                onChange={handleChange}
                name="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* To date */}
            <div>
              <label htmlFor="" className="block text-sm  font-medium text-gray-700">To Date</label>
              <input type="date"
                onChange={handleChange}
                name="endDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>


            {/* Description */}
            <div>
              <label htmlFor="" className="block text-sm  font-medium text-gray-700">Description</label>
              <textarea type="date"
                onChange={handleChange}
                name="reason"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>

            </div>
            {/* button */}
            <button className="mt-6 p-2 block w-full border border-gray-300 rounded-md bg-teal-700 text-white
                                  hover:bg-teal-800
                                  cursor-pointer" >
              Apply Leave</button>
        </form>
            </div>
        </div>
  )
}