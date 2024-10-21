import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

function Apointment() {
  const { docid } = useParams()
  const {doctors,currencySymbol,getDoctorData,backendUrl,token,} = useContext(AppContext)
  const [docData, setDocData] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysofweek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const navigate = useNavigate();
  const fetchDoc = async () => {
    const docInfo = doctors.find(doc => doc._id === docid)
    setDocData(docInfo)

  }
  const getAvailableSlots = async() => {
    // if (!docData) {
    //   // Wait until docData is available before proceeding
    //   return;
    // }
    setDocSlots([]);
    
    //get current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(currentDate.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(currentDate.getDate() + i )
      endTime.setHours(21,0,0,0)

      //setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlot = []
      while(currentDate < endTime){
        let formetteTime = currentDate.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

        //check if slot is not available
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formetteTime

        const isSlotAvailable = docData && docData.slots_book[slotDate] && docData.slots_book[slotDate].includes(slotTime) ? false : true ;
        if(isSlotAvailable){
         //add slot to array
          timeSlot.push({
          dateTime: new Date(currentDate),
          time: formetteTime
        })
        }

      

       // Increment current time by 30 minutes
       currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlot]))
    }
  }

  const bookAppointment = async() => {
    if(!token){
      toast.warn('Please login to book an appointment')
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(`${backendUrl}/api/v1/user/book-appointment`,{docId:docid,slotDate,slotTime},{headers:{token}});
      if(data.success){
        toast.success(data.message)
        getDoctorData()
        navigate('/my-apointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchDoc()
  },[docid,doctors])
  useEffect(() => {
    getAvailableSlots()
  }, [docData]);
  useEffect(() => {
    console.log(docSlots)
  }, [docSlots]);
  return (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img className='w-full bg-primary sm:max-w-72 rounded-lg' src={docData?.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 p-8 rounded-lg py-7 bg-white mx-2 sm:mx-0  sm:mt-0 '>
          {/* Doctor Details: right */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-800'>{docData?.name}<img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <p>{docData?.degree} - {docData?.speciality}</p>
            <button className='py-0.5 px-2 rounded-full bg-primary text-xs text-white'>{docData?.experience}</button>
          </div>
          {/* Doctor About */}
          <div>
            <p className='flex items-center gap-2 text-sm text-gray-900 font-medium mt-3'>About <img className='w-3.5' src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-800 font-medium max-w-[700px] mt-2'>{docData?.about}</p>
          </div>
          {/* Appointment fess */}
          <p className='text-sm text-gray-700 font-medium mt-4'>
            Appointment Fees:- <span className='text-black'>{currencySymbol} {docData?.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-14 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full mt-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item,index)=>(
             <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 px-2 rounded-full min-w-16 cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}> 
             <p>{item[0] && daysofweek[item[0].dateTime.getDay()]}</p>
             <p>{item[0] && item[0].dateTime.getDate()}</p>
             </div>
            ))
          }
        </div>
      {/* booking time */}
      <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll '>
        {
          docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-200'}`}>{item.time.toLowerCase()}</p>
          ))
        }
      </div>

      {/* booking button */}
      <button onClick={bookAppointment} className='bg-primary text-white text-sm py-3 px-14 mt-4 rounded-full hover:scale-105 transition-all'>Book Appointment</button>
      </div>
      {/* Listing Related Doctors */}
      <RelatedDoctors docid={docid} speciality={docData?.speciality}/>
    </div>
  )
}

export default Apointment
