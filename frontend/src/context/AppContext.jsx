import { createContext, useEffect, useState } from "react";

import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');


    const getDoctorData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        getDoctorData
    }
    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider}

