// Admin Sidebar

// Import Files
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa6";
import { FaFileAlt, FaHome } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io";


function AdminSidebar() {
    return (
    <div className="bg-gray-800 text-white  h-screen fixed left-0 top-0 bottom-0 space-y-2 w-60">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h1 className="text-2xl text-center font-empFont">Employee MS</h1>
      </div>
      <div>
      <NavLink to="/admin/dashboard" className="flex items-center space-x-4 block py-3.5 px-4 rounded  hover:bg-white hover:text-gray-800">
        <FaHome className='text-2xl' /> <span className='ps-1'>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/employee/list" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded hover:bg-white hover:text-gray-800`}>
          <FaUsers className='text-2xl' /> <span className='ps-1'>Employee</span>
        </NavLink>

        <NavLink to="/admin/department/list" 
        className="flex items-center space-x-4 block py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800">
          <FaBuilding className='text-2xl' /> <span className='ps-1'>Department</span>
        </NavLink>

        <NavLink to="/admin/employee/leave" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <FaFileAlt className="text-2xl" />  <span className='ps-1'>Leave</span>
                </NavLink>
                <NavLink to="/admin/employee/salary/list" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <FaMoneyBillWave className='text-2xl' /> <span className='ps-1'>Salary</span>
                </NavLink>
                <NavLink to="/admin/employee/reset/password" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <IoIosSettings className='text-2xl' /><span className='ps-1'>Setting</span>
                </NavLink>
      </div >
    </div >
  )
}

export default AdminSidebar