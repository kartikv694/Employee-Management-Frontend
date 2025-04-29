import React from 'react'
import {FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers} from "react-icons/fa"
import EmployeeSummaryCard from './EmployeeSummaryCard'

export default function EmployeeSummary() {
  return (
    <div className='p-6 bg-gray-100'>
    <h3 className=' text-2xl font-bold'>Dashboard Overview</h3>
    <div className=' grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
         <EmployeeSummaryCard icon={<FaUsers/>} text="Total Employees" number={13} color={"bg-teal-600"}/>
       
    </div>
    

</div>
  )
}