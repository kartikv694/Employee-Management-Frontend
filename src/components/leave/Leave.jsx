//This File is For Managing All Employee Leaves 

// Import Files
import { NavLink } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import DataTable from "react-data-table-component"
import columns, { LeaveButton } from "../../utils/LeaveHelper";

export default function Leave() {

    const [auth,setAuth] = useAuth()
    const [leaves,setLeaves] = useState([])
    const [filterLeaves,setFilterLeaves] = useState([])

    const filterByButton =  (status) => {
        const data = leaves.filter((leave)=>leave?.status?.
        toLowerCase()
        ?.includes(status.toLowerCase()))
        setFilterLeaves(data)
    }
    
    const fetchLeaves  = async () => {
        try {
            const {data} = await axios.get(`https://employee-management-backend-ime7.onrender.com/api/v2/employee/leave/emp-leaves`,{
                headers:{
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            // console.log(data)
            if (data?.success) 
            {
                let sno = 1;
            const records =   data?.leaves.map((leave)=>(

            
                {
                    _id:leave?._id,
                    sno:sno++,
                    name:leave?.employeeId?.name,
                    leaveType:leave?.leaveType,
                    days:new Date(leave?.endDate).getDate()-new Date(leave?.startDate).getDate(),
                    status:leave?.status,
                    action:<LeaveButton id={leave._id}/>
                    
                })
            )
            // console.log(records)
            setLeaves(records)
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchLeaves()
    },[])
    return (
    
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Manage Leaves</h3>
                    </div>
                    <div className='flex justify-between items-center mt-5 '>
                        <input type="text" placeholder='Search by dept name'
                            className='mx-4 p-2 focus:outline-slate-500 ' />
                            <div>
                            <NavLink to="" className="mx-4 p-2 bg-teal-600 text-white rounded-sm"
                              onClick={()=>setFilterLeaves(leaves)}
                              >All</NavLink>
                              <NavLink to="" className="mx-4 p-2 bg-teal-600 text-white rounded-sm"
                              onClick={()=>filterByButton("Approved")}
                              >Approved</NavLink>
                              <NavLink to="" className="mx-4 p-2 bg-teal-600 text-white rounded-sm"
                              onClick={()=>filterByButton("Rejected")}
                              >Rejected</NavLink>
                               <NavLink to="" className="mx-4 p-2 bg-teal-600 text-white rounded-sm"
                               onClick={()=>filterByButton("Pending")}
                               >Pending</NavLink>
                            </div>
                    </div>
                    {
                        filterLeaves ?
                            <>
                                <DataTable
                                    columns={columns}
                                    data={filterLeaves}
                                    className="mt-3"
                                    pagination
                                />
                            </>
                            :
                            <>
                                <DataTable
                                    columns={columns}
                                    data={leaves}
                                    className="mt-3"
                                    pagination
                                />
                            </>

                    }
                </div>
            </div>

        </div>
    )
}