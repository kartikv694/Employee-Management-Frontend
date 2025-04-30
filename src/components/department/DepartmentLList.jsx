// This File is for Managing All Departments

// Import Files
import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import AdminSidebar from '../AdminSidebar'
import AdminNavbar from '../AdminNavbar'
import DataTable from "react-data-table-component"
import columns, { DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const customStyles = {
    headCells:{
        style:{
            fontSize:'13px',
            fontWeight:"bold"
        }
    }
}

export default function DepartmentList() {
    const [departments,setDepartments] = useState([])
    const [filterDepartment,setFilterDepartment] = useState([])
    const [auth,setAuth,refresh,setRefresh] = useAuth()
    const [loading,setLoading] =useState(false)

    // For Departments Filteration
    const filterDepartments = (e)=>{
        const records = departments.filter((dept)=>{
            dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilterDepartment(records)
    }
    
    
    useEffect(()=>{
        const getDepartments = async ()=>{
            setLoading(true)
            try {
                const {data} = await axios.get(`https://employee-management-backend-ten.vercel.app/api/v2/department/all`,{
                    headers:{
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
                // console.log(data)
                if (data?.success) 
                {
                    let sno = 1;
                    const records =  data?.departments.map((dept)=>(
                    {
                        _id:dept?._id,
                        sno:sno++,
                        dept_name:dept.dept_name,
                        action:<DepartmentButtons _id={dept?._id}/>

                    }
                   ))   
                   setDepartments(records)
                   setFilterDepartment(records)
                   setLoading(false)
                }
            } catch (error) {
                
            }
            finally
            {
                setLoading(false)
            }
        } 
        getDepartments()
        setRefresh(false)
    },[refresh])
    return (

        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-white'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Departments</h3>
                    </div>
                    <div className='flex justify-between items-center mt-5 '>
                        <input type="text" placeholder='Search by dept name'
                            className='mx-4 p-2 focus:outline-slate-500 ' 
                            onChange={filterDepartments}/>
                        <NavLink to="/admin/department/add" className="mx-4 p-2 bg-teal-600 text-white rounded-sm">Add Department</NavLink>
                    </div>
                       {
                        loading 
                        ? <h2>Loading....</h2>
                        : <DataTable 
                        columns={columns} 
                        data={filterDepartment} 
                        customStyles={customStyles}
                        pagination 
                        paginationPerPage={6}
                        paginationRowsPerPageOptions={[6,10,20,30,50]}
                        />  
                       }
                </div>
            </div>

        </div>
    )
}