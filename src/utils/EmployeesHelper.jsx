import { NavLink, useNavigate } from "react-router-dom"

const columns = [
    {
        name: "Sno",
        selector: (row) => row.sno,
        sortable: true,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: '150px'
    },
    {
        name:"Image",
        selector:(row)=>row.profileImage,
        width:'100px',
        height: "50px"
    },
    {
        name:"Department",
        selector:(row)=>row.dept_name,
        sortable:true,
        width:"150px" 
    },
    {
        name:"DOB",
        selector:(row)=>row.dob,
        width: "150px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
    }
]

export default columns

export const EmployeesButtons = ({ _id }) => {
    const navigate = useNavigate()
    // console.log(_id)
    return (
        <div className="space-x-2">
            <NavLink className="bg-teal-700 hover:bg-teal-800 cursor-pointer
             text-white 
              p-2 px-4 rounded" to={`/admin/employee/view/${_id}`} >
                View
            </NavLink>
            <NavLink className="bg-blue-600  hover:bg-blue-700 cursor-pointer
             text-white
              p-2 px-4 rounded" to={`/admin/employee/edit/${_id}`}>
                Edit
            </NavLink>
            <button className="bg-yellow-500  hover:bg-yellow-600 cursor-pointer
             text-white 
              p-2 px-4 rounded"
              onClick={()=>navigate(`/admin/employee/salary/view/${_id}`)}>
                Salary
            </button>
            <button className="bg-red-600  hover:bg-red-700 cursor-pointer 
             text-white 
              p-2 px-4 rounded">
                Leave
            </button>
        </div>
    )
}