//This File is for Adding Employee Details

// Import Files
import { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";
import { useAuth } from "../../context/auth";


export default function AddEmployee() {
    const [departments,setDepartments] = useState([])
    const [formData,setFormData] = useState({})
    const [auth,setAuth] = useAuth()

    const handleChange = (e)=>{
        const {name,value,files} = e.target
        // console.log(e.target.files)

        // console.log(files)
      
        if (name==="image") {
            setFormData({...formData,[name]:files[0]})
        } 
        else {
            setFormData({...formData,[name]:value})
        }
    }

    const handleSubmit = async (e)=>{
        console.log(formData)
        e.preventDefault();
        const formDataObj =  new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        // console.log(key)
        })

        // console.log(formData)

        try {
            const {data} = await axios.post(`https://employee-management-backend-blond.vercel.app/api/v2/employee/add`,
                    formDataObj,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getDepartments = async ()=>{
        try {
            const {data} = await axios.get(`https://employee-management-backend-blond.vercel.app/api/v2/department/all`,{
                headers:{
                    Authorization: `Bearer ${auth?.token}`
                }
            }) 
            console.log(data)
       if(data?.success)
       {
        setDepartments(data?.departments)
       }
    }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDepartments()
    },[])

    return (

        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60">
                <AdminNavbar />
                <div className='bg-gray-100 py-2'>
                <div className=' mx-auto bg-white p-4 rounded-md shadow-md max-w-fit ' >
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold pb-5'>Add Employee Form</h3>
                    </div>

                    <form className="px-8 " onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* name */}
                            <div>   
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Name</label>
                                <input type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Insert Name"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Email</label>
                                <input type="text"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Insert Email"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {/*Employee Id  */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Employee Id</label>
                                <input type="text"
                                    name="employeeId"
                                    onChange={handleChange}
                                    placeholder="Employee Id"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* Date of birth */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Date Of Birth</label>
                                <input type="date"
                                    name="dob"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                             {/* Gender */}
                             <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Gender</label>
                                <select name="gender" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            {/* Designation */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Designation</label>
                                <input type="text"
                                    name="designation"
                                    onChange={handleChange}
                                    placeholder="Designation"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                               
                            </div>
                           {/* Department */}
                             <div>
                                
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Department</label>
                                <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                                    <option value="">Select Department</option>
                                    {
                                        departments.map((dept)=> <option key={dept._id}
                                        value={dept._id}>{dept.dept_name}</option>)
                                    }
                                    
                                </select>
                            </div>
                             {/* Salary */}
                             <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Salary</label>
                                <input type="text"
                                    name="salary"
                                    onChange={handleChange}
                                    placeholder="Enter Salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* Password */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Password</label>
                                <input type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* Role */}
                            <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Role</label>
                                <select name="role" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="employee">Employee</option>
                                    
                                </select>
                            </div>
                              {/* upload image */}
                              <div>
                                <label htmlFor="" className="block text-sm  font-medium text-gray-700">Name</label>
                                <input 
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    placeholder="Upload Image"
                                    accept="image/*"
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