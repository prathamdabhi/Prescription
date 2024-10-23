import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminProvider = (props) => {
    const [atoken, setAtoken] = useState(localStorage.getItem('atoken')? localStorage.getItem('atoken'): '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/admin/all-doctors`,{},{ headers: {atoken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvilability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/admin/change-availability`,{docId},{ headers: {atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/admin/admin-appointments`,{ headers: {atoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/admin/cancel-appointment`,{appointmentId},{ headers: {atoken}})
            if(data.success){
                toast.success('Appointment cancelled')
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
           const { data } = await axios.get(`${backendUrl}/api/v1/admin/dashboard`,{ headers: {atoken}}) 
           if(data.success){
            setDashData(data.dashData);
            console.log(data.dashData)
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const value = {
        atoken,
        setAtoken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvilability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        getDashData,
        dashData
    }
    
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminProvider