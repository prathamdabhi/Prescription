import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export const DocterContext = createContext()

const DoctorProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken, setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '');
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/doctor-appointments`,{headers: {dtoken}});
            if(data.success){
                setAppointments(data.appointments.reverse());
                console.log(data.appointments.reverse());
                console.log(data)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const value = {
        dtoken,
        setDtoken,
        backendUrl,
        getAppointments,
        appointments,
        setAppointments
    }

    return(
        <DocterContext.Provider value={value}>
            {props.children}
        </DocterContext.Provider>
    )
}

export default DoctorProvider