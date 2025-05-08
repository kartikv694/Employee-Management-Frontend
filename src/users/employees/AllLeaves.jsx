// Showing All Employee Leaves Page

// Import Files
import React, { useEffect, useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeeSidebar from './EmployeeSidebar'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import axios from 'axios'

export default function AllLeaves() {
    const [leaves,setLeaves] = useState([])
    const [auth,setAuth] = useAuth()
        const getLeaves = async ()=>{
            try {
                const {data} = await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/leave/all-leaves/${auth?.user?.id}`,
                    {
                        headers: {
                            Authorization: `Bearer${auth?.token}`
                        }
                    }
                )
                console.log(data)
                setLeaves(data?.leaves)
            } catch (error) {
                
            }
        }
        useEffect(()=>{
            getLeaves()
        },[])
    return (
        <div className="flex">
            <EmployeeSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <EmployeeNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Manage Leaves</h3>
                    </div>
                    <div className='flex justify-between items-center mt-5 '>
                        <input type="text" placeholder='Search by dept name'
                            className='mx-4 p-2 focus:outline-slate-500 '
                        />
                    

                     <NavLink to="/employee/leaves" className="mx-4 p-2 bg-teal-600 text-white rounded-sm">Apply Leave</NavLink>
                    </div>
                     <table className="w-full mt-3 text-sm text-left text-gray-500 ">
                  <thead className="tex-xs text-gray-700 uppercase  bg-gray-50 border border-gray-200">
                      <tr>
                          <th className="px-6 py-3">Sno</th>
                          <th className="px-6 py-3">Leave Type</th>
                          <th className="px-6 py-3">From</th>
                          <th className="px-6 py-3">To</th>
                          <th className="px-6 py-3">Description</th>
                          <th className="px-6 py-3">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                  {
                                    leaves?.map((leave)=><tr key="">
                                    <td className="px-6 py-3">1</td>
                                    <td className="px-6 py-3"> {leave?.leaveType}</td>
                                    <td className="px-6 py-3"> 
                                        {new Date(leave?.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                    {new Date(leave?.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3"> {leave?.reason}</td>
                                    <td className="px-6 py-3"> {leave?.status}</td>
                                                                    
                                </tr>)
                                }
                  </tbody>
                </table>
                </div>
            </div>

        </div>


    )
}