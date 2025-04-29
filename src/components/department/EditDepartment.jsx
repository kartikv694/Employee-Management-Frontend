import React, { useEffect, useState } from 'react'
import AdminSidebar from '../AdminSidebar'
import AdminNavbar from '../AdminNavbar'
import { useAuth } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditDepartment() {
    const [auth, setAuth] = useAuth()
    const [error, setError] = useState(null)
    const { _id } = useParams()
    const navigate =useNavigate()
    const [department, setDepartment] = useState({})

    useEffect(()=>{
        const getDepartment = async ()=>{
            try {
                const {data} = await axios.get(`http://localhost:8000/api/v2/department/get/${_id}`,{
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
                if (data?.success) {
                    setDepartment(data?.department)
                }
            } catch (error) {
                setError(error?.response?.data?.message)
            }
        }
        getDepartment()
    },[])

    const handleDepartment = (e) => {
        setDepartment({ ...department, [e.target.name]: e.target.value })
    }

    const hanldeSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} =  await axios.put(`http://localhost:8000/api/v2/department/update/${_id}`,
            {
                    dept_name: department?.dept_name,
                    description: department?.description
            },
            {
                headers: {
                    Authorization:`Bearer ${auth?.token}`
                }
            }
        )
        
        if (data?.success) 
        {
            toast.success(data?.message,{autoClose:1000})
            setTimeout(()=> {
                navigate('/admin/department/list')
            },2000)
        }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    return (
        <>
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 ml-60 bg-gray-600">
                    <AdminNavbar />
                    <div className='bg-white'>
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold p-5'>Manage Departments</h3>
                        </div>
                        <div className='max-w-3xl mx-auto mt-8 bg-white p-8 rounded-md shadow-md w-96' >
                            <div className='mt-10'>
                                <span style={{ color: "red", fontWeight: "bold", padding: "5px 0px" }}>{error}</span>
                                <h3 className='text-2xl font-bold mb-5 mt-3'>Edit Department</h3>
                                <form onSubmit={hanldeSubmit}>
                                    <div>
                                        <label htmlFor="" className='text-sm font-medium text-gray-500'>
                                            Department Name</label>
                                        <input type="text" placeholder='Enter Dept Name'
                                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                            name='dept_name'
                                            value={department.dept_name}
                                            onChange={handleDepartment}
                                        />

                                    </div>
                                    <div>
                                        <label htmlFor=""
                                            className='text-sm font-medium text-gray-500'
                                        >Description</label>
                                        <textarea placeholder='Description'
                                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                            name="description"
                                            value={department.description}
                                            onChange={handleDepartment}
                                        ></textarea>

                                    </div>
                                    <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700
                          p-2 text-white font-bold
                          
                          '>Edit Department</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}