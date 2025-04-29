import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AdminSidebar from '../AdminSidebar'
import AdminNavbar from '../AdminNavbar'
import axios from 'axios'
import { useAuth } from '../../context/auth'

function AllSalary() {
    const [auth, setAuth] = useAuth()

    const getSalaries = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v2/employee/salary/view`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getSalaries()
    },[])

    return (

        <div className="flex">
            <AdminSidebar />z
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Manage Salary</h3>
                    </div>
                    <div className='flex justify-between items-center mt-5 '>
                        <input type="text" placeholder='Search by dept name'
                            className='mx-4 p-2 focus:outline-slate-500 ' />
                        <NavLink to="/admin/employees/salary/add" className="mx-4 p-2 bg-teal-600 text-white rounded-sm">Add Salary</NavLink>
                    </div>
                    {/* {JSON.stringify(empSalary,null)} */}
                    <table class="w-full mt-3 text-sm text-left text-gray-500 ">
                        <thead class="tex-xs text-gray-700 uppercase  bg-gray-50 border border-gray-200">
                            <tr>
                                <th class="px-6 py-3">Sno</th>
                                <th class="px-6 py-3">Emp ID</th>
                                <th class="px-6 py-3">Salary</th>
                                <th class="px-6 py-3">Allowance</th>
                                <th class="px-6 py-3">Deduction</th>
                                <th class="px-6 py-3">Total</th>
                                <th class="px-6 py-3">Pay Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr key="">
                                    <td class="px-6 py-3">1</td>
                                    
                                   
                                </tr>
                            </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export { AllSalary }