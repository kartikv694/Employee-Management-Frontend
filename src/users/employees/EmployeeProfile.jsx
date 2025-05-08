// Employee Details

// Import Files
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeNavbar from './EmployeeNavbar'
import { useAuth } from '../../context/auth'


export default function EmployeeProfile() {
    const [emp,setEmp] = useState({})
    const [auth,setAuth] = useAuth()
    const {_id}  = useParams()

   async function getEmployee()
    {
      try {
        const {data} =  await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/single/${_id}`,
            {
                headers:{
                    Authorization:`Bearer ${auth?.token}`
                }
            }
        );
        if(data?.success)
        {
          setEmp(data?.employee)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        getEmployee()
    },[])
  return (
     <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-60">
                 <EmployeeNavbar/>
                 <div className='bg-gray-100 h-dvh p-8 rounded-md shadow-md'>
                       <h1 className='text-2xl font-bold mb-8 text-center' >Employee Details</h1>
                       <div className='grid grid-cols-1 md:grid-cols-2'>
                          <div>
                              <img src={`https://employee-management-backend-ime7.onrender.com/${emp?.userId?.profileImage}`} 
                              alt="" className='rounded-full border w-40 p-2' />
                          </div>
                          <div>
                             <div className='flex space-x-20 mb-3'>
                                <p className='text-lg font-bold'>Name</p>
                                <p className='font-medium'>{emp?.userId?.name}</p>
                             </div>
                             <div className='flex space-x-20 mb-3'>
                                <p className='text-lg font-bold'>Email</p>
                                <p className='font-medium'>{emp?.userId?.email}</p>
                             </div>
                             <div className='flex space-x-20 mb-3'>
                                <p className='text-lg font-bold'>Emp Id</p>
                                <p className='font-medium'>{emp?.employeeId}</p>
                             </div>
                             <div className='flex space-x-20 mb-3'>
                                <p className='text-lg font-bold'>DOB</p>
                                <p className='font-medium'>{new Date(emp?.dob).toLocaleDateString()}</p>
                             </div>
                             <div className='flex space-x-9 mb-3'>
                                <p className='text-lg font-bold'>Gender</p>
                                <p className='font-medium'>{emp?.gender}</p>
                             </div>
                             <div className='flex space-x-16 mb-3'>
                                <p className='text-lg font-bold'>Department</p>
                                <p className='font-medium'>{emp?.department?.dept_name}</p>
                             </div>
                             <div className='flex space-x-16 mb-3'>
                                <p className='text-lg font-bold'>Designation</p>
                                <p className='font-medium'>{emp?.designation}</p>
                             </div>
                             <div className='flex space-x-20 mb-3'>
                                <p className='text-lg font-bold'>Salary</p>
                                <p className='font-medium'>{emp?.salary}</p>
                             </div>
                          </div>
                       </div>
                    </div>


            </div>
            
        </div>
  )
}