import React from 'react'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeeSidebar from './EmployeeSidebar'

export default function EmployeeSettings() {
  return (
     <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-60 bg-gray-600">
                 <EmployeeNavbar/>
                 <h1>Settings Section</h1>
            </div>
        </div>
  )
}