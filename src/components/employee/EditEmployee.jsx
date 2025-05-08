// This file is for Updating Employee Details

//Import Files
import { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function Edit() {
    const [emp, setEmp] = useState({
        name: "",
        designation: "",
        department: "",
        salary: ""
    })
    const { _id } = useParams()
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [auth, setAuth] = useAuth()
    const [semp, setSemp] = useState({})

    async function getEmployee() {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/employee/single/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );
            // console.log(data.employee.department.dept_name)
            if (data?.success) {
                setEmp({
                    ...emp,
                    name: data?.employee?.userId?.name,
                    designation: data?.employee?.designation,
                    department: data?.employee?.department?._id,
                    salary: data?.employee?.salary,
                })
                setSemp(data?.employee)
                // console.log(data?.employee)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getEmployee()
    }, [])


    // handlechange
    const handleChange = (e) => {
        const { name, value } = e.target
        setEmp({ ...emp, [name]: value })
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(semp)
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v2/employee/update/${_id}`,
                emp,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            // console.log(data)
            if (data?.success) {
                toast.success(data?.message,{autoClose:1000,"position":"top-center"})
                navigate("/admin/employee/list")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // getDepartments
    const getDepartments = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/department/all`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            //  console.log(data)
            if (data?.success) {
                setDepartments(data?.departments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDepartments()
    }, [])


    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60">
                <AdminNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className=' mx-auto bg-white p-4 rounded-md shadow-md max-w-fit ' >
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold pb-5'>Update Employee Form</h3>
                        </div>

                        <form className="px-8" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* name */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Name</label>
                                    <input type="text"
                                        value={emp?.name}
                                        name="name"
                                        onChange={handleChange}
                                        placeholder="Insert Name"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>


                                {/* Designation */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Designation</label>
                                    <input type="text"
                                        name="designation"
                                        value={emp?.designation}
                                        onChange={handleChange}
                                        placeholder="Designation"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />

                                </div>
                                {/* Department */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Select department</label>


                                    <select name="department"
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md">

                                        <option value={semp?.department?._id}>
                                            {semp?.department?.dept_name}</option>

                                        {
                                            departments.map((dept) => <option key={dept._id}
                                            className={`${semp?.department?.dept_name == dept.dept_name ? 'hidden' : " "}`}
                                                value={dept._id}>{dept.dept_name.toUpperCase()}</option>)
                                        }

                                    </select>
                                </div>
                                {/* Salary */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Salary</label>
                                    <input type="text"
                                        name="salary"
                                        value={emp?.salary}
                                        onChange={handleChange}
                                        placeholder="Enter Salary"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>




                                {/* button */}
                                <button className="mt-6 p-2 block w-full border border-gray-300 rounded-md bg-teal-700 text-white
                                  hover:bg-teal-800
                                  cursor-pointer" >
                                    Update Record</button>



                            </div>
                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}



