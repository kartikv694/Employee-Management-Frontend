// This File is For Showing Leave Details

// Import Files
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'

export default function LeaveDetails() {
    const {_id} = useParams()
    const [detail,setDetail] = useState({})
    const [auth,setAuth] = useAuth()

    const changeStatus = async (id,status) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/v2/employee/leave/status/${id}`,
                {status},
            {
                headers:{
                    Authorization: `Bearer ${auth?.token}`
                }
            }
        )
        console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const Detail = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v2/employee/leave/details/${_id}`,
                {
                    headers:{
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(data)
            setDetail(data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(()=>{
        Detail()
        
    },[])
  return (
    <div className="flex">
                    <AdminSidebar />
                    <div className="flex-1 ml-60 bg-gray-600">
                        <AdminNavbar />
                        <div className='bg-gray-100 h-dvh p-8 rounded-md shadow-md'>
                            <h1 className='text-2xl font-bold mb-8 text-center'>Leave Details</h1>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-300'>
                                <div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>Name</p>
                                        <p className='font-medium'>{detail?.leave?.employeeId?.name}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>Email</p>
                                        <p className='font-medium'>{detail?.leave?.employeeId?.email}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>LeaveType</p>
                                        <p className='font-medium'>{detail?.leave?.leaveType}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>From</p>
                                        <p className='font-medium'>{new Date(detail?.leave?.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>To</p>
                                        <p className='font-medium'>{new Date(detail?.leave?.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>Description</p>
                                        <p className='font-medium'>{detail?.leave?.reason}</p>
                                    </div>
                                    <div className='flex space-x-20 mb-3'>
                                        <p className='text-lg font-bold'>Action</p>
                                        <p className='font-medium'>
                                            {
                                            detail?.leave?.status==="Pending" 
                                            ? 
                                            <>
                                            <button className='mx-2 p-2 bg-teal-400 hover:bg-teal-500 cursor-pointer'
                                            onClick={()=>changeStatus(detail?.leave?._id,"Approved")} >
                                                Approve
                                            </button>
                                            <button className='mx-2 p-2 bg-red-400 hover:bg-red-500 cursor-pointer'
                                            onClick={()=>changeStatus(detail?.leave?._id,"Rejected")} >
                                                Reject
                                            </button>
                                            </>
                                            :
                                            <p className='font-medium'>
                                                    {detail?.leave?.status}</p>
                                        }
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
  )
}
