// Department Functional Buttons

// Import Files
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { toast } from "react-toastify"

const columns = [
    {
        name:"sno",
        selector: (row)=>row.sno
    },

    {
        name:"Department Name",
        selector: (row)=>row.dept_name,
        sortable: true
    },

    {
        name:"Action",
        selector: (row)=>row.action
    }
]

export default columns

 export const DepartmentButtons = ({_id})=>{
    const navigate = useNavigate()
    const [auth,setAuth,refresh,setRefresh] = useAuth()
    const handleDelete = async (_id)=>{
        // console.log(_id)
        try {
            const {data} =  await axios.delete(`http://localhost:8000/api/v2/department/delete/${_id}`,
            {
                headers: 
                {
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            if (data?.success) 
            {
                toast.success(data?.message,{autoClose:1000})
                setRefresh(true)
            }
        } catch (error) {
            console.log(error)

        }
    }
    return(
        <div className="space-x-2" >
        <button className="bg-green-500 hover:bg-green-600 cursor-pointer p-2" 
        onClick={()=>navigate(`/admin/department/edit/${_id}`)}>
            Edit
            </button>
        <button className="bg-red-500 hover:bg-red-600 cursor-pointer p-2 px-4"
        onClick={()=>
        {
            if(confirm("Are you sure to delete"))
                {
                    handleDelete(_id)
                }  
        }
    }
        >Delete</button>
        </div>
    )
}