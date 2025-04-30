// Employee Sidebar

// Import Files
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa6";
import { FaFileAlt, FaHome } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io";
import { useAuth } from '../../context/auth';

export default function EmployeeSidebar() {
    const [auth,setAuth] = useAuth()
    return (
        <div className="bg-gray-800 text-white  h-screen fixed left-0 top-0 bottom-0 space-y-2 w-60">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h1 className="text-2xl text-center one">Employee MS</h1>
            </div>
            <div>
                <NavLink to="/employee/dashboard" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 mb-2 rounded  hover:bg-white hover:text-gray-800`}>
                    <FaHome className='text-2xl' /> <span className='ps-1'>Dashboard</span>
                </NavLink>

                <NavLink to={`/employee/profile/${auth?.user?.id}`}
                    className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded hover:bg-white hover:text-gray-800`}>
                    <FaUsers className='text-2xl' /> <span className='ps-1'>Profile</span>
                </NavLink>

                <NavLink to="/employee/all/leaves" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <FaFileAlt className="text-2xl" />  <span className='ps-1'>Leaves</span>
                </NavLink>
                <NavLink to={`/employee/salary/${auth?.user?.id}`} className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <FaMoneyBillWave className='text-2xl' /> <span className='ps-1'>Salary</span>
                </NavLink>
                <NavLink to="/employee/settings" className={({ isActive }) => `${isActive ? 'bg-teal-700' : ""} flex items-center space-x-4  py-2.5 px-4 rounded my-2 hover:bg-white hover:text-gray-800`}>
                    <IoIosSettings className='text-2xl' /><span className='ps-1'>Setting</span>
                </NavLink>
            </div>
        </div>
    )
}