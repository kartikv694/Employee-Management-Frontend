// This File is for Managing  All Employees

// Import Files
import { NavLink } from "react-router-dom";
import axios from 'axios';
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import DataTable from "react-data-table-component";
import columns, { EmployeesButtons } from "../../utils/EmployeesHelper";

const customStyles = {
    headCells:{
        style:{
            fontSize:'13px',
            fontWeight:"bold"
        }
    }
}

export default function EmployeeList() {
    const [employees,setEmployees] = useState([])
    const [loading,setLoading] = useState(false)
    const [auth,setAuth,refresh,setRefresh] = useAuth()
    useEffect(()=>{
        const getEmployees = async ()=>{
            // console.log("ok")
            setLoading(true)
            try {
                const {data} = await axios.get(`https://employee-management-backend-ten.vercel.app/api/v2/employee/all`,{
                    headers:{
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
                // console.log(data)
                if (data?.success) 
                {
                    let sno = 1;
                    const records =  data?.employees.map((emp)=>(
                    {
                        _id:emp?._id,
                        sno:sno++,
                        dept_name:emp?.department?.dept_name,
                        name:emp?.userId?.name,
                        dob: new Date(emp?.dob).toLocaleDateString(),
                        profileImage: <img src={`https://employee-management-backend-ten.vercel.app/${emp?.userId?.profileImage}`}
                        width={'100px'}/>,
                        action: <EmployeesButtons _id={emp?._id} />

                    }
                   ))   
                   setEmployees(records)
                   setLoading(false)
                }
            } catch (error) {
                
            }
            finally
            {
                setLoading(false)
            }
        } 
        getEmployees()
        setRefresh(false)
    },[refresh])
    return (
    
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-white'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Manage Employee</h3>
                    </div>
                    <div className='flex justify-between items-center mt-5 '>
                        <input type="text" placeholder='Search by dept name'
                            className='mx-4 p-2 focus:outline-slate-500 ' />
                        <NavLink to="/admin/employee/add" className="mx-4 p-2 bg-teal-600 text-white rounded-sm">Add Employee</NavLink>
                    </div>
                    <DataTable 
                        columns={columns} 
                        data={employees} 
                        customStyles={customStyles}
                        pagination 
                        paginationPerPage={6}
                        paginationRowsPerPageOptions={[6,10,20,30,50]}
                        />  
                   
                </div>
            </div>

        </div>
    )
}