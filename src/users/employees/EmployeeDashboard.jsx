// Employee Dashboard Page

// Import Files
import React from 'react'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeSummary from './EmployeeSummary'

export default function EmployeeDashboard() {
  return (
     <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-60 bg-gray-600">
                 <EmployeeNavbar/>
                 <EmployeeSummary/>
            </div>
        </div>
  )
}