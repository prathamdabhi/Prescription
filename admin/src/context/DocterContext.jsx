import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export const DocterContext = createContext()

const DoctorProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken, setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/doctor-appointments`,{headers: {dtoken}});
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
                console.log(data)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/doctor/appointment-complet`,{appointmentId},{headers: {dtoken}});
            if(data.success){
                toast.success('appointment Completed')
            }else{
                toast.error(data.message);
                getAppointments();
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/doctor/appointment-cancel`,{appointmentId},{headers: {dtoken}})
            if(data.success){
                toast.success('appointment Cancelled')
                getAppointments();
            }else{
                toast.error(data.message);
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/dashboard`,{headers: {dtoken}});
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/doctor-profile`, {headers: {dtoken}});
            if(data.success){
                setProfileData(data.profileData);
                console.log(data.profileData);
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
        setAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,dashData,setDashData,
        getProfileData,profileData,setProfileData
    }

    return(
        <DocterContext.Provider value={value}>
            {props.children}
        </DocterContext.Provider>
    )
}

export default DoctorProvider