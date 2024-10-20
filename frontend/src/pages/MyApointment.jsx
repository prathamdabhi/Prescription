import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function MyApointment() {

  const { doctors } = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
          doctors.slice(0,3).map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div className='w-32 bg-indigo-50'>
                <img className='w-full'  src={item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-700 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-neutral-700 font-semibold mt-1'>Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='mt-1'><span className='text-neutral-700 font-semibold mt-1'>Date and Time: </span> 25, july, 2024 | 8.30pm </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-center'>
                <button className='text-sm text-stone-700 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200'>
                  Pay Online
                </button>
                <button className='text-sm text-stone-700 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-200'>
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyApointment
