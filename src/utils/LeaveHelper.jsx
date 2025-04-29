import { NavLink } from "react-router-dom"

const columns = [
    {
        name: "Sno",
        selector: (row) => row.sno,
        // sortable: true,
        // style:{
        //     fontSize:"40px"
        // }
    },
    {
        name: "Name",
        selector: (row) => row.name,
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
    },
    {
        name: "Days",
        selector: (row) => row.days,
    },
    {
        name: "Status",
        selector: (row) => row.status,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
   
]

export default columns


export const LeaveButton = ({id})=>{
    return(
       <NavLink className="bg-teal-700 hover:bg-teal-800 cursor-pointer
       text-white  p-2 px-4 rounded"
       to={`/admin/employee/leave/details/${id}`}>View</NavLink> 
    )
}