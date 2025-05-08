// This File is For Password Reset and User Settings

// Import Files
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import { useState } from "react";
import {toast} from "react-toastify";

export default function PasswordReset() {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(email, newPassword)
        try {
            const res = await axios.post(`https://employee-management-backend-blond.vercel.app/api/v2/emp/reset-password`,
                { email: email, password: newPassword }
            )
            console.log(res)
            if (res?.success) {
                toast.success(res?.message, { autoClose: 1000, "position": "top-center" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Reset Password</h3>
                        <form className="px-8 " onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Email Id</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Insert Email"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                {/* New Password */}
                                <div>
                                    <label htmlFor="" className="block text-sm  font-medium text-gray-700">Enter New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                        placeholder="Enter Password"
                                        autoComplete="off"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            {/* button */}
                            <button  type="submit"
                             className="mt-6 p-2 block w-full border border-gray-300 rounded-md bg-teal-700 text-white
                                  hover:bg-teal-800
                                  cursor-pointer" >
                                Submit</button>

                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}