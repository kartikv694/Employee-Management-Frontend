import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";

export default function PasswordReset() {
    return (
    
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-60 bg-gray-600">
                <AdminNavbar />
                <div className='bg-gray-100 h-dvh'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold p-5'>Reset Password</h3>
                    </div>
                    
                  
                   
                </div>
            </div>

        </div>
    )
}