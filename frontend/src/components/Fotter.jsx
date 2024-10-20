import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Fotter = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm'>
      {/* left section */}
      <div>
        <img className='mb-5 w-40' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-800 leading-5'>A prescription is a medical order from a healthcare professional, typically for medication or treatment. It specifies the drug, dosage, and how often it should be taken. Prescriptions ensure patients receive appropriate care and reduce the risk of medication misuse.</p>
      </div>

      {/* center section */}
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy</li>
        </ul>
      </div>

      {/* right section */}
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-1234567890</li>
            <li>lYq3r@example.com</li>
        </ul>
      </div>
      </div>
      {/* copyRight sectio */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2024 precription. All rights reserved.</p>
      </div>
    </div>
    
  )
}

export default Fotter
