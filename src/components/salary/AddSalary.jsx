// This File is For Adding Employee Salary

// Import Files
import { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from 'react-toastify';

export default function AddSalary() {
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [auth, setAuth] = useAuth()

    const [empUser, setEmpUser] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    })
    // handleDeparment
    const handleDepartment = (e) => {
        const _id = e.target.value
        const getEmployeeByDept = async () => {
            try {
                const { data } = await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/department/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                })
                // console.log(data?.employees)
                setEmployees(data?.employees)
            } catch (error) {
                console.log(error)
            }
        }
        getEmployeeByDept()
    }



    //handleChange
    const handleChange = async (e) => {
        setEmpUser({ ...empUser, [e.target.name]: e.target.value })
        if (e.target.name == "employeeId") {
            let _id = e.target.value
            const { data } = await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/singlesalary/${empUser?.employeeId || _id}`)
            console.log(data?.employee)
            setEmpUser({
                ...empUser,
                employeeId: data?.employee?._id,
                basicSalary: data?.employee?.salary,
                allowances: 0,
                deductions: 0,
                payDate: null,
            })
        }
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(empUser)
        try {
            const { data } = await axios.post(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/salary/add`,
                empUser,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(data)
            if (data?.success) {
                toast.success(data?.message, { autoClose: 1000, "position": "top-center" })
            }
        } catch (error) {
            console.log(error)
        }
    }


    // getDepartments
    const getDepartments = async () => {
        try {
            const { data } = await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/department/all`, {
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

    }, [employees, departments])

    return (

        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-gray-100 py-2 h-dvh'>
                    <div className=' mx-auto bg-white p-4 rounded-md shadow-md max-w-fit ' >
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold pb-5'>Add Salary Form</h3>
                        </div>

                        <form className="px-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Department */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Department</label>
                                    <select name="department"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        onChange={handleDepartment}

                                    >
                                        <option value="">Select Department</option>
                                        {
                                            departments.map((dept) => <option key={dept._id}
                                                value={dept._id}
                                            >{dept.dept_name.toUpperCase()}
                                            </option>)
                                        }

                                    </select>
                                </div>
                                {/* employee */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Employee</label>
                                    <select
                                        name="employeeId"
                                        value={empUser.employeeId}
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                                        <option value="">Select employee</option>
                                        {
                                            employees.map((emp) => <option key={emp?._id}
                                                value={emp?._id}>{emp?.userId?.name}</option>)
                                        }

                                    </select>
                                </div>
                                {/* Salary */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Basic Salary</label>
                                    <input type="text"
                                        name="basicSalary"
                                        value={empUser?.basicSalary}
                                        onChange={handleChange}
                                        placeholder="Enter Salary"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Allowances */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Allowances</label>
                                    <input type="text"
                                        name="allowances"
                                        value={empUser?.allowances}
                                        onChange={handleChange}
                                        placeholder="Enter allowances"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Deductions */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Deductions</label>
                                    <input type="text"
                                        name="deductions"
                                        value={empUser?.deductions}
                                        onChange={handleChange}
                                        placeholder="Enter deductions"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Paydate */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Pay Date</label>
                                    <input type="date"
                                        name="payDate"
                                        value={empUser?.payDate}
                                        onChange={handleChange}
                                        placeholder="pay date"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* button */}
                                <button className="mt-6 p-2 block w-full border border-gray-300 rounded-md bg-teal-700 text-white
                                  hover:bg-teal-800
                                  cursor-pointer" >
                                    Add Record</button>



                            </div>
                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}