
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:""
    })
    
    const [refresh,setRefresh] = useState(false)

    useEffect(()=>{
        const data  = localStorage.getItem("auth")
        if(data)
        {
             const parseData = JSON.parse(data);
             setAuth({...auth,user:parseData?.user,token:parseData?.token})
        }

    },[])
    return <AuthContext.Provider value={[auth,setAuth,refresh,setRefresh]} >
            {children}
    </AuthContext.Provider>
}

// custom hook
const useAuth = ()=>useContext(AuthContext);
export{useAuth,AuthProvider}