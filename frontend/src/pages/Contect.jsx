import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Contect() {
  return (
    <div>
       <div className='text-center text-2xl text-gray-500 mt-7'>
        <p>CONTACT <span className='font-medium text-gray-700'>US</span></p>
       </div>
        <hr className='border-gray-250 my-3 border' />
       <div className='my-10 flex md:flex-row flex-col justify-center gap-10 mb-15 text-sm'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col ga-6 justify-center items-start '>
          <p className='font-semibold text-lg text-gray-600 my-3'>OUR OFFICE</p>
          <p className='text-gray-500'>54709 Wilm station <br /> suite350, washington US</p>
          <p className='text-gray-500 mt-4'>(Tel): +1 (123) 456-7890 <br /> Email: pratham@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600 my-3'>CAREERS AT PRESCRIPTION</p>
          <p className='text-gray-500'>Learn more about our team and job opening</p>
          <button className='bg-gray-100 py-3 px-7 rounded-full border mt-7 hover:bg-primary hover:text-white transition-all duration-300'>Explore More</button>
        </div>
       </div>
    </div>
  )
}

export default Contect
