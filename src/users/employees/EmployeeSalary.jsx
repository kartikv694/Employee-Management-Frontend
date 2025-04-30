// Employee Salary Page 

// Import Files
import React, { useEffect, useState } from 'react'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeeSidebar from './EmployeeSidebar'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'

export default function EmployeeSalary() {
  const {_id} = useParams()
    const [auth,setAuth] = useAuth()
    const [empSalary,setEmpSalary] =useState({})


    const getSalary = async ()=>{
        try {
          const {data} = await axios.get(`https://employee-management-backend-ten.vercel.app/api/v2/employee/salary/salary/${_id}`,
            {
                headers: {
                    Authorization: `Bearer${auth?.token}`
                }
            })
            if (data?.success) 
            {
                setEmpSalary(data)   
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getSalary()
    },[])

  return (
     <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-60 ">
                 <EmployeeNavbar/>
                 <div className='bg-grey-50 p-5' >
                    <h1 className='text-center p-2 font-bold text-xl'>Salary Details</h1>
                 </div>
              <table className="w-full mt-3 text-sm text-left text-gray-500 ">
                  <thead className="tex-xs text-gray-700 uppercase  bg-gray-50 border border-gray-200">
                      <tr>
                          <th className="px-6 py-3">Sno</th>
                          <th className="px-6 py-3">Emp ID</th>
                          <th className="px-6 py-3">Salary</th>
                          <th className="px-6 py-3">Allowance</th>
                          <th className="px-6 py-3">Deduction</th>
                          <th className="px-6 py-3">Total</th>
                          <th className="px-6 py-3">Pay Date</th>
                      </tr>
                  </thead>
                  <tbody>
                  <tr key="">
                                    <td className="px-6 py-3">1</td>
                                    <td className="px-6 py-3">{empSalary?.salary?.employeeId?.employeeId } </td>
                                    <td className="px-6 py-3">{empSalary?.salary?.basicSalary } </td>
                                    <td className="px-6 py-3">{empSalary?.salary?.allowances } </td>
                                    <td className="px-6 py-3">{empSalary?.salary?.netSalary } </td>
                                    <td className="px-6 py-3">{empSalary?.salary?.netSalary } </td>
                                    <td className="px-6 py-3">
                                    {new Date(empSalary?.salary?.payDate).toLocaleDateString()}
                                     </td>                                 
                                </tr>
                  </tbody>
              </table>

            </div>
        </div>
  )
}