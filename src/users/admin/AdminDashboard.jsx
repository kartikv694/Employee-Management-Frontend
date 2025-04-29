import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminNavbar from '../../components/AdminNavbar'
import AdminSummary from '../../components/AdminSummary'

export default function AdminDashboard() {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className="flex-1 ml-60 bg-gray-600">
        <AdminNavbar/>
        <AdminSummary/>
      </div>
    </div>
  )
}
