import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';

function MyApointment() {

  const { backendUrl, token, getDoctorData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const slotDateFormate = (slotDate) => {
    const dateArreay = slotDate.split('_');
    return dateArreay[0] + ' ' + months[Number(dateArreay[1] - 1)] + " " + dateArreay[2]   
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/my-appointments`,{ headers: {token}})
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const cancelledAppointment = async (appointmentId) => {
    try {
     const { data } = await axios.post(`${backendUrl}/api/v1/user/cancel-appointment`,{appointmentId},{ headers: {token}})
     if(data.success){
      toast.success(data.message);
      getUserAppointments();
      getDoctorData();
     }else{
      toast.error(data.message);
     }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
   if(token){
    getUserAppointments();
   }
  }, [token]);
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
          appointments.slice(0,10).map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div className='w-32 bg-indigo-50'>
                <img className='w-full'  src={item.doctorData?.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-700 font-semibold'>{item.doctorData?.name}</p>
                <p>{item.speciality}</p>
                <p className='text-neutral-700 font-semibold mt-1'>Address:</p>
                <p className='text-xs'>{item.doctorData?.address?.line1}</p>
                <p className='text-xs'>{item.doctorData?.address?.line2}</p>
                <p className='mt-1'><span className='text-neutral-700 font-semibold mt-1'>Date and Time: </span> {slotDateFormate(item.slotDate)} | {item.slotTime} </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-center'>
                {!item.cancelled && <button className='text-sm text-stone-700 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200'>
                  Pay Online
                </button>}
               {!item.cancelled &&  <button onClick={()=>cancelledAppointment(item._id)} className='text-sm text-stone-700 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-200'>
                  Cancel Appointment
                </button>}
                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded'>Appointment Cancelled</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyApointment
